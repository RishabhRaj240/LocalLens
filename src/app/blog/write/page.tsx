"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WriteBlogPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Hidden Gems");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'error'|'success', text: string} | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Basic auth protection check
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setMessage({ type: 'error', text: 'You must be logged in to write a blog. Please sign in via the Profile page.' });
      }
    };
    checkUser();
  }, [supabase.auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setMessage({ type: 'error', text: "Authentication required to publish." });
      setIsSubmitting(false);
      return;
    }

    try {
      // Ensure the user has a profile to satisfy the author_id foreign key constraint
      const { data: profile } = await supabase.from('profiles').select('id').eq('id', session.user.id).single();
      
      if (!profile) {
        const defaultUsername = session.user.email ? `${session.user.email.split('@')[0]}_${session.user.id.substring(0,5)}` : `user_${session.user.id.substring(0,8)}`;
        const { error: profileError } = await supabase.from('profiles').insert({
          id: session.user.id,
          username: defaultUsername,
          full_name: "Local Guide",
        });
        
        if (profileError) {
           console.error("Profile creation error:", profileError);
           throw new Error("Could not create user profile required for publishing.");
        }
      }

      // Insert logic pointing to the schema we designed
      const { error } = await supabase.from('blogs').insert({
        title,
        excerpt,
        content,
        image_url: imageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
        category,
        author_id: session.user.id
      });

      if (error) throw error;

      setMessage({ type: 'success', text: "Blog post published successfully!" });
      setTimeout(() => router.push('/blog'), 2000);

    } catch (error: any) {
      console.error(error);
      const errMessage = error?.message || (error instanceof Error ? error.message : "Failed to publish blog.");
      setMessage({ type: 'error', text: errMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 pt-28 pb-20 px-6">
      <div className="container mx-auto max-w-3xl bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border">
        
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-teal mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
        </Link>
        
        <h1 className="text-4xl font-heading font-bold mb-8">Write your Story</h1>

        {message && (
          <div className={`p-4 rounded-xl mb-8 border ${message.type === 'error' ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Silent Canals of Cannaregio"
              className="w-full bg-transparent border-b-2 border-border outline-none py-3 text-3xl font-serif text-foreground placeholder:text-muted focus:border-brand-teal transition-colors"
            />
          </div>

          <div>
             <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 mt-4">Category</label>
             <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full sm:w-64 bg-muted/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-brand-teal transition-colors text-foreground"
             >
               <option>Hidden Gems</option>
               <option>Gastronomy</option>
               <option>Culture</option>
               <option>Adventure</option>
             </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Short Excerpt</label>
            <textarea 
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief summary of your experience..."
              className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 outline-none focus:border-brand-teal transition-colors text-foreground resize-none h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Cover Image</label>
            <div className="flex flex-col gap-4">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setImageUrl(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full bg-muted/30 border border-border rounded-xl px-4 py-3 outline-none focus:border-brand-teal transition-colors text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-teal/10 file:text-brand-teal hover:file:bg-brand-teal/20"
              />
              {imageUrl && (
                <div className="relative aspect-video w-full max-w-md rounded-xl overflow-hidden border border-border mt-2 shadow-sm">
                  <img src={imageUrl} alt="Cover Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Full Story</label>
            <textarea 
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share the details of your journey..."
              className="w-full bg-muted/30 border border-border rounded-xl px-4 py-4 outline-none focus:border-brand-teal transition-colors text-foreground resize-y min-h-[300px]"
            />
          </div>

          <div className="pt-6 border-t border-border mt-4 flex justify-end">
             <Button type="submit" size="lg" disabled={isSubmitting || message?.type === 'error'} className="bg-brand-teal hover:bg-brand-teal/90 text-white rounded-full px-8">
               {isSubmitting ? "Publishing..." : "Publish Story"}
             </Button>
          </div>
        </form>

      </div>
    </div>
  );
}
