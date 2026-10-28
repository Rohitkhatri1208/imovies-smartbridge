import { Router } from 'express';
import crypto from 'node:crypto';
import Booking from '../models/Booking.js';
import Movie from '../models/Movie.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = Router();
router.use(protect);
router.get('/mine', async (req, res, next) => { try { res.json(await Booking.find({ user: req.user.id }).populate('movie').sort({ createdAt: -1 })); } catch (e) { next(e); } });
router.post('/', async (req, res, next) => {
  try {
    const { movieId, showDate, showtime, seats } = req.body;
    if (!movieId || !showDate || !showtime || !Array.isArray(seats) || !seats.length) return res.status(400).json({ message: 'Choose a movie, date, showtime and at least one seat.' });
    if (new Set(seats).size !== seats.length || seats.some(s => !/^([A-J])(0[1-9]|1[0-2])$/.test(s))) return res.status(400).json({ message: 'Invalid or duplicate seat selection.' });
    const movie = await Movie.findById(movieId); if (!movie) return res.status(404).json({ message: 'Movie not found.' });
    const clash = await Booking.findOne({ movie: movieId, showDate, showtime, status: 'confirmed', seats: { $in: seats } });
    if (clash) return res.status(409).json({ message: 'One or more seats were just booked. Refresh seat availability.' });
    const booking = await Booking.create({ user: req.user.id, movie: movieId, showDate, showtime, seats, totalAmount: movie.price * seats.length, bookingCode: 'IM' + crypto.randomBytes(4).toString('hex').toUpperCase() });
    res.status(201).json(await booking.populate('movie'));
  } catch (e) { next(e); }
});
router.patch('/:id/cancel', async (req, res, next) => {
  try { const b = await Booking.findOne({ _id: req.params.id, user: req.user.id }); if (!b) return res.status(404).json({ message: 'Booking not found.' }); if (b.status === 'cancelled') return res.status(400).json({ message: 'Booking is already cancelled.' }); b.status = 'cancelled'; b.paymentStatus = 'not-applicable'; await b.save(); res.json(b); } catch (e) { next(e); }
});
router.get('/', adminOnly, async (req, res, next) => { try { res.json(await Booking.find().populate('user', 'name email').populate('movie').sort({ createdAt: -1 })); } catch (e) { next(e); } });
export default router;
