# Storage Implementation Documentation

## Overview

The application uses an in-memory storage implementation (`MemStorage`) that implements the `IStorage` interface. This provides a simple way to store and manage user data, progress tracking, and quiz attempts during development.

## Storage Interface (`IStorage`)

The storage interface defines the following methods:

### User Management

- `getUser(id: number)`: Retrieves a user by ID
- `getUserByUsername(username: string)`: Retrieves a user by username
- `createUser(user: InsertUser)`: Creates a new user

### Progress Tracking

- `getUserProgress(userId: number)`: Gets all progress entries for a user
- `updateUserProgress(progress: InsertProgress)`: Updates or creates user progress

### Quiz Attempts

- `saveQuizAttempt(quizAttempt: InsertQuizAttempt)`: Saves a quiz attempt
- `getQuizAttempts(userId: number, tutorialId: string)`: Retrieves quiz attempts for a user and tutorial

## Implementation Details (`MemStorage`)

### Data Structures

- Uses `Map` objects to store:
  - Users: `Map<number, User>`
  - Progress: `Map<number, Progress[]>`
  - Quiz Attempts: `Map<number, QuizAttempt[]>`

### Key Features

1. **Auto-incrementing IDs**:

   - Maintains separate counters for users, progress, and quiz attempts
   - Automatically assigns new IDs when creating records

2. **Progress Management**:

   - Supports updating existing progress
   - Handles both completion status and quiz completion
   - Tracks last viewed timestamp

3. **Quiz Attempt Integration**:
   - Automatically updates progress when quiz attempts are saved
   - Links quiz attempts to specific tutorials
   - Maintains attempt history

### Default User

- Creates a default demo user on initialization:
  - Username: "demo"
  - Password: "demo"

## Data Models

### User

```typescript
interface User {
  id: number;
  username: string;
  password: string;
}
```

### Progress

```typescript
interface Progress {
  id: number;
  userId: number;
  tutorialId: string;
  completed: boolean;
  quizCompleted: boolean;
  lastViewed: Date | null;
}
```

### Quiz Attempt

```typescript
interface QuizAttempt {
  id: number;
  userId: number;
  tutorialId: string;
  score: number;
  attemptedAt: Date;
}
```

## Usage Notes

- This is an in-memory implementation suitable for development
- Data is not persisted between server restarts
- Consider implementing a database-backed storage for production use
