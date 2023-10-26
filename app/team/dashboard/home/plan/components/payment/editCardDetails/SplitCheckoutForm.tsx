// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import React, {
  useState, 
} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import {
  logEvent, ErrorResult,
} from './util';
import { Button } from '@/common/components/atoms';
import lang from '@/common/lang';
import { usePayment } from '../usePayment';
import './stripeForm.css';
import Spinner from '@/common/designSystem/loader/spinner';
import { Typography } from '@/common/components/atoms/typography';

const { planDashboardHomeTeam } = lang;
const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '18px',
      color: '#424770',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const CheckoutForm = ({
  onSubmit, isLoading, 
}:any) => {
  const elements = useElements();
  const stripe = useStripe();
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return null;
    }

    const card = elements.getElement(CardNumberElement);
    if (card == null) {
      return;
    }
    const payload:any = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (payload.error) {
      setErrorMessage(payload.error.message);
      setPaymentMethod(null);
    } else {
      onSubmit({ payment:payload.paymentMethod.id });
      setPaymentMethod(payload.paymentMethod);
      setErrorMessage(null);
    }
  };
  if (!elements) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    )}

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardNumberElement
          id="cardNumber"
          onBlur={logEvent('blur')}
          onChange={logEvent('change')}
          onFocus={logEvent('focus')}
          onReady={logEvent('ready')}
          options={ELEMENT_OPTIONS}
          className='cardNumber'
          data-cy="cardNumber"
        />
        <div className="expiryCVC">
          <CardExpiryElement
            id="expiry"
            onBlur={logEvent('blur')}
            onChange={logEvent('change')}
            onFocus={logEvent('focus')}
            onReady={logEvent('ready')}
            options={ELEMENT_OPTIONS}
            data-cy="cardExpiry"
          />
          <CardCvcElement
            id="cvc"
            onBlur={logEvent('blur')}
            onChange={logEvent('change')}
            onFocus={logEvent('focus')}
            onReady={logEvent('ready')}
            options={ELEMENT_OPTIONS}
            data-cy="cardCvc"
          />
        </div>
        {errorMessage && <ErrorResult>
          <p id="stripeError">{errorMessage}</p></ErrorResult>}
        <Typography
          variant="body-sm"
          classes="text-grey-500 text-sm font-normal max-w-sm pb-6 text-center mt-6"
        >
                    If you have any questions, please reach out to{" "}
          <a
            href="mailto:hello@editorielle.com"
            className="text-red-300 hover:underline"
          >
                      hello@editorielle.com
          </a>
        </Typography>
        <Button
          variant="solid"
          size="sm"
          width="w-full"
          type="submit"
          disabled={!stripe}
          onClick={handleSubmit}
          data-cy="confirmDetails"
        >
          {planDashboardHomeTeam.confirmDetails}
        </Button>
      </form>
    </>
  );
};

export const SplitCheckoutForm = ({ onSubmit }:any) => {
  const { stripeDetails } = usePayment(null);
  const stripePromise = loadStripe(stripeDetails.pub_key);
 
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onSubmit={onSubmit} />
    </Elements>
  );
};
