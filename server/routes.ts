import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { db } from "./db";
import { pets } from "@shared/schema";
import { insertAdoptionSchema, updateUserSchema } from "@shared/schema";

async function seedPets() {
  const existingPets = await storage.getPets();
  if (existingPets.length === 0) {
    const samplePets = [
      { name: "Max", type: "dog", breed: "Golden Retriever", age: "2 years", imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=60", description: "Friendly and energetic Golden Retriever looking for a home." },
      { name: "Luna", type: "cat", breed: "Siamese", age: "1 year", imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=60", description: "Gentle Siamese cat who loves to cuddle." },
      { name: "Rocky", type: "dog", breed: "Bulldog", age: "4 years", imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=60", description: "Calm and loyal bulldog who enjoys slow walks." },
      { name: "Bella", type: "cat", breed: "Tabby", age: "3 years", imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=500&q=60", description: "Independent tabby cat with a curious spirit." },
    ];
    await db.insert(pets).values(samplePets);
  }
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  setupAuth(app);
  await seedPets();

  app.get("/api/pets", async (req, res) => {
    const allPets = await storage.getPets();
    res.json(allPets);
  });

  app.get("/api/pets/:id", async (req, res) => {
    const pet = await storage.getPet(Number(req.params.id));
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  });

  app.post("/api/adoptions", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const parsed = insertAdoptionSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.errors[0].message });

    const pet = await storage.getPet(parsed.data.petId);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    if (pet.isAdopted) return res.status(400).json({ message: "This pet has already been adopted" });

    const adoption = await storage.createAdoption((req.user as any).id, parsed.data);
    res.status(201).json(adoption);
  });

  app.get("/api/adoptions", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userAdoptions = await storage.getAdoptionsByUser((req.user as any).id);
    res.json(userAdoptions);
  });

  app.patch("/api/user", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: parsed.error.errors[0].message });
    const updated = await storage.updateUser((req.user as any).id, parsed.data);
    res.json(updated);
  });

  app.delete("/api/user", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const userId = (req.user as any).id;
    await storage.deleteUser(userId);
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Error during logout" });
      res.sendStatus(200);
    });
  });

  return httpServer;
}
