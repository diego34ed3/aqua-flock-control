import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { TrialModal } from "@/components/TrialModal";
import Index from "./pages/Index";
import Climatizacion from "./pages/Climatizacion";
import Abastecimiento from "./pages/Abastecimiento";
import Movimiento from "./pages/Movimiento";
import Dispositivos from "./pages/Dispositivos";
import Alertas from "./pages/Alertas";
import Reportes from "./pages/Reportes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="climatizacion" element={<Climatizacion />} />
            <Route path="abastecimiento" element={<Abastecimiento />} />
            <Route path="movimiento" element={<Movimiento />} />
            <Route path="dispositivos" element={<Dispositivos />} />
            <Route path="alertas" element={<Alertas />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <TrialModal />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
