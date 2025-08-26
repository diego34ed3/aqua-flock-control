import { useState } from "react";
import { Bell, Settings, User, Search, Menu, LogOut, UserCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [notifications] = useState([
    { id: 1, title: "Temperatura alta en Galpón 3", time: "Hace 5 min", type: "warning" },
    { id: 2, title: "Nivel de agua bajo", time: "Hace 12 min", type: "error" },
    { id: 3, title: "Sistema actualizado", time: "Hace 1 hora", type: "success" },
  ]);

  return (
    <nav className="h-16 bg-card border-b border-border flex items-center justify-between px-4">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>
        
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-destructive flex items-center justify-center">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Notificaciones</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-3 bg-muted/10 rounded-lg">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Settings */}
        <Button variant="ghost" size="sm">
          <Settings className="w-5 h-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Admin Demo</p>
                <p className="text-xs text-muted-foreground">demo@test.com</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="flex items-center gap-2">
              <UserCircle className="w-4 h-4" />
              Mi Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Mensajes
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 text-destructive">
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}