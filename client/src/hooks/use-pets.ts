import { useState } from "react";

// Mock Data for Pets (since no backend API provided for pets yet)
export interface Pet {
  id: number;
  name: string;
  type: "dog" | "cat" | "other";
  breed: string;
  age: string;
  description: string;
  image: string;
  tags: string[];
}

const MOCK_PETS: Pet[] = [
  {
    id: 1,
    name: "Max",
    type: "dog",
    breed: "Golden Retriever",
    age: "2 years",
    description: "Friendly and energetic, loves playing fetch!",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80", // golden retriever
    tags: ["Friendly", "Energetic", "Good with kids"],
  },
  {
    id: 2,
    name: "Luna",
    type: "cat",
    breed: "Siamese",
    age: "1 year",
    description: "Quiet and affectionate, loves warm laps.",
    image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800&q=80", // siamese cat
    tags: ["Calm", "Indoor", "Cuddly"],
  },
  {
    id: 3,
    name: "Charlie",
    type: "dog",
    breed: "Beagle",
    age: "3 years",
    description: "Curious and loves to sniff around.",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&q=80", // beagle
    tags: ["Curious", "Playful", "Foodie"],
  },
  {
    id: 4,
    name: "Bella",
    type: "cat",
    breed: "Persian",
    age: "4 years",
    description: "Fluffy and regal, needs daily grooming.",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800&q=80", // persian cat
    tags: ["Fluffy", "Chill", "Independent"],
  },
  {
    id: 5,
    name: "Rocky",
    type: "dog",
    breed: "Bulldog",
    age: "5 years",
    description: "A gentle giant who loves naps.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80", // bulldog
    tags: ["Gentle", "Lazy", "Loving"],
  },
  {
    id: 6,
    name: "Nibbles",
    type: "other",
    breed: "Hamster",
    age: "6 months",
    description: "Tiny and fast, loves his wheel.",
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800&q=80", // hamster
    tags: ["Small", "Active", "Cute"],
  },
];

export function usePets() {
  // Simulating an async fetch
  return {
    data: MOCK_PETS,
    isLoading: false,
    error: null
  };
}
