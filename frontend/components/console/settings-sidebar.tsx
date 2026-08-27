"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Building2, Shield, Key, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const settingsNav = [
  { href: "/console/settings/profile", label: "Profile", icon: User },
  { href: "/console/settings/organization", label: "Organization", icon: Building2 },
  { href: "/console/settings/security", label: "Security", icon: Shield },
  { href: "/console/settings/api-keys", label: "API Keys", icon: Key },
  { href: "/console/settings/notifications", label: "Notifications", icon: Bell },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop: vertical sidebar */}
      <nav className="hidden w-48 shrink-0 space-y-1 md:block">
        {settingsNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile/Tablet: horizontal scroll tabs */}
      <ScrollArea className="w-full md:hidden">
        <nav className="flex gap-1 pb-2">
          {settingsNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
