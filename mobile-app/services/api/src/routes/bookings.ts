import { Router } from 'express';

const router = Router();

// Create a booking (simple stub)
router.post('/', async (req, res) => {
  const { listing_id, customer_id, scheduled_at, total_amount, deposit_amount } = req.body;
  // TODO: validate, insert into DB, start escrow hold
  return res.status(201).json({ id: 'stub-booking-id', listing_id, customer_id, scheduled_at, total_amount, deposit_amount });
});

// Get booking by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  // TODO: fetch from DB
  return res.json({ id, status: 'pending' });
});

// Provider accepts booking
router.post('/:id/accept', async (req, res) => {
  const { id } = req.params;
  // TODO: update booking status and notify customer
  return res.json({ id, status: 'accepted' });
});

export default router;
