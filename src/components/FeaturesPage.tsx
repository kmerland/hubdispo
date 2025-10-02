// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ArrowLeft, Zap, Brain, Shield, Globe, Package, Users, BarChart3, Clock, Euro, CheckCircle, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface FeaturesPageProps {
  onNavigate: (view: string) => void;
}

export default function FeaturesPage({ onNavigate }: FeaturesPageProps) {
  const coreFeatures = [
    {
      icon: <Brain className="h-8 w-8 text-[#1E40AF]" />,
      title: "IA de Consolidation",
      description: "Algorithmes avancés qui identifient automatiquement les opportunités de groupage pour réduire vos coûts jusqu'à 40%.",
      benefits: ["Économies automatiques", "Optimisation temps réel", "Prédictions intelligentes"],
      category: "intelligence"
    },
    {
      icon: <Globe className="h-8 w-8 text-[#10B981]" />,
      title: "Assistant Douanier IA",
      description: "Automatisation complète de vos déclarations douanières avec vérification de conformité en temps réel.",
      benefits: ["0 erreur douanière", "Traitement instantané", "Conformité garantie"],
      category: "compliance"
    },
    {
      icon: <Package className="h-8 w-8 text-orange-500" />,
      title: "Micro-consolidation",
      description: "Regroupez vos envois avec d'autres PME pour bénéficier de tarifs négociés normalement réservés aux gros volumes.",
      benefits: ["Tarifs préférentiels", "Réseau collaboratif", "Livraisons groupées"],
      category: "logistics"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
      title: "Analytics Avancés",
      description: "Tableaux de bord intelligents avec KPIs logistiques, prédictions de coûts et optimisations suggérées.",
      benefits: ["ROI mesurable", "Insights prédictifs", "Rapports automatisés"],
      category: "analytics"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Sécurité Enterprise",
      description: "Infrastructure sécurisée ISO 27001 avec chiffrement bout-en-bout et conformité RGPD complète.",
      benefits: ["Données protégées", "Conformité RGPD", "Audit trail complet"],
      category: "security"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Automatisation Complète",
      description: "De la commande à la livraison, automatisez vos workflows export avec nos API et intégrations natives.",
      benefits: ["Gain de temps 80%", "Erreurs humaines éliminées", "Intégrations seamless"],
      category: "automation"
    }
  ];

  const intelligenceFeatures = [
    {
      title: "Optimisation de Routes IA",
      description: "Calcul automatique des itinéraires les plus économiques et rapides en fonction du trafic, météo et réglementations.",
      impact: "30% temps de transit réduit"
    },
    {
      title: "Prédiction des Coûts",
      description: "Modèles prédictifs qui anticipent les variations tarifaires et recommandent les meilleurs moments d'expédition.",
      impact: "25% économies additionnelles"
    },
    {
      title: "Détection d'Anomalies",
      description: "IA qui identifie automatiquement les écarts de poids, erreurs d'adressage et problèmes potentiels.",
      impact: "95% erreurs évitées"
    },
    {
      title: "Recommandations Personnalisées",
      description: "Suggestions sur mesure basées sur vos patterns d'expédition et objectifs business.",
      impact: "40% satisfaction client améliorée"
    }
  ];

  const integrationFeatures = [
    {
      name: "API REST Complète",
      description: "Intégrez hubdispo.be dans vos systèmes existants avec notre API documentée et nos SDKs.",
      endpoints: ["Créer envoi", "Tracker colis", "Gérer consolidations", "Rapports"],
      documentation: "Documentation complète + exemples de code"
    },
    {
      name: "Connecteurs ERP",
      description: "Plugins natifs pour SAP, Odoo, Microsoft Dynamics avec synchronisation bidirectionnelle.",
      systems: ["SAP Business One", "Odoo", "Microsoft Dynamics", "Sage"],
      setup: "Installation en 1-click"
    },
    {
      name: "Apps E-commerce", 
      description: "Applications officielles pour Shopify, WooCommerce, Magento avec synchronisation automatique.",
      platforms: ["Shopify Plus", "WooCommerce", "Magento", "PrestaShop"],
      features: "Sync commandes + tracking automatique"
    },
    {
      name: "Webhooks Temps Réel",
      description: "Notifications instantanées sur tous les événements logistiques vers vos systèmes.",
      events: ["Statut envoi", "Douanes", "Livraison", "Exceptions"],
      latency: "< 200ms"
    }
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "Gratuit",
      description: "Parfait pour débuter",
      features: ["10 envois/mois", "Assistant douanier", "Tracking basique", "Support email"],
      limitations: ["Pas de consolidation", "Analytics limités"],
      cta: "Commencer gratuitement"
    },
    {
      name: "Professional", 
      price: "€49/mois",
      description: "Pour PME en croissance",
      features: ["100 envois/mois", "IA consolidation", "Analytics avancés", "Support prioritaire", "API accès"],
      limitations: ["Intégrations limitées"],
      cta: "Essai 14 jours gratuit",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Sur mesure",
      description: "Pour grands comptes",
      features: ["Envois illimités", "Toutes fonctionnalités", "Intégrations complètes", "Account manager", "SLA garanti"],
      limitations: [],
      cta: "Contacter les ventes"
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
              onClick={() => onNavigate('homepage')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fonctionnalités</h1>
              <p className="text-gray-600 mt-2">La technologie qui révolutionne l'export des PME</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 px-4 py-2 rounded-full mb-6">
            <Zap className="h-5 w-5 text-[#1E40AF]" />
            <span className="text-[#1E40AF] font-medium">Innovation constante</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Technologie de pointe pour<br />
            <span className="text-[#1E40AF]">simplifier</span> votre <span className="text-[#10B981]">export</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            hubdispo.be combine intelligence artificielle, automatisation avancée et réseau collaboratif 
            pour transformer la façon dont les PME belges exportent vers l'Europe.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Fonctionnalités Principales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group">
                <CardContent className="pt-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Feature Deep Dive Tabs */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Fonctionnalités Détaillées</h3>
          
          <Tabs defaultValue="intelligence" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="intelligence">Intelligence IA</TabsTrigger>
              <TabsTrigger value="integrations">Intégrations</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
            </TabsList>
            
            <TabsContent value="intelligence" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {intelligenceFeatures.map((feature, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#1E40AF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Brain className="h-6 w-6 text-[#1E40AF]" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">{feature.description}</p>
                          <Badge className="bg-[#10B981] text-white text-xs">{feature.impact}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrationFeatures.map((integration, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Package className="h-5 w-5 text-[#1E40AF]" />
                        {integration.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">{integration.description}</p>
                      
                      {integration.endpoints && (
                        <div className="mb-3">
                          <h5 className="font-medium text-gray-900 text-sm mb-2">Endpoints disponibles :</h5>
                          <div className="flex flex-wrap gap-1">
                            {integration.endpoints.map((endpoint, endpointIndex) => (
                              <Badge key={endpointIndex} variant="outline" className="text-xs">
                                {endpoint}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {integration.systems && (
                        <div className="mb-3">
                          <h5 className="font-medium text-gray-900 text-sm mb-2">Systèmes supportés :</h5>
                          <div className="flex flex-wrap gap-1">
                            {integration.systems.map((system, systemIndex) => (
                              <Badge key={systemIndex} variant="secondary" className="text-xs">
                                {system}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {integration.platforms && (
                        <div className="mb-3">
                          <h5 className="font-medium text-gray-900 text-sm mb-2">Plateformes :</h5>
                          <div className="flex flex-wrap gap-1">
                            {integration.platforms.map((platform, platformIndex) => (
                              <Badge key={platformIndex} variant="secondary" className="text-xs">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {integration.events && (
                        <div className="mb-3">
                          <h5 className="font-medium text-gray-900 text-sm mb-2">Événements :</h5>
                          <div className="flex flex-wrap gap-1">
                            {integration.events.map((event, eventIndex) => (
                              <Badge key={eventIndex} variant="outline" className="text-xs">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-xs text-[#10B981] mt-4">
                        <CheckCircle className="h-3 w-3" />
                        <span>
                          {integration.documentation || integration.setup || integration.features || integration.latency}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardContent className="pt-8">
                  <div className="text-center mb-8">
                    <BarChart3 className="h-16 w-16 text-[#1E40AF] mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Tableau de Bord Intelligent</h4>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                      Visualisez en temps réel tous vos KPIs logistiques avec des insights actionnables 
                      générés par notre IA pour optimiser continuellement vos performances.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <Clock className="h-8 w-8 text-[#1E40AF] mx-auto mb-3" />
                      <h5 className="font-semibold mb-2">Temps Réel</h5>
                      <p className="text-sm text-gray-600">Tracking live de tous vos envois</p>
                    </div>
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <Euro className="h-8 w-8 text-[#10B981] mx-auto mb-3" />
                      <h5 className="font-semibold mb-2">ROI Tracking</h5>
                      <p className="text-sm text-gray-600">Économies réalisées mesurées</p>
                    </div>
                    <div className="text-center p-6 bg-orange-50 rounded-lg">
                      <Users className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                      <h5 className="font-semibold mb-2">Consolidations</h5>
                      <p className="text-sm text-gray-600">Opportunités identifiées par IA</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardContent className="pt-8">
                  <div className="text-center mb-8">
                    <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Sécurité Enterprise</h4>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                      Infrastructure sécurisée répondant aux plus hauts standards de l'industrie 
                      avec certifications ISO 27001 et conformité RGPD complète.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Shield className="h-6 w-6 text-red-500" />
                      </div>
                      <h5 className="font-semibold mb-2">ISO 27001</h5>
                      <p className="text-xs text-gray-600">Certification sécurité</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Globe className="h-6 w-6 text-blue-500" />
                      </div>
                      <h5 className="font-semibold mb-2">RGPD</h5>
                      <p className="text-xs text-gray-600">Conformité européenne</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Zap className="h-6 w-6 text-green-500" />
                      </div>
                      <h5 className="font-semibold mb-2">Chiffrement</h5>
                      <p className="text-xs text-gray-600">AES-256 bout-en-bout</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <BarChart3 className="h-6 w-6 text-purple-500" />
                      </div>
                      <h5 className="font-semibold mb-2">Audit Trail</h5>
                      <p className="text-xs text-gray-600">Traçabilité complète</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Pricing Preview */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Tarification Simple</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? 'ring-2 ring-[#1E40AF] scale-105' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#1E40AF] text-white flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Plus populaire
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold text-[#1E40AF] mb-2">{tier.price}</div>
                  <p className="text-gray-600 text-sm">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-[#10B981] flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {tier.limitations.map((limitation, limitationIndex) => (
                      <div key={limitationIndex} className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0" />
                        <span>{limitation}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className={`w-full ${tier.popular ? 'bg-[#1E40AF] hover:bg-[#1E40AF]/90' : ''}`}
                    variant={tier.popular ? 'default' : 'outline'}
                    onClick={() => onNavigate('subscription')}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5 border-none">
          <CardContent className="p-12 text-center">
            <Zap className="h-12 w-12 text-[#1E40AF] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt à Révolutionner votre Export ?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Découvrez comment hubdispo.be peut transformer vos opérations logistiques 
              et vous faire économiser jusqu'à 40% sur vos frais d'expédition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                onClick={() => onNavigate('register')}
              >
                Essai gratuit 14 jours
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('demo-scheduler')}
              >
                Demander une démo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}