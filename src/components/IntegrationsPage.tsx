// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ArrowLeft, Package, Zap, CheckCircle, Star, Download, Settings, Globe, Code } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./HubDispo/ImageWithFallback";

interface IntegrationsPageProps {
  onNavigate: (view: string) => void;
}

export default function IntegrationsPage({ onNavigate }: IntegrationsPageProps) {
  const ecommerceIntegrations = [
    {
      name: "Shopify Plus",
      category: "E-commerce",
      description: "Synchronisation automatique des commandes et gestion des expéditions directement depuis votre admin Shopify.",
      features: ["Sync commandes temps réel", "Calcul frais de port", "Tracking automatique", "Gestion retours"],
      status: "certified",
      installs: "2,500+",
      rating: 4.9,
      setup: "1-click install",
      logo: "shopify-logo",
      popular: true
    },
    {
      name: "WooCommerce",
      category: "E-commerce",
      description: "Plugin WordPress officiel pour intégrer hubdispo.be à votre boutique WooCommerce.",
      features: ["Plugin WordPress", "Configuration simple", "Multi-devises", "Zones d'expédition"],
      status: "certified",
      installs: "1,800+",
      rating: 4.7,
      setup: "Plugin gratuit",
      logo: "woocommerce-logo",
      popular: false
    },
    {
      name: "Magento Commerce",
      category: "E-commerce",
      description: "Extension enterprise pour les boutiques Magento avec besoins avancés de logistique.",
      features: ["Multi-stores", "B2B/B2C", "Gestion inventaire", "Rapports avancés"],
      status: "certified",
      installs: "450+",
      rating: 4.8,
      setup: "Installation technique",
      logo: "magento-logo",
      popular: false
    },
    {
      name: "PrestaShop",
      category: "E-commerce",
      description: "Module français pour boutiques PrestaShop avec support multilingue FR/NL/EN.",
      features: ["Interface française", "Multi-boutiques", "Gestion TVA", "Support local"],
      status: "certified",
      installs: "320+",
      rating: 4.6,
      setup: "Module gratuit",
      logo: "prestashop-logo",
      popular: false
    }
  ];

  const erpIntegrations = [
    {
      name: "SAP Business One",
      category: "ERP",
      description: "Connecteur certifié SAP pour automatiser vos flux logistiques dans votre ERP existant.",
      features: ["Connecteur certifié", "Sync bidirectionnelle", "Gestion stocks", "Facturation intégrée"],
      status: "sap_certified",
      installs: "180+",
      rating: 4.9,
      setup: "Installation partenaire",
      logo: "sap-logo",
      popular: true
    },
    {
      name: "Microsoft Dynamics 365",
      category: "ERP",
      description: "Add-in officiel Microsoft pour intégrer la logistique hubdispo.be dans Dynamics.",
      features: ["Add-in officiel", "Power Platform", "Azure integration", "Teams notifications"],
      status: "microsoft_certified",
      installs: "95+",
      rating: 4.8,
      setup: "AppSource",
      logo: "microsoft-logo",
      popular: false
    },
    {
      name: "Odoo",
      category: "ERP Open Source",
      description: "Module communautaire pour Odoo avec support professionnel disponible.",
      features: ["Module gratuit", "Code open source", "Personnalisable", "Support Pro payant"],
      status: "community",
      installs: "750+",
      rating: 4.5,
      setup: "Module gratuit",
      logo: "odoo-logo",
      popular: true
    },
    {
      name: "Sage Business Cloud",
      category: "ERP",
      description: "Intégration native avec les solutions Sage pour PME belges.",
      features: ["APIs natives", "Gestion comptable", "Reporting intégré", "Support Sage"],
      status: "partner",
      installs: "120+",
      rating: 4.4,
      setup: "Configuration assistée",
      logo: "sage-logo",
      popular: false
    }
  ];

  const businessApps = [
    {
      name: "Salesforce Sales Cloud",
      category: "CRM",
      description: "Synchronisez vos opportunités commerciales avec le suivi logistique temps réel.",
      features: ["Sync leads/deals", "Tracking CRM", "Rapports unifiés", "Lightning component"],
      logo: "salesforce-logo"
    },
    {
      name: "HubSpot CRM",
      category: "CRM",
      description: "Connectez vos workflows marketing et ventes avec la logistique export.",
      features: ["Workflows automation", "Lead scoring", "Email sequences", "App marketplace"],
      logo: "hubspot-logo"
    },
    {
      name: "Monday.com",
      category: "Project Management",
      description: "Gérez vos projets export avec visibilité complète sur la logistique.",
      features: ["Boards personnalisés", "Automations", "Time tracking", "Team collaboration"],
      logo: "monday-logo"
    },
    {
      name: "Slack",
      category: "Communication",
      description: "Recevez vos notifications logistiques directement dans vos channels Slack.",
      features: ["Notifications temps réel", "Commandes slash", "Channels dédiés", "Bot interactif"],
      logo: "slack-logo"
    },
    {
      name: "Microsoft Teams",
      category: "Communication",
      description: "App Teams pour suivre vos envois et collaborer avec votre équipe logistique.",
      features: ["App native Teams", "Notifications push", "Collaboration", "Intégration Office"],
      logo: "teams-logo"
    },
    {
      name: "Zapier",
      category: "Automation",
      description: "Connectez hubdispo.be à plus de 6000 applications via Zapier.",
      features: ["6000+ apps", "Triggers avancés", "Multi-step workflows", "No-code automation"],
      logo: "zapier-logo"
    }
  ];

  const paymentIntegrations = [
    {
      name: "Stripe",
      category: "Paiements",
      description: "Infrastructure de paiement native pour toutes vos transactions export.",
      features: ["Paiements sécurisés", "Multi-devises", "Subscriptions", "Conformité PCI"],
      logo: "stripe-logo"
    },
    {
      name: "PayPal Business",
      category: "Paiements",
      description: "Acceptez les paiements PayPal pour vos expéditions internationales.",
      features: ["PayPal + Carte", "Protection vendeur", "Facturation", "Paiements récurrents"],
      logo: "paypal-logo"
    },
    {
      name: "Mollie",
      category: "Paiements Européens",
      description: "Solution de paiement européenne populaire dans le Benelux.",
      features: ["SEPA", "iDEAL", "Bancontact", "SOFORT"],
      logo: "mollie-logo"
    }
  ];

  const integrationStats = {
    totalApps: 45,
    totalInstalls: "12,500+",
    avgRating: 4.7,
    certifiedPartners: 15
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate('features')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Intégrations</h1>
              <p className="text-gray-600 mt-2">Connectez hubdispo.be à vos outils existants</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 px-4 py-2 rounded-full mb-6">
            <Package className="h-5 w-5 text-[#1E40AF]" />
            <span className="text-[#1E40AF] font-medium">{integrationStats.totalApps} intégrations disponibles</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Intégrez hubdispo.be dans<br />
            votre <span className="text-[#1E40AF]">écosystème</span> existant
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connectez notre plateforme logistique à vos outils préférés : e-commerce, ERP, CRM et plus. 
            Installation en 1-click et synchronisation automatique.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-[#1E40AF] mb-2">{integrationStats.totalApps}</div>
              <div className="text-gray-600 text-sm">Intégrations</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-[#10B981] mb-2">{integrationStats.totalInstalls}</div>
              <div className="text-gray-600 text-sm">Installations</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-500 mb-2">{integrationStats.avgRating}</div>
              <div className="text-gray-600 text-sm">Note moyenne</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-500 mb-2">{integrationStats.certifiedPartners}</div>
              <div className="text-gray-600 text-sm">Partenaires certifiés</div>
            </CardContent>
          </Card>
        </div>

        {/* Integration Categories */}
        <Tabs defaultValue="ecommerce" className="w-full mb-16">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
            <TabsTrigger value="erp">ERP & Comptabilité</TabsTrigger>
            <TabsTrigger value="business">Apps Business</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ecommerce" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ecommerceIntegrations.map((integration, index) => (
                <Card key={index} className={`hover:shadow-xl transition-all duration-300 ${integration.popular ? 'ring-2 ring-[#1E40AF] ring-opacity-20' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-8 w-8 text-[#1E40AF]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xl font-bold text-gray-900">{integration.name}</h4>
                          {integration.popular && (
                            <Badge className="bg-[#10B981] text-white text-xs">Populaire</Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">{integration.category}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{integration.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900 text-sm mb-2">Fonctionnalités :</h5>
                        <div className="flex flex-wrap gap-1">
                          {integration.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{integration.rating}</span>
                          <span>•</span>
                          <span>{integration.installs} installations</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {integration.setup}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Installer
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Config
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="erp" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {erpIntegrations.map((integration, index) => (
                <Card key={index} className={`hover:shadow-xl transition-all duration-300 ${integration.popular ? 'ring-2 ring-[#1E40AF] ring-opacity-20' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-8 w-8 text-[#1E40AF]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xl font-bold text-gray-900">{integration.name}</h4>
                          {integration.popular && (
                            <Badge className="bg-[#10B981] text-white text-xs">Populaire</Badge>
                          )}
                          {integration.status === 'sap_certified' && (
                            <Badge className="bg-blue-100 text-blue-600 text-xs">SAP Certified</Badge>
                          )}
                          {integration.status === 'microsoft_certified' && (
                            <Badge className="bg-green-100 text-green-600 text-xs">Microsoft Partner</Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">{integration.category}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{integration.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900 text-sm mb-2">Fonctionnalités :</h5>
                        <div className="flex flex-wrap gap-1">
                          {integration.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{integration.rating}</span>
                          <span>•</span>
                          <span>{integration.installs} installations</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {integration.setup}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Installer
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Config
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="business" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessApps.map((app, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Package className="h-8 w-8 text-[#1E40AF]" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{app.name}</h4>
                      <Badge variant="outline" className="text-xs">{app.category}</Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{app.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900 text-sm mb-2">Fonctionnalités :</h5>
                        <div className="flex flex-wrap gap-1">
                          {app.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Connecter
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paymentIntegrations.map((payment, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Package className="h-8 w-8 text-[#1E40AF]" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{payment.name}</h4>
                      <Badge variant="outline" className="text-xs">{payment.category}</Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{payment.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900 text-sm mb-2">Méthodes :</h5>
                        <div className="flex flex-wrap gap-1">
                          {payment.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-full">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activer
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Custom Integration CTA */}
        <Card className="bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5 border-none">
          <CardContent className="p-12 text-center">
            <Code className="h-12 w-12 text-[#1E40AF] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Besoin d'une intégration sur mesure ?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Notre équipe technique peut développer des connecteurs personnalisés pour vos besoins spécifiques. 
              API complète et support dédié disponibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                onClick={() => onNavigate('api')}
              >
                <Code className="h-4 w-4 mr-2" />
                Voir l'API
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('technical-support')}
              >
                Demander un développement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}