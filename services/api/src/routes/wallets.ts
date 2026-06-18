import { Router } from 'express';

const router = Router();

// Get wallet for user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  // TODO: lookup wallet in DB
  return res.json({ userId, balance: 0 });
});

// Deposit (create transaction + hold)
router.post('/:userId/deposit', async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;
  // TODO: create transaction, integrate with Stripe
  return res.status(201).json({ walletId: 'stub-wallet-id', amount, status: 'held' });
});

// Release escrow for booking
router.post('/release', async (req, res) => {
  const { bookingId } = req.body;
  // TODO: verify booking, transfer funds to provider
  return res.json({ bookingId, released: true });
});

export default router;
