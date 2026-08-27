"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { ScrollArea } from "@/components/ui/scroll-area";

const navItems = [
  { href: "/console/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/console/agents", label: "Agents", icon: Bot },
  { href: "/console/registry", label: "Registry", icon: BookOpen },
  { href: "/console/memory", label: "Memory", icon: Brain },
  {
    label: "Observability",
    icon: Activity,
    children: [
      { href: "/console/observability/logs", label: "Logs", icon: FileText },
      { href: "/console/observability/traces", label: "Traces", icon: GitBranch },
    ],
  },
  { href: "/console/connectors", label: "Connectors", icon: Plug },
  { href: "/console/settings", label: "Settings", icon: Settings },
  { href: "/console/help", label: "Help", icon: HelpCircle },
];

export function ConsoleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 border-r bg-muted/40 md:flex md:flex-col">
      <ScrollArea className="flex-1">
        <nav className="space-y-1 p-4">
          {navItems.map((item) => {
            if ("children" in item) {
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </div>
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 pl-10 text-sm font-medium transition-colors",
                        pathname === child.href
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-background hover:text-foreground"
                      )}
                    >
                      <child.icon className="h-4 w-4" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}
