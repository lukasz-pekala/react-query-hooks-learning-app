# React Query Hooks Learning App

A modern web application built with React, TypeScript, and NestJS.

## Features

- **Frontend**: Built with **React** and **TypeScript**, using **Vite** for development
- **Backend**: Built with **NestJS** and **TypeScript**
- **State Management**: **React Query** for server state management
- **Authentication**: Session management with **express-session** and **Passport.js**
- **Development**: Hot module replacement with **Vite** for frontend

## Architecture

The application follows a modern, type-safe architecture:

- **Frontend**: React with TypeScript, using React Query for data fetching and Vite for bundling
- **Backend**: NestJS with TypeScript, providing a structured and maintainable API
- **Development**: Separate workflows for frontend and backend with concurrent development servers
- **Production**: Optimized builds with static file serving

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development servers (both frontend and backend):

   ```bash
   npm run dev
   ```

   Or start them separately:

   ```bash
   # Start only the backend
   npm run dev:server

   # Start only the frontend
   npm run dev:client
   ```

3. Build for production:
   ```bash
   npm run build
   npm run start
   ```

## Project Structure

```
├── client/           # React frontend (Vite)
│   ├── src/          # Source code
│   └── tsconfig.json # Frontend TypeScript config
├── server/           # NestJS backend
│   ├── src/          # Source code
│   │   ├── modules/  # Feature modules
│   │   ├── filters/  # Exception filters
│   │   └── main.ts   # Application entry
│   └── tsconfig.json # Backend TypeScript config
└── shared/           # Shared types and utilities
```

## Notes

- The server runs on port 5000
- Development mode uses Vite for hot module replacement
- Production mode serves static files

---

## Why Learn With Us?

- **Interactive Code Examples**: Edit and run code directly in your browser with real-time previews.
- **Comprehensive Tutorials**: Learn concepts with step-by-step explanations and practical examples.
- **Knowledge Testing**: Reinforce learning with quizzes and hands-on challenges after each module.

---

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js version **18.x** or higher installed.
- **PostgreSQL**: A running PostgreSQL instance for the backend.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-hooks-tanstack-query.git
   cd react-hooks-tanstack-query
   ```
