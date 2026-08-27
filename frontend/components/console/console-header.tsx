import Link from "next/link";
import { Shield } from "lucide-react";

export function ConsoleHeader() {
  return (
    <header className="border-b bg-background">
      <div className="flex h-14 items-center gap-4 px-6">
        <Link href="/console" className="flex items-center gap-2 font-semibold">
          <Shield className="h-5 w-5" />
          <span>Sentinel Console</span>
        </Link>
      </div>
    </header>
  );
}
