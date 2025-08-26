import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function CircularProgress({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = true,
  label,
  className
}: CircularProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizes = {
    sm: { 
      container: 'w-16 h-16', 
      stroke: 4, 
      text: 'text-xs',
      radius: 24 
    },
    md: { 
      container: 'w-24 h-24', 
      stroke: 6, 
      text: 'text-sm',
      radius: 36 
    },
    lg: { 
      container: 'w-32 h-32', 
      stroke: 8, 
      text: 'text-base',
      radius: 48 
    }
  };

  const colors = {
    primary: 'stroke-primary',
    success: 'stroke-success',
    warning: 'stroke-warning', 
    error: 'stroke-destructive'
  };

  const sizeConfig = sizes[size];
  const circumference = 2 * Math.PI * sizeConfig.radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative", sizeConfig.container, className)}>
      <svg
        className="transform -rotate-90 w-full h-full"
        viewBox={`0 0 ${(sizeConfig.radius + sizeConfig.stroke) * 2} ${(sizeConfig.radius + sizeConfig.stroke) * 2}`}
      >
        {/* Background circle */}
        <circle
          cx={sizeConfig.radius + sizeConfig.stroke}
          cy={sizeConfig.radius + sizeConfig.stroke}
          r={sizeConfig.radius}
          stroke="currentColor"
          strokeWidth={sizeConfig.stroke}
          fill="none"
          className="text-muted opacity-20"
        />
        
        {/* Progress circle */}
        <circle
          cx={sizeConfig.radius + sizeConfig.stroke}
          cy={sizeConfig.radius + sizeConfig.stroke}
          r={sizeConfig.radius}
          stroke="currentColor"
          strokeWidth={sizeConfig.stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(colors[color], "transition-all duration-1000 ease-out")}
        />
      </svg>
      
      {/* Center content */}
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold text-foreground", sizeConfig.text)}>
            {Math.round(percentage)}%
          </span>
          {label && (
            <span className="text-xs text-muted-foreground mt-1 text-center leading-tight">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}