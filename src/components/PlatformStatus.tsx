// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { ArrowLeft, Activity, CheckCircle, AlertCircle, XCircle, Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { useLanguage } from "./LanguageProvider";

interface PlatformStatusProps {
  onNavigate: (view: string) => void;
}

export default function PlatformStatus({ onNavigate }: PlatformStatusProps) {
  const { t, language } = useLanguage();

  const getContent = () => {
    switch (language) {
      case 'en':
        return {
          title: "Platform Status",
          subtitle: "Real-time status of all hubdispo.be services",
          overallStatus: "All systems operational",
          services: [
            {
              name: "Main Platform",
              description: "Core application and user interface",
              status: "operational",
              uptime: "99.98%",
              responseTime: "145ms",
              incidents: 0
            },
            {
              name: "AI Customs Assistant",
              description: "Automated customs document generation",
              status: "operational", 
              uptime: "99.92%",
              responseTime: "320ms",
              incidents: 1
            },
            {
              name: "Real-time Tracking",
              description: "Shipment tracking and notifications",
              status: "operational",
              uptime: "100%",
              responseTime: "89ms",
              incidents: 0
            },
            {
              name: "API Services",
              description: "Public API and integrations",
              status: "maintenance",
              uptime: "98.76%",
              responseTime: "450ms",
              incidents: 2
            },
            {
              name: "Payment Processing",
              description: "Billing and subscription management",
              status: "operational",
              uptime: "99.99%",
              responseTime: "234ms",
              incidents: 0
            },
            {
              name: "Consolidation Engine",
              description: "Micro-consolidation algorithm",
              status: "operational",
              uptime: "99.87%",
              responseTime: "567ms",
              incidents: 1
            }
          ],
          incidents: [
            {
              id: "INC-2024-003",
              title: "API rate limiting adjustment",
              status: "resolved",
              severity: "low",
              started: "2024-09-30 14:30 CET",
              resolved: "2024-09-30 15:45 CET",
              duration: "1h 15min",
              affectedServices: ["API Services"],
              description: "Temporary adjustment of API rate limits during peak usage"
            },
            {
              id: "INC-2024-002",
              title: "Consolidation engine optimization",
              status: "resolved",
              severity: "medium",
              started: "2024-09-29 10:15 CET",
              resolved: "2024-09-29 12:30 CET",
              duration: "2h 15min",
              affectedServices: ["Consolidation Engine"],
              description: "Performance optimization causing temporary delays"
            },
            {
              id: "INC-2024-001",
              title: "AI model update",
              status: "resolved",
              severity: "low",
              started: "2024-09-28 20:00 CET",
              resolved: "2024-09-28 21:30 CET",
              duration: "1h 30min",
              affectedServices: ["AI Customs Assistant"],
              description: "Scheduled AI model update with improved accuracy"
            }
          ],
          metrics: [
            { name: "Average Response Time", value: "267ms", trend: "down", change: "-12%" },
            { name: "Error Rate", value: "0.02%", trend: "down", change: "-45%" },
            { name: "API Requests/min", value: "15,432", trend: "up", change: "+8%" },
            { name: "Active Users", value: "3,247", trend: "up", change: "+15%" }
          ]
        };
      case 'nl':
        return {
          title: "Platform Status",
          subtitle: "Real-time status van alle hubdispo.be services",
          overallStatus: "Alle systemen operationeel",
          services: [
            {
              name: "Hoofdplatform",
              description: "Kern applicatie en gebruikersinterface",
              status: "operational",
              uptime: "99.98%",
              responseTime: "145ms",
              incidents: 0
            },
            {
              name: "AI Douane Assistent",
              description: "Geautomatiseerde douanedocument generatie",
              status: "operational", 
              uptime: "99.92%",
              responseTime: "320ms",
              incidents: 1
            },
            {
              name: "Real-time Tracking",
              description: "Zending tracking en meldingen",
              status: "operational",
              uptime: "100%",
              responseTime: "89ms",
              incidents: 0
            },
            {
              name: "API Services",
              description: "Publieke API en integraties",
              status: "maintenance",
              uptime: "98.76%",
              responseTime: "450ms",
              incidents: 2
            },
            {
              name: "Betalingsverwerking",
              description: "Facturering en abonnementsbeheer",
              status: "operational",
              uptime: "99.99%",
              responseTime: "234ms",
              incidents: 0
            },
            {
              name: "Consolidatie Engine",
              description: "Micro-consolidatie algoritme",
              status: "operational",
              uptime: "99.87%",
              responseTime: "567ms",
              incidents: 1
            }
          ],
          incidents: [
            {
              id: "INC-2024-003",
              title: "API rate limiting aanpassing",
              status: "resolved",
              severity: "low",
              started: "2024-09-30 14:30 CET",
              resolved: "2024-09-30 15:45 CET",
              duration: "1u 15min",
              affectedServices: ["API Services"],
              description: "Tijdelijke aanpassing van API rate limits tijdens piekgebruik"
            },
            {
              id: "INC-2024-002",
              title: "Consolidatie engine optimalisatie",
              status: "resolved",
              severity: "medium",
              started: "2024-09-29 10:15 CET",
              resolved: "2024-09-29 12:30 CET",
              duration: "2u 15min",
              affectedServices: ["Consolidatie Engine"],
              description: "Prestatie optimalisatie veroorzaakte tijdelijke vertragingen"
            },
            {
              id: "INC-2024-001",
              title: "AI model update",
              status: "resolved",
              severity: "low",
              started: "2024-09-28 20:00 CET",
              resolved: "2024-09-28 21:30 CET",
              duration: "1u 30min",
              affectedServices: ["AI Douane Assistent"],
              description: "Geplande AI model update met verbeterde nauwkeurigheid"
            }
          ],
          metrics: [
            { name: "Gemiddelde Responstijd", value: "267ms", trend: "down", change: "-12%" },
            { name: "Foutpercentage", value: "0.02%", trend: "down", change: "-45%" },
            { name: "API Verzoeken/min", value: "15,432", trend: "up", change: "+8%" },
            { name: "Actieve Gebruikers", value: "3,247", trend: "up", change: "+15%" }
          ]
        };
      default: // fr
        return {
          title: "Statut plateforme",
          subtitle: "Statut en temps réel de tous les services hubdispo.be",
          overallStatus: "Tous les systèmes opérationnels",
          services: [
            {
              name: "Plateforme principale",
              description: "Application principale et interface utilisateur",
              status: "operational",
              uptime: "99.98%",
              responseTime: "145ms",
              incidents: 0
            },
            {
              name: "Assistant douanier IA",
              description: "Génération automatique de documents douaniers",
              status: "operational", 
              uptime: "99.92%",
              responseTime: "320ms",
              incidents: 1
            },
            {
              name: "Suivi temps réel",
              description: "Suivi d'envois et notifications",
              status: "operational",
              uptime: "100%",
              responseTime: "89ms",
              incidents: 0
            },
            {
              name: "Services API",
              description: "API publique et intégrations",
              status: "maintenance",
              uptime: "98.76%",
              responseTime: "450ms",
              incidents: 2
            },
            {
              name: "Traitement des paiements",
              description: "Facturation et gestion des abonnements",
              status: "operational",
              uptime: "99.99%",
              responseTime: "234ms",
              incidents: 0
            },
            {
              name: "Moteur de consolidation",
              description: "Algorithme de micro-consolidation",
              status: "operational",
              uptime: "99.87%",
              responseTime: "567ms",
              incidents: 1
            }
          ],
          incidents: [
            {
              id: "INC-2024-003",
              title: "Ajustement des limites de taux API",
              status: "resolved",
              severity: "low",
              started: "2024-09-30 14:30 CET",
              resolved: "2024-09-30 15:45 CET",
              duration: "1h 15min",
              affectedServices: ["Services API"],
              description: "Ajustement temporaire des limites de taux API pendant les pics d'utilisation"
            },
            {
              id: "INC-2024-002",
              title: "Optimisation du moteur de consolidation",
              status: "resolved",
              severity: "medium",
              started: "2024-09-29 10:15 CET",
              resolved: "2024-09-29 12:30 CET",
              duration: "2h 15min",
              affectedServices: ["Moteur de consolidation"],
              description: "Optimisation des performances causant des retards temporaires"
            },
            {
              id: "INC-2024-001",
              title: "Mise à jour du modèle IA",
              status: "resolved",
              severity: "low",
              started: "2024-09-28 20:00 CET",
              resolved: "2024-09-28 21:30 CET",
              duration: "1h 30min",
              affectedServices: ["Assistant douanier IA"],
              description: "Mise à jour programmée du modèle IA avec précision améliorée"
            }
          ],
          metrics: [
            { name: "Temps de réponse moyen", value: "267ms", trend: "down", change: "-12%" },
            { name: "Taux d'erreur", value: "0.02%", trend: "down", change: "-45%" },
            { name: "Requêtes API/min", value: "15,432", trend: "up", change: "+8%" },
            { name: "Utilisateurs actifs", value: "3,247", trend: "up", change: "+15%" }
          ]
        };
    }
  };

  const content = getContent();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "maintenance":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case "outage":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-100 text-green-700">{t('support.operational')}</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-700">{t('support.maintenance')}</Badge>;
      case "degraded":
        return <Badge className="bg-orange-100 text-orange-700">Dégradé</Badge>;
      case "outage":
        return <Badge className="bg-red-100 text-red-700">Panne</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">Inconnu</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-100 text-red-700">Critique</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-700">Élevé</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-700">Moyen</Badge>;
      case "low":
        return <Badge className="bg-blue-100 text-blue-700">Faible</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">Inconnu</Badge>;
    }
  };

  const getIncidentIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "investigating":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "identified":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case "monitoring":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("help")}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('support.back_to_help')}
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#10B981]/10 rounded-lg">
              <Activity className="h-6 w-6 text-[#10B981]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
              <p className="text-gray-600">{content.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Status */}
      <div className="bg-green-50 border-b border-green-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span className="text-lg font-semibold text-green-700">
              {content.overallStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        <Tabs defaultValue="services" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="metrics">Métriques</TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="grid gap-4">
              {content.services.map((service, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(service.status)}
                        <div>
                          <h3 className="font-semibold text-gray-900">{service.name}</h3>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Disponibilité</div>
                          <div className="font-semibold">{service.uptime}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Latence</div>
                          <div className="font-semibold">{service.responseTime}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Incidents 30j</div>
                          <div className="font-semibold">{service.incidents}</div>
                        </div>
                        {getStatusBadge(service.status)}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress 
                        value={parseFloat(service.uptime.replace('%', ''))} 
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Incidents Tab */}
          <TabsContent value="incidents">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Historique des incidents</h2>
                <Badge className="bg-green-100 text-green-700">
                  0 incident actif
                </Badge>
              </div>
              
              {content.incidents.map((incident, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        {getIncidentIcon(incident.status)}
                        <div>
                          <h3 className="font-semibold text-gray-900">{incident.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{incident.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(incident.severity)}
                        <Badge className="bg-green-100 text-green-700">Résolu</Badge>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Début:</span>
                        <div className="font-medium">{incident.started}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Résolu:</span>
                        <div className="font-medium">{incident.resolved}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Durée:</span>
                        <div className="font-medium">{incident.duration}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Services affectés:</span>
                        <div className="font-medium">{incident.affectedServices.join(', ')}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Métriques de performance</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {content.metrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{metric.name}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {metric.value}
                      </div>
                      <div className={`text-sm flex items-center gap-1 ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <span>{metric.change}</span>
                        <span className="text-gray-500">vs 7j</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Uptime Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Disponibilité - Derniers 30 jours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Graphique de disponibilité</p>
                      <p className="text-sm">Données en temps réel</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Subscribe to Updates */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Restez informé</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Recevez des notifications en cas d'incident ou de maintenance programmée.
            </p>
            <div className="flex gap-3">
              <Button className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                S'abonner aux notifications
              </Button>
              <Button variant="outline">
                Flux RSS
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}