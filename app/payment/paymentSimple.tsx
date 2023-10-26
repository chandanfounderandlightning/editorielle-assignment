'use client';
import React from 'react';
import { Button } from "@/common/components/atoms";
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const publishableKey = process?.env?.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stripePromise = loadStripe(publishableKey);

export default function PaymentSimple () {
  const router = useRouter();
  const session = useSession();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/stripe/checkoutSessions', {
        method: 'POST',
        body: JSON.stringify({ email: session.data?.user.email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await response.json();
      if (response.status === 303) {
        router.push(body.url);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  return (
    <form
      className="flex flex-col items-center min-h-screen py-2 mt-10"
      onSubmit={handleSubmit}
    >
      <section className="bg-white flex flex-col w-60 h-16 rounded-6 justify-between">
        <Button
          type="submit"
          variant="solid"
          size="sm"
          role="link"
          data-cy="payment-button-simple"
        >
          Checkout
        </Button>
      </section>
    </form>
  )
}
