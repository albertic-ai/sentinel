"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Search } from "lucide-react";
import { api, type MemoryEntry } from "@/lib/api";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function MemoryPage() {
  const router = useRouter();
  const [counts, setCounts] = useState<{ agent: string; name: string; count: number }[] | null>(null);
  const [memories, setMemories] = useState<MemoryEntry[] | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.memory().then((r) => {
      setCounts(r.counts);
      setMemories(r.memories);
    }).catch(() => {
      setCounts([]);
      setMemories([]);
    });
  }, []);

  const filtered = memories?.filter((m) =>
    m.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Memory Explorer</h1>
        <p className="text-muted-foreground">Browse persistent memories stored across agent sessions.</p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search memories..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {!counts
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-8" />
                </CardContent>
              </Card>
            ))
          : counts.map((c) => (
              <Card key={c.name}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{c.agent}</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{c.count}</div>
                  <p className="text-xs text-muted-foreground">memories stored</p>
                </CardContent>
              </Card>
            ))}
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Memory Timeline</CardTitle>
          <CardDescription>Memories auto-generated from agent conversations via Memory Bank</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80">
            {!filtered ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((m) => (
                  <div
                    key={m.id}
                    className="cursor-pointer space-y-1.5 rounded-md border p-4 transition-colors hover:bg-muted/50"
                    onClick={() => router.push(`/console/memory/${m.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">{m.agent}</Badge>
                      <span className="text-xs text-muted-foreground">{timeAgo(m.created_at)}</span>
                    </div>
                    <p className="text-sm">{m.content}</p>
                    <p className="text-xs text-muted-foreground">Session {m.session_id}</p>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
