'use client';
import React from 'react';
import StripePricingTable from "@/app/payment/pricingTable";
import PaymentSimple from "@/app/payment/paymentSimple";
import { Toggle } from "@/common/components/molecules/toggle";
import { Typography } from "@/common/components/atoms/typography";
import PrivateComponent from "@/common/utils/privateComponent";

export default function Payment () {
  const [useSimplifiedCheckout, setUseSimplifiedCheckout] = React.useState(false);

  return (
    <PrivateComponent>
      <div className="flex flex-col justify-center items-center w-screen gap-2 mt-10">
        <Typography variant="heading-lg" classes="mb-6 text-center font-semibold text-grey-900">
          Payment
        </Typography>
        <Toggle
          data-cy="payment-toggle"
          classes="my-4"
          labelText="Simplified checkout"
          checked={useSimplifiedCheckout}
          onChange={() => setUseSimplifiedCheckout(!useSimplifiedCheckout)}
        />
        {useSimplifiedCheckout
          ? <PaymentSimple />
          : <div className="w-screen"><StripePricingTable /></div>
        }
      </div>
    </PrivateComponent>
  )
}
