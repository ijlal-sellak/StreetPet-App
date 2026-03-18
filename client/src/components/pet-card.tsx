import { Pet, useAdoptPet } from "@/hooks/use-pets";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { FaHeart, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const adoptMutation = useAdoptPet();

  function handleAdopt() {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to adopt a pet.",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }

    adoptMutation.mutate(pet.id, {
      onSuccess: () => {
        toast({
          title: "Adoption request sent!",
          description: `Your request to adopt ${pet.name} has been submitted.`,
        });
      },
      onError: (err: Error) => {
        if (err.message === "unauthorized") {
          toast({
            title: "Login required",
            description: "Please log in to adopt a pet.",
            variant: "destructive",
          });
          setLocation("/login");
        } else {
          toast({
            title: "Adoption failed",
            description: err.message,
            variant: "destructive",
          });
        }
      },
    });
  }

  const isAdopted = pet.isAdopted;
  const isPending = adoptMutation.isPending;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {isAdopted && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-green-500 text-white font-bold text-lg px-6 py-2 rounded-full flex items-center gap-2">
              <FaCheckCircle /> Adopted
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
            <FaHeart />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
          <div className="flex items-center gap-1 text-sm font-medium">
            <FaMapMarkerAlt className="text-yellow-400" />
            <span>Available for adoption</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{pet.name}</h3>
            <p className="text-gray-500 font-medium">{pet.breed}</p>
          </div>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">
            {pet.age}
          </span>
        </div>

        <p className="text-gray-500 mb-6 line-clamp-2 text-sm leading-relaxed">
          {pet.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-blue-50 text-blue-500 text-xs font-semibold rounded-lg capitalize">
            {pet.type}
          </span>
        </div>

        <Button
          data-testid={`button-adopt-${pet.id}`}
          className="w-full rounded-xl py-6 text-lg font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleAdopt}
          disabled={isAdopted || isPending}
        >
          {isAdopted
            ? "Already Adopted"
            : isPending
            ? "Submitting..."
            : `Adopt ${pet.name}`}
        </Button>
      </div>
    </motion.div>
  );
}
