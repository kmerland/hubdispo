// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import InteractiveMap from './InteractiveMap';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { MapPin, ArrowLeft, Filter, Share2, Download } from 'lucide-react';
import { Badge } from './ui/badge';

interface MapViewProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function MapView({ onNavigate }: MapViewProps) {
  const handleBack = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  // Données pour démonstration
  const activeRoutes = [
    { 
      id: 'BE-2024-001', 
      origin: 'Bruxelles', 
      destination: 'Amsterdam', 
      status: 'En transit',
      estimatedTime: '2h 30min',
      distance: '174 km'
    },
    { 
      id: 'BE-2024-002', 
      origin: 'Anvers', 
      destination: 'Hamburg', 
      status: 'En douane',
      estimatedTime: '4h 15min',
      distance: '286 km'
    },
    { 
      id: 'BE-2024-003', 
      origin: 'Gand', 
      destination: 'Cologne', 
      status: 'Consolidation',
      estimatedTime: '6h 45min',
      distance: '245 km'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En transit':
        return 'bg-blue-100 text-blue-700';
      case 'En douane':
        return 'bg-amber-100 text-amber-700';
      case 'Consolidation':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Données de localisation pour la carte
  const mapLocations = [
    {
      id: '1',
      name: 'Bruxelles',
      lat: 50.8503,
      lng: 4.3517,
      type: 'origin' as const,
      status: 'completed' as const,
      details: 'Point de départ - Collecte effectuée'
    },
    {
      id: '2', 
      name: 'Anvers',
      lat: 51.2194,
      lng: 4.4025,
      type: 'port' as const,
      status: 'in-progress' as const,
      eta: '2h 30min',
      details: 'Hub de consolidation - En cours de traitement'
    },
    {
      id: '3',
      name: 'Amsterdam',
      lat: 52.3676,
      lng: 4.9041,
      type: 'destination' as const,
      status: 'pending' as const,
      eta: '4h 15min',
      details: 'Destination finale - En attente'
    },
    {
      id: '4',
      name: 'Hamburg',
      lat: 53.5511,
      lng: 9.9937,
      type: 'customs' as const,
      status: 'delay' as const,
      eta: '6h 45min',
      details: 'Contrôle douanier - Retard temporaire'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Vue cartographique des trajets</h1>
            <p className="text-gray-600">Visualisez tous vos envois en temps réel</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtrer
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Partager
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Trajets actifs</p>
              <p className="text-xl font-semibold">12</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-sm font-semibold text-green-600">KM</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Distance totale</p>
              <p className="text-xl font-semibold">2,847</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-sm font-semibold text-orange-600">⏱️</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Temps moyen</p>
              <p className="text-xl font-semibold">4.2h</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-sm font-semibold text-purple-600">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Économies</p>
              <p className="text-xl font-semibold text-[#10B981]">€1,240</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Carte principale */}
        <div className="lg:col-span-2">
          <InteractiveMap 
            locations={mapLocations}
            onLocationSelect={(location) => {
              // Gérer la sélection de localisation
              console.log('Location selected:', location);
            }}
          />
        </div>

        {/* Sidebar avec les trajets actifs */}
        <div className="space-y-4">
          <Card>
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Trajets en cours</h3>
              <p className="text-sm text-gray-600">{activeRoutes.length} envois actifs</p>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {activeRoutes.map((route) => (
                <div 
                  key={route.id} 
                  className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onNavigate && onNavigate('tracking', { shipmentId: route.id })}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm">{route.id}</p>
                      <p className="text-xs text-gray-600">{route.origin} → {route.destination}</p>
                    </div>
                    <Badge className={getStatusColor(route.status)}>
                      {route.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div>
                      <span className="font-medium">Distance:</span> {route.distance}
                    </div>
                    <div>
                      <span className="font-medium">ETA:</span> {route.estimatedTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Légende */}
          <Card className="p-4">
            <h4 className="font-semibold mb-3">Légende</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                <span>Étape terminée</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1E40AF] animate-pulse"></div>
                <span>Étape en cours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span>Étape à venir</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span>Retard ou problème</span>
              </div>
            </div>
          </Card>

          {/* Actions rapides */}
          <Card className="p-4">
            <h4 className="font-semibold mb-3">Actions rapides</h4>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => onNavigate && onNavigate('new-shipment')}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Créer un nouveau trajet
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => onNavigate && onNavigate('consolidation')}
              >
                <span className="mr-2">🏭</span>
                Voir les consolidations
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => onNavigate && onNavigate('customs')}
              >
                <span className="mr-2">🛃</span>
                Statuts douaniers
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}