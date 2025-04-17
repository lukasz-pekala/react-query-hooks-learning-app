# Server Implementation

## Architecture

This server is built using NestJS, a progressive Node.js framework for building efficient, reliable and scalable server-side applications.

## Features

- Dependency injection
- Module-based organization
- Built-in TypeScript support
- Enhanced testability
- Structured middleware system with:
  - Guards
  - Interceptors
  - Filters
  - Pipes

## Implementation Details

The server includes:

- Custom logging interceptor for request/response tracking
- Global exception filter for error handling
- Validation pipe for request validation
- Vite integration for development mode
- Static file serving for production

## Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm run start
```

## Notes

- The server runs on port 5000
- Development mode uses Vite for hot module replacement
- Production mode serves static files
