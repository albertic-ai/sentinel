import { ConsoleLayout } from "@/components/console";

export default function ConsoleRouteLayout({ children }: LayoutProps<"/console">) {
  return <ConsoleLayout>{children}</ConsoleLayout>;
}
