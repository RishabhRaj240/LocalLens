"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = params;
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchBlog() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setCurrentUserId(session.user.id);
      }

      // If it's the old static IDs (like post-1), just show not found or ignore it
      // Let's assume real UUIDs will look different, but it's simpler to just try fetch
      const { data, error } = await supabase
        .from('blogs')
        .select('*, profiles:author_id ( full_name, username )')
        .eq('id', id)
        .single();
        
      if (error || !data) {
        console.error("Error fetching blog:", error);
      } else {
        setBlog(data);
      }
      setLoading(false);
    }
    fetchBlog();
  }, [id, supabase]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    
    setIsDeleting(true);
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    
    if (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete the blog.");
      setIsDeleting(false);
    } else {
      router.push('/blog');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-brand-cream/30 flex justify-center items-center">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-teal"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-brand-cream/30 flex flex-col items-center justify-center text-center px-4">
         <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">Blog not found</h1>
         <p className="text-muted-foreground text-lg">The story you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  const authorName = blog.profiles?.full_name || blog.profiles?.username || "Local Guide";
  const dateStr = new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <article className="min-h-screen pt-32 pb-20 bg-brand-cream/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center sm:items-start mb-4 gap-4">
            <span className="text-brand-amber font-bold tracking-wider uppercase text-sm block">
              {blog.category || "Article"}
            </span>
            {currentUserId === blog.author_id && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 rounded-xl"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete Story"}
              </Button>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight mb-6 mt-4">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-4 text-muted-foreground font-medium text-sm">
            <span>By {authorName}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-amber" />
            <span>{dateStr}</span>
          </div>
        </header>

        <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 shadow-lg">
          <img 
            src={blog.image_url || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1600"}
            alt={blog.title}
            className="w-full h-full object-cover relative z-10"
          />
        </div>

        <div className="prose prose-lg md:prose-xl max-w-none text-foreground/80 font-serif leading-relaxed">
           {blog.content.split('\n\n').map((paragraph: string, idx: number) => {
              if (idx === 0) {
                 return (
                    <p key={idx} className="first-letter:text-6xl first-letter:font-bold first-letter:text-brand-amber first-letter:mr-3 first-letter:float-left">
                       {paragraph}
                    </p>
                 )
              }
              return <p key={idx}>{paragraph}</p>;
           })}
        </div>
      </div>
    </article>
  );
}
