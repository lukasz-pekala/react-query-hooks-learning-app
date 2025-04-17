import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  jsonb,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Progress tracking schema
export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  tutorialId: text("tutorial_id").notNull(),
  completed: boolean("completed").default(false),
  quizCompleted: boolean("quiz_completed").default(false),
  lastViewed: date("last_viewed"), // Explanation: I had to change this because we needed proper validation in ProgressDto
});

export const insertProgressSchema = createInsertSchema(progress).pick({
  userId: true,
  tutorialId: true,
  completed: true,
  quizCompleted: true,
  lastViewed: true,
});

// Quiz attempts schema
export const quizAttempts = pgTable("quiz_attempts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  tutorialId: text("tutorial_id").notNull(),
  score: integer("score").notNull(),
  answers: jsonb("answers").notNull(),
  attemptedAt: text("attempted_at").notNull(),
});

export const insertQuizAttemptSchema = createInsertSchema(quizAttempts).pick({
  userId: true,
  tutorialId: true,
  score: true,
  answers: true,
  attemptedAt: true,
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type Progress = typeof progress.$inferSelect;

export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
