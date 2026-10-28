import Movie from './models/Movie.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
export async function seedIfEmpty() {
  if (await Movie.countDocuments() === 0) await Movie.insertMany([
    { title: 'Interstellar', description: 'A team travels beyond this galaxy to discover whether mankind has a future among the stars.', genre: 'Sci-Fi', language: 'English', duration: 169, rating: 8.7, poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', showtimes: ['10:00 AM','1:30 PM','6:00 PM','9:15 PM'], price: 220, theatre: 'iMovies Central' },
    { title: 'Inception', description: 'A skilled thief enters dreams to steal secrets and is offered a chance at redemption.', genre: 'Thriller', language: 'English', duration: 148, rating: 8.8, poster: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg', showtimes: ['11:00 AM','2:30 PM','7:00 PM'], price: 200, theatre: 'iMovies Central' },
    { title: 'Dangal', description: 'A former wrestler trains his daughters to compete in wrestling against the odds.', genre: 'Drama', language: 'Hindi', duration: 161, rating: 8.3, poster: 'https://image.tmdb.org/t/p/w500/cJRPOLEey7gHDtMm5WCG7xMNoFI.jpg', showtimes: ['9:30 AM','1:00 PM','5:30 PM','8:45 PM'], price: 180, theatre: 'iMovies Central' },
    { title: 'Spider-Man: No Way Home', description: 'Peter Parker faces the consequences of a world that knows his identity.', genre: 'Action', language: 'English', duration: 148, rating: 8.2, poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', showtimes: ['10:30 AM','2:00 PM','6:30 PM','9:30 PM'], price: 250, theatre: 'iMovies Central' },
    { title: 'La La Land', description: 'An aspiring actress and a jazz musician pursue their dreams in Los Angeles.', genre: 'Romance', language: 'English', duration: 128, rating: 8.0, poster: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg', showtimes: ['12:00 PM','4:00 PM','8:00 PM'], price: 190, theatre: 'iMovies Central' },
    { title: 'The Dark Knight', description: 'Batman faces a criminal mastermind who pushes Gotham into chaos.', genre: 'Action', language: 'English', duration: 152, rating: 9.0, poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', showtimes: ['10:00 AM','1:30 PM','5:00 PM','8:30 PM'], price: 220, theatre: 'iMovies Central' }
  ]);
  if (process.env.SEED_ADMIN_EMAIL && process.env.SEED_ADMIN_PASSWORD && !(await User.findOne({ email: process.env.SEED_ADMIN_EMAIL.toLowerCase() }))) {
    await User.create({ name: 'iMovies Admin', email: process.env.SEED_ADMIN_EMAIL, password: await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD, 12), role: 'admin' });
  }
}
