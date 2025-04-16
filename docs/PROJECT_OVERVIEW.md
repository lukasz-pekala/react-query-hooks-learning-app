# React Query Hooks Learning App - Project Overview

## Project Structure

The project follows a monorepo structure with three main directories:

- `client/`: Frontend React application
- `server/`: Backend Express server
- `shared/`: Shared types and schemas between client and server

## Tech Stack

- **Frontend**:

  - React 18
  - React Query (TanStack Query)
  - Radix UI components
  - Tailwind CSS
  - Wouter for routing
  - React Hook Form for form handling
  - Zod for validation

- **Backend**:
  - Express.js
  - Drizzle ORM
  - In-memory storage implementation
  - WebSocket support
  - Passport.js for authentication

## Key Components

### Server

- `storage.ts`: Implements in-memory storage for users, progress tracking, and quiz attempts
- `routes.ts`: Defines API endpoints
- `index.ts`: Server entry point
- `vite.ts`: Vite integration for development

### Client

- React-based frontend with modern UI components
- Uses Radix UI for accessible components
- Implements React Query for data fetching and caching

### Shared

- `schema.ts`: Contains shared TypeScript types and database schemas
- Defines interfaces for User, Progress, and QuizAttempt entities

## Development Setup

- Uses Vite for development and building
- TypeScript for type safety
- ESLint and Prettier for code quality
- Tailwind CSS for styling

## Key Features

- User authentication
- Progress tracking
- Quiz functionality
- Real-time updates via WebSocket
- Modern UI with accessible components
