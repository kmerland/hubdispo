// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from "react";
import { 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Truck, 
  Plane,
  FileText, 
  MessageCircle, 
  Share2, 
  Eye,
  Phone,
  Mail,
  Download,
  RefreshCw,
  Navigation,
  Calendar,
  User,
  Building,
  Euro,
  Weight,
  Ruler,
  Camera,
  Bell,
  ExternalLink,
  ArrowLeft
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription } from "./ui/alert";
import { useToast } from "./ToastProvider";

interface EnhancedTrackingDetailProps {
  shipmentId: string;
  onNavigate?: (view: string, params?: any) => void;
}

// Données de suivi détaillées pour différents envois
const shipmentDatabase = {
  "SHP-2024-001": {
    id: "SHP-2024-001",
    trackingId: "TRK-BE-FR-001",
    company: "Chocolate Master SA",
    recipient: "La Petite Chocolaterie",
    destination: "Paris, France",
    destinationAddress: "15 Rue de Rivoli, 75001 Paris",
    status: "en_transit",
    currentStep: 3,
    totalSteps: 5,
    progress: 75,
    estimatedDelivery: "2024-10-03T16:00:00",
    items: ["Chocolats artisanaux (2kg)", "Pralines belges (1kg)", "Truffes assortiment (500g)"],
    value: "€450.00",
    weight: "3.5kg",
    dimensions: "40x30x15cm",
    carrier: "EuroLogistics",
    driverName: "Marc Dubois",
    driverPhone: "+33 6 12 34 56 78",
    consolidationGroup: "CON-FR-001",
    priority: "standard",
    insurance: true,
    temperatureControlled: false,
    currentLocation: {
      city: "Reims, France",
      coordinates: { lat: 49.2583, lng: 4.0317 },
      timestamp: "2024-10-02T14:30:00",
      description: "Centre de tri - Préparation livraison finale"
    },
    route: [
      { city: "Bruxelles", country: "Belgique", completed: true },
      { city: "Lille", country: "France", completed: true },
      { city: "Reims", country: "France", completed: true, current: true },
      { city: "Paris", country: "France", completed: false }
    ],
    timeline: [
      {
        id: 1,
        title: "Colis collecté",
        description: "Collecte effectuée chez Chocolate Master SA",
        timestamp: "2024-09-30T10:15:00",
        status: "completed",
        location: "Bruxelles, Belgique",
        details: "Colis pris en charge par notre équipe de collecte",
        proof: "signature_collecte.pdf"
      },
      {
        id: 2,
        title: "Consolidation en cours",
        description: "Regroupement avec d'autres envois vers Paris",
        timestamp: "2024-09-30T16:45:00",
        status: "completed",
        location: "Hub Anvers, Belgique",
        details: "Colis intégré au groupe CON-FR-001 (8 participants)",
        savings: "€139.50 économisés grâce à la consolidation"
      },
      {
        id: 3,
        title: "Transport vers la France",
        description: "Départ du camion consolidé",
        timestamp: "2024-10-01T08:30:00",
        status: "completed",
        location: "Autoroute A1, Belgique-France",
        details: "Transport par EuroLogistics - Chauffeur: Marc Dubois",
        vehicle: "BE-123-ABC"
      },
      {
        id: 4,
        title: "Passage frontière",
        description: "Contrôle douanier effectué",
        timestamp: "2024-10-01T11:20:00",
        status: "completed",
        location: "Frontière Tournai-Lille",
        details: "Documents vérifiés - Passage autorisé",
        customs: "Déclaration douanière validée"
      },
      {
        id: 5,
        title: "Centre de tri France",
        description: "Tri et préparation livraison",
        timestamp: "2024-10-02T14:30:00",
        status: "current",
        location: "Reims, France",
        details: "Préparation pour la livraison finale à Paris",
        estimatedNext: "2024-10-03T09:00:00"
      },
      {
        id: 6,
        title: "Livraison finale",
        description: "Remise au destinataire",
        timestamp: null,
        status: "pending",
        location: "Paris, France",
        details: "Livraison prévue entre 14h et 18h",
        estimatedTime: "2024-10-03T16:00:00",
        requiresSignature: true
      }
    ],
    documents: [
      { name: "Facture commerciale", status: "available", url: "#" },
      { name: "Liste de colisage", status: "available", url: "#" },
      { name: "Certificat d'origine", status: "available", url: "#" },
      { name: "Déclaration douanière", status: "available", url: "#" },
      { name: "Preuve de livraison", status: "pending", url: null }
    ],
    notifications: [
      {
        id: 1,
        type: "info",
        message: "Votre colis est en route vers Paris",
        timestamp: "2024-10-02T14:30:00",
        read: false
      },
      {
        id: 2,
        type: "success",
        message: "Passage frontière effectué avec succès",
        timestamp: "2024-10-01T11:20:00",
        read: true
      },
      {
        id: 3,
        type: "savings",
        message: "Économie de €139.50 grâce à la consolidation",
        timestamp: "2024-09-30T16:45:00",
        read: true
      }
    ],
    issues: [],
    photos: [
      { type: "package", timestamp: "2024-09-30T10:15:00", description: "Colis à la collecte" },
      { type: "consolidation", timestamp: "2024-09-30T16:45:00", description: "Regroupement au hub" }
    ]
  },
  "SHP-2024-002": {
    id: "SHP-2024-002",
    trackingId: "TRK-BE-DE-002",
    company: "Beer Export BVBA",
    recipient: "German Beer House",
    destination: "Berlin, Allemagne",
    destinationAddress: "Alexanderplatz 5, 10178 Berlin",
    status: "customs",
    currentStep: 4,
    totalSteps: 6,
    progress: 65,
    estimatedDelivery: "2024-10-05T15:00:00",
    items: ["Bières spéciales belges (24 bouteilles)", "Accessoires de dégustation"],
    value: "€280.00",
    weight: "18kg",
    dimensions: "60x40x25cm",
    carrier: "BeNeLux Express",
    driverName: "Klaus Mueller",
    driverPhone: "+49 30 12345678",
    consolidationGroup: "CON-DE-002",
    priority: "standard",
    insurance: true,
    temperatureControlled: false,
    currentLocation: {
      city: "Aachen, Allemagne",
      coordinates: { lat: 50.7753, lng: 6.0839 },
      timestamp: "2024-10-02T16:45:00",
      description: "Bureau de douane - Contrôle en cours"
    },
    timeline: [
      {
        id: 1,
        title: "Colis collecté",
        description: "Collecte effectuée chez Beer Export BVBA",
        timestamp: "2024-09-28T14:20:00",
        status: "completed",
        location: "Bruges, Belgique"
      },
      {
        id: 2,
        title: "Consolidation terminée",
        description: "Groupe complet pour Berlin",
        timestamp: "2024-09-29T11:30:00",
        status: "completed",
        location: "Hub Bruxelles"
      },
      {
        id: 3,
        title: "Transport vers l'Allemagne",
        description: "Départ du camion",
        timestamp: "2024-10-01T07:15:00",
        status: "completed",
        location: "Autoroute E40"
      },
      {
        id: 4,
        title: "Contrôle douanier",
        description: "Vérification documents alcool",
        timestamp: "2024-10-02T16:45:00",
        status: "current",
        location: "Aachen, Allemagne",
        alert: "Documents additionnels requis pour les boissons alcoolisées"
      },
      {
        id: 5,
        title: "Transport final",
        description: "Route vers Berlin",
        timestamp: null,
        status: "pending",
        location: "Berlin, Allemagne"
      },
      {
        id: 6,
        title: "Livraison",
        description: "Remise au destinataire",
        timestamp: null,
        status: "pending",
        location: "Berlin, Allemagne"
      }
    ],
    documents: [
      { name: "Facture commerciale", status: "available", url: "#" },
      { name: "Licence export alcool", status: "available", url: "#" },
      { name: "Certificat qualité", status: "available", url: "#" },
      { name: "Documents douaniers ALL", status: "required", url: null }
    ],
    notifications: [
      {
        id: 1,
        type: "warning",
        message: "Documents additionnels requis aux douanes",
        timestamp: "2024-10-02T16:45:00",
        read: false
      }
    ],
    issues: [
      {
        type: "customs",
        severity: "medium",
        message: "Documents douaniers allemands requis pour l'alcool",
        action: "Fournir la licence d'importation allemande",
        deadline: "2024-10-03T18:00:00"
      }
    ]
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered": return "bg-green-100 text-green-800";
    case "en_transit": return "bg-blue-100 text-blue-800";
    case "preparation": return "bg-yellow-100 text-yellow-800";
    case "consolidation": return "bg-purple-100 text-purple-800";
    case "customs": return "bg-orange-100 text-orange-800";
    case "delayed": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "delivered": return "Livré";
    case "en_transit": return "En transit";
    case "preparation": return "Préparation";
    case "consolidation": return "Consolidation";
    case "customs": return "En douane";
    case "delayed": return "Retardé";
    default: return status;
  }
};

export default function EnhancedTrackingDetail({ shipmentId, onNavigate }: EnhancedTrackingDetailProps) {
  const [activeTab, setActiveTab] = useState("tracking");
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { showToast } = useToast();

  // Récupérer les données de l'envoi
  const shipment = shipmentDatabase[shipmentId as keyof typeof shipmentDatabase] || shipmentDatabase["SHP-2024-001"];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
    showToast({
      type: 'success',
      message: 'Informations de suivi mises à jour',
      duration: 3000
    });
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/tracking/${shipment.trackingId}`;
    navigator.clipboard.writeText(shareUrl);
    showToast({
      type: 'success',
      message: 'Lien de suivi copié dans le presse-papiers',
      duration: 3000
    });
    setShowShareDialog(false);
  };

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleString('fr-BE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimelineStepIcon = (step: any) => {
    if (step.status === "completed") return CheckCircle;
    if (step.status === "current") return Clock;
    if (step.alert) return AlertTriangle;
    return Clock;
  };

  const getTimelineStepColor = (step: any) => {
    if (step.status === "completed") return "text-green-600";
    if (step.status === "current") return "text-blue-600";
    if (step.alert) return "text-orange-600";
    return "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate?.("shipments")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Package className="h-8 w-8 text-[#1E40AF]" />
                Suivi détaillé
              </h1>
              <p className="text-gray-600 mt-1">
                {shipment.id} • {shipment.destination}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Actualisation...' : 'Actualiser'}
            </Button>
            <Button variant="outline" onClick={() => setShowShareDialog(true)}>
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button onClick={() => onNavigate?.("new-shipment")}>
              <Package className="h-4 w-4 mr-2" />
              Nouvel envoi
            </Button>
          </div>
        </div>

        {/* Statut principal */}
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Truck className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getStatusColor(shipment.status)} className="text-lg px-3 py-1">
                      {getStatusLabel(shipment.status)}
                    </Badge>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {shipment.trackingId}
                    </code>
                  </div>
                  <h2 className="text-xl font-semibold">{shipment.currentLocation.description}</h2>
                  <p className="text-gray-600">
                    Dernière mise à jour: {formatTimestamp(shipment.currentLocation.timestamp)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#1E40AF] mb-1">
                  {shipment.progress}%
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  Étape {shipment.currentStep}/{shipment.totalSteps}
                </div>
                <Progress value={shipment.progress} className="w-32 h-3" />
              </div>
            </div>

            {/* Livraison estimée */}
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <span className="font-medium">Livraison estimée:</span>
                <span className="font-bold text-green-800">
                  {formatTimestamp(shipment.estimatedDelivery)}
                </span>
              </div>
            </div>

            {/* Problèmes détectés */}
            {shipment.issues && shipment.issues.length > 0 && (
              <div className="mt-4">
                {shipment.issues.map((issue, index) => (
                  <Alert key={index} className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-orange-800">{issue.message}</p>
                          <p className="text-orange-700 text-sm mt-1">{issue.action}</p>
                          {issue.deadline && (
                            <p className="text-orange-600 text-xs mt-1">
                              Échéance: {formatTimestamp(issue.deadline)}
                            </p>
                          )}
                        </div>
                        <Button size="sm" onClick={() => onNavigate?.("customs", { shipmentId })}>
                          Résoudre
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tracking">Suivi en temps réel</TabsTrigger>
            <TabsTrigger value="details">Détails de l'envoi</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="contact">Contact & Support</TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Timeline */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Historique de suivi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {shipment.timeline.map((step, index) => {
                        const IconComponent = getTimelineStepIcon(step);
                        const colorClass = getTimelineStepColor(step);
                        
                        return (
                          <div key={step.id} className="relative">
                            {index < shipment.timeline.length - 1 && (
                              <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                            )}
                            <div className="flex gap-4">
                              <div className={`p-2 rounded-full ${step.status === 'completed' ? 'bg-green-100' : step.status === 'current' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                <IconComponent className={`h-6 w-6 ${colorClass}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h3 className="font-semibold">{step.title}</h3>
                                  {step.timestamp && (
                                    <span className="text-xs text-gray-500">
                                      {formatTimestamp(step.timestamp)}
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-600 mb-2">{step.description}</p>
                                {step.details && (
                                  <p className="text-sm text-gray-500 mb-2">{step.details}</p>
                                )}
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-600">{step.location}</span>
                                </div>
                                {step.savings && (
                                  <div className="mt-2 p-2 bg-green-50 rounded text-sm text-green-800">
                                    💰 {step.savings}
                                  </div>
                                )}
                                {step.alert && (
                                  <div className="mt-2 p-2 bg-orange-50 rounded text-sm text-orange-800">
                                    ⚠️ {step.alert}
                                  </div>
                                )}
                                {step.estimatedNext && (
                                  <div className="mt-2 text-xs text-blue-600">
                                    Prochaine étape estimée: {formatTimestamp(step.estimatedNext)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Informations du transport */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Transporteur</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">{shipment.carrier}</p>
                      <p className="text-sm text-gray-600">Transporteur principal</p>
                    </div>
                    {shipment.driverName && (
                      <div>
                        <p className="font-medium">{shipment.driverName}</p>
                        <p className="text-sm text-gray-600">Chauffeur</p>
                        <Button size="sm" variant="outline" className="mt-2">
                          <Phone className="h-4 w-4 mr-2" />
                          Contacter
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Position actuelle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{shipment.currentLocation.city}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {shipment.currentLocation.description}
                      </p>
                      <Button size="sm" variant="outline" className="w-full mt-3">
                        <Navigation className="h-4 w-4 mr-2" />
                        Voir sur la carte
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications récentes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Notifications récentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {shipment.notifications.slice(0, 3).map((notification) => (
                        <div key={notification.id} className="p-2 bg-gray-50 rounded">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimestamp(notification.timestamp)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de l'envoi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Expéditeur</p>
                      <p className="font-medium">{shipment.company}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Destinataire</p>
                      <p className="font-medium">{shipment.recipient}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Adresse de livraison</p>
                    <p className="font-medium">{shipment.destinationAddress}</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Valeur</p>
                      <p className="font-medium text-[#1E40AF]">{shipment.value}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Poids</p>
                      <p className="font-medium">{shipment.weight}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Dimensions</p>
                      <p className="font-medium">{shipment.dimensions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contenu de l'envoi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {shipment.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <Package className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {shipment.consolidationGroup && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Consolidation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Groupe de consolidation</p>
                        <p className="font-medium">{shipment.consolidationGroup}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded">
                        <p className="text-sm text-green-800">
                          💰 Vous économisez grâce au groupage de colis
                        </p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => onNavigate?.("consolidation")}>
                        Voir le groupe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Services inclus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Assurance</span>
                      <Badge className={shipment.insurance ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {shipment.insurance ? "Incluse" : "Non incluse"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Contrôle température</span>
                      <Badge className={shipment.temperatureControlled ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>
                        {shipment.temperatureControlled ? "Oui" : "Non"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Priorité</span>
                      <Badge className="bg-gray-100 text-gray-800">
                        {shipment.priority === "standard" ? "Standard" : "Express"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documents de transport
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shipment.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-600">
                            {doc.status === "available" && "Disponible"}
                            {doc.status === "pending" && "En attente"}
                            {doc.status === "required" && "Requis"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.status === "available" && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </Button>
                        )}
                        {doc.status === "required" && (
                          <Badge className="bg-orange-100 text-orange-800">
                            Action requise
                          </Badge>
                        )}
                        {doc.status === "pending" && (
                          <Badge className="bg-gray-100 text-gray-800">
                            En attente
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Photos du colis */}
            {shipment.photos && shipment.photos.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Photos du colis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {shipment.photos.map((photo, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="w-full h-24 bg-gray-100 rounded mb-2 flex items-center justify-center">
                          <Camera className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-600">{photo.description}</p>
                        <p className="text-xs text-gray-500">{formatTimestamp(photo.timestamp)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact transporteur</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{shipment.carrier}</p>
                    <p className="text-sm text-gray-600">Service client disponible 24/7</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Téléphone
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>
                  {shipment.driverName && (
                    <div className="pt-3 border-t">
                      <p className="text-sm text-gray-600">Chauffeur assigné</p>
                      <p className="font-medium">{shipment.driverName}</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        <Phone className="h-4 w-4 mr-2" />
                        {shipment.driverPhone}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support HubDispo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Notre équipe est là pour vous aider avec votre envoi
                  </p>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full justify-start" onClick={() => onNavigate?.("help")}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat en direct
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      +32 2 123 45 67
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      support@hubdispo.be
                    </Button>
                  </div>
                  <div className="pt-3 border-t">
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Centre d'aide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialog de partage */}
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Partager le suivi</DialogTitle>
              <DialogDescription>
                Partagez ce lien de suivi avec votre destinataire
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Input 
                  value={`${window.location.origin}/tracking/${shipment.trackingId}`}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleShare} className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Copier le lien
                </Button>
                <Button variant="outline" onClick={() => setShowShareDialog(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}