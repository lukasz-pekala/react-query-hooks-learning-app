# API Endpoints Documentation

## Authentication Endpoints

### POST /api/auth/login

Authenticates a user and creates a session.

**Request Body:**

```typescript
{
  username: string;
  password: string;
}
```

**Response:**

- Success: 200 OK with user data
- Failure: 401 Unauthorized

### POST /api/auth/logout

Ends the current user session.

**Response:**

- Success: 200 OK
- Failure: 401 Unauthorized

### GET /api/auth/me

Returns the currently authenticated user.

**Response:**

- Success: 200 OK with user data
- Failure: 401 Unauthorized

## User Management

### POST /api/users

Creates a new user.

**Request Body:**

```typescript
{
  username: string;
  password: string;
}
```

**Response:**

- Success: 201 Created with user data
- Failure: 400 Bad Request (if username exists)

## Progress Tracking

### GET /api/progress

Gets all progress entries for the current user.

**Response:**

```typescript
Progress[] // Array of progress entries
```

### POST /api/progress

Updates or creates a progress entry.

**Request Body:**

```typescript
{
  tutorialId: string;
  completed?: boolean;
  quizCompleted?: boolean;
  lastViewed?: Date;
}
```

**Response:**

- Success: 200 OK with updated progress
- Failure: 401 Unauthorized

## Quiz Attempts

### POST /api/quiz-attempts

Saves a quiz attempt.

**Request Body:**

```typescript
{
  tutorialId: string;
  score: number;
  attemptedAt: Date;
}
```

**Response:**

- Success: 201 Created with quiz attempt data
- Failure: 401 Unauthorized

### GET /api/quiz-attempts/:tutorialId

Gets all quiz attempts for a specific tutorial.

**Response:**

```typescript
QuizAttempt[] // Array of quiz attempts
```

## WebSocket Endpoints

### WS /ws

Establishes a WebSocket connection for real-time updates.

**Events:**

- `progress:update`: Emitted when progress is updated
- `quiz:attempt`: Emitted when a quiz attempt is saved

## Error Responses

All endpoints may return the following error responses:

- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication required or failed
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Authentication

- All endpoints except login and user creation require authentication
- Authentication is handled via session cookies
- WebSocket connections require valid session
