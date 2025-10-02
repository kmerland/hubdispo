// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X, 
  Bell, 
  Clock, 
  Shield, 
  Package, 
  Truck, 
  CreditCard, 
  Calendar, 
  FileX, 
  TrendingUp, 
  MapPin, 
  Zap, 
  Brain, 
  Target, 
  AlertCircle, 
  Filter, 
  Settings, 
  Pause, 
  Play, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Mail, 
  MessageSquare,
  ExternalLink,
  Lightbulb,
  Route,
  DollarSign,
  Globe,
  Users,
  BarChart3,
  Activity,
  Wifi,
  WifiOff
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner@2.0.3";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";

interface IntelligentAlert {
  id: string;
  type: "critical" | "warning" | "info" | "success" | "opportunity";
  category: "customs" | "consolidation" | "delivery" | "regulatory" | "financial" | "operational" | "ai_insight" | "optimization";
  priority: "urgent" | "high" | "medium" | "low";
  severity: 1 | 2 | 3 | 4 | 5; // 5 = le plus critique
  title: string;
  message: string;
  detailedMessage?: string;
  source: "ai_engine" | "system_monitor" | "external_api" | "user_action" | "predictive_model";
  
  // Contexte et métadonnées
  shipmentId?: string;
  relatedEntity?: string;
  entityType?: "shipment" | "group" | "document" | "account" | "partner";
  
  // Actions intelligentes
  actions?: AlertAction[];
  autoResolve?: boolean;
  autoResolveIn?: number; // minutes
  
  // Timing et géolocalisation
  timestamp: string;
  expiresAt?: string;
  location?: string;
  affectedRegion?: string[];
  
  // État et historique
  status: "active" | "acknowledged" | "resolved" | "expired" | "snoozed";
  acknowledgedAt?: string;
  resolvedAt?: string;
  snoozeUntil?: string;
  
  // Métrics et impact
  impactScore: number; // 0-100
  confidenceLevel: number; // 0-100 pour les alertes IA
  estimatedSavings?: number;
  potentialLoss?: number;
  
  // Personnalisation et apprentissage
  userReaction?: "helpful" | "not_helpful" | "false_positive";
  feedbackGiven?: boolean;
  similarCount?: number;
  
  // Canaux de notification
  channels: NotificationChannel[];
  sentVia?: NotificationChannel[];
  
  // Données pour l'IA
  mlTags?: string[];
  riskFactors?: string[];
  recommendations?: string[];
}

interface AlertAction {
  id: string;
  label: string;
  type: "primary" | "secondary" | "danger";
  action: string;
  params?: Record<string, any>;
  requiresConfirmation?: boolean;
  estimatedTime?: string;
  icon?: any;
}

type NotificationChannel = "in_app" | "email" | "sms" | "push" | "webhook" | "teams" | "slack";

interface AlertSettings {
  // Canaux actifs
  enabledChannels: NotificationChannel[];
  
  // Filtrage intelligent
  minimumSeverity: number;
  autoAcknowledgeLowPriority: boolean;
  groupSimilarAlerts: boolean;
  
  // Timing et fréquence
  quietHours: { start: string; end: string; enabled: boolean };
  maxAlertsPerHour: number;
  digestMode: boolean;
  digestFrequency: "hourly" | "daily" | "weekly";
  
  // Catégories
  categoryPreferences: Record<string, { enabled: boolean; severity: number }>;
  
  // IA et apprentissage
  enablePredictiveAlerts: boolean;
  learningMode: boolean;
  confidenceThreshold: number;
  
  // Actions automatiques
  autoResolveEnabled: boolean;
  autoSnoozeRecurring: boolean;
}

interface IntelligentAlertsSystemProps {
  onNavigate?: (view: string, params?: any) => void;
  compactMode?: boolean;
  showOnlyUrgent?: boolean;
  maxDisplayed?: number;
}

export default function IntelligentAlertsSystem({ 
  onNavigate, 
  compactMode = false, 
  showOnlyUrgent = false, 
  maxDisplayed = 10 
}: IntelligentAlertsSystemProps) {
  const { user } = useAuth();
  const { t } = useLanguage();

  // État principal
  const [alerts, setAlerts] = useState<IntelligentAlert[]>([]);
  const [settings, setSettings] = useState<AlertSettings>({
    enabledChannels: ["in_app", "email", "push"],
    minimumSeverity: 2,
    autoAcknowledgeLowPriority: true,
    groupSimilarAlerts: true,
    quietHours: { start: "22:00", end: "08:00", enabled: true },
    maxAlertsPerHour: 10,
    digestMode: false,
    digestFrequency: "daily",
    categoryPreferences: {
      customs: { enabled: true, severity: 3 },
      consolidation: { enabled: true, severity: 2 },
      delivery: { enabled: true, severity: 3 },
      regulatory: { enabled: true, severity: 4 },
      financial: { enabled: true, severity: 2 },
      operational: { enabled: true, severity: 2 },
      ai_insight: { enabled: true, severity: 1 },
      optimization: { enabled: true, severity: 1 }
    },
    enablePredictiveAlerts: true,
    learningMode: true,
    confidenceThreshold: 80,
    autoResolveEnabled: true,
    autoSnoozeRecurring: false
  });

  // État UI
  const [showSettings, setShowSettings] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [isConnected, setIsConnected] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulation d'alertes intelligentes réalistes
  const generateIntelligentAlerts = useCallback((): IntelligentAlert[] => {
    const now = new Date();
    const mockAlerts: IntelligentAlert[] = [
      {
        id: "alert_001",
        type: "critical",
        category: "customs",
        priority: "urgent",
        severity: 5,
        title: "Blocage douanier imminent détecté",
        message: "L'IA détecte un risque élevé de blocage pour l'envoi BE-2024-789 vers le Canada",
        detailedMessage: "Analyse prédictive: Code HS 8471.30.00 + valeur €15,000 + origine Chine = 95% probabilité de contrôle CBSA. Documents additionnels requis.",
        source: "ai_engine",
        shipmentId: "BE-2024-789",
        relatedEntity: "BE-2024-789",
        entityType: "shipment",
        actions: [
          {
            id: "generate_docs",
            label: "Générer documents",
            type: "primary",
            action: "navigate",
            params: { view: "dau-generator", shipmentId: "BE-2024-789" },
            estimatedTime: "5 min",
            icon: FileX
          },
          {
            id: "contact_expert",
            label: "Expert douanier",
            type: "secondary", 
            action: "navigate",
            params: { view: "direct-chat", topic: "customs" },
            estimatedTime: "immédiat",
            icon: MessageSquare
          }
        ],
        autoResolve: false,
        timestamp: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
        status: "active",
        impactScore: 95,
        confidenceLevel: 95,
        potentialLoss: 2500,
        location: "Anvers, Belgique",
        affectedRegion: ["Canada"],
        channels: ["in_app", "email", "sms", "push"],
        mlTags: ["high_value", "electronics", "canada_regulations"],
        riskFactors: ["new_importer", "high_value", "complex_hs_code"],
        recommendations: ["Ajouter certificat de conformité CE", "Préparer facture commerciale détaillée", "Contacter courtier canadien"]
      },
      {
        id: "alert_002", 
        type: "opportunity",
        category: "consolidation",
        priority: "high",
        severity: 2,
        title: "Opportunité d'économie majeure disponible",
        message: "Nouveau groupe premium vers l'Allemagne - Économies potentielles: €450 (62%)",
        detailedMessage: "Groupe express vers Munich disponible avec départ dans 4h. Taux de remplissage actuel: 73%. Vos envois compatibles: 3 colis.",
        source: "ai_engine",
        actions: [
          {
            id: "join_group",
            label: "Rejoindre le groupe",
            type: "primary",
            action: "navigate",
            params: { view: "consolidation", groupId: "GRP-DE-001" },
            estimatedTime: "2 min",
            icon: Truck
          },
          {
            id: "view_details",
            label: "Voir détails",
            type: "secondary",
            action: "navigate", 
            params: { view: "consolidation", tab: "available" },
            icon: ExternalLink
          }
        ],
        autoResolve: true,
        autoResolveIn: 240, // 4 heures
        timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
        expiresAt: new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString(),
        status: "active",
        impactScore: 85,
        confidenceLevel: 88,
        estimatedSavings: 450,
        location: "Anvers → Munich",
        channels: ["in_app", "push"],
        mlTags: ["cost_optimization", "time_sensitive", "high_savings"],
        recommendations: ["Rejoindre rapidement pour bénéficier du tarif", "Préparer documents à l'avance"]
      },
      {
        id: "alert_003",
        type: "warning",
        category: "regulatory",
        priority: "high", 
        severity: 4,
        title: "Nouvelle réglementation UE détectée",
        message: "Règlement UE 2024/1157 affecte vos envois de produits électroniques",
        detailedMessage: "Nouvelle réglementation entrée en vigueur le 1er octobre 2024 concernant la cybersécurité des appareils IoT. Impact sur 15 de vos envois actifs.",
        source: "external_api",
        actions: [
          {
            id: "compliance_check", 
            label: "Vérification conformité",
            type: "primary",
            action: "navigate",
            params: { view: "customs", mode: "compliance" },
            icon: Shield
          },
          {
            id: "expert_call",
            label: "Consultation réglementaire",
            type: "secondary",
            action: "navigate",
            params: { view: "demo-scheduler", type: "regulatory" },
            icon: Calendar
          }
        ],
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        status: "active",
        impactScore: 75,
        confidenceLevel: 100,
        affectedRegion: ["UE", "Royaume-Uni"],
        channels: ["in_app", "email"],
        mlTags: ["regulatory_change", "electronics", "compliance_required"]
      },
      {
        id: "alert_004",
        type: "info",
        category: "ai_insight",
        priority: "medium",
        severity: 2,
        title: "Patron détecté dans vos envois",
        message: "L'IA identifie une tendance: vos envois vers l'Allemagne sont 23% plus lents le jeudi",
        detailedMessage: "Analyse de 90 jours: envois expédiés le jeudi subissent des délais moyens de +5.2h. Recommandation: privilégier mardi/mercredi pour optimiser les délais.",
        source: "predictive_model",
        actions: [
          {
            id: "optimize_schedule",
            label: "Optimiser planning",
            type: "primary", 
            action: "navigate",
            params: { view: "shipments", mode: "schedule" },
            icon: Calendar
          },
          {
            id: "view_analytics",
            label: "Voir analyses",
            type: "secondary",
            action: "navigate",
            params: { view: "reports", tab: "patterns" },
            icon: BarChart3
          }
        ],
        autoResolve: true,
        autoResolveIn: 1440, // 24h
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        status: "active",
        impactScore: 45,
        confidenceLevel: 87,
        estimatedSavings: 150,
        channels: ["in_app"],
        mlTags: ["pattern_analysis", "delivery_optimization", "time_savings"]
      },
      {
        id: "alert_005",
        type: "success",
        category: "operational", 
        priority: "low",
        severity: 1,
        title: "Consolidation automatique réussie",
        message: "3 de vos envois ont été automatiquement regroupés - Économie: €127",
        detailedMessage: "Notre IA a automatiquement optimisé vos envois vers Amsterdam: BE-2024-445, BE-2024-446, BE-2024-447 regroupés dans le groupe GRP-NL-089.",
        source: "ai_engine",
        shipmentId: "GRP-NL-089",
        actions: [
          {
            id: "track_group",
            label: "Suivre le groupe", 
            type: "primary",
            action: "navigate",
            params: { view: "tracking", shipmentId: "GRP-NL-089" },
            icon: MapPin
          }
        ],
        autoResolve: true,
        autoResolveIn: 60,
        timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
        status: "active",
        impactScore: 35,
        confidenceLevel: 100,
        estimatedSavings: 127,
        location: "Anvers → Amsterdam",
        channels: ["in_app"],
        mlTags: ["auto_optimization", "cost_savings", "efficiency"]
      },
      {
        id: "alert_006",
        type: "warning",
        category: "financial",
        priority: "medium",
        severity: 3,
        title: "Anomalie de coût détectée",
        message: "Frais douaniers 340% plus élevés que prévu pour BE-2024-334",
        detailedMessage: "Analyse: Frais prévus €45, facturés €153. Cause probable: mauvaise classification HS. Vérification et réclamation automatique initiée.",
        source: "ai_engine",
        shipmentId: "BE-2024-334",
        actions: [
          {
            id: "review_charges",
            label: "Examiner frais",
            type: "primary",
            action: "navigate", 
            params: { view: "shipments", filter: "billing", shipmentId: "BE-2024-334" },
            icon: DollarSign
          },
          {
            id: "dispute_charges",
            label: "Contester charges",
            type: "secondary",
            action: "navigate",
            params: { view: "help", topic: "billing_dispute" },
            requiresConfirmation: true,
            icon: AlertTriangle
          }
        ],
        timestamp: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
        status: "active", 
        impactScore: 60,
        confidenceLevel: 92,
        potentialLoss: 108,
        channels: ["in_app", "email"],
        mlTags: ["cost_anomaly", "billing_error", "requires_review"],
        riskFactors: ["unexpected_charges", "hs_classification"]
      }
    ];

    return mockAlerts.filter(alert => {
      // Filtrer selon les préférences
      const categoryPref = settings.categoryPreferences[alert.category];
      if (!categoryPref?.enabled) return false;
      if (alert.severity < settings.minimumSeverity) return false;
      if (showOnlyUrgent && alert.priority !== "urgent") return false;
      
      return true;
    });
  }, [settings, showOnlyUrgent]);

  // Initialisation et simulation temps réel
  useEffect(() => {
    const initialAlerts = generateIntelligentAlerts();
    setAlerts(initialAlerts);

    // Simulation d'arrivée de nouvelles alertes
    const interval = setInterval(() => {
      if (!isPaused && isConnected) {
        const randomChance = Math.random();
        if (randomChance < 0.3) { // 30% de chance d'une nouvelle alerte toutes les 10s
          const newAlerts = generateIntelligentAlerts();
          const existingIds = new Set(alerts.map(a => a.id));
          const reallyNewAlerts = newAlerts.filter(a => !existingIds.has(a.id));
          
          if (reallyNewAlerts.length > 0) {
            const newestAlert = reallyNewAlerts[0];
            setAlerts(prev => [newestAlert, ...prev.slice(0, 49)]); // Limite à 50 alertes
            setLastUpdate(new Date());
            
            // Notification sonore pour alertes critiques
            if (soundEnabled && newestAlert.severity >= 4) {
              playNotificationSound(newestAlert.type);
            }
            
            // Toast pour alertes urgentes
            if (newestAlert.priority === "urgent") {
              toast.error(newestAlert.title, {
                description: newestAlert.message,
                action: newestAlert.actions?.[0] ? {
                  label: newestAlert.actions[0].label,
                  onClick: () => handleAlertAction(newestAlert.actions![0], newestAlert)
                } : undefined
              });
            }
          }
        }
        
        // Auto-résolution des alertes expirées
        setAlerts(prev => prev.map(alert => {
          if (alert.autoResolve && alert.autoResolveIn) {
            const createdAt = new Date(alert.timestamp);
            const shouldResolve = Date.now() - createdAt.getTime() > alert.autoResolveIn * 60 * 1000;
            if (shouldResolve && alert.status === "active") {
              return { ...alert, status: "resolved", resolvedAt: new Date().toISOString() };
            }
          }
          return alert;
        }));
      }
    }, 10000); // Vérification toutes les 10 secondes

    return () => clearInterval(interval);
  }, [generateIntelligentAlerts, alerts, isPaused, isConnected, soundEnabled]);

  // Fonctions utilitaires
  const playNotificationSound = (type: string) => {
    // Simulation de sons différents selon le type
    console.log(`🔊 Son d'alerte ${type}`);
  };

  const handleAlertAction = (action: AlertAction, alert: IntelligentAlert) => {
    if (action.requiresConfirmation) {
      if (!confirm(`Confirmer l'action: ${action.label}?`)) return;
    }

    switch (action.action) {
      case "navigate":
        if (action.params && onNavigate) {
          onNavigate(action.params.view, action.params);
        }
        break;
      case "acknowledge":
        acknowledgeAlert(alert.id);
        break;
      case "resolve":
        resolveAlert(alert.id);
        break;
      case "snooze":
        snoozeAlert(alert.id, action.params?.minutes || 60);
        break;
    }

    // Marquer comme traité
    acknowledgeAlert(alert.id);
    
    toast.success("Action exécutée", {
      description: `${action.label} pour: ${alert.title}`
    });
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: "acknowledged", acknowledgedAt: new Date().toISOString() }
        : alert
    ));
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: "resolved", resolvedAt: new Date().toISOString() }
        : alert
    ));
  };

  const snoozeAlert = (alertId: string, minutes: number) => {
    const snoozeUntil = new Date(Date.now() + minutes * 60 * 1000).toISOString();
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: "snoozed", snoozeUntil }
        : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const markAsHelpful = (alertId: string, helpful: boolean) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { 
            ...alert, 
            userReaction: helpful ? "helpful" : "not_helpful", 
            feedbackGiven: true 
          }
        : alert
    ));
    
    toast.success("Merci pour votre retour !", {
      description: "Cela nous aide à améliorer notre IA"
    });
  };

  // Filtrage et tri des alertes
  const filteredAlerts = useMemo(() => {
    let filtered = alerts.filter(alert => {
      if (alert.status === "resolved" || alert.status === "expired") return false;
      if (alert.status === "snoozed" && alert.snoozeUntil && new Date(alert.snoozeUntil) > new Date()) return false;
      if (filterCategory !== "all" && alert.category !== filterCategory) return false;
      if (filterPriority !== "all" && alert.priority !== filterPriority) return false;
      return true;
    });

    // Tri par priorité et time
    filtered.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      const severityDiff = b.severity - a.severity;
      if (severityDiff !== 0) return severityDiff;
      
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return filtered.slice(0, maxDisplayed);
  }, [alerts, filterCategory, filterPriority, maxDisplayed]);

  // Statistiques
  const stats = useMemo(() => {
    const active = alerts.filter(a => a.status === "active");
    return {
      total: alerts.length,
      active: active.length,
      urgent: active.filter(a => a.priority === "urgent").length,
      critical: active.filter(a => a.type === "critical").length,
      opportunities: active.filter(a => a.type === "opportunity").length,
      potentialSavings: active.reduce((sum, a) => sum + (a.estimatedSavings || 0), 0),
      potentialLoss: active.reduce((sum, a) => sum + (a.potentialLoss || 0), 0),
      avgConfidence: active.length > 0 ? Math.round(active.reduce((sum, a) => sum + a.confidenceLevel, 0) / active.length) : 0
    };
  }, [alerts]);

  // Icônes et couleurs
  const getAlertIcon = (alert: IntelligentAlert) => {
    const iconMap = {
      customs: Shield,
      consolidation: Truck, 
      delivery: Package,
      regulatory: FileX,
      financial: DollarSign,
      operational: Settings,
      ai_insight: Brain,
      optimization: TrendingUp
    };
    return iconMap[alert.category] || Bell;
  };

  const getTypeColor = (type: string, severity: number) => {
    const baseColors = {
      critical: severity >= 4 ? "border-red-500 bg-red-50" : "border-red-400 bg-red-50",
      warning: severity >= 3 ? "border-amber-500 bg-amber-50" : "border-amber-400 bg-amber-50", 
      info: "border-blue-400 bg-blue-50",
      success: "border-green-400 bg-green-50",
      opportunity: "border-purple-400 bg-purple-50"
    };
    return baseColors[type as keyof typeof baseColors] || "border-gray-400 bg-gray-50";
  };

  const getPriorityBadge = (priority: string, severity: number) => {
    const configs = {
      urgent: { label: "🚨 URGENT", className: "bg-red-600 text-white animate-pulse" },
      high: { label: "⚡ Priorité haute", className: severity >= 4 ? "bg-red-500 text-white" : "bg-orange-500 text-white" },
      medium: { label: "⚠️ Moyen", className: "bg-amber-500 text-white" },
      low: { label: "ℹ️ Info", className: "bg-blue-500 text-white" }
    };
    const config = configs[priority as keyof typeof configs];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  if (compactMode) {
    // Mode compact pour intégration dans le dashboard
    return (
      <Card className="border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-[#1E40AF]" />
              Alertes intelligentes
              {stats.urgent > 0 && (
                <Badge className="bg-red-600 text-white animate-pulse">
                  {stats.urgent} urgent{stats.urgent > 1 ? 's' : ''}
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate?.('notifications')}
              >
                Voir tout ({stats.active})
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredAlerts.slice(0, 3).map(alert => {
              const IconComponent = getAlertIcon(alert);
              return (
                <div 
                  key={alert.id}
                  className={`p-3 border-l-4 rounded-r-lg ${getTypeColor(alert.type, alert.severity)} cursor-pointer hover:shadow-md transition-all`}
                  onClick={() => alert.actions?.[0] && handleAlertAction(alert.actions[0], alert)}
                >
                  <div className="flex items-start gap-3">
                    <IconComponent className="h-4 w-4 mt-0.5 text-gray-600" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{alert.title}</p>
                        {getPriorityBadge(alert.priority, alert.severity)}
                      </div>
                      <p className="text-xs text-gray-600">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(alert.timestamp).toLocaleTimeString('fr-FR')}</span>
                        {alert.confidenceLevel && (
                          <Badge variant="outline" className="text-xs">
                            IA: {alert.confidenceLevel}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredAlerts.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="text-sm">Tout va bien !</p>
                <p className="text-xs">Aucune alerte active</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Mode complet pour page dédiée
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* Header avec statistiques */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Brain className="h-8 w-8 text-[#1E40AF]" />
            Alertes intelligentes
            <Badge className="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white">
              IA hubdispo
            </Badge>
          </h1>
          <p className="text-gray-600 mt-1">
            Surveillance prédictive et optimisation automatique de vos flux logistiques
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            {isConnected ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
            <span className={isConnected ? "text-green-600" : "text-red-600"}>
              {isConnected ? "Connecté" : "Déconnecté"}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {isPaused ? "Reprendre" : "Pause"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
            Paramètres
          </Button>
        </div>
      </div>

      {/* Statistiques temps réel */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="h-6 w-6 mx-auto mb-2 text-[#1E40AF]" />
            <p className="text-2xl font-bold">{stats.active}</p>
            <p className="text-xs text-gray-600">Alertes actives</p>
          </CardContent>
        </Card>
        
        <Card className={stats.urgent > 0 ? "border-red-200 bg-red-50" : ""}>
          <CardContent className="p-4 text-center">
            <AlertTriangle className={`h-6 w-6 mx-auto mb-2 ${stats.urgent > 0 ? "text-red-500" : "text-gray-400"}`} />
            <p className={`text-2xl font-bold ${stats.urgent > 0 ? "text-red-600" : ""}`}>{stats.urgent}</p>
            <p className="text-xs text-gray-600">Urgentes</p>
          </CardContent>
        </Card>
        
        <Card className={stats.opportunities > 0 ? "border-purple-200 bg-purple-50" : ""}>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold text-purple-600">{stats.opportunities}</p>
            <p className="text-xs text-gray-600">Opportunités</p>
          </CardContent>
        </Card>
        
        <Card className={stats.potentialSavings > 0 ? "border-green-200 bg-green-50" : ""}>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold text-green-600">€{stats.potentialSavings}</p>
            <p className="text-xs text-gray-600">Économies possibles</p>
          </CardContent>
        </Card>
        
        <Card className={stats.potentialLoss > 0 ? "border-amber-200 bg-amber-50" : ""}>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-6 w-6 mx-auto mb-2 text-amber-500" />
            <p className="text-2xl font-bold text-amber-600">€{stats.potentialLoss}</p>
            <p className="text-xs text-gray-600">Risques identifiés</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="h-6 w-6 mx-auto mb-2 text-[#1E40AF]" />
            <p className="text-2xl font-bold">{stats.avgConfidence}%</p>
            <p className="text-xs text-gray-600">Confiance IA</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et contrôles */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Toutes catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="customs">🛃 Douane</SelectItem>
                  <SelectItem value="consolidation">📦 Consolidation</SelectItem>
                  <SelectItem value="delivery">🚚 Livraison</SelectItem>
                  <SelectItem value="regulatory">📋 Réglementaire</SelectItem>
                  <SelectItem value="financial">💰 Financier</SelectItem>
                  <SelectItem value="operational">⚙️ Opérationnel</SelectItem>
                  <SelectItem value="ai_insight">🧠 Insights IA</SelectItem>
                  <SelectItem value="optimization">📈 Optimisation</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Toutes priorités" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes priorités</SelectItem>
                  <SelectItem value="urgent">🚨 Urgent</SelectItem>
                  <SelectItem value="high">⚡ Priorité haute</SelectItem>
                  <SelectItem value="medium">⚠️ Moyen</SelectItem>
                  <SelectItem value="low">ℹ️ Faible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Dernière MAJ: {lastUpdate.toLocaleTimeString('fr-FR')}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des alertes */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Excellente nouvelle !</h3>
              <p className="text-gray-600">
                Aucune alerte active. Votre activité logistique fonctionne parfaitement.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map(alert => {
            const IconComponent = getAlertIcon(alert);
            return (
              <Card 
                key={alert.id} 
                className={`border-l-4 ${getTypeColor(alert.type, alert.severity)} hover:shadow-lg transition-all`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`p-3 rounded-full ${
                        alert.severity >= 4 ? 'bg-red-100' :
                        alert.severity >= 3 ? 'bg-amber-100' : 
                        'bg-blue-100'
                      }`}>
                        <IconComponent className={`h-6 w-6 ${
                          alert.severity >= 4 ? 'text-red-600' :
                          alert.severity >= 3 ? 'text-amber-600' :
                          'text-blue-600'
                        }`} />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{alert.title}</h3>
                            {getPriorityBadge(alert.priority, alert.severity)}
                            {alert.autoResolve && (
                              <Badge variant="outline" className="text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                Auto-résolution
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-gray-700 mb-2">{alert.message}</p>
                          
                          {alert.detailedMessage && (
                            <details className="mb-3">
                              <summary className="text-sm text-[#1E40AF] cursor-pointer hover:underline">
                                Voir détails techniques
                              </summary>
                              <p className="text-sm text-gray-600 mt-2 pl-4 border-l-2 border-gray-200">
                                {alert.detailedMessage}
                              </p>
                            </details>
                          )}
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {new Date(alert.timestamp).toLocaleString('fr-FR')}
                            </span>
                            
                            {alert.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {alert.location}
                              </span>
                            )}
                            
                            {alert.shipmentId && (
                              <span className="flex items-center gap-1">
                                <Package className="h-4 w-4" />
                                {alert.shipmentId}
                              </span>
                            )}
                            
                            <span className="flex items-center gap-1">
                              <Brain className="h-4 w-4" />
                              Confiance: {alert.confidenceLevel}%
                            </span>
                          </div>
                          
                          {/* Impact métrics */}
                          <div className="flex flex-wrap gap-4 mb-4">
                            {alert.estimatedSavings && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium text-green-700">
                                  +€{alert.estimatedSavings} économie
                                </span>
                              </div>
                            )}
                            
                            {alert.potentialLoss && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-red-100 rounded-full">
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                                <span className="text-sm font-medium text-red-700">
                                  -€{alert.potentialLoss} risque
                                </span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
                              <Target className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-700">
                                Impact: {alert.impactScore}/100
                              </span>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          {alert.actions && alert.actions.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {alert.actions.map(action => (
                                <Button
                                  key={action.id}
                                  variant={action.type === "primary" ? "default" : action.type === "danger" ? "destructive" : "outline"}
                                  size="sm"
                                  onClick={() => handleAlertAction(action, alert)}
                                  className="flex items-center gap-2"
                                >
                                  {action.icon && <action.icon className="h-4 w-4" />}
                                  {action.label}
                                  {action.estimatedTime && (
                                    <Badge variant="secondary" className="ml-2 text-xs">
                                      {action.estimatedTime}
                                    </Badge>
                                  )}
                                </Button>
                              ))}
                            </div>
                          )}
                          
                          {/* Recommendations IA */}
                          {alert.recommendations && alert.recommendations.length > 0 && (
                            <div className="bg-blue-50 p-3 rounded-lg mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Lightbulb className="h-4 w-4 text-blue-600" />
                                <span className="font-medium text-blue-800">Recommandations IA</span>
                              </div>
                              <ul className="space-y-1">
                                {alert.recommendations.map((rec, idx) => (
                                  <li key={idx} className="text-sm text-blue-700 flex items-start gap-2">
                                    <span className="text-blue-400">•</span>
                                    {rec}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        
                        {/* Actions rapides */}
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => snoozeAlert(alert.id, 60)}
                            title="Reporter 1h"
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="ghost" 
                            size="sm"
                            onClick={() => acknowledgeAlert(alert.id)}
                            title="Marquer comme vu"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dismissAlert(alert.id)}
                            title="Ignorer"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Feedback IA */}
                      {!alert.feedbackGiven && (
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <span className="text-sm text-gray-600">Cette alerte vous a-t-elle été utile ?</span>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsHelpful(alert.id, true)}
                            >
                              👍 Oui
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsHelpful(alert.id, false)}
                            >
                              👎 Non
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Configuration avancée */}
      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle>Configuration des alertes intelligentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="channels" className="space-y-6">
              <TabsList>
                <TabsTrigger value="channels">Canaux</TabsTrigger>
                <TabsTrigger value="filters">Filtres</TabsTrigger>
                <TabsTrigger value="ai">IA & Prédictions</TabsTrigger>
                <TabsTrigger value="automation">Automatisation</TabsTrigger>
              </TabsList>

              <TabsContent value="channels" className="space-y-4">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Canaux de notification</h4>
                    
                    {[
                      { id: "in_app", label: "Application", icon: Bell },
                      { id: "email", label: "Email", icon: Mail },
                      { id: "push", label: "Notifications push", icon: Smartphone },
                      { id: "sms", label: "SMS", icon: MessageSquare }
                    ].map(channel => (
                      <div key={channel.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <channel.icon className="h-5 w-5 text-gray-600" />
                          <span>{channel.label}</span>
                        </div>
                        <Switch
                          checked={settings.enabledChannels.includes(channel.id as NotificationChannel)}
                          onCheckedChange={(checked) => {
                            const newChannels = checked 
                              ? [...settings.enabledChannels, channel.id as NotificationChannel]
                              : settings.enabledChannels.filter(c => c !== channel.id);
                            setSettings(prev => ({ ...prev, enabledChannels: newChannels }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Préférences de timing</h4>
                    
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span>Heures silencieuses</span>
                        <Switch
                          checked={settings.quietHours.enabled}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({ 
                              ...prev, 
                              quietHours: { ...prev.quietHours, enabled: checked }
                            }))
                          }
                        />
                      </div>
                      {settings.quietHours.enabled && (
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-sm text-gray-600">Début</label>
                            <input
                              type="time"
                              value={settings.quietHours.start}
                              onChange={(e) => setSettings(prev => ({ 
                                ...prev, 
                                quietHours: { ...prev.quietHours, start: e.target.value }
                              }))}
                              className="w-full p-2 border rounded"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Fin</label>
                            <input
                              type="time"
                              value={settings.quietHours.end}
                              onChange={(e) => setSettings(prev => ({ 
                                ...prev, 
                                quietHours: { ...prev.quietHours, end: e.target.value }
                              }))}
                              className="w-full p-2 border rounded"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="filters" className="space-y-4">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Seuils de sévérité</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Sévérité minimale</label>
                        <Select 
                          value={settings.minimumSeverity.toString()} 
                          onValueChange={(value) => setSettings(prev => ({ ...prev, minimumSeverity: parseInt(value) }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 - Très faible</SelectItem>
                            <SelectItem value="2">2 - Faible</SelectItem>
                            <SelectItem value="3">3 - Moyen</SelectItem>
                            <SelectItem value="4">4 - Élevé</SelectItem>
                            <SelectItem value="5">5 - Critique</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span>Grouper alertes similaires</span>
                        <Switch
                          checked={settings.groupSimilarAlerts}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, groupSimilarAlerts: checked }))}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span>Auto-acquittement priorité faible</span>
                        <Switch
                          checked={settings.autoAcknowledgeLowPriority}
                          onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoAcknowledgeLowPriority: checked }))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Catégories d'alertes</h4>
                    <div className="space-y-3">
                      {Object.entries(settings.categoryPreferences).map(([category, prefs]) => (
                        <div key={category} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="capitalize">{category.replace('_', ' ')}</span>
                            <Switch
                              checked={prefs.enabled}
                              onCheckedChange={(checked) => setSettings(prev => ({
                                ...prev,
                                categoryPreferences: {
                                  ...prev.categoryPreferences,
                                  [category]: { ...prefs, enabled: checked }
                                }
                              }))}
                            />
                          </div>
                          {prefs.enabled && (
                            <div>
                              <label className="text-xs text-gray-600">Seuil: {prefs.severity}</label>
                              <input
                                type="range"
                                min="1"
                                max="5"
                                value={prefs.severity}
                                onChange={(e) => setSettings(prev => ({
                                  ...prev,
                                  categoryPreferences: {
                                    ...prev.categoryPreferences,
                                    [category]: { ...prefs, severity: parseInt(e.target.value) }
                                  }
                                }))}
                                className="w-full"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai" className="space-y-4">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Intelligence artificielle</h4>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">Alertes prédictives</span>
                        <p className="text-sm text-gray-600">IA anticipe les problèmes</p>
                      </div>
                      <Switch
                        checked={settings.enablePredictiveAlerts}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enablePredictiveAlerts: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">Mode apprentissage</span>
                        <p className="text-sm text-gray-600">IA s'adapte à vos préférences</p>
                      </div>
                      <Switch
                        checked={settings.learningMode}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, learningMode: checked }))}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-600">Seuil de confiance IA: {settings.confidenceThreshold}%</label>
                      <input
                        type="range"
                        min="50"
                        max="99"
                        value={settings.confidenceThreshold}
                        onChange={(e) => setSettings(prev => ({ ...prev, confidenceThreshold: parseInt(e.target.value) }))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Plus d'alertes</span>
                        <span>Plus précis</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Performance IA</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Précision globale</span>
                        <span className="font-semibold">91.2%</span>
                      </div>
                      <Progress value={91.2} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span className="text-sm">Faux positifs</span>
                        <span className="font-semibold">3.1%</span>
                      </div>
                      <Progress value={3.1} className="h-2" />
                      
                      <div className="flex justify-between">
                        <span className="text-sm">Économies détectées</span>
                        <span className="font-semibold">€12,450</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm">Problèmes évités</span>
                        <span className="font-semibold">47</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="automation" className="space-y-4">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Actions automatiques</h4>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">Auto-résolution</span>
                        <p className="text-sm text-gray-600">Résoudre automatiquement certaines alertes</p>
                      </div>
                      <Switch
                        checked={settings.autoResolveEnabled}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoResolveEnabled: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">Auto-snooze récurrentes</span>
                        <p className="text-sm text-gray-600">Reporter automatiquement les alertes répétitives</p>
                      </div>
                      <Switch
                        checked={settings.autoSnoozeRecurring}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoSnoozeRecurring: checked }))}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-600">Max alertes/heure: {settings.maxAlertsPerHour}</label>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={settings.maxAlertsPerHour}
                        onChange={(e) => setSettings(prev => ({ ...prev, maxAlertsPerHour: parseInt(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Mode digest</h4>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">Activer le mode digest</span>
                        <p className="text-sm text-gray-600">Regrouper les alertes par période</p>
                      </div>
                      <Switch
                        checked={settings.digestMode}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, digestMode: checked }))}
                      />
                    </div>
                    
                    {settings.digestMode && (
                      <div>
                        <label className="text-sm text-gray-600">Fréquence</label>
                        <Select 
                          value={settings.digestFrequency} 
                          onValueChange={(value) => setSettings(prev => ({ ...prev, digestFrequency: value as any }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Toutes les heures</SelectItem>
                            <SelectItem value="daily">Quotidien</SelectItem>
                            <SelectItem value="weekly">Hebdomadaire</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}