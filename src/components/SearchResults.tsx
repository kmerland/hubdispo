// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { Search, Filter, Package, Calendar, MapPin, Truck, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface SearchResultsProps {
  onNavigate: (view: string, params?: any) => void;
  initialQuery?: string;
}

export default function SearchResults({ onNavigate, initialQuery = "" }: SearchResultsProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState({
    status: "",
    destination: "",
    dateRange: ""
  });

  const searchResults = [
    {
      id: "BE-2024-789",
      type: "shipment",
      title: "Envoi vers Allemagne",
      description: "3 colis électroniques - 12.5 kg",
      status: "transit",
      statusLabel: "En transit",
      destination: "Hamburg, Allemagne",
      date: "2024-10-01",
      estimatedDelivery: "2024-10-03",
      relevance: 95
    },
    {
      id: "BE-2024-756",
      type: "shipment", 
      title: "Consolidation France",
      description: "Groupe de 4 expéditeurs",
      status: "delivered",
      statusLabel: "Livré",
      destination: "Lyon, France",
      date: "2024-09-28",
      estimatedDelivery: "2024-09-30",
      relevance: 87
    },
    {
      id: "CONS-DE-001",
      type: "consolidation",
      title: "Groupe consolidation Allemagne",
      description: "4 participants - Départ jeudi 14h",
      status: "open",
      statusLabel: "Places disponibles",
      destination: "Hamburg, Allemagne",
      date: "2024-10-03",
      spots: 2,
      relevance: 92
    },
    {
      id: "DAU-2024-134",
      type: "customs",
      title: "Document douanier BE-2024-789",
      description: "DAU généré automatiquement",
      status: "completed",
      statusLabel: "Complété",
      destination: "Allemagne",
      date: "2024-10-01",
      relevance: 78
    },
    {
      id: "BE-2024-723",
      type: "shipment",
      title: "Envoi express Pays-Bas",
      description: "Composants urgents - 8.2 kg",
      status: "customs",
      statusLabel: "En douane",
      destination: "Amsterdam, Pays-Bas",
      date: "2024-09-29",
      estimatedDelivery: "2024-10-02",
      relevance: 83
    }
  ];

  const filteredResults = searchResults.filter(result => {
    const matchesQuery = !searchQuery || 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !filters.status || result.status === filters.status;
    const matchesDestination = !filters.destination || 
      result.destination.toLowerCase().includes(filters.destination.toLowerCase());
    
    return matchesQuery && matchesStatus && matchesDestination;
  });

  const getStatusBadge = (status: string, type: string) => {
    switch (status) {
      case "transit":
        return <Badge className="bg-blue-100 text-blue-700">En transit</Badge>;
      case "delivered":
        return <Badge className="bg-[#10B981] text-white">Livré</Badge>;
      case "customs":
        return <Badge className="bg-amber-100 text-amber-700">En douane</Badge>;
      case "open":
        return <Badge className="bg-green-100 text-green-700">Ouvert</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-700">Complété</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "shipment":
        return <Package className="h-5 w-5 text-[#1E40AF]" />;
      case "consolidation":
        return <Truck className="h-5 w-5 text-orange-500" />;
      case "customs":
        return <CheckCircle className="h-5 w-5 text-[#10B981]" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "shipment":
        return "Envoi";
      case "consolidation":
        return "Consolidation";
      case "customs":
        return "Douane";
      default:
        return "Autre";
    }
  };

  const handleResultClick = (result: any) => {
    if (result.type === "shipment") {
      onNavigate("tracking", { shipmentId: result.id });
    } else if (result.type === "consolidation") {
      onNavigate("consolidation");
    } else if (result.type === "customs") {
      onNavigate("customs", { shipmentId: result.id });
    }
  };

  const suggestionsByType = {
    shipments: filteredResults.filter(r => r.type === "shipment").length,
    consolidations: filteredResults.filter(r => r.type === "consolidation").length,
    customs: filteredResults.filter(r => r.type === "customs").length
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* En-tête de recherche */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate("dashboard")}
            className="text-gray-600"
          >
            ← Retour
          </Button>
          <h1 className="text-2xl font-semibold">Résultats de recherche</h1>
        </div>

        {/* Barre de recherche */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Rechercher un envoi, consolidation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
            <Search className="h-4 w-4 mr-2" />
            Rechercher
          </Button>
        </div>

        {/* Filtres */}
        <div className="flex gap-4">
          <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous statuts</SelectItem>
              <SelectItem value="transit">En transit</SelectItem>
              <SelectItem value="delivered">Livré</SelectItem>
              <SelectItem value="customs">En douane</SelectItem>
              <SelectItem value="open">Ouvert</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.destination} onValueChange={(value) => setFilters(prev => ({ ...prev, destination: value }))}>
            <SelectTrigger className="w-[180px]">
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

          <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
            <SelectTrigger className="w-[180px]">
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
      </div>

      {/* Résumé des résultats */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {filteredResults.length} résultat{filteredResults.length > 1 ? 's' : ''} trouvé{filteredResults.length > 1 ? 's' : ''}
          {searchQuery && ` pour "${searchQuery}"`}
        </p>
        <div className="flex gap-2">
          <Badge variant="outline">{suggestionsByType.shipments} envois</Badge>
          <Badge variant="outline">{suggestionsByType.consolidations} consolidations</Badge>
          <Badge variant="outline">{suggestionsByType.customs} douane</Badge>
        </div>
      </div>

      {/* Résultats organisés par onglets */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tous ({filteredResults.length})</TabsTrigger>
          <TabsTrigger value="shipments">Envois ({suggestionsByType.shipments})</TabsTrigger>
          <TabsTrigger value="consolidations">Consolidations ({suggestionsByType.consolidations})</TabsTrigger>
          <TabsTrigger value="customs">Douane ({suggestionsByType.customs})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredResults.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="font-semibold mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-600 mb-4">Essayez de modifier vos critères de recherche</p>
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Effacer la recherche
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredResults.map((result) => (
              <Card key={result.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4" onClick={() => handleResultClick(result)}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 rounded-lg bg-gray-50">
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{result.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(result.type)}
                          </Badge>
                          {getStatusBadge(result.status, result.type)}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{result.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {result.destination}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {result.date}
                          </span>
                          {result.estimatedDelivery && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Livraison: {result.estimatedDelivery}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {result.relevance}% pertinent
                      </Badge>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="shipments" className="space-y-4">
          {filteredResults.filter(r => r.type === "shipment").map((result) => (
            <Card key={result.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4" onClick={() => handleResultClick(result)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 rounded-lg bg-blue-50">
                      <Package className="h-5 w-5 text-[#1E40AF]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{result.title}</h3>
                        {getStatusBadge(result.status, result.type)}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{result.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {result.destination}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {result.date}
                        </span>
                        {result.estimatedDelivery && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Livraison: {result.estimatedDelivery}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Autres onglets similaires pour consolidations et customs */}
        <TabsContent value="consolidations" className="space-y-4">
          {filteredResults.filter(r => r.type === "consolidation").map((result) => (
            <Card key={result.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4" onClick={() => handleResultClick(result)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 rounded-lg bg-orange-50">
                      <Truck className="h-5 w-5 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{result.title}</h3>
                        {getStatusBadge(result.status, result.type)}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{result.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {result.destination}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Départ: {result.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="customs" className="space-y-4">
          {filteredResults.filter(r => r.type === "customs").map((result) => (
            <Card key={result.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4" onClick={() => handleResultClick(result)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 rounded-lg bg-green-50">
                      <CheckCircle className="h-5 w-5 text-[#10B981]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{result.title}</h3>
                        {getStatusBadge(result.status, result.type)}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{result.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {result.destination}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {result.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}