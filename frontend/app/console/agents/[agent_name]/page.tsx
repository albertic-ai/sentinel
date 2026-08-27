"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { api, type Agent, type MemoryEntry } from "@/lib/api";

export default function AgentDetailPage({
  params,
}: {
  params: Promise<{ agent_name: string }>;
}) {
  const { agent_name } = use(params);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [memories, setMemories] = useState<MemoryEntry[] | null>(null);

  useEffect(() => {
    api.agent(agent_name).then(setAgent).catch(() => setAgent(null));
    api.agentMemories(agent_name).then((r) => setMemories(r.memories)).catch(() => setMemories([]));
  }, [agent_name]);

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/console">Console</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/console/agents">Agents</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{agent?.label || agent_name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{agent?.label || agent_name}</h1>
            {agent && (
              <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                {agent.status}
              </Badge>
            )}
          </div>
          <p className="font-mono text-sm text-muted-foreground">{agent_name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Configure</Button>
          <Button size="sm">Run</Button>
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="config">Config</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Version", value: agent && `v${agent.version}` },
              { label: "Total Runs", value: agent?.runs_total?.toLocaleString() },
              { label: "Runs Today", value: agent?.runs_today },
              { label: "Memories", value: agent?.memories },
            ].map((s) => (
              <Card key={s.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{s.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  {s.value === undefined || s.value === null ? (
                    <Skeleton className="h-6 w-16" />
                  ) : (
                    <span className="text-xl font-bold">{s.value}</span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {!agent ? (
                <Skeleton className="h-4 w-full" />
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">{agent.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.capabilities.map((c) => (
                      <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                    ))}
                  </div>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Region:</span> {agent.region}
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Data sources:</span>{" "}
                    {agent.data_sources.join(", ")}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memory" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Memories</CardTitle>
              <CardDescription>Persistent context from Memory Bank</CardDescription>
            </CardHeader>
            <CardContent>
              {!memories ? (
                <div className="space-y-3">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : memories.length === 0 ? (
                <p className="text-sm text-muted-foreground">No memories stored for this agent.</p>
              ) : (
                <div className="space-y-3">
                  {memories.map((m) => (
                    <div key={m.id} className="space-y-1 rounded-md border p-4">
                      <p className="text-sm">{m.content}</p>
                      <p className="text-xs text-muted-foreground">Session {m.session_id}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Configuration</CardTitle>
              <CardDescription>Model, tools, and instructions</CardDescription>
            </CardHeader>
            <CardContent>
              {!agent ? (
                <Skeleton className="h-24 w-full" />
              ) : (
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Model:</span> {agent.model}</p>
                  <p><span className="text-muted-foreground">Version:</span> v{agent.version}</p>
                  <p><span className="text-muted-foreground">Status:</span> {agent.status}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
