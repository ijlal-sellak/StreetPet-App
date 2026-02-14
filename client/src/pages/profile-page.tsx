import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { FaUserCircle, FaHeart, FaHistory, FaCog } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const { user, isLoading, logoutMutation } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg text-gray-300">
              <FaUserCircle size={80} />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Hello, {user.username}!</h1>
              <p className="text-gray-500">Member since 2024 • Pet Enthusiast</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-xl border-2">
                <FaCog className="mr-2" /> Settings
              </Button>
              <Button 
                variant="destructive" 
                className="rounded-xl"
                onClick={() => logoutMutation.mutate()}
              >
                Logout
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Favorites */}
            <Card className="rounded-3xl border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-100 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                  <FaHeart className="text-primary" />
                  Your Favorites
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center bg-gray-50/50 min-h-[200px] flex flex-col items-center justify-center">
                <p className="text-gray-400 mb-4">You haven't favorited any pets yet.</p>
                <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white" onClick={() => setLocation("/#pets")}>
                  Browse Pets
                </Button>
              </CardContent>
            </Card>

            {/* Adoption History */}
            <Card className="rounded-3xl border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-100 pb-4">
                <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                  <FaHistory className="text-secondary" />
                  Adoption History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center bg-gray-50/50 min-h-[200px] flex flex-col items-center justify-center">
                <p className="text-gray-400">No adoption history found.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
