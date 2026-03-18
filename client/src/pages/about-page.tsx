import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { FaHeart, FaPaw, FaShieldAlt, FaUsers, FaLeaf, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero */}
        <section className="relative py-24 bg-gradient-to-br from-primary/5 via-white to-secondary/5 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                <FaPaw /> Our Story
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                Who We Are & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Why We Do This
                </span>
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                StreetPet was born from a simple belief: every animal deserves love, safety, and a family to call their own.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-6">
                  Every day, thousands of animals roam the streets with no shelter, no food, and no one to care for them. 
                  StreetPet was created to change that — one adoption at a time.
                </p>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  We connect homeless pets with loving families through a simple, transparent process. We believe that adopting a pet 
                  is not just saving an animal — it's gaining a loyal companion who will change your life forever.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: FaHeart, label: "No-Kill Policy", desc: "We never euthanize healthy animals." },
                    { icon: FaShieldAlt, label: "Vetted Pets", desc: "Every pet is checked by a vet." },
                    { icon: FaUsers, label: "Community First", desc: "Built by animal lovers, for animal lovers." },
                    { icon: FaLeaf, label: "Free Service", desc: "No fees for adopters, ever." },
                  ].map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="flex gap-3 items-start p-4 bg-gray-50 rounded-2xl">
                      <Icon className="text-primary mt-0.5 flex-shrink-0 text-lg" />
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{label}</p>
                        <p className="text-gray-400 text-xs">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80" alt="Dog" className="rounded-3xl shadow-lg w-full h-52 object-cover" />
                  <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80" alt="Cat" className="rounded-3xl shadow-lg w-full h-52 object-cover mt-8" />
                  <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80" alt="Pets" className="rounded-3xl shadow-lg w-full h-52 object-cover col-span-2" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why We Do This */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Why We Do This</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                The statistics are heartbreaking — but they don't have to be. Together, we can make a difference.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { value: "70M+", label: "Stray Animals", desc: "Over 70 million stray animals live on streets across the US alone, facing hunger, disease, and danger every day.", color: "text-red-500", bg: "bg-red-50" },
                { value: "6.5M", label: "Enter Shelters/Year", desc: "Each year, millions of pets enter shelters. Without adoption programs, many never find a home.", color: "text-yellow-600", bg: "bg-yellow-50" },
                { value: "4.1M", label: "Adopted Annually", desc: "When people choose to adopt, lives are saved. StreetPet exists to make that number grow every year.", color: "text-green-600", bg: "bg-green-50" },
              ].map(({ value, label, desc, color, bg }) => (
                <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`${bg} p-8 rounded-3xl text-center`}>
                  <p className={`text-4xl font-black mb-2 ${color}`}>{value}</p>
                  <p className="font-bold text-gray-800 text-lg mb-3">{label}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder / Admin */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet the Founder</h2>
              <p className="text-gray-500">The person behind StreetPet.</p>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-shrink-0">
                <div className="w-40 h-40 rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <FaPaw className="text-white text-6xl" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-3">
                  <FaShieldAlt /> Administrator & Founder
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">ijlal_sellak</h3>
                <p className="text-primary font-semibold mb-4">Founder · StreetPet</p>
                <p className="text-gray-500 text-lg leading-relaxed mb-6">
                  "I created StreetPet after seeing too many animals on the streets with nowhere to go. 
                  Every animal I passed reminded me that the problem wasn't unsolvable — it just needed people 
                  who cared enough to act. This platform is my way of connecting those people with the animals who need them most."
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-gray-700 shadow-sm">🐾 Animal Welfare Advocate</span>
                  <span className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-gray-700 shadow-sm">💻 Platform Builder</span>
                  <span className="px-4 py-2 bg-white rounded-xl text-sm font-semibold text-gray-700 shadow-sm">❤️ Pet Lover</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-900 text-white text-center">
          <div className="container mx-auto px-4">
            <FaHeart className="text-5xl text-primary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Every adoption gives a pet a second chance. Browse our available animals and find your perfect companion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setLocation("/")} size="lg" className="rounded-full bg-primary hover:bg-primary/90 px-10 py-6 text-lg font-bold shadow-lg shadow-primary/25">
                Browse Pets
              </Button>
              <Button onClick={() => setLocation("/register")} size="lg" variant="outline" className="rounded-full border-2 border-gray-600 text-white hover:bg-white/10 px-10 py-6 text-lg font-bold">
                Create Account
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
