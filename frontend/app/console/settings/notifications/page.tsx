"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const notifications = [
  {
    id: "agent-alerts",
    label: "Agent alerts",
    description: "When an agent detects an anomaly or critical event",
  },
  {
    id: "task-completions",
    label: "Task completions",
    description: "When an agent completes a long-running task",
  },
  {
    id: "fleet-health",
    label: "Fleet health",
    description: "When an agent goes offline or encounters errors",
  },
  {
    id: "compliance-reports",
    label: "Compliance reports",
    description: "When a new compliance report is generated",
  },
  {
    id: "memory-updates",
    label: "Memory updates",
    description: "When new memories are generated from agent sessions",
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose how you want to be notified about agent activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((item, index) => (
              <div key={item.id}>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={item.id} className="text-sm font-medium">
                      {item.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <Switch id={item.id} />
                </div>
                {index < notifications.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
