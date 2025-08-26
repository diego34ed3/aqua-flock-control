import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileBarChart, 
  Download, 
  FileText,
  TrendingUp,
  Database,
  Clock,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generatePDF, generateReportContent, viewPDF } from "@/utils/pdfGenerator";

interface Report {
  id: string;
  name: string;
  description: string;
  section: 'climatizacion' | 'abastecimiento' | 'movimiento' | 'dispositivos' | 'alertas' | 'general';
  lastGenerated: Date;
}

export default function Reportes() {
  const { toast } = useToast();
  const [reports] = useState<Report[]>([
    {
      id: '1',
      name: 'Reporte de Climatización',
      description: 'Temperatura, humedad y calidad del aire',
      section: 'climatizacion',
      lastGenerated: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      name: 'Reporte de Abastecimiento',
      description: 'Consumo de agua y alimento',
      section: 'abastecimiento',
      lastGenerated: new Date(Date.now() - 86400000),
    },
    {
      id: '3',
      name: 'Reporte de Actividad Animal',
      description: 'Movimiento y ruido de las aves',
      section: 'movimiento',
      lastGenerated: new Date(Date.now() - 7200000),
    },
    {
      id: '4',
      name: 'Reporte de Dispositivos',
      description: 'Estado y funcionamiento de sensores',
      section: 'dispositivos',
      lastGenerated: new Date(Date.now() - 10800000),
    },
    {
      id: '5',
      name: 'Reporte de Alertas',
      description: 'Historial de alertas y eventos',
      section: 'alertas',
      lastGenerated: new Date(Date.now() - 1800000),
    },
    {
      id: '6',
      name: 'Reporte General',
      description: 'Resumen completo del sistema',
      section: 'general',
      lastGenerated: new Date(Date.now() - 14400000),
    }
  ]);

  const handleDownload = async (report: Report) => {
    try {
      toast({
        title: "Generando PDF",
        description: `Preparando ${report.name}...`,
      });

      const content = generateReportContent(report.section);
      await generatePDF(content, `${report.name.replace(/\s+/g, '_')}.pdf`);
      
      toast({
        title: "PDF Generado",
        description: `${report.name} se ha descargado exitosamente.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo generar el PDF. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleViewReport = async (report: Report) => {
    try {
      toast({
        title: "Abriendo PDF",
        description: `Preparando vista previa de ${report.name}...`,
      });

      const content = generateReportContent(report.section);
      await viewPDF(content, `${report.name.replace(/\s+/g, '_')}.pdf`);
      
      toast({
        title: "PDF Abierto",
        description: `${report.name} se ha abierto en una nueva ventana.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo abrir el PDF. Inténtalo de nuevo.",
        variant: "destructive",
      });
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
        <Button onClick={() => handleDownload(reports[5])}>
          <Download className="w-4 h-4 mr-2" />
          Descargar Reporte General
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reportes Disponibles</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
              <FileBarChart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Formato</p>
                <p className="text-2xl font-bold">PDF</p>
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
                <p className="text-sm font-medium">Hace 30 min</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Secciones</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>


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
                      <span>Formato: PDF</span>
                      <span>•</span>
                      <span>Actualizado: {formatTimeAgo(report.lastGenerated)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    PDF Listo
                  </Badge>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewReport(report)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDownload(report)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}