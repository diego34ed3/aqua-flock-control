import { MetricCard } from "@/components/MetricCard";
import { CircularProgress } from "@/components/CircularProgress";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  MapPin, 
  Clock,
  Eye,
  Zap,
  TrendingUp
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ScatterChart,
  Scatter
} from 'recharts';
import { useState, useEffect } from "react";

export default function Movimiento() {
  const { motionData } = useRealtimeData();
  const [activityHistory, setActivityHistory] = useState<any[]>([]);
  const [detectionZones, setDetectionZones] = useState([
    { id: 'zona1', name: 'Zona 1 - Entrada', activity: 0, lastDetection: null },
    { id: 'zona2', name: 'Zona 2 - Alimentación', activity: 0, lastDetection: null },
    { id: 'zona3', name: 'Zona 3 - Descanso', activity: 0, lastDetection: null },
    { id: 'zona4', name: 'Zona 4 - Bebederos', activity: 0, lastDetection: null },
  ]);

  // Generate activity history data
  useEffect(() => {
    const generateActivityData = () => {
      const now = new Date();
      const data = [];
      
      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 3600000); // Hours ago
        data.push({
          time: time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
          actividad: Math.floor(Math.random() * 60) + 20,
          detecciones: Math.floor(Math.random() * 15) + 5,
          picos: Math.floor(Math.random() * 8) + 2
        });
      }
      
      return data;
    };

    setActivityHistory(generateActivityData());
  }, []);

  // Update zones with random activity
  useEffect(() => {
    const interval = setInterval(() => {
      setDetectionZones(prev => prev.map(zone => ({
        ...zone,
        activity: Math.floor(Math.random() * 100),
        lastDetection: Math.random() > 0.7 ? new Date() : zone.lastDetection
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const timeSinceLastDetection = motionData.lastDetection 
    ? Math.floor((new Date().getTime() - motionData.lastDetection.getTime()) / 1000)
    : 0;

  const getActivityStatus = (activity: number) => {
    if (activity > 70) return { text: 'Alta', color: 'success' };
    if (activity > 40) return { text: 'Normal', color: 'info' };
    if (activity > 20) return { text: 'Baja', color: 'warning' };
    return { text: 'Muy Baja', color: 'error' };
  };

  const heatmapData = Array.from({ length: 8 }, (_, i) => 
    Array.from({ length: 10 }, (_, j) => ({
      x: j,
      y: i,
      intensity: Math.random() * 100
    }))
  ).flat();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Detección de Movimiento</h1>
          <p className="text-muted-foreground">Monitoreo de actividad y patrones de comportamiento</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Vista en Vivo
          </Button>
          <Badge variant="secondary" className="bg-success/10 text-success">
            <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></div>
            Detectando
          </Badge>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Actividad General"
          value={motionData.activity.toFixed(0)}
          unit="%"
          icon={Activity}
          status={getActivityStatus(motionData.activity).color as any}
          trend={{
            value: 5.2,
            label: 'última hora',
            type: 'positive'
          }}
        />

        <MetricCard
          title="Zonas Activas"
          value={motionData.activeZones}
          unit={`de 4`}
          icon={MapPin}
          status="info"
        />

        <MetricCard
          title="Última Detección"
          value={timeSinceLastDetection < 60 ? `${timeSinceLastDetection}s` : `${Math.floor(timeSinceLastDetection / 60)}m`}
          unit="atrás"
          icon={Clock}
          status={timeSinceLastDetection < 30 ? 'success' : timeSinceLastDetection < 300 ? 'warning' : 'error'}
        />

        <MetricCard
          title="Promedio por Hora"
          value="247"
          unit="detecciones"
          icon={Zap}
          status="info"
          trend={{
            value: 12.4,
            label: 'vs ayer',
            type: 'positive'
          }}
        />
      </div>

      {/* Activity Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Timeline */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Actividad por Hora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={activityHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
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
                <Area
                  type="monotone"
                  dataKey="actividad"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  name="Actividad (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detection Heatmap */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Mapa de Calor - Detecciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  domain={[0, 9]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  domain={[0, 7]}
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card p-2 border border-border rounded-lg">
                          <p>Intensidad: {data.intensity.toFixed(1)}%</p>
                          <p>Zona: ({data.x}, {data.y})</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter 
                  data={heatmapData} 
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detection Zones */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Zonas de Detección
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {detectionZones.map((zone) => {
              const status = getActivityStatus(zone.activity);
              const timeSince = zone.lastDetection 
                ? Math.floor((new Date().getTime() - zone.lastDetection.getTime()) / 1000)
                : null;

              return (
                <div key={zone.id} className="text-center space-y-4">
                  <CircularProgress
                    value={zone.activity}
                    max={100}
                    size="lg"
                    color={status.color === 'success' ? 'success' : 
                           status.color === 'warning' ? 'warning' : 
                           status.color === 'error' ? 'error' : 'primary'}
                    showLabel={true}
                    label=""
                    className="mx-auto"
                  />
                  
                  <div>
                    <h4 className="font-medium text-foreground">{zone.name}</h4>
                    <Badge 
                      variant="secondary" 
                      className={`mt-2 ${
                        status.color === 'success' ? 'bg-success/10 text-success' :
                        status.color === 'warning' ? 'bg-warning/10 text-warning' :
                        status.color === 'error' ? 'bg-destructive/10 text-destructive' :
                        'bg-primary/10 text-primary'
                      }`}
                    >
                      {status.text}
                    </Badge>
                    
                    {timeSince !== null && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Última detección: {timeSince < 60 ? `${timeSince}s` : `${Math.floor(timeSince / 60)}m`}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detection Timeline */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Historial de Detecciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={activityHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
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
              <Line
                type="monotone"
                dataKey="detecciones"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 3 }}
                name="Detecciones por Hora"
              />
              <Line
                type="monotone"
                dataKey="picos"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 3 }}
                name="Picos de Actividad"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}