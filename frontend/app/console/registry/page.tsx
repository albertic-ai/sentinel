"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api, type RegistryEntry } from "@/lib/api";

export default function RegistryPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<RegistryEntry[] | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.registry().then((r) => setAgents(r.agents)).catch(() => setAgents([]));
  }, []);

  const filtered = agents?.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Agent Registry</h1>
        <p className="text-muted-foreground">Discover, browse, and deploy agents from the catalog.</p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <Separator />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Capabilities</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!filtered
                ? Array.from({ length: 4 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={5}>
                        <Skeleton className="h-8 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                : filtered.map((a) => (
                    <TableRow
                      key={a.name}
                      className="cursor-pointer"
                      onClick={() => router.push(`/console/registry/${a.name}`)}
                    >
                      <TableCell>
                        <div className="font-medium">{a.label}</div>
                        <div className="text-xs text-muted-foreground">{a.description}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">v{a.version}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{a.owner}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {a.capabilities.slice(0, 2).map((c) => (
                            <Badge key={c} variant="secondary" className="text-xs">
                              {c}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/console/registry/${a.name}`);
                          }}
                        >
                          Deploy
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
