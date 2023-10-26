import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { signInUrl } from "@/common/utils/network/endpoints";
import { parseObjectPropertiesToCamelCase } from "@/common/utils/helpers";
import { handleResponse } from "@/common/utils/network/responseHandler";

const OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@domain.com",
        },
        password: {
          label: "Password",
          type: "password",
          optional: true,
        },
        token: {
          label: "Token",
          type: "text",
          optional: true,
        },
        firstName: {
          label: "First Name",
          type: "text",
          optional: true,
        },
        lastName: {
          label: "Last Name",
          type: "text",
          optional: true,
        },
        businessName: {
          label: "Business Name",
          type: "text",
          optional: true,
        },
        id: {
          label: "Id",
          type: "number",
          optional: true,
        },
      },
      type: 'credentials',
      async authorize (credentials) {
        if (!credentials) {
          return null;
        }
        if (credentials.token) {
          return {
            token: credentials.token,
            email: credentials.email,
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            businessName: credentials.businessName,
            id: credentials.id,
          };
        }
        const res = await fetch(signInUrl, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        });
        const {
          code, response,
        } = await handleResponse(res);
        const user = response;
        if (code === 200 && user) {
          return parseObjectPropertiesToCamelCase(user.data);
        }
        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt ({
      token, user, 
    } ) {
      if (user) {
        return {
          ...token,
          token: user.token,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id,
          isVerified: user.isVerified,
          step: user.step,
          role: user.role,
          businessName: user.businessName,
        }
      }
      return token;
    },
    async session ( {
      session, token,
    }) {
      if (token) {
        session.token = token.token as string;
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.id = token.id as number;
        session.user.isVerified = token.isVerified as boolean;
        session.user.step = token.step as string;
        session.user.role = token.role as string;
        session.user.businessName = token.businessName as string;
      }
      return session;
    },
  },
  pages:{
    signIn: '/account/signin',
    signOut: '/account/signout',
  },
};

const handler = NextAuth(OPTIONS);

export {
  handler as GET, handler as POST,
};
