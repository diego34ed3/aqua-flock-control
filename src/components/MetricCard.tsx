import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  status?: 'success' | 'warning' | 'error' | 'info';
  className?: string;
  children?: React.ReactNode;
}

export function MetricCard({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend, 
  status = 'info',
  className,
  children 
}: MetricCardProps) {
  const statusColors = {
    success: 'text-success',
    warning: 'text-warning', 
    error: 'text-destructive',
    info: 'text-primary'
  };

  const trendColors = {
    positive: 'bg-success/10 text-success',
    negative: 'bg-destructive/10 text-destructive', 
    neutral: 'bg-muted text-muted-foreground'
  };

  return (
    <Card className={cn("bg-gradient-card border-border/50 hover:shadow-lg transition-all duration-300 min-w-0", className)}>
      <CardHeader className="pb-2 px-3 sm:px-6 sm:pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className={cn("p-1.5 sm:p-2 rounded-lg bg-primary/10 flex-shrink-0", statusColors[status])}>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="font-medium text-foreground text-sm sm:text-base truncate">{title}</h3>
          </div>
          {trend && (
            <Badge variant="secondary" className={cn("text-xs flex-shrink-0", trendColors[trend.type])}>
              {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 px-3 sm:px-6">
        <div className="flex items-end gap-2 mb-3 sm:mb-4">
          <span className="text-2xl sm:text-3xl font-bold text-foreground truncate">{value}</span>
          {unit && <span className="text-muted-foreground mb-1 text-sm flex-shrink-0">{unit}</span>}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}