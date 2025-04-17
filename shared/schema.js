import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
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
    userId: integer("user_id").notNull().references(() => users.id),
    tutorialId: text("tutorial_id").notNull(),
    completed: boolean("completed").default(false),
    quizCompleted: boolean("quiz_completed").default(false),
    lastViewed: text("last_viewed"),
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
    userId: integer("user_id").notNull().references(() => users.id),
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
