import Link from "next/link";
import Image from "next/image";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-14 items-center px-6 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/icons/app/dark.png" alt="Sentinel" width={24} height={24} />
          <span>Sentinel</span>
        </Link>
      </div>
    </header>
  );
}
