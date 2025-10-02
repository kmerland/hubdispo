// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { 
  AlertTriangle, Search, Filter, Clock, CheckCircle, XCircle, 
  TrendingUp, Euro, Package, MapPin, Brain, Zap, Target,
  Bell, Eye, MoreHorizontal, ArrowRight, Calendar, Users,
  Truck, Globe, FileText, Settings, RefreshCw
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { useToast } from "./ToastProvider";
import { mockAlerts, mockShipments } from "./data/mockData";

interface IntelligentAlertsCenterProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function IntelligentAlertsCenter({ onNavigate }: IntelligentAlertsCenterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  const { showToast } = useToast();

  // Filtrer les alertes
  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || alert.type === typeFilter;
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter;
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter;
    const matchesTab = 
      selectedTab === "all" ? true :
      selectedTab === "critical" ? alert.severity === "critical" :
      selectedTab === "opportunities" ? alert.type === "cost_saving" || alert.type === "consolidation_opportunity" :
      selectedTab === "customs" ? alert.type === "customs" || alert.type === "document_missing" :
      selectedTab === "delays" ? alert.type === "delay" || alert.type === "route_optimization" :
      true;
    
    return matchesSearch && matchesType && matchesSeverity && matchesStatus && matchesTab;
  });

  const handleResolveAlert = (alertId: string) => {
    const alert = mockAlerts.find(a => a.id === alertId);
    if (alert) {
      showToast({
        type: 'success',
        message: `Alerte "${alert.title}" marquée comme résolue`,
        duration: 3000
      });
    }
  };

  const handleDismissAlert = (alertId: string) => {
    const alert = mockAlerts.find(a => a.id === alertId);
    if (alert) {
      showToast({
        type: 'info',
        message: `Alerte "${alert.title}" ignorée`,
        duration: 3000
      });
    }
  };

  const handleTakeAction = (alert: any) => {
    let actionMessage = '';
    
    switch (alert.type) {
      case 'customs':
        onNavigate('customs', { shipmentId: alert.shipmentId });
        actionMessage = 'Redirection vers l\'assistant douanier...';
        break;
      case 'consolidation_opportunity':
        onNavigate('consolidation', { consolidationId: alert.consolidationId });
        actionMessage = 'Ouverture du centre de consolidation...';
        break;
      case 'route_optimization':
        onNavigate('map', { shipmentId: alert.shipmentId });
        actionMessage = 'Affichage des routes optimisées...';
        break;
      case 'document_missing':
        onNavigate('shipments', { shipmentId: alert.shipmentId });
        actionMessage = 'Accès aux documents de l\'envoi...';
        break;
      case 'cost_saving':
        actionMessage = 'Économies appliquées automatiquement !';
        break;
      case 'delay':
        onNavigate('shipments', { shipmentId: alert.shipmentId });
        actionMessage = 'Suivi détaillé de l\'envoi...';
        break;
      default:
        onNavigate('shipments', { shipmentId: alert.shipmentId });
        actionMessage = 'Redirection vers vos envois...';
    }
    
    showToast({
      type: 'info',
      message: actionMessage,
      duration: 2000
    });
  };

  const getActionButtonText = (alert: any) => {
    switch (alert.type) {
      case 'document_missing':
        return 'Compléter documents';
      case 'consolidation_opportunity':
        return 'Rejoindre consolidation';
      case 'customs':
        return 'Résoudre douanes';
      case 'cost_saving':
        return 'Activer économies';
      case 'delay':
        return 'Voir alternatives';
      case 'route_optimization':
        return 'Optimiser route';
      default:
        return 'Traiter';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "warning": return "bg-orange-100 text-orange-800 border-orange-200";
      case "info": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case "info": return <Bell className="h-4 w-4 text-blue-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "customs": return <Globe className="h-4 w-4" />;
      case "delay": return <Clock className="h-4 w-4" />;
      case "route_optimization": return <MapPin className="h-4 w-4" />;
      case "cost_saving": return <Euro className="h-4 w-4" />;
      case "document_missing": return <FileText className="h-4 w-4" />;
      case "consolidation_opportunity": return <Users className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getTabCounts = () => {
    return {
      all: mockAlerts.filter(a => a.status === 'active').length,
      critical: mockAlerts.filter(a => a.severity === 'critical' && a.status === 'active').length,
      opportunities: mockAlerts.filter(a => 
        (a.type === 'cost_saving' || a.type === 'consolidation_opportunity') && a.status === 'active'
      ).length,
      customs: mockAlerts.filter(a => 
        (a.type === 'customs' || a.type === 'document_missing') && a.status === 'active'
      ).length,
      delays: mockAlerts.filter(a => 
        (a.type === 'delay' || a.type === 'route_optimization') && a.status === 'active'
      ).length
    };
  };

  const tabCounts = getTabCounts();

  // Statistiques pour le dashboard
  const totalPotentialSavings = mockAlerts
    .filter(a => a.estimatedSavings && a.status === 'active')
    .reduce((sum, a) => sum + (a.estimatedSavings || 0), 0);

  const criticalAlerts = mockAlerts.filter(a => a.severity === 'critical' && a.status === 'active').length;
  const actionRequiredAlerts = mockAlerts.filter(a => a.actionRequired && a.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Brain className="h-8 w-8 text-orange-500" />
              Centre d'Alertes IA
            </h1>
            <p className="text-gray-600 mt-1">
              Notifications intelligentes et recommandations automatisées pour optimiser vos envois
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>{tabCounts.all} alertes actives</span>
              <span>•</span>
              <span>{criticalAlerts} critiques</span>
              <span>•</span>
              <span>€{totalPotentialSavings} d'économies potentielles</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <Switch
                id="auto-refresh"
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
              />
              <label htmlFor="auto-refresh" className="text-sm font-medium">
                Actualisation auto
              </label>
            </div>
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
              className="shadow-sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate('settings')}
              className="shadow-sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-red-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                Alertes Critiques
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{criticalAlerts}</div>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <Zap className="h-3 w-3 mr-1" />
                Action immédiate requise
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                Actions Requises
                <Target className="h-4 w-4 text-orange-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{actionRequiredAlerts}</div>
              <p className="text-xs text-orange-600 flex items-center mt-1">
                <Clock className="h-3 w-3 mr-1" />
                En attente de traitement
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#10B981] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                Économies Possibles
                <Euro className="h-4 w-4 text-[#10B981]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">€{totalPotentialSavings}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Optimisations disponibles
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                Taux de Résolution
                <CheckCircle className="h-4 w-4 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">94%</div>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Ce mois-ci
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Recherche et Filtres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher dans les alertes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type d'alerte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="customs">Douanes</SelectItem>
                  <SelectItem value="delay">Retards</SelectItem>
                  <SelectItem value="route_optimization">Optimisation route</SelectItem>
                  <SelectItem value="cost_saving">Économies</SelectItem>
                  <SelectItem value="document_missing">Documents</SelectItem>
                  <SelectItem value="consolidation_opportunity">Consolidation</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes priorités</SelectItem>
                  <SelectItem value="critical">Critique</SelectItem>
                  <SelectItem value="warning">Attention</SelectItem>
                  <SelectItem value="info">Information</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actives</SelectItem>
                  <SelectItem value="resolved">Résolues</SelectItem>
                  <SelectItem value="dismissed">Ignorées</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
                  setSeverityFilter("all");
                  setStatusFilter("active");
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Onglets */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              Toutes ({tabCounts.all})
            </TabsTrigger>
            <TabsTrigger value="critical">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Critiques ({tabCounts.critical})
            </TabsTrigger>
            <TabsTrigger value="opportunities">
              <Euro className="h-4 w-4 mr-1" />
              Opportunités ({tabCounts.opportunities})
            </TabsTrigger>
            <TabsTrigger value="customs">
              <Globe className="h-4 w-4 mr-1" />
              Douanes ({tabCounts.customs})
            </TabsTrigger>
            <TabsTrigger value="delays">
              <Clock className="h-4 w-4 mr-1" />
              Retards ({tabCounts.delays})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <Card 
                  key={alert.id}
                  className={`hover:shadow-md transition-shadow cursor-pointer border-l-4 ${
                    alert.severity === 'critical' ? 'border-l-red-500 bg-red-50/30' :
                    alert.severity === 'warning' ? 'border-l-orange-500 bg-orange-50/30' :
                    'border-l-blue-500 bg-blue-50/30'
                  }`}
                  onClick={() => setSelectedAlert(alert.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center gap-2">
                          {getSeverityIcon(alert.severity)}
                          {getTypeIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base">{alert.title}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(alert.createdAt).toLocaleDateString('fr-BE')}
                            </span>
                            {alert.shipmentId && (
                              <span className="flex items-center gap-1">
                                <Package className="h-3 w-3" />
                                {alert.shipmentId}
                              </span>
                            )}
                            {alert.estimatedSavings && (
                              <span className="flex items-center gap-1 text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                                <Euro className="h-3 w-3" />
                                €{alert.estimatedSavings} économies
                              </span>
                            )}
                            {alert.estimatedDelay && (
                              <span className="flex items-center gap-1 text-red-600 font-medium bg-red-50 px-2 py-1 rounded">
                                <Clock className="h-3 w-3" />
                                +{alert.estimatedDelay}j retard
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity === 'critical' ? 'Critique' :
                           alert.severity === 'warning' ? 'Attention' : 'Info'}
                        </Badge>
                        {alert.actionRequired && (
                          <Badge variant="outline" className="text-orange-600 border-orange-200">
                            Action requise
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Suggestions */}
                    {alert.suggestions.length > 0 && (
                      <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-blue-900">
                          <Brain className="h-4 w-4" />
                          Actions recommandées par notre IA :
                        </h4>
                        <ul className="text-sm space-y-2">
                          {alert.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                              </div>
                              <span className="text-gray-700 leading-relaxed">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm"
                        className={`${
                          alert.type === 'consolidation_opportunity' ? 'bg-[#10B981] hover:bg-[#10B981]/90' :
                          alert.type === 'cost_saving' ? 'bg-orange-500 hover:bg-orange-600' :
                          alert.severity === 'critical' ? 'bg-red-600 hover:bg-red-700' :
                          'bg-[#1E40AF] hover:bg-[#1E40AF]/90'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTakeAction(alert);
                        }}
                      >
                        {alert.type === 'document_missing' && <FileText className="h-4 w-4 mr-1" />}
                        {alert.type === 'consolidation_opportunity' && <Users className="h-4 w-4 mr-1" />}
                        {alert.type === 'customs' && <Globe className="h-4 w-4 mr-1" />}
                        {alert.type === 'cost_saving' && <Euro className="h-4 w-4 mr-1" />}
                        {alert.type === 'delay' && <Clock className="h-4 w-4 mr-1" />}
                        {alert.type === 'route_optimization' && <MapPin className="h-4 w-4 mr-1" />}
                        {!['document_missing', 'consolidation_opportunity', 'customs', 'cost_saving', 'delay', 'route_optimization'].includes(alert.type) && <Eye className="h-4 w-4 mr-1" />}
                        {getActionButtonText(alert)}
                      </Button>
                      
                      <Button 
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResolveAlert(alert.id);
                        }}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Résoudre
                      </Button>
                      
                      <Button 
                        size="sm"
                        variant="outline"
                        className="text-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDismissAlert(alert.id);
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Ignorer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAlerts.length === 0 && (
              <div className="text-center py-16">
                {searchTerm || typeFilter !== "all" || severityFilter !== "all" ? (
                  <>
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Aucune alerte correspondante</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Aucune alerte ne correspond à vos critères de recherche. 
                      Essayez de modifier vos filtres ou recherchez autre chose.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSearchTerm("");
                          setTypeFilter("all");
                          setSeverityFilter("all");
                          setStatusFilter("active");
                        }}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Réinitialiser filtres
                      </Button>
                      <Button 
                        onClick={() => onNavigate('dashboard')}
                        className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                      >
                        Retour au dashboard
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mx-auto flex items-center justify-center">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      🎉 Parfait ! Aucune alerte active
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-lg mx-auto leading-relaxed">
                      Excellente performance ! Tous vos envois sont sous contrôle et vos processus 
                      logistiques fonctionnent parfaitement. Notre IA continue de surveiller 
                      automatiquement vos opérations.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                        <h4 className="font-medium text-green-900 mb-1">Douanes</h4>
                        <p className="text-sm text-green-700">Tous documents OK</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <Truck className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-medium text-blue-900 mb-1">Livraisons</h4>
                        <p className="text-sm text-blue-700">Dans les temps</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <Euro className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                        <h4 className="font-medium text-orange-900 mb-1">Économies</h4>
                        <p className="text-sm text-orange-700">Optimisées</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <Button 
                        onClick={() => onNavigate('consolidation')}
                        className="bg-[#10B981] hover:bg-[#10B981]/90"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Explorer consolidations
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => onNavigate('dashboard')}
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Voir performances
                      </Button>
                    </div>
                    
                    <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
                      <p className="text-sm text-gray-600">
                        <strong>💡 Le saviez-vous ?</strong> Notre IA analyse en continu plus de 200 critères 
                        pour détecter les opportunités d'optimisation. Restez connecté pour ne rien manquer !
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}