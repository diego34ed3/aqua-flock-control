import { 
  Thermometer, 
  Droplets, 
  Activity, 
  HardDrive, 
  AlertTriangle, 
  FileBarChart 
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Climatización",
    url: "/",
    icon: Thermometer,
    description: "Control de temperatura y aire"
  },
  {
    title: "Abastecimiento", 
    url: "/abastecimiento",
    icon: Droplets,
    description: "Agua y alimentación"
  },
  {
    title: "Movimiento",
    url: "/movimiento", 
    icon: Activity,
    description: "Detectores de actividad"
  },
  {
    title: "Dispositivos",
    url: "/dispositivos",
    icon: HardDrive,
    description: "Estado de sensores"
  },
  {
    title: "Alertas",
    url: "/alertas",
    icon: AlertTriangle,
    description: "Notificaciones del sistema"
  },
  {
    title: "Reportes",
    url: "/reportes",
    icon: FileBarChart,
    description: "Informes y descargas"
  }
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-primary/20 text-sidebar-primary border-r-2 border-sidebar-primary font-medium" 
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-sidebar">
        {/* Logo Section */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Thermometer className="w-4 h-4 text-white" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <h1 className="text-lg font-bold text-sidebar-primary">FarmControl</h1>
              <p className="text-xs text-sidebar-foreground/70">Sistema de Gestión</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium group-data-[collapsible=icon]:hidden">
            Secciones Principales
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-auto p-0">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${getNavClasses({ isActive })}`
                      }
                      >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                        <p className="font-medium truncate">{item.title}</p>
                        <p className="text-xs opacity-70 truncate">{item.description}</p>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Indicator */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-success animate-pulse-glow"></div>
            <div className="text-sm group-data-[collapsible=icon]:hidden">
              <p className="font-medium text-sidebar-foreground">Sistema Activo</p>
              <p className="text-xs text-sidebar-foreground/70">Todos los sensores operativos</p>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}