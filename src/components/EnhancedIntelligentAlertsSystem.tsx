// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from "react";
import { 
  Bell, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Euro,
  Truck,
  MapPin,
  Package,
  Users,
  Zap,
  Eye,
  X,
  Settings,
  Filter,
  Calendar,
  Target,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { useToast } from "./ToastProvider";

interface IntelligentAlertsProps {
  onNavigate: (view: string, params?: any) => void;
}

// Types d'alertes
type AlertType = "opportunity" | "cost_optimization" | "delay" | "customs" | "consolidation" | "route_optimization" | "market_trend" | "capacity";
type AlertPriority = "low" | "medium" | "high" | "critical";
type AlertStatus = "new" | "viewed" | "acted" | "dismissed";

interface Alert {
  id: string;
  type: AlertType;
  priority: AlertPriority;
  status: AlertStatus;
  title: string;
  message: string;
  details: string;
  timestamp: Date;
  actionable: boolean;
  estimatedImpact?: string;
  relatedShipment?: string;
  suggestedAction?: string;
  data?: any;
}

// Données d'alertes réalistes
const mockAlerts: Alert[] = [
  {
    id: "ALT-001",
    type: "opportunity",
    priority: "high",
    status: "new",
    title: "Opportunité de consolidation détectée",
    message: "Économisez €125 en joignant le groupe vers Lyon",
    details: "Un groupe de consolidation vers Lyon part demain avec 3 places libres. Votre envoi BE-2024-015 peut être inclus avec une économie de €125 (47% de réduction).",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    actionable: true,
    estimatedImpact: "€125 d'économie",
    relatedShipment: "BE-2024-015",
    suggestedAction: "Rejoindre le groupe CON-FR-008",
    data: { groupId: "CON-FR-008", savings: 125, originalCost: 265, newCost: 140 }
  },
  {
    id: "ALT-002",
    type: "cost_optimization",
    priority: "medium",
    status: "new",
    title: "Route alternative plus économique",
    message: "Économisez €45 avec la route Anvers-Berlin",
    details: "Notre IA a identifié une route alternative pour vos envois vers l'Allemagne. En passant par Anvers au lieu de Bruxelles, vous économisez €45 par envoi.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    actionable: true,
    estimatedImpact: "€45/envoi",
    suggestedAction: "Changer de hub de départ",
    data: { alternativeRoute: "ANR-BER", savings: 45 }
  },
  {
    id: "ALT-003",
    type: "delay",
    priority: "high",
    status: "viewed",
    title: "Retard possible détecté",
    message: "Envoi BE-2024-012 risque un retard de 2 jours",
    details: "Des grèves sont prévues en France cette semaine. Votre envoi vers Paris risque un retard de 48h. Nous suggérons de reporter ou changer de route.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    actionable: true,
    relatedShipment: "BE-2024-012",
    suggestedAction: "Reporter l'envoi ou changer de route",
    data: { delayRisk: "48h", affectedShipments: ["BE-2024-012", "BE-2024-014"] }
  },
  {
    id: "ALT-004",
    type: "customs",
    priority: "critical",
    status: "new",
    title: "Documents douaniers requis",
    message: "Action requise pour BE-2024-009",
    details: "Les autorités douanières italiennes requièrent des documents additionnels pour votre envoi de produits électroniques. Date limite : demain 16h.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    actionable: true,
    relatedShipment: "BE-2024-009",
    suggestedAction: "Fournir les documents CE",
    data: { deadline: "2024-10-03T16:00:00", requiredDocs: ["CE Certificate", "Product Manual"] }
  },
  {
    id: "ALT-005",
    type: "consolidation",
    priority: "medium",
    status: "new",
    title: "Nouveau groupe disponible",
    message: "Groupe Amsterdam avec départ ce weekend",
    details: "Un nouveau groupe de consolidation vers Amsterdam vient d'ouvrir avec un départ prévu samedi. 6 places disponibles, économie estimée de €75.",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    actionable: true,
    estimatedImpact: "€75 d'économie",
    suggestedAction: "Rejoindre le groupe CON-NL-012",
    data: { groupId: "CON-NL-012", departure: "2024-10-05", savings: 75 }
  },
  {
    id: "ALT-006",
    type: "market_trend",
    priority: "low",
    status: "new",
    title: "Baisse des prix vers l'Allemagne",
    message: "Les coûts de transport ont baissé de 12%",
    details: "Les prix du transport vers l'Allemagne ont baissé de 12% cette semaine grâce à une meilleure capacité disponible. Bon moment pour planifier vos envois.",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    actionable: false,
    estimatedImpact: "-12% sur les coûts",
    data: { priceReduction: 12, validUntil: "2024-10-10" }
  },
  {
    id: "ALT-007",
    type: "route_optimization",
    priority: "medium",
    status: "acted",
    title: "Optimisation de route réussie",
    message: "€230 économisés sur vos 5 derniers envois",
    details: "Notre algorithme d'optimisation a permis d'économiser €230 sur vos 5 derniers envois en optimisant les routes et horaires.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    actionable: false,
    estimatedImpact: "€230 économisés",
    data: { totalSavings: 230, optimizedShipments: 5 }
  },
  {
    id: "ALT-008",
    type: "capacity",
    priority: "low",
    status: "new",
    title: "Capacité élevée détectée",
    message: "Créez un groupe vers Madrid",
    details: "Nous détectons une forte demande pour Madrid cette semaine. C'est le moment idéal pour créer un groupe de consolidation.",
    timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000),
    actionable: true,
    suggestedAction: "Créer un groupe vers Madrid",
    data: { destination: "Madrid", demand: "high", potentialParticipants: 8 }
  }
];

const alertTypeConfig = {
  opportunity: { icon: TrendingUp, color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
  cost_optimization: { icon: Euro, color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  delay: { icon: Clock, color: "text-yellow-600", bgColor: "bg-yellow-50", borderColor: "border-yellow-200" },
  customs: { icon: AlertTriangle, color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
  consolidation: { icon: Users, color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  route_optimization: { icon: MapPin, color: "text-indigo-600", bgColor: "bg-indigo-50", borderColor: "border-indigo-200" },
  market_trend: { icon: BarChart3, color: "text-gray-600", bgColor: "bg-gray-50", borderColor: "border-gray-200" },
  capacity: { icon: Target, color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" }
};

const priorityConfig = {
  low: { color: "text-gray-600", bgColor: "bg-gray-100" },
  medium: { color: "text-yellow-700", bgColor: "bg-yellow-100" },
  high: { color: "text-orange-700", bgColor: "bg-orange-100" },
  critical: { color: "text-red-700", bgColor: "bg-red-100" }
};

export default function EnhancedIntelligentAlertsSystem({ onNavigate }: IntelligentAlertsProps) {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showSettings, setShowSettings] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);
  const { showToast } = useToast();

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = selectedFilter === "all" || alert.status === selectedFilter;
    const matchesType = selectedType === "all" || alert.type === selectedType;
    return matchesFilter && matchesType;
  });

  const alertCounts = {
    new: alerts.filter(a => a.status === "new").length,
    high: alerts.filter(a => a.priority === "high" || a.priority === "critical").length,
    actionable: alerts.filter(a => a.actionable && a.status !== "acted" && a.status !== "dismissed").length
  };

  const markAsViewed = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId && alert.status === "new" 
        ? { ...alert, status: "viewed" as AlertStatus }
        : alert
    ));
  };

  const markAsActed = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: "acted" as AlertStatus } : alert
    ));
    showToast({
      type: 'success',
      message: 'Action marquée comme effectuée',
      duration: 3000
    });
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: "dismissed" as AlertStatus } : alert
    ));
    showToast({
      type: 'info',
      message: 'Alerte masquée',
      duration: 2000
    });
  };

  const handleAlertAction = (alert: Alert) => {
    switch (alert.type) {
      case "opportunity":
      case "consolidation":
        onNavigate("consolidation", { groupId: alert.data?.groupId });
        break;
      case "customs":
        onNavigate("customs", { shipmentId: alert.relatedShipment });
        break;
      case "delay":
        onNavigate("tracking", { shipmentId: alert.relatedShipment });
        break;
      default:
        markAsActed(alert.id);
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `Il y a ${hours}h${minutes > 0 ? ` ${minutes}min` : ''}`;
    }
    return `Il y a ${minutes} minutes`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Zap className="h-8 w-8 text-[#1E40AF]" />
              Alertes Intelligentes
            </h1>
            <p className="text-gray-600 mt-1">
              Notre IA surveille vos envois et identifie les opportunités d'optimisation
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
            <Button onClick={() => onNavigate("new-shipment")} className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
              <Package className="h-4 w-4 mr-2" />
              Nouvel envoi
            </Button>
          </div>
        </div>

        {/* Métriques des alertes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nouvelles alertes</CardTitle>
              <Bell className="h-4 w-4 text-[#1E40AF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alertCounts.new}</div>
              <p className="text-xs text-gray-600">Non lues</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Priorité élevée</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{alertCounts.high}</div>
              <p className="text-xs text-gray-600">Nécessitent attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actions possibles</CardTitle>
              <Target className="h-4 w-4 text-[#10B981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#10B981]">{alertCounts.actionable}</div>
              <p className="text-xs text-gray-600">Opportunités</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">IA Active</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${aiEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-medium">{aiEnabled ? 'Actif' : 'Inactif'}</span>
              </div>
              <p className="text-xs text-gray-600">Surveillance 24/7</p>
            </CardContent>
          </Card>
        </div>

        {/* Paramètres IA (collapsible) */}
        {showSettings && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Paramètres des alertes IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Notifications</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Opportunités de consolidation</span>
                      <Switch checked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Optimisations de coûts</span>
                      <Switch checked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Alertes de retard</span>
                      <Switch checked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Seuils d'économie</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Minimum pour alerte</span>
                      <span className="text-sm font-medium">€50</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Priorité élevée</span>
                      <span className="text-sm font-medium">€100</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Fréquence</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Analyse IA</span>
                      <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Emails quotidiens</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">Toutes les alertes</TabsTrigger>
              <TabsTrigger value="actionable">Actionables ({alertCounts.actionable})</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunités</TabsTrigger>
              <TabsTrigger value="issues">Problèmes</TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="new">Nouvelles</SelectItem>
                  <SelectItem value="viewed">Vues</SelectItem>
                  <SelectItem value="acted">Traitées</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="opportunity">Opportunités</SelectItem>
                  <SelectItem value="customs">Douanes</SelectItem>
                  <SelectItem value="delay">Retards</SelectItem>
                  <SelectItem value="consolidation">Consolidation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            {filteredAlerts.map((alert) => {
              const config = alertTypeConfig[alert.type];
              const priorityStyle = priorityConfig[alert.priority];
              const IconComponent = config.icon;

              return (
                <Card key={alert.id} className={`${config.borderColor} border-l-4 ${alert.status === 'new' ? 'shadow-md' : ''} hover:shadow-lg transition-shadow`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${config.bgColor}`}>
                          <IconComponent className={`h-5 w-5 ${config.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg">{alert.title}</CardTitle>
                            <Badge className={`${priorityStyle.bgColor} ${priorityStyle.color} text-xs`}>
                              {alert.priority.toUpperCase()}
                            </Badge>
                            {alert.status === 'new' && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                NOUVEAU
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-base font-medium text-gray-900">
                            {alert.message}
                          </CardDescription>
                          {alert.estimatedImpact && (
                            <Badge className="mt-2 bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20">
                              Impact: {alert.estimatedImpact}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{getTimeAgo(alert.timestamp)}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => dismissAlert(alert.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-gray-700 mb-4">{alert.details}</p>
                    
                    {alert.relatedShipment && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Envoi concerné:</span>
                          <code className="text-sm bg-white px-2 py-1 rounded border">
                            {alert.relatedShipment}
                          </code>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {alert.actionable && alert.status !== 'acted' && alert.status !== 'dismissed' && (
                          <Button 
                            onClick={() => handleAlertAction(alert)}
                            className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {alert.suggestedAction || 'Agir'}
                          </Button>
                        )}
                        
                        {alert.relatedShipment && (
                          <Button 
                            variant="outline"
                            onClick={() => {
                              onNavigate("tracking", { shipmentId: alert.relatedShipment });
                              markAsViewed(alert.id);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Voir l'envoi
                          </Button>
                        )}

                        {alert.status === 'new' && (
                          <Button 
                            variant="outline"
                            onClick={() => markAsViewed(alert.id)}
                          >
                            Marquer comme lu
                          </Button>
                        )}
                      </div>

                      {alert.status === 'acted' && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Traité
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="actionable" className="space-y-4">
            {filteredAlerts.filter(alert => alert.actionable && alert.status !== 'acted' && alert.status !== 'dismissed').map((alert) => {
              const config = alertTypeConfig[alert.type];
              const IconComponent = config.icon;

              return (
                <Card key={alert.id} className={`${config.borderColor} border-l-4 shadow-md hover:shadow-lg transition-shadow`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${config.bgColor}`}>
                        <IconComponent className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle>{alert.title}</CardTitle>
                        <CardDescription className="font-medium text-gray-900">
                          {alert.message}
                        </CardDescription>
                        {alert.estimatedImpact && (
                          <Badge className="mt-2 bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20">
                            {alert.estimatedImpact}
                          </Badge>
                        )}
                      </div>
                      <Button 
                        onClick={() => handleAlertAction(alert)}
                        className="bg-[#10B981] hover:bg-[#10B981]/90"
                      >
                        Agir maintenant
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-4">
            {filteredAlerts.filter(alert => alert.type === 'opportunity' || alert.type === 'consolidation' || alert.type === 'cost_optimization').map((alert) => {
              const config = alertTypeConfig[alert.type];
              const IconComponent = config.icon;

              return (
                <Card key={alert.id} className="border-l-4 border-green-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-50">
                          <IconComponent className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-green-900">{alert.title}</CardTitle>
                          <CardDescription className="font-medium text-green-800">
                            {alert.message}
                          </CardDescription>
                        </div>
                      </div>
                      {alert.estimatedImpact && (
                        <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                          {alert.estimatedImpact}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{alert.details}</p>
                    {alert.actionable && (
                      <Button 
                        onClick={() => handleAlertAction(alert)}
                        className="bg-[#10B981] hover:bg-[#10B981]/90"
                      >
                        Saisir l'opportunité
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            {filteredAlerts.filter(alert => alert.type === 'delay' || alert.type === 'customs' || alert.priority === 'high' || alert.priority === 'critical').map((alert) => {
              const config = alertTypeConfig[alert.type];
              const IconComponent = config.icon;

              return (
                <Card key={alert.id} className="border-l-4 border-red-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-50">
                          <IconComponent className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <CardTitle className="text-red-900">{alert.title}</CardTitle>
                          <CardDescription className="font-medium text-red-800">
                            {alert.message}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={`${priorityConfig[alert.priority].bgColor} ${priorityConfig[alert.priority].color}`}>
                        {alert.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{alert.details}</p>
                    {alert.actionable && (
                      <Button 
                        onClick={() => handleAlertAction(alert)}
                        variant="destructive"
                      >
                        Résoudre le problème
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}