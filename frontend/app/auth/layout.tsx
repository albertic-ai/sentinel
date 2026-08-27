import { AppHeader } from "@/components/app";
import { AppFooter } from "@/components/app";

export default function AuthLayout({ children }: LayoutProps<"/auth">) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1 flex-col items-center justify-center bg-muted/40 px-4 py-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <AppFooter />
    </div>
  );
}
