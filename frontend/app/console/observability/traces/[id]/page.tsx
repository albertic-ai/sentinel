"use client";

import { use, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { api, type Trace } from "@/lib/api";

export default function TraceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [trace, setTrace] = useState<Trace | null>(null);

  useEffect(() => {
    api.trace(id).then(setTrace).catch(() => setTrace(null));
  }, [id]);

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/console/observability/traces">Traces</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{trace?.id || id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {!trace ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : (
        <>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">{trace.query}</h1>
              <Badge variant={trace.status === "success" ? "default" : "destructive"}>
                {trace.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {trace.agent} · {trace.duration_ms}ms · {new Date(trace.time).toLocaleString()}
            </p>
          </div>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Reasoning Chain</CardTitle>
              <CardDescription>Step-by-step agent decision process</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="relative space-y-4 border-l pl-6">
                {trace.steps.map((s, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[27px] flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {i + 1}
                    </span>
                    <Badge variant="outline" className="mb-1 text-xs">{s.step}</Badge>
                    <p className="text-sm text-muted-foreground">{s.detail}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
