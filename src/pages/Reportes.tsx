import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileBarChart, 
  Download, 
  Calendar,
  FileText,
  TrendingUp,
  Database,
  Clock,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  size: string;
  lastGenerated: Date;
  status: 'ready' | 'generating' | 'error';
}

export default function Reportes() {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [reports] = useState<Report[]>([
    {
      id: '1',
      name: 'Reporte Diario - Climatización',
      description: 'Resumen completo de temperatura, humedad y calidad del aire',
      type: 'daily',
      size: '2.3 MB',
      lastGenerated: new Date(Date.now() - 3600000),
      status: 'ready'
    },
    {
      id: '2',
      name: 'Reporte Semanal - Abastecimiento',
      description: 'Análisis de consumo de agua y alimento durante la semana',
      type: 'weekly',
      size: '5.7 MB',
      lastGenerated: new Date(Date.now() - 86400000),
      status: 'ready'
    },
    {
      id: '3',
      name: 'Reporte Mensual - General',
      description: 'Informe completo de todos los sistemas y métricas',
      type: 'monthly',
      size: '12.4 MB',
      lastGenerated: new Date(Date.now() - 604800000),
      status: 'ready'
    },
    {
      id: '4',
      name: 'Reporte de Alertas',
      description: 'Historial de alertas y eventos del sistema',
      type: 'custom',
      size: '1.8 MB',
      lastGenerated: new Date(Date.now() - 1800000),
      status: 'generating'
    }
  ]);

  const handleDownload = (report: Report) => {
    if (report.status === 'ready') {
      toast({
        title: "Descarga iniciada",
        description: `Descargando ${report.name}...`,
      });
      
      // Simulate download
      setTimeout(() => {
        toast({
          title: "Descarga completada",
          description: `${report.name} se ha descargado exitosamente.`,
        });
      }, 2000);
    }
  };

  const generateCustomReport = () => {
    toast({
      title: "Generando reporte",
      description: "Tu reporte personalizado se está generando...",
    });
    
    setTimeout(() => {
      toast({
        title: "Reporte generado",
        description: "Tu reporte personalizado está listo para descargar.",
      });
    }, 5000);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'bg-success/10 text-success';
      case 'generating':
        return 'bg-warning/10 text-warning';
      case 'error':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready':
        return 'Listo';
      case 'generating':
        return 'Generando...';
      case 'error':
        return 'Error';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reportes y Descargas</h1>
          <p className="text-muted-foreground">
            Genera y descarga informes detallados del sistema
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Programar
          </Button>
          <Button onClick={generateCustomReport}>
            <FileText className="w-4 h-4 mr-2" />
            Reporte Personalizado
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reportes Disponibles</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === 'ready').length}</p>
              </div>
              <FileBarChart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tamaño Total</p>
                <p className="text-2xl font-bold">22.2 MB</p>
              </div>
              <Database className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Último Reporte</p>
                <p className="text-sm font-medium">Hace 1 hora</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Generando</p>
                <p className="text-2xl font-bold text-warning">{reports.filter(r => r.status === 'generating').length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Generate */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Generar Reporte Rápido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Period Selection */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Período</h4>
              <div className="space-y-2">
                {[
                  { key: 'today', label: 'Hoy' },
                  { key: 'week', label: 'Última semana' },
                  { key: 'month', label: 'Último mes' },
                  { key: 'quarter', label: 'Último trimestre' }
                ].map(({ key, label }) => (
                  <Button
                    key={key}
                    variant={selectedPeriod === key ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setSelectedPeriod(key)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Secciones a Incluir</h4>
              <div className="space-y-2">
                {[
                  'Climatización',
                  'Abastecimiento', 
                  'Movimiento',
                  'Dispositivos',
                  'Alertas'
                ].map((section) => (
                  <label key={section} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    {section}
                  </label>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Formato</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  {['PDF', 'Excel', 'CSV'].map((format) => (
                    <label key={format} className="flex items-center gap-2 text-sm">
                      <input type="radio" name="format" value={format} defaultChecked={format === 'PDF'} />
                      {format}
                    </label>
                  ))}
                </div>
                
                <Button onClick={generateCustomReport} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Generar Reporte
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileBarChart className="w-5 h-5 text-primary" />
            Reportes Disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 bg-card-header rounded-lg border border-border hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground">{report.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Tamaño: {report.size}</span>
                      <span>•</span>
                      <span>Generado: {formatTimeAgo(report.lastGenerated)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(report.status)}
                  >
                    {getStatusText(report.status)}
                  </Badge>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(report)}
                    disabled={report.status !== 'ready'}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Reportes Programados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Reporte Diario Automático</h4>
                <p className="text-sm text-muted-foreground">Se genera todos los días a las 6:00 AM</p>
              </div>
              <Badge className="bg-success/10 text-success">Activo</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Reporte Semanal</h4>
                <p className="text-sm text-muted-foreground">Se genera todos los lunes a las 8:00 AM</p>
              </div>
              <Badge className="bg-success/10 text-success">Activo</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">Reporte Mensual</h4>
                <p className="text-sm text-muted-foreground">Se genera el primer día de cada mes</p>
              </div>
              <Badge variant="outline">Pausado</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}