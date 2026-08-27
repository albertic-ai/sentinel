"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Bot } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api, type Agent } from "@/lib/api";

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[] | null>(null);

  useEffect(() => {
    api.agents().then((r) => setAgents(r.agents)).catch(() => setAgents([]));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Agents</h1>
          <p className="text-muted-foreground">Manage and monitor your deployed agents.</p>
        </div>
        <Button size="sm">
          <Bot className="mr-2 h-4 w-4" />
          Deploy Agent
        </Button>
      </div>

      <Separator />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Runs Today</TableHead>
                <TableHead>Version</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!agents
                ? Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={5}>
                        <Skeleton className="h-8 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                : agents.map((a) => (
                    <TableRow key={a.name} className="cursor-pointer">
                      <TableCell>
                        <Link href={`/console/agents/${a.name}`} className="block">
                          <div className="font-medium">{a.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {a.data_sources.join(" · ")}
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant={a.status === "active" ? "default" : "secondary"}>
                          {a.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{a.region}</TableCell>
                      <TableCell className="text-sm">{a.runs_today}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">v{a.version}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
