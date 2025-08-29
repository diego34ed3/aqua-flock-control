import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { 
  Thermometer, 
  Droplets, 
  Activity, 
  Settings, 
  AlertTriangle, 
  FileText,
  ArrowRight,
  Shield,
  BarChart3
} from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Thermometer,
      title: "Climatización",
      description: "Control inteligente de temperatura, humedad y ventilación en tiempo real",
      details: "Monitoreo automático con sensores IoT y ajustes precisos para condiciones óptimas de crecimiento",
      route: "/climatizacion",
      color: "text-primary"
    },
    {
      icon: Droplets,
      title: "Abastecimiento",
      description: "Gestión automatizada de agua y nutrientes para maximizar la eficiencia",
      details: "Sistema de riego inteligente con control de pH, EC y dosificación automática de fertilizantes",
      route: "/abastecimiento",
      color: "text-accent"
    },
    {
      icon: Activity,
      title: "Detección de Movimiento",
      description: "Monitoreo avanzado de actividad animal y seguridad perimetral",
      details: "Análisis de patrones de movimiento con sensores de ruido y detección de intrusiones",
      route: "/movimiento",
      color: "text-muted-foreground"
    },
    {
      icon: Settings,
      title: "Gestión de Dispositivos", 
      description: "Control centralizado de todos los equipos y sensores del sistema",
      details: "Configuración, mantenimiento y monitoreo del estado de la infraestructura IoT",
      route: "/dispositivos",
      color: "text-muted-foreground"
    },
    {
      icon: AlertTriangle,
      title: "Sistema de Alertas",
      description: "Notificaciones inteligentes para respuesta rápida ante eventos críticos",
      details: "Alertas personalizables por SMS, email y push con priorización automática",
      route: "/alertas", 
      color: "text-destructive"
    },
    {
      icon: FileText,
      title: "Reportes y Análisis",
      description: "Generación automática de informes detallados y análisis de tendencias",
      details: "Dashboard analítico con métricas de rendimiento y reportes personalizables en PDF",
      route: "/reportes",
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
     
          {/* Features Grid */}
      <section className="py-16">
        <div>
          <div className="text-center ">
          
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 hover:border-primary/20 group"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <IconComponent className={`h-8 w-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {feature.details}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                      onClick={() => navigate(feature.route)}
                    >
                      Explorar
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
     
      {/* Benefits Section */}
      <section className="py-16">
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Tecnología que Impulsa el Crecimiento
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nuestra plataforma conecta todos los aspectos de su operación agrícola
              en un ecosistema inteligente y eficiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Análisis Predictivo</h3>
              <p className="text-muted-foreground">
                Algoritmos avanzados que predicen necesidades y optimizan recursos automáticamente.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seguridad Integral</h3>
              <p className="text-muted-foreground">
                Protección completa con monitoreo 24/7 y respuesta automática ante amenazas.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-muted" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automatización Total</h3>
              <p className="text-muted-foreground">
                Control automatizado de todos los sistemas para máxima eficiencia operativa.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}