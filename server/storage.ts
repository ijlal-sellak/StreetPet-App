import { users, pets, adoptions, type User, type InsertUser, type Pet, type Adoption, type InsertAdoption, type UpdateUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: UpdateUser): Promise<User>;
  deleteUser(id: number): Promise<void>;

  getPets(): Promise<Pet[]>;
  getPet(id: number): Promise<Pet | undefined>;
  createAdoption(userId: number, data: InsertAdoption): Promise<Adoption>;
  getAdoptionsByUser(userId: number): Promise<Adoption[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, data: UpdateUser): Promise<User> {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    await db.delete(adoptions).where(eq(adoptions.userId, id));
    await db.delete(users).where(eq(users.id, id));
  }

  async getPets(): Promise<Pet[]> {
    return await db.select().from(pets);
  }

  async getPet(id: number): Promise<Pet | undefined> {
    const [pet] = await db.select().from(pets).where(eq(pets.id, id));
    return pet;
  }

  async createAdoption(userId: number, data: InsertAdoption): Promise<Adoption> {
    const [adoption] = await db.insert(adoptions).values({
      userId,
      petId: data.petId,
      status: "pending",
      applicantName: data.applicantName,
      applicantEmail: data.applicantEmail,
      applicantPhone: data.applicantPhone,
      hasAdoptedBefore: data.hasAdoptedBefore,
      hasPets: data.hasPets,
      hasChildren: data.hasChildren,
      livingSituation: data.livingSituation,
      reason: data.reason,
    }).returning();
    await db.update(pets).set({ isAdopted: true }).where(eq(pets.id, data.petId));
    return adoption;
  }

  async getAdoptionsByUser(userId: number): Promise<Adoption[]> {
    return await db.select().from(adoptions).where(eq(adoptions.userId, userId));
  }
}

export const storage = new DatabaseStorage();
