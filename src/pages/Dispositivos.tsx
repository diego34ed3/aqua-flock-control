import { MetricCard } from "@/components/MetricCard";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  HardDrive, 
  Wifi, 
  WifiOff, 
  AlertTriangle,
  CheckCircle,
  Thermometer,
  Droplets,
  Sun,
  Activity,
  RefreshCw,
  Settings
} from "lucide-react";

export default function Dispositivos() {
  const { deviceStatus } = useRealtimeData();

  const statusCounts = {
    online: deviceStatus.filter(device => device.status === 'online').length,
    offline: deviceStatus.filter(device => device.status === 'offline').length,
    warning: deviceStatus.filter(device => device.status === 'warning').length,
    total: deviceStatus.length
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return <HardDrive className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-success/10 text-success';
      case 'offline':
        return 'bg-destructive/10 text-destructive';
      case 'warning':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return <Thermometer className="w-5 h-5 text-primary" />;
      case 'humidity':
        return <Droplets className="w-5 h-5 text-primary" />;
      case 'light':
        return <Sun className="w-5 h-5 text-primary" />;
      case 'motion':
        return <Activity className="w-5 h-5 text-primary" />;
      case 'water':
        return <Droplets className="w-5 h-5 text-primary" />;
      default:
        return <HardDrive className="w-5 h-5 text-primary" />;
    }
  };

  const uptime = ((statusCounts.online + statusCounts.warning) / statusCounts.total * 100);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dispositivos y Sensores</h1>
          <p className="text-muted-foreground">Estado y conectividad del sistema IoT</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
          <Badge variant="secondary" className="bg-success/10 text-success">
            <Wifi className="w-3 h-3 mr-2" />
            Red Estable
          </Badge>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Dispositivos Online"
          value={statusCounts.online}
          unit={`de ${statusCounts.total}`}
          icon={CheckCircle}
          status="success"
        />

        <MetricCard
          title="Dispositivos Offline"
          value={statusCounts.offline}
          unit={`de ${statusCounts.total}`}
          icon={WifiOff}
          status={statusCounts.offline > 0 ? 'error' : 'success'}
        />

        <MetricCard
          title="Con Advertencias"
          value={statusCounts.warning}
          unit={`de ${statusCounts.total}`}
          icon={AlertTriangle}
          status={statusCounts.warning > 0 ? 'warning' : 'success'}
        />

        <MetricCard
          title="Disponibilidad"
          value={uptime.toFixed(1)}
          unit="%"
          icon={Wifi}
          status={uptime > 95 ? 'success' : uptime > 80 ? 'warning' : 'error'}
        />
      </div>

      {/* Device List */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-primary" />
            Lista de Dispositivos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deviceStatus.map((device) => (
              <div 
                key={device.id} 
                className="flex items-center justify-between p-4 bg-card-header rounded-lg border border-border hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {getTypeIcon(device.type)}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground">{device.name}</h4>
                    <p className="text-sm text-muted-foreground">ID: {device.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Status indicator */}
                  <div className="flex items-center gap-2">
                    {getStatusIcon(device.status)}
                    <Badge 
                      variant="secondary" 
                      className={getStatusColor(device.status)}
                    >
                      {device.status === 'online' ? 'En línea' :
                       device.status === 'offline' ? 'Desconectado' :
                       'Advertencia'}
                    </Badge>
                  </div>

                  {/* Signal strength */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 4 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-3 rounded-sm ${
                          device.status === 'online' 
                            ? i < 3 ? 'bg-success' : 'bg-muted'
                            : device.status === 'warning'
                            ? i < 2 ? 'bg-warning' : 'bg-muted'
                            : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Last seen */}
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {device.status === 'online' ? 'Activo ahora' :
                       device.status === 'warning' ? 'Hace 5 min' :
                       'Hace 2 horas'}
                    </p>
                  </div>

                  {/* Actions */}
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-primary" />
              Estado de Red
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                  <span className="font-medium">WiFi Principal</span>
                </div>
                <Badge className="bg-success/10 text-success">Estable</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                  <span className="font-medium">WiFi Respaldo</span>
                </div>
                <Badge className="bg-success/10 text-success">Disponible</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-warning animate-pulse"></div>
                  <span className="font-medium">Red Celular</span>
                </div>
                <Badge className="bg-warning/10 text-warning">Débil</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Configuración del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Frecuencia de actualización</span>
                <Badge variant="outline">5 segundos</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Modo de ahorro de energía</span>
                <Badge variant="outline">Desactivado</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Alertas automáticas</span>
                <Badge className="bg-success/10 text-success">Activo</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Backup de datos</span>
                <Badge className="bg-success/10 text-success">Habilitado</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Última sincronización</span>
                <Badge variant="outline">Hace 2 min</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}