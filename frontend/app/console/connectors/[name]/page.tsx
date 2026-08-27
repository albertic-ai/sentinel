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
import { api, type Connector } from "@/lib/api";

export default function ConnectorDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);
  const decodedName = decodeURIComponent(name);
  const [connector, setConnector] = useState<Connector | null>(null);

  useEffect(() => {
    api.connector(decodedName).then(setConnector).catch(() => setConnector(null));
  }, [decodedName]);

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/console/connectors">Connectors</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{decodedName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">{decodedName}</h1>
          {connector && (
            <Badge variant="default" className="bg-green-600">{connector.status}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Sync now</Button>
          <Button variant="outline" size="sm">Configure</Button>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>Data source connector configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!connector ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">{connector.description}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="text-sm font-medium capitalize">{connector.status}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Sync</p>
                  <p className="text-sm font-medium">
                    {new Date(connector.last_sync).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs text-muted-foreground">Used By</p>
                <div className="flex flex-wrap gap-1.5">
                  {connector.used_by.map((u) => (
                    <Badge key={u} variant="secondary" className="text-xs">{u}</Badge>
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
