// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Calendar,
  Building,
  Package,
  MapPin,
  Euro,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Trash2,
  Copy,
  Send,
  Edit
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import ActionBar from "./ActionBar";
import { useAuth } from "./AuthProvider";

interface DAUHistoryProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function DAUHistory({ onNavigate }: DAUHistoryProps) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Données simulées des DAU générés
  const dauDocuments = [
    {
      id: "DAU-2024-001",
      shipmentId: "BE-2024-789",
      exporterName: user?.company || "TechBelgium SPRL",
      consigneeName: "Deutsche Tech GmbH",
      destination: "Allemagne",
      goodsDescription: "Smartphones Samsung Galaxy S24",
      totalValue: "1250.00",
      currency: "EUR",
      status: "validé",
      createdAt: "2024-10-01T14:30:00Z",
      validatedAt: "2024-10-01T15:15:00Z",
      downloadCount: 3,
      lastDownload: "2024-10-02T09:20:00Z"
    },
    {
      id: "DAU-2024-002", 
      shipmentId: "BE-2024-790",
      exporterName: user?.company || "TechBelgium SPRL",
      consigneeName: "French Import SARL",
      destination: "France",
      goodsDescription: "Écouteurs sans fil Bluetooth",
      totalValue: "850.00",
      currency: "EUR",
      status: "en_attente",
      createdAt: "2024-09-28T10:15:00Z",
      validatedAt: null,
      downloadCount: 0,
      lastDownload: null
    },
    {
      id: "DAU-2024-003",
      shipmentId: "BE-2024-791", 
      exporterName: user?.company || "TechBelgium SPRL",
      consigneeName: "Dutch Electronics BV",
      destination: "Pays-Bas",
      goodsDescription: "Accessoires informatiques",
      totalValue: "2100.00",
      currency: "EUR",
      status: "validé",
      createdAt: "2024-09-25T16:45:00Z",
      validatedAt: "2024-09-26T08:30:00Z",
      downloadCount: 5,
      lastDownload: "2024-09-30T14:10:00Z"
    },
    {
      id: "DAU-2024-004",
      shipmentId: "BE-2024-792",
      exporterName: user?.company || "TechBelgium SPRL", 
      consigneeName: "Italian Tech SRL",
      destination: "Italie",
      goodsDescription: "Tablettes et accessoires",
      totalValue: "3400.00",
      currency: "EUR",
      status: "erreur",
      createdAt: "2024-09-20T11:20:00Z",
      validatedAt: null,
      downloadCount: 0,
      lastDownload: null,
      errorMessage: "Code SH invalide"
    }
  ];

  const filteredDocuments = dauDocuments.filter(doc => {
    const matchesSearch = searchQuery === "" || 
      doc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.consigneeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.goodsDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "" || doc.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "validé":
        return <Badge className="bg-[#10B981] text-white">Validé</Badge>;
      case "en_attente":
        return <Badge className="bg-orange-500 text-white">En attente</Badge>;
      case "erreur":
        return <Badge className="bg-red-500 text-white">Erreur</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-BE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = (dauId: string) => {
    // Simulation de téléchargement
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${dauId}.pdf`;
    link.click();
  };

  const handleRegenerateDAU = (dauId: string, shipmentId: string) => {
    onNavigate("dau-generator", { shipmentId, regenerateFrom: dauId });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
      {/* Action Bar */}
      <ActionBar 
        onNavigate={onNavigate}
        currentView="dau-history"
        showBackButton={true}
        backTo="dashboard"
        customActions={[
          {
            label: "Nouveau DAU",
            action: () => onNavigate("dau-generator"),
            icon: FileText,
            variant: "default",
            primary: true
          },
          {
            label: "Assistant Douanes",
            action: () => onNavigate("customs"),
            icon: CheckCircle,
            variant: "outline"
          }
        ]}
      />

      {/* En-tête */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#1E40AF] text-white rounded-lg">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Mes Documents DAU</h1>
            <p className="text-gray-600">Historique et gestion de vos Documents Administratifs Uniques</p>
          </div>
          <div className="ml-auto">
            <Badge className="bg-[#10B981] text-white">
              {filteredDocuments.length} document(s)
            </Badge>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total DAU</p>
                <p className="text-2xl font-bold text-[#1E40AF]">{dauDocuments.length}</p>
              </div>
              <FileText className="h-8 w-8 text-[#1E40AF]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Validés</p>
                <p className="text-2xl font-bold text-[#10B981]">
                  {dauDocuments.filter(d => d.status === 'validé').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-[#10B981]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-orange-500">
                  {dauDocuments.filter(d => d.status === 'en_attente').length}
                </p>
              </div>
              <RefreshCw className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Valeur totale</p>
                <p className="text-2xl font-bold text-[#1E40AF]">
                  €{dauDocuments.reduce((sum, doc) => sum + parseFloat(doc.totalValue), 0).toLocaleString()}
                </p>
              </div>
              <Euro className="h-8 w-8 text-[#1E40AF]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par ID, destinataire, destination ou marchandises..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Select onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  <SelectItem value="validé">Validé</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="erreur">Erreur</SelectItem>
                </SelectContent>
              </Select>
              
              <Select onValueChange={setDateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toute période</SelectItem>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="quarter">Ce trimestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table des DAU */}
      <Card>
        <CardHeader>
          <CardTitle>Documents DAU générés</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID DAU</TableHead>
                <TableHead>Destinataire</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Marchandises</TableHead>
                <TableHead>Valeur</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Créé le</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-mono text-sm">{doc.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{doc.consigneeName}</p>
                      <p className="text-sm text-gray-500">#{doc.shipmentId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {doc.destination}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="max-w-48 truncate" title={doc.goodsDescription}>
                      {doc.goodsDescription}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Euro className="h-4 w-4 text-gray-400" />
                      {parseFloat(doc.totalValue).toLocaleString()} {doc.currency}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell className="text-sm">
                    {formatDate(doc.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {doc.status === 'validé' && (
                          <>
                            <DropdownMenuItem onClick={() => handleDownload(doc.id)}>
                              <Download className="h-4 w-4 mr-2" />
                              Télécharger PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Aperçu
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" />
                              Envoyer par email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Copier le lien
                            </DropdownMenuItem>
                          </>
                        )}
                        
                        {doc.status === 'en_attente' && (
                          <DropdownMenuItem onClick={() => handleRegenerateDAU(doc.id, doc.shipmentId)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Compléter
                          </DropdownMenuItem>
                        )}
                        
                        {doc.status === 'erreur' && (
                          <DropdownMenuItem onClick={() => handleRegenerateDAU(doc.id, doc.shipmentId)}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Corriger et régénérer
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuItem 
                          onClick={() => onNavigate("tracking", { shipmentId: doc.shipmentId })}
                        >
                          <Package className="h-4 w-4 mr-2" />
                          Voir l'envoi
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredDocuments.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Aucun document DAU trouvé</p>
              <p className="text-sm text-gray-500 mb-4">
                {searchQuery || statusFilter 
                  ? "Essayez de modifier vos filtres de recherche" 
                  : "Commencez par créer votre premier DAU"
                }
              </p>
              <Button onClick={() => onNavigate("dau-generator")} className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                <FileText className="h-4 w-4 mr-2" />
                Créer mon premier DAU
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}