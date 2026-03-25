import { users, pets, adoptions, stories, type User, type InsertUser, type Pet, type Adoption, type InsertAdoption, type UpdateUser, type Story, type InsertStory } from "@shared/schema";
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
  createPet(data: Omit<Pet, "id" | "isAdopted">): Promise<Pet>;
  updatePet(id: number, data: Partial<Pet>): Promise<Pet>;
  deletePet(id: number): Promise<void>;

  createAdoption(userId: number, data: InsertAdoption): Promise<Adoption>;
  getAdoptionsByUser(userId: number): Promise<Adoption[]>;
  getAllAdoptions(): Promise<(Adoption & { username: string })[]>;
  updateAdoptionStatus(id: number, status: string): Promise<Adoption>;

  getStories(): Promise<Story[]>;
  createStory(data: InsertStory): Promise<Story>;
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

  async createPet(data: Omit<Pet, "id" | "isAdopted">): Promise<Pet> {
    const [pet] = await db.insert(pets).values({ ...data, isAdopted: false }).returning();
    return pet;
  }

  async updatePet(id: number, data: Partial<Pet>): Promise<Pet> {
    const [pet] = await db.update(pets).set(data).where(eq(pets.id, id)).returning();
    return pet;
  }

  async deletePet(id: number): Promise<void> {
    await db.delete(adoptions).where(eq(adoptions.petId, id));
    await db.delete(pets).where(eq(pets.id, id));
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

  async getAllAdoptions(): Promise<(Adoption & { username: string })[]> {
    const rows = await db
      .select({
        id: adoptions.id,
        userId: adoptions.userId,
        petId: adoptions.petId,
        status: adoptions.status,
        applicantName: adoptions.applicantName,
        applicantEmail: adoptions.applicantEmail,
        applicantPhone: adoptions.applicantPhone,
        hasAdoptedBefore: adoptions.hasAdoptedBefore,
        hasPets: adoptions.hasPets,
        hasChildren: adoptions.hasChildren,
        livingSituation: adoptions.livingSituation,
        reason: adoptions.reason,
        createdAt: adoptions.createdAt,
        username: users.username,
      })
      .from(adoptions)
      .leftJoin(users, eq(adoptions.userId, users.id));
    return rows as (Adoption & { username: string })[];
  }

  async updateAdoptionStatus(id: number, status: string): Promise<Adoption> {
    const [adoption] = await db.update(adoptions).set({ status }).where(eq(adoptions.id, id)).returning();
    if (status === "rejected") {
      await db.update(pets).set({ isAdopted: false }).where(eq(pets.id, adoption.petId));
    }
    return adoption;
  }

  async getStories(): Promise<Story[]> {
    return await db.select().from(stories).orderBy(stories.createdAt);
  }

  async createStory(data: InsertStory): Promise<Story> {
    const [story] = await db.insert(stories).values(data).returning();
    return story;
  }
}

export const storage = new DatabaseStorage();
