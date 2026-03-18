import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { queryClient } from "@/lib/queryClient";
import { useEffect, useState } from "react";
import type { Pet } from "@shared/schema";
import { FaPaw, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const adoptionFormSchema = z.object({
  applicantName: z.string().min(1, "Full name is required"),
  applicantEmail: z.string().email("A valid email is required"),
  applicantPhone: z.string().min(5, "Phone number is required"),
  hasAdoptedBefore: z.boolean(),
  hasPets: z.boolean(),
  hasChildren: z.boolean(),
  livingSituation: z.string().min(1, "Please select your living situation"),
  reason: z.string().min(10, "Please tell us more (at least 10 characters)"),
});

type AdoptionFormData = z.infer<typeof adoptionFormSchema>;

export default function AdoptPage() {
  const params = useParams<{ petId: string }>();
  const [, setLocation] = useLocation();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      toast({ title: "Login required", description: "Please log in to apply for adoption.", variant: "destructive" });
      setLocation("/login");
    }
  }, [user, authLoading]);

  const petId = Number(params.petId);

  const { data: pet, isLoading: petLoading } = useQuery<Pet>({
    queryKey: ["/api/pets", petId],
    queryFn: async () => {
      const res = await fetch(`/api/pets/${petId}`);
      if (!res.ok) throw new Error("Pet not found");
      return res.json();
    },
    enabled: !!petId,
  });

  const form = useForm<AdoptionFormData>({
    resolver: zodResolver(adoptionFormSchema),
    defaultValues: {
      applicantName: "",
      applicantEmail: "",
      applicantPhone: "",
      hasAdoptedBefore: false,
      hasPets: false,
      hasChildren: false,
      livingSituation: "",
      reason: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data: AdoptionFormData) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/adoptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, petId }),
      });

      if (res.status === 401) {
        toast({ title: "Login required", description: "Please log in first.", variant: "destructive" });
        setLocation("/login");
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast({ title: "Error", description: err.message || "Something went wrong", variant: "destructive" });
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/adoptions"] });
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (authLoading || petLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!pet) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Pet not found.</p>
        </div>
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-green-500 text-5xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Application Submitted!</h1>
            <p className="text-gray-500 mb-2 text-lg">
              Your adoption request for <strong>{pet.name}</strong> has been received.
            </p>
            <p className="text-gray-400 mb-8">
              A confirmation has been sent to <strong>{form.getValues("applicantEmail")}</strong>. Our team will review your application and get back to you shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => setLocation("/")} className="rounded-full bg-primary hover:bg-primary/90 px-8">
                Back to Home
              </Button>
              <Button onClick={() => setLocation("/profile")} variant="outline" className="rounded-full border-2">
                View My Profile
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors font-medium"
          >
            <FaArrowLeft /> Back to pets
          </button>

          {/* Pet Info Header */}
          <div className="bg-white rounded-3xl shadow-sm p-6 mb-8 flex items-center gap-6 border border-gray-100">
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-20 h-20 rounded-2xl object-cover shadow-md"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FaPaw className="text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">Adoption Application</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Adopt {pet.name}</h1>
              <p className="text-gray-500">{pet.breed} · {pet.age}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Your Information</h2>

              <div className="space-y-1">
                <Label htmlFor="applicantName" className="font-semibold text-gray-700">Full Name *</Label>
                <Input id="applicantName" {...form.register("applicantName")} placeholder="John Doe" className="rounded-xl h-11" />
                {form.formState.errors.applicantName && (
                  <p className="text-red-500 text-sm">{form.formState.errors.applicantName.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="applicantEmail" className="font-semibold text-gray-700">Email Address *</Label>
                  <Input id="applicantEmail" type="email" {...form.register("applicantEmail")} placeholder="you@example.com" className="rounded-xl h-11" />
                  {form.formState.errors.applicantEmail && (
                    <p className="text-red-500 text-sm">{form.formState.errors.applicantEmail.message}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="applicantPhone" className="font-semibold text-gray-700">Phone Number *</Label>
                  <Input id="applicantPhone" type="tel" {...form.register("applicantPhone")} placeholder="+1 555 000 0000" className="rounded-xl h-11" />
                  {form.formState.errors.applicantPhone && (
                    <p className="text-red-500 text-sm">{form.formState.errors.applicantPhone.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* About Your Home */}
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">About Your Home</h2>

              <div className="space-y-1">
                <Label htmlFor="livingSituation" className="font-semibold text-gray-700">Living Situation *</Label>
                <select
                  id="livingSituation"
                  {...form.register("livingSituation")}
                  className="w-full h-11 rounded-xl border border-gray-200 px-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  <option value="">Select your living situation</option>
                  <option value="house_with_yard">House with yard</option>
                  <option value="house_no_yard">House without yard</option>
                  <option value="apartment">Apartment</option>
                  <option value="other">Other</option>
                </select>
                {form.formState.errors.livingSituation && (
                  <p className="text-red-500 text-sm">{form.formState.errors.livingSituation.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { field: "hasAdoptedBefore" as const, label: "Have you adopted a pet before?" },
                  { field: "hasPets" as const, label: "Do you currently have other pets?" },
                  { field: "hasChildren" as const, label: "Do you have children at home?" },
                ].map(({ field, label }) => (
                  <label key={field} className="flex items-start gap-3 cursor-pointer p-3 rounded-2xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                    <input
                      type="checkbox"
                      {...form.register(field)}
                      className="mt-0.5 w-4 h-4 accent-primary rounded"
                    />
                    <span className="text-sm text-gray-700 font-medium">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reason */}
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 space-y-2">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Why do you want to adopt {pet.name}?</h2>
              <Textarea
                {...form.register("reason")}
                placeholder={`Tell us why you'd be the perfect home for ${pet.name}. What will your daily routine look like? What activities will you do together?`}
                className="rounded-xl min-h-[120px] resize-none"
              />
              {form.formState.errors.reason && (
                <p className="text-red-500 text-sm">{form.formState.errors.reason.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
              data-testid="button-submit-adoption"
            >
              {isSubmitting ? "Submitting..." : `Submit Adoption Application for ${pet.name}`}
            </Button>

            <p className="text-center text-sm text-gray-400">
              Your application will be reviewed by our team. We'll contact you at the email address you provided.
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
}
