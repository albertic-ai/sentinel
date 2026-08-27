import { ConsoleHeader } from "./console-header";
import { ConsoleSidebar } from "./console-sidebar";

interface ConsoleLayoutProps {
  children: React.ReactNode;
}

export function ConsoleLayout({ children }: ConsoleLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <ConsoleHeader />
      <div className="flex flex-1">
        <ConsoleSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
