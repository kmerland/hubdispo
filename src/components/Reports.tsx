// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { BarChart3, TrendingUp, Download, Calendar, Filter, PieChart, LineChart, Users, Package, Euro, Globe, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";

interface ReportsProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function Reports({ onNavigate }: ReportsProps) {
  const [timeRange, setTimeRange] = useState("month");
  const [reportType, setReportType] = useState("overview");

  const performanceMetrics = [
    { title: "Envois totaux", value: "247", change: "+12%", icon: Package, color: "text-[#1E40AF]" },
    { title: "Économies générées", value: "€8,450", change: "+18%", icon: Euro, color: "text-[#10B981]" },
    { title: "Taux consolidation", value: "89%", change: "+5%", icon: Users, color: "text-orange-500" },
    { title: "Délai moyen", value: "3.2j", change: "-0.5j", icon: Clock, color: "text-blue-500" }
  ];

  const destinationStats = [
    { country: "Allemagne", shipments: 87, revenue: "€3,240", growth: "+15%" },
    { country: "France", shipments: 62, revenue: "€2,180", growth: "+8%" },
    { country: "Pays-Bas", shipments: 45, revenue: "€1,560", growth: "+22%" },
    { country: "Italie", shipments: 31, revenue: "€1,120", growth: "+12%" },
    { country: "Espagne", shipments: 22, revenue: "€890", growth: "+5%" }
  ];

  const monthlyTrends = [
    { month: "Jan", shipments: 18, savings: 450 },
    { month: "Fév", shipments: 22, savings: 580 },
    { month: "Mar", shipments: 28, savings: 720 },
    { month: "Avr", shipments: 35, savings: 980 },
    { month: "Mai", shipments: 31, savings: 890 },
    { month: "Jun", shipments: 42, savings: 1200 },
    { month: "Jul", shipments: 38, savings: 1050 },
    { month: "Aoû", shipments: 29, savings: 820 },
    { month: "Sep", shipments: 45, savings: 1350 }
  ];

  const topProducts = [
    { category: "Électronique", percentage: 35, value: "€2,950" },
    { category: "Textile", percentage: 28, value: "€2,360" },
    { category: "Alimentaire", percentage: 20, value: "€1,690" },
    { category: "Cosmétiques", percentage: 12, value: "€1,010" },
    { category: "Autres", percentage: 5, value: "€420" }
  ];

  const consolidationAnalysis = [
    { type: "Envois individuels", count: 27, cost: "€1,890", co2: "156kg" },
    { type: "Micro-consolidation", count: 142, cost: "€4,260", co2: "298kg" },
    { type: "Groupe complet", count: 78, cost: "€2,300", co2: "145kg" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* En-tête */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Rapports & Analytics</h1>
          <p className="text-gray-600">Analysez vos performances et optimisez vos envois</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
            <Download className="h-4 w-4 mr-2" />
            Exporter PDF
          </Button>
        </div>
      </div>

      {/* Métriques de performance */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-semibold">{metric.value}</p>
                    <Badge 
                      variant="secondary" 
                      className={metric.change.startsWith('+') ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                    >
                      {metric.change}
                    </Badge>
                  </div>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Onglets de rapports */}
      <Tabs value={reportType} onValueChange={setReportType} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="consolidation">Consolidation</TabsTrigger>
          <TabsTrigger value="financial">Financier</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Tendances mensuelles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-[#1E40AF]" />
                  Évolution mensuelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end gap-4 p-4">
                  {monthlyTrends.map((trend, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-[#1E40AF] rounded-t opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                        style={{ height: `${(trend.shipments / 50) * 200}px` }}
                        title={`${trend.month}: ${trend.shipments} envois`}
                      ></div>
                      <span className="text-xs text-gray-600 mt-2">{trend.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Répartition par catégorie */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-[#10B981]" />
                  Catégories de produits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{product.category}</span>
                      <span className="text-sm text-gray-600">{product.value}</span>
                    </div>
                    <Progress value={product.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="destinations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#1E40AF]" />
                Performance par destination
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {destinationStats.map((dest, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#1E40AF] flex items-center justify-center text-white font-semibold text-sm">
                        {dest.country.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{dest.country}</p>
                        <p className="text-sm text-gray-600">{dest.shipments} envois</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{dest.revenue}</p>
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        {dest.growth}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consolidation" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-500" />
                  Analyse de consolidation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consolidationAnalysis.map((analysis, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{analysis.type}</h4>
                        <Badge variant="outline">{analysis.count} envois</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Coût total</p>
                          <p className="font-semibold">{analysis.cost}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Impact CO₂</p>
                          <p className="font-semibold">{analysis.co2}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Économies par consolidation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Économies totales</span>
                      <span className="text-2xl font-bold text-[#10B981]">€8,450</span>
                    </div>
                    <p className="text-xs text-gray-600">vs envois individuels traditionnels</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">CO₂ évité</span>
                      <span className="text-2xl font-bold text-blue-600">1,247 kg</span>
                    </div>
                    <p className="text-xs text-gray-600">Impact environnemental positif</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenus mensuels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#10B981]">€15,647</p>
                  <p className="text-sm text-gray-600">Ce mois</p>
                  <Badge className="bg-green-100 text-green-700 mt-2">+12% vs mois dernier</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coût moyen par envoi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#1E40AF]">€63</p>
                  <p className="text-sm text-gray-600">Moyenne pondérée</p>
                  <Badge className="bg-blue-100 text-blue-700 mt-2">-8% vs mois dernier</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Consolidation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">347%</p>
                  <p className="text-sm text-gray-600">Retour sur investissement</p>
                  <Badge className="bg-orange-100 text-orange-700 mt-2">Performance excellente</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}