import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Pet } from "@shared/schema";

export type { Pet };

export function usePets() {
  return useQuery<Pet[]>({
    queryKey: ["/api/pets"],
    queryFn: async () => {
      const res = await fetch("/api/pets");
      if (!res.ok) throw new Error("Failed to fetch pets");
      return res.json();
    },
  });
}

export function useAdoptPet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (petId: number) => {
      const res = await fetch("/api/adoptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId }),
      });
      if (res.status === 401) throw new Error("unauthorized");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Adoption failed");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/adoptions"] });
    },
  });
}
