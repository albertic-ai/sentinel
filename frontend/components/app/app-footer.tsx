import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="border-t bg-background py-6">
      <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Sentinel. All rights reserved.</p>
        <nav className="flex flex-wrap justify-center gap-4">
          <Link href="/legal/terms" className="hover:underline">
            Terms
          </Link>
          <Link href="/legal/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/legal/cookies" className="hover:underline">
            Cookies
          </Link>
        </nav>
      </div>
    </footer>
  );
}
