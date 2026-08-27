import Link from "next/link";
import { Shield } from "lucide-react";

export function AppHeader() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Shield className="h-5 w-5" />
          <span>Sentinel</span>
        </Link>
      </div>
    </header>
  );
}
