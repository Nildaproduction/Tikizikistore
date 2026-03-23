import type { NextApiRequest, NextApiResponse } from 'next';

// This is a placeholder for real Mpesa integration. Replace with your provider's SDK or API call.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { phone, amount } = req.body;
  if (!phone || !amount) {
    return res.status(400).json({ success: false, message: 'Phone and amount are required' });
  }

  // TODO: Integrate with real Mpesa API here
  // Simulate a successful payment for now
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return res.status(200).json({ success: true, message: 'Mpesa payment simulated (replace with real integration)' });
}
