import { SettingsSidebar } from "@/components/console/settings-sidebar";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and platform configuration.
        </p>
      </div>
      <div className="flex gap-8">
        <SettingsSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
