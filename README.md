# Boxing Clicker App

A fullstack mobile application for tracking boxing taps with a leaderboard system.

## Features

- User registration and login
- Tap counter with animations
- Global leaderboard with rankings
- User profile with stats
- Dark mode / light mode theme
- Responsive design

## Tech Stack

- **Frontend**: React Native / Expo
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Authentication**: Custom JWT implementation
- **Code Quality**: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- PostgreSQL

### Environment Setup

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/clicker-mobile-app.git
   cd clicker-mobile-app
   ```

2. Install dependencies:

   ```
   npm install
   cd clicker-backend && npm install
   cd ../clicker-frontend && npm install
   cd ..
   ```

3. Database Setup:
   - Make sure PostgreSQL is running
   - Create a `.env` file in the `clicker-backend` directory with:
     ```
     DB_USER=postgres
     DB_HOST=localhost
     DB_NAME=clickerdb
     DB_PASSWORD=your_password
     DB_PORT=5432
     PORT=3000
     ```
   - Initialize the database:
     ```
     npm run init-db
     ```

### Running the App

**Start both backend and frontend with a single command:**

```
npm start
```

This will:

- Start the backend server on port 3000
- Start the frontend Expo development server

**Run on specific platforms:**

- Android: `npm run android`
- iOS: `npm run ios`
- Web: `npm run web`

**Run just the backend with hot-reloading:**

```
npm run dev:backend
```

### Database Management

- **Initialize database**: `npm run init-db`
- **Reset database**: `npm run reset-db`

### Testing

Run the backend tests:

```
npm test
```

### Code Quality

The project uses ESLint and Prettier to maintain code quality and consistent formatting.

- **Lint code**: `npm run lint`
- **Format code**: `npm run format`

## Project Structure

```
clicker-mobile-app/
├── clicker-backend/       # Express backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── models/        # Database models
│   │   ├── utils/         # Utilities and helpers
│   │   ├── tests/         # Test files
│   │   └── server.ts      # Main server file
│   └── package.json
├── clicker-frontend/      # React Native frontend
│   ├── src/
│   │   ├── api/           # API client code
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context providers
│   │   ├── screens/       # App screens
│   │   ├── styles/        # Styling
│   │   ├── types/         # TypeScript definitions
│   │   └── utils/         # Helper functions
│   └── package.json
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
└── package.json           # Root package.json for running both apps
```
