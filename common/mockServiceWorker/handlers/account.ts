import { rest } from "msw";
import { individual, signInUrl } from "@/common/utils/network/endpoints";

const { signUpUrl } = individual;

export const accountHandlers = [
  rest.post(`${signInUrl}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          username: 'admin',
          token: 'some-token',
          type: 'some-token-type',
        },
      }),
    );
  }),

  rest.post(`${signUpUrl}`, (req, res, ctx) => {
    return res(ctx.status(201));
  }),
]
