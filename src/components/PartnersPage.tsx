// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ArrowLeft, Handshake, Truck, Package, Globe, Award, Users, Target, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./HubDispo/ImageWithFallback";

interface PartnersPageProps {
  onNavigate: (view: string) => void;
}

export default function PartnersPage({ onNavigate }: PartnersPageProps) {
  const logisticsPartners = [
    {
      name: "DHL Express Belgium",
      category: "Transport Express",
      description: "Partenaire premium pour les livraisons express européennes. Tarifs négociés exclusifs pour nos clients.",
      services: ["Express 24h", "Tracking temps réel", "Assurance incluse"],
      coverage: "Europe + International",
      logo: "dhl-logo",
      featured: true
    },
    {
      name: "PostNL",
      category: "Consolidation Pays-Bas",
      description: "Accord exclusif pour la micro-consolidation Belgique-Pays-Bas avec des économies jusqu'à 40%.",
      services: ["Groupage quotidien", "Livraison last-mile", "Retours gratuits"],
      coverage: "Benelux",
      logo: "postnl-logo",
      featured: true
    },
    {
      name: "DPD Belgium",
      category: "Transport Standard",
      description: "Réseau européen fiable pour les envois standard avec tracking avancé et livraison flexible.",
      services: ["Predict", "Pickup points", "B2B/B2C"],
      coverage: "Europe 230+ destinations",
      logo: "dpd-logo",
      featured: false
    },
    {
      name: "GLS Belgium", 
      category: "Transport Régional",
      description: "Spécialiste du transport régional avec focus sur la durabilité et la proximité client.",
      services: ["FlexDeliveryService", "ShopDeliveryService", "ParcelShop"],
      coverage: "Europe + outre-mer",
      logo: "gls-logo",
      featured: false
    }
  ];

  const techPartners = [
    {
      name: "Stripe",
      category: "Paiements",
      description: "Infrastructure de paiement sécurisée pour toutes les transactions européennes.",
      integration: "API complète",
      logo: "stripe-logo"
    },
    {
      name: "Salesforce",
      category: "CRM",
      description: "Synchronisation bidirectionnelle avec votre CRM pour un suivi client optimal.",
      integration: "Connector natif",
      logo: "salesforce-logo"
    },
    {
      name: "SAP Business One",
      category: "ERP",
      description: "Intégration native avec SAP pour automatiser vos flux logistiques.",
      integration: "Plugin certifié",
      logo: "sap-logo"
    },
    {
      name: "Shopify Plus",
      category: "E-commerce",
      description: "App officielle pour synchroniser automatiquement vos commandes export.",
      integration: "App Store",
      logo: "shopify-logo"
    },
    {
      name: "Odoo",
      category: "ERP Open Source",
      description: "Module dédié pour intégrer hubdispo.be dans votre workflow Odoo.",
      integration: "Module officiel",
      logo: "odoo-logo"
    },
    {
      name: "Microsoft Dynamics",
      category: "ERP Enterprise",
      description: "Connecteur entreprise pour les grands comptes avec besoins complexes.",
      integration: "Connecteur certifié",
      logo: "microsoft-logo"
    }
  ];

  const institutionalPartners = [
    {
      name: "AWEX",
      category: "Agence Export Wallonie",
      description: "Partenariat pour accompagner les entreprises wallonnes dans leur développement export.",
      benefits: ["Formations export", "Accompagnement personnalisé", "Subventions possibles"],
      logo: "awex-logo"
    },
    {
      name: "Flanders Investment & Trade",
      category: "Agence Export Flandre", 
      description: "Collaboration pour soutenir l'internationalisation des entreprises flamandes.",
      benefits: ["Conseils marchés", "Missions économiques", "Networking"],
      logo: "fit-logo"
    },
    {
      name: "Port d'Anvers-Bruges",
      category: "Infrastructure Portuaire",
      description: "Accès privilégié aux infrastructures logistiques du premier port belge.",
      benefits: ["Entrepôts dédiés", "Tarifs préférentiels", "Services douaniers"],
      logo: "port-antwerp-logo"
    },
    {
      name: "Chambre de Commerce Bruxelles",
      category: "Accompagnement Business",
      description: "Support administratif et réglementaire pour les formalités export.",
      benefits: ["Certificats origine", "Légalisations", "Conseils juridiques"],
      logo: "chamber-brussels-logo"
    }
  ];

  const partnerProgram = {
    levels: [
      {
        name: "Partenaire Référent",
        requirements: ["10+ clients référés", "Formation certifiée", "SLA < 24h"],
        benefits: ["Commissions 15%", "Support prioritaire", "Co-marketing"],
        color: "bg-blue-100 text-blue-600"
      },
      {
        name: "Partenaire Premium",
        requirements: ["50+ clients référés", "Expertise certifiée", "Success Manager dédié"],
        benefits: ["Commissions 20%", "Roadmap access", "Événements exclusifs"],
        color: "bg-purple-100 text-purple-600"
      },
      {
        name: "Partenaire Elite",
        requirements: ["100+ clients référés", "Co-développement", "Équipe dédiée"],
        benefits: ["Commissions 25%", "Développement conjoint", "Label officiel"],
        color: "bg-gold-100 text-yellow-600"
      }
    ]
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
              onClick={() => onNavigate('homepage')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Nos Partenaires</h1>
              <p className="text-gray-600 mt-2">L'écosystème qui révolutionne l'export des PME belges</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 px-4 py-2 rounded-full mb-6">
            <Handshake className="h-5 w-5 text-[#1E40AF]" />
            <span className="text-[#1E40AF] font-medium">50+ partenaires de confiance</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Un <span className="text-[#1E40AF]">écosystème</span> complet<br />
            pour votre <span className="text-[#10B981]">succès export</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            hubdispo.be s'appuie sur un réseau de partenaires premium pour vous offrir 
            les meilleures solutions logistiques, technologiques et institutionnelles.
          </p>
        </div>

        {/* Partnership Benefits */}
        <Card className="mb-16 bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5 border-none">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <CheckCircle className="h-12 w-12 text-[#10B981] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tarifs Négociés</h3>
                <p className="text-gray-600">Jusqu'à 40% d'économies grâce à nos accords exclusifs</p>
              </div>
              <div>
                <Award className="h-12 w-12 text-[#1E40AF] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Qualité Garantie</h3>
                <p className="text-gray-600">Partenaires sélectionnés pour leur excellence service</p>
              </div>
              <div>
                <Target className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Support Intégré</h3>
                <p className="text-gray-600">Un seul point de contact pour tous vos besoins</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logistics Partners */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Partenaires Logistiques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {logisticsPartners.map((partner, index) => (
              <Card key={index} className={`hover:shadow-xl transition-all duration-300 ${partner.featured ? 'ring-2 ring-[#1E40AF] ring-opacity-20' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Truck className="h-8 w-8 text-[#1E40AF]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-xl font-bold text-gray-900">{partner.name}</h4>
                        {partner.featured && (
                          <Badge className="bg-[#10B981] text-white text-xs">Premium</Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">{partner.category}</Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{partner.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <h5 className="font-medium text-gray-900 text-sm mb-2">Services :</h5>
                      <div className="flex flex-wrap gap-1">
                        {partner.services.map((service, serviceIndex) => (
                          <Badge key={serviceIndex} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="h-4 w-4" />
                      <span>Couverture : {partner.coverage}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Voir les tarifs négociés
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech Partners */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Intégrations Technologiques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techPartners.map((partner, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-[#1E40AF]" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{partner.name}</h4>
                  <Badge variant="outline" className="text-xs mb-3">{partner.category}</Badge>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{partner.description}</p>
                  <div className="flex items-center justify-center gap-2 text-xs text-[#10B981] mb-4">
                    <CheckCircle className="h-3 w-3" />
                    <span>{partner.integration}</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Voir l'intégration
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Institutional Partners */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Partenaires Institutionnels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {institutionalPartners.map((partner, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-[#1E40AF]/10 rounded-lg flex items-center justify-center">
                      <Award className="h-8 w-8 text-[#1E40AF]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{partner.name}</h4>
                      <Badge variant="outline" className="text-xs">{partner.category}</Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{partner.description}</p>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 text-sm mb-2">Avantages clients :</h5>
                    <ul className="space-y-1">
                      {partner.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-3 w-3 text-[#10B981]" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partner Program */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Programme Partenaires</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerProgram.levels.map((level, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className={`${level.color} text-center py-4`}>
                  <CardTitle className="text-lg">{level.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-900 text-sm mb-2">Prérequis :</h5>
                      <ul className="space-y-1">
                        {level.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="text-sm text-gray-600 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-[#1E40AF] rounded-full" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 text-sm mb-2">Avantages :</h5>
                      <ul className="space-y-1">
                        {level.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-sm text-gray-600 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-[#10B981]" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5 border-none">
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-[#1E40AF] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Devenez Partenaire</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Rejoignez notre écosystème et aidez les PME belges à conquérir l'Europe. 
              Développez votre business avec hubdispo.be.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                onClick={() => onNavigate('email-support')}
              >
                Devenir partenaire
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('demo-scheduler')}
              >
                Programmer un échange
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}