import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, InsertUser } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { FaPaw } from "react-icons/fa";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user) {
      setLocation("/profile");
    }
  }, [user, setLocation]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-secondary/5">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-primary rounded-full mb-4 shadow-lg shadow-primary/30">
              <FaPaw className="text-4xl text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Join StreetPet</h1>
            <p className="text-gray-500">Find your furry friend today</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-white rounded-2xl border border-gray-100 shadow-sm h-14">
              <TabsTrigger 
                value="login" 
                className="rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all text-lg"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="rounded-xl font-bold data-[state=active]:bg-secondary data-[state=active]:text-white transition-all text-lg"
              >
                Register
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <AuthForm 
                mode="login" 
                onSubmit={(data) => loginMutation.mutate(data)}
                isLoading={loginMutation.isPending}
              />
            </TabsContent>
            
            <TabsContent value="register">
              <AuthForm 
                mode="register" 
                onSubmit={(data) => registerMutation.mutate(data)}
                isLoading={registerMutation.isPending}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

function AuthForm({ 
  mode, 
  onSubmit, 
  isLoading 
}: { 
  mode: "login" | "register", 
  onSubmit: (data: InsertUser) => void,
  isLoading: boolean
}) {
  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: { username: "", password: "" },
  });

  return (
    <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-center text-gray-800">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === "login" 
            ? "Enter your credentials to access your account" 
            : "Sign up to start adopting pets"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-700 font-semibold ml-1">Username</Label>
            <Input 
              id="username" 
              {...form.register("username")} 
              className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 h-12 bg-gray-50/50"
              placeholder="Enter your username"
            />
            {form.formState.errors.username && (
              <p className="text-red-500 text-sm ml-1">{form.formState.errors.username.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-semibold ml-1">Password</Label>
            <Input 
              id="password" 
              type="password" 
              {...form.register("password")} 
              className="rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20 h-12 bg-gray-50/50"
              placeholder="••••••••"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm ml-1">{form.formState.errors.password.message}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className={`w-full h-12 rounded-xl text-lg font-bold shadow-lg transition-all ${
              mode === "login" 
                ? "bg-primary hover:bg-primary/90 shadow-primary/25" 
                : "bg-secondary hover:bg-secondary/90 shadow-secondary/25"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : (mode === "login" ? "Login" : "Register")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
