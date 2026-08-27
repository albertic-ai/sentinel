"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Bot,
  BookOpen,
  Brain,
  Activity,
  FileText,
  GitBranch,
  Plug,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/console/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/console/agents", label: "Agents", icon: Bot },
  { href: "/console/registry", label: "Registry", icon: BookOpen },
  { href: "/console/memory", label: "Memory", icon: Brain },
  { href: "/console/observability/logs", label: "Logs", icon: FileText },
  { href: "/console/observability/traces", label: "Traces", icon: GitBranch },
  { href: "/console/connectors", label: "Connectors", icon: Plug },
  { href: "/console/settings", label: "Settings", icon: Settings },
  { href: "/console/help", label: "Help", icon: HelpCircle },
];

export function ConsoleHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="flex h-14 items-center gap-4 px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link href="/console" className="flex items-center gap-2 font-semibold">
            <Shield className="h-5 w-5" />
            <span className="hidden sm:inline">Sentinel Console</span>
            <span className="sm:hidden">Sentinel</span>
          </Link>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-14 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <ScrollArea className="relative h-full w-64 border-r bg-background">
            <nav className="space-y-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
      )}
    </>
  );
}
