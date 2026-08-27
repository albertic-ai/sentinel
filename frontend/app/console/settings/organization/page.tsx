"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { api, type Organization } from "@/lib/api";

export default function OrganizationPage() {
  const [org, setOrg] = useState<Organization | null>(null);

  useEffect(() => {
    api.organization().then(setOrg).catch(() => setOrg(null));
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
          <CardDescription>Manage your organization details</CardDescription>
        </CardHeader>
        <CardContent>
          {!org ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          ) : (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization name</Label>
                <Input id="org-name" defaultValue={org.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-domain">Domain</Label>
                <Input id="org-domain" defaultValue={org.domain} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-region">Region</Label>
                <Input id="org-region" defaultValue={org.region} />
              </div>
              <Button type="submit">Update organization</Button>
            </form>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>Manage team members and roles</CardDescription>
        </CardHeader>
        <CardContent>
          {!org ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {org.members.map((m) => (
                <div
                  key={m.email}
                  className="flex items-center justify-between rounded-md border px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                  <Badge variant="secondary">{m.role}</Badge>
                </div>
              ))}
              <Button variant="outline" size="sm">Invite member</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
