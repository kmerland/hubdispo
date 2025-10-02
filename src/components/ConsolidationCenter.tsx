// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { 
  Users, Plus, Search, Filter, MapPin, Calendar, Euro, Package, 
  Truck, Clock, AlertTriangle, CheckCircle, Eye, MoreHorizontal,
  Star, TrendingUp, ArrowRight, Building, Weight, Volume,
  Target, Zap, Shield, Award
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useToast } from "./ToastProvider";
import { mockConsolidationGroups, mockShipments, belgianCompanies, europeanCities } from "./data/mockData";

interface ConsolidationCenterProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function ConsolidationCenter({ onNavigate }: ConsolidationCenterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTab, setSelectedTab] = useState("available");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const { showToast } = useToast();

  // Filtrer les groupes de consolidation
  const filteredGroups = mockConsolidationGroups.filter(group => {
    const matchesSearch = 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.destination.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDestination = destinationFilter === "all" || 
      group.destination.city.toLowerCase().includes(destinationFilter.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || group.status === statusFilter;
    
    const matchesTab = 
      selectedTab === "available" ? group.status === "open" :
      selectedTab === "my-groups" ? group.coordinator === "Votre Entreprise" :
      selectedTab === "completed" ? group.status === "delivered" :
      true;
    
    return matchesSearch && matchesDestination && matchesStatus && matchesTab;
  });

  const handleJoinGroup = (groupId: string) => {
    const group = mockConsolidationGroups.find(g => g.id === groupId);
    if (group) {
      showToast({
        type: 'success',
        message: `Demande de participation au groupage ${group.destination.city} envoyée !`,
        duration: 3000
      });
      onNavigate('new-shipment', { consolidationGroup: groupId });
    }
  };

  const handleCreateGroup = () => {
    setShowCreateDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-100 text-green-800 border-green-200";
      case "full": return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_transit": return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open": return "Ouvert";
      case "full": return "Complet";
      case "in_transit": return "En route";
      case "delivered": return "Livré";
      default: return status;
    }
  };

  const getTabCounts = () => {
    return {
      available: mockConsolidationGroups.filter(g => g.status === 'open').length,
      myGroups: mockConsolidationGroups.filter(g => g.coordinator === "Votre Entreprise").length,
      inTransit: mockConsolidationGroups.filter(g => g.status === 'in_transit').length,
      completed: mockConsolidationGroups.filter(g => g.status === 'delivered').length
    };
  };

  const tabCounts = getTabCounts();

  // Calculs pour les statistiques
  const totalSavings = mockConsolidationGroups.reduce((sum, g) => sum + g.estimatedSavings, 0);
  const myShipments = mockShipments.filter(s => s.consolidationGroup).length;
  const avgSavingsPerShipment = myShipments > 0 ? totalSavings / myShipments : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="h-8 w-8 text-[#10B981]" />
              Centre de Consolidation
            </h1>
            <p className="text-gray-600 mt-1">
              Réduisez vos coûts d'envoi en rejoignant des groupages ou en créant le vôtre
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>{tabCounts.available} groupes disponibles</span>
              <span>•</span>
              <span>€{totalSavings.toLocaleString()} d'économies potentielles</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleCreateGroup}
              className="bg-[#10B981] hover:bg-[#10B981]/90 shadow-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              Créer un Groupage
            </Button>
            <Button 
              variant="outline"
              onClick={() => onNavigate('new-shipment')}
              className="shadow-sm"
            >
              <Package className="h-4 w-4 mr-2" />
              Ajouter Envoi
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-[#10B981] shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                Économies Totales
                <Euro className="h-4 w-4 text-[#10B981]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">€{totalSavings.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +€450 ce mois
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                Mes Envois Groupés
                <Package className="h-4 w-4 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{myShipments}</div>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <Target className="h-3 w-3 mr-1" />
                8 en cours
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                Groupes Rejoints
                <Users className="h-4 w-4 text-purple-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{tabCounts.myGroups}</div>
              <p className="text-xs text-purple-600 flex items-center mt-1">
                <Shield className="h-3 w-3 mr-1" />
                100% succès
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
                Économie Moyenne
                <Award className="h-4 w-4 text-orange-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">€{Math.round(avgSavingsPerShipment)}</div>
              <p className="text-xs text-orange-600 flex items-center mt-1">
                <Zap className="h-3 w-3 mr-1" />
                par envoi
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Recherche et Filtres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher destination, organisateur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={destinationFilter} onValueChange={setDestinationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes destinations</SelectItem>
                  {europeanCities.map(city => (
                    <SelectItem key={city.city} value={city.city.toLowerCase()}>
                      {city.city}, {city.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="open">Ouvert</SelectItem>
                  <SelectItem value="full">Complet</SelectItem>
                  <SelectItem value="in_transit">En route</SelectItem>
                  <SelectItem value="delivered">Livré</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setDestinationFilter("all");
                  setStatusFilter("all");
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Onglets */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="available">
              Disponibles ({tabCounts.available})
            </TabsTrigger>
            <TabsTrigger value="my-groups">
              Mes Groupes ({tabCounts.myGroups})
            </TabsTrigger>
            <TabsTrigger value="in-transit">
              En Route ({tabCounts.inTransit})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Terminés ({tabCounts.completed})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => {
                const loadPercentage = Math.round((group.currentLoad.weight / group.maxCapacity.weight) * 100);
                const daysUntilDeparture = Math.ceil((new Date(group.departureDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <Card 
                    key={group.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-white to-green-50 border-green-200"
                    onClick={() => setSelectedGroup(group.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-[#10B981]" />
                          <CardTitle className="text-lg">{group.destination.city}</CardTitle>
                        </div>
                        <Badge className={getStatusColor(group.status)}>
                          {getStatusLabel(group.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{group.destination.country}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Économies */}
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Économies estimées</span>
                        <span className="text-lg font-bold text-[#10B981]">€{group.estimatedSavings}</span>
                      </div>

                      {/* Informations détaillées */}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{group.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{daysUntilDeparture > 0 ? `${daysUntilDeparture}j` : 'Aujourd\'hui'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Weight className="h-4 w-4 text-gray-500" />
                          <span>{group.currentLoad.weight}kg</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Volume className="h-4 w-4 text-gray-500" />
                          <span>{group.currentLoad.volume}m³</span>
                        </div>
                      </div>

                      {/* Progression */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Capacité utilisée</span>
                          <span>{loadPercentage}%</span>
                        </div>
                        <Progress value={loadPercentage} className="h-2" />
                        <div className="text-xs text-gray-500">
                          {group.maxCapacity.weight - group.currentLoad.weight}kg disponibles
                        </div>
                      </div>

                      {/* Organisateur */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Organisateur:</span>
                        <span className="font-medium">{group.coordinator}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        {group.status === 'open' && (
                          <Button 
                            size="sm"
                            className="flex-1 bg-[#10B981] hover:bg-[#10B981]/90"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleJoinGroup(group.id);
                            }}
                          >
                            <Users className="h-4 w-4 mr-1" />
                            Rejoindre
                          </Button>
                        )}
                        
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('map', { consolidationId: group.id });
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredGroups.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun groupage trouvé</h3>
                <p className="text-gray-600 mb-4">
                  Aucun groupage ne correspond à vos critères de recherche.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Button 
                    onClick={handleCreateGroup}
                    className="bg-[#10B981] hover:bg-[#10B981]/90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Créer un groupage
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate('new-shipment')}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Nouvel envoi
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Dialog de création de groupage */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Créer un Nouveau Groupage</DialogTitle>
              <DialogDescription>
                Organisez un groupage vers votre destination préférée et économisez sur vos frais d'envoi.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Destination</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choisir une destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {europeanCities.map(city => (
                      <SelectItem key={city.city} value={city.city}>
                        {city.city}, {city.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Date de départ souhaitée</label>
                <Input type="date" className="mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Capacité max (kg)</label>
                  <Input type="number" placeholder="1000" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Volume max (m³)</label>
                  <Input type="number" placeholder="15" className="mt-1" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateDialog(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button 
                className="flex-1 bg-[#10B981] hover:bg-[#10B981]/90"
                onClick={() => {
                  setShowCreateDialog(false);
                  showToast({
                    type: 'success',
                    message: 'Groupage créé avec succès ! Participants recherchés...',
                    duration: 3000
                  });
                }}
              >
                Créer
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}