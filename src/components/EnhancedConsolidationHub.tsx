// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { 
  Users, 
  MapPin, 
  Clock, 
  Package, 
  Euro, 
  Truck, 
  Calendar,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Target,
  Zap
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ToastProvider";

interface ConsolidationHubProps {
  onNavigate: (view: string, params?: any) => void;
  newShipment?: any;
}

// Données réalistes pour les groupes de consolidation
const availableGroups = [
  {
    id: "CON-FR-001",
    destination: "Lyon, France",
    departureHub: "Anvers",
    participants: 6,
    maxParticipants: 12,
    capacity: 75,
    currentWeight: "450kg",
    maxWeight: "600kg",
    departureDate: "2024-10-05",
    estimatedDelivery: "2024-10-07",
    savings: "€185",
    cost: "€89",
    originalCost: "€274",
    companies: ["Chocolate Master SA", "Fashion Boutique BVBA", "Tech Solutions NV", "Export Pro SA", "Artisan Goods", "Quality Parts"],
    status: "open",
    coordinator: "LogiPartner Brussels"
  },
  {
    id: "CON-DE-002", 
    destination: "Munich, Allemagne",
    departureHub: "Bruxelles",
    participants: 4,
    maxParticipants: 10,
    capacity: 60,
    currentWeight: "280kg",
    maxWeight: "500kg",
    departureDate: "2024-10-06",
    estimatedDelivery: "2024-10-08",
    savings: "€145",
    cost: "€95",
    originalCost: "€240",
    companies: ["Beer Export BVBA", "Industrial Parts SA", "Design Studio NV", "Chemical Supply"],
    status: "open",
    coordinator: "EuroLogistics"
  },
  {
    id: "CON-IT-003",
    destination: "Rome, Italie",
    departureHub: "Gand",
    participants: 8,
    maxParticipants: 8,
    capacity: 100,
    currentWeight: "500kg",
    maxWeight: "500kg",
    departureDate: "2024-10-04",
    estimatedDelivery: "2024-10-06",
    savings: "€220",
    cost: "€125",
    originalCost: "€345",
    companies: ["Fashion Forward NV", "Luxury Goods SA", "Textile Export", "Art Gallery BVBA", "Premium Foods", "Design Items", "Quality Craft", "Specialty Products"],
    status: "full",
    coordinator: "MediterraneanLogistics"
  },
  {
    id: "CON-ES-004",
    destination: "Barcelona, Espagne",
    departureHub: "Bruxelles",
    participants: 3,
    maxParticipants: 15,
    capacity: 25,
    currentWeight: "180kg",
    maxWeight: "750kg",
    departureDate: "2024-10-08",
    estimatedDelivery: "2024-10-10",
    savings: "€165",
    cost: "€78",
    originalCost: "€243",
    companies: ["Iberian Trade SA", "Med Products NV", "Spanish Connection"],
    status: "open",
    coordinator: "Iberian Logistics"
  },
  {
    id: "CON-NL-005",
    destination: "Amsterdam, Pays-Bas",
    departureHub: "Anvers",
    participants: 10,
    maxParticipants: 10,
    capacity: 95,
    currentWeight: "380kg",
    maxWeight: "400kg",
    departureDate: "2024-10-04",
    estimatedDelivery: "2024-10-05",
    savings: "€95",
    cost: "€45",
    originalCost: "€140",
    companies: ["Dutch Connection BVBA", "Tulip Export SA", "Netherlands Trade", "Orange Logistics", "Amsterdam Goods", "Holland Export", "Dutch Quality", "Netherlands Premium", "Orange Products", "Amsterdam Trade"],
    status: "closing",
    coordinator: "BeNeLux Express"
  }
];

const myConsolidations = [
  {
    id: "CON-FR-001",
    destination: "Lyon, France",
    status: "confirmed",
    departureDate: "2024-10-05",
    myItems: 2,
    cost: "€89",
    savings: "€185",
    trackingId: "TRK-CON-FR-001"
  },
  {
    id: "CON-DE-003",
    destination: "Berlin, Allemagne", 
    status: "in_transit",
    departureDate: "2024-10-02",
    myItems: 1,
    cost: "€65",
    savings: "€120",
    trackingId: "TRK-CON-DE-003"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "open": return "bg-green-100 text-green-800";
    case "closing": return "bg-yellow-100 text-yellow-800";
    case "full": return "bg-gray-100 text-gray-800";
    case "confirmed": return "bg-blue-100 text-blue-800";
    case "in_transit": return "bg-purple-100 text-purple-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "open": return "Ouvert";
    case "closing": return "Fermeture bientôt";
    case "full": return "Complet";
    case "confirmed": return "Confirmé";
    case "in_transit": return "En transit";
    default: return status;
  }
};

export default function EnhancedConsolidationHub({ onNavigate }: ConsolidationHubProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { showToast } = useToast();

  const filteredGroups = availableGroups.filter(group => {
    const matchesSearch = group.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "available" && group.status === "open") ||
                         (selectedFilter === "closing" && group.status === "closing") ||
                         (selectedFilter === "full" && group.status === "full");
    
    return matchesSearch && matchesFilter;
  });

  const handleJoinGroup = (group: any) => {
    setSelectedGroup(group);
    setShowJoinDialog(true);
  };

  const confirmJoinGroup = () => {
    showToast({
      type: 'success',
      message: `Vous avez rejoint le groupe ${selectedGroup.id} vers ${selectedGroup.destination}`,
      duration: 4000
    });
    setShowJoinDialog(false);
    setSelectedGroup(null);
  };

  const handleCreateGroup = () => {
    setShowCreateDialog(true);
  };

  const handleTrackConsolidation = (trackingId: string) => {
    onNavigate("tracking", { shipmentId: trackingId });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hub de Consolidation</h1>
            <p className="text-gray-600 mt-1">
              Réduisez vos coûts en groupant vos envois avec d'autres PME
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => onNavigate("new-shipment")} variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Nouvel envoi
            </Button>
            <Button onClick={handleCreateGroup} className="bg-[#10B981] hover:bg-[#10B981]/90">
              <Plus className="h-4 w-4 mr-2" />
              Créer un groupe
            </Button>
          </div>
        </div>

        {/* Métriques consolidation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Économies totales</CardTitle>
              <Euro className="h-4 w-4 text-[#10B981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#10B981]">€2,340</div>
              <p className="text-xs text-gray-600">+€305 ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Groupes rejoints</CardTitle>
              <Users className="h-4 w-4 text-[#1E40AF]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-[#10B981]">+3 ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Groupes disponibles</CardTitle>
              <Target className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableGroups.filter(g => g.status === 'open').length}</div>
              <p className="text-xs text-gray-600">Opportunités actives</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Économie moyenne</CardTitle>
              <Zap className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">58%</div>
              <p className="text-xs text-[#10B981]">vs envoi individuel</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Groupes disponibles</TabsTrigger>
            <TabsTrigger value="my-consolidations">Mes consolidations</TabsTrigger>
            <TabsTrigger value="create">Créer un groupe</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            {/* Filtres et recherche */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Rechercher par destination..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les groupes</SelectItem>
                        <SelectItem value="available">Disponibles</SelectItem>
                        <SelectItem value="closing">Fermeture bientôt</SelectItem>
                        <SelectItem value="full">Complets</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Plus de filtres
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Groupes de consolidation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-[#1E40AF]" />
                          {group.destination}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Départ de {group.departureHub} • {group.id}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(group.status)}>
                        {getStatusLabel(group.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Informations principales */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{group.participants}/{group.maxParticipants} participants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        <span>{group.currentWeight}/{group.maxWeight}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Départ: {new Date(group.departureDate).toLocaleDateString('fr-BE')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-gray-500" />
                        <span>Livraison: {new Date(group.estimatedDelivery).toLocaleDateString('fr-BE')}</span>
                      </div>
                    </div>

                    {/* Barre de progression */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Capacité utilisée</span>
                        <span>{group.capacity}%</span>
                      </div>
                      <Progress value={group.capacity} className="h-2" />
                    </div>

                    {/* Économies */}
                    <div className="bg-[#10B981]/10 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Votre coût</p>
                          <p className="text-lg font-bold text-[#1E40AF]">{group.cost}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Économie</p>
                          <p className="text-lg font-bold text-[#10B981]">{group.savings}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        vs {group.originalCost} en envoi individuel
                      </div>
                    </div>

                    {/* Entreprises participantes */}
                    <div>
                      <p className="text-sm font-medium mb-2">Entreprises participantes :</p>
                      <div className="flex flex-wrap gap-1">
                        {group.companies.slice(0, 3).map((company, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {company}
                          </Badge>
                        ))}
                        {group.companies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{group.companies.length - 3} autres
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      {group.status === "open" ? (
                        <Button 
                          onClick={() => handleJoinGroup(group)}
                          className="flex-1 bg-[#10B981] hover:bg-[#10B981]/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Rejoindre
                        </Button>
                      ) : group.status === "closing" ? (
                        <Button 
                          onClick={() => handleJoinGroup(group)}
                          className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Rejoindre vite !
                        </Button>
                      ) : (
                        <Button disabled className="flex-1">
                          Complet
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-consolidations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes consolidations actives</CardTitle>
                <CardDescription>
                  Suivez l'état de vos envois groupés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myConsolidations.map((consolidation) => (
                    <div key={consolidation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                            {consolidation.id}
                          </code>
                          <Badge className={getStatusColor(consolidation.status)}>
                            {getStatusLabel(consolidation.status)}
                          </Badge>
                        </div>
                        <p className="font-medium">{consolidation.destination}</p>
                        <p className="text-sm text-gray-600">
                          {consolidation.myItems} article(s) • Départ: {new Date(consolidation.departureDate).toLocaleDateString('fr-BE')}
                        </p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="font-medium text-[#1E40AF]">{consolidation.cost}</p>
                        <p className="text-sm text-[#10B981]">Économie: {consolidation.savings}</p>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleTrackConsolidation(consolidation.trackingId)}
                      >
                        <ArrowRight className="h-4 w-4 mr-1" />
                        Suivre
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Créer un nouveau groupe de consolidation</CardTitle>
                <CardDescription>
                  Initiez un groupe pour une destination spécifique et invitez d'autres PME à vous rejoindre
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <Input id="destination" placeholder="ex: Paris, France" />
                  </div>
                  <div>
                    <Label htmlFor="departure">Hub de départ</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un hub" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brussels">Bruxelles</SelectItem>
                        <SelectItem value="antwerp">Anvers</SelectItem>
                        <SelectItem value="ghent">Gand</SelectItem>
                        <SelectItem value="liege">Liège</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="departure-date">Date de départ souhaitée</Label>
                    <Input id="departure-date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="max-participants">Nombre max de participants</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 participants</SelectItem>
                        <SelectItem value="8">8 participants</SelectItem>
                        <SelectItem value="10">10 participants</SelectItem>
                        <SelectItem value="15">15 participants</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description (optionnel)</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Décrivez votre envoi et les types de marchandises acceptées..."
                    className="h-24"
                  />
                </div>
                <Button className="w-full bg-[#10B981] hover:bg-[#10B981]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer le groupe de consolidation
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog pour rejoindre un groupe */}
        <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rejoindre le groupe de consolidation</DialogTitle>
              <DialogDescription>
                Confirmez votre participation au groupe {selectedGroup?.id} vers {selectedGroup?.destination}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Résumé de l'économie</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Coût consolidé:</span>
                    <p className="font-bold text-[#1E40AF]">{selectedGroup?.cost}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Économie:</span>
                    <p className="font-bold text-[#10B981]">{selectedGroup?.savings}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Départ:</span>
                    <p className="font-medium">{selectedGroup && new Date(selectedGroup.departureDate).toLocaleDateString('fr-BE')}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Livraison estimée:</span>
                    <p className="font-medium">{selectedGroup && new Date(selectedGroup.estimatedDelivery).toLocaleDateString('fr-BE')}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowJoinDialog(false)} className="flex-1">
                  Annuler
                </Button>
                <Button onClick={confirmJoinGroup} className="flex-1 bg-[#10B981] hover:bg-[#10B981]/90">
                  Confirmer ma participation
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}