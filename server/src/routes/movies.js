import { Router } from 'express';
import Movie from '../models/Movie.js';
import Booking from '../models/Booking.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = Router();
router.get('/', async (req, res, next) => {
  try {
    const { search, genre, language } = req.query;
    const filter = {};
    if (search) filter.title = { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' };
    if (genre && genre !== 'All') filter.genre = genre;
    if (language && language !== 'All') filter.language = language;
    res.json(await Movie.find(filter).sort({ createdAt: -1 }).limit(100));
  } catch (e) { next(e); }
});
router.get('/:id', async (req, res, next) => {
  try { const movie = await Movie.findById(req.params.id); if (!movie) return res.status(404).json({ message: 'Movie not found.' }); res.json(movie); } catch (e) { next(e); }
});
router.get('/:id/seats', async (req, res, next) => {
  try {
    const { date, time } = req.query;
    if (!date || !time) return res.status(400).json({ message: 'Date and showtime are required.' });
    const bookings = await Booking.find({ movie: req.params.id, showDate: date, showtime: time, status: 'confirmed' }).select('seats');
    res.json({ bookedSeats: bookings.flatMap(b => b.seats) });
  } catch (e) { next(e); }
});
router.post('/', protect, adminOnly, async (req, res, next) => { try { res.status(201).json(await Movie.create(req.body)); } catch (e) { next(e); } });
router.put('/:id', protect, adminOnly, async (req, res, next) => { try { const m = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); if (!m) return res.status(404).json({ message: 'Movie not found.' }); res.json(m); } catch (e) { next(e); } });
router.delete('/:id', protect, adminOnly, async (req, res, next) => { try { await Movie.findByIdAndDelete(req.params.id); res.json({ message: 'Movie deleted.' }); } catch (e) { next(e); } });
export default router;
