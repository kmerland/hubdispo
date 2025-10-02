// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from "react";
import { 
  Package, TrendingUp, Clock, AlertTriangle, MapPin, Users, Plus, BarChart3, 
  Search, Filter, ChevronRight, Truck, Ship, Plane, Euro, TrendingDown,
  Calendar, CheckCircle, XCircle, Info, Activity, Globe, Bell, FileText
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useToast } from "./ToastProvider";
import { useLanguage } from "./LanguageProvider";
import { useAuth } from "./AuthProvider";
import OptimizedDashboard from "./OptimizedDashboard";
import { mockShipments, mockConsolidationGroups, mockAlerts, dashboardStats } from "./data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface MainDashboardProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function MainDashboard({ onNavigate }: MainDashboardProps) {
  const [viewMode, setViewMode] = useState<'overview' | 'optimized'>('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const { showToast } = useToast();
  const { t } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Si on est en mode optimisé, retourner le dashboard optimisé
  if (viewMode === 'optimized') {
    return <OptimizedDashboard onNavigate={onNavigate} onToggleView={() => setViewMode('overview')} />;
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'new-shipment':
        onNavigate('new-shipment');
        showToast({
          type: 'info',
          message: t('dashboard.new_shipment'),
          duration: 2000
        });
        break;
      case 'track':
        onNavigate('shipments');
        break;
      case 'consolidation':
        onNavigate('consolidation');
        break;
      case 'customs':
        onNavigate('customs');
        break;
      case 'map':
        onNavigate('map');
        break;
      case 'alerts':
        onNavigate('intelligent-alerts');
        break;
      case 'faq':
        onNavigate('faq');
        break;
      case 'help':
        onNavigate('help');
        break;
      case 'reports':
        onNavigate('reports');
        break;
      default:
        showToast({
          type: 'info',
          message: `Action ${action} disponible`,
          duration: 3000
        });
    }
  };

  // Filtrer les données pour le dashboard
  const recentShipments = mockShipments.slice(0, 4);
  const openConsolidationGroups = mockConsolidationGroups.filter(g => g.status === 'open').slice(0, 3);
  const activeAlerts = mockAlerts.filter(a => a.status === 'active').slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600';
      case 'in_transit': return 'text-blue-600';
      case 'customs': return 'text-orange-600';
      case 'delayed': return 'text-red-600';
      case 'consolidating': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered': return { variant: 'default' as const, label: t('shipments.status.delivered') };
      case 'in_transit': return { variant: 'secondary' as const, label: t('shipments.status.in_transit') };
      case 'customs': return { variant: 'destructive' as const, label: t('shipments.status.customs') };
      case 'delayed': return { variant: 'destructive' as const, label: 'Retardé' };
      case 'consolidating': return { variant: 'outline' as const, label: t('shipments.status.consolidation') };
      case 'pending': return { variant: 'outline' as const, label: t('shipments.status.pending') };
      default: return { variant: 'outline' as const, label: status };
    }
  };

  const monthlyData = [
    { month: "Jun", envois: 45, consolidation: 28, economies: 1200 },
    { month: "Jul", envois: 52, consolidation: 34, economies: 1450 },
    { month: "Aoû", envois: 48, consolidation: 31, economies: 1380 },
    { month: "Sep", envois: 61, consolidation: 42, economies: 1890 },
    { month: "Oct", envois: 23, consolidation: 18, economies: 650 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header avec Salutation et Actions Rapides */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('dashboard.welcome', { name: user?.firstName || 'Utilisateur' })} 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Voici un aperçu de votre activité logistique aujourd'hui
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {currentTime.toLocaleDateString('fr-BE', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {currentTime.toLocaleTimeString('fr-BE')}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => handleQuickAction('new-shipment')}
              className="bg-[#1E40AF] hover:bg-[#1E40AF]/90 shadow-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvel Envoi
            </Button>
            <Button 
              variant="outline"
              onClick={() => setViewMode('optimized')}
              className="shadow-sm"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Vue Analytique
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleQuickAction('consolidation')}
              className="shadow-sm border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10"
            >
              <Users className="h-4 w-4 mr-2" />
              Consolidation
            </Button>
          </div>
        </div>

        {/* Métriques Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card 
            className="border-l-4 border-l-[#1E40AF] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onNavigate('shipments')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                Envois Actifs
                <Package className="h-4 w-4 text-[#1E40AF]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900">{dashboardStats.activeShipments}</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-green-600 font-medium">+{dashboardStats.monthlyGrowth}%</span>
                  <span className="text-gray-500 ml-1">ce mois</span>
                </div>
                <div className="text-xs text-gray-500">
                  Total: {dashboardStats.totalShipments} envois
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-l-4 border-l-[#10B981] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onNavigate('consolidation')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                Économies Groupage
                <Euro className="h-4 w-4 text-[#10B981]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900">€{dashboardStats.consolidationSavings.toLocaleString()}</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-green-600 font-medium">+8.2%</span>
                  <span className="text-gray-500 ml-1">ce mois</span>
                </div>
                <div className="text-xs text-gray-500">
                  {openConsolidationGroups.length} groupes disponibles
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onNavigate('reports')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                Délai Moyen
                <Clock className="h-4 w-4 text-orange-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900">{dashboardStats.averageDeliveryTime} jours</div>
                <div className="flex items-center text-sm">
                  <TrendingDown className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-green-600 font-medium">-0.5j</span>
                  <span className="text-gray-500 ml-1">ce mois</span>
                </div>
                <div className="text-xs text-gray-500">
                  Objectif: 3.0 jours
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onNavigate('intelligent-alerts')}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                Alertes IA
                <Bell className="h-4 w-4 text-red-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900">{activeAlerts.length}</div>
                <div className="flex items-center text-sm">
                  <AlertTriangle className="h-3 w-3 mr-1 text-red-600" />
                  <span className="text-red-600 font-medium">
                    {activeAlerts.filter(a => a.severity === 'critical').length} critiques
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {activeAlerts.filter(a => a.actionRequired).length} actions requises
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-[#1E40AF]" />
                Évolution mensuelle
              </CardTitle>
              <CardDescription>
                Envois et consolidations des 5 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="envois" fill="#1E40AF" name="Envois" />
                  <Bar dataKey="consolidation" fill="#10B981" name="Consolidations" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#10B981]" />
                Économies mensuelles
              </CardTitle>
              <CardDescription>
                Montant des économies réalisées grâce aux consolidations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`€${value}`, 'Économies']} />
                  <Line 
                    type="monotone" 
                    dataKey="economies" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Envois Récents et Alertes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Envois Récents */}
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[#1E40AF]" />
                  Envois récents
                </CardTitle>
                <CardDescription>
                  Vos derniers envois et leur statut
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onNavigate("shipments")}
                className="hover:bg-[#1E40AF] hover:text-white"
              >
                Voir tout
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentShipments.map((shipment) => {
                  const statusBadge = getStatusBadge(shipment.status);
                  return (
                    <div 
                      key={shipment.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border-l-4 border-l-transparent hover:border-l-[#1E40AF]"
                      onClick={() => onNavigate('tracking', { shipmentId: shipment.id })}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm">
                          <Package className={`h-5 w-5 ${getStatusColor(shipment.status)}`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{shipment.trackingNumber}</p>
                          <p className="text-sm text-gray-600">
                            {shipment.origin.city} → {shipment.destination.city}
                          </p>
                          <p className="text-xs text-gray-500">
                            {shipment.carrier} • €{shipment.shippingCost}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={statusBadge.variant} className="mb-1">
                          {statusBadge.label}
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {new Date(shipment.estimatedDelivery).toLocaleDateString('fr-BE')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Alertes IA */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Alertes IA
              </CardTitle>
              <CardDescription>
                Notifications intelligentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-3 border-l-4 rounded-lg cursor-pointer hover:shadow-sm transition-shadow ${
                    alert.severity === 'critical' ? 'border-l-red-500 bg-red-50' :
                    alert.severity === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
                    'border-l-green-500 bg-green-50'
                  }`}
                  onClick={() => onNavigate("intelligent-alerts", { alertId: alert.id })}
                >
                  <p className="text-sm font-medium mb-1">{alert.title}</p>
                  <p className="text-xs text-gray-600 line-clamp-2">{alert.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      {new Date(alert.createdAt).toLocaleDateString('fr-BE')}
                    </p>
                    {alert.estimatedSavings && (
                      <Badge variant="outline" className="text-xs">
                        €{alert.estimatedSavings}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => onNavigate("intelligent-alerts")}
              >
                Voir toutes les alertes
              </Button>
            </CardContent>
          </Card>

          {/* Fiscalité & TVA */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#1E40AF]" />
                Fiscalité & TVA
              </CardTitle>
              <CardDescription>
                Votre situation fiscale personnalisée
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border-l-4 border-l-green-500 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Situation TVA</p>
                  <Badge variant="default" className="bg-green-500">
                    ✅ Conforme
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">
                  Assujetti TVA belge (BE0123456789)
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Exonération UE applicable pour vos envois
                </p>
              </div>

              <div className="p-3 border-l-4 border-l-orange-500 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">À vérifier</p>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    ⚠️ Attention
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">
                  2 numéros TVA destinataires à valider (France)
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span>Score de conformité</span>
                  <span className="font-semibold text-[#1E40AF]">88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-[#1E40AF] h-2 rounded-full" style={{width: '88%'}}></div>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => onNavigate("tax-compliance")}
              >
                Voir les détails
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Opportunités de Consolidation */}
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#10B981]" />
                Opportunités de consolidation
              </CardTitle>
              <CardDescription>
                Groupes de consolidation disponibles pour économiser sur vos envois
              </CardDescription>
            </div>
            <Button 
              onClick={() => onNavigate("consolidation")}
              className="bg-[#10B981] hover:bg-[#10B981]/90"
            >
              <Users className="h-4 w-4 mr-2" />
              Explorer
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {openConsolidationGroups.map((group) => {
                const loadPercentage = Math.round((group.currentLoad.weight / group.maxCapacity.weight) * 100);
                return (
                  <div 
                    key={group.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-white to-green-50 border-green-200"
                    onClick={() => onNavigate("consolidation", { groupId: group.id })}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#10B981]" />
                        <span className="font-medium">{group.destination.city}</span>
                      </div>
                      <Badge className="bg-[#10B981]/10 text-[#10B981]">
                        Économie: €{group.estimatedSavings}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-3">
                      <div className="flex justify-between">
                        <span>Participants:</span>
                        <span className="font-medium">{group.participants}/8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Capacité:</span>
                        <span className="font-medium">{loadPercentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Départ:</span>
                        <span className="font-medium">
                          {new Date(group.departureDate).toLocaleDateString('fr-BE')}
                        </span>
                      </div>
                    </div>
                    
                    <Progress value={loadPercentage} className="mb-3 h-2" />
                    
                    <Button 
                      size="sm" 
                      className="w-full bg-[#10B981] hover:bg-[#10B981]/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate("consolidation", { action: "join", groupId: group.id });
                        showToast({
                          type: 'success',
                          message: 'Demande de participation envoyée !',
                          duration: 3000
                        });
                      }}
                    >
                      Rejoindre le groupe
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Actions Rapides */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#1E40AF]" />
              Actions rapides
            </CardTitle>
            <CardDescription>
              Accès direct aux fonctionnalités principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button 
                variant="outline" 
                className="flex flex-col items-center gap-2 h-20 hover:bg-[#1E40AF] hover:text-white transition-colors"
                onClick={() => handleQuickAction('new-shipment')}
              >
                <Package className="h-6 w-6" />
                <span className="text-xs">Nouvel envoi</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center gap-2 h-20 hover:bg-blue-50 transition-colors"
                onClick={() => handleQuickAction('map')}
              >
                <MapPin className="h-6 w-6 text-[#1E40AF]" />
                <span className="text-xs">Carte</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center gap-2 h-20 hover:bg-green-50 transition-colors"
                onClick={() => handleQuickAction('consolidation')}
              >
                <Users className="h-6 w-6 text-[#10B981]" />
                <span className="text-xs">Groupage</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center gap-2 h-20 hover:bg-purple-50 transition-colors"
                onClick={() => handleQuickAction('customs')}
              >
                <Globe className="h-6 w-6 text-[#1E40AF]" />
                <span className="text-xs">Douanes</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center gap-2 h-20 hover:bg-orange-50 transition-colors"
                onClick={() => handleQuickAction('reports')}
              >
                <BarChart3 className="h-6 w-6 text-[#1E40AF]" />
                <span className="text-xs">Rapports</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center gap-2 h-20 hover:bg-yellow-50 transition-colors"
                onClick={() => handleQuickAction('faq')}
              >
                <Info className="h-6 w-6 text-[#1E40AF]" />
                <span className="text-xs">FAQ</span>
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}