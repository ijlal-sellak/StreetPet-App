import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
  bio: text("bio").default(""),
  avatarUrl: text("avatar_url").default(""),
});

export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  breed: text("breed").notNull(),
  age: text("age").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  isAdopted: boolean("is_adopted").default(false),
});

export const adoptions = pgTable("adoptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  petId: integer("pet_id").notNull(),
  status: text("status").notNull().default("pending"),
  applicantName: text("applicant_name").notNull().default(""),
  applicantEmail: text("applicant_email").notNull().default(""),
  applicantPhone: text("applicant_phone").notNull().default(""),
  hasAdoptedBefore: boolean("has_adopted_before").default(false),
  hasPets: boolean("has_pets").default(false),
  hasChildren: boolean("has_children").default(false),
  livingSituation: text("living_situation").notNull().default(""),
  reason: text("reason").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPetSchema = createInsertSchema(pets);

export const insertAdoptionSchema = z.object({
  petId: z.number(),
  applicantName: z.string().min(1, "Name is required"),
  applicantEmail: z.string().email("Valid email is required"),
  applicantPhone: z.string().min(1, "Phone is required"),
  hasAdoptedBefore: z.boolean(),
  hasPets: z.boolean(),
  hasChildren: z.boolean(),
  livingSituation: z.string().min(1, "Please select your living situation"),
  reason: z.string().min(10, "Please tell us why you want to adopt (min 10 characters)"),
});

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  authorName: text("author_name").notNull(),
  petName: text("pet_name").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertStorySchema = createInsertSchema(stories).omit({ id: true, createdAt: true });

export const updateUserSchema = z.object({
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertAdoption = z.infer<typeof insertAdoptionSchema>;
export type InsertStory = z.infer<typeof insertStorySchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type User = typeof users.$inferSelect;
export type Pet = typeof pets.$inferSelect;
export type Adoption = typeof adoptions.$inferSelect;
export type Story = typeof stories.$inferSelect;
