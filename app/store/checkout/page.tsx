

import { Suspense } from 'react';
import CheckoutContent from './checkout-content';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
