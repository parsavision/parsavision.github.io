import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

type CalloutType = "info" | "warning" | "success" | "error" | "default";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig = {
  info: {
    icon: Info,
    className: "border-blue-500/50 bg-blue-500/10",
    iconClassName: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-yellow-500/50 bg-yellow-500/10",
    iconClassName: "text-yellow-500",
  },
  success: {
    icon: CheckCircle,
    className: "border-green-500/50 bg-green-500/10",
    iconClassName: "text-green-500",
  },
  error: {
    icon: XCircle,
    className: "border-red-500/50 bg-red-500/10",
    iconClassName: "text-red-500",
  },
  default: {
    icon: AlertCircle,
    className: "border-border bg-secondary/50",
    iconClassName: "text-muted-foreground",
  },
};

export function Callout({ type = "default", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border p-4",
        config.className
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", config.iconClassName)} />
      <div className="space-y-1.5">
        {title && <p className="font-semibold">{title}</p>}
        <div className="text-sm text-muted-foreground [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}
