import Link from "next/link";
import Image from "next/image";
import { AppFooter } from "@/components/app";

export default function LegalLayout({ children }: LayoutProps<"/legal">) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="container mx-auto flex h-14 items-center px-6 md:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/icons/app/dark.png" alt="Sentinel" width={24} height={24} />
            <span>Sentinel</span>
          </Link>
        </div>
      </header>
      <div className="container mx-auto max-w-3xl flex-1 px-6 py-8 md:px-8 md:py-12">
        <article className="prose prose-neutral max-w-none">
          {children}
        </article>
      </div>
      <AppFooter />
    </div>
  );
}
