import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TracesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Traces</h1>
        <p className="text-muted-foreground">
          End-to-end reasoning chain traces for agent decisions.
        </p>
      </div>

      <Separator />

      <Tabs defaultValue="traces">
        <TabsList>
          <TabsTrigger value="traces">Reasoning Traces</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="traces" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Reasoning Traces</CardTitle>
              <CardDescription>
                Visual representation of agent decision-making, tool calls, and
                sub-agent delegations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-md border p-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="ml-auto h-5 w-16 rounded-full" />
                      </div>
                      <div className="ml-9 mt-2 space-y-1.5">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
              <CardDescription>
                Complete audit log of all agent actions for compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-md border px-4 py-2"
                    >
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-5 w-14 rounded-full" />
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 flex-1" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
