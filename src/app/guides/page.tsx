import { GuideCard } from "@/components/ui/guide-card";
import { Button } from "@/components/ui/button";
import { Search, Map, List, SlidersHorizontal, ChevronDown, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Local Guides | LocalLens",
  description: "Find the perfect local guide for your next journey.",
};

// Mock data
const GUIDES = [
  {
    id: "g1",
    name: "Clara Mendes",
    tagline: "Historical Gastronomy Specialist. Portuguese identity through spices and secret taverns.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviews: 128,
    location: "Lisbon, Portugal",
    priceHour: 45,
    isVerified: true,
    featured: true
  },
  {
    id: "g2",
    name: "Joao Silva",
    tagline: "Modern Art & Street Muralism. Discover the underground heartbeat of Lisbon.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    rating: 4.7,
    reviews: 84,
    location: "Lisbon, Portugal",
    priceHour: 38,
    isVerified: true
  },
  {
    id: "g3",
    name: "Sofia Romano",
    tagline: "Classical Architecture & Forgotten Courtyards. Rome beyond the Colosseum.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviews: 241,
    location: "Rome, Italy",
    priceHour: 55,
    isVerified: true
  },
  {
    id: "g4",
    name: "Yuki Tanaka",
    tagline: "Tea ceremonies, meditation, and ancient shrines embedded in modern neon.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    reviews: 112,
    location: "Kyoto, Japan",
    priceHour: 40,
    isVerified: true
  },
  {
    id: "g5",
    name: "Amara Diop",
    tagline: "Vibrant markets, textile weaving, and oral storytelling of Senegal.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviews: 96,
    location: "Dakar, Senegal",
    priceHour: 30,
    isVerified: true
  },
  {
    id: "g6",
    name: "Luca Bianchi",
    tagline: "Pasta making masterclass and foraging in the Tuscan hills.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviews: 310,
    location: "Florence, Italy",
    priceHour: 65,
    isVerified: true,
    featured: true
  }
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-brand-cream/30 pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-3">Expert Guides</h1>
            <p className="text-muted-foreground text-lg">Hand-picked curators of local experiences worldwide.</p>
          </div>

          <div className="flex-1 w-full max-w-xl md:ml-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search destinations or guides..."
                className="w-full bg-white border border-border/60 rounded-full py-4 pl-12 pr-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/20 text-foreground transition-all"
              />
            </div>
            
            {/* Active Filter Chips */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 hide-scrollbar">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2">Active:</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-border rounded-full text-sm shadow-sm cursor-pointer hover:bg-muted">
                Lisbon <CheckCircle2 className="w-3 h-3 text-brand-teal" />
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-border rounded-full text-sm shadow-sm cursor-pointer hover:bg-muted">
                Art & History <CheckCircle2 className="w-3 h-3 text-brand-teal" />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Filter Panel */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </h3>
                <button className="text-sm text-brand-teal hover:underline text-muted-foreground">Clear all</button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {["Culinary", "Art & History", "Architecture", "Nightlife", "Nature"].map((cat) => (
                    <button 
                      key={cat}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        cat === "Art & History" 
                          ? "bg-brand-teal text-white"
                          : "bg-muted/50 text-foreground hover:bg-muted"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Price Range (Hourly)</h4>
                <div className="pt-2">
                  {/* Simplified mock slider */}
                  <div className="h-1 bg-muted rounded-full relative mb-4 mt-2">
                    <div className="absolute left-[20%] right-[30%] h-full bg-brand-amber rounded-full" />
                    <div className="absolute left-[20%] -top-2 w-5 h-5 bg-white border-2 border-brand-amber rounded-full shadow cursor-pointer" />
                    <div className="absolute right-[30%] -top-2 w-5 h-5 bg-white border-2 border-brand-amber rounded-full shadow cursor-pointer" />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>€20</span>
                    <span>€150+</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Min. Rating</h4>
                <div className="flex items-center gap-2">
                  <div className="flex text-brand-amber">
                    <CheckCircle2 className="w-5 h-5 fill-current border-none p-0" />
                  </div>
                  <span className="text-sm font-medium">4.0 & up</span>
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </aside>

          {/* Right Content Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground font-medium flex items-center gap-2">
                <span className="text-brand-amber text-sm font-bold uppercase tracking-wider">Found in Lisbon</span>
                12 Professional Curators
              </p>
              
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-white border border-border px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-muted transition-colors">
                  Sort by: Recommended <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <div className="hidden md:flex bg-white border border-border rounded-lg shadow-sm overflow-hidden p-1">
                  <button className="px-3 py-1.5 bg-muted rounded shadow-sm text-brand-teal">
                    <List className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-1.5 text-muted-foreground hover:text-foreground">
                    <Map className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {GUIDES.map((guide) => (
                <GuideCard key={guide.id} {...guide} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Load More Guides
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
