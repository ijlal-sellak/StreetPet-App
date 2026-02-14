import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // dog, cat, other
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
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPetSchema = createInsertSchema(pets);
export const insertAdoptionSchema = createInsertSchema(adoptions).pick({
  userId: true,
  petId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Pet = typeof pets.$inferSelect;
export type Adoption = typeof adoptions.$inferSelect;
