// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { Package, MapPin, Clock, CheckCircle, AlertTriangle, Truck, Plane, FileText, MessageCircle, Share2, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import InteractiveMap from "./InteractiveMap";

interface TrackingDetailProps {
  shipmentId: string;
  onNavigate?: (view: string, params?: any) => void;
}

export default function TrackingDetail({ shipmentId, onNavigate }: TrackingDetailProps) {
  const [showNotifications, setShowNotifications] = useState(true);
  const [shareLink, setShareLink] = useState("");
  const [dynamicEstimate, setDynamicEstimate] = useState("");

  const shipmentData = {
    "BE-2024-001": {
      id: "BE-2024-001",
      destination: "Allemagne (Hamburg)",
      status: "consolidation",
      currentStep: 1,
      estimatedDelivery: "8-10 Octobre 2024",
      consolidationGroup: "CONS-DE-001"
    },
    "BE-2024-002": {
      id: "BE-2024-002", 
      destination: "France (Lyon)",
      status: "transit",
      currentStep: 3,
      estimatedDelivery: "5-7 Octobre 2024",
      consolidationGroup: "CONS-FR-002"
    },
    "BE-2024-003": {
      id: "BE-2024-003",
      destination: "Pays-Bas (Amsterdam)",
      status: "customs",
      currentStep: 4,
      estimatedDelivery: "4-6 Octobre 2024",
      consolidationGroup: "CONS-NL-003"
    }
  };

  const shipment = shipmentData[shipmentId as keyof typeof shipmentData] || shipmentData["BE-2024-001"];

  const timelineSteps = [
    { 
      id: 1, 
      title: "Entrepôt de consolidation", 
      description: "Votre colis est arrivé à notre entrepôt",
      icon: Package,
      completed: true,
      timestamp: "30 Sept, 14:30"
    },
    { 
      id: 2, 
      title: "Consolidation", 
      description: "Regroupement avec d'autres envois",
      icon: Truck,
      completed: shipment.currentStep >= 2,
      timestamp: shipment.currentStep >= 2 ? "1 Oct, 09:15" : undefined,
      current: shipment.currentStep === 1
    },
    { 
      id: 3, 
      title: "Chargement et départ", 
      description: "Transport vers le pays de destination",
      icon: Plane,
      completed: shipment.currentStep >= 3,
      timestamp: shipment.currentStep >= 3 ? "2 Oct, 06:00" : undefined,
      current: shipment.currentStep === 2
    },
    { 
      id: 4, 
      title: "Contrôle douanier", 
      description: "Inspection aux douanes de Zeebruges",
      icon: FileText,
      completed: shipment.currentStep >= 4,
      timestamp: shipment.currentStep >= 4 ? "3 Oct, 11:20" : undefined,
      current: shipment.currentStep === 3,
      alert: shipment.status === "customs"
    },
    { 
      id: 5, 
      title: "Livraison finale", 
      description: "Remise au destinataire",
      icon: CheckCircle,
      completed: shipment.currentStep >= 5,
      timestamp: shipment.currentStep >= 5 ? "4 Oct, 16:45" : undefined,
      current: shipment.currentStep === 4
    }
  ];

  const notifications = [
    {
      time: "Il y a 2h",
      message: "Votre colis est en inspection douanière depuis 2h",
      type: "info"
    },
    {
      time: "Hier, 18:30",
      message: "Colis arrivé au terminal de Zeebruges",
      type: "success"
    },
    {
      time: "2 Oct, 06:00",
      message: "Départ du transport consolidé vers l'Allemagne",
      type: "success"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "consolidation":
        return <Badge className="bg-orange-100 text-orange-700">En consolidation</Badge>;
      case "transit":
        return <Badge className="bg-blue-100 text-blue-700">En transit</Badge>;
      case "customs":
        return <Badge className="bg-amber-100 text-amber-700">En douane</Badge>;
      case "delivered":
        return <Badge className="bg-[#10B981] text-white">Livré</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Suivi de l'envoi {shipment.id}</h1>
          <p className="text-gray-600">Destination: {shipment.destination}</p>
        </div>
        {getStatusBadge(shipment.status)}
      </div>

      {/* Alert for customs inspection */}
      {shipment.status === "customs" && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-1" />
                <div>
                  <p className="font-medium text-amber-800">Inspection douanière en cours</p>
                  <p className="text-sm text-amber-700">
                    Votre colis est actuellement vérifié par les autorités douanières. 
                    Délai estimé: 2-4h supplémentaires.
                  </p>
                </div>
              </div>
              <Button size="sm" className="bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-white">
                Contacter le support
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline & Map */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Suivi de livraison</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="timeline">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="map">Carte interactive</TabsTrigger>
                </TabsList>
                
                <TabsContent value="timeline" className="mt-6">
              <div className="space-y-6">
                {timelineSteps.map((step, index) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        step.completed 
                          ? 'bg-[#10B981] border-[#10B981] text-white' 
                          : step.current 
                            ? step.alert 
                              ? 'bg-amber-100 border-amber-500 text-amber-600'
                              : 'bg-[#1E40AF] border-[#1E40AF] text-white animate-pulse'
                            : 'bg-gray-100 border-gray-300 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : step.alert ? (
                          <AlertTriangle className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      {index < timelineSteps.length - 1 && (
                        <div className={`w-px h-12 mt-2 ${
                          step.completed ? 'bg-[#10B981]' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                    
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className={`font-medium ${
                            step.current ? 'text-[#1E40AF]' : step.completed ? 'text-[#10B981]' : 'text-gray-600'
                          }`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                          {step.current && !step.completed && (
                            <div className="mt-2">
                              <p className="text-xs text-[#1E40AF] font-medium">⏳ En cours...</p>
                            </div>
                          )}
                        </div>
                        {step.timestamp && (
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {step.timestamp}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
                </TabsContent>
                
                <TabsContent value="map" className="mt-6">
                  <InteractiveMap shipmentId={shipment.id} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Detailed Customs Status */}
          {shipment.status === "customs" && (
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <FileText className="h-5 w-5" />
                  Statut douanier détaillé
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Bureau de douane</p>
                    <p className="font-medium">Zeebruges Port</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Type d'inspection</p>
                    <p className="font-medium">Contrôle documentaire</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Temps d'inspection</p>
                    <p className="font-medium">2h 15min</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Agent référent</p>
                    <p className="font-medium">A. Dubois</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm"><strong>Raison du contrôle :</strong> Vérification de conformité pour produits électroniques</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Partage du tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Partage du suivi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input 
                  value={`https://track.hubdispo.be/${shipment.id}`}
                  readOnly
                  className="text-sm"
                />
                <Button 
                  size="sm" 
                  onClick={() => {
                    navigator.clipboard.writeText(`https://track.hubdispo.be/${shipment.id}`);
                    setShareLink("copié");
                    setTimeout(() => setShareLink(""), 2000);
                  }}
                >
                  {shareLink === "copié" ? "✓" : "Copier"}
                </Button>
              </div>
              <p className="text-xs text-gray-600">
                Partagez ce lien sécurisé avec votre destinataire pour qu'il puisse suivre la livraison
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setShareLink("envoyé")}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Envoyer par email
              </Button>
            </CardContent>
          </Card>

          {/* Shipment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Informations de l'envoi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">ID d'envoi</span>
                <span className="font-medium">{shipment.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Destination</span>
                <span className="font-medium">{shipment.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Groupe de consolidation</span>
                <span className="font-medium text-[#1E40AF]">{shipment.consolidationGroup}</span>
              </div>
              
              {/* Estimation dynamique */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-[#1E40AF]" />
                  <span className="text-sm font-medium">Estimation mise à jour</span>
                </div>
                <p className="text-sm text-gray-700">
                  <strong>Livraison prévue :</strong> {shipment.estimatedDelivery}
                </p>
                {shipment.status === "customs" && (
                  <p className="text-xs text-amber-600 mt-1">
                    ⚠️ Délai ajusté : +2-4h en raison du contrôle douanier
                  </p>
                )}
              </div>
              
              <div className="pt-2 border-t">
                <Progress value={(shipment.currentStep / 5) * 100} className="h-2" />
                <p className="text-xs text-gray-600 mt-2 text-center">
                  {shipment.currentStep}/5 étapes complétées
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Notifications récentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification, index) => (
                <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'success' ? 'bg-[#10B981]' : 'bg-blue-500'
                  }`} />
                  <div>
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions disponibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contacter le support
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Télécharger les documents
              </Button>
              <Button variant="outline" className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                Voir sur la carte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}