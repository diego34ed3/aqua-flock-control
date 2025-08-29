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

import logo from "@/assets/logo.png";

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Activity,
    description: "Flujo del sistema"
  },
  {
    title: "Climatización",
    url: "/climatizacion",
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
            <div className="w-8 h-[44px] rounded-lg overflow-hidden">
              <img src={logo} alt="FarmSmart Logo" className="w-full h-full object-contain" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <h1 className="text-lg font-bold text-sidebar-primary">FarmSmart</h1>
              <p className="text-xs text-sidebar-foreground/70">Tu Granja Inteligente</p>
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
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow"></div>
            <div className="text-xs group-data-[collapsible=icon]:hidden">
              <p className="font-xs text-primary">Version 0.7.3 beta</p>
           
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}