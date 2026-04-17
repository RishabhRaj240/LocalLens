import { BlogCard } from "@/components/ui/blog-card";

export const metadata = {
  title: "Travel Journal | LocalLens",
  description: "Stories, tips, and dispatches from the field.",
};

const POSTS = [
  {
    id: "post-1",
    title: "The Unseen Morocco: Exploring the High Atlas beyond the souks",
    excerpt: "A three-week journey into the heart of Berber culture, where hospitality is as vast as the mountain themselves...",
    imageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80&w=1200",
    category: "Editorial",
    author: "Amine Fall",
    date: "Mar 20, 2026",
    variant: "featured" as const
  },
  {
    id: "post-2",
    title: "The Blue Azulejos: Lisbon’s hidden canvases",
    excerpt: "How a 15th-century art form still defines the streets of modern Portugal.",
    imageUrl: "https://images.unsplash.com/photo-1513622470522-26cb3c8d56c2?auto=format&fit=crop&q=80&w=800",
    category: "Art & History",
    author: "Clara Mendes",
    date: "Mar 18, 2026",
    variant: "vertical" as const
  },
  {
    id: "post-3",
    title: "Finding Silence: 5 places to unplug this year",
    excerpt: "In an increasingly connected world, true luxury is being offline.",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
    category: "Slow Travel",
    author: "Elena Rossi",
    date: "Mar 15, 2026",
    variant: "vertical" as const
  },
  {
    id: "post-4",
    title: "A Night at the Tokyo Jazz Kissaten",
    excerpt: "Behind unmarked doors, audiophiles sip whisky and listen to rare vinyl in perfect silence.",
    imageUrl: "https://images.unsplash.com/photo-1542223616-740d5dff7f56?auto=format&fit=crop&q=80&w=600",
    category: "Culture",
    author: "Kenji Sato",
    date: "Mar 10, 2026",
    variant: "horizontal" as const
  },
  {
    id: "post-5",
    title: "The Rules of the Italian Espresso Bar",
    excerpt: "Here's what you need to know before you order that afternoon cappuccino.",
    imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600",
    category: "Gastronomy",
    author: "Luca Bianchi",
    date: "Mar 5, 2026",
    variant: "horizontal" as const
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-brand-cream/50 pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center md:text-left mb-12">
          <span className="text-brand-amber text-sm font-bold uppercase tracking-wider mb-2 block">Our Journal</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">The Local Dispatch</h1>
          
          {/* Category Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 hide-scrollbar pt-2">
            {["All Stories", "Editorial", "Gastronomy", "Art & History", "Slow Travel", "Guides"].map((cat, i) => (
              <button 
                key={cat}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
                  i === 0 
                  ? "bg-brand-charcoal text-white" 
                  : "bg-white border border-border/50 text-foreground hover:border-brand-amber hover:text-brand-amber"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Magazine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-8">
            <BlogCard {...POSTS[0]} className="h-full min-h-[500px]" />
          </div>
          <div className="lg:col-span-4 flex flex-col gap-8">
            <BlogCard {...POSTS[1]} />
            <BlogCard {...POSTS[2]} />
          </div>
        </div>

        {/* Two Column Layout for the rest */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8 flex flex-col gap-10 border-t border-border pt-12">
            <h2 className="text-3xl font-heading font-bold mb-6">Latest Dispatches</h2>
            <BlogCard {...POSTS[3]} />
            <div className="w-full h-px bg-border/60" />
            <BlogCard {...POSTS[4]} />
            <div className="w-full h-px bg-border/60" />
            <BlogCard {...POSTS[2]} variant="horizontal" />
            
            <button className="mt-8 py-4 px-6 border-2 border-brand-charcoal text-brand-charcoal rounded-xl font-semibold hover:bg-brand-charcoal hover:text-white transition-colors w-full md:w-auto self-center">
              Load More Stories
            </button>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              
              {/* Trending Posts */}
              <div className="bg-white rounded-2xl p-8 border border-border/50 shadow-sm mb-10">
                <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-coral animate-pulse" />
                  Trending Weekly
                </h3>
                <div className="flex flex-col gap-6">
                  {[...POSTS].reverse().slice(0, 4).map((post, i) => (
                    <div key={`trend-${i}`} className="flex gap-4 group cursor-pointer">
                      <span className="text-3xl font-serif font-bold text-muted-foreground/30 group-hover:text-brand-amber transition-colors">
                        0{i + 1}
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-lg leading-tight mb-1 group-hover:text-brand-teal transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs font-medium text-muted-foreground">By {post.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Widget */}
              <div className="bg-brand-teal text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-amber rounded-full blur-2xl opacity-20" />
                <h3 className="text-2xl font-heading font-bold mb-3 relative z-10">Join the Dispatch</h3>
                <p className="text-white/80 text-sm mb-6 relative z-10">Receive formatting curated travel stories, interviews with local guides, and the latest from the Digital Curator.</p>
                <form className="relative z-10 flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-amber"
                  />
                  <button className="w-full bg-brand-amber text-brand-charcoal font-semibold py-3 rounded-xl hover:bg-white transition-colors">
                    Subscribe
                  </button>
                  <p className="text-[10px] text-white/40 text-center mt-2">No spam. Unsubscribe at any time.</p>
                </form>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
