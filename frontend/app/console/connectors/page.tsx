import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Plug } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ConnectorTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Connector</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Used By</TableHead>
          <TableHead>Last Sync</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 4 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-md" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-16 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="ml-auto h-8 w-20 rounded-md" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function ConnectorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Connectors</h1>
          <p className="text-muted-foreground">
            Environmental data sources connected to your agents.
          </p>
        </div>
        <Button size="sm">
          <Plug className="mr-2 h-4 w-4" />
          Add Connector
        </Button>
      </div>

      <Separator />

      <Card>
        <CardContent className="p-0">
          <ConnectorTableSkeleton />
        </CardContent>
      </Card>
    </div>
  );
}
