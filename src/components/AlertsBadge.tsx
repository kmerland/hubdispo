// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from "react";
import { Bell, Brain, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface AlertsBadgeProps {
  onNavigate?: (view: string, params?: any) => void;
}

interface QuickAlert {
  id: string;
  type: "critical" | "warning" | "opportunity";
  title: string;
  message: string;
  timestamp: string;
  urgent: boolean;
}

export default function AlertsBadge({ onNavigate }: AlertsBadgeProps) {
  const [alerts, setAlerts] = useState<QuickAlert[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Simulation d'alertes en temps réel
  useEffect(() => {
    const mockAlerts: QuickAlert[] = [
      {
        id: "urgent_001",
        type: "critical",
        title: "Blocage douanier imminent",
        message: "Envoi BE-2024-789 risque un contrôle",
        timestamp: "Il y a 5 min",
        urgent: true
      },
      {
        id: "opp_001", 
        type: "opportunity",
        title: "Économie disponible",
        message: "Groupe vers l'Allemagne - €450 d'économie",
        timestamp: "Il y a 15 min",
        urgent: false
      },
      {
        id: "warn_001",
        type: "warning",
        title: "Document expiré",
        message: "Licence d'exportation expire dans 7 jours",
        timestamp: "Il y a 1h",
        urgent: true
      }
    ];

    setAlerts(mockAlerts);

    // Simulation de nouvelles alertes
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% de chance
        const newAlert: QuickAlert = {
          id: `alert_${Date.now()}`,
          type: Math.random() > 0.7 ? "critical" : Math.random() > 0.5 ? "warning" : "opportunity",
          title: "Nouvelle alerte IA",
          message: "L'IA a détecté un événement important",
          timestamp: "À l'instant",
          urgent: Math.random() > 0.6
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Max 10 alertes
      }
    }, 30000); // Vérifier toutes les 30 secondes

    return () => clearInterval(interval);
  }, []);

  const urgentCount = alerts.filter(alert => alert.urgent).length;
  const totalCount = alerts.length;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-3 w-3 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-3 w-3 text-amber-500" />;
      case "opportunity":
        return <Brain className="h-3 w-3 text-purple-500" />;
      default:
        return <Bell className="h-3 w-3 text-blue-500" />;
    }
  };

  const getAlertColor = (type: string, urgent: boolean) => {
    if (urgent) {
      return "border-l-red-500 bg-red-50";
    }
    switch (type) {
      case "critical":
        return "border-l-red-400 bg-red-50";
      case "warning":
        return "border-l-amber-400 bg-amber-50";
      case "opportunity":
        return "border-l-purple-400 bg-purple-50";
      default:
        return "border-l-blue-400 bg-blue-50";
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative hover:bg-gray-100"
        >
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-[#1E40AF]" />
            <span className="hidden sm:inline">Alertes IA</span>
          </div>
          
          {totalCount > 0 && (
            <>
              <Badge 
                className={`absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs ${
                  urgentCount > 0 
                    ? "bg-red-500 text-white animate-pulse" 
                    : "bg-blue-500 text-white"
                }`}
              >
                {totalCount > 9 ? "9+" : totalCount}
              </Badge>
              
              {urgentCount > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              )}
            </>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-[#1E40AF]" />
                <span>Alertes intelligentes</span>
                {urgentCount > 0 && (
                  <Badge className="bg-red-500 text-white">
                    {urgentCount} urgent{urgentCount > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  onNavigate?.("intelligent-alerts");
                }}
                className="text-[#1E40AF] hover:text-[#1E40AF] hover:bg-blue-50"
              >
                Voir tout
              </Button>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-0">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Brain className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Aucune alerte active</p>
                <p className="text-xs">L'IA surveille vos flux</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {alerts.slice(0, 5).map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 border-l-3 rounded-r-lg cursor-pointer hover:shadow-md transition-all ${getAlertColor(alert.type, alert.urgent)}`}
                    onClick={() => {
                      setIsOpen(false);
                      onNavigate?.("intelligent-alerts");
                    }}
                  >
                    <div className="flex items-start gap-2">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">{alert.title}</p>
                          {alert.urgent && (
                            <Badge className="bg-red-500 text-white text-xs">
                              URGENT
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{alert.message}</p>
                        <p className="text-xs text-gray-500">{alert.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {alerts.length > 5 && (
                  <div className="text-center pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate?.("intelligent-alerts");
                      }}
                      className="text-xs text-[#1E40AF] hover:text-[#1E40AF]"
                    >
                      Voir {alerts.length - 5} alertes de plus
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}