import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

const publishableKey = process?.env?.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
const pricingTableId = process?.env?.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID || '';

const StripePricingTable = () => {
  const session = useSession();
  const email = session.data?.user.email;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return React.createElement("stripe-pricing-table", {
    "pricing-table-id": pricingTableId,
    "publishable-key": publishableKey,
    "customer-email": email,
  });
};

export default StripePricingTable;
