// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, Info, X, Bell, Clock, Shield, FileX, Package, MessageCircle, Share2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";

interface ProactiveAlert {
  id: string;
  type: "warning" | "info" | "success" | "error";
  title: string;
  message: string;
  action?: string;
  priority: "high" | "medium" | "low";
  category: "customs" | "consolidation" | "general" | "regulatory";
  timestamp: string;
  dismissed?: boolean;
}

interface ProactiveAlertsProps {
  shipmentId?: string;
}

export default function ProactiveAlerts({ shipmentId }: ProactiveAlertsProps) {
  const [alerts, setAlerts] = useState<ProactiveAlert[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Simulate loading alerts based on context
    const mockAlerts: ProactiveAlert[] = [
      {
        id: "alert-1",
        type: "warning",
        title: "Règle d'origine manquante",
        message: "Pour bénéficier de l'accord UE-Canada, ajoutez un certificat d'origine à votre envoi vers le Canada.",
        action: "Ajouter certificat",
        priority: "high",
        category: "customs",
        timestamp: "Il y a 5 min"
      },
      {
        id: "alert-2", 
        type: "info",
        title: "Nouvelle consolidation disponible",
        message: "Un groupe vers l'Allemagne avec 45% d'économie est disponible. Départ demain 14h.",
        action: "Voir détails",
        priority: "medium",
        category: "consolidation",
        timestamp: "Il y a 15 min"
      },
      {
        id: "alert-3",
        type: "warning",
        title: "Documents expirés détectés",
        message: "Votre licence d'exportation expire dans 7 jours. Renouvelez-la pour éviter les blocages.",
        action: "Renouveler",
        priority: "high", 
        category: "regulatory",
        timestamp: "Il y a 1h"
      },
      {
        id: "alert-4",
        type: "success",
        title: "Pré-dédouanement approuvé",
        message: "Votre envoi BE-2024-456 a été pré-approuvé par les douanes belges.",
        priority: "low",
        category: "customs",
        timestamp: "Il y a 2h"
      },
      {
        id: "alert-5",
        type: "error",
        title: "Classification HS incorrecte",
        message: "Le code HS 8517.12.00 ne correspond pas à la description 'vêtements'. Vérifiez votre déclaration.",
        action: "Corriger",
        priority: "high",
        category: "customs", 
        timestamp: "Il y a 3h"
      }
    ];

    setAlerts(mockAlerts);
  }, [shipmentId]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "error": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "success": return <CheckCircle className="h-4 w-4 text-[#10B981]" />;
      case "info": return <Info className="h-4 w-4 text-[#1E40AF]" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500 bg-red-50";
      case "medium": return "border-l-amber-500 bg-amber-50"; 
      case "low": return "border-l-[#10B981] bg-green-50";
      default: return "border-l-gray-500 bg-gray-50";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "customs": return <Shield className="h-4 w-4" />;
      case "consolidation": return <Package className="h-4 w-4" />;
      case "regulatory": return <FileX className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);
  const displayedAlerts = showAll ? activeAlerts : activeAlerts.slice(0, 3);
  const highPriorityCount = activeAlerts.filter(alert => alert.priority === "high").length;

  if (activeAlerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-[#1E40AF]" />
          <h3 className="font-semibold">Alertes intelligentes</h3>
          {highPriorityCount > 0 && (
            <Badge className="bg-red-500 text-white text-xs">
              {highPriorityCount} urgent{highPriorityCount > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Voir moins" : `Voir tout (${activeAlerts.length})`}
        </Button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {displayedAlerts.map((alert) => (
          <Card key={alert.id} className={`border-l-4 ${getPriorityColor(alert.priority)}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {getCategoryIcon(alert.category)}
                          <span className="ml-1 capitalize">{alert.category}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.timestamp}
                        </span>
                        {alert.action && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-xs h-7"
                            onClick={() => {
                              // Simulation des actions selon le type d'alerte
                              if (alert.category === "customs") {
                                alert(`Navigation vers l'assistant douanier pour: ${alert.title}`);
                              } else if (alert.category === "consolidation") {
                                alert(`Navigation vers la consolidation pour: ${alert.title}`);
                              } else {
                                alert(`Action déclenchée: ${alert.action}`);
                              }
                            }}
                          >
                            {alert.action}
                          </Button>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => dismissAlert(alert.id)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary for dismissed alerts */}
      {alerts.filter(a => a.dismissed).length > 0 && (
        <div className="text-center">
          <Button variant="ghost" size="sm" className="text-xs text-gray-500">
            {alerts.filter(a => a.dismissed).length} alerte{alerts.filter(a => a.dismissed).length > 1 ? 's' : ''} ignorée{alerts.filter(a => a.dismissed).length > 1 ? 's' : ''}
          </Button>
        </div>
      )}
    </div>
  );
}