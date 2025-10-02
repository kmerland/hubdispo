// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { Package, Search, Filter, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface ShipmentsListProps {
  onViewTracking: (shipmentId: string) => void;
  onNavigate?: (view: string) => void;
}

export default function ShipmentsList({ onViewTracking, onNavigate }: ShipmentsListProps) {
  const shipments = [
    { 
      id: "BE-2024-001", 
      destination: "Allemagne (Hamburg)", 
      status: "consolidation", 
      items: 3, 
      value: "€450.00",
      created: "30 Sept 2024",
      estimated: "8-10 Oct 2024"
    },
    { 
      id: "BE-2024-002", 
      destination: "France (Lyon)", 
      status: "transit", 
      items: 1, 
      value: "€285.00",
      created: "28 Sept 2024",
      estimated: "5-7 Oct 2024"
    },
    { 
      id: "BE-2024-003", 
      destination: "Pays-Bas (Amsterdam)", 
      status: "customs", 
      items: 2, 
      value: "€670.00",
      created: "27 Sept 2024",
      estimated: "4-6 Oct 2024"
    },
    { 
      id: "BE-2024-004", 
      destination: "Italie (Milano)", 
      status: "delivered", 
      items: 1, 
      value: "€320.00",
      created: "25 Sept 2024",
      delivered: "3 Oct 2024"
    },
    { 
      id: "BE-2024-005", 
      destination: "Allemagne (Berlin)", 
      status: "consolidation", 
      items: 4, 
      value: "€890.00",
      created: "24 Sept 2024",
      estimated: "7-9 Oct 2024"
    },
    { 
      id: "BE-2024-006", 
      destination: "France (Paris)", 
      status: "delivered", 
      items: 2, 
      value: "€540.00",
      created: "20 Sept 2024",
      delivered: "30 Sept 2024"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "consolidation":
        return <Badge className="bg-orange-100 text-orange-700">En consolidation</Badge>;
      case "transit":
        return <Badge className="bg-blue-100 text-blue-700">En transit</Badge>;
      case "customs":
        return <Badge className="bg-amber-100 text-amber-700">En douane</Badge>;
      case "delivered":
        return <Badge className="bg-[#10B981] text-white">Livré</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const statusCounts = {
    all: shipments.length,
    active: shipments.filter(s => ['consolidation', 'transit', 'customs'].includes(s.status)).length,
    delivered: shipments.filter(s => s.status === 'delivered').length,
    consolidation: shipments.filter(s => s.status === 'consolidation').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Mes envois</h1>
          <p className="text-gray-600">Gérez et suivez tous vos envois internationaux</p>
        </div>
        <Button 
          className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
          onClick={() => onNavigate?.("new-shipment")}
        >
          <Package className="h-4 w-4 mr-2" />
          Nouvel envoi
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-[#1E40AF]">{statusCounts.all}</div>
            <div className="text-sm text-gray-600">Total envois</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-orange-600">{statusCounts.active}</div>
            <div className="text-sm text-gray-600">En cours</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-[#10B981]">{statusCounts.delivered}</div>
            <div className="text-sm text-gray-600">Livrés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-semibold text-blue-600">{statusCounts.consolidation}</div>
            <div className="text-sm text-gray-600">En consolidation</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Rechercher par ID ou destination..." 
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="consolidation">En consolidation</SelectItem>
                  <SelectItem value="transit">En transit</SelectItem>
                  <SelectItem value="customs">En douane</SelectItem>
                  <SelectItem value="delivered">Livrés</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="recent">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Plus récents</SelectItem>
                  <SelectItem value="oldest">Plus anciens</SelectItem>
                  <SelectItem value="value-high">Valeur ↓</SelectItem>
                  <SelectItem value="value-low">Valeur ↑</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des envois</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Envoi</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Valeur</TableHead>
                <TableHead>Date création</TableHead>
                <TableHead>Livraison estimée</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id} className="hover:bg-gray-50 cursor-pointer">
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                  <TableCell>{shipment.items} article(s)</TableCell>
                  <TableCell className="font-medium">{shipment.value}</TableCell>
                  <TableCell>{shipment.created}</TableCell>
                  <TableCell>
                    {shipment.status === 'delivered' ? (
                      <span className="text-[#10B981] font-medium">
                        Livré le {shipment.delivered}
                      </span>
                    ) : (
                      shipment.estimated
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onViewTracking(shipment.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Suivre
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}