import {
  Bot,
  Briefcase,
  BriefcaseBusiness,
  Cable,
  CheckCircle2,
  DatabaseZap,
  FileText,
  Images,
  MonitorCog,
  Settings,
  Table2,
  Video,
  type LucideIcon
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Bot,
  Briefcase,
  BriefcaseBusiness,
  Cable,
  CheckCircle2,
  DatabaseZap,
  FileText,
  Images,
  MonitorCog,
  Settings,
  Table2,
  Video
};

export function DynamicIcon({
  name,
  className
}: {
  name?: string | null;
  className?: string;
}) {
  const Icon = name ? icons[name] ?? CheckCircle2 : CheckCircle2;
  return <Icon className={className} aria-hidden="true" />;
}
