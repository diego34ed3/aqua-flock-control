import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
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
        <Layout>
          <Routes>
            <Route path="/" element={<Climatizacion />} />
            <Route path="/abastecimiento" element={<Abastecimiento />} />
            <Route path="/movimiento" element={<Movimiento />} />
            <Route path="/dispositivos" element={<Dispositivos />} />
            <Route path="/alertas" element={<Alertas />} />
            <Route path="/reportes" element={<Reportes />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
