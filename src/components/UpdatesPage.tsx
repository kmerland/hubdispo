// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ArrowLeft, Calendar, Zap, Bug, Shield, Star, Package, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface UpdatesPageProps {
  onNavigate: (view: string) => void;
}

export default function UpdatesPage({ onNavigate }: UpdatesPageProps) {
  const updates = [
    {
      version: "v2.4.0",
      date: "15 janvier 2025",
      type: "major",
      title: "Assistant Douanier IA 2.0 + Nouvelles Intégrations",
      description: "Mise à jour majeure avec intelligence artificielle avancée pour l'automatisation douanière et nouvelles intégrations e-commerce.",
      changes: [
        {
          type: "feature",
          title: "Assistant Douanier IA 2.0",
          description: "Classification automatique des marchandises avec IA + validation en temps réel des documents"
        },
        {
          type: "feature", 
          title: "Intégration Shopify Plus",
          description: "App officielle Shopify avec synchronisation automatique des commandes et tracking"
        },
        {
          type: "improvement",
          title: "Optimisation consolidation",
          description: "Algorithme amélioré détectant 35% d'opportunités supplémentaires de groupage"
        },
        {
          type: "improvement",
          title: "Interface mobile redesignée",
          description: "Nouvelle UI mobile-first avec navigation simplifiée et actions rapides"
        }
      ],
      impact: "Économies moyennes +15% pour tous les utilisateurs"
    },
    {
      version: "v2.3.2",
      date: "8 janvier 2025",
      type: "patch",
      title: "Correctifs et Améliorations",
      description: "Corrections de bugs et optimisations de performance suite aux retours utilisateurs.",
      changes: [
        {
          type: "fix",
          title: "Calcul frais de port corrigé",
          description: "Résolution du bug de calcul pour les envois > 30kg vers l'Allemagne"
        },
        {
          type: "improvement",
          title: "Performance tracking",
          description: "Chargement 40% plus rapide des pages de suivi colis"
        },
        {
          type: "fix",
          title: "Notifications emails",
          description: "Correction des emails de notification qui n'étaient pas envoyés"
        }
      ],
      impact: "Amélioration générale de la stabilité"
    },
    {
      version: "v2.3.1",
      date: "20 décembre 2024",
      type: "security",
      title: "Mise à Jour Sécurité Critique",
      description: "Patch de sécurité important concernant l'authentification et la protection des données.",
      changes: [
        {
          type: "security",
          title: "Renforcement authentification",
          description: "Implémentation d'une authentification à deux facteurs obligatoire"
        },
        {
          type: "security",
          title: "Chiffrement renforcé",
          description: "Migration vers AES-256 pour toutes les données sensibles"
        },
        {
          type: "improvement",
          title: "Audit trail amélioré",
          description: "Traçabilité complète de toutes les actions utilisateurs"
        }
      ],
      impact: "Sécurité renforcée - Mise à jour obligatoire"
    },
    {
      version: "v2.3.0",
      date: "5 décembre 2024",
      type: "major",
      title: "Lancement Micro-Consolidation Intelligente",
      description: "Révolution de la consolidation avec IA prédictive et réseau collaboratif étendu.",
      changes: [
        {
          type: "feature",
          title: "IA de consolidation prédictive",
          description: "Prédiction des opportunités de groupage 7 jours à l'avance"
        },
        {
          type: "feature",
          title: "Réseau collaboratif PME",
          description: "Plateforme communautaire pour partager les consolidations entre PME"
        },
        {
          type: "feature",
          title: "Optimisation multi-critères",
          description: "Optimisation simultanée coût/délai/empreinte carbone"
        },
        {
          type: "improvement",
          title: "API v2 REST",
          description: "Nouvelle version API avec webhooks temps réel et documentation interactive"
        }
      ],
      impact: "Économies moyennes passées de 25% à 35%"
    },
    {
      version: "v2.2.1",
      date: "18 novembre 2024",
      type: "patch",
      title: "Optimisations Brexit et Nouvelles Réglementations",
      description: "Adaptations aux nouvelles règlementations douanières UE et post-Brexit.",
      changes: [
        {
          type: "improvement",
          title: "Règles Brexit mises à jour",
          description: "Support complet des nouvelles règles d'origine UK-UE 2024"
        },
        {
          type: "feature",
          title: "Support CBAM",
          description: "Intégration du mécanisme d'ajustement carbone aux frontières"
        },
        {
          type: "improvement",
          title: "Codes HS mis à jour",
          description: "Base de données douanière actualisée avec les derniers codes 2024"
        }
      ],
      impact: "Conformité réglementaire assurée"
    },
    {
      version: "v2.2.0",
      date: "2 novembre 2024",
      type: "major",
      title: "Tableau de Bord Analytics Avancé",
      description: "Nouveau dashboard avec KPIs intelligents et insights automatisés pour optimiser vos performances export.",
      changes: [
        {
          type: "feature",
          title: "Dashboard analytics IA",
          description: "Tableaux de bord intelligents avec recommandations personnalisées"
        },
        {
          type: "feature",
          title: "Rapports automatisés",
          description: "Génération automatique de rapports mensuels avec insights"
        },
        {
          type: "improvement",
          title: "Tracking temps réel amélioré",
          description: "Géolocalisation précise et estimations de livraison affinées"
        }
      ],
      impact: "Visibilité complète sur vos performances export"
    }
  ];

  const upcomingFeatures = [
    {
      title: "Hub Logistique Anvers",
      description: "Nouveau centre de consolidation physique au Port d'Anvers",
      eta: "Q1 2025",
      status: "en_developpement"
    },
    {
      title: "Extension Pays-Bas",
      description: "Expansion vers Amsterdam et Rotterdam avec partenaires locaux",
      eta: "Q2 2025", 
      status: "planifie"
    },
    {
      title: "Assistant IA Multilingue",
      description: "Support français, néerlandais, anglais et allemand",
      eta: "Q2 2025",
      status: "planifie"
    },
    {
      title: "Carbon Tracker",
      description: "Suivi empreinte carbone avec certificats de compensation",
      eta: "Q3 2025",
      status: "recherche"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "feature":
        return <Star className="h-4 w-4 text-[#10B981]" />;
      case "improvement":
        return <Zap className="h-4 w-4 text-[#1E40AF]" />;
      case "fix":
        return <Bug className="h-4 w-4 text-orange-500" />;
      case "security":
        return <Shield className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "major":
        return <Badge className="bg-[#10B981] text-white">Majeure</Badge>;
      case "minor":
        return <Badge className="bg-[#1E40AF] text-white">Mineure</Badge>;
      case "patch":
        return <Badge variant="outline">Correctif</Badge>;
      case "security":
        return <Badge className="bg-red-500 text-white">Sécurité</Badge>;
      default:
        return <Badge variant="secondary">Mise à jour</Badge>;
    }
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
              onClick={() => onNavigate('platform-status')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mises à Jour</h1>
              <p className="text-gray-600 mt-2">Changelog et nouvelles fonctionnalités de hubdispo.be</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 px-4 py-2 rounded-full mb-6">
            <Package className="h-5 w-5 text-[#1E40AF]" />
            <span className="text-[#1E40AF] font-medium">Version actuelle : v2.4.0</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Innovation <span className="text-[#1E40AF]">continue</span><br />
            pour votre <span className="text-[#10B981]">succès</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez les dernières améliorations, nouvelles fonctionnalités et corrections 
            apportées à votre plateforme logistique préférée.
          </p>
        </div>

        {/* Latest Update - Featured */}
        <Card className="mb-12 border-l-4 border-l-[#10B981] bg-gradient-to-r from-[#10B981]/5 to-transparent">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {getTypeBadge(updates[0].type)}
                  <Badge className="bg-[#1E40AF] text-white">Dernière version</Badge>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{updates[0].title}</h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{updates[0].date}</span>
                  <span>•</span>
                  <span>Version {updates[0].version}</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-6">{updates[0].description}</p>
            
            <div className="space-y-3 mb-6">
              {updates[0].changes.map((change, index) => (
                <div key={index} className="flex items-start gap-3">
                  {getTypeIcon(change.type)}
                  <div>
                    <h4 className="font-medium text-gray-900">{change.title}</h4>
                    <p className="text-sm text-gray-600">{change.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-[#10B981]/10 rounded-lg border border-[#10B981]/20">
              <div className="flex items-center gap-2 text-[#10B981] font-medium">
                <CheckCircle className="h-4 w-4" />
                <span>Impact : {updates[0].impact}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Previous Updates */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Historique des Versions</h3>
          <div className="space-y-6">
            {updates.slice(1).map((update, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {getTypeBadge(update.type)}
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>{update.date}</span>
                          <span>•</span>
                          <span>Version {update.version}</span>
                        </div>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{update.title}</h4>
                      <p className="text-gray-600">{update.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {update.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className="flex items-start gap-3">
                        {getTypeIcon(change.type)}
                        <div>
                          <span className="font-medium text-gray-900 text-sm">{change.title}</span>
                          <span className="text-gray-600 text-sm"> - {change.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{update.impact}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Prochaines Fonctionnalités</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {feature.eta}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{feature.description}</p>
                  
                  <div className="flex items-center gap-2">
                    {feature.status === 'en_developpement' && (
                      <>
                        <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
                        <span className="text-[#10B981] text-sm font-medium">En développement</span>
                      </>
                    )}
                    {feature.status === 'planifie' && (
                      <>
                        <div className="w-2 h-2 bg-[#1E40AF] rounded-full" />
                        <span className="text-[#1E40AF] text-sm font-medium">Planifié</span>
                      </>
                    )}
                    {feature.status === 'recherche' && (
                      <>
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span className="text-orange-500 text-sm font-medium">En recherche</span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Subscribe to Updates */}
        <Card className="bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5 border-none">
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-[#1E40AF] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Restez Informé</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Soyez le premier à découvrir nos nouvelles fonctionnalités et améliorations. 
              Recevez les notifications de mise à jour directement dans votre tableau de bord.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                onClick={() => onNavigate('notifications')}
              >
                Gérer les notifications
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('platform-status')}
              >
                Statut de la plateforme
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}