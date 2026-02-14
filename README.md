# StreetPet - Pet Adoption Platform

A full-stack pet adoption platform built with Node.js, Express, PostgreSQL, and React.

## Project Structure

```
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Home, Login, Register, Profile)
│   │   ├── lib/            # Utilities and API client
│   │   ├── hooks/          # Custom React hooks
│   │   ├── App.tsx         # Main application component
│   │   └── index.css       # Global styles (Tailwind CSS)
├── server/                 # Backend (Node.js + Express)
│   ├── auth.ts             # Authentication logic (Passport.js)
│   ├── db.ts               # Database connection
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes registration
│   └── storage.ts          # Database storage interface
├── shared/                 # Shared code between frontend and backend
│   ├── schema.ts           # Database schema and types
│   └── routes.ts           # API contract definitions
└── drizzle.config.ts       # Drizzle ORM configuration
```

## Features

- **Authentication**: Secure user registration and login using local strategy (username/password) with scrypt hashing.
- **Session Management**: Persistent sessions using `express-session` (MemoryStore for dev, compatible with `connect-pg-simple`).
- **Authorization**: Protected user profile route.
- **Database**: PostgreSQL database managed with Drizzle ORM.
- **Frontend**: Responsive UI matching the provided design, built with React and Tailwind CSS.

## Installation

The project is already set up in this Replit environment. Dependencies are installed.

To install dependencies manually:
```bash
npm install
```

## Running the Project

To start the application (frontend and backend):
```bash
npm run dev
```
The application will be available at port 5000.

## Database Management

To push schema changes to the database:
```bash
npm run db:push
```

## API Endpoints

- `POST /api/register`: Register a new user.
- `POST /api/login`: Login.
- `POST /api/logout`: Logout.
- `GET /api/user`: Get current user profile (protected).
