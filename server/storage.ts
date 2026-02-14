import { users, pets, adoptions, type User, type InsertUser, type Pet, type Adoption } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPets(): Promise<Pet[]>;
  getPet(id: number): Promise<Pet | undefined>;
  createAdoption(userId: number, petId: number): Promise<Adoption>;
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

  async getPets(): Promise<Pet[]> {
    return await db.select().from(pets);
  }

  async getPet(id: number): Promise<Pet | undefined> {
    const [pet] = await db.select().from(pets).where(eq(pets.id, id));
    return pet;
  }

  async createAdoption(userId: number, petId: number): Promise<Adoption> {
    const [adoption] = await db.insert(adoptions).values({ userId, petId, status: "pending" }).returning();
    await db.update(pets).set({ isAdopted: true }).where(eq(pets.id, petId));
    return adoption;
  }

  async getAdoptionsByUser(userId: number): Promise<Adoption[]> {
    return await db.select().from(adoptions).where(eq(adoptions.userId, userId));
  }
}

export const storage = new DatabaseStorage();
