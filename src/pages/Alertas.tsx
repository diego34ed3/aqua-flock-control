import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Bell, 
  BellOff,
  CheckCircle,
  Clock,
  Filter,
  Settings,
  X
} from "lucide-react";

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  source: string;
}

export default function Alertas() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info' | 'unread'>('all');

  // Generate sample alerts
  useEffect(() => {
    const sampleAlerts: Alert[] = [
      {
        id: '1',
        type: 'critical',
        title: 'Nivel de agua crítico',
        description: 'El tanque principal tiene menos del 20% de capacidad',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        isRead: false,
        source: 'Sensor Agua - Tanque 1'
      },
      {
        id: '2',
        type: 'warning',
        title: 'Temperatura elevada',
        description: 'La temperatura en el Galpón 2 ha superado los 28°C',
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        isRead: false,
        source: 'Sensor Temperatura - Galpón 2'
      },
      {
        id: '3',
        type: 'warning',
        title: 'Sensor de luz desconectado',
        description: 'El sensor de luz 2 no responde desde hace 10 minutos',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        isRead: true,
        source: 'Sensor Luz - Galpón 3'
      },
      {
        id: '4',
        type: 'info',
        title: 'Mantenimiento programado',
        description: 'Recordatorio: mantenimiento de filtros de aire programado para mañana',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: true,
        source: 'Sistema de Mantenimiento'
      },
      {
        id: '5',
        type: 'critical',
        title: 'Pérdida de conectividad',
        description: 'Varios sensores han perdido la conexión. Verificar red.',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        isRead: false,
        source: 'Monitor de Red'
      }
    ];
    
    setAlerts(sampleAlerts);
  }, []);

  // Add new alerts periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: Math.random() > 0.8 ? 'critical' : Math.random() > 0.5 ? 'warning' : 'info',
          title: 'Nueva detección de anomalía',
          description: 'Se ha detectado una variación inusual en los parámetros del sistema',
          timestamp: new Date(),
          isRead: false,
          source: 'Sistema de Monitoreo'
        };
        
        setAlerts(prev => [newAlert, ...prev].slice(0, 20)); // Keep only last 20 alerts
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'info':
        return <CheckCircle className="w-5 h-5 text-primary" />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'info':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `Hace ${days} día${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    return 'Hace un momento';
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !alert.isRead;
    return alert.type === filter;
  });

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  };

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;
  const criticalCount = alerts.filter(alert => alert.type === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alertas y Notificaciones</h1>
          <p className="text-muted-foreground">
            Sistema de monitoreo y gestión de eventos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Marcar todo como leído
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              {unreadCount} sin leer
            </Badge>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Alertas</p>
                <p className="text-2xl font-bold">{alerts.length}</p>
              </div>
              <Bell className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sin Leer</p>
                <p className="text-2xl font-bold text-warning">{unreadCount}</p>
              </div>
              <BellOff className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Críticas</p>
                <p className="text-2xl font-bold text-destructive">{criticalCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Última Alerta</p>
                <p className="text-sm font-medium">
                  {alerts.length > 0 ? formatTimeAgo(alerts[0].timestamp) : 'N/A'}
                </p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'Todas', count: alerts.length },
              { key: 'unread', label: 'Sin leer', count: unreadCount },
              { key: 'critical', label: 'Críticas', count: alerts.filter(a => a.type === 'critical').length },
              { key: 'warning', label: 'Advertencias', count: alerts.filter(a => a.type === 'warning').length },
              { key: 'info', label: 'Información', count: alerts.filter(a => a.type === 'info').length }
            ].map(({ key, label, count }) => (
              <Button
                key={key}
                variant={filter === key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(key as any)}
                className="flex items-center gap-2"
              >
                {label}
                <Badge variant="secondary" className="text-xs">
                  {count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Lista de Alertas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No hay alertas que mostrar</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    alert.isRead 
                      ? 'bg-card-header border-border opacity-75' 
                      : `${getAlertColor(alert.type)} shadow-sm`
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-1">
                            {alert.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {alert.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{formatTimeAgo(alert.timestamp)}</span>
                            <span>•</span>
                            <span>{alert.source}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="secondary" 
                            className={
                              alert.type === 'critical' ? 'bg-destructive/10 text-destructive' :
                              alert.type === 'warning' ? 'bg-warning/10 text-warning' :
                              'bg-primary/10 text-primary'
                            }
                          >
                            {alert.type === 'critical' ? 'Crítica' :
                             alert.type === 'warning' ? 'Advertencia' : 'Info'}
                          </Badge>
                          
                          {!alert.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(alert.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dismissAlert(alert.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}