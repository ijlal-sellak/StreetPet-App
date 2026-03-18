import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  FaPlus, FaTrash, FaEdit, FaCheckCircle, FaTimes, FaPaw, FaUsers,
  FaClipboardList, FaDog, FaCog, FaSignOutAlt
} from "react-icons/fa";
import type { Pet, Adoption } from "@shared/schema";

type AdoptionWithUser = Adoption & { username: string };

type PetFormData = {
  name: string; type: string; breed: string; age: string;
  imageUrl: string; description: string;
};

const emptyPetForm: PetFormData = {
  name: "", type: "dog", breed: "", age: "", imageUrl: "", description: "",
};

export default function AdminPage() {
  const { user, isLoading, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [tab, setTab] = useState<"pets" | "adoptions">("pets");
  const [petDialog, setPetDialog] = useState(false);
  const [editPet, setEditPet] = useState<Pet | null>(null);
  const [petForm, setPetForm] = useState<PetFormData>(emptyPetForm);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      setLocation("/login");
    }
  }, [user, isLoading]);

  const { data: allPets = [], isLoading: petsLoading } = useQuery<Pet[]>({
    queryKey: ["/api/admin/pets"],
    queryFn: async () => {
      const res = await fetch("/api/admin/pets");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    enabled: !!user?.isAdmin,
  });

  const { data: allAdoptions = [], isLoading: adoptionsLoading } = useQuery<AdoptionWithUser[]>({
    queryKey: ["/api/admin/adoptions"],
    queryFn: async () => {
      const res = await fetch("/api/admin/adoptions");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    enabled: !!user?.isAdmin,
  });

  const createPetMutation = useMutation({
    mutationFn: async (data: PetFormData) => {
      const res = await fetch("/api/admin/pets", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.message); }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
      toast({ title: "Pet added!", description: "The new pet is now listed." });
      setPetDialog(false); setPetForm(emptyPetForm);
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const updatePetMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<PetFormData> }) => {
      const res = await fetch(`/api/admin/pets/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
      toast({ title: "Pet updated!" });
      setPetDialog(false); setEditPet(null); setPetForm(emptyPetForm);
    },
    onError: () => toast({ title: "Error", description: "Could not update pet.", variant: "destructive" }),
  });

  const deletePetMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/pets/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
      toast({ title: "Pet deleted." });
      setDeleteId(null);
    },
    onError: () => toast({ title: "Error", description: "Could not delete pet.", variant: "destructive" }),
  });

  const markAdoptedMutation = useMutation({
    mutationFn: async ({ petId, adopted }: { petId: number; adopted: boolean }) => {
      const res = await fetch(`/api/admin/pets/${petId}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdopted: adopted }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
      toast({ title: "Pet status updated!" });
    },
  });

  const updateAdoptionMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await fetch(`/api/admin/adoptions/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/adoptions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
      toast({ title: "Adoption status updated!" });
    },
    onError: () => toast({ title: "Error", description: "Could not update adoption.", variant: "destructive" }),
  });

  function openAddPet() {
    setEditPet(null); setPetForm(emptyPetForm); setPetDialog(true);
  }
  function openEditPet(pet: Pet) {
    setEditPet(pet);
    setPetForm({ name: pet.name, type: pet.type, breed: pet.breed, age: pet.age, imageUrl: pet.imageUrl, description: pet.description });
    setPetDialog(true);
  }
  function handlePetSubmit() {
    if (!petForm.name || !petForm.breed || !petForm.age || !petForm.imageUrl || !petForm.description) {
      toast({ title: "All fields are required", variant: "destructive" }); return;
    }
    if (editPet) {
      updatePetMutation.mutate({ id: editPet.id, data: petForm });
    } else {
      createPetMutation.mutate(petForm);
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!user?.isAdmin) return null;

  const pending = allAdoptions.filter(a => a.status === "pending").length;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FaCog className="text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">Administrator</span>
              </div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome back, {user.username}</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={openAddPet} className="bg-primary hover:bg-primary/90 rounded-xl" data-testid="button-add-pet">
                <FaPlus className="mr-2" /> Add New Pet
              </Button>
              <Button variant="outline" onClick={() => logoutMutation.mutate()} className="rounded-xl border-gray-600 text-white hover:bg-gray-700">
                <FaSignOutAlt className="mr-2" /> Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="container mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FaDog, label: "Total Pets", value: allPets.length, color: "text-primary" },
              { icon: FaCheckCircle, label: "Adopted", value: allPets.filter(p => p.isAdopted).length, color: "text-green-500" },
              { icon: FaClipboardList, label: "Applications", value: allAdoptions.length, color: "text-blue-500" },
              { icon: FaUsers, label: "Pending Review", value: pending, color: "text-yellow-500" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
                <Icon className={`text-2xl ${color}`} />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{value}</p>
                  <p className="text-xs text-gray-400 font-medium">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-2 mb-6">
            {(["pets", "adoptions"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-3 rounded-xl font-bold capitalize transition-all ${
                  tab === t ? "bg-primary text-white shadow-lg shadow-primary/25" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                }`}
              >
                {t === "pets" ? <><FaDog className="inline mr-2" />Manage Pets</> : <><FaClipboardList className="inline mr-2" />Adoption Applications</>}
              </button>
            ))}
          </div>

          {/* Pets Tab */}
          {tab === "pets" && (
            <div>
              {petsLoading ? (
                <div className="flex justify-center py-20">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allPets.map((pet) => (
                    <div key={pet.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                      <div className="relative h-44 overflow-hidden">
                        <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover" />
                        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${pet.isAdopted ? "bg-green-500 text-white" : "bg-yellow-400 text-gray-800"}`}>
                          {pet.isAdopted ? "Adopted" : "Available"}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-800 text-lg">{pet.name}</h3>
                        <p className="text-gray-500 text-sm mb-1">{pet.breed} · {pet.age}</p>
                        <p className="text-gray-400 text-xs capitalize mb-4">{pet.type}</p>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" className="rounded-lg flex-1" onClick={() => openEditPet(pet)} data-testid={`button-edit-pet-${pet.id}`}>
                            <FaEdit className="mr-1" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className={`rounded-lg flex-1 ${pet.isAdopted ? "border-yellow-400 text-yellow-600 hover:bg-yellow-50" : "border-green-400 text-green-600 hover:bg-green-50"}`}
                            onClick={() => markAdoptedMutation.mutate({ petId: pet.id, adopted: !pet.isAdopted })}
                            data-testid={`button-toggle-adopted-${pet.id}`}
                          >
                            {pet.isAdopted ? <><FaTimes className="mr-1" /> Unmark</> : <><FaCheckCircle className="mr-1" /> Mark Adopted</>}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-lg text-red-500 border-red-200 hover:bg-red-50"
                            onClick={() => setDeleteId(pet.id)}
                            data-testid={`button-delete-pet-${pet.id}`}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Add Pet Card */}
                  <button
                    onClick={openAddPet}
                    className="bg-white rounded-3xl shadow-sm border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 p-8 min-h-[280px] group"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <FaPlus className="text-primary text-xl" />
                    </div>
                    <p className="font-bold text-gray-500 group-hover:text-primary transition-colors">Add New Pet</p>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Adoptions Tab */}
          {tab === "adoptions" && (
            <div className="space-y-4">
              {adoptionsLoading ? (
                <div className="flex justify-center py-20">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : allAdoptions.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                  <FaClipboardList className="text-gray-200 text-5xl mx-auto mb-4" />
                  <p className="text-gray-400">No adoption applications yet.</p>
                </div>
              ) : (
                allAdoptions.map((adoption) => {
                  const pet = allPets.find(p => p.id === adoption.petId);
                  return (
                    <div key={adoption.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Pet info */}
                        <div className="flex items-center gap-4 md:w-48 flex-shrink-0">
                          {pet && (
                            <img src={pet.imageUrl} alt={pet.name} className="w-14 h-14 rounded-2xl object-cover" />
                          )}
                          <div>
                            <p className="font-bold text-gray-800">{pet?.name ?? "Unknown"}</p>
                            <p className="text-xs text-gray-400">{pet?.breed}</p>
                          </div>
                        </div>
                        {/* Applicant info */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div><span className="text-gray-400">Applicant:</span> <span className="font-semibold text-gray-700">{adoption.applicantName}</span></div>
                          <div><span className="text-gray-400">Email:</span> <span className="font-semibold text-gray-700">{adoption.applicantEmail}</span></div>
                          <div><span className="text-gray-400">Phone:</span> <span className="text-gray-700">{adoption.applicantPhone}</span></div>
                          <div><span className="text-gray-400">User:</span> <span className="text-gray-700">@{adoption.username}</span></div>
                          <div><span className="text-gray-400">Home:</span> <span className="text-gray-700">{adoption.livingSituation?.replace(/_/g, " ")}</span></div>
                          <div className="flex gap-3 text-xs">
                            {adoption.hasAdoptedBefore && <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Adopted before</span>}
                            {adoption.hasPets && <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">Has pets</span>}
                            {adoption.hasChildren && <span className="bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full">Has children</span>}
                          </div>
                          <div className="sm:col-span-2"><span className="text-gray-400">Reason: </span><span className="text-gray-600 italic">"{adoption.reason}"</span></div>
                        </div>
                        {/* Status & Actions */}
                        <div className="flex flex-col items-end gap-3 flex-shrink-0">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            adoption.status === "pending" ? "bg-yellow-100 text-yellow-700"
                            : adoption.status === "approved" ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}>
                            {adoption.status.charAt(0).toUpperCase() + adoption.status.slice(1)}
                          </span>
                          {adoption.status === "pending" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="rounded-xl bg-green-500 hover:bg-green-600 text-white"
                                onClick={() => updateAdoptionMutation.mutate({ id: adoption.id, status: "approved" })}
                                disabled={updateAdoptionMutation.isPending}
                                data-testid={`button-approve-${adoption.id}`}
                              >
                                <FaCheckCircle className="mr-1" /> Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="rounded-xl border-red-300 text-red-500 hover:bg-red-50"
                                onClick={() => updateAdoptionMutation.mutate({ id: adoption.id, status: "rejected" })}
                                disabled={updateAdoptionMutation.isPending}
                                data-testid={`button-reject-${adoption.id}`}
                              >
                                <FaTimes className="mr-1" /> Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Pet Dialog */}
      <Dialog open={petDialog} onOpenChange={(open) => { if (!open) { setPetDialog(false); setEditPet(null); setPetForm(emptyPetForm); } }}>
        <DialogContent className="rounded-3xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{editPet ? "Edit Pet" : "Add New Pet"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 col-span-2">
                <Label className="font-semibold text-gray-700">Pet Name *</Label>
                <Input value={petForm.name} onChange={e => setPetForm(f => ({ ...f, name: e.target.value }))} placeholder="Max" className="rounded-xl" />
              </div>
              <div className="space-y-1">
                <Label className="font-semibold text-gray-700">Type *</Label>
                <select value={petForm.type} onChange={e => setPetForm(f => ({ ...f, type: e.target.value }))} className="w-full h-10 rounded-xl border border-gray-200 px-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label className="font-semibold text-gray-700">Age *</Label>
                <Input value={petForm.age} onChange={e => setPetForm(f => ({ ...f, age: e.target.value }))} placeholder="2 years" className="rounded-xl" />
              </div>
              <div className="space-y-1 col-span-2">
                <Label className="font-semibold text-gray-700">Breed *</Label>
                <Input value={petForm.breed} onChange={e => setPetForm(f => ({ ...f, breed: e.target.value }))} placeholder="Golden Retriever" className="rounded-xl" />
              </div>
              <div className="space-y-1 col-span-2">
                <Label className="font-semibold text-gray-700">Image URL *</Label>
                <Input value={petForm.imageUrl} onChange={e => setPetForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." className="rounded-xl" />
                {petForm.imageUrl && (
                  <img src={petForm.imageUrl} alt="preview" className="w-20 h-20 rounded-xl object-cover mt-1" />
                )}
              </div>
              <div className="space-y-1 col-span-2">
                <Label className="font-semibold text-gray-700">Description *</Label>
                <Textarea value={petForm.description} onChange={e => setPetForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe the pet..." className="rounded-xl resize-none" rows={3} />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setPetDialog(false); setEditPet(null); setPetForm(emptyPetForm); }} className="rounded-xl">Cancel</Button>
            <Button onClick={handlePetSubmit} disabled={createPetMutation.isPending || updatePetMutation.isPending} className="rounded-xl bg-primary hover:bg-primary/90">
              {(createPetMutation.isPending || updatePetMutation.isPending) ? "Saving..." : (editPet ? "Save Changes" : "Add Pet")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this pet?</AlertDialogTitle>
            <AlertDialogDescription>This will permanently remove the pet and all its adoption applications. This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId !== null && deletePetMutation.mutate(deleteId)} className="rounded-xl bg-red-500 hover:bg-red-600" disabled={deletePetMutation.isPending}>
              {deletePetMutation.isPending ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
