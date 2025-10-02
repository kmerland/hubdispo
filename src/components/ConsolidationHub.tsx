// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { Package, Users, Clock, MapPin, Lock, Filter, Eye, Building2, Layers, Search, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";

interface ConsolidationHubProps {
  onNavigate?: (view: string, params?: any) => void;
  newShipment?: any;
}

export default function ConsolidationHub({ onNavigate, newShipment }: ConsolidationHubProps) {
  const [filters, setFilters] = useState({
    destination: "",
    timeWindow: "",
    productType: "",
    maxVolume: ""
  });
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const consolidations = [
    {
      id: "CONS-DE-001",
      destination: "Allemagne (Hamburg)",
      departure: "Jeudi 3 Oct, 14h00",
      fillRate: 78,
      participants: [
        { name: "Marie L.", sector: "E-commerce", volume: "0.15 m³", company: "TechStore SPRL", compatibility: "high", anonymous: false },
        { name: "Pierre B.", sector: "Agroalimentaire", volume: "0.23 m³", company: "AgriFood SA", compatibility: "medium", anonymous: false },
        { name: "Sophie K.", sector: "Textile", volume: "0.18 m³", company: "Fashion Plus", compatibility: "high", anonymous: false },
        { name: "Vous", sector: "E-commerce", volume: "0.12 m³", company: "Votre entreprise", compatibility: "high", anonymous: false }
      ],
      status: "open",
      productTypes: ["électronique", "alimentaire", "textile"],
      route: "Bruxelles → Zeebruges → Hamburg",
      containerType: "20ft Standard",
      temperature: "Ambiante",
      availableSpace: "0.32 m³",
      estimatedSavings: "45%"
    },
    {
      id: "CONS-FR-002", 
      destination: "France (Lyon)",
      departure: "Vendredi 4 Oct, 10h30",
      fillRate: 45,
      participants: [
        { name: "Jean D.", sector: "Industrie", volume: "0.28 m³", company: "MetalParts", compatibility: "high", anonymous: false },
        { name: "Anna M.", sector: "Cosmétique", volume: "0.09 m³", company: "BeautyBox", compatibility: "high", anonymous: false }
      ],
      status: "open",
      productTypes: ["métaux", "cosmétiques"],
      route: "Bruxelles → Lyon",
      containerType: "20ft Standard", 
      temperature: "Ambiante",
      availableSpace: "0.63 m³",
      estimatedSavings: "38%"
    },
    {
      id: "CONS-NL-003",
      destination: "Pays-Bas (Amsterdam)", 
      departure: "Lundi 7 Oct, 09h00",
      fillRate: 23,
      participants: [
        { name: "Tom V.", sector: "Électronique", volume: "0.14 m³", company: "TechNL BV", compatibility: "high", anonymous: false }
      ],
      status: "open",
      productTypes: ["électronique"],
      route: "Anvers → Amsterdam",
      containerType: "20ft Standard",
      temperature: "Ambiante", 
      availableSpace: "0.86 m³",
      estimatedSavings: "35%"
    },
    {
      id: "CONS-IT-004",
      destination: "Italie (Milan)",
      departure: "Mardi 8 Oct, 16h00", 
      fillRate: 92,
      participants: [
        { name: "Thomas R.", sector: "Tech", volume: "0.31 m³", company: "Innovation SPRL", compatibility: "high", anonymous: false },
        { name: "Lisa V.", sector: "Design", volume: "0.19 m³", company: "Creative Studio", compatibility: "high", anonymous: false },
        { name: "Marc W.", sector: "Alimentaire", volume: "0.24 m³", company: "Anonyme", compatibility: "medium", anonymous: true }
      ],
      status: "almost-full",
      productTypes: ["électronique", "design", "alimentaire"],
      route: "Bruxelles → Milan",
      containerType: "20ft Réfrigéré",
      temperature: "Contrôlée",
      availableSpace: "0.08 m³",
      estimatedSavings: "52%"
    }
  ];

  const filteredConsolidations = consolidations.filter(cons => {
    return (!filters.destination || cons.destination.toLowerCase().includes(filters.destination.toLowerCase())) &&
           (!filters.timeWindow || true) &&
           (!filters.productType || cons.productTypes.includes(filters.productType));
  });

  const getStatusBadge = (status: string, fillRate: number) => {
    if (status === "almost-full" || fillRate > 90) {
      return <Badge className="bg-amber-100 text-amber-700">Presque complet</Badge>;
    }
    if (fillRate > 60) {
      return <Badge className="bg-[#10B981] text-white">Bonne progression</Badge>;
    }
    return <Badge variant="secondary">Places disponibles</Badge>;
  };

  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case "high": return "bg-[#10B981]";
      case "medium": return "bg-amber-500";
      case "low": return "bg-red-500";
      default: return "bg-gray-400";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onNavigate && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au dashboard
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-semibold mb-2">Espace de consolidation</h1>
            <p className="text-gray-600">Partagez vos envois avec d'autres entreprises pour réduire vos coûts</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
            onClick={() => onNavigate && onNavigate('new-shipment')}
          >
            Créer un groupe personnalisé
          </Button>
          <Button 
            variant="outline"
            onClick={() => onNavigate && onNavigate('new-shipment')}
          >
            <Package className="h-4 w-4 mr-2" />
            Déposer un envoi
          </Button>
        </div>
      </div>

      {/* Accueil pour nouveau envoi */}
      {newShipment && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-[#10B981]">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  🎉 Nouvel envoi prêt pour consolidation !
                </h3>
                <p className="text-gray-600 mb-3">
                  Votre envoi vers <strong>{newShipment.destination}</strong> ({newShipment.volume} m³, {newShipment.weight} kg) 
                  est maintenant prêt à être ajouté à un groupe de consolidation.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <Badge className="bg-[#10B981] text-white">
                    💰 Économies estimées: €{Math.round((newShipment.pricing || 0) * 0.4)}
                  </Badge>
                  <Badge variant="outline" className="border-[#1E40AF] text-[#1E40AF]">
                    🌱 -8kg CO₂ évité
                  </Badge>
                  <Badge variant="outline" className="border-orange-500 text-orange-600">
                    ⏰ Départ prévu: 2-3 jours
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <Button 
                  className="bg-[#10B981] hover:bg-[#10B981]/90 mb-2"
                  onClick={() => {
                    // Auto-sélectionner le meilleur groupe compatible
                    const compatibleGroup = consolidations.find(c => 
                      c.destination.toLowerCase().includes(newShipment.destination?.toLowerCase() || '')
                    );
                    if (compatibleGroup) {
                      setSelectedGroup(compatibleGroup.id);
                    }
                  }}
                >
                  Trouver mon groupe
                </Button>
                <div className="text-xs text-gray-500">
                  Ref: {newShipment.id}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filtres avancés */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres de consolidation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="destination-filter">Destination</Label>
              <Select onValueChange={(value) => setFilters(prev => ({ ...prev, destination: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes destinations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes destinations</SelectItem>
                  <SelectItem value="allemagne">Allemagne</SelectItem>
                  <SelectItem value="france">France</SelectItem>
                  <SelectItem value="pays-bas">Pays-Bas</SelectItem>
                  <SelectItem value="italie">Italie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="time-filter">Fenêtre temporelle</Label>
              <Select onValueChange={(value) => setFilters(prev => ({ ...prev, timeWindow: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes dates</SelectItem>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="product-filter">Type de marchandise</Label>
              <Select onValueChange={(value) => setFilters(prev => ({ ...prev, productType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous types</SelectItem>
                  <SelectItem value="électronique">Électronique</SelectItem>
                  <SelectItem value="alimentaire">Alimentaire</SelectItem>
                  <SelectItem value="textile">Textile</SelectItem>
                  <SelectItem value="cosmétiques">Cosmétiques</SelectItem>
                  <SelectItem value="métaux">Métaux</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="volume-filter">Volume max. disponible</Label>
              <Input 
                placeholder="Ex: 0.5 m³"
                value={filters.maxVolume}
                onChange={(e) => setFilters(prev => ({ ...prev, maxVolume: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Liste des consolidations */}
        <div className="lg:col-span-2 space-y-4">
          {filteredConsolidations.map((consolidation) => (
            <Card key={consolidation.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-[#1E40AF]" />
                      {consolidation.destination}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{consolidation.route}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(consolidation.status, consolidation.fillRate)}
                    <Badge className="bg-[#10B981] text-white ml-2">
                      -{consolidation.estimatedSavings}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Départ: {consolidation.departure}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span>Espace libre: {consolidation.availableSpace}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-gray-500" />
                    <span>{consolidation.containerType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">🌡️</span>
                    <span>{consolidation.temperature}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Taux de remplissage</span>
                    <span className="text-sm text-gray-600">{consolidation.fillRate}%</span>
                  </div>
                  <Progress value={consolidation.fillRate} className="h-2" />
                </div>

                <Separator />

                {/* Co-expéditeurs avec transparence */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Co-expéditeurs ({consolidation.participants.length})
                    </h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedGroup(selectedGroup === consolidation.id ? null : consolidation.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      {selectedGroup === consolidation.id ? "Masquer" : "Voir détails"}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {consolidation.participants.slice(0, selectedGroup === consolidation.id ? undefined : 2).map((participant, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getCompatibilityColor(participant.compatibility)}`} />
                          <div>
                            <p className="font-medium text-sm">{participant.name}</p>
                            <p className="text-xs text-gray-600">
                              {participant.anonymous ? "Entreprise anonyme" : participant.company} • {participant.sector}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{participant.volume}</p>
                          <p className="text-xs text-gray-600">
                            {participant.compatibility === "high" ? "Compatible" : 
                             participant.compatibility === "medium" ? "Modéré" : "Attention"}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {!selectedGroup && consolidation.participants.length > 2 && (
                      <p className="text-xs text-center text-gray-500 py-2">
                        +{consolidation.participants.length - 2} autres participants
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-[#10B981] hover:bg-[#10B981]/90"
                    disabled={consolidation.fillRate > 95}
                    onClick={() => {
                      // Simuler la demande de rejoindre le groupe
                      alert(`Demande envoyée pour rejoindre le groupe ${consolidation.id} vers ${consolidation.destination}`);
                    }}
                  >
                    {consolidation.fillRate > 95 ? 'Groupe complet' : 'Rejoindre ce groupe'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Simuler l'ouverture du chat de groupe
                      alert(`Chat du groupe ${consolidation.id} - Fonction en cours de développement`);
                    }}
                    title="Chat de groupe"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar - Prévisualisation conteneur */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Visualisation du conteneur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <Layers className="h-16 w-16 mx-auto text-[#1E40AF] mb-4" />
                  <p className="font-medium text-[#1E40AF]">Conteneur 3D</p>
                  <p className="text-sm text-gray-600">Sélectionnez un groupe pour voir la répartition</p>
                </div>
              </div>
              
              {selectedGroup && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-sm">Répartition par volume :</h4>
                  {filteredConsolidations
                    .find(c => c.id === selectedGroup)?.participants
                    .map((p, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{p.name}</span>
                        <span className="font-medium">{p.volume}</span>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Calculateur d'économies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Simulateur d'économies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="volume">Votre volume (m³)</Label>
                <Input 
                  placeholder="Ex: 0.15" 
                  onChange={(e) => {
                    // Recalculer automatiquement les économies basées sur le volume
                    const volume = parseFloat(e.target.value) || 0;
                    const baseRate = 300; // €300 par m³ en envoi individuel
                    const consolidatedRate = 120; // €120 par m³ en consolidation
                    const savings = (baseRate - consolidatedRate) * volume;
                    // Mettre à jour l'affichage dynamiquement
                  }}
                />
              </div>
              <div>
                <Label htmlFor="destination-calc">Destination</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="germany">Allemagne</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="netherlands">Pays-Bas</SelectItem>
                    <SelectItem value="italy">Italie</SelectItem>
                    <SelectItem value="spain">Espagne</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-[#10B981]/10 p-3 rounded-lg">
                <p className="text-sm text-center">
                  <span className="text-lg font-semibold text-[#10B981]">€45</span><br/>
                  <span className="text-gray-600">d'économie estimée</span>
                </p>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Basé sur un volume de 0.15m³ vers l'Allemagne
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => onNavigate && onNavigate('new-shipment')}
              >
                Créer un envoi
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}