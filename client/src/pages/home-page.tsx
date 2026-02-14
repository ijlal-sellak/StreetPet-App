import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PetCard } from "@/components/pet-card";
import { usePets } from "@/hooks/use-pets";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaDog, 
  FaCat, 
  FaPaw, 
  FaSearch, 
  FaCheckCircle, 
  FaHome, 
  FaHeart 
} from "react-icons/fa";

export default function HomePage() {
  const { data: pets } = usePets();
  const [filter, setFilter] = useState<"all" | "dog" | "cat" | "other">("all");

  const filteredPets = filter === "all" 
    ? pets 
    : pets.filter(p => p.type === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1 
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 blob-shape translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 blob-shape -translate-x-1/3 translate-y-1/3 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <div className="inline-block px-4 py-2 bg-white rounded-full shadow-md text-sm font-bold text-primary mb-6 animate-bounce">
                🐾 Adopt, don't shop!
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 leading-tight mb-6">
                Find Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Perfect Companion
                </span>
              </h1>
              <p className="text-xl text-gray-500 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Thousands of homeless pets are waiting for a loving family. 
                Open your heart and your home to a furry friend today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="rounded-full text-lg px-8 py-6 shadow-lg shadow-primary/25 bg-primary hover:bg-primary/90 hover:scale-105 transition-all"
                  onClick={() => document.getElementById('pets')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Available Pets
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-full text-lg px-8 py-6 border-2 border-gray-200 hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 relative"
            >
              {/* Hero Image */}
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80" 
                  alt="Happy dogs running" 
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl z-20 max-w-xs border border-gray-50 hidden md:block"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                    <FaHeart size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Lives Saved</h3>
                    <p className="text-green-500 font-bold text-xl">12,450+</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400">Join our community of happy adopters!</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FaPaw, label: "Pets Adopted", value: "2.5k+", color: "text-primary" },
              { icon: FaHeart, label: "Lives Saved", value: "3.2k+", color: "text-red-500" },
              { icon: FaHome, label: "New Homes", value: "1.8k+", color: "text-secondary" },
              { icon: FaDog, label: "Volunteers", value: "500+", color: "text-accent" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                  <stat.icon size={32} />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Pets Section */}
      <section id="pets" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Friends</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              These adorable pets are looking for a forever home. Use the filters below to find your perfect match.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: "all", label: "All Pets", icon: FaPaw },
              { id: "dog", label: "Dogs", icon: FaDog },
              { id: "cat", label: "Cats", icon: FaCat },
              { id: "other", label: "Others", icon: FaSearch },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as any)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-sm
                  ${filter === btn.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/30" 
                    : "bg-white text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                <btn.icon />
                {btn.label}
              </button>
            ))}
          </div>

          {/* Pet Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPets.map((pet) => (
              <motion.div key={pet.id} variants={itemVariants}>
                <PetCard pet={pet} />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8 py-6 text-lg">
              View All Pets
            </Button>
          </div>
        </div>
      </section>

      {/* Adoption Process */}
      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-500">Adopting a pet is easy! Just follow these simple steps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-100 -z-10" />

            {[
              { 
                step: "01", 
                title: "Find a Pet", 
                desc: "Browse our available pets and find the perfect match for your family.",
                icon: FaSearch
              },
              { 
                step: "02", 
                title: "Meet & Greet", 
                desc: "Schedule a visit to meet your potential new family member in person.",
                icon: FaPaw
              },
              { 
                step: "03", 
                title: "Welcome Home", 
                desc: "Complete the adoption paperwork and take your new friend home!",
                icon: FaHome
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-50 text-center relative group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-50 flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:border-primary transition-colors">
                  <item.icon className="text-3xl text-primary" />
                </div>
                <span className="absolute top-6 right-6 text-6xl font-black text-gray-50 opacity-50 select-none">
                  {item.step}
                </span>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="stories" className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Happy Tails</h2>
              <p className="text-gray-500 max-w-lg">
                Read heartwarming stories from families who found their furry companions through StreetPet.
              </p>
            </div>
            <Button className="bg-white text-secondary hover:bg-white/90 shadow-sm rounded-full">
              Read More Stories
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "The Johnson Family",
                pet: "Max",
                quote: "Adopting Max was the best decision we ever made. He brings so much joy to our lives!",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" // woman portrait
              },
              {
                name: "Sarah & Mike",
                pet: "Luna",
                quote: "Luna is the sweetest cat ever. Thank you StreetPet for helping us find her.",
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80" // man portrait
              }
            ].map((story, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                <img src={story.img} alt={story.name} className="w-20 h-20 rounded-full object-cover shadow-md" />
                <div>
                  <div className="flex gap-1 text-yellow-400 mb-2 justify-center md:justify-start">
                    {[1,2,3,4,5].map(i => <FaHeart key={i} size={14} />)}
                  </div>
                  <p className="text-gray-600 italic mb-4">"{story.quote}"</p>
                  <h4 className="font-bold text-gray-800">{story.name}</h4>
                  <p className="text-sm text-gray-400">Adopted {story.pet}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80" // dog looking at camera
                  className="rounded-3xl shadow-lg w-full h-64 object-cover mt-12" 
                  alt="Dog" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80" // cat
                  className="rounded-3xl shadow-lg w-full h-64 object-cover" 
                  alt="Cat" 
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">About StreetPet</h2>
              <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                We are a non-profit organization dedicated to rescuing homeless pets and finding them loving families. 
                Our mission is to ensure every animal gets a second chance at happiness.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "No-kill shelter philosophy",
                  "Comprehensive veterinary care",
                  "Behavioral training programs",
                  "Community education and outreach"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <FaCheckCircle className="text-secondary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid md:grid-cols-2 gap-12 relative z-10">
              <div>
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-gray-400 mb-8">
                  Have questions about adoption? Want to volunteer? We'd love to hear from you!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-primary">
                      <FaHome />
                    </div>
                    <p>123 Pet Street, New York, NY</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-primary">
                      <FaPaw />
                    </div>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Name" className="bg-gray-700 border-none rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none" />
                  <input type="email" placeholder="Email" className="bg-gray-700 border-none rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <textarea placeholder="Message" rows={4} className="w-full bg-gray-700 border-none rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary outline-none" />
                <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl py-6 font-bold text-lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
