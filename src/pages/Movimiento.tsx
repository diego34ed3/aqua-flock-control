import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Zap, 
  AlertTriangle,
  TrendingUp,
  Volume2,
  Target,
  BarChart3,
  Eye,
  Egg
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

export default function Movimiento() {
  const [detectionData, setDetectionData] = useState([]);
  const [noiseData, setNoiseData] = useState([]);
  const [activityLevel, setActivityLevel] = useState(0);
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [currentZone, setCurrentZone] = useState('Galpón 1');
  const [isRecording, setIsRecording] = useState(true);

  // Generate realistic animal movement and noise data
  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const newMovementData = [];
      const newNoiseData = [];
      
      for (let i = 29; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        const timeStr = time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        
        // Realistic animal movement patterns (smaller variations)
        const baseMovement = 45 + Math.sin(i * 0.2) * 8; // Base activity around 45%
        const animalVariation = (Math.random() - 0.5) * 6; // Small realistic variations
        const movement = Math.max(25, Math.min(75, baseMovement + animalVariation));
        
        // Realistic noise levels in dB (chickens produce 60-90 dB)
        const baseNoise = 72 + Math.sin(i * 0.15) * 12; // Base around 72 dB
        const noiseVariation = (Math.random() - 0.5) * 8; // Small realistic noise variations
        const noise = Math.max(55, Math.min(95, baseNoise + noiseVariation));
        
        newMovementData.push({
          time: timeStr,
          galpon1: Math.round((movement + (Math.random() - 0.5) * 4) * 10) / 10,
          galpon2: Math.round((movement * 0.9 + (Math.random() - 0.5) * 4) * 10) / 10,
          galpon3: Math.round((movement * 1.1 + (Math.random() - 0.5) * 4) * 10) / 10,
          promedio: Math.round(movement * 10) / 10,
        });

        newNoiseData.push({
          time: timeStr,
          galpon1: Math.round((noise + (Math.random() - 0.5) * 3) * 10) / 10,
          galpon2: Math.round((noise + (Math.random() - 0.5) * 3) * 10) / 10,
          galpon3: Math.round((noise + (Math.random() - 0.5) * 3) * 10) / 10,
          promedio: Math.round(noise * 10) / 10,
        });
      }
      
      setDetectionData(newMovementData);
      setNoiseData(newNoiseData);
      setActivityLevel(Math.round(newMovementData[newMovementData.length - 1]?.promedio || 0));
      setNoiseLevel(Math.round(newNoiseData[newNoiseData.length - 1]?.promedio || 0));
    };

    generateData();
    const interval = setInterval(generateData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Detección de Actividad Animal</h1>
          <p className="text-muted-foreground">
            Monitoreo en tiempo real de movimiento y ruido de las aves
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isRecording ? "default" : "secondary"} className="flex items-center gap-1">
            <Egg className="w-3 h-3" />
            {isRecording ? 'Monitoreando' : 'Pausado'}
          </Badge>
          <Button 
            variant="outline" 
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? 'Pausar' : 'Iniciar'}
          </Button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Actividad Promedio</p>
                <p className="text-2xl font-bold">{activityLevel}%</p>
              </div>
              <Egg className="w-8 h-8 text-primary animate-hop" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Nivel de Ruido</p>
                <p className="text-2xl font-bold">{noiseLevel} dB</p>
              </div>
              <Volume2 className="w-8 h-8 text-secondary animate-scale-pulse" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Zona Más Activa</p>
                <p className="text-xl font-bold">{currentZone}</p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estado General</p>
                <p className="text-sm font-medium text-success">Normal</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Animal Movement Chart */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Egg className="w-5 h-5 text-primary" />
              Actividad Animal por Galpón
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={detectionData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  domain={[20, 80]}
                  label={{ value: '% Actividad', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  // Limitar siempre a 2 decimales
                  formatter={(value: number | string, name: string) => {
                    const num = typeof value === 'number' ? value : parseFloat(value);
                    if (!isNaN(num)) {
                      return [num.toFixed(2) + ' %', name];
                    }
                    return [value, name];
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="galpon1" 
                  stackId="1"
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary) / 0.2)"
                  name="Galpón 1"
                />
                <Area 
                  type="monotone" 
                  dataKey="galpon2" 
                  stackId="2"
                  // Updated to a lighter gray for better contrast
                  stroke="#9CA3AF" 
                  fill="#9CA3AF33"
                  name="Galpón 2"
                />
                <Area 
                  type="monotone" 
                  dataKey="galpon3" 
                  stackId="3"
                  stroke="hsl(var(--accent))" 
                  fill="hsl(var(--accent) / 0.2)"
                  name="Galpón 3"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Noise Level Chart */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-secondary animate-scale-pulse" />
              Niveles de Ruido (dB)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={noiseData.slice(-10)}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  domain={[50, 100]}
                  label={{ value: 'dB', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  // Limitar siempre a 2 decimales
                  formatter={(value: number | string, name: string) => {
                    const num = typeof value === 'number' ? value : parseFloat(value);
                    if (!isNaN(num)) {
                      return [num.toFixed(2) + ' dB', name];
                    }
                    return [value, name];
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="galpon1" 
                  fill="hsl(var(--primary) / 0.7)"
                  name="Galpón 1"
                />
                <Bar 
                  dataKey="galpon2" 
                  // Updated to a lighter gray for better contrast
                  fill="#9CA3AF"
                  name="Galpón 2"
                />
                <Bar 
                  dataKey="galpon3" 
                  fill="hsl(var(--accent) / 0.7)"
                  name="Galpón 3"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detection Zones Status */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Estado de Zonas de Detección
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Galpón 1', 'Galpón 2', 'Galpón 3'].map((galpon, index) => {
              const movement = detectionData[detectionData.length - 1]?.[`galpon${index + 1}`] || 0;
              const noise = noiseData[noiseData.length - 1]?.[`galpon${index + 1}`] || 0;
              
              return (
                <div key={galpon} className="p-4 bg-card-header rounded-lg border border-border">
                  <h4 className="font-medium text-foreground mb-3">{galpon}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Actividad:</span>
                      <span className="text-sm font-medium">{movement}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Ruido:</span>
                      <span className="text-sm font-medium">{noise} dB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Estado:</span>
                      <Badge 
                        variant="secondary" 
                        className={movement > 60 ? "bg-success/10 text-success" : 
                                  movement > 30 ? "bg-warning/10 text-warning" : 
                                  "bg-muted/10 text-muted-foreground"}
                      >
                        {movement > 60 ? 'Alta' : movement > 30 ? 'Normal' : 'Baja'}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}