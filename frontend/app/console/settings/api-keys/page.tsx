"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";

export default function ApiKeysPage() {
  const [creds, setCreds] = useState<{ name: string; configured: boolean }[] | null>(null);

  useEffect(() => {
    api.credentials().then((r) => setCreds(r.credentials)).catch(() => setCreds([]));
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for programmatic access to Sentinel
              </CardDescription>
            </div>
            <Button size="sm">Create key</Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No API keys created. Create a key to access the Sentinel API programmatically.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Source Credentials</CardTitle>
          <CardDescription>API keys for environmental data connectors</CardDescription>
        </CardHeader>
        <CardContent>
          {!creds ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {creds.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between rounded-md border px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.configured ? "Configured" : "Not configured"}
                    </p>
                  </div>
                  {c.configured ? (
                    <Badge variant="default" className="bg-green-600">Active</Badge>
                  ) : (
                    <Button variant="outline" size="sm">Configure</Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
