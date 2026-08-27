"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { api, type LogEntry } from "@/lib/api";

const levelColor: Record<string, string> = {
  INFO: "bg-blue-600",
  WARN: "bg-yellow-600",
  ERROR: "bg-red-600",
};

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString();
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[] | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.logs().then((r) => setLogs(r.logs)).catch(() => setLogs([]));
  }, []);

  const filtered = logs?.filter(
    (l) =>
      l.message.toLowerCase().includes(query.toLowerCase()) ||
      l.agent.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Logs</h1>
        <p className="text-muted-foreground">Structured logs from agent operations via OpenTelemetry.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter logs..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Log Stream</CardTitle>
          <CardDescription>Real-time structured logs</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            {!filtered ? (
              <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-2 font-mono text-sm">
                {filtered.map((l, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-md border bg-muted/30 px-3 py-2">
                    <span className="shrink-0 text-xs text-muted-foreground">{fmtTime(l.timestamp)}</span>
                    <Badge className={`shrink-0 ${levelColor[l.level] || ""}`}>{l.level}</Badge>
                    <span className="shrink-0 text-xs text-muted-foreground">{l.agent}</span>
                    <span className="truncate">{l.message}</span>
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
