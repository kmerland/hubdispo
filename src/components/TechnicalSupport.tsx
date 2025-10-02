// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { ArrowLeft, MessageCircle, Phone, Mail, Clock, User, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage } from "./LanguageProvider";

interface TechnicalSupportProps {
  onNavigate: (view: string) => void;
}

export default function TechnicalSupport({ onNavigate }: TechnicalSupportProps) {
  const { t, language } = useLanguage();
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const getContent = () => {
    switch (language) {
      case 'en':
        return {
          title: "Technical Support",
          subtitle: "Get help from our technical experts",
          channels: [
            {
              icon: MessageCircle,
              title: "Live Chat",
              description: "Instant response from our support team",
              availability: "24/7 available",
              responseTime: "&lt; 1 minute",
              color: "bg-[#1E40AF]",
              available: true
            },
            {
              icon: Phone,
              title: "Phone Support",
              description: "Direct call with technical experts",
              availability: "Mon-Fri 8am-6pm CET",
              responseTime: "Immediate",
              color: "bg-[#10B981]",
              available: true
            },
            {
              icon: Mail,
              title: "Email Support",
              description: "Detailed technical assistance",
              availability: "24/7 available",
              responseTime: "&lt; 2 hours",
              color: "bg-orange-500",
              available: true
            }
          ],
          priorities: [
            { value: "critical", label: "Critical - System down", color: "bg-red-100 text-red-700" },
            { value: "high", label: "High - Major functionality issue", color: "bg-orange-100 text-orange-700" },
            { value: "medium", label: "Medium - Minor functionality issue", color: "bg-yellow-100 text-yellow-700" },
            { value: "low", label: "Low - General question", color: "bg-blue-100 text-blue-700" }
          ],
          categories: [
            { value: "api", label: "API & Integration" },
            { value: "platform", label: "Platform Issues" },
            { value: "shipment", label: "Shipment Problems" },
            { value: "customs", label: "Customs & Documentation" },
            { value: "billing", label: "Billing & Payments" },
            { value: "other", label: "Other" }
          ],
          recentTickets: [
            {
              id: "TICK-2024-001",
              title: "API authentication issue",
              status: "resolved",
              priority: "high",
              created: "2 hours ago",
              category: "API & Integration"
            },
            {
              id: "TICK-2024-002", 
              title: "Customs document generation error",
              status: "in-progress",
              priority: "medium",
              created: "4 hours ago",
              category: "Customs & Documentation"
            },
            {
              id: "TICK-2024-003",
              title: "Shipment tracking not updating",
              status: "pending",
              priority: "low",
              created: "6 hours ago",
              category: "Shipment Problems"
            }
          ]
        };
      case 'nl':
        return {
          title: "Technische Ondersteuning",
          subtitle: "Krijg hulp van onze technische experts",
          channels: [
            {
              icon: MessageCircle,
              title: "Live Chat",
              description: "Directe reactie van ons ondersteuningsteam",
              availability: "24/7 beschikbaar",
              responseTime: "&lt; 1 minuut",
              color: "bg-[#1E40AF]",
              available: true
            },
            {
              icon: Phone,
              title: "Telefoonondersteuning",
              description: "Direct gesprek met technische experts",
              availability: "Ma-Vr 8u-18u CET",
              responseTime: "Onmiddellijk",
              color: "bg-[#10B981]",
              available: true
            },
            {
              icon: Mail,
              title: "E-mailondersteuning",
              description: "Gedetailleerde technische assistentie",
              availability: "24/7 beschikbaar",
              responseTime: "&lt; 2 uur",
              color: "bg-orange-500",
              available: true
            }
          ],
          priorities: [
            { value: "critical", label: "Kritiek - Systeem niet bereikbaar", color: "bg-red-100 text-red-700" },
            { value: "high", label: "Hoog - Belangrijk functionaliteitsprobleem", color: "bg-orange-100 text-orange-700" },
            { value: "medium", label: "Gemiddeld - Klein functionaliteitsprobleem", color: "bg-yellow-100 text-yellow-700" },
            { value: "low", label: "Laag - Algemene vraag", color: "bg-blue-100 text-blue-700" }
          ],
          categories: [
            { value: "api", label: "API & Integratie" },
            { value: "platform", label: "Platform Problemen" },
            { value: "shipment", label: "Zending Problemen" },
            { value: "customs", label: "Douane & Documentatie" },
            { value: "billing", label: "Facturering & Betalingen" },
            { value: "other", label: "Andere" }
          ],
          recentTickets: [
            {
              id: "TICK-2024-001",
              title: "API authenticatie probleem",
              status: "resolved",
              priority: "high",
              created: "2 uur geleden",
              category: "API & Integratie"
            },
            {
              id: "TICK-2024-002", 
              title: "Douanedocument generatie fout",
              status: "in-progress",
              priority: "medium",
              created: "4 uur geleden",
              category: "Douane & Documentatie"
            },
            {
              id: "TICK-2024-003",
              title: "Zending tracking wordt niet bijgewerkt",
              status: "pending",
              priority: "low",
              created: "6 uur geleden",
              category: "Zending Problemen"
            }
          ]
        };
      default: // fr
        return {
          title: "Support technique",
          subtitle: "Obtenez de l'aide de nos experts techniques",
          channels: [
            {
              icon: MessageCircle,
              title: "Chat en direct",
              description: "Réponse instantanée de notre équipe support",
              availability: "Disponible 24h/24",
              responseTime: "&lt; 1 minute",
              color: "bg-[#1E40AF]",
              available: true
            },
            {
              icon: Phone,
              title: "Support téléphonique",
              description: "Appel direct avec nos experts techniques",
              availability: "Lun-Ven 8h-18h CET",
              responseTime: "Immédiat",
              color: "bg-[#10B981]",
              available: true
            },
            {
              icon: Mail,
              title: "Support email",
              description: "Assistance technique détaillée",
              availability: "Disponible 24h/24",
              responseTime: "&lt; 2 heures",
              color: "bg-orange-500",
              available: true
            }
          ],
          priorities: [
            { value: "critical", label: "Critique - Système inaccessible", color: "bg-red-100 text-red-700" },
            { value: "high", label: "Élevé - Problème fonctionnel majeur", color: "bg-orange-100 text-orange-700" },
            { value: "medium", label: "Moyen - Problème fonctionnel mineur", color: "bg-yellow-100 text-yellow-700" },
            { value: "low", label: "Faible - Question générale", color: "bg-blue-100 text-blue-700" }
          ],
          categories: [
            { value: "api", label: "API & Intégration" },
            { value: "platform", label: "Problèmes de plateforme" },
            { value: "shipment", label: "Problèmes d'envoi" },
            { value: "customs", label: "Douane & Documentation" },
            { value: "billing", label: "Facturation & Paiements" },
            { value: "other", label: "Autre" }
          ],
          recentTickets: [
            {
              id: "TICK-2024-001",
              title: "Problème d'authentification API",
              status: "resolved",
              priority: "high",
              created: "Il y a 2 heures",
              category: "API & Intégration"
            },
            {
              id: "TICK-2024-002", 
              title: "Erreur génération document douanier",
              status: "in-progress",
              priority: "medium",
              created: "Il y a 4 heures",
              category: "Douane & Documentation"
            },
            {
              id: "TICK-2024-003",
              title: "Suivi d'envoi non mis à jour",
              status: "pending",
              priority: "low",
              created: "Il y a 6 heures",
              category: "Problèmes d'envoi"
            }
          ]
        };
    }
  };

  const content = getContent();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-100 text-green-700">Résolu</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-700">En cours</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">En attente</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">Inconnu</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-700";
      case "high":
        return "bg-orange-100 text-orange-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";  
      case "low":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
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
              <User className="h-6 w-6 text-[#10B981]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
              <p className="text-gray-600">{content.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Channels */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-6">Canaux de support</h2>
              <div className="grid gap-4">
                {content.channels.map((channel, index) => (
                  <Card key={index} className={`hover:shadow-md transition-shadow ${channel.available ? 'cursor-pointer' : 'opacity-60'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${channel.color} text-white`}>
                          <channel.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{channel.title}</h3>
                            {channel.available && (
                              <Badge className="bg-green-100 text-green-700">Disponible</Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{channel.description}</p>
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {channel.availability}
                            </span>
                            <span>Délai: {channel.responseTime}</span>
                          </div>
                        </div>
                        <Button 
                          className={channel.available ? channel.color : 'bg-gray-400'}
                          disabled={!channel.available}
                        >
                          Contacter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* New Ticket Form */}
            <Card>
              <CardHeader>
                <CardTitle>Créer un nouveau ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Priorité</label>
                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la priorité" />
                      </SelectTrigger>
                      <SelectContent>
                        {content.priorities.map(priority => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <Badge className={priority.color}>
                              {priority.label}
                            </Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Catégorie</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {content.categories.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sujet</label>
                  <Input placeholder="Décrivez brièvement votre problème..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea 
                    placeholder="Décrivez votre problème en détail. Incluez les étapes pour reproduire le problème, messages d'erreur, etc."
                    rows={5}
                  />
                </div>
                <Button className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                  Créer le ticket
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Tickets */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vos tickets récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.recentTickets.map((ticket, index) => (
                    <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(ticket.status)}
                          <span className="text-sm font-medium text-[#1E40AF]">
                            {ticket.id}
                          </span>
                        </div>
                        {getStatusBadge(ticket.status)}
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {ticket.title}
                      </h4>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{ticket.category}</span>
                        <span>{ticket.created}</span>
                      </div>
                      <Badge className={`mt-2 ${getPriorityColor(ticket.priority)}`} size="sm">
                        {ticket.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Support Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiques support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Temps de réponse moyen</span>
                    <span className="font-semibold text-[#10B981]">&lt; 15 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Taux de résolution</span>
                    <span className="font-semibold text-[#10B981]">98.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Satisfaction client</span>
                    <span className="font-semibold text-[#10B981]">4.9/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tickets résolus ce mois</span>
                    <span className="font-semibold text-[#1E40AF]">1,247</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Urgence critique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600 text-sm mb-3">
                  Pour les problèmes critiques affectant vos opérations :
                </p>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Appel d'urgence 24h/24
                </Button>
                <p className="text-xs text-red-500 mt-2 text-center">
                  +32 2 123 45 99 (Ligne directe)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}