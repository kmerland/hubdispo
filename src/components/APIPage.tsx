// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ArrowLeft, Code, Book, Zap, Shield, Globe, Copy, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface APIPageProps {
  onNavigate: (view: string) => void;
}

export default function APIPage({ onNavigate }: APIPageProps) {
  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/shipments",
      description: "Créer un nouvel envoi",
      auth: "API Key required",
      example: `{
  "origin": {
    "company": "Mon Entreprise SPRL",
    "address": "Rue du Commerce 123",
    "city": "Bruxelles",
    "postal_code": "1000",
    "country": "BE"
  },
  "destination": {
    "company": "Client GmbH", 
    "address": "Hauptstraße 456",
    "city": "Munich",
    "postal_code": "80331",
    "country": "DE"
  },
  "package": {
    "weight": 2.5,
    "dimensions": {
      "length": 30,
      "width": 20, 
      "height": 15
    },
    "value": 150.00,
    "currency": "EUR"
  },
  "service_type": "standard",
  "consolidation_eligible": true
}`
    },
    {
      method: "GET",
      path: "/api/v1/shipments/{id}",
      description: "Récupérer les détails d'un envoi",
      auth: "API Key required",
      example: `{
  "id": "SHP-123456",
  "tracking_number": "HD4B7K9M2Q1",
  "status": "in_transit",
  "current_location": "DHL Hub Zaventem",
  "estimated_delivery": "2025-01-17T14:00:00Z",
  "consolidation_group": "CON-789",
  "customs_status": "cleared",
  "cost": {
    "shipping": 24.50,
    "fuel_surcharge": 2.30,
    "total": 26.80,
    "currency": "EUR",
    "savings_vs_standard": 8.70
  }
}`
    },
    {
      method: "GET",
      path: "/api/v1/tracking/{tracking_number}",
      description: "Suivre un colis en temps réel",
      auth: "Public ou API Key",
      example: `{
  "tracking_number": "HD4B7K9M2Q1",
  "status": "in_transit",
  "events": [
    {
      "timestamp": "2025-01-15T09:30:00Z",
      "location": "Bruxelles - Hub de départ",
      "status": "collected",
      "description": "Colis collecté"
    },
    {
      "timestamp": "2025-01-15T18:45:00Z", 
      "location": "Zaventem - Hub de tri",
      "status": "sorting",
      "description": "En cours de tri"
    }
  ]
}`
    },
    {
      method: "GET",
      path: "/api/v1/consolidations",
      description: "Lister les opportunités de consolidation",
      auth: "API Key required", 
      example: `{
  "available_consolidations": [
    {
      "id": "CON-789",
      "destination": "Munich, DE",
      "departure_date": "2025-01-16T08:00:00Z",
      "available_space": {
        "weight": 45.5,
        "volume": 0.12
      },
      "estimated_savings": 8.70,
      "participants": 6
    }
  ]
}`
    }
  ];

  const sdks = [
    {
      language: "Node.js",
      description: "SDK officiel pour applications Node.js/JavaScript",
      install: "npm install @hubdispo/api-client",
      example: `const HubDispo = require('@hubdispo/api-client');

const client = new HubDispo({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Créer un envoi
const shipment = await client.shipments.create({
  origin: { /* ... */ },
  destination: { /* ... */ },
  package: { /* ... */ }
});`
    },
    {
      language: "Python",
      description: "SDK pour applications Python/Django",
      install: "pip install hubdispo-python",
      example: `from hubdispo import HubDispoClient

client = HubDispoClient(
    api_key='your-api-key',
    environment='production'
)

# Créer un envoi
shipment = client.shipments.create({
    'origin': { # ... },
    'destination': { # ... },
    'package': { # ... }
})`
    },
    {
      language: "PHP",
      description: "SDK pour applications PHP/Laravel",
      install: "composer require hubdispo/php-sdk",
      example: `use HubDispo\\Client;

$client = new Client([
    'api_key' => 'your-api-key',
    'environment' => 'production'
]);

// Créer un envoi
$shipment = $client->shipments()->create([
    'origin' => [ /* ... */ ],
    'destination' => [ /* ... */ ],
    'package' => [ /* ... */ ]
]);`
    }
  ];

  const webhooks = [
    {
      event: "shipment.created",
      description: "Déclenché lors de la création d'un nouvel envoi",
      payload: "Données complètes de l'envoi"
    },
    {
      event: "shipment.status_updated", 
      description: "Changement de statut d'un envoi",
      payload: "Nouveau statut + localisation"
    },
    {
      event: "consolidation.available",
      description: "Nouvelle opportunité de consolidation détectée",
      payload: "Détails du groupage + économies estimées"
    },
    {
      event: "customs.cleared",
      description: "Dédouanement terminé avec succès",
      payload: "Statut douanier + documents"
    },
    {
      event: "delivery.completed",
      description: "Livraison confirmée chez le destinataire",
      payload: "Confirmation + signature digitale"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate('documentation')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">API hubdispo.be</h1>
              <p className="text-gray-600 mt-2">Intégrez notre plateforme dans vos systèmes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 px-4 py-2 rounded-full mb-6">
            <Code className="h-5 w-5 text-[#1E40AF]" />
            <span className="text-[#1E40AF] font-medium">API REST v1.0</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            API <span className="text-[#1E40AF]">puissante</span> et<br />
            <span className="text-[#10B981]">simple</span> à intégrer
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Intégrez les fonctionnalités de hubdispo.be directement dans vos applications 
            avec notre API REST moderne, nos SDKs officiels et notre documentation complète.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-16 bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5 border-none">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  <Zap className="h-6 w-6 inline-block mr-2 text-[#1E40AF]" />
                  Démarrage Rapide
                </h3>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1E40AF] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span>Obtenez votre clé API dans votre tableau de bord</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1E40AF] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span>Installez notre SDK officiel ou utilisez l'API directement</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#10B981] text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                    <span>Créez votre premier envoi en moins de 5 minutes</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm overflow-x-auto">
                <pre className="text-sm">
{`# Installation Node.js
$ npm install @hubdispo/api-client

# Premier envoi
const client = new HubDispo({
  apiKey: 'your-key'
});

const shipment = await client.shipments.create({
  origin: { city: 'Bruxelles' },
  destination: { city: 'Munich' }
});`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Documentation Tabs */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Documentation API</h3>
          
          <Tabs defaultValue="endpoints" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="sdks">SDKs</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="authentication">Auth</TabsTrigger>
            </TabsList>
            
            <TabsContent value="endpoints" className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={`${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-600' :
                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{endpoint.path}</code>
                      </div>
                      <Badge variant="outline" className="text-xs">{endpoint.auth}</Badge>
                    </div>
                    <CardTitle className="text-lg">{endpoint.description}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2 flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          Exemple de réponse :
                        </h5>
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                          <pre className="text-xs">{endpoint.example}</pre>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Copy className="h-4 w-4 mr-2" />
                          Copier
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Tester
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="sdks" className="space-y-6">
              {sdks.map((sdk, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-[#1E40AF]" />
                      SDK {sdk.language}
                    </CardTitle>
                    <p className="text-gray-600">{sdk.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">Installation :</h5>
                        <div className="bg-gray-900 text-green-400 p-3 rounded-lg">
                          <code className="text-sm">{sdk.install}</code>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Exemple d'utilisation :</h5>
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                          <pre className="text-xs">{sdk.example}</pre>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm">
                          <Book className="h-4 w-4 mr-2" />
                          Documentation complète
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="webhooks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration des Webhooks</CardTitle>
                  <p className="text-gray-600">
                    Recevez des notifications temps réel sur les événements de vos envois
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6">
                    <pre className="text-xs">{`POST https://votre-site.com/webhooks/hubdispo
Content-Type: application/json
X-HubDispo-Signature: sha256=...

{
  "event": "shipment.status_updated",
  "data": {
    "shipment_id": "SHP-123456", 
    "tracking_number": "HD4B7K9M2Q1",
    "status": "delivered",
    "timestamp": "2025-01-17T14:32:00Z"
  }
}`}</pre>
                  </div>
                  
                  <div className="space-y-4">
                    <h5 className="font-medium">Événements disponibles :</h5>
                    {webhooks.map((webhook, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-3 h-3 bg-[#10B981] rounded-full mt-1.5 flex-shrink-0" />
                        <div>
                          <code className="text-sm font-medium text-[#1E40AF]">{webhook.event}</code>
                          <p className="text-gray-600 text-sm mt-1">{webhook.description}</p>
                          <p className="text-gray-500 text-xs mt-1">Payload : {webhook.payload}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="authentication">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#1E40AF]" />
                    Authentification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h5 className="font-medium mb-3">Clé API</h5>
                      <p className="text-gray-600 text-sm mb-3">
                        Utilisez votre clé API dans l'en-tête Authorization de chaque requête :
                      </p>
                      <div className="bg-gray-900 text-green-400 p-3 rounded-lg">
                        <code className="text-sm">Authorization: Bearer your-api-key</code>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-3">Environnements</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <h6 className="font-medium text-orange-900 mb-2">Sandbox</h6>
                          <code className="text-sm text-orange-700">https://api-sandbox.hubdispo.be</code>
                          <p className="text-xs text-orange-600 mt-2">Pour vos tests et développement</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h6 className="font-medium text-green-900 mb-2">Production</h6>
                          <code className="text-sm text-green-700">https://api.hubdispo.be</code>
                          <p className="text-xs text-green-600 mt-2">Pour vos envois réels</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-3">Limites de taux</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">1000</div>
                          <div className="text-sm text-blue-600">req/heure</div>
                          <div className="text-xs text-gray-500 mt-1">Plan Starter</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600">5000</div>
                          <div className="text-sm text-green-600">req/heure</div>
                          <div className="text-xs text-gray-500 mt-1">Plan Pro</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-xl font-bold text-purple-600">Illimité</div>
                          <div className="text-sm text-purple-600">req/heure</div>
                          <div className="text-xs text-gray-500 mt-1">Plan Enterprise</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 text-center">
              <Book className="h-12 w-12 text-[#1E40AF] mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Documentation</h4>
              <p className="text-gray-600 text-sm mb-4">Guide complet avec exemples</p>
              <Button size="sm" onClick={() => onNavigate('documentation')}>
                Consulter
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 text-center">
              <Code className="h-12 w-12 text-[#10B981] mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Exemples de Code</h4>
              <p className="text-gray-600 text-sm mb-4">Snippets prêts à utiliser</p>
              <Button size="sm" variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-8 text-center">
              <Globe className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h4 className="text-lg font-semibold mb-2">Playground</h4>
              <p className="text-gray-600 text-sm mb-4">Testez l'API en ligne</p>
              <Button size="sm" variant="outline">
                Essayer
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Support CTA */}
        <Card className="bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5 border-none">
          <CardContent className="p-12 text-center">
            <Code className="h-12 w-12 text-[#1E40AF] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Besoin d'aide pour l'intégration ?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Notre équipe technique est là pour vous accompagner dans l'intégration de l'API. 
              Support dédié pour les développeurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                onClick={() => onNavigate('technical-support')}
              >
                Support technique
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('register')}
              >
                Créer un compte développeur
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}