import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiKeysPage() {
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
          <CardDescription>
            API keys for environmental data connectors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No data source credentials configured. Configure them in the Connectors page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
