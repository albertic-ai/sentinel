import Link from "next/link";
import { Shield } from "lucide-react";

export default function AuthLayout({ children }: LayoutProps<"/auth">) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4">
      <Link href="/" className="mb-8 flex items-center gap-2 text-xl font-semibold">
        <Shield className="h-6 w-6" />
        <span>Sentinel</span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
