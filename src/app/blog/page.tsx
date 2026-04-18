"use client";

import { useState, useEffect } from "react";
import { BlogCard } from "@/components/ui/blog-card";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { PenTool } from "lucide-react";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All Stories"]);
  const [activeCategory, setActiveCategory] = useState("All Stories");
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function fetchBlogs() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select(`
          *,
          profiles:author_id ( full_name, username )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error);
      } else if (data) {
        // Map database data to our format
        const formattedData = data.map((blog) => ({
          id: blog.id,
          title: blog.title,
          excerpt: blog.excerpt,
          imageUrl: blog.image_url || "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1200",
          category: blog.category || "Editorial",
          author: blog.profiles?.full_name || blog.profiles?.username || "Local Guide",
          date: new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }));
        
        setPosts(formattedData);
        setFilteredPosts(formattedData);
        
        // Extract unique categories
        const uniqueCategories = ["All Stories", ...Array.from(new Set(formattedData.map(post => post.category)))];
        setCategories(uniqueCategories as string[]);
      }
      setIsLoading(false);
    }
    fetchBlogs();
  }, [supabase]);

  useEffect(() => {
    if (activeCategory === "All Stories") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === activeCategory));
    }
  }, [activeCategory, posts]);

  // For rendering layouts, we define variants based on index
  const getVariant = (index: number) => {
    if (index === 0) return "featured";
    if (index === 1 || index === 2) return "vertical";
    return "horizontal";
  };

  return (
    <div className="min-h-screen bg-brand-cream/50 pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div className="text-center md:text-left">
            <span className="text-brand-amber text-sm font-bold uppercase tracking-wider mb-2 block">Our Journal</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">The Local Dispatch</h1>
            
            {/* Category Pills */}
            <div className="flex items-center gap-3 overflow-x-auto pb-4 hide-scrollbar pt-2">
              {categories.map((cat, i) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
                    activeCategory === cat 
                    ? "bg-brand-charcoal text-white" 
                    : "bg-white border border-border/50 text-foreground hover:border-brand-amber hover:text-brand-amber"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 md:pb-8 flex justify-center md:justify-end">
             <Link href="/blog/write" className="inline-flex items-center gap-2 bg-brand-teal text-white hover:bg-brand-teal/90 px-6 py-3 rounded-full font-bold transition-all shadow-md hover:shadow-lg">
                <PenTool className="w-4 h-4" />
                Write a Blog
             </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-teal"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-border text-muted-foreground shadow-sm">
             <p className="text-lg">No stories found for this category.</p>
          </div>
        ) : (
          <>
            {/* Hero Magazine Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
              {filteredPosts.length > 0 && (
                <div className="lg:col-span-8">
                  <BlogCard {...filteredPosts[0]} variant="featured" className="h-full min-h-[500px]" />
                </div>
              )}
              <div className="lg:col-span-4 flex flex-col gap-8">
                {filteredPosts.length > 1 && (
                  <BlogCard {...filteredPosts[1]} variant="vertical" />
                )}
                {filteredPosts.length > 2 && (
                  <BlogCard {...filteredPosts[2]} variant="vertical" />
                )}
              </div>
            </div>

            {/* Two Column Layout for the rest */}
            {filteredPosts.length > 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                <div className="lg:col-span-8 flex flex-col gap-10 border-t border-border pt-12">
                  <h2 className="text-3xl font-heading font-bold mb-6">Latest Dispatches</h2>
                  
                  {filteredPosts.slice(3).map((post, i) => (
                    <div key={post.id} className="flex flex-col">
                       <BlogCard {...post} variant={i % 3 === 0 ? "vertical" : "horizontal"} />
                       {i !== filteredPosts.slice(3).length - 1 && (
                          <div className="w-full h-px bg-border/60 mt-10" />
                       )}
                    </div>
                  ))}
                  
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
                        {[...posts].reverse().slice(0, 4).map((post, i) => (
                          <Link href={`/blog/${post.id}`} target="_blank" rel="noopener noreferrer" key={`trend-${i}`} className="flex gap-4 group cursor-pointer">
                            <span className="text-3xl font-serif font-bold text-muted-foreground/30 group-hover:text-brand-amber transition-colors">
                              0{i + 1}
                            </span>
                            <div>
                              <h4 className="font-serif font-bold text-lg leading-tight mb-1 group-hover:text-brand-teal transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <p className="text-xs font-medium text-muted-foreground">By {post.author}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Newsletter Widget */}
                    <div className="bg-brand-teal text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-amber rounded-full blur-2xl opacity-20" />
                      <h3 className="text-2xl font-heading font-bold mb-3 relative z-10">Join the Dispatch</h3>
                      <p className="text-white/80 text-sm mb-6 relative z-10">Receive curated travel stories, interviews with local guides, and the latest from the Digital Curator.</p>
                      <form className="relative z-10 flex flex-col gap-3">
                        <input 
                          type="email" 
                          placeholder="Your email address" 
                          className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-amber"
                        />
                        <button type="button" className="w-full bg-brand-amber text-brand-charcoal font-semibold py-3 rounded-xl hover:bg-white transition-colors">
                          Subscribe
                        </button>
                        <p className="text-[10px] text-white/40 text-center mt-2">No spam. Unsubscribe at any time.</p>
                      </form>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
