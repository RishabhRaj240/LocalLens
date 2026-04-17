import { Users } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pt-32 text-center px-4">
      <Users className="w-16 h-16 text-brand-coral mb-6" />
      <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Join the Community</h1>
      <p className="text-lg text-muted-foreground max-w-md mx-auto">
        Connect with passionate locals and fellow travelers. Forums and community events are launching soon.
      </p>
    </div>
  );
}
