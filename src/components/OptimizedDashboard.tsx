// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Package, Truck, AlertTriangle, CheckCircle, TrendingUp, Leaf, BarChart3, Euro, Clock, Globe, Users, Zap, Calendar, Target, Settings, Bell, FileText, Archive, MapPin, Shield, ArrowRight, ChevronRight, LogOut, User, Activity, RefreshCw, Loader2, AlertCircle, CheckCircle2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { toast } from "sonner@2.0.3";
import ProactiveAlerts from "./ProactiveAlerts";
import ContextualFAQ from "./ContextualFAQ";
import IntelligentAlertsSystem from "./IntelligentAlertsSystem";
import QuickFAQWidget from "./QuickFAQWidget";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import { RealTimeDashboard, SystemStatus, SystemLoadIndicator } from "./RealTimeIndicators";
import { InteractiveLogisticsData } from "./LogisticsDataManager";
import { StatsCardLoading, ShipmentListLoading, ConsolidationLoading } from "./LoadingStates";
import { NetworkError, DataError, ServerError } from "./ErrorStates";

interface DashboardProps {
  onNavigate: (view: string, params?: any) => void;
}

interface ShipmentData {
  id: string;
  destination: string;
  status: 'consolidation' | 'transit' | 'douane' | 'livré';
  items: number;
  estimatedDelivery?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface NextStep {
  id: number;
  task: string;
  completed: boolean;
  urgent: boolean;
  action: string;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  
  // États de chargement et d'erreurs
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("real-time");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  
  // États des données
  const [statsData, setStatsData] = useState<any[]>([]);
  const [shipmentsData, setShipmentsData] = useState<ShipmentData[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([2, 4]));

  // Simulation de chargement initial avec retry
  const initializeDashboard = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Simulation API call avec délai réaliste
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Données simulées mais réalistes
      const stats = [
        { title: t('dashboard.stats.active_shipments') || "Envois actifs", value: "12", icon: Package, color: "text-[#1E40AF]", trend: "+8%", loading: false },
        { title: t('dashboard.stats.in_consolidation') || "En consolidation", value: "4", icon: Truck, color: "text-orange-500", trend: "+15%", loading: false },
        { title: t('dashboard.stats.in_customs') || "En douane", value: "2", icon: AlertTriangle, color: "text-amber-500", trend: "-25%", loading: false },
        { title: t('dashboard.stats.delivered_month') || "Livrés ce mois", value: "28", icon: CheckCircle, color: "text-[#10B981]", trend: "+12%", loading: false }
      ];

      const shipments: ShipmentData[] = [
        { id: "BE-2024-001", destination: "Allemagne", status: "consolidation", items: 3, estimatedDelivery: "3-5 jours", priority: "high" },
        { id: "BE-2024-002", destination: "France", status: "transit", items: 1, estimatedDelivery: "2-3 jours", priority: "medium" },
        { id: "BE-2024-003", destination: "Pays-Bas", status: "douane", items: 2, estimatedDelivery: "1-2 jours", priority: "high" },
        { id: "BE-2024-004", destination: "Italie", status: "livré", items: 1, priority: "low" },
        { id: "BE-2024-005", destination: "Espagne", status: "transit", items: 4, estimatedDelivery: "4-6 jours", priority: "medium" }
      ];

      setStatsData(stats);
      setShipmentsData(shipments);
      setLastUpdate(new Date());
      
      toast.success("Tableau de bord actualisé", {
        description: "Toutes les données ont été mises à jour avec succès"
      });
      
    } catch (err) {
      setError("Erreur lors du chargement des données");
      toast.error("Erreur de chargement", {
        description: "Impossible de charger les données. Vérifiez votre connexion."
      });
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  // Actualisation manuelle
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      await initializeDashboard();
      toast.success("Données actualisées");
    } catch (err) {
      toast.error("Erreur lors de l'actualisation");
    } finally {
      setIsRefreshing(false);
    }
  }, [initializeDashboard]);

  // Mise à jour automatique des données
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Chargement initial
  useEffect(() => {
    initializeDashboard();
  }, [initializeDashboard]);

  // Données consolidation avec calculs en temps réel
  const currentConsolidation = useMemo(() => ({
    id: "CONS-2024-10-003",
    destination: "Allemagne",
    fillLevel: 68,
    departureDate: "12/10/2024",
    coShippers: [
      { name: "Agroalim.", volume: "0.3 m³", type: "alimentaire" },
      { name: "E-com", volume: "0.2 m³", type: "electronique" },
      { name: "TextilePro", volume: "0.15 m³", type: "textile" }
    ],
    remainingSpace: "0.32 m³",
    estimatedSavings: "€78",
    timeToDeadline: "2j 14h"
  }), []);

  // Gestion des étapes avec actions
  const nextSteps: NextStep[] = useMemo(() => [
    { id: 1, task: "Validez votre prochain envoi", completed: completedSteps.has(1), urgent: true, action: "new-shipment" },
    { id: 2, task: "Mettez à jour vos préférences", completed: completedSteps.has(2), urgent: false, action: "settings" },
    { id: 3, task: "Vérifiez les documents douaniers", completed: completedSteps.has(3), urgent: true, action: "customs" },
    { id: 4, task: "Configurez les notifications", completed: completedSteps.has(4), urgent: false, action: "notifications" }
  ], [completedSteps]);

  const handleStepToggle = useCallback((stepId: number) => {
    const step = nextSteps.find(s => s.id === stepId);
    if (!step) return;

    if (!step.completed) {
      // Marquer comme complété avec animation
      setCompletedSteps(prev => new Set([...prev, stepId]));
      toast.success("Étape complétée !", {
        description: step.task,
        action: {
          label: "Voir",
          onClick: () => onNavigate(step.action, stepId === 3 ? { shipmentId: "BE-2024-789" } : {})
        }
      });
    } else {
      // Démarquer et naviguer
      setCompletedSteps(prev => {
        const newSet = new Set(prev);
        newSet.delete(stepId);
        return newSet;
      });
    }

    // Navigation contextuelle avec délai pour animation
    setTimeout(() => {
      onNavigate(step.action, stepId === 3 ? { shipmentId: "BE-2024-789" } : {});
    }, 500);
  }, [nextSteps, onNavigate]);

  // Métriques avancées avec calculs en temps réel
  const advancedStats = useMemo(() => [
    { title: "Revenus générés", value: "€15,647", icon: Euro, color: "text-[#10B981]", subtitle: "Ce mois", trend: "+12.3%" },
    { title: "Temps moyen livraison", value: "3.2 jours", icon: Clock, color: "text-blue-500", subtitle: "UE uniquement", trend: "-0.3j" },
    { title: "Taux satisfaction", value: "98.5%", icon: Users, color: "text-purple-500", subtitle: "Clients finaux", trend: "+1.2%" },
    { title: "Performance IA", value: "99.1%", icon: Zap, color: "text-amber-500", subtitle: "Douane automatique", trend: "+0.5%" }
  ], []);

  // Actions rapides optimisées
  const quickActions = useMemo(() => [
    { icon: Plus, label: t('nav.new_shipment'), color: "bg-[#1E40AF]", action: () => onNavigate("new-shipment") },
    { icon: MapPin, label: t('nav.map'), color: "bg-blue-500", action: () => onNavigate("map") },
    { icon: BarChart3, label: t('dashboard.reports') || "Rapports", color: "bg-[#10B981]", action: () => onNavigate("reports") },
    { icon: Zap, label: t('dashboard.services') || "Services", color: "bg-purple-600", action: () => onNavigate("system-status") },
    { icon: Settings, label: t('nav.settings'), color: "bg-gray-600", action: () => onNavigate("settings") }
  ], [t, onNavigate]);

  // Activité récente avec timestamps réels
  const recentActivity = useMemo(() => [
    { 
      id: 1, 
      type: "shipment", 
      message: "Envoi BE-2024-045 livré en Allemagne", 
      time: "Il y a 12 minutes", 
      status: "success",
      shipmentId: "BE-2024-045"
    },
    { 
      id: 2, 
      type: "consolidation", 
      message: "4 envois consolidés pour la France", 
      time: "Il y a 1 heure", 
      status: "info" 
    },
    { 
      id: 3, 
      type: "customs", 
      message: "DAU généré automatiquement pour BE-2024-046", 
      time: "Il y a 2 heures", 
      status: "success",
      shipmentId: "BE-2024-046"
    },
    { 
      id: 4, 
      type: "alert", 
      message: "Délai douanier prolongé - Italie", 
      time: "Il y a 3 heures", 
      status: "warning" 
    }
  ], []);

  const getStatusBadge = useCallback((status: string) => {
    const configs = {
      consolidation: { className: "bg-orange-100 text-orange-700", label: "En consolidation" },
      transit: { className: "bg-blue-100 text-blue-700", label: "En transit" },
      douane: { className: "bg-amber-100 text-amber-700", label: "En douane" },
      livré: { className: "bg-[#10B981] text-white", label: "Livré" }
    };
    
    const config = configs[status as keyof typeof configs] || { className: "bg-gray-100 text-gray-700", label: status };
    
    return (
      <Badge variant="secondary" className={config.className}>
        {config.label}
      </Badge>
    );
  }, []);

  // Gestion des erreurs avec retry
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <NetworkError 
          message={error}
          onRetry={initializeDashboard}
          className="max-w-2xl mx-auto"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* En-tête dynamique optimisé */}
      <div className="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Package className="h-32 w-32" />
        </div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-2xl lg:text-3xl font-semibold">
                {t('dashboard.welcome', { name: user?.firstName || 'Utilisateur' })} 👋
              </h1>
              <div className="hidden sm:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2 border-b">
                      <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                      <Badge className="bg-[#10B981] text-white text-xs mt-1">
                        {t(`plan.${user?.plan || 'starter'}`)}
                      </Badge>
                    </div>
                    <DropdownMenuItem onClick={() => onNavigate("profile")}>
                      <User className="h-4 w-4 mr-2" />
                      {t('nav.profile')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate("settings")}>
                      <Settings className="h-4 w-4 mr-2" />
                      {t('nav.settings')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => { logout(); onNavigate("homepage"); }} 
                      className="text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-blue-100 text-lg">
              {t('dashboard.status_summary')}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-blue-200 text-sm">
                Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-BE', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Button 
              size="lg" 
              className="bg-white text-[#1E40AF] hover:bg-gray-50 shadow-lg transition-all hover:scale-105"
              onClick={() => onNavigate("new-shipment")}
            >
              <Plus className="h-5 w-5 mr-2" />
              {t('dashboard.new_shipment')}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1E40AF] shadow-lg transition-all hover:scale-105"
              onClick={() => onNavigate("intelligent-alerts")}
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Alertes IA
            </Button>
          </div>
        </div>
      </div>

      {/* Alerte critique avec action directe */}
      <Alert className="border-amber-200 bg-amber-50 border-l-4 border-l-amber-500">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <div className="flex items-center justify-between">
            <div>
              <strong>{t('dashboard.action_required') || 'Action requise'} :</strong> {t('dashboard.missing_dau') || 'DAU manquant pour l\'envoi BE-2024-789 vers l\'Allemagne'}.
            </div>
            <Button 
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => onNavigate("customs", { shipmentId: "BE-2024-789" })}
            >
              Compléter
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      {/* Stats Cards avec états de chargement optimisés */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <StatsCardLoading key={index} />
          ))
        ) : (
          statsData.map((stat, index) => (
            <Card 
              key={index} 
              className="border-l-4 border-l-[#1E40AF] hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => {
                const destinations = ["shipments", "consolidation", "customs", "reports"];
                onNavigate(destinations[index]);
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-2xl font-semibold transition-all duration-1000">{stat.value}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                        {stat.trend}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">
                      Temps réel • {lastUpdate.toLocaleTimeString('fr-BE', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Actions rapides avec feedback visuel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {t('dashboard.quick_actions')}
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Actualisation...' : 'Actualiser'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col gap-2 hover:bg-gray-50 transition-all hover:scale-105 border-2 hover:border-[#1E40AF]"
                onClick={action.action}
              >
                <div className={`p-2 rounded-lg ${action.color} text-white transition-all`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Tabs optimisé */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-2xl grid-cols-5">
            <TabsTrigger value="real-time" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Temps réel</span>
            </TabsTrigger>
            <TabsTrigger value="overview">{t('dashboard.overview')}</TabsTrigger>
            <TabsTrigger value="performance">{t('dashboard.performance')}</TabsTrigger>
            <TabsTrigger value="goals">{t('dashboard.goals')}</TabsTrigger>
            <TabsTrigger value="activity">{t('dashboard.activity')}</TabsTrigger>
          </TabsList>
        </div>

        {/* Onglet Temps réel */}
        <TabsContent value="real-time" className="space-y-6">
          {isLoading ? (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <StatsCardLoading />
                <ShipmentListLoading />
              </div>
              <div className="space-y-6">
                <ConsolidationLoading />
                <StatsCardLoading />
              </div>
            </div>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-[#1E40AF]" />
                    Métriques en temps réel
                    <Badge className="bg-green-100 text-green-700 text-xs ml-auto animate-pulse">
                      LIVE
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RealTimeDashboard onNavigate={onNavigate} />
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <InteractiveLogisticsData onNavigate={onNavigate} />
                </div>
                <div className="space-y-6">
                  <SystemStatus />
                  <SystemLoadIndicator />
                </div>
              </div>
            </>
          )}
        </TabsContent>

        {/* Onglet Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Envois actifs optimisé */}
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-[#1E40AF]" 
                  onClick={() => onNavigate("shipments")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-[#1E40AF]" />
                  {t('dashboard.active_shipments')}
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {shipmentsData.length}
                  </Badge>
                </CardTitle>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {shipmentsData.slice(0, 4).map((shipment) => (
                    <div 
                      key={shipment.id} 
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer group"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate("tracking", { shipmentId: shipment.id });
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full transition-all group-hover:scale-110 ${
                          shipment.status === 'livré' ? 'bg-green-100' :
                          shipment.status === 'douane' ? 'bg-amber-100' :
                          shipment.status === 'transit' ? 'bg-blue-100' : 'bg-orange-100'
                        }`}>
                          <Package className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{shipment.id}</p>
                          <p className="text-sm text-gray-600">{shipment.destination} • {shipment.items} article(s)</p>
                          {shipment.estimatedDelivery && (
                            <p className="text-xs text-gray-500">Estimé: {shipment.estimatedDelivery}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {getStatusBadge(shipment.status)}
                        {shipment.priority === 'high' && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t">
                  <Button variant="outline" className="w-full hover:bg-[#1E40AF] hover:text-white transition-all" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate("shipments");
                          }}>
                    Voir tous les envois ({shipmentsData.length + 8} total)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Consolidation en cours optimisée */}
            <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-500" 
                  onClick={() => onNavigate("consolidation")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Archive className="h-5 w-5 text-orange-500" />
                  {t('dashboard.consolidation_progress')}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-500 text-white animate-pulse">
                    {currentConsolidation.timeToDeadline}
                  </Badge>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Conteneur {currentConsolidation.destination}</span>
                      <Badge className="bg-orange-500 text-white">{currentConsolidation.fillLevel}% rempli</Badge>
                    </div>
                    <Progress value={currentConsolidation.fillLevel} className="h-3 mb-3" />
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Départ prévu</p>
                        <p className="font-medium">{currentConsolidation.departureDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Économies prévues</p>
                        <p className="font-medium text-[#10B981]">{currentConsolidation.estimatedSavings}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 flex items-center justify-between">
                      Co-expéditeurs ({currentConsolidation.coShippers.length})
                      <span className="text-xs text-green-600">Espace restant: {currentConsolidation.remainingSpace}</span>
                    </p>
                    {currentConsolidation.coShippers.map((shipper, index) => (
                      <div key={index} className="flex items-center justify-between text-sm py-1">
                        <span className="text-gray-600">{shipper.name}</span>
                        <span className="font-medium">{shipper.volume}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 transition-all hover:scale-105" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate("consolidation");
                    }}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Verrouiller ma place
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Étapes suivantes avec progression */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#1E40AF]" />
                {t('dashboard.next_steps')}
                <Badge variant="secondary" className="ml-auto">
                  {nextSteps.filter(s => s.completed).length}/{nextSteps.length} complétées
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-4">
                {nextSteps.map((step) => (
                  <div 
                    key={step.id} 
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                      step.urgent && !step.completed 
                        ? 'border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 hover:border-amber-400' 
                        : step.completed
                        ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50'
                        : 'border-gray-200 hover:border-[#1E40AF] hover:bg-blue-50'
                    }`}
                    onClick={() => handleStepToggle(step.id)}
                  >
                    <div className="relative">
                      <Checkbox 
                        checked={step.completed}
                        className="cursor-pointer"
                        readOnly
                      />
                      {step.completed && (
                        <CheckCircle2 className="h-4 w-4 text-green-600 absolute -top-1 -right-1" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium transition-all ${
                        step.completed 
                          ? 'line-through text-gray-500' 
                          : 'text-gray-900'
                      }`}>
                        {step.task}
                      </p>
                      {step.urgent && !step.completed && (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs mt-1">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Urgent
                        </Badge>
                      )}
                      {step.completed && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs mt-1">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Complété
                        </Badge>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Performance */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#1E40AF]" />
                  Métriques de performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Taux de livraison à temps", value: 96.5, target: 95 },
                  { label: "Consolidation réussie", value: 94.2, target: 90 },
                  { label: "Douane automatique", value: 99.1, target: 95 }
                ].map((metric, index) => (
                  <div 
                    key={index}
                    className="space-y-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onNavigate(index === 0 ? "reports" : index === 1 ? "consolidation" : "customs")}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{metric.value}%</span>
                        {metric.value >= metric.target ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Objectif: {metric.target}%</span>
                      <span className={metric.value >= metric.target ? "text-green-600" : "text-amber-600"}>
                        {metric.value >= metric.target ? `+${(metric.value - metric.target).toFixed(1)}%` : `${(metric.value - metric.target).toFixed(1)}%`}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#10B981]" />
                  Statistiques avancées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {advancedStats.map((stat, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer hover:border-[#1E40AF]"
                    onClick={() => {
                      if (stat.title === "Revenus générés") onNavigate("subscription");
                      else if (stat.title === "Performance IA") onNavigate("customs");
                      else onNavigate("reports");
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      <div>
                        <p className="font-semibold">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs mb-1">
                        {stat.subtitle}
                      </Badge>
                      <p className="text-xs text-green-600">{stat.trend}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Objectifs */}
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[#1E40AF]" />
                {t('dashboard.monthly_goals')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "Envois mensuels", current: 28, target: 40, unit: "", icon: Package },
                { title: "Économies cibles", current: 2847, target: 4000, unit: "€", icon: Euro },
                { title: "Satisfaction client", current: 98.5, target: 99, unit: "%", icon: Users }
              ].map((goal, index) => (
                <div 
                  key={index}
                  className="space-y-3 p-4 rounded-lg border-2 hover:border-[#1E40AF] transition-all cursor-pointer hover:shadow-md"
                  onClick={() => onNavigate("reports")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <goal.icon className="h-5 w-5 text-[#1E40AF]" />
                      <span className="font-medium">{goal.title}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {goal.unit}{Math.floor(goal.current)} / {goal.unit}{goal.target}
                    </span>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} className="h-3" />
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">
                      {Math.round((goal.current / goal.target) * 100)}% atteint
                    </span>
                    <span className={goal.current >= goal.target ? "text-green-600" : "text-[#1E40AF]"}>
                      {goal.current >= goal.target ? "🎯 Objectif atteint !" : `${Math.round(100 - (goal.current / goal.target) * 100)}% restant`}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Activité */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#1E40AF]" />
                {t('dashboard.recent_activity')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer hover:border-[#1E40AF]"
                    onClick={() => {
                      if (activity.type === 'shipment' && activity.shipmentId) {
                        onNavigate("tracking", { shipmentId: activity.shipmentId });
                      } else if (activity.type === 'consolidation') {
                        onNavigate("consolidation");
                      } else if (activity.type === 'customs' && activity.shipmentId) {
                        onNavigate("customs", { shipmentId: activity.shipmentId });
                      } else if (activity.type === 'alert') {
                        onNavigate("notifications");
                      }
                    }}
                  >
                    <div className={`p-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-100 text-green-600' :
                      activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'shipment' && <Package className="h-4 w-4" />}
                      {activity.type === 'consolidation' && <Truck className="h-4 w-4" />}
                      {activity.type === 'customs' && <CheckCircle className="h-4 w-4" />}
                      {activity.type === 'alert' && <AlertTriangle className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Section des alertes intelligentes et FAQ */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <IntelligentAlertsSystem 
            onNavigate={onNavigate}
            compactMode={true}
            maxDisplayed={5}
          />
        </div>
        <div className="space-y-6">
          <QuickFAQWidget onNavigate={onNavigate} />
          <ContextualFAQ context="general" onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}