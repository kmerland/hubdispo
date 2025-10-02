// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { 
  MapPin, Truck, Package, Clock, AlertTriangle, Navigation, 
  Filter, Layers, Info, RotateCcw, Maximize, Users, Euro 
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { useToast } from "./ToastProvider";
import { routeData, mockShipments, mockConsolidationGroups } from "./data/mockData";

interface InteractiveRouteMapProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function InteractiveRouteMap({ onNavigate }: InteractiveRouteMapProps) {
  const [selectedLayer, setSelectedLayer] = useState("all");
  const [showConsolidation, setShowConsolidation] = useState(true);
  const [showShipments, setShowShipments] = useState(true);
  const [showTraffic, setShowTraffic] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [mapView, setMapView] = useState<"satellite" | "street" | "terrain">("street");
  
  const { showToast } = useToast();

  // Données simulées de routes européennes depuis la Belgique
  const routes = [
    {
      id: "BE-FR-001",
      name: "Bruxelles → Paris",
      origin: { city: "Bruxelles", country: "BE", lat: 50.8503, lng: 4.3517 },
      destination: { city: "Paris", country: "FR", lat: 48.8566, lng: 2.3522 },
      distance: "320 km",
      duration: "3h 15min",
      traffic: "fluide",
      activeShipments: 8,
      status: "active",
      cost: "€45/envoi",
      consolidationSavings: "€180",
      waypoints: [
        { name: "Mons", lat: 50.4542, lng: 3.9564 },
        { name: "Valenciennes", lat: 50.3593, lng: 3.5253 },
        { name: "Saint-Quentin", lat: 49.8467, lng: 3.2872 }
      ]
    },
    {
      id: "BE-NL-002", 
      name: "Anvers → Amsterdam",
      origin: { city: "Anvers", country: "BE", lat: 51.2194, lng: 4.4025 },
      destination: { city: "Amsterdam", country: "NL", lat: 52.3676, lng: 4.9041 },
      distance: "165 km",
      duration: "1h 45min",
      traffic: "dense",
      activeShipments: 12,
      status: "active",
      cost: "€35/envoi",
      consolidationSavings: "€240",
      waypoints: [
        { name: "Breda", lat: 51.5719, lng: 4.7683 },
        { name: "Rotterdam", lat: 51.9244, lng: 4.4777 }
      ]
    },
    {
      id: "BE-DE-003",
      name: "Liège → Cologne", 
      origin: { city: "Liège", country: "BE", lat: 50.6326, lng: 5.5797 },
      destination: { city: "Cologne", country: "DE", lat: 50.9375, lng: 6.9603 },
      distance: "125 km",
      duration: "1h 30min",
      traffic: "fluide",
      activeShipments: 6,
      status: "active",
      cost: "€30/envoi",
      consolidationSavings: "€95",
      waypoints: [
        { name: "Aachen", lat: 50.7753, lng: 6.0839 }
      ]
    },
    {
      id: "BE-IT-004",
      name: "Gand → Milan",
      origin: { city: "Gand", country: "BE", lat: 51.0543, lng: 3.7174 },
      destination: { city: "Milan", country: "IT", lat: 45.4642, lng: 9.1900 },
      distance: "950 km",
      duration: "9h 30min",
      traffic: "embouteillages",
      activeShipments: 4,
      status: "delayed",
      cost: "€120/envoi",
      consolidationSavings: "€480",
      waypoints: [
        { name: "Luxembourg", lat: 49.6116, lng: 6.1319 },
        { name: "Strasbourg", lat: 48.5734, lng: 7.7521 },
        { name: "Zurich", lat: 47.3769, lng: 8.5417 }
      ]
    },
    {
      id: "BE-ES-005",
      name: "Charleroi → Barcelone",
      origin: { city: "Charleroi", country: "BE", lat: 50.4108, lng: 4.4446 },
      destination: { city: "Barcelone", country: "ES", lat: 41.3851, lng: 2.1734 },
      distance: "1200 km", 
      duration: "12h 00min",
      traffic: "fluide",
      activeShipments: 3,
      status: "consolidating",
      cost: "€150/envoi",
      consolidationSavings: "€350",
      waypoints: [
        { name: "Reims", lat: 49.2583, lng: 4.0317 },
        { name: "Lyon", lat: 45.7640, lng: 4.8357 },
        { name: "Montpellier", lat: 43.6108, lng: 3.8767 }
      ]
    }
  ];

  // Hubs de consolidation en Belgique
  const consolidationHubs = [
    {
      id: "HUB-ANT",
      name: "Hub Anvers",
      city: "Anvers",
      lat: 51.2194,
      lng: 4.4025,
      capacity: 1200,
      current: 850,
      utilization: 71,
      routes: 15,
      dailyVolume: 45
    },
    {
      id: "HUB-BRU",
      name: "Hub Bruxelles",
      city: "Bruxelles", 
      lat: 50.8503,
      lng: 4.3517,
      capacity: 800,
      current: 620,
      utilization: 78,
      routes: 12,
      dailyVolume: 38
    },
    {
      id: "HUB-LIE",
      name: "Hub Liège",
      city: "Liège",
      lat: 50.6326,
      lng: 5.5797,
      capacity: 600,
      current: 420,
      utilization: 70,
      routes: 8,
      dailyVolume: 28
    },
    {
      id: "HUB-GHT",
      name: "Hub Gand",
      city: "Gand",
      lat: 51.0543,
      lng: 3.7174,
      capacity: 500,
      current: 340,
      utilization: 68,
      routes: 6,
      dailyVolume: 22
    }
  ];

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case "fluide": return "text-green-600 bg-green-100";
      case "dense": return "text-orange-600 bg-orange-100";
      case "embouteillages": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600 bg-green-100";
      case "delayed": return "text-red-600 bg-red-100";
      case "consolidating": return "text-purple-600 bg-purple-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const handleRouteClick = (routeId: string) => {
    setSelectedRoute(routeId);
    const route = routes.find(r => r.id === routeId);
    if (route) {
      showToast({
        type: 'info',
        message: `Route ${route.name} sélectionnée - ${route.activeShipments} envois actifs`,
        duration: 3000
      });
    }
  };

  const handleHubClick = (hubId: string) => {
    const hub = consolidationHubs.find(h => h.id === hubId);
    if (hub) {
      onNavigate('consolidation', { hubId });
      showToast({
        type: 'info',
        message: `Redirection vers le hub ${hub.name}`,
        duration: 3000
      });
    }
  };

  const filteredRoutes = routes.filter(route => {
    if (selectedLayer === "all") return true;
    if (selectedLayer === "active") return route.status === "active";
    if (selectedLayer === "delayed") return route.status === "delayed";
    if (selectedLayer === "consolidating") return route.status === "consolidating";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <MapPin className="h-8 w-8 text-[#1E40AF]" />
              Carte des Routes
            </h1>
            <p className="text-gray-600 mt-1">
              Visualisez vos routes logistiques et opportunités de consolidation en temps réel
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => onNavigate('consolidation')}
              className="bg-[#10B981] hover:bg-[#10B981]/90"
            >
              <Users className="h-4 w-4 mr-2" />
              Voir Consolidations
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate('new-shipment')}
            >
              <Package className="h-4 w-4 mr-2" />
              Nouvel Envoi
            </Button>
          </div>
        </div>

        {/* Contrôles et Filtres */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Options d'Affichage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Select value={selectedLayer} onValueChange={setSelectedLayer}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer routes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les routes</SelectItem>
                  <SelectItem value="active">Routes actives</SelectItem>
                  <SelectItem value="delayed">Routes retardées</SelectItem>
                  <SelectItem value="consolidating">En consolidation</SelectItem>
                </SelectContent>
              </Select>

              <Select value={mapView} onValueChange={setMapView}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de carte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="street">Vue rue</SelectItem>
                  <SelectItem value="satellite">Satellite</SelectItem>
                  <SelectItem value="terrain">Relief</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Switch
                  id="consolidation"
                  checked={showConsolidation}
                  onCheckedChange={setShowConsolidation}
                />
                <label htmlFor="consolidation" className="text-sm font-medium">
                  Hubs consolidation
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="shipments"
                  checked={showShipments}
                  onCheckedChange={setShowShipments}
                />
                <label htmlFor="shipments" className="text-sm font-medium">
                  Envois actifs
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="traffic"
                  checked={showTraffic}
                  onCheckedChange={setShowTraffic}
                />
                <label htmlFor="traffic" className="text-sm font-medium">
                  Trafic temps réel
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Carte Principale (Mock) */}
          <div className="lg:col-span-3">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Carte Interactive Europe</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Centrer
                  </Button>
                  <Button variant="outline" size="sm">
                    <Maximize className="h-4 w-4 mr-2" />
                    Plein écran
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Simulation d'une carte interactive */}
                <div className="relative bg-gradient-to-br from-blue-100 to-green-100 h-96 lg:h-[600px] rounded-lg overflow-hidden">
                  
                  {/* Simulation de la carte avec positions */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                    
                    {/* Hubs de consolidation */}
                    {showConsolidation && consolidationHubs.map((hub) => (
                      <div
                        key={hub.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{
                          left: `${20 + (hub.lng - 3) * 15}%`,
                          top: `${80 - (hub.lat - 50) * 20}%`
                        }}
                        onClick={() => handleHubClick(hub.id)}
                      >
                        <div className="relative">
                          <div className="w-6 h-6 bg-[#10B981] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                            <Package className="h-3 w-3 text-white" />
                          </div>
                          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap border">
                            <div className="font-semibold">{hub.name}</div>
                            <div className="text-gray-600">{hub.current}/{hub.capacity}</div>
                            <div className="text-xs text-green-600">{hub.utilization}% utilisé</div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Routes */}
                    {filteredRoutes.map((route, index) => (
                      <div key={route.id}>
                        {/* Ligne de route simulée */}
                        <div
                          className={`absolute h-1 rounded transform origin-left cursor-pointer transition-all ${
                            selectedRoute === route.id 
                              ? 'bg-[#1E40AF] h-2 z-10' 
                              : route.status === 'active' 
                                ? 'bg-green-500' 
                                : route.status === 'delayed'
                                  ? 'bg-red-500'
                                  : 'bg-purple-500'
                          }`}
                          style={{
                            left: `${20 + (route.origin.lng - 3) * 15}%`,
                            top: `${80 - (route.origin.lat - 50) * 20}%`,
                            width: `${Math.abs(route.destination.lng - route.origin.lng) * 15}%`,
                            transform: `rotate(${Math.atan2(
                              (route.destination.lat - route.origin.lat) * -20,
                              (route.destination.lng - route.origin.lng) * 15
                            )}rad)`
                          }}
                          onClick={() => handleRouteClick(route.id)}
                        />

                        {/* Points origine et destination */}
                        <div
                          className="absolute transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                            left: `${20 + (route.origin.lng - 3) * 15}%`,
                            top: `${80 - (route.origin.lat - 50) * 20}%`
                          }}
                        >
                          <div className="w-3 h-3 bg-[#1E40AF] rounded-full border border-white"></div>
                        </div>
                        
                        <div
                          className="absolute transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                            left: `${20 + (route.destination.lng - 3) * 15}%`,
                            top: `${80 - (route.destination.lat - 50) * 20}%`
                          }}
                        >
                          <div className="w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                        </div>

                        {/* Envois en cours sur la route */}
                        {showShipments && route.activeShipments > 0 && (
                          <div
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                              left: `${20 + ((route.origin.lng + route.destination.lng) / 2 - 3) * 15}%`,
                              top: `${80 - ((route.origin.lat + route.destination.lat) / 2 - 50) * 20}%`
                            }}
                          >
                            <div className="bg-[#1E40AF] text-white text-xs px-2 py-1 rounded-full">
                              <Truck className="h-3 w-3 inline mr-1" />
                              {route.activeShipments}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Légende */}
                    <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border">
                      <h4 className="font-semibold text-sm mb-2">Légende</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
                          <span>Hubs consolidation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-1 bg-green-500 rounded"></div>
                          <span>Routes actives</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-1 bg-red-500 rounded"></div>
                          <span>Routes retardées</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-1 bg-purple-500 rounded"></div>
                          <span>En consolidation</span>
                        </div>
                      </div>
                    </div>

                    {/* Contrôles de zoom */}
                    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border">
                      <Button variant="ghost" size="sm" className="rounded-t-lg rounded-b-none">+</Button>
                      <hr />
                      <Button variant="ghost" size="sm" className="rounded-b-lg rounded-t-none">-</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panneau latéral */}
          <div className="space-y-6">
            
            {/* Informations route sélectionnée */}
            {selectedRoute && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Navigation className="h-5 w-5" />
                    Route Sélectionnée
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const route = routes.find(r => r.id === selectedRoute);
                    if (!route) return null;
                    
                    return (
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold">{route.name}</h3>
                          <p className="text-sm text-gray-600">{route.distance} • {route.duration}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500">Statut:</span>
                            <Badge className={getStatusColor(route.status)}>
                              {route.status === 'active' ? 'Actif' : 
                               route.status === 'delayed' ? 'Retardé' : 'Consolidation'}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-gray-500">Trafic:</span>
                            <Badge className={getTrafficColor(route.traffic)}>
                              {route.traffic}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Envois actifs:</span>
                            <span className="font-medium">{route.activeShipments}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Coût unitaire:</span>
                            <span className="font-medium">{route.cost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Économies consolidation:</span>
                            <span className="font-medium text-[#10B981]">{route.consolidationSavings}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button 
                            size="sm" 
                            className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                            onClick={() => onNavigate('shipments', { routeId: selectedRoute })}
                          >
                            Voir les envois
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="w-full"
                            onClick={() => onNavigate('consolidation', { routeId: selectedRoute })}
                          >
                            Rejoindre consolidation
                          </Button>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Statistiques Hubs */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Hubs de Consolidation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {consolidationHubs.map((hub) => (
                    <div 
                      key={hub.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleHubClick(hub.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{hub.name}</h4>
                        <Badge variant="outline">
                          {hub.utilization}%
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Capacité:</span>
                          <span>{hub.current}/{hub.capacity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Routes:</span>
                          <span>{hub.routes}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Volume/jour:</span>
                          <span>{hub.dailyVolume}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-[#10B981] h-1 rounded-full"
                          style={{ width: `${hub.utilization}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alertes Trafic */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Alertes Trafic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="font-medium text-sm">A1 Bruxelles-Anvers</span>
                    </div>
                    <p className="text-xs text-red-700">
                      Embouteillages - Retard estimé: +25 min
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-sm">E40 Vers Paris</span>
                    </div>
                    <p className="text-xs text-orange-700">
                      Trafic dense - Retard estimé: +10 min
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Navigation className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-sm">E25 Vers Luxembourg</span>
                    </div>
                    <p className="text-xs text-green-700">
                      Conditions optimales - Dans les temps
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </div>
  );
}