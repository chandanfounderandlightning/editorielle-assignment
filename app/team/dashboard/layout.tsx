"use client"
import Script from "next/script";
// npm run lint -- --fix

import Header from "./components/Header";

export default function TeamDashboardLayout ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>
        <Script src="https://js.stripe.com/v3/"></Script>
        <Header />
        {children}
      </div>
    </>
  );
}
