# iMovies — Cinema & Movie Ticket Booking System

A full-stack MERN student project for browsing movies, checking showtimes, choosing seats, and managing cinema bookings. Built to match the SmartBridge project brief supplied by the student.

## Features

- Responsive movie catalogue with title search, genre and language filters
- Movie detail pages, showtime picker, and date-specific seat availability
- Account registration/login with bcrypt password hashing and JWT sessions
- Booking confirmation, unique booking code, booking history, and cancellation
- Admin-only movie create/read/update/delete dashboard
- MongoDB models for users, movies, and bookings
- API validation, protected routes, CORS configuration, rate limiting, and centralized errors
- Seed movie data on first server start

## Important project limitations

- This is an educational demo, not a production ticketing or payment service.
- The checkout records a demo booking; no real payment gateway is connected and no money is charged.
- Seat collision checks are implemented, but production-grade concurrent booking should use MongoDB transactions/atomic reservation logic and a replica set.
- Demo poster images are loaded from TMDB image URLs. Internet access is needed for those images; fallback placeholders are included.
- Admin access is created only if `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` are set in the server environment before first startup. Do not use a real or reused password for a demo.

## Requirements

- Node.js 18 or newer
- npm
- MongoDB local service or MongoDB Atlas connection string
- VS Code (recommended)

## Setup

### 1. Start MongoDB

Run MongoDB locally, or create a database in MongoDB Atlas and copy its connection string. For Atlas, ensure your network access and database user are configured.

### 2. Configure and start the backend

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and set `MONGODB_URI` and a long random `JWT_SECRET`. Optional admin account seed values can also be set:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/imovies
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=use-a-unique-demo-password
```

Keep `.env` private; it is excluded by `.gitignore`.

Then run:

```bash
npm install
npm run dev
```

The server should report `iMovies API running at http://localhost:5000`. Visit `http://localhost:5000/api/health` to check the API.

### 3. Start the React frontend

Open a second terminal from the project root:

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

### 4. Test the app

1. Register a normal user account.
2. Open a movie and choose a date, showtime, and available seats.
3. Confirm a demo booking, then open **My bookings**.
4. To test the admin page, set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` in `server/.env` before first startup, restart the backend, then sign in with that admin account. If the database already exists, create a fresh admin through a one-off secure database operation rather than exposing a public admin-registration endpoint.

## API overview

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| GET | `/api/health` | API health check | Public |
| POST | `/api/auth/register` | Register | Public |
| POST | `/api/auth/login` | Log in | Public |
| GET | `/api/auth/me` | Current user | Signed in |
| GET | `/api/movies` | List/search/filter movies | Public |
| GET | `/api/movies/:id` | Movie details | Public |
| GET | `/api/movies/:id/seats?date=YYYY-MM-DD&time=...` | Booked seats for a show | Public |
| POST | `/api/movies` | Create movie | Admin |
| PUT | `/api/movies/:id` | Update movie | Admin |
| DELETE | `/api/movies/:id` | Delete movie | Admin |
| GET | `/api/bookings/mine` | User booking history | Signed in |
| POST | `/api/bookings` | Create demo booking | Signed in |
| PATCH | `/api/bookings/:id/cancel` | Cancel own booking | Signed in |
| GET | `/api/bookings` | List all bookings | Admin |

## Repository structure

```text
imovies-smartbridge/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # Layout and movie cards
│       ├── context/        # Authentication state
│       ├── pages/          # Home, auth, movie, bookings, admin
│       ├── api.js
│       ├── main.jsx
│       └── styles.css
├── server/                 # Express API
│   └── src/
│       ├── middleware/     # JWT and role access
│       ├── models/         # User, Movie, Booking
│       ├── routes/         # Auth, movie, booking endpoints
│       ├── seed.js
│       └── index.js
├── .gitignore
└── README.md
```

## GitHub submission

1. Create a new **public** GitHub repository named `imovies-smartbridge` (unless your SmartBridge mentor specifies another visibility/name).
2. Extract this project ZIP and open the `imovies-smartbridge` folder in VS Code.
3. Check that `server/.env` and `client/.env` are not included in the upload. Commit the `.env.example` files only.
4. From the project root run:

```bash
git init
git add .
git commit -m "Build iMovies MERN cinema booking project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/imovies-smartbridge.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. GitHub may ask you to sign in through its browser/device flow. Do not put passwords or tokens into source code or share them in chat.

After the push, copy the repository page URL and submit that link to SmartBridge. If your course portal also requires a deployed website URL, GitHub alone is not a live deployment; the backend and frontend must be deployed separately.

## Before submitting

- Run through registration, login, booking, cancellation, and admin CRUD locally.
- Take screenshots of the running application for the project report if requested.
- Update this README with your name, college, course, and mentor only if the SmartBridge template asks for them.
- Do not claim a real payment integration or production-grade concurrency unless you implement and test it.
