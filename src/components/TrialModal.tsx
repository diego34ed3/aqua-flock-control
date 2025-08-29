import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Zap, X, Box } from "lucide-react";

export function TrialModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleUpgrade = () => {
    window.open("https://lovable.dev", "_blank");
  };

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 w-80 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="relative overflow-hidden rounded-lg border bg-background shadow-lg p-4 text-sm">
        <button
          aria-label="Cerrar"
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <Box className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-medium">
              Versión de Prueba
              {/* <Badge variant="outline" className="bg-primary/10 text-primary">DEMO</Badge> */}
            </div>
            <p className="text-muted-foreground leading-snug">
              Estás usando una versión de prueba para probar nuestro Sistema de Gestión Avícola.
            </p>
             <p className="text-purple-300 leading-snug animate-pulse">
              Para acceder a la versión completa y personalizada, contáctanos.
            </p>
            
            {/* <ul className="text-muted-foreground text-xs list-disc list-inside space-y-0.5">

              <li>Monitoreo del Clima y Abastecimiento.</li>
              <li>Detección de Activadad.</li>
              <li>Detección de Activadad.</li>
              <li>Sistema de Alertas.</li>
              <li>Creación de Reportes Automaticos.</li>
            </ul> */}
            <div className="flex gap-2 pt-1">
              <Button size="sm" onClick={handleUpgrade} className="flex-1">
                <ExternalLink className="w-3.5 h-3.5 mr-1" />
                Contactar
              </Button>
              <Button size="sm" variant="outline" onClick={() => setVisible(false)} className="flex-1">
                Ocultar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}