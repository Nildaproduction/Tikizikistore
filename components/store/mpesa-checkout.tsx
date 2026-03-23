import React, { useState } from 'react';

interface MpesaCheckoutProps {
  phone: string;
  amount: number;
  onSuccess: () => void;
  onError?: (error: string) => void;
}

export function MpesaCheckout({ phone, amount, onSuccess, onError }: MpesaCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMpesaPayment = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with your real Mpesa API endpoint
      const res = await fetch('/api/mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onSuccess();
      } else {
        setError(data.message || 'Mpesa payment failed');
        onError?.(data.message || 'Mpesa payment failed');
      }
    } catch (e: any) {
      setError(e.message || 'Mpesa payment failed');
      onError?.(e.message || 'Mpesa payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
        onClick={handleMpesaPayment}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay with Mpesa'}
      </button>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}
