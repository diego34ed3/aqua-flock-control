import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Zap } from "lucide-react";

export function TrialModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show modal after 2 seconds
    const timer = setTimeout(() => {
      setOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleUpgrade = () => {
    // Redirect to full version landing page
    window.open("https://lovable.dev", "_blank");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <DialogTitle className="flex items-center gap-2">
              Versión de Prueba
              <Badge variant="outline" className="bg-primary/10 text-primary">
                DEMO
              </Badge>
            </DialogTitle>
          </div>
          <DialogDescription className="text-left space-y-3">
            <p>
              Estás usando la <strong>versión de demostración</strong> del Sistema de Gestión Avícola.
            </p>
            <p>
              Esta versión incluye la mayoría de funcionalidades para que puedas explorar 
              y evaluar el sistema completo.
            </p>
            <div className="bg-muted/30 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                ✨ Datos en tiempo real simulados<br/>
                📊 Reportes y gráficas completas<br/>
                🔔 Sistema de alertas<br/>
                📱 Interfaz completamente responsive
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 mt-4">
          <Button onClick={handleUpgrade} className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            Ver Versión Completa
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)} className="w-full">
            Continuar con Demo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}