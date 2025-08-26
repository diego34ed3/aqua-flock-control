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
    <Card className={cn("bg-gradient-card border-border/50 hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg bg-primary/10", statusColors[status])}>
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-foreground">{title}</h3>
          </div>
          {trend && (
            <Badge variant="secondary" className={cn("text-xs", trendColors[trend.type])}>
              {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-end gap-2 mb-4">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-muted-foreground mb-1">{unit}</span>}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}