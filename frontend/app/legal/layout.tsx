import Link from "next/link";
import { Shield } from "lucide-react";

export default function LegalLayout({ children }: LayoutProps<"/legal">) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-14 items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Shield className="h-5 w-5" />
            <span>Sentinel</span>
          </Link>
        </div>
      </header>
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <nav className="mb-8 flex gap-4 text-sm">
          <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground hover:underline">
            Terms of Service
          </Link>
          <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground hover:underline">
            Privacy Policy
          </Link>
          <Link href="/legal/cookies" className="text-muted-foreground hover:text-foreground hover:underline">
            Cookie Policy
          </Link>
        </nav>
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          {children}
        </article>
      </div>
    </div>
  );
}
