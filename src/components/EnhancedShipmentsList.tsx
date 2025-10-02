// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { Package, Search, Filter, Plus, Truck, Clock, MapPin, AlertCircle, CheckCircle, Eye, MoreHorizontal, Download, RefreshCw, Calendar, Euro, Weight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useToast } from "./ToastProvider";
import { useLanguage } from "./LanguageProvider";
import { mockShipments } from "./data/mockData";

interface EnhancedShipmentsListProps {
  onViewTracking: (shipmentId: string) => void;
  onNavigate: (view: string, params?: any) => void;
}

export default function EnhancedShipmentsList({ onViewTracking, onNavigate }: EnhancedShipmentsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [carrierFilter, setCarrierFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedTab, setSelectedTab] = useState("all");
  
  const { showToast } = useToast();
  const { t } = useLanguage();

  // Fonctions utilitaires
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800 border-green-200";
      case "in_transit": return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "consolidating": return "bg-purple-100 text-purple-800 border-purple-200";
      case "delayed": return "bg-red-100 text-red-800 border-red-200";
      case "customs": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "delivered": return t('shipments.status.delivered');
      case "in_transit": return t('shipments.status.in_transit');
      case "pending": return t('shipments.status.pending');
      case "consolidating": return t('shipments.status.consolidation');
      case "delayed": return "Retardé";
      case "customs": return t('shipments.status.customs');
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in_transit": return <Truck className="h-4 w-4 text-blue-600" />;
      case "pending": return <Package className="h-4 w-4 text-yellow-600" />;
      case "consolidating": return <Package className="h-4 w-4 text-purple-600" />;
      case "delayed": return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "customs": return <Clock className="h-4 w-4 text-orange-600" />;
      default: return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-50 text-red-700 border-red-200";
      case "high": return "bg-orange-50 text-orange-700 border-orange-200";
      case "medium": return "bg-blue-50 text-blue-700 border-blue-200";
      case "low": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "urgent": return "Urgent";
      case "high": return "Élevée";
      case "medium": return "Normale";
      case "low": return "Faible";
      default: return priority;
    }
  };

  // Get unique carriers for filter
  const uniqueCarriers = [...new Set(mockShipments.map(s => s.carrier))];

  // Filtrage et tri des envois
  const filteredShipments = mockShipments
    .filter(shipment => {
      const matchesSearch = 
        shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.origin.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.destination.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.destination.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || shipment.priority === priorityFilter;
      const matchesCarrier = carrierFilter === "all" || shipment.carrier === carrierFilter;
      const matchesTab = selectedTab === "all" || shipment.status === selectedTab;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCarrier && matchesTab;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "createdAt":
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case "estimatedDelivery":
          aValue = new Date(a.estimatedDelivery).getTime();
          bValue = new Date(b.estimatedDelivery).getTime();
          break;
        case "value":
          aValue = a.value;
          bValue = b.value;
          break;
        case "weight":
          aValue = a.weight;
          bValue = b.weight;
          break;
        case "shippingCost":
          aValue = a.shippingCost;
          bValue = b.shippingCost;
          break;
        default:
          aValue = a.trackingNumber;
          bValue = b.trackingNumber;
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleAction = (action: string, shipmentId: string) => {
    switch (action) {
      case "view":
        onViewTracking(shipmentId);
        break;
      case "duplicate":
        // Navigate to new shipment with pre-filled data
        const shipment = mockShipments.find(s => s.id === shipmentId);
        if (shipment) {
          onNavigate('new-shipment', { duplicateFrom: shipment });
          showToast({
            type: 'success',
            message: `Envoi ${shipmentId} dupliqué - Formulaire pré-rempli`,
            duration: 3000
          });
        }
        break;
      case "cancel":
        showToast({
          type: 'info',
          message: `Annulation de l'envoi ${shipmentId} en cours`,
          duration: 3000
        });
        break;
      case "documents":
        showToast({
          type: 'info',
          message: 'Téléchargement des documents en cours...',
          duration: 3000
        });
        break;
      case "consolidation":
        onNavigate('consolidation', { shipmentId });
        break;
      case "customs":
        onNavigate('customs', { shipmentId });
        break;
      default:
        showToast({
          type: 'info',
          message: `Action ${action} disponible`,
          duration: 3000
        });
    }
  };

  const getTabCounts = () => {
    return {
      all: mockShipments.length,
      in_transit: mockShipments.filter(s => s.status === 'in_transit').length,
      pending: mockShipments.filter(s => s.status === 'pending').length,
      delivered: mockShipments.filter(s => s.status === 'delivered').length,
      delayed: mockShipments.filter(s => s.status === 'delayed').length,
      customs: mockShipments.filter(s => s.status === 'customs').length,
      consolidating: mockShipments.filter(s => s.status === 'consolidating').length
    };
  };

  const tabCounts = getTabCounts();

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setCarrierFilter("all");
    setSortBy("createdAt");
    setSortOrder("desc");
    setSelectedTab("all");
    showToast({
      type: 'info',
      message: 'Filtres réinitialisés',
      duration: 2000
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* En-tête */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="h-8 w-8 text-[#1E40AF]" />
              Mes Envois
            </h1>
            <p className="text-gray-600 mt-1">
              Gérez et suivez tous vos envois depuis un seul endroit
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>{mockShipments.length} envois au total</span>
              <span>•</span>
              <span>{tabCounts.in_transit} en transit</span>
              <span>•</span>
              <span>{tabCounts.delivered} livrés</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => onNavigate("new-shipment")}
              className="bg-[#1E40AF] hover:bg-[#1E40AF]/90 shadow-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvel Envoi
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleAction('export', 'all')}
              className="shadow-sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
              className="shadow-sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Filtres et Recherche */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtres et Recherche
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                Effacer les filtres
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher par numéro, expéditeur, destinataire..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="in_transit">En transit</SelectItem>
                  <SelectItem value="consolidating">Consolidation</SelectItem>
                  <SelectItem value="customs">Dédouanement</SelectItem>
                  <SelectItem value="delivered">Livré</SelectItem>
                  <SelectItem value="delayed">Retardé</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les priorités</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                  <SelectItem value="medium">Normale</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                </SelectContent>
              </Select>

              <Select value={carrierFilter} onValueChange={setCarrierFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Transporteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les transporteurs</SelectItem>
                  {uniqueCarriers.map(carrier => (
                    <SelectItem key={carrier} value={carrier}>{carrier}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Date de création</SelectItem>
                  <SelectItem value="estimatedDelivery">Date de livraison</SelectItem>
                  <SelectItem value="value">Valeur</SelectItem>
                  <SelectItem value="weight">Poids</SelectItem>
                  <SelectItem value="shippingCost">Coût d'envoi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Onglets de Statut */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">
              Tous ({tabCounts.all})
            </TabsTrigger>
            <TabsTrigger value="in_transit">
              <Truck className="h-4 w-4 mr-1" />
              Transit ({tabCounts.in_transit})
            </TabsTrigger>
            <TabsTrigger value="pending">
              <Package className="h-4 w-4 mr-1" />
              Attente ({tabCounts.pending})
            </TabsTrigger>
            <TabsTrigger value="consolidating">
              Groupage ({tabCounts.consolidating})
            </TabsTrigger>
            <TabsTrigger value="customs">
              Douanes ({tabCounts.customs})
            </TabsTrigger>
            <TabsTrigger value="delivered">
              <CheckCircle className="h-4 w-4 mr-1" />
              Livrés ({tabCounts.delivered})
            </TabsTrigger>
            <TabsTrigger value="delayed">
              <AlertCircle className="h-4 w-4 mr-1" />
              Retardés ({tabCounts.delayed})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{filteredShipments.length} envoi(s) trouvé(s)</span>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    >
                      {sortOrder === "asc" ? "↑" : "↓"} {sortOrder === "asc" ? "Croissant" : "Décroissant"}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredShipments.map((shipment) => (
                    <div 
                      key={shipment.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white cursor-pointer"
                      onClick={() => onViewTracking(shipment.id)}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        
                        {/* Informations principales */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            {getStatusIcon(shipment.status)}
                            <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded font-semibold">
                              {shipment.trackingNumber}
                            </code>
                            <Badge className={getStatusColor(shipment.status)}>
                              {getStatusLabel(shipment.status)}
                            </Badge>
                            <Badge className={getPriorityColor(shipment.priority)}>
                              {getPriorityLabel(shipment.priority)}
                            </Badge>
                            {shipment.consolidationGroup && (
                              <Badge variant="outline" className="text-purple-600 border-purple-200">
                                Groupage: {shipment.consolidationGroup}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500 font-medium">Expéditeur</p>
                              <p className="font-semibold text-gray-900">{shipment.origin.company}</p>
                              <p className="text-gray-600">{shipment.origin.city}, {shipment.origin.country}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 font-medium">Destinataire</p>
                              <p className="font-semibold text-gray-900">{shipment.destination.company}</p>
                              <p className="text-gray-600">{shipment.destination.city}, {shipment.destination.country}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 font-medium">Transporteur</p>
                              <p className="font-semibold text-gray-900">{shipment.carrier}</p>
                              <p className="text-gray-600">{shipment.service}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 font-medium">Livraison prévue</p>
                              <p className="font-semibold text-gray-900">
                                {new Date(shipment.estimatedDelivery).toLocaleDateString('fr-BE', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric'
                                })}
                              </p>
                              <p className="text-gray-600">
                                {new Date(shipment.estimatedDelivery).toLocaleTimeString('fr-BE', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-6 mt-4 text-sm">
                            <span className="flex items-center gap-1 text-gray-600">
                              <Weight className="h-4 w-4" />
                              <span className="font-medium">{shipment.weight} kg</span>
                            </span>
                            <span className="flex items-center gap-1 text-gray-600">
                              <Package className="h-4 w-4" />
                              <span className="font-medium">
                                {shipment.dimensions.length}×{shipment.dimensions.width}×{shipment.dimensions.height} cm
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Euro className="h-4 w-4 text-[#1E40AF]" />
                              <span className="font-semibold text-[#1E40AF]">
                                €{shipment.value.toFixed(2)}
                              </span>
                            </span>
                            <span className="text-gray-500">
                              Frais: €{shipment.shippingCost.toFixed(2)}
                            </span>
                            {shipment.customsStatus && (
                              <Badge variant="outline" className={
                                shipment.customsStatus === 'cleared' ? 'text-green-600 border-green-200' :
                                shipment.customsStatus === 'issues' ? 'text-red-600 border-red-200' :
                                'text-orange-600 border-orange-200'
                              }>
                                Douanes: {shipment.customsStatus === 'cleared' ? 'Dédouané' : 
                                         shipment.customsStatus === 'issues' ? 'Problème' : 'En cours'}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('view', shipment.id);
                            }}
                            className="hover:bg-[#1E40AF] hover:text-white"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Suivre
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleAction('duplicate', shipment.id);
                              }}>
                                Dupliquer l'envoi
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleAction('consolidation', shipment.id);
                              }}>
                                Ajouter au groupage
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleAction('customs', shipment.id);
                              }}>
                                Gérer les douanes
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleAction('documents', shipment.id);
                              }}>
                                Télécharger documents
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAction('cancel', shipment.id);
                                }} 
                                className="text-red-600"
                              >
                                Annuler l'envoi
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredShipments.length === 0 && (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun envoi trouvé</h3>
                      <p className="text-gray-600 mb-4">
                        {searchTerm || statusFilter !== "all" || priorityFilter !== "all" || carrierFilter !== "all"
                          ? "Aucun envoi ne correspond à vos critères de recherche."
                          : "Vous n'avez pas encore créé d'envoi."
                        }
                      </p>
                      <div className="flex items-center justify-center gap-3">
                        <Button 
                          onClick={() => onNavigate("new-shipment")}
                          className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Créer un envoi
                        </Button>
                        {(searchTerm || statusFilter !== "all" || priorityFilter !== "all" || carrierFilter !== "all") && (
                          <Button 
                            variant="outline"
                            onClick={clearFilters}
                          >
                            Effacer les filtres
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}