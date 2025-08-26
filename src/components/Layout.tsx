import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-card border-b border-border flex items-center px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="p-2 hover:bg-muted rounded-lg transition-colors" />
              <div className="h-6 w-px bg-border" />
              <h2 className="text-xl font-semibold text-foreground">Sistema de Control</h2>
            </div>
            
            <div className="ml-auto flex items-center gap-3">
              {/* Real-time indicator */}
              <div className="flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                En vivo
              </div>
              
              {/* Header actions */}
              <Button variant="ghost" size="sm" className="p-2">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}