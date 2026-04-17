"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else setMessage("Logged in successfully! (Currently using placeholder keys if not configured)");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage("Signed up successfully! Please check your email. (Currently using placeholder keys if not configured)");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-20 px-4 bg-muted/30">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-heading font-bold text-center mb-6">
          {isLogin ? "Welcome Back" : "Join LocalLens"}
        </h2>
        
        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-brand-teal transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 outline-none focus:border-brand-teal transition-colors"
              required
            />
          </div>
          
          <Button type="submit" size="lg" className="w-full mt-2 bg-brand-charcoal text-white hover:bg-brand-charcoal/90 rounded-xl">
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </form>

        {message && <p className="mt-4 text-center text-sm font-medium text-brand-amber">{message}</p>}

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground mr-1">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button 
            type="button"
            className="text-brand-teal font-medium hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
