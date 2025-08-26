import { MetricCard } from "@/components/MetricCard";
import { CircularProgress } from "@/components/CircularProgress";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Droplets, 
  Wheat, 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export default function Abastecimiento() {
  const { waterLevels, feedLevels } = useRealtimeData();

  // Calculate averages
  const avgWaterLevel = waterLevels.reduce((sum, tank) => sum + tank.value, 0) / waterLevels.length;
  const avgFeedLevel = feedLevels.reduce((sum, silo) => sum + silo.value, 0) / feedLevels.length;

  // Prepare chart data
  const chartData = [
    {
      name: 'Agua',
      Tanques: waterLevels.reduce((sum, tank) => sum + tank.value, 0),
      Capacidad: waterLevels.reduce((sum, tank) => sum + tank.max, 0)
    },
    {
      name: 'Alimento',
      Silos: feedLevels.reduce((sum, silo) => sum + silo.value, 0),
      Capacidad: feedLevels.reduce((sum, silo) => sum + silo.max, 0)
    }
  ];

  const getStatusColor = (percentage: number) => {
    if (percentage > 70) return 'success';
    if (percentage > 30) return 'warning';
    return 'error';
  };

  const getLevelStatus = (level: number) => {
    if (level > 70) return { text: 'Óptimo', color: 'success' };
    if (level > 30) return { text: 'Medio', color: 'warning' };
    return { text: 'Bajo', color: 'error' };
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Abastecimiento</h1>
          <p className="text-muted-foreground">Control de niveles de agua y alimentación</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
          <Badge variant="secondary" className="bg-success/10 text-success">
            <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></div>
            Sistema Activo
          </Badge>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Nivel Promedio de Agua"
          value={avgWaterLevel.toFixed(1)}
          unit="%"
          icon={Droplets}
          status={getStatusColor(avgWaterLevel)}
          trend={{
            value: -2.3,
            label: 'última hora',
            type: 'negative'
          }}
        />

        <MetricCard
          title="Nivel Promedio de Alimento"
          value={avgFeedLevel.toFixed(1)}
          unit="%"
          icon={Wheat}
          status={getStatusColor(avgFeedLevel)}
          trend={{
            value: -1.8,
            label: 'última hora',
            type: 'negative'
          }}
        />

        <MetricCard
          title="Tanques Activos"
          value={waterLevels.filter(tank => tank.value > 10).length}
          unit={`de ${waterLevels.length}`}
          icon={Droplets}
          status="info"
        />

        <MetricCard
          title="Silos Activos"
          value={feedLevels.filter(silo => silo.value > 10).length}
          unit={`de ${feedLevels.length}`}
          icon={Wheat}
          status="info"
        />
      </div>

      {/* Water and Feed Levels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Levels */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-primary" />
              Niveles de Agua
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {waterLevels.map((tank) => {
                const percentage = (tank.value / tank.max) * 100;
                const status = getLevelStatus(percentage);
                
                return (
                  <div key={tank.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{tank.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {tank.value.toFixed(1)}L de {tank.max}L
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`${
                          status.color === 'success' ? 'bg-success/10 text-success' :
                          status.color === 'warning' ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        }`}
                      >
                        {status.text}
                      </Badge>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          percentage > 70 ? 'bg-success' :
                          percentage > 30 ? 'bg-warning' : 'bg-destructive'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>0L</span>
                      <span className="font-medium">{percentage.toFixed(1)}%</span>
                      <span>{tank.max}L</span>
                    </div>

                    {percentage < 30 && (
                      <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <span className="text-sm text-destructive">Nivel crítico - Requiere rellenado</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Feed Levels */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wheat className="w-5 h-5 text-primary" />
              Niveles de Alimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {feedLevels.map((silo) => {
                const percentage = (silo.value / silo.max) * 100;
                const status = getLevelStatus(percentage);
                
                return (
                  <div key={silo.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{silo.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {silo.value.toFixed(1)}kg de {silo.max}kg
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`${
                          status.color === 'success' ? 'bg-success/10 text-success' :
                          status.color === 'warning' ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        }`}
                      >
                        {status.text}
                      </Badge>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          percentage > 70 ? 'bg-success' :
                          percentage > 30 ? 'bg-warning' : 'bg-destructive'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>0kg</span>
                      <span className="font-medium">{percentage.toFixed(1)}%</span>
                      <span>{silo.max}kg</span>
                    </div>

                    {percentage < 30 && (
                      <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded-lg">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <span className="text-sm text-destructive">Nivel crítico - Requiere rellenado</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consumption Chart */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-primary" />
            Resumen de Capacidades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar
                dataKey="Tanques"
                fill="hsl(var(--primary))"
                name="Nivel Actual (L/kg)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="Silos"
                fill="hsl(var(--success))"
                name="Nivel Actual (L/kg)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}