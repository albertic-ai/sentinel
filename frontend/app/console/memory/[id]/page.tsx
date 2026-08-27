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
import { api, type MemoryEntry } from "@/lib/api";

export default function MemoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [memory, setMemory] = useState<MemoryEntry | null>(null);

  useEffect(() => {
    api.memoryEntry(id).then(setMemory).catch(() => setMemory(null));
  }, [id]);

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/console/memory">Memory</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{memory?.id || id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-semibold">Memory Entry</h1>
        <p className="font-mono text-sm text-muted-foreground">{id}</p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
          <CardDescription>Persistent memory stored via Memory Bank</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!memory ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <>
              <p className="text-sm">{memory.content}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">Agent</p>
                  <Badge variant="secondary" className="mt-1">{memory.agent}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Session</p>
                  <p className="text-sm font-medium">{memory.session_id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm font-medium">
                    {new Date(memory.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
