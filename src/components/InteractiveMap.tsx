// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Navigation, Package, Clock, Truck } from 'lucide-react';

export interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'origin' | 'destination' | 'warehouse' | 'port' | 'customs';
  status: 'completed' | 'in-progress' | 'pending' | 'delay';
  eta?: string;
  details?: string;
}

interface InteractiveMapProps {
  locations?: MapLocation[];
  onLocationSelect?: (location: MapLocation) => void;
  shipmentId?: string;
  className?: string;
}

export default function InteractiveMap({ 
  locations = [], 
  onLocationSelect,
  shipmentId,
  className 
}: InteractiveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-400';
      case 'delay': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'origin': return <Package className="h-4 w-4" />;
      case 'destination': return <MapPin className="h-4 w-4" />;
      case 'warehouse': return <Package className="h-4 w-4" />;
      case 'port': return <Navigation className="h-4 w-4" />;
      case 'customs': return <Clock className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
    onLocationSelect?.(location);
  };

  return (
    <div className={`space-y-4 ${className || ''}`}>
      {/* Map placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Suivi géographique
            {shipmentId && (
              <Badge variant="outline" className="ml-auto">
                {shipmentId}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
            {/* Simplified route visualization */}
            <div className="absolute inset-4 flex items-center">
              <div className="flex-1 flex items-center justify-between">
                {locations.map((location, index) => (
                  <div key={location.id} className="flex flex-col items-center group">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLocationClick(location)}
                      className={`
                        h-12 w-12 rounded-full p-0 border-2 
                        ${selectedLocation?.id === location.id ? 'border-[#1E40AF] bg-[#1E40AF] text-white' : 'border-gray-300 bg-white'}
                        ${getStatusColor(location.status)} hover:scale-110 transition-all
                      `}
                    >
                      {getTypeIcon(location.type)}
                    </Button>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-medium text-gray-700 truncate max-w-20">
                        {location.name}
                      </p>
                      <Badge 
                        variant={location.status === 'completed' ? 'default' : 'secondary'}
                        className="text-xs mt-1"
                      >
                        {location.status}
                      </Badge>
                    </div>
                    
                    {/* Route line */}
                    {index < locations.length - 1 && (
                      <div className="absolute top-6 left-1/2 w-full h-0.5 bg-[#1E40AF] transform -translate-y-1/2 z-0" 
                           style={{ left: '50%', width: 'calc(100% / ' + locations.length + ')' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Map overlay message */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 border">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4" />
                  <span>Carte interactive bientôt disponible</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location details */}
      {selectedLocation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getTypeIcon(selectedLocation.type)}
              {selectedLocation.name}
              <Badge className={getStatusColor(selectedLocation.status)}>
                {selectedLocation.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-500">Type:</span>
                <p className="capitalize">{selectedLocation.type}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500">Statut:</span>
                <p className="capitalize">{selectedLocation.status}</p>
              </div>
              {selectedLocation.eta && (
                <div>
                  <span className="font-medium text-gray-500">ETA:</span>
                  <p>{selectedLocation.eta}</p>
                </div>
              )}
              <div>
                <span className="font-medium text-gray-500">Coordonnées:</span>
                <p>{selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}</p>
              </div>
            </div>
            
            {selectedLocation.details && (
              <div>
                <span className="font-medium text-gray-500">Détails:</span>
                <p className="text-sm mt-1">{selectedLocation.details}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Route summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Itinéraire</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {locations.map((location, index) => (
              <div 
                key={location.id}
                className={`
                  flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                  ${selectedLocation?.id === location.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}
                `}
                onClick={() => handleLocationClick(location)}
              >
                <div className={`h-3 w-3 rounded-full ${getStatusColor(location.status)}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(location.type)}
                    <span className="font-medium">{location.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {location.type}
                    </Badge>
                  </div>
                  {location.eta && (
                    <p className="text-sm text-gray-600 mt-1">ETA: {location.eta}</p>
                  )}
                </div>
                <Badge className={getStatusColor(location.status)}>
                  {location.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}