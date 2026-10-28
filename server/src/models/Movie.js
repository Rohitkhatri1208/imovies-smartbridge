import mongoose from 'mongoose';
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  language: { type: String, default: 'Hindi' },
  duration: { type: Number, default: 120 },
  rating: { type: Number, min: 0, max: 10, default: 7.5 },
  poster: { type: String, default: '' },
  releaseDate: { type: Date },
  showtimes: [{ type: String }],
  price: { type: Number, min: 0, default: 180 },
  theatre: { type: String, default: 'iMovies Central' }
}, { timestamps: true });
export default mongoose.model('Movie', movieSchema);
