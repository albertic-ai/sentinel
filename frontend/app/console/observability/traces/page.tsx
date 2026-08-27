"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api, type Trace, type AuditEntry } from "@/lib/api";

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString();
}

export default function TracesPage() {
  const router = useRouter();
  const [traces, setTraces] = useState<Trace[] | null>(null);
  const [audit, setAudit] = useState<AuditEntry[] | null>(null);

  useEffect(() => {
    api.traces().then((r) => setTraces(r.traces)).catch(() => setTraces([]));
    api.audit().then((r) => setAudit(r.audit)).catch(() => setAudit([]));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Traces</h1>
        <p className="text-muted-foreground">End-to-end reasoning chain traces for agent decisions.</p>
      </div>

      <Separator />

      <Tabs defaultValue="traces">
        <TabsList>
          <TabsTrigger value="traces">Reasoning Traces</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="traces" className="mt-4 space-y-4">
          {!traces
            ? Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-40 w-full" />)
            : traces.map((t) => (
                <Card
                  key={t.id}
                  className="cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => router.push(`/console/observability/traces/${t.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{t.query}</CardTitle>
                        <CardDescription>
                          {t.agent} · {t.duration_ms}ms · {fmtTime(t.time)}
                        </CardDescription>
                      </div>
                      <Badge variant={t.status === "success" ? "default" : "destructive"}>
                        {t.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {t.steps.map((s, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <Badge variant="outline" className="shrink-0 text-xs">
                            {s.step}
                          </Badge>
                          <span className="text-muted-foreground">{s.detail}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>Complete audit log of all agent actions for compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                {!audit ? (
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    {audit.map((a, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-md border px-3 py-2">
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {fmtTime(a.timestamp)}
                        </span>
                        <Badge variant="secondary" className="shrink-0 text-xs">{a.agent}</Badge>
                        <span className="font-mono text-xs">{a.action}</span>
                        <Badge
                          variant={a.result === "success" ? "default" : "outline"}
                          className="ml-auto shrink-0 text-xs"
                        >
                          {a.result}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
