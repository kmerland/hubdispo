// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ChevronRight, Home, Package, Map, Users, Zap, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";

interface SmartBreadcrumbProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
  params?: any;
}

const viewConfig = {
  homepage: { icon: Home, label: "Accueil", parent: null },
  dashboard: { icon: Home, label: "Dashboard", parent: null },
  shipments: { icon: Package, label: "Envois", parent: "dashboard" },
  "new-shipment": { icon: Package, label: "Nouvel envoi", parent: "shipments" },
  tracking: { icon: Package, label: "Suivi", parent: "shipments" },
  map: { icon: Map, label: "Carte", parent: "dashboard" },
  consolidation: { icon: Users, label: "Consolidation", parent: "dashboard" },
  "intelligent-alerts": { icon: Zap, label: "Alertes IA", parent: "dashboard" },
  faq: { icon: HelpCircle, label: "FAQ", parent: "dashboard" },
  help: { icon: HelpCircle, label: "Centre d'aide", parent: "dashboard" },
  notifications: { icon: Package, label: "Notifications", parent: "dashboard" },
  messages: { icon: Package, label: "Messages", parent: "dashboard" },
  profile: { icon: Package, label: "Profil", parent: "dashboard" },
  settings: { icon: Package, label: "Paramètres", parent: "dashboard" }
};

export default function SmartBreadcrumb({ currentView, onNavigate, params }: SmartBreadcrumbProps) {
  const generateBreadcrumb = (view: string): Array<{ view: string; label: string; icon: any }> => {
    const config = viewConfig[view as keyof typeof viewConfig];
    if (!config) return [];

    const breadcrumb = [{ view, label: config.label, icon: config.icon }];
    
    if (config.parent) {
      return [...generateBreadcrumb(config.parent), ...breadcrumb];
    }
    
    return breadcrumb;
  };

  const breadcrumbItems = generateBreadcrumb(currentView);

  if (breadcrumbItems.length <= 1) return null;

  return (
    <div className="bg-white border-b px-4 lg:px-6 py-2">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const IconComponent = item.icon;
            const isLast = index === breadcrumbItems.length - 1;
            
            return (
              <div key={item.view} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                )}
                
                {isLast ? (
                  <div className="flex items-center gap-2 text-[#1E40AF] font-medium">
                    <IconComponent className="h-4 w-4" />
                    <span>{item.label}</span>
                    {params?.shipmentId && (
                      <>
                        <span className="text-gray-400">•</span>
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {params.shipmentId}
                        </code>
                      </>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate(item.view)}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#1E40AF] px-2 py-1"
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}