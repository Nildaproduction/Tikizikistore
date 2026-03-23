"use client";

import { useEffect } from "react";

interface PaystackCheckoutProps {
  email: string;
  amount: number; // in KES, will be converted to kobo
  onSuccess?: () => void;
  onClose?: () => void;
}

export function PaystackCheckout({ email, amount, onSuccess, onClose }: PaystackCheckoutProps) {
  useEffect(() => {
    // Dynamically load Paystack script if not present
    if (!document.getElementById("paystack-script")) {
      const script = document.createElement("script");
      script.id = "paystack-script";
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePay = () => {
    // @ts-ignore
    const handler = window.PaystackPop && window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_live_32ee95c6e7d89777e7e64a3bb5085312d2b589a9",
      email,
      amount: amount * 100, // Paystack expects amount in kobo
      currency: "KES",
      callback: function () {
        if (onSuccess) onSuccess();
      },
      onClose: function () {
        if (onClose) onClose();
      },
    });
    if (handler) handler.openIframe();
  };

  return (
    <button
      type="button"
      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      onClick={handlePay}
    >
      Pay with Paystack
    </button>
  );
}
