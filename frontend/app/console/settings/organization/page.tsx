import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OrganizationPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
          <CardDescription>Manage your organization details</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization name</Label>
              <Input id="org-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-domain">Domain</Label>
              <Input id="org-domain" placeholder="example.org" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-region">Region</Label>
              <Input id="org-region" placeholder="e.g. us-central1" />
            </div>
            <Button type="submit">Update organization</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>Manage team members and roles</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No team members added. Invite members to collaborate on your agent fleet.
          </p>
          <Button variant="outline" className="mt-4" size="sm">
            Invite member
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
