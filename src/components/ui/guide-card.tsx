"use client";

import { motion } from "framer-motion";
import { StarRating } from "./star-rating";
import { MapPin, CircleCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface GuideCardProps {
  id: string;
  name: string;
  tagline: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  location: string;
  priceHour: number;
  isVerified?: boolean;
  featured?: boolean;
  className?: string;
}

export function GuideCard({
  id,
  name,
  tagline,
  imageUrl,
  rating,
  reviews,
  location,
  priceHour,
  isVerified = false,
  featured = false,
  className
}: GuideCardProps) {
  return (
    <Link href={`/guides/${id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className={cn(
          "group relative flex flex-col bg-card rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50",
          className
        )}
      >
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {featured && (
            <span className="bg-brand-amber text-brand-charcoal text-xs font-bold px-3 py-1 rounded-full shadow-md">
              Featured
            </span>
          )}
          {isVerified && (
            <span className="bg-brand-teal text-white flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full shadow-md">
              <CircleCheck className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        {/* Price Tag */}
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/90 backdrop-blur-md text-foreground text-sm font-bold px-3 py-1.5 rounded-full shadow-sm">
            €{priceHour}<span className="text-muted-foreground text-xs font-normal">/hr</span>
          </span>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <motion.img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle gradient overlay at the bottom so text pops if we overlaid it, but here text is below */}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-brand-teal transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground text-xs font-medium mt-1">
                <MapPin className="w-3 h-3 text-brand-amber" />
                {location}
              </div>
            </div>
          </div>

          <p className="text-sm text-foreground/80 line-clamp-2 mb-4">
            {tagline}
          </p>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
            <StarRating rating={rating} />
            <span className="text-xs text-muted-foreground font-medium">({reviews} reviews)</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
