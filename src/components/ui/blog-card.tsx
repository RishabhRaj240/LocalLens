"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  author: string;
  date: string;
  variant?: "vertical" | "horizontal" | "featured";
  className?: string;
}

export function BlogCard({
  id,
  title,
  excerpt,
  imageUrl,
  category,
  author,
  date,
  variant = "vertical",
  className
}: BlogCardProps) {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  
  if (variant === "featured") {
    return (
      <Link href={`/blog/${id}`} target="_blank" rel="noopener noreferrer" className={cn("block group relative rounded-2xl overflow-hidden", className)}>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
        <div className="relative aspect-[16/9] w-full md:aspect-auto md:h-[500px]">
          <motion.img 
            initial={false}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            src={imgSrc} 
            onError={() => setImgSrc("/placeholder-blog.png")}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 text-white w-full md:w-3/4">
          <span className="inline-block px-3 py-1 bg-brand-amber text-brand-charcoal text-xs font-bold rounded-full mb-4">
            {category}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight group-hover:text-brand-amber transition-colors">
            {title}
          </h2>
          <p className="text-white/80 text-lg mb-6 line-clamp-2 md:line-clamp-3">
            {excerpt}
          </p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span>By {author}</span>
            <span className="w-1 h-1 rounded-full bg-white/50" />
            <span>{date}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={`/blog/${id}`} target="_blank" rel="noopener noreferrer" className={cn("group flex flex-col sm:flex-row gap-6", className)}>
        <div className="relative w-full sm:w-1/3 aspect-[4/3] rounded-xl overflow-hidden shadow-sm shrink-0">
          <motion.img 
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            src={imgSrc} 
            onError={() => setImgSrc("/placeholder-blog.png")}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center flex-grow py-2">
          <span className="text-brand-amber text-xs font-bold uppercase tracking-wider mb-2 block">
            {category}
          </span>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-brand-teal transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {excerpt}
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mt-auto">
            <span>{author}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{date}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Vertical variant
  return (
    <Link href={`/blog/${id}`} target="_blank" rel="noopener noreferrer" className={cn("group flex flex-col", className)}>
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm mb-4">
        <motion.img 
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          src={imgSrc} 
          onError={() => setImgSrc("/placeholder-blog.png")}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/90 backdrop-blur text-brand-charcoal px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {category}
          </span>
        </div>
      </div>
      
      <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-brand-teal transition-colors line-clamp-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
        {excerpt}
      </p>
      
      <div className="flex items-center justify-between text-xs font-medium mt-auto">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>{author}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{date}</span>
        </div>
        <span className="text-brand-amber flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Read <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
