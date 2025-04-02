# Boxing Clicker App

A mobile application - clicker game in kickboxing styling with a leaderboard system.

## Overview

[Video overview](https://www.youtube.com/shorts/EZ3sdFdGpOw)

Boxing Clicker is an interactive mobile application with real-time tap counting. Basically the game is a clicker-type game in kickboxing setting.

The app features a clean, intuitive interface with both light and dark mode support. Users can view their ranking among other players. The backend provides secure authentication and persistent data storage, ensuring users can track their progress over time.

### Features

- **User Authentication**: Secure registration and login system
- **Interactive Tapping**: Animated boxing moves
- **Global Leaderboard**: Compete with other users worldwide
- **User Profiles**: View personal stats and achievements
- **Theme Support**: Toggle between light and dark mode
- **Responsive Design**: Works on various device sizes

### Tech Stack

- **Frontend**: React Native / Expo
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Authentication**: Custom JWT implementation
- **Code Quality**: ESLint, Prettier

## How to Run

This section provides detailed instructions for setting up and running the Boxing Clicker app on your computer.

### Prerequisites

- **Node.js** (v14+): [Download](https://nodejs.org/)
- **npm** or **yarn**: Included with Node.js
- **PostgreSQL**: [Download](https://www.postgresql.org/download/)
- **Expo Go** (for mobile testing): [Download on App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Step 1: Clone Repository

```bash
git clone https://github.com/klau55/clicker-mobile-app
cd clicker-mobile-app
```

### Step 2: Install Dependencies

Install dependencies for all parts of the application:

```bash
# Root dependencies
npm install

# Backend dependencies
cd clicker-backend
npm install

# Frontend dependencies
cd ../clicker-frontend
npm install

# Return to root
cd ..
```

### Step 3: Database Setup

1. **Start PostgreSQL** on your computer
2. **Create Environment File**:
   - Create a `.env` file in the `clicker-backend` directory with:
   ```
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=clickerdb
   DB_PASSWORD=your_password  # Use your PostgreSQL password
   DB_PORT=5432
   PORT=3000
   ```
3. **Initialize Database**:
   ```bash
   npm run init-db
   ```

### Step 4: Frontend Configuration

1. **Find Your IP Address**:
   - On Windows: Run `ipconfig` in Command Prompt and look for IPv4 Address
   - On Mac/Linux: Run `ifconfig` in Terminal and look for inet address
   
2. **Create Frontend Environment File**:
   - Create a `.env` file in the `clicker-frontend` directory with:
   ```
   DEVELOPMENT_IP=your.ip.address.here  # Replace with your actual IP (you can see it when running backend)
   ```

> **Note**: The IP address is crucial for connecting your mobile device to the backend server running on your computer.

### Step 5: Start the Application

Run backend with:

```bash
npm run start:backend
```

and frontend in another terminal:

```bash
npm run start:fronted
```

This will:
- Start the backend server on port 3000
- Launch the Expo development server

### Step 6: Connect to the App

#### On a Physical Device:
1. Install the Expo Go app on your mobile device
2. Scan the QR code shown in the terminal with your camera
3. The app will open in Expo Go

#### On an Emulator:
- For Android: `npm run android`
- For iOS: `npm run ios`

#### On the Web:
- `npm run web`

### Troubleshooting

- **Connection Issues**: Make sure your mobile device is on the same WiFi network as your computer
- **Database Errors**: Verify PostgreSQL is running and credentials are correct
- **Port Conflicts**: If port 3000 is in use, change the `PORT` in backend `.env` file

### Additional Commands

- **Reset Database**: `npm run reset-db`
- **Run Tests**: `npm test`
- **Lint Code**: `npm run lint`
- **Format Code**: `npm run format`

## Project Structure

```
clicker-mobile-app/
├── clicker-backend/       # Express backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── scripts/       # Scripts for package json
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
