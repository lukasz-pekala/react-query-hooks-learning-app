import { Global, Injectable, OnModuleInit } from "@nestjs/common";
import {
  InsertProgress,
  InsertQuizAttempt,
  InsertUser,
  Progress,
  QuizAttempt,
  User,
} from "shared/schema";

@Injectable()
export class MemStorageService implements OnModuleInit {
  private users: Map<number, User>;
  private progress: Map<number, Progress[]>;
  private quizAttempts: Map<number, QuizAttempt[]>;
  private currentUserId: number;
  private currentProgressId: number;
  private currentQuizAttemptId: number;

  constructor() {
    this.users = new Map();
    this.progress = new Map();
    this.quizAttempts = new Map();
    this.currentUserId = 1;
    this.currentProgressId = 1;
    this.currentQuizAttemptId = 1;
  }

  // Explanation:
  // This is a method that is called when the module is initialized.
  // It is used to add a default user for demonstration purposes.
  // It must be async because it returns a Promise.
  // We can't use the constructor to do this because the constructor is called synchronously.
  async onModuleInit() {
    // Add a default user for demonstration purposes
    await this.createUser({ username: "demo", password: "demo" });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Progress methods
  async getUserProgress(userId: number): Promise<Progress[]> {
    console.log("getUserProgress", userId);
    return this.progress.get(userId) || [];
  }

  async updateUserProgress(insertProgress: InsertProgress): Promise<Progress> {
    const userId = insertProgress.userId;
    const tutorialId = insertProgress.tutorialId;

    // Initialize progress array for user if it doesn't exist
    if (!this.progress.has(userId)) {
      this.progress.set(userId, []);
    }

    // Check if progress for this tutorial already exists
    const userProgress = this.progress.get(userId)!;
    const existingProgressIndex = userProgress.findIndex(
      (p) => p.tutorialId === tutorialId
    );

    if (existingProgressIndex !== -1) {
      // Update existing progress
      const existingProgress = userProgress[existingProgressIndex];
      const updatedProgress: Progress = {
        ...existingProgress,
        ...insertProgress,
        completed: insertProgress.completed ?? existingProgress.completed,
        quizCompleted:
          insertProgress.quizCompleted ?? existingProgress.quizCompleted,
        lastViewed: insertProgress.lastViewed ?? existingProgress.lastViewed,
      };
      userProgress[existingProgressIndex] = updatedProgress;
      return updatedProgress;
    } else {
      // Create new progress entry
      const id = this.currentProgressId++;
      const newProgress: Progress = {
        ...insertProgress,
        id,
        completed: insertProgress.completed ?? false,
        quizCompleted: insertProgress.quizCompleted ?? false,
        lastViewed: insertProgress.lastViewed ?? null,
      };
      userProgress.push(newProgress);
      return newProgress;
    }
  }

  // Quiz attempt methods
  async saveQuizAttempt(
    insertQuizAttempt: InsertQuizAttempt
  ): Promise<QuizAttempt> {
    const userId = insertQuizAttempt.userId;

    // Initialize quiz attempts array for user if it doesn't exist
    if (!this.quizAttempts.has(userId)) {
      this.quizAttempts.set(userId, []);
    }

    const id = this.currentQuizAttemptId++;
    const quizAttempt: QuizAttempt = { ...insertQuizAttempt, id };

    this.quizAttempts.get(userId)!.push(quizAttempt);

    // Update user progress to mark quiz as completed
    const userProgress = this.progress.get(userId) || [];
    const existingProgressIndex = userProgress.findIndex(
      (p) => p.tutorialId === insertQuizAttempt.tutorialId
    );

    if (existingProgressIndex !== -1) {
      userProgress[existingProgressIndex].quizCompleted = true;
    } else {
      const progressId = this.currentProgressId++;
      const newProgress: Progress = {
        id: progressId,
        userId,
        tutorialId: insertQuizAttempt.tutorialId,
        completed: true,
        quizCompleted: true,
        lastViewed: insertQuizAttempt.attemptedAt,
      };
      userProgress.push(newProgress);
      this.progress.set(userId, userProgress);
    }

    return quizAttempt;
  }

  async getQuizAttempts(
    userId: number,
    tutorialId: string
  ): Promise<QuizAttempt[]> {
    const userAttempts = this.quizAttempts.get(userId) || [];
    return userAttempts.filter((attempt) => attempt.tutorialId === tutorialId);
  }
}
