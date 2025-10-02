// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { FileText, Download, CheckCircle, Clock, XCircle, Search, Filter, Eye, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface CustomsDeclaration {
  id: string;
  shipmentId: string;
  documentType: string;
  destination: string;
  submitDate: string;
  status: "accepted" | "pending" | "rejected" | "under_review";
  value: string;
  hsCode: string;
  agent?: string;
  rejectionReason?: string;
  documentUrl?: string;
}

interface CustomsHistoryHubProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function CustomsHistoryHub({ onNavigate }: CustomsHistoryHubProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const declarations: CustomsDeclaration[] = [
    {
      id: "DAU-2024-001",
      shipmentId: "BE-2024-789",
      documentType: "Document Administratif Unique",
      destination: "Allemagne",
      submitDate: "2024-10-01",
      status: "accepted",
      value: "1,250.00",
      hsCode: "8517.12.00",
      agent: "A. Dubois"
    },
    {
      id: "DAU-2024-002", 
      shipmentId: "BE-2024-790",
      documentType: "Déclaration d'exportation",
      destination: "France",
      submitDate: "2024-10-02",
      status: "pending",
      value: "890.50",
      hsCode: "6203.42.90"
    },
    {
      id: "DAU-2024-003",
      shipmentId: "BE-2024-791",
      documentType: "Document Administratif Unique",
      destination: "Pays-Bas", 
      submitDate: "2024-09-30",
      status: "rejected",
      value: "2,100.00",
      hsCode: "8708.99.10",
      rejectionReason: "Classification HS incorrecte - produit ne correspond pas au code déclaré"
    },
    {
      id: "DAU-2024-004",
      shipmentId: "BE-2024-792",
      documentType: "Déclaration Intrastat",
      destination: "Italie",
      submitDate: "2024-10-03",
      status: "under_review",
      value: "750.25",
      hsCode: "3304.99.00",
      agent: "M. Van Der Berg"
    },
    {
      id: "DAU-2024-005",
      shipmentId: "BE-2024-793",
      documentType: "Document Administratif Unique",
      destination: "Espagne",
      submitDate: "2024-09-28",
      status: "accepted",
      value: "1,890.00", 
      hsCode: "8471.30.00",
      agent: "S. Martinez"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted": return <CheckCircle className="h-4 w-4 text-[#10B981]" />;
      case "pending": return <Clock className="h-4 w-4 text-amber-500" />;
      case "rejected": return <XCircle className="h-4 w-4 text-red-500" />;
      case "under_review": return <Eye className="h-4 w-4 text-[#1E40AF]" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      accepted: { label: "Accepté", className: "bg-[#10B981] text-white" },
      pending: { label: "En attente", className: "bg-amber-500 text-white" },
      rejected: { label: "Rejeté", className: "bg-red-500 text-white" },
      under_review: { label: "En révision", className: "bg-[#1E40AF] text-white" }
    };
    
    const config = configs[status as keyof typeof configs] || { label: status, className: "bg-gray-500 text-white" };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredDeclarations = declarations.filter(decl => {
    const matchesSearch = !searchTerm || 
      decl.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      decl.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      decl.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || decl.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: declarations.length,
    accepted: declarations.filter(d => d.status === "accepted").length,
    pending: declarations.filter(d => d.status === "pending").length,
    rejected: declarations.filter(d => d.status === "rejected").length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Historique des déclarations douanières</h1>
          <p className="text-gray-600">Centralisation et traçabilité de toutes vos démarches douanières</p>
        </div>
        <Button className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
          Nouvelle déclaration
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-[#1E40AF]" />
              <div>
                <p className="text-2xl font-semibold">{stats.total}</p>
                <p className="text-sm text-gray-600">Total déclarations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-[#10B981]" />
              <div>
                <p className="text-2xl font-semibold">{stats.accepted}</p>
                <p className="text-sm text-gray-600">Acceptées</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-amber-500" />
              <div>
                <p className="text-2xl font-semibold">{stats.pending}</p>
                <p className="text-sm text-gray-600">En attente</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-semibold">{stats.rejected}</p>
                <p className="text-sm text-gray-600">Rejetées</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ID déclaration, envoi, destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Statut</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  <SelectItem value="accepted">Accepté</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="rejected">Rejeté</SelectItem>
                  <SelectItem value="under_review">En révision</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Période</label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Toutes les dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les dates</SelectItem>
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

      {/* Tableau des déclarations */}
      <Card>
        <CardHeader>
          <CardTitle>Déclarations douanières ({filteredDeclarations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Statut</TableHead>
                <TableHead>ID Déclaration</TableHead>
                <TableHead>Type de document</TableHead>
                <TableHead>Envoi</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Valeur</TableHead>
                <TableHead>Code HS</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeclarations.map((declaration) => (
                <TableRow key={declaration.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(declaration.status)}
                      {getStatusBadge(declaration.status)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{declaration.id}</TableCell>
                  <TableCell>{declaration.documentType}</TableCell>
                  <TableCell>
                    <Button variant="link" className="p-0 h-auto text-[#1E40AF]">
                      {declaration.shipmentId}
                    </Button>
                  </TableCell>
                  <TableCell>{declaration.destination}</TableCell>
                  <TableCell>€{declaration.value}</TableCell>
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {declaration.hsCode}
                    </code>
                  </TableCell>
                  <TableCell>{new Date(declaration.submitDate).toLocaleDateString('fr-BE')}</TableCell>
                  <TableCell>{declaration.agent || "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Section des erreurs/rejets */}
      {declarations.filter(d => d.status === "rejected").length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Déclarations rejetées - Actions requises
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {declarations
              .filter(d => d.status === "rejected")
              .map((declaration) => (
                <div key={declaration.id} className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-red-800">{declaration.id}</h4>
                      <p className="text-sm text-red-600 mt-1">
                        Envoi: {declaration.shipmentId} • {declaration.destination}
                      </p>
                      {declaration.rejectionReason && (
                        <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">
                          <strong>Motif:</strong> {declaration.rejectionReason}
                        </p>
                      )}
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      Corriger
                    </Button>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}