// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { ArrowLeft, Search, Book, Code, Truck, Shield, Settings, Globe, ChevronRight, Copy, ExternalLink, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useLanguage } from "./LanguageProvider";

interface DocumentationProps {
  onNavigate: (view: string) => void;
}

export default function Documentation({ onNavigate }: DocumentationProps) {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const getContent = () => {
    switch (language) {
      case 'en':
        return {
          title: "Documentation",
          subtitle: "Complete technical documentation for hubdispo.be",
          sections: {
            gettingStarted: {
              title: "Getting Started",
              icon: Book,
              items: [
                { title: "Quick Start Guide", description: "Set up your first shipment in 5 minutes", time: "5 min read" },
                { title: "Account Setup", description: "Configure your company profile and preferences", time: "3 min read" },
                { title: "Integration Overview", description: "Understanding hubdispo.be ecosystem", time: "7 min read" },
                { title: "First Shipment Walkthrough", description: "Step-by-step creation of your first order", time: "8 min read" }
              ]
            },
            logistics: {
              title: "Logistics & Consolidation",
              icon: Truck,
              items: [
                { title: "Micro-consolidation Explained", description: "How our consolidation algorithm works", time: "10 min read" },
                { title: "Packaging Guidelines", description: "Optimal packaging for consolidation", time: "6 min read" },
                { title: "Delivery Options", description: "Available delivery methods and timing", time: "4 min read" },
                { title: "Tracking Integration", description: "Real-time tracking implementation", time: "12 min read" }
              ]
            },
            customs: {
              title: "Customs & Compliance",
              icon: Shield,
              items: [
                { title: "AI Customs Assistant", description: "Automated document generation system", time: "8 min read" },
                { title: "Document Requirements", description: "Required papers by destination country", time: "15 min read" },
                { title: "Customs Codes (HS)", description: "Product classification system", time: "20 min read" },
                { title: "Compliance Checklist", description: "Ensure regulatory compliance", time: "5 min read" }
              ]
            },
            api: {
              title: "API Reference",
              icon: Code,
              items: [
                { title: "Authentication", description: "API key management and security", time: "5 min read" },
                { title: "Shipments API", description: "Create and manage shipments programmatically", time: "12 min read" },
                { title: "Tracking API", description: "Real-time shipment status updates", time: "8 min read" },
                { title: "Webhooks", description: "Event-driven integrations", time: "10 min read" }
              ]
            }
          },
          codeExamples: [
            {
              title: "Create a Shipment",
              language: "curl",
              code: `curl -X POST https://api.hubdispo.be/v1/shipments \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "origin": {
      "address": "Avenue Louise 149, Brussels, Belgium",
      "company": "Your Company"
    },
    "destination": {
      "address": "Alexanderplatz 1, Berlin, Germany", 
      "company": "Recipient Company"
    },
    "package": {
      "weight": 2.5,
      "dimensions": {
        "length": 30, "width": 20, "height": 15
      }
    }
  }'`
            },
            {
              title: "Track a Shipment",
              language: "javascript",
              code: `const response = await fetch('https://api.hubdispo.be/v1/shipments/track', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your_api_key',
    'Content-Type': 'application/json'
  }
});

const tracking = await response.json();
console.log('Shipment status:', tracking.status);`
            }
          ]
        };
      case 'nl':
        return {
          title: "Documentatie",
          subtitle: "Volledige technische documentatie voor hubdispo.be",
          sections: {
            gettingStarted: {
              title: "Aan de slag",
              icon: Book,
              items: [
                { title: "Snelstart Gids", description: "Stel uw eerste zending op in 5 minuten", time: "5 min lezen" },
                { title: "Account Instelling", description: "Configureer uw bedrijfsprofiel en voorkeuren", time: "3 min lezen" },
                { title: "Integratie Overzicht", description: "Begrijpen van het hubdispo.be ecosysteem", time: "7 min lezen" },
                { title: "Eerste Zending Doorloop", description: "Stap-voor-stap creatie van uw eerste bestelling", time: "8 min lezen" }
              ]
            },
            logistics: {
              title: "Logistiek & Consolidatie",
              icon: Truck,
              items: [
                { title: "Micro-consolidatie Uitgelegd", description: "Hoe ons consolidatie-algoritme werkt", time: "10 min lezen" },
                { title: "Verpakkingsrichtlijnen", description: "Optimale verpakking voor consolidatie", time: "6 min lezen" },
                { title: "Bezorgopties", description: "Beschikbare bezorgmethoden en timing", time: "4 min lezen" },
                { title: "Tracking Integratie", description: "Real-time tracking implementatie", time: "12 min lezen" }
              ]
            },
            customs: {
              title: "Douane & Compliance",
              icon: Shield,
              items: [
                { title: "AI Douane Assistent", description: "Geautomatiseerd documentgeneratiesysteem", time: "8 min lezen" },
                { title: "Document Vereisten", description: "Vereiste papieren per bestemmingsland", time: "15 min lezen" },
                { title: "Douanecodes (HS)", description: "Productclassificatiesysteem", time: "20 min lezen" },
                { title: "Compliance Checklist", description: "Zorg voor regelgevingsnaleving", time: "5 min lezen" }
              ]
            },
            api: {
              title: "API Referentie",
              icon: Code,
              items: [
                { title: "Authenticatie", description: "API sleutelbeheer en beveiliging", time: "5 min lezen" },
                { title: "Zendingen API", description: "Zendingen programmatisch maken en beheren", time: "12 min lezen" },
                { title: "Tracking API", description: "Real-time zendingstatusupdates", time: "8 min lezen" },
                { title: "Webhooks", description: "Event-gedreven integraties", time: "10 min lezen" }
              ]
            }
          },
          codeExamples: [
            {
              title: "Maak een Zending",
              language: "curl",
              code: `curl -X POST https://api.hubdispo.be/v1/shipments \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "origin": {
      "address": "Louizalaan 149, Brussel, België",
      "company": "Uw Bedrijf"
    },
    "destination": {
      "address": "Alexanderplatz 1, Berlijn, Duitsland", 
      "company": "Ontvanger Bedrijf"
    },
    "package": {
      "weight": 2.5,
      "dimensions": {
        "length": 30, "width": 20, "height": 15
      }
    }
  }'`
            },
            {
              title: "Volg een Zending",
              language: "javascript",
              code: `const response = await fetch('https://api.hubdispo.be/v1/shipments/track', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your_api_key',
    'Content-Type': 'application/json'
  }
});

const tracking = await response.json();
console.log('Zending status:', tracking.status);`
            }
          ]
        };
      default: // fr
        return {
          title: "Documentation",
          subtitle: "Documentation technique complète de hubdispo.be",
          sections: {
            gettingStarted: {
              title: "Démarrage",
              icon: Book,
              items: [
                { title: "Guide de démarrage rapide", description: "Configurez votre premier envoi en 5 minutes", time: "5 min de lecture" },
                { title: "Configuration du compte", description: "Configurez votre profil d'entreprise et préférences", time: "3 min de lecture" },
                { title: "Aperçu de l'intégration", description: "Comprendre l'écosystème hubdispo.be", time: "7 min de lecture" },
                { title: "Procédure du premier envoi", description: "Création étape par étape de votre première commande", time: "8 min de lecture" }
              ]
            },
            logistics: {
              title: "Logistique & Consolidation",
              icon: Truck,
              items: [
                { title: "Micro-consolidation expliquée", description: "Comment fonctionne notre algorithme de consolidation", time: "10 min de lecture" },
                { title: "Directives d'emballage", description: "Emballage optimal pour la consolidation", time: "6 min de lecture" },
                { title: "Options de livraison", description: "Méthodes de livraison disponibles et délais", time: "4 min de lecture" },
                { title: "Intégration du suivi", description: "Implémentation du suivi en temps réel", time: "12 min de lecture" }
              ]
            },
            customs: {
              title: "Douane & Conformité",
              icon: Shield,
              items: [
                { title: "Assistant douanier IA", description: "Système de génération automatique de documents", time: "8 min de lecture" },
                { title: "Exigences documentaires", description: "Papiers requis par pays de destination", time: "15 min de lecture" },
                { title: "Codes douaniers (SH)", description: "Système de classification des produits", time: "20 min de lecture" },
                { title: "Liste de conformité", description: "Assurer la conformité réglementaire", time: "5 min de lecture" }
              ]
            },
            api: {
              title: "Référence API",
              icon: Code,
              items: [
                { title: "Authentification", description: "Gestion des clés API et sécurité", time: "5 min de lecture" },
                { title: "API Envois", description: "Créer et gérer les envois par programmation", time: "12 min de lecture" },
                { title: "API Suivi", description: "Mises à jour du statut des envois en temps réel", time: "8 min de lecture" },
                { title: "Webhooks", description: "Intégrations pilotées par événements", time: "10 min de lecture" }
              ]
            }
          },
          codeExamples: [
            {
              title: "Créer un Envoi",
              language: "curl",
              code: `curl -X POST https://api.hubdispo.be/v1/shipments \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "origin": {
      "address": "Avenue Louise 149, Bruxelles, Belgique",
      "company": "Votre Entreprise"
    },
    "destination": {
      "address": "Alexanderplatz 1, Berlin, Allemagne", 
      "company": "Entreprise Destinataire"
    },
    "package": {
      "weight": 2.5,
      "dimensions": {
        "length": 30, "width": 20, "height": 15
      }
    }
  }'`
            },
            {
              title: "Suivre un Envoi",
              language: "javascript",
              code: `const response = await fetch('https://api.hubdispo.be/v1/shipments/track', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your_api_key',
    'Content-Type': 'application/json'
  }
});

const tracking = await response.json();
console.log('Statut envoi:', tracking.status);`
            }
          ]
        };
    }
  };

  const content = getContent();

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
            <div className="p-2 bg-[#1E40AF]/10 rounded-lg">
              <Book className="h-6 w-6 text-[#1E40AF]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
              <p className="text-gray-600">{content.subtitle}</p>
            </div>
          </div>
          
          {/* Search */}
          <div className="mt-6 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder={t('support.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        <Tabs defaultValue="getting-started" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="getting-started">{content.sections.gettingStarted.title}</TabsTrigger>
            <TabsTrigger value="logistics">{content.sections.logistics.title}</TabsTrigger>
            <TabsTrigger value="customs">{content.sections.customs.title}</TabsTrigger>
            <TabsTrigger value="api">{content.sections.api.title}</TabsTrigger>
          </TabsList>

          {Object.entries(content.sections).map(([key, section]) => (
            <TabsContent key={key} value={key.replace(/([A-Z])/g, '-$1').toLowerCase()}>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <section.icon className="h-6 w-6 text-[#1E40AF]" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {section.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer group">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 group-hover:text-[#1E40AF]">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                            <Badge variant="secondary" className="mt-2">
                              {item.time}
                            </Badge>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#1E40AF]" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}

          {/* API Examples Tab Content */}
          <TabsContent value="api">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-[#1E40AF]" />
                    {content.sections.api.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {content.sections.api.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer group">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-[#1E40AF]">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                          <Badge variant="secondary" className="mt-2">
                            {item.time}
                          </Badge>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#1E40AF]" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Code Examples */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Exemples de code</h2>
                {content.codeExamples.map((example, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{example.title}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Copy className="h-4 w-4 mr-2" />
                            Copier
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Essayer
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Download Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Download className="h-6 w-6 text-[#10B981]" />
              Ressources téléchargeables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <Download className="h-4 w-4" />
                    <span className="font-medium">Guide PDF</span>
                  </div>
                  <p className="text-sm text-gray-600">Guide complet de démarrage</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <Code className="h-4 w-4" />
                    <span className="font-medium">SDK JavaScript</span>
                  </div>
                  <p className="text-sm text-gray-600">Librairie d'intégration</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">Collection Postman</span>
                  </div>
                  <p className="text-sm text-gray-600">Tests API prêts à l'emploi</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}