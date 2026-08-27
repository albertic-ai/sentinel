import Link from "next/link";
import Image from "next/image";
import { AppFooter } from "@/components/app";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function LegalLayout({ children }: LayoutProps<"/legal">) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto flex h-14 items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/icons/app/dark.png" alt="Sentinel" width={24} height={24} />
            <span>Sentinel</span>
          </Link>
        </div>
      </header>
      <div className="container mx-auto max-w-3xl flex-1 px-4 py-8 md:py-12">
        <ScrollArea className="mb-6 w-full">
          <nav className="flex gap-4 text-sm">
            <Link href="/legal/terms" className="shrink-0 text-muted-foreground hover:text-foreground hover:underline">
              Terms of Service
            </Link>
            <Link href="/legal/privacy" className="shrink-0 text-muted-foreground hover:text-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="/legal/cookies" className="shrink-0 text-muted-foreground hover:text-foreground hover:underline">
              Cookie Policy
            </Link>
          </nav>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <article className="prose prose-neutral max-w-none prose-headings:text-lg md:prose-headings:text-xl">
          {children}
        </article>
      </div>
      <AppFooter />
    </div>
  );
}
