import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaUserCircle, FaHeart, FaHistory, FaCog,
  FaSignOutAlt, FaTrash, FaEdit, FaSave, FaTimes, FaPaw
} from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Adoption, Pet } from "@shared/schema";

export default function ProfilePage() {
  const { user, isLoading, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bioValue, setBioValue] = useState("");
  const [avatarValue, setAvatarValue] = useState("");

  useEffect(() => {
    if (!isLoading && !user) setLocation("/login");
  }, [user, isLoading, setLocation]);

  useEffect(() => {
    if (user) {
      setBioValue(user.bio || "");
      setAvatarValue(user.avatarUrl || "");
    }
  }, [user]);

  const { data: adoptions = [] } = useQuery<Adoption[]>({
    queryKey: ["/api/adoptions"],
    queryFn: async () => {
      const res = await fetch("/api/adoptions");
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!user,
  });

  const { data: allPets = [] } = useQuery<Pet[]>({
    queryKey: ["/api/pets"],
    queryFn: async () => {
      const res = await fetch("/api/pets");
      if (!res.ok) return [];
      return res.json();
    },
    enabled: adoptions.length > 0,
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: { bio?: string; avatarUrl?: string }) => {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      return res.json();
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["/api/user"], updatedUser);
      toast({ title: "Profile updated!", description: "Your changes have been saved." });
      setEditDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Could not update profile.", variant: "destructive" });
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/user", { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete account");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({ title: "Account deleted", description: "Your account has been removed." });
      setLocation("/");
    },
    onError: () => {
      toast({ title: "Error", description: "Could not delete account.", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!user) return null;

  const adoptedPets = adoptions.map((adoption) => {
    const pet = allPets.find((p) => p.id === adoption.petId);
    return { adoption, pet };
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center shadow-lg bg-white flex-shrink-0">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.username} className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle size={80} className="text-gray-300" />
              )}
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-1">Hello, {user.username}!</h1>
              {user.bio ? (
                <p className="text-gray-500 italic">"{user.bio}"</p>
              ) : (
                <p className="text-gray-400 text-sm">No bio yet — add one in Settings</p>
              )}
              <p className="text-gray-400 text-sm mt-1">{adoptions.length} adoption{adoptions.length !== 1 ? "s" : ""} submitted</p>
            </div>

            {/* Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl border-2" data-testid="button-settings">
                  <FaCog className="mr-2" /> Settings
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-2xl p-1 shadow-xl border border-gray-100">
                <DropdownMenuItem
                  className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-50 font-medium"
                  onClick={() => setEditDialogOpen(true)}
                  data-testid="menu-edit-profile"
                >
                  <FaEdit className="text-primary" />
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem
                  className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-50 font-medium"
                  onClick={() => logoutMutation.mutate()}
                  data-testid="menu-logout"
                >
                  <FaSignOutAlt className="text-gray-500" />
                  Logout
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem
                  className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-red-50 text-red-500 font-medium"
                  onClick={() => setDeleteDialogOpen(true)}
                  data-testid="menu-delete-account"
                >
                  <FaTrash />
                  Delete Account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Content Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Adoption History */}
            <Card className="rounded-3xl border-0 shadow-lg overflow-hidden md:col-span-2">
              <CardHeader className="bg-white border-b border-gray-100 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                  <FaHistory className="text-secondary" />
                  My Adoption Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-gray-50/50 min-h-[200px]">
                {adoptedPets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FaPaw className="text-gray-200 text-5xl mb-4" />
                    <p className="text-gray-400 mb-4">You haven't applied for any adoptions yet.</p>
                    <Button
                      variant="outline"
                      className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => setLocation("/")}
                    >
                      Browse Pets
                    </Button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {adoptedPets.map(({ adoption, pet }) => (
                      <div
                        key={adoption.id}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4"
                      >
                        {pet ? (
                          <img src={pet.imageUrl} alt={pet.name} className="w-14 h-14 rounded-xl object-cover" />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                            <FaPaw className="text-gray-300 text-2xl" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">{pet?.name ?? "Unknown Pet"}</p>
                          <p className="text-sm text-gray-400">{pet?.breed}</p>
                          <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                            adoption.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : adoption.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {adoption.status.charAt(0).toUpperCase() + adoption.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Favorites placeholder */}
            <Card className="rounded-3xl border-0 shadow-lg overflow-hidden md:col-span-2">
              <CardHeader className="bg-white border-b border-gray-100 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                  <FaHeart className="text-primary" />
                  Saved Pets
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center bg-gray-50/50 min-h-[120px] flex flex-col items-center justify-center">
                <p className="text-gray-400 mb-4">Favorites feature coming soon!</p>
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => setLocation("/")}
                >
                  Browse Pets
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
            <DialogDescription>Update your bio and profile picture.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label htmlFor="avatarUrl" className="font-semibold text-gray-700">Profile Picture URL</Label>
              <Input
                id="avatarUrl"
                value={avatarValue}
                onChange={(e) => setAvatarValue(e.target.value)}
                placeholder="https://example.com/your-photo.jpg"
                className="rounded-xl"
              />
              {avatarValue && (
                <div className="flex justify-center mt-2">
                  <img src={avatarValue} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
                </div>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="bio" className="font-semibold text-gray-700">Bio</Label>
              <Textarea
                id="bio"
                value={bioValue}
                onChange={(e) => setBioValue(e.target.value)}
                placeholder="Tell us a little about yourself..."
                className="rounded-xl resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="rounded-xl">
              <FaTimes className="mr-1" /> Cancel
            </Button>
            <Button
              onClick={() => updateUserMutation.mutate({ bio: bioValue, avatarUrl: avatarValue })}
              disabled={updateUserMutation.isPending}
              className="rounded-xl bg-primary hover:bg-primary/90"
            >
              <FaSave className="mr-1" />
              {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">Delete Account?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your account and all adoption history. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteAccountMutation.mutate()}
              className="rounded-xl bg-red-500 hover:bg-red-600"
              disabled={deleteAccountMutation.isPending}
            >
              {deleteAccountMutation.isPending ? "Deleting..." : "Yes, Delete My Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
