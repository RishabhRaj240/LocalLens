import Link from "next/link";
import { Share2, MessageCircle, Camera, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-brand-charcoal text-brand-cream overflow-hidden">
      {/* Decorative subtle map-like texture (using simple svg pattern as placeholder) */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-heading text-2xl font-semibold mb-4 text-white">LocalLens</h3>
            <p className="text-white/60 mb-6 leading-relaxed max-w-xs">
              See the world through local eyes. A premium marketplace and journal for the curious traveler.
            </p>
            <div className="flex items-center gap-4 text-white/80">
              <Link href="#" className="hover:text-brand-amber transition-colors">
                <Camera className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-brand-amber transition-colors">
                <MessageCircle className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-brand-amber transition-colors">
                <Share2 className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Explore</h4>
            <ul className="flex flex-col gap-4 text-white/60">
              <li><Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><Link href="/guides" className="hover:text-white transition-colors">Find a Guide</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Travel Journal</Link></li>
              <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Platform</h4>
            <ul className="flex flex-col gap-4 text-white/60">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/become-a-guide" className="hover:text-white transition-colors">Become a Guide</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Newsletter</h4>
            <p className="text-white/60 mb-4">
              Weekly dispatches from our global community.
            </p>
            <form className="relative flex items-center">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-4 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-all"
              />
              <button 
                type="submit"
                className="absolute right-2 p-2 bg-brand-amber text-brand-charcoal rounded-full hover:bg-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} LocalLens Digital Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
