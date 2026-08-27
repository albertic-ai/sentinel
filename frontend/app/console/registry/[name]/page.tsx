"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { api, type RegistryEntry } from "@/lib/api";

export default function RegistryDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);
  const [entry, setEntry] = useState<RegistryEntry | null>(null);

  useEffect(() => {
    api.registryEntry(name).then(setEntry).catch(() => setEntry(null));
  }, [name]);

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/console/registry">Registry</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{entry?.label || name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{entry?.label || name}</h1>
            {entry && <Badge variant="outline">v{entry.version}</Badge>}
          </div>
          <p className="font-mono text-sm text-muted-foreground">{name}</p>
        </div>
        <Button size="sm">Deploy Agent</Button>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Registry catalog entry</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!entry ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">{entry.description}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Owner</p>
                  <p className="text-sm font-medium">{entry.owner}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant="default" className="mt-1">{entry.status}</Badge>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs text-muted-foreground">Capabilities</p>
                <div className="flex flex-wrap gap-1.5">
                  {entry.capabilities.map((c) => (
                    <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
