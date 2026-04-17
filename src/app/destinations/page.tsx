import { MapPin } from "lucide-react";

export default function DestinationsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pt-32 text-center px-4">
      <MapPin className="w-16 h-16 text-brand-teal mb-6" />
      <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Explore Destinations</h1>
      <p className="text-lg text-muted-foreground max-w-md mx-auto">
        We're currently curating the best local experiences across the globe. Check back soon for new destinations.
      </p>
    </div>
  );
}
