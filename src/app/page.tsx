"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuideCard } from "@/components/ui/guide-card";
import { BlogCard } from "@/components/ui/blog-card";
import { useRef } from "react";

const CATEGORIES = [
  { name: "Culinary & Food", icon: "🍳", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=600" },
  { name: "History & Heritage", icon: "🏛️", img: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&q=80&w=600" },
  { name: "Nature & Hiking", icon: "⛰️", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600" },
  { name: "Art & Culture", icon: "🎨", img: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=600" },
  { name: "Nightlife", icon: "🌙", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600" }
];

const FEATURED_GUIDES = [
  {
    id: "guide-1",
    name: "Kenji Sato",
    tagline: "Uncover Tokyo's hidden ramen alleys and underground jazz clubs.",
    imageUrl: "https://images.unsplash.com/photo-1542223616-740d5dff7f56?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviews: 124,
    location: "Tokyo, Japan",
    priceHour: 45,
    isVerified: true,
    featured: true
  },
  {
    id: "guide-2",
    name: "Elena Rossi",
    tagline: "Experience the Amalfi Coast through cooking, history, and secret coves.",
    imageUrl: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviews: 89,
    location: "Amalfi, Italy",
    priceHour: 60,
    isVerified: true
  },
  {
    id: "guide-3",
    name: "Mateo Silva",
    tagline: "Street art, Fado music, and the authentic soul of Lisbon's old quarters.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    reviews: 210,
    location: "Lisbon, Portugal",
    priceHour: 35,
    isVerified: true
  }
];

const LATEST_BLOGS = [
  {
    id: "post-1",
    title: "The Silent Canals of Cannaregio",
    excerpt: "Venice requires you to get lost to find its soul. Away from the bustling piazzas, Cannaregio offers a quiet retreat where every wrong turn is a right choice, unveiling hidden cafes and authentic artisan workshops along the water.",
    imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1200",
    category: "Hidden Gems",
    author: "Marco Alessio",
    date: "Mar 12, 2026",
    variant: "horizontal" as const
  },
  {
    id: "post-2",
    title: "Why the Tuscan Sun Isn't Actually Yellow",
    excerpt: "An exploration of light frequency and the painters who captured the 'Violet Hour'.",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
    category: "Culture",
    author: "Elena Rossi",
    date: "Feb 28, 2026",
    variant: "vertical" as const
  },
  {
    id: "post-3",
    title: "The Etiquette of the Espresso Bar",
    excerpt: "Navigating the unwritten rules of Italy's social heartbeat. Why you never order a cappuccino after 11 AM.",
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
    category: "Gastronomy",
    author: "Silvia Costa",
    date: "Feb 15, 2026",
    variant: "vertical" as const
  }
];

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* 1. Cinematic Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=2000"
            alt="Cinematic travel landscape" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center pt-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-brand-amber font-semibold tracking-wider uppercase mb-6"
          >
            Curated Experiences
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-tight drop-shadow-lg"
          >
            Discover the <span className="italic text-brand-amber">Soul</span> <br/> of Travel.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow-md"
          >
            Beyond the landmarks. We connect passionate locals with curious travelers for authentic, immersive journeys.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-2xl"
          >
            <div className="flex-grow flex items-center bg-muted/50 rounded-xl px-4 py-3">
              <MapPin className="text-brand-teal w-5 h-5 mr-3 shrink-0" />
              <input 
                type="text" 
                placeholder="Where to next?" 
                className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-lg"
              />
            </div>
            <div className="flex-grow flex items-center bg-muted/50 rounded-xl px-4 py-3">
              <Compass className="text-brand-amber w-5 h-5 mr-3 shrink-0" />
              <input 
                type="text" 
                placeholder="Interest (e.g. Food, Art)" 
                className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-lg"
              />
            </div>
            <Button size="lg" className="w-full md:w-auto h-auto py-4 px-8 text-lg rounded-xl shrink-0">
              <Search className="w-5 h-5 mr-2" />
              Explore
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Horizontal Scroll "Explore Categories" */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <span className="text-brand-amber text-sm font-bold uppercase tracking-wider mb-2 block">The Collection</span>
            <h2 className="text-4xl font-heading font-bold text-foreground">Travel by Interest</h2>
          </div>
        </div>
        
        <div className="w-full overflow-x-auto pb-8 hide-scrollbar cursor-grab active:cursor-grabbing">
          <div className="flex gap-6 px-6 md:px-12 min-w-max">
            {CATEGORIES.map((cat) => (
              <motion.div 
                key={cat.name}
                whileHover={{ y: -8 }}
                className="relative w-72 h-96 rounded-3xl overflow-hidden group shadow-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-90" />
                <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <span className="text-4xl mb-4 block drop-shadow-md">{cat.icon}</span>
                  <h3 className="text-2xl font-serif font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-white/80 text-sm flex items-center gap-2 group-hover:text-brand-amber transition-colors">
                    Explore Experiences <ArrowRight className="w-4 h-4" />
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Floating Guide Cards with Parallax Area */}
      <section className="py-24 bg-brand-cream relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-teal/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 mb-16 relative z-10">
          <span className="text-brand-amber text-sm font-bold uppercase tracking-wider mb-2 block">Curators</span>
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">Meet Our Local Guides</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">Hand-picked experts who know the hidden stories, secret recipes, and rhythm of their cities.</p>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_GUIDES.map((guide, i) => (
              <motion.div 
                key={guide.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <GuideCard {...guide} />
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              View All Guides
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-20 bg-brand-teal text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-white/20">
            <div>
               <h4 className="text-5xl font-heading font-bold mb-2">2,500+</h4>
               <p className="text-brand-amber font-medium">Verified Guides</p>
            </div>
            <div>
               <h4 className="text-5xl font-heading font-bold mb-2">48</h4>
               <p className="text-brand-amber font-medium">Countries</p>
            </div>
            <div>
               <h4 className="text-5xl font-heading font-bold mb-2">12k+</h4>
               <p className="text-brand-amber font-medium">Experiences</p>
            </div>
            <div>
               <h4 className="text-5xl font-heading font-bold mb-2">4.9/5</h4>
               <p className="text-brand-amber font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Latest from the Blog" Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between items-end mb-16 gap-6">
            <div>
               <span className="text-brand-amber text-sm font-bold uppercase tracking-wider mb-2 block">Travel Journal</span>
               <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Dispatches from the Field</h2>
            </div>
            <Button variant="link" className="text-lg text-brand-teal gap-2 p-0">
               Read Journal <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <BlogCard {...LATEST_BLOGS[0]} variant="horizontal" className="h-full flex-col md:flex-col lg:flex-row pb-6 mb-6 lg:mb-0 border-b lg:border-b-0 border-border" />
            </div>
            <div className="lg:col-span-5 flex flex-col gap-10">
               <BlogCard {...LATEST_BLOGS[1]} />
               <div className="h-px w-full bg-border" />
               <BlogCard {...LATEST_BLOGS[2]} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. "Become a Guide" Split CTA */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-brand-charcoal text-brand-cream rounded-[3rem] overflow-hidden flex flex-col md:flex-row relative">
          <div className="p-12 md:p-20 flex-1 relative z-10 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Know your city <br/> like a poet?</h2>
            <p className="text-lg text-white/80 mb-10 max-w-md line-relaxed">
              Join our curated community of locals. Share your passion, set your own schedule, and earn while introducing travelers to the authentic soul of your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-brand-amber text-brand-charcoal hover:bg-white rounded-xl">
                Become a Guide
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 rounded-xl">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex-1 min-h-[400px] relative">
            <img 
              src="https://images.unsplash.com/photo-1549492423-400259a2e574?auto=format&fit=crop&q=80&w=1000" 
              alt="Guide taking photo" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      
    </div>
  );
}
