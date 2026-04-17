"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Destinations", href: "/destinations" },
    { name: "Guides", href: "/guides" },
    { name: "Blog", href: "/blog" },
    { name: "Community", href: "/community" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || !isHome
            ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <span
              className={cn(
                "text-2xl font-heading font-semibold tracking-tight transition-colors duration-300",
                isScrolled || !isHome ? "text-brand-teal" : "text-white"
              )}
            >
              LocalLens
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-amber",
                  isScrolled || !isHome ? "text-foreground/80" : "text-white/90"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <button
              className={cn(
                "transition-colors hover:text-brand-amber",
                isScrolled || !isHome ? "text-foreground/80" : "text-white"
              )}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className={cn(
                "transition-colors hover:text-brand-coral",
                isScrolled || !isHome ? "text-foreground/80" : "text-white"
              )}
            >
              <Heart className="w-5 h-5" />
            </button>
            <Link
              href="/auth"
              className={cn(
                "transition-colors hover:text-brand-teal",
                isScrolled || !isHome ? "text-foreground/80" : "text-white"
              )}
            >
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "md:hidden z-50 transition-colors",
              isScrolled || !isHome || isMobileMenuOpen ? "text-foreground" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden flex flex-col gap-6"
          >
            <nav className="flex flex-col gap-6 text-xl font-heading">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-brand-amber transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-border">
              <button className="text-foreground flex flex-col items-center gap-2 text-sm hover:text-brand-amber">
                <Search className="w-6 h-6" />
                Search
              </button>
              <button className="text-foreground flex flex-col items-center gap-2 text-sm hover:text-brand-coral">
                <Heart className="w-6 h-6" />
                Saved
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = "/auth";
                }}
                className="text-foreground flex flex-col items-center gap-2 text-sm hover:text-brand-teal"
              >
                <User className="w-6 h-6" />
                Profile
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
