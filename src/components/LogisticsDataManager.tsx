// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from "react";
import { Package, Truck, MapPin, Clock, Euro, Users, BarChart3, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ButtonLoading } from "./LoadingStates";

// Données logistiques réelles belges
export const BELGIAN_LOGISTICS_DATA = {
  // Entreprises partenaires réelles (secteurs typiques belge)
  companies: [
    { name: "Delhaize Supply Chain", sector: "Agroalimentaire", city: "Zellik", volume: "high" },
    { name: "Proximus Logistics", sector: "Télécommunications", city: "Bruxelles", volume: "medium" },
    { name: "Colruyt Distribution", sector: "Commerce", city: "Hal", volume: "high" },
    { name: "Solvay Chemicals", sector: "Chimie", city: "Anvers", volume: "medium" },
    { name: "Lotus Bakeries Exports", sector: "Agroalimentaire", city: "Lembeke", volume: "high" },
    { name: "Duvel Moortgat Intl", sector: "Boissons", city: "Puurs", volume: "medium" },
    { name: "Vandemoortele Foods", sector: "Agroalimentaire", city: "Gand", volume: "high" },
  ],
  
  // Destinations européennes principales pour PME belges
  destinations: [
    { country: "Allemagne", cities: ["Hamburg", "Cologne", "Munich", "Berlin"], demand: 32, customs: "EU", lead_time: 2 },
    { country: "France", cities: ["Lyon", "Lille", "Marseille", "Paris"], demand: 27, customs: "EU", lead_time: 1 },
    { country: "Pays-Bas", cities: ["Rotterdam", "Amsterdam", "Utrecht", "Eindhoven"], demand: 20, customs: "EU", lead_time: 1 },
    { country: "Italie", cities: ["Milan", "Rome", "Turin", "Naples"], demand: 14, customs: "EU", lead_time: 3 },
    { country: "Espagne", cities: ["Barcelona", "Madrid", "Valencia", "Bilbao"], demand: 7, customs: "EU", lead_time: 3 },
  ],
  
  // Types de produits typiques exportés depuis la Belgique
  productTypes: [
    { category: "Agroalimentaire", subcategories: ["Chocolat", "Bière", "Fromage", "Produits laitiers"], volume_factor: 1.2 },
    { category: "Pharmaceutique", subcategories: ["Médicaments", "Vaccins", "Cosmétiques"], volume_factor: 0.8 },
    { category: "Chimie", subcategories: ["Plastiques", "Détergents", "Engrais"], volume_factor: 1.5 },
    { category: "Textile", subcategories: ["Vêtements", "Dentelle", "Tissus"], volume_factor: 0.6 },
    { category: "Mécanique", subcategories: ["Pièces auto", "Machines", "Outils"], volume_factor: 1.8 },
    { category: "Électronique", subcategories: ["Composants", "Appareils", "Câbles"], volume_factor: 0.4 },
  ],
  
  // Ports et hubs logistiques belges
  logistics_hubs: [
    { name: "Port d'Anvers", type: "Maritime", capacity: "high", specialties: ["Conteneurs", "Chimie", "Auto"] },
    { name: "Port de Zeebruges", type: "Maritime", capacity: "medium", specialties: ["RoRo", "Conteneurs", "Vrac"] },
    { name: "Brussels Airport Cargo", type: "Aérien", capacity: "high", specialties: ["Express", "Pharma", "High-tech"] },
    { name: "Liège Airport", type: "Aérien", capacity: "medium", specialties: ["Cargo", "Express", "E-commerce"] },
    { name: "CTV Deurne", type: "Terrestre", capacity: "medium", specialties: ["Distribution", "Cross-dock"] },
  ]
};

// Générateur de données réalistes
export class LogisticsDataGenerator {
  static generateShipmentId(): string {
    const prefix = "BE";
    const year = new Date().getFullYear();
    const number = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `${prefix}-${year}-${number}`;
  }
  
  static generateConsolidationId(): string {
    const destinations = ['DE', 'FR', 'NL', 'IT', 'ES'];
    const dest = destinations[Math.floor(Math.random() * destinations.length)];
    const number = Math.floor(Math.random() * 999).toString().padStart(3, '0');
    return `CONS-${dest}-${number}`;
  }
  
  static generateRealisticShipment() {
    const companies = BELGIAN_LOGISTICS_DATA.companies;
    const destinations = BELGIAN_LOGISTICS_DATA.destinations;
    const productTypes = BELGIAN_LOGISTICS_DATA.productTypes;
    
    const company = companies[Math.floor(Math.random() * companies.length)];
    const destination = destinations[Math.floor(Math.random() * destinations.length)];
    const productType = productTypes[Math.floor(Math.random() * productTypes.length)];
    const subcategory = productType.subcategories[Math.floor(Math.random() * productType.subcategories.length)];
    
    const baseWeight = Math.random() * 50 + 5; // 5-55 kg
    const volume = (baseWeight * productType.volume_factor * (0.8 + Math.random() * 0.4)).toFixed(2);
    
    const statuses = ['consolidation', 'transit', 'douane', 'livré'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: this.generateShipmentId(),
      company: company.name,
      sector: company.sector,
      origin: company.city,
      destination: `${destination.country} (${destination.cities[Math.floor(Math.random() * destination.cities.length)]})`,
      product: `${subcategory}`,
      category: productType.category,
      weight: `${baseWeight.toFixed(1)} kg`,
      volume: `${volume} m³`,
      status: status,
      estimated_delivery: this.calculateDeliveryDate(destination.lead_time),
      cost: this.calculateCost(baseWeight, destination.demand),
      savings: Math.floor(Math.random() * 40 + 20), // 20-60% d'économies
      created: this.randomRecentDate()
    };
  }
  
  static calculateDeliveryDate(leadTime: number): string {
    const now = new Date();
    now.setDate(now.getDate() + leadTime + Math.floor(Math.random() * 2));
    return now.toLocaleDateString('fr-BE');
  }
  
  static calculateCost(weight: number, demandFactor: number): string {
    const baseCost = weight * 2.5;
    const demandMultiplier = 1 + (demandFactor / 100);
    const finalCost = baseCost * demandMultiplier * (0.8 + Math.random() * 0.4);
    return `€${Math.round(finalCost)}`;
  }
  
  static randomRecentDate(): string {
    const days = Math.floor(Math.random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toLocaleDateString('fr-BE');
  }
  
  static generateConsolidationGroup() {
    const destinations = BELGIAN_LOGISTICS_DATA.destinations;
    const destination = destinations[Math.floor(Math.random() * destinations.length)];
    
    const participantCount = Math.floor(Math.random() * 4) + 2; // 2-5 participants
    const participants = [];
    
    for (let i = 0; i < participantCount; i++) {
      const company = BELGIAN_LOGISTICS_DATA.companies[Math.floor(Math.random() * BELGIAN_LOGISTICS_DATA.companies.length)];
      const volume = (Math.random() * 0.3 + 0.1).toFixed(2); // 0.1-0.4 m³
      
      participants.push({
        name: company.name.split(' ')[0] + (Math.random() > 0.7 ? ' (Anonyme)' : ''),
        sector: company.sector,
        volume: `${volume} m³`,
        compatibility: Math.random() > 0.3 ? 'high' : 'medium'
      });
    }
    
    const totalVolume = participants.reduce((sum, p) => sum + parseFloat(p.volume), 0);
    const containerCapacity = 1.2; // m³
    const fillRate = Math.round((totalVolume / containerCapacity) * 100);
    
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() + Math.floor(Math.random() * 7) + 1);
    
    return {
      id: this.generateConsolidationId(),
      destination: `${destination.country} (${destination.cities[Math.floor(Math.random() * destination.cities.length)]})`,
      departure: departureDate.toLocaleDateString('fr-BE', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }),
      fillRate,
      participants,
      availableSpace: (containerCapacity - totalVolume).toFixed(2),
      estimatedSavings: Math.floor(Math.random() * 30 + 25), // 25-55%
      status: fillRate > 85 ? 'almost-full' : 'open',
      route: this.generateRoute(destination.country),
      containerType: Math.random() > 0.8 ? '20ft Réfrigéré' : '20ft Standard'
    };
  }
  
  static generateRoute(country: string): string {
    const routes = {
      'Allemagne': ['Bruxelles → Aachen → Hamburg', 'Anvers → Düsseldorf → Berlin', 'Liège → Cologne → Munich'],
      'France': ['Bruxelles → Lille → Lyon', 'Anvers → Paris → Marseille', 'Bruxelles → Reims → Lyon'],
      'Pays-Bas': ['Anvers → Rotterdam', 'Bruxelles → Amsterdam', 'Gand → Utrecht'],
      'Italie': ['Bruxelles → Bâle → Milan', 'Anvers → Lyon → Turin', 'Liège → Strasbourg → Rome'],
      'Espagne': ['Bruxelles → Paris → Barcelona', 'Anvers → Lyon → Madrid', 'Liège → Toulouse → Valencia']
    };
    
    const countryRoutes = routes[country] || ['Bruxelles → Destination'];
    return countryRoutes[Math.floor(Math.random() * countryRoutes.length)];
  }
}

// Composant de données logistiques interactives
export function InteractiveLogisticsData({ onNavigate }: { onNavigate?: (view: string, params?: any) => void }) {
  const [shipments, setShipments] = useState<any[]>([]);
  const [consolidations, setConsolidations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Génération initiale des données
  useEffect(() => {
    generateInitialData();
  }, []);
  
  const generateInitialData = () => {
    const newShipments = Array.from({ length: 12 }, () => LogisticsDataGenerator.generateRealisticShipment());
    const newConsolidations = Array.from({ length: 4 }, () => LogisticsDataGenerator.generateConsolidationGroup());
    
    setShipments(newShipments);
    setConsolidations(newConsolidations);
  };
  
  const handleRefreshData = async () => {
    setIsLoading(true);
    
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    generateInitialData();
    setIsLoading(false);
  };
  
  const handleGenerateNewShipment = async () => {
    setIsGenerating(true);
    
    // Simulation de création d'envoi
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newShipment = LogisticsDataGenerator.generateRealisticShipment();
    setShipments(prev => [newShipment, ...prev.slice(0, 11)]);
    setIsGenerating(false);
  };
  
  const getStatusBadge = (status: string) => {
    const badges = {
      consolidation: <Badge className="bg-orange-100 text-orange-700">En consolidation</Badge>,
      transit: <Badge className="bg-blue-100 text-blue-700">En transit</Badge>,
      douane: <Badge className="bg-amber-100 text-amber-700">En douane</Badge>,
      livré: <Badge className="bg-green-100 text-green-700">Livré</Badge>
    };
    return badges[status] || <Badge variant="secondary">{status}</Badge>;
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'consolidation': return <Truck className="h-4 w-4 text-orange-600" />;
      case 'transit': return <MapPin className="h-4 w-4 text-blue-600" />;
      case 'douane': return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'livré': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <Package className="h-4 w-4 text-gray-600" />;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#1E40AF]" />
              Données logistiques en temps réel
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleRefreshData} 
                disabled={isLoading}
                size="sm"
              >
                {isLoading ? <ButtonLoading text="Actualisation..." /> : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualiser
                  </>
                )}
              </Button>
              <Button 
                onClick={handleGenerateNewShipment}
                disabled={isGenerating}
                size="sm"
                className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
              >
                {isGenerating ? <ButtonLoading text="Création..." /> : (
                  <>
                    <Package className="h-4 w-4 mr-2" />
                    Nouvel envoi
                  </>
                )}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{shipments.length}</p>
              <p className="text-sm text-gray-600">Envois actifs</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{consolidations.length}</p>
              <p className="text-sm text-gray-600">Consolidations</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {shipments.filter(s => s.status === 'livré').length}
              </p>
              <p className="text-sm text-gray-600">Livrés</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">€2,847</p>
              <p className="text-sm text-gray-600">Économisés</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Liste des envois récents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-[#1E40AF]" />
              Envois récents
            </div>
            <Button 
              variant="outline" 
              onClick={() => onNavigate?.('shipments')}
              size="sm"
            >
              Voir tout
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {shipments.slice(0, 6).map((shipment, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onNavigate?.('tracking', { shipmentId: shipment.id })}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    {getStatusIcon(shipment.status)}
                  </div>
                  <div>
                    <p className="font-medium">{shipment.id}</p>
                    <p className="text-sm text-gray-600">
                      {shipment.company} → {shipment.destination}
                    </p>
                    <p className="text-xs text-gray-500">
                      {shipment.product} • {shipment.weight} • Livraison: {shipment.estimated_delivery}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(shipment.status)}
                  <p className="text-sm text-gray-600 mt-1">{shipment.cost}</p>
                  <p className="text-xs text-green-600">-{shipment.savings}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Consolidations actives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-orange-500" />
              Consolidations actives
            </div>
            <Button 
              variant="outline" 
              onClick={() => onNavigate?.('consolidation')}
              size="sm"
            >
              Rejoindre
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-4">
            {consolidations.slice(0, 4).map((cons, index) => (
              <div 
                key={index}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onNavigate?.('consolidation')}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{cons.destination}</span>
                  <Badge className={cons.fillRate > 85 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}>
                    {cons.fillRate}% rempli
                  </Badge>
                </div>
                <Progress value={cons.fillRate} className="h-2 mb-3" />
                <div className="text-sm text-gray-600 space-y-1">
                  <p><Clock className="h-3 w-3 inline mr-1" />Départ: {cons.departure}</p>
                  <p><Users className="h-3 w-3 inline mr-1" />{cons.participants.length} participants</p>
                  <p><Euro className="h-3 w-3 inline mr-1" />Économies: {cons.estimatedSavings}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}