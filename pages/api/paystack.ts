import type { NextApiRequest, NextApiResponse } from 'next';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, amount, phone, channel, firstName, lastName, address, city, items } = req.body;

  if (!email || !amount || !channel) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const paystackAmount = Math.round(Number(amount) * 100); // KES in kobo

  const payload = {
    email,
    amount: paystackAmount,
    currency: 'KES',
    channels: [channel],
    metadata: {
      phone,
      firstName,
      lastName,
      address,
      city,
      items,
    },
    callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/store/checkout`,
  };

  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (data.status && data.data && data.data.authorization_url) {
      return res.status(200).json({ authorization_url: data.data.authorization_url });
    } else {
      return res.status(500).json({ error: 'Failed to initialize payment', details: data });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Server error', details: error });
  }
}
