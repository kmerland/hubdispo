// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  Home, 
  Plus, 
  Package, 
  Truck, 
  Shield, 
  Map, 
  BarChart3, 
  Search,
  HelpCircle,
  Bell,
  MessageCircle,
  ArrowLeft
} from "lucide-react";

interface ActionBarProps {
  onNavigate: (view: string, params?: any) => void;
  currentView: string;
  showBackButton?: boolean;
  backTo?: string;
  customActions?: Array<{
    label: string;
    action: () => void;
    icon?: any;
    variant?: 'default' | 'outline' | 'ghost';
    primary?: boolean;
  }>;
}

export default function ActionBar({ 
  onNavigate, 
  currentView, 
  showBackButton = false, 
  backTo = "dashboard",
  customActions = []
}: ActionBarProps) {
  
  const quickActions = [
    { 
      id: 'dashboard', 
      label: 'Tableau de bord', 
      icon: Home, 
      condition: currentView !== 'dashboard' 
    },
    { 
      id: 'new-shipment', 
      label: 'Nouvel envoi', 
      icon: Plus, 
      condition: currentView !== 'new-shipment',
      primary: true
    },
    { 
      id: 'shipments', 
      label: 'Mes envois', 
      icon: Package, 
      condition: currentView !== 'shipments' 
    },
    { 
      id: 'consolidation', 
      label: 'Consolidation', 
      icon: Truck, 
      condition: currentView !== 'consolidation' 
    },
    { 
      id: 'customs', 
      label: 'Douane', 
      icon: Shield, 
      condition: currentView !== 'customs' 
    },
    { 
      id: 'map', 
      label: 'Carte', 
      icon: Map, 
      condition: currentView !== 'map' 
    },
    { 
      id: 'reports', 
      label: 'Rapports', 
      icon: BarChart3, 
      condition: currentView !== 'reports' 
    },
    { 
      id: 'search', 
      label: 'Recherche', 
      icon: Search, 
      condition: currentView !== 'search' 
    }
  ];

  const supportActions = [
    { 
      id: 'help', 
      label: 'Aide', 
      icon: HelpCircle, 
      condition: currentView !== 'help' 
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: Bell, 
      condition: currentView !== 'notifications' 
    },
    { 
      id: 'messages', 
      label: 'Messages', 
      icon: MessageCircle, 
      condition: currentView !== 'messages' 
    }
  ];

  const visibleActions = quickActions.filter(action => action.condition);
  const visibleSupport = supportActions.filter(action => action.condition);

  return (
    <Card className="mb-6 border-l-4 border-l-[#1E40AF]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Bouton retour */}
            {showBackButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate(backTo)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
            )}

            {/* Actions personnalisées */}
            {customActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                size="sm"
                onClick={action.action}
                className={`flex items-center gap-2 ${
                  action.primary ? 'bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-white' : ''
                }`}
              >
                {action.icon && <action.icon className="h-4 w-4" />}
                {action.label}
              </Button>
            ))}

            {/* Actions rapides principales */}
            {visibleActions.slice(0, 4).map(action => (
              <Button
                key={action.id}
                variant={action.primary ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (action.id === 'customs') {
                    onNavigate(action.id, { shipmentId: 'BE-2024-789' });
                  } else {
                    onNavigate(action.id);
                  }
                }}
                className={`flex items-center gap-2 ${
                  action.primary ? 'bg-[#1E40AF] hover:bg-[#1E40AF]/90' : ''
                }`}
              >
                <action.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{action.label}</span>
              </Button>
            ))}
          </div>

          {/* Actions de support */}
          <div className="flex items-center gap-2">
            {visibleSupport.map(action => (
              <Button
                key={action.id}
                variant="ghost"
                size="sm"
                onClick={() => onNavigate(action.id)}
                title={action.label}
                className="flex items-center gap-1"
              >
                <action.icon className="h-4 w-4" />
                <span className="hidden md:inline text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}