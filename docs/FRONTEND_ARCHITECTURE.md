# Frontend Architecture Documentation

## Overview

The frontend is built with React 18 and uses React Query (TanStack Query) for data fetching, caching, and state management. The application follows modern React patterns and best practices.

## Key Technologies

### React Query

- Used for server state management
- Provides caching, background updates, and optimistic updates
- Handles loading and error states automatically

### UI Components

- Radix UI for accessible, unstyled components
- Tailwind CSS for styling
- Custom components built on top of Radix primitives

### Routing

- Wouter for client-side routing
- Supports nested routes and route parameters

### Form Handling

- React Hook Form for form state management
- Zod for form validation
- Integration with React Query for form submissions

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Route components
│   ├── services/      # API service functions
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   └── App.tsx        # Root component
```

## React Query Integration

### Query Keys

- Organized by feature and resource type
- Example: `['progress', userId]`, `['quiz-attempts', tutorialId]`

### Custom Hooks

```typescript
// Example hook for fetching user progress
function useUserProgress(userId: number) {
  return useQuery({
    queryKey: ["progress", userId],
    queryFn: () => api.getUserProgress(userId),
  });
}

// Example mutation for saving quiz attempts
function useSaveQuizAttempt() {
  return useMutation({
    mutationFn: (attempt: QuizAttempt) => api.saveQuizAttempt(attempt),
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["quiz-attempts"] });
    },
  });
}
```

### Optimistic Updates

- Implemented for better UX
- Updates UI immediately while request is in progress
- Rolls back on error

## State Management

### Server State

- Managed by React Query
- Automatic caching and revalidation
- Background updates for fresh data

### Client State

- React Context for global UI state
- Local state for component-specific data
- URL state for route parameters

## Authentication Flow

1. Login form submission
2. Session creation on server
3. React Query cache initialization
4. Protected route rendering

## Error Handling

- Global error boundary for unexpected errors
- React Query error states for data fetching errors
- Form validation errors handled by React Hook Form

## Performance Optimizations

- Code splitting with dynamic imports
- Memoization of expensive computations
- Optimized re-renders with React.memo
- Efficient data fetching with React Query

## Development Tools

- Vite for fast development server
- TypeScript for type safety
- ESLint and Prettier for code quality
- Tailwind CSS for styling
