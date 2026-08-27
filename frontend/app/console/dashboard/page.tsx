"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, Bot, Brain, AlertTriangle } from "lucide-react";
import { api, type DashboardData } from "@/lib/api";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const severityColor: Record<string, string> = {
  critical: "text-red-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
  alert: "text-red-600",
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api.dashboard().then(setData).catch(() => setData(null));
  }, []);

  const stats = [
    { label: "Total Agents", icon: Bot, value: data?.stats.total_agents, hint: "Registered in fleet" },
    { label: "Active Tasks", icon: Activity, value: data?.stats.active_tasks, hint: "Currently running" },
    { label: "Memories", icon: Brain, value: data?.stats.memories, hint: "Across all agents" },
    { label: "Alerts", icon: AlertTriangle, value: data?.stats.alerts, hint: "Active alerts" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your Sentinel agent fleet.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{s.label}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {s.value === undefined ? (
                <Skeleton className="mb-1 h-8 w-12" />
              ) : (
                <div className="text-2xl font-bold">{s.value}</div>
              )}
              <p className="text-xs text-muted-foreground">{s.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fleet Health</CardTitle>
            <CardDescription>Current status of all agents</CardDescription>
          </CardHeader>
          <CardContent>
            {!data ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {data.health.map((a) => (
                  <div key={a.name} className="flex items-center justify-between rounded-md border px-4 py-3">
                    <span className="text-sm font-medium">{a.label}</span>
                    <Badge variant={a.health === "healthy" ? "default" : "secondary"}>
                      {a.health}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest agent actions</CardDescription>
          </CardHeader>
          <CardContent>
            {!data ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {data.activity.map((a, i) => (
                  <div key={i} className="flex items-start justify-between gap-3 text-sm">
                    <div>
                      <p className="font-medium">{a.agent}</p>
                      <p className="text-muted-foreground">{a.action}</p>
                    </div>
                    <span className={`shrink-0 text-xs ${severityColor[a.level] || "text-muted-foreground"}`}>
                      {timeAgo(a.time)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
