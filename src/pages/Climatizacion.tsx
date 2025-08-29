import { useState } from "react";
import { MetricCard } from "@/components/MetricCard";
import { CircularProgress } from "@/components/CircularProgress";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  TrendingUp,
  TrendingDown,
  Minus
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
  Area
} from 'recharts';

export default function Climatizacion() {
  const { 
    currentTemp, 
    humidity, 
    airQuality, 
    lightSensors, 
    temperatureHistory, 
    airQualityHistory 
  } = useRealtimeData();

  const [selectedRoom, setSelectedRoom] = useState('all');

  // Calculate trends
  const getTrend = (current: number, previous: number) => {
    const diff = ((current - previous) / previous) * 100;
    if (Math.abs(diff) < 1) return { value: 0, type: 'neutral' as const };
    return { 
      value: Math.round(diff * 10) / 10, 
      type: diff > 0 ? 'positive' as const : 'negative' as const 
    };
  };

  const tempTrend = getTrend(currentTemp, 23.5);
  const humidityTrend = getTrend(humidity, 72);
  const airTrend = getTrend(airQuality, 82);

  const rooms = [
    { id: 'all', name: 'Todas las Habitaciones' },
    { id: 'galpon1', name: 'Galpón 1' },
    { id: 'galpon2', name: 'Galpón 2' },
    { id: 'galpon3', name: 'Galpón 3' },
    { id: 'incubadora', name: 'Incubadora' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Climatización</h1>
          <p className="text-muted-foreground">Control de temperatura, humedad y calidad del aire</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-success/10 text-success">
            <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse"></div>
            Actualizando cada 5 segundos
          </Badge>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Temperatura Actual"
          value={currentTemp.toFixed(1)}
          unit="°C"
          icon={Thermometer}
          status={currentTemp > 26 ? 'warning' : 'success'}
          trend={{
            value: tempTrend.value,
            label: 'última hora',
            type: tempTrend.type
          }}
        />

        <MetricCard
          title="Humedad"
          value={humidity.toFixed(0)}
          unit="%"
          icon={Droplets}
          status={humidity > 80 ? 'warning' : 'success'}
          trend={{
            value: humidityTrend.value,
            label: 'última hora',
            type: humidityTrend.type
          }}
        />

        <MetricCard
          title="Calidad del Aire"
          value={airQuality.toFixed(0)}
          unit="%"
          icon={Wind}
          status={airQuality < 70 ? 'error' : airQuality < 85 ? 'warning' : 'success'}
          trend={{
            value: airTrend.value,
            label: 'última hora',
            type: airTrend.type
          }}
        />

        <MetricCard
          title="Sensores Activos"
          value={lightSensors.filter(sensor => sensor.value > 0).length}
          unit={`de ${lightSensors.length}`}
          icon={Sun}
          status="info"
        />
      </div>

      {/* Air Quality Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-primary" />
              Calidad del Aire - Tiempo Real
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={airQualityHistory}>
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
                  // Limitar siempre a 2 decimales
                  formatter={(value: number | string, name: string) => {
                    const num = typeof value === 'number' ? value : parseFloat(value);
                    if (!isNaN(num)) return [num.toFixed(2), name];
                    return [value, name];
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="calidad"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  name="Calidad (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Light Sensors */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-primary" />
              Sensores de Luz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {lightSensors.map((sensor) => (
                <div key={sensor.id} className="text-center">
                  <CircularProgress
                    value={sensor.value}
                    max={sensor.max}
                    size="md"
                    color={sensor.value > sensor.max * 0.8 ? 'success' : 
                           sensor.value > sensor.max * 0.5 ? 'warning' : 'error'}
                    label={sensor.name}
                    className="mx-auto mb-2"
                  />
                  <p className="text-sm font-medium">{sensor.value.toFixed(0)} Lux</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Temperature History */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-primary" />
              Historial de Temperatura y Humedad
            </CardTitle>
            <div className="flex gap-2">
              {rooms.map((room) => (
                <Button
                  key={room.id}
                  variant={selectedRoom === room.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRoom(room.id)}
                >
                  {room.name}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={temperatureHistory}>
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
                formatter={(value: number | string, name: string) => {
                  const num = typeof value === 'number' ? value : parseFloat(value);
                  if (!isNaN(num)) {
                    // Añade las unidades basadas en el nombre de la serie
                    if (name?.toLowerCase().includes('temperatura')) return [num.toFixed(2) + ' °C', name];
                    if (name?.toLowerCase().includes('humedad')) return [num.toFixed(2) + ' %', name];
                    return [num.toFixed(2), name];
                  }
                  return [value, name];
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="temperatura"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                name="Temperatura (°C)"
              />
              <Line
                type="monotone"
                dataKey="humedad"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                name="Humedad (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}