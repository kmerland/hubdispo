// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect, useMemo } from "react";
import { Search, Book, MessageCircle, Phone, Mail, ChevronRight, Play, Download, Star, Clock, CheckCircle, AlertCircle, FileText, Users, TrendingUp, Globe, Shield, Zap, Package, Truck, Settings, BarChart3, ArrowRight, Filter, Eye, ThumbsUp, BookOpen, Video, HelpCircle, ExternalLink, Calendar, Award, Target, Bell, Activity, Brain } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "./LanguageProvider";
import { useAuth } from "./AuthProvider";

interface HelpCenterProps {
  onNavigate?: (view: string, params?: any) => void;
}

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  views: number;
  rating: number;
  readTime: string;
  lastUpdated: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  helpful: number;
  featured: boolean;
}

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  thumbnail: string;
  category: string;
  level: string;
  transcript?: boolean;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  lastUpdated: string;
  relatedArticles?: string[];
}

export default function HelpCenter({ onNavigate }: HelpCenterProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [activeTab, setActiveTab] = useState("articles");
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Actions rapides contextuelles
  const quickActions = [
    { 
      icon: MessageCircle, 
      title: "Chat en direct", 
      description: "Support immédiat 24h/24", 
      action: "chat", 
      available: true,
      color: "bg-[#1E40AF]",
      urgency: "immediate"
    },
    { 
      icon: Phone, 
      title: "Support téléphonique", 
      description: "Lun-Ven 8h-18h", 
      action: "phone", 
      available: true,
      color: "bg-[#10B981]",
      urgency: "same_day"
    },
    { 
      icon: Mail, 
      title: "Email expert", 
      description: "Réponse sous 1h", 
      action: "email", 
      available: true,
      color: "bg-orange-500",
      urgency: "within_hours"
    },
    { 
      icon: Calendar, 
      title: "Session dédiée", 
      description: "Conseil personnalisé", 
      action: "demo", 
      available: true,
      color: "bg-purple-600",
      urgency: "scheduled"
    }
  ];

  // Articles populaires enrichis
  const popularArticles: Article[] = [
    {
      id: "first-shipment",
      title: "Guide complet : Votre premier envoi sur hubdispo.be",
      category: "Démarrage",
      content: "Guide détaillé étape par étape...",
      views: 2847,
      rating: 4.9,
      readTime: "8 min",
      lastUpdated: "2024-09-28",
      tags: ["débutant", "envoi", "tutoriel"],
      difficulty: "beginner",
      helpful: 234,
      featured: true
    },
    {
      id: "consolidation-advanced",
      title: "Maîtriser la consolidation intelligente",
      category: "Consolidation",
      content: "Techniques avancées de consolidation...",
      views: 1923,
      rating: 4.8,
      readTime: "12 min",
      lastUpdated: "2024-10-01",
      tags: ["consolidation", "économies", "advanced"],
      difficulty: "intermediate",
      helpful: 189,
      featured: true
    },
    {
      id: "customs-automation",
      title: "Automatisation douanière : DAU et déclarations",
      category: "Douane",
      content: "Comprendre l'assistant douanier IA...",
      views: 1654,
      rating: 4.9,
      readTime: "15 min",
      lastUpdated: "2024-09-30",
      tags: ["douane", "automatisation", "DAU"],
      difficulty: "intermediate",
      helpful: 167,
      featured: true
    },
    {
      id: "cost-optimization",
      title: "Optimisation des coûts : Stratégies avancées",
      category: "Économies",
      content: "Maximiser vos économies...",
      views: 1432,
      rating: 4.7,
      readTime: "10 min",
      lastUpdated: "2024-09-25",
      tags: ["économies", "tarification", "optimisation"],
      difficulty: "advanced",
      helpful: 143,
      featured: false
    },
    {
      id: "real-time-tracking",
      title: "Suivi temps réel et notifications intelligentes",
      category: "Suivi",
      content: "Utiliser le suivi avancé...",
      views: 1298,
      rating: 4.6,
      readTime: "6 min",
      lastUpdated: "2024-09-27",
      tags: ["suivi", "notifications", "temps réel"],
      difficulty: "beginner",
      helpful: 128,
      featured: false
    },
    {
      id: "api-integration",
      title: "Intégration API : Automatisez vos envois",
      category: "Développeurs",
      content: "Guide d'intégration API...",
      views: 892,
      rating: 4.8,
      readTime: "20 min",
      lastUpdated: "2024-10-01",
      tags: ["API", "intégration", "développeurs"],
      difficulty: "advanced",
      helpful: 89,
      featured: false
    }
  ];

  // Tutoriels vidéo enrichis
  const videoTutorials: VideoTutorial[] = [
    {
      id: "onboarding-complete",
      title: "Onboarding complet - De l'inscription au premier envoi",
      description: "Découvrez toutes les fonctionnalités essentielles de hubdispo.be",
      duration: "12:45",
      views: "5.2k",
      thumbnail: "video-1",
      category: "Démarrage",
      level: "Débutant",
      transcript: true
    },
    {
      id: "consolidation-master",
      title: "Maîtriser la consolidation : Techniques d'expert",
      description: "Optimisez vos économies avec les stratégies de consolidation avancées",
      duration: "18:30",
      views: "3.8k",
      thumbnail: "video-2",
      category: "Consolidation",
      level: "Intermédiaire",
      transcript: true
    },
    {
      id: "customs-ai-deep",
      title: "Assistant douanier IA : Fonctionnalités avancées",
      description: "Exploitez toute la puissance de l'automatisation douanière",
      duration: "14:22",
      views: "2.9k",
      thumbnail: "video-3",
      category: "Douane",
      level: "Avancé",
      transcript: true
    },
    {
      id: "dashboard-analytics",
      title: "Tableau de bord et analytics : Pilotez votre activité",
      description: "Utilisez les données pour optimiser vos performances logistiques",
      duration: "16:15",
      views: "2.1k",
      thumbnail: "video-4",
      category: "Analytics",
      level: "Intermédiaire",
      transcript: true
    },
    {
      id: "mobile-optimization",
      title: "Optimisation mobile : Gérez vos envois en déplacement",
      description: "Tirez parti de l'application mobile pour une gestion nomade",
      duration: "8:30",
      views: "1.7k",
      thumbnail: "video-5",
      category: "Mobile",
      level: "Débutant",
      transcript: false
    },
    {
      id: "troubleshooting",
      title: "Résolution de problèmes : Situations courantes",
      description: "Solutions aux problèmes les plus fréquents",
      duration: "11:45",
      views: "1.5k",
      thumbnail: "video-6",
      category: "Support",
      level: "Intermédiaire",
      transcript: true
    }
  ];

  // FAQ enrichie par catégories
  const faqSections = [
    {
      title: "🚀 Démarrage",
      icon: Package,
      items: [
        {
          id: "what-is-hubdispo",
          question: "Qu'est-ce que hubdispo.be et comment ça fonctionne ?",
          answer: "hubdispo.be est la première plateforme SaaS belge spécialisée dans la micro-consolidation logistique pour PME. Nous combinons intelligence artificielle et réseau de partenaires pour optimiser vos envois internationaux de petits volumes, réduire vos coûts jusqu'à 40% et automatiser 99% de vos formalités douanières.",
          category: "général",
          helpful: 298,
          lastUpdated: "2024-10-01",
          relatedArticles: ["first-shipment", "consolidation-advanced"]
        },
        {
          id: "setup-account",
          question: "Comment configurer mon compte professionnel ?",
          answer: "L'inscription est gratuite et prend 3 minutes. Renseignez vos informations d'entreprise, vérifiez votre numéro de TVA belge, et accédez immédiatement à votre tableau de bord personnalisé avec recommendations basées sur votre secteur d'activité.",
          category: "configuration",
          helpful: 187,
          lastUpdated: "2024-09-28",
          relatedArticles: ["first-shipment"]
        },
        {
          id: "first-shipment-setup",
          question: "Combien de temps pour mon premier envoi ?",
          answer: "Votre premier envoi peut être configuré en moins de 5 minutes. Notre assistant intelligent vous guide à chaque étape, pré-remplit les documents douaniers, et trouve automatiquement le meilleur groupe de consolidation disponible.",
          category: "envoi",
          helpful: 156,
          lastUpdated: "2024-09-30",
          relatedArticles: ["first-shipment", "consolidation-advanced"]
        }
      ]
    },
    {
      title: "📦 Consolidation & Optimisation",
      icon: Truck,
      items: [
        {
          id: "consolidation-process",
          question: "Comment fonctionne la micro-consolidation ?",
          answer: "Notre algorithme regroupe intelligemment vos envois avec d'autres PME vers la même destination. Vous conservez le contrôle total : visualisez vos co-expéditeurs, suivez le taux de remplissage en temps réel, et bénéficiez d'économies moyennes de 35% par rapport aux envois individuels.",
          category: "consolidation",
          helpful: 243,
          lastUpdated: "2024-10-01",
          relatedArticles: ["consolidation-advanced", "cost-optimization"]
        },
        {
          id: "consolidation-timing",
          question: "Quels sont les délais de consolidation ?",
          answer: "Les délais varient selon la destination : 24-48h pour l'Allemagne/Pays-Bas, 48-72h pour la France/Italie, 72-96h pour l'Espagne. Notre IA optimise constamment pour réduire ces délais tout en maximisant le taux de remplissage.",
          category: "délais",
          helpful: 198,
          lastUpdated: "2024-09-29",
          relatedArticles: ["consolidation-advanced"]
        },
        {
          id: "urgent-shipments",
          question: "Options pour les envois urgents ?",
          answer: "Mode Express disponible : bypass de la consolidation, transport direct prioritaire, délais garantis sous 48h UE. Ou mode 'Smart Priority' : consolidation accélérée avec autres envois urgents pour optimiser coût/délai.",
          category: "urgence",
          helpful: 167,
          lastUpdated: "2024-09-27",
          relatedArticles: ["real-time-tracking"]
        }
      ]
    },
    {
      title: "🛃 Douane & Conformité",
      icon: Shield,
      items: [
        {
          id: "ai-customs-reliability",
          question: "Fiabilité de l'assistant douanier IA ?",
          answer: "Notre IA affiche un taux de réussite de 99.1% sur 50,000+ déclarations traitées. Machine learning basé sur la réglementation belge/UE, mise à jour continue des nomenclatures douanières, et validation par experts certifiés avant envoi.",
          category: "fiabilité",
          helpful: 276,
          lastUpdated: "2024-10-01",
          relatedArticles: ["customs-automation"]
        },
        {
          id: "customs-error-handling",
          question: "Que se passe-t-il en cas d'erreur douanière ?",
          answer: "Support expert immédiat : notifications instantanées, intervention de nos spécialistes douaniers certifiés sous 1h, correction automatique et re-soumission. Assurance 'Zéro souci douane' incluse dans tous les plans.",
          category: "support",
          helpful: 198,
          lastUpdated: "2024-09-30",
          relatedArticles: ["customs-automation"]
        },
        {
          id: "document-compliance",
          question: "Conformité réglementaire des documents ?",
          answer: "100% conforme aux réglementations belges et UE. Certification ISO 27001 pour la sécurité, validation continue par cabinet d'avocats spécialisés, mise à jour automatique selon évolutions réglementaires.",
          category: "conformité",
          helpful: 234,
          lastUpdated: "2024-09-28",
          relatedArticles: ["customs-automation"]
        }
      ]
    },
    {
      title: "💰 Facturation & Économies",
      icon: BarChart3,
      items: [
        {
          id: "pricing-model",
          question: "Comment fonctionne la tarification ?",
          answer: "Modèle transparent basé sur vos économies : commission uniquement sur les économies réalisées vs transport traditionnel. Calculateur en temps réel, aucune surprise, économies garanties ou remboursement.",
          category: "tarification",
          helpful: 267,
          lastUpdated: "2024-10-01",
          relatedArticles: ["cost-optimization"]
        },
        {
          id: "cost-breakdown",
          question: "Détail des coûts et économies ?",
          answer: "Dashboard transparent : transport, douane, assurance, commission hubdispo.be. Comparateur automatique avec solutions traditionnelles, reporting mensuel des économies, projection annuelle basée sur vos volumes.",
          category: "économies",
          helpful: 189,
          lastUpdated: "2024-09-29",
          relatedArticles: ["cost-optimization"]
        }
      ]
    },
    {
      title: "🔧 Intégration & API",
      icon: Settings,
      items: [
        {
          id: "api-availability",
          question: "API et intégrations disponibles ?",
          answer: "API REST complète, webhooks temps réel, SDKs PHP/Python/Node.js. Intégrations natives : WooCommerce, Shopify, SAP, Odoo. Documentation développeur complète avec exemples et sandbox.",
          category: "technique",
          helpful: 145,
          lastUpdated: "2024-10-01",
          relatedArticles: ["api-integration"]
        },
        {
          id: "api-rate-limits",
          question: "Limites et performances API ?",
          answer: "Rate limits généreux : 1000 req/min (Standard), 5000 req/min (Premium), 10000 req/min (Enterprise). SLA 99.9% uptime, latence moyenne <200ms, monitoring Grafana accessible clients.",
          category: "performance",
          helpful: 87,
          lastUpdated: "2024-09-30",
          relatedArticles: ["api-integration"]
        }
      ]
    }
  ];

  // État du système enrichi
  const systemStatus = [
    { 
      service: "Plateforme principale", 
      status: "operational", 
      uptime: "99.97%", 
      lastIncident: "Aucun",
      responseTime: "156ms"
    },
    { 
      service: "Assistant douanier IA", 
      status: "operational", 
      uptime: "99.12%", 
      lastIncident: "Il y a 3 jours",
      responseTime: "234ms"
    },
    { 
      service: "Suivi temps réel", 
      status: "operational", 
      uptime: "100%", 
      lastIncident: "Aucun",
      responseTime: "89ms"
    },
    { 
      service: "API & Intégrations", 
      status: "maintenance", 
      uptime: "98.5%", 
      lastIncident: "Maintenance programmée",
      responseTime: "312ms"
    },
    { 
      service: "Notifications push", 
      status: "operational", 
      uptime: "99.8%", 
      lastIncident: "Il y a 5 jours",
      responseTime: "45ms"
    }
  ];

  // Catégories pour le filtrage
  const categories = [
    { value: "all", label: "Toutes les catégories", count: popularArticles.length },
    { value: "Démarrage", label: "🚀 Démarrage", count: popularArticles.filter(a => a.category === "Démarrage").length },
    { value: "Consolidation", label: "📦 Consolidation", count: popularArticles.filter(a => a.category === "Consolidation").length },
    { value: "Douane", label: "🛃 Douane", count: popularArticles.filter(a => a.category === "Douane").length },
    { value: "Économies", label: "💰 Économies", count: popularArticles.filter(a => a.category === "Économies").length },
    { value: "Suivi", label: "📍 Suivi", count: popularArticles.filter(a => a.category === "Suivi").length },
    { value: "Développeurs", label: "🔧 Développeurs", count: popularArticles.filter(a => a.category === "Développeurs").length }
  ];

  // Options de tri
  const sortOptions = [
    { value: "popularity", label: "Plus populaires" },
    { value: "recent", label: "Plus récents" },
    { value: "rating", label: "Mieux notés" },
    { value: "helpful", label: "Plus utiles" }
  ];

  // Recherche intelligente avec debounce
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const results = popularArticles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filtrage et tri des articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = selectedCategory === "all" 
      ? popularArticles 
      : popularArticles.filter(article => article.category === selectedCategory);

    // Appliquer le tri
    switch (sortBy) {
      case "recent":
        return [...filtered].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "helpful":
        return [...filtered].sort((a, b) => b.helpful - a.helpful);
      default: // popularity
        return [...filtered].sort((a, b) => b.views - a.views);
    }
  }, [selectedCategory, sortBy]);

  // Fonctions utilitaires
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "maintenance":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-100 text-green-700">Opérationnel</Badge>;
      case "maintenance":
        return <Badge className="bg-amber-100 text-amber-700">Maintenance</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-700">Incident</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const configs = {
      beginner: { label: "Débutant", className: "bg-green-100 text-green-700" },
      intermediate: { label: "Intermédiaire", className: "bg-blue-100 text-blue-700" },
      advanced: { label: "Avancé", className: "bg-purple-100 text-purple-700" }
    };
    const config = configs[difficulty as keyof typeof configs];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleArticleClick = (articleId: string) => {
    toast.success("Article ouvert", {
      description: "Redirection vers l'article complet",
      action: {
        label: "Voir",
        onClick: () => console.log("Navigation vers article:", articleId)
      }
    });
  };

  const handleVideoPlay = (videoId: string) => {
    toast.success("Vidéo en cours de lecture", {
      description: "La vidéo s'ouvre dans un lecteur optimisé",
      action: {
        label: "Plein écran",
        onClick: () => console.log("Mode plein écran pour:", videoId)
      }
    });
  };

  const markAsHelpful = (itemId: string, type: 'article' | 'faq') => {
    toast.success("Merci pour votre retour !", {
      description: "Votre évaluation nous aide à améliorer le contenu"
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-8">
      {/* En-tête hero avec recherche intelligente */}
      <div className="text-center space-y-6 py-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1E40AF] to-[#2563EB] bg-clip-text text-transparent">
            Centre d'aide hubdispo.be
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment optimiser votre logistique internationale avec notre plateforme SaaS belge de référence
          </p>
          <div className="flex items-center gap-4 justify-center text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>+1,200 PME utilisatrices</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>35% d'économies moyennes</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>99.1% de réussite douanière</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          <Input
            placeholder="Recherchez parmi 200+ articles, guides vidéo, FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-[#1E40AF] rounded-xl shadow-lg"
          />
          {isSearching && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-[#1E40AF] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Résultats de recherche */}
        {searchQuery.length >= 2 && searchResults.length > 0 && (
          <Card className="max-w-3xl mx-auto mt-4 border-2 border-[#1E40AF]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                {searchResults.length} résultat(s) trouvé(s)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {searchResults.slice(0, 5).map((article) => (
                  <div 
                    key={article.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleArticleClick(article.id)}
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-left">{article.title}</h4>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                        <Badge variant="secondary">{article.category}</Badge>
                        <span>{article.readTime}</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {article.rating}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Actions rapides améliorées */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-[#1E40AF] group">
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${action.color} text-white group-hover:scale-110 transition-transform`}>
                <action.icon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{action.description}</p>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-4">
                <Clock className="h-3 w-3" />
                <span>
                  {action.urgency === 'immediate' && 'Réponse immédiate'}
                  {action.urgency === 'same_day' && 'Même jour'}
                  {action.urgency === 'within_hours' && 'Sous quelques heures'}
                  {action.urgency === 'scheduled' && 'Sur rendez-vous'}
                </span>
              </div>
              <Button 
                className={`w-full ${action.color} hover:opacity-90 text-white`}
                onClick={() => {
                  switch(action.action) {
                    case 'chat':
                      onNavigate?.('direct-chat');
                      break;
                    case 'phone':
                      onNavigate?.('phone-support');
                      break;
                    case 'email':
                      onNavigate?.('email-support');
                      break;
                    case 'demo':
                      onNavigate?.('demo-scheduler');
                      break;
                    default:
                      break;
                  }
                }}
              >
                Commencer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation principale par onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <TabsList className="grid w-full max-w-3xl grid-cols-6">
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Articles</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Vidéos</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Statut</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Ressources</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Onglet Articles avec filtres avancés */}
        <TabsContent value="articles" className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-gray-50 p-4 rounded-xl">
            <div className="flex flex-wrap gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label} ({cat.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-sm text-gray-600">
              {filteredAndSortedArticles.length} article(s) trouvé(s)
            </div>
          </div>

          <div className="grid gap-6">
            {filteredAndSortedArticles.map((article) => (
              <Card key={article.id} className={`hover:shadow-lg transition-all cursor-pointer border-2 hover:border-[#1E40AF] ${article.featured ? 'ring-2 ring-[#10B981]/20' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {article.featured && (
                          <Badge className="bg-[#10B981] text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Recommandé
                          </Badge>
                        )}
                        <Badge variant="secondary">{article.category}</Badge>
                        {getDifficultyBadge(article.difficulty)}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 text-left" onClick={() => handleArticleClick(article.id)}>
                        {article.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {article.views.toLocaleString()} vues
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {article.rating}/5
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {article.helpful} utile(s)
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <p className="text-sm text-gray-500">
                        Mis à jour le {new Date(article.lastUpdated).toLocaleDateString('fr-BE')}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <Button
                        size="sm"
                        onClick={() => handleArticleClick(article.id)}
                        className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                      >
                        Lire l'article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsHelpful(article.id, 'article')}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Utile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Onglet Vidéos enrichi */}
        <TabsContent value="videos" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {videoTutorials.map((video) => (
              <Card key={video.id} className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-[#1E40AF] group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-24 h-18 bg-gradient-to-br from-[#1E40AF] to-[#2563EB] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                        {video.duration}
                      </Badge>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{video.category}</Badge>
                        <Badge className={`text-xs ${
                          video.level === 'Débutant' ? 'bg-green-100 text-green-700' :
                          video.level === 'Intermédiaire' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {video.level}
                        </Badge>
                        {video.transcript && (
                          <Badge variant="outline" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            Transcript
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="font-semibold mb-2 text-left">{video.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {video.views} vues
                          </span>
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={() => handleVideoPlay(video.id)}
                          className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Regarder
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Onglet FAQ amélioré */}
        <TabsContent value="faq" className="space-y-8">
          <Card className="border-2 border-[#1E40AF] bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <HelpCircle className="h-12 w-12 text-[#1E40AF]" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    Questions Fréquentes Complètes
                  </h2>
                </div>
                
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Découvrez notre base de connaissances complète avec plus de 50 questions détaillées, 
                  organisées par catégories et avec recherche intelligente.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
                    <Package className="h-8 w-8 text-blue-600" />
                    <div className="text-left">
                      <h3 className="font-semibold">Démarrage</h3>
                      <p className="text-sm text-gray-600">Configuration, premier envoi</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
                    <Truck className="h-8 w-8 text-green-600" />
                    <div className="text-left">
                      <h3 className="font-semibold">Consolidation</h3>
                      <p className="text-sm text-gray-600">Groupages, optimisation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
                    <Shield className="h-8 w-8 text-purple-600" />
                    <div className="text-left">
                      <h3 className="font-semibold">Douane & IA</h3>
                      <p className="text-sm text-gray-600">Automatisation, conformité</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                    onClick={() => onNavigate && onNavigate("faq")}
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Voir toutes les FAQ
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => onNavigate && onNavigate("faq", { search: "consolidation" })}
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Rechercher dans les FAQ
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>50+ questions détaillées</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Mise à jour quotidienne</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>96% de satisfaction</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aperçu des questions les plus populaires */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  Questions les plus populaires
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {faqSections[0].items.slice(0, 3).map((item, idx) => (
                  <div 
                    key={item.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onNavigate && onNavigate("faq", { search: item.question.split(' ')[0] })}
                  >
                    <h4 className="font-medium text-sm mb-1">{item.question}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{item.helpful} votes</span>
                      <span>•</span>
                      <span>{item.category}</span>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-3"
                  onClick={() => onNavigate && onNavigate("faq", { category: "démarrage" })}
                >
                  Voir toutes les questions démarrage
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Questions techniques avancées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {faqSections[4]?.items.slice(0, 3).map((item, idx) => (
                  <div 
                    key={item.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onNavigate && onNavigate("faq", { search: item.question.split(' ')[0] })}
                  >
                    <h4 className="font-medium text-sm mb-1">{item.question}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{item.helpful} votes</span>
                      <span>•</span>
                      <span>{item.category}</span>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-3"
                  onClick={() => onNavigate && onNavigate("faq", { category: "technique" })}
                >
                  Voir toutes les questions techniques
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Statut système enrichi */}
        <TabsContent value="status" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#1E40AF]" />
                  État des services en temps réel
                  <Badge className="bg-green-100 text-green-700 ml-auto">
                    Tous systèmes opérationnels
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemStatus.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(service.status)}
                        <div>
                          <p className="font-medium">{service.service}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Disponibilité: {service.uptime}</span>
                            <span>•</span>
                            <span>Temps de réponse: {service.responseTime}</span>
                            <span>•</span>
                            <span>Dernier incident: {service.lastIncident}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <Progress value={parseFloat(service.uptime)} className="w-20 h-2" />
                        </div>
                        {getStatusBadge(service.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performances globales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Disponibilité moyenne</span>
                      <span className="font-semibold">99.67%</span>
                    </div>
                    <Progress value={99.67} className="h-3" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Temps de réponse moyen</span>
                      <span className="font-semibold">167ms</span>
                    </div>
                    <Progress value={85} className="h-3" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Taux de réussite IA</span>
                      <span className="font-semibold">99.1%</span>
                    </div>
                    <Progress value={99.1} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prochaines maintenances</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <div className="flex-1">
                        <p className="font-medium">Mise à jour API v2.1</p>
                        <p className="text-sm text-gray-600">Dimanche 6 oct, 2h-4h</p>
                      </div>
                      <Badge variant="outline">Programmée</Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Shield className="h-4 w-4 text-green-500" />
                      <div className="flex-1">
                        <p className="font-medium">Sécurité serveurs</p>
                        <p className="text-sm text-gray-600">Samedi 12 oct, 1h-3h</p>
                      </div>
                      <Badge variant="outline">Planifiée</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Onglet Contact enrichi */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contacter notre équipe d'experts</CardTitle>
                  <p className="text-gray-600">Support multilingue (FR/EN/NL) par des spécialistes logistiques certifiés</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border-2 border-[#1E40AF]/20 rounded-lg bg-blue-50">
                    <div className="flex items-center gap-3 mb-3">
                      <MessageCircle className="h-6 w-6 text-[#1E40AF]" />
                      <div>
                        <h3 className="font-semibold">Chat en direct - Premium</h3>
                        <p className="text-sm text-gray-600">Disponible 24h/24 - Réponse &lt; 30 secondes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Experts logistiques certifiés</span>
                    </div>
                    <Button 
                      className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                      onClick={() => onNavigate?.('direct-chat')}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Démarrer une conversation
                    </Button>
                  </div>

                  <div className="p-4 border-2 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Phone className="h-6 w-6 text-[#10B981]" />
                      <div>
                        <h3 className="font-semibold">Support téléphonique</h3>
                        <p className="text-sm text-gray-600">+32 2 890 15 67</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3 space-y-1">
                      <p>🇧🇪 Français: Lun-Ven 8h-18h</p>
                      <p>🇬🇧 English: Mon-Fri 9h-17h</p>
                      <p>🇳🇱 Nederlands: Ma-Vr 8h-17h</p>
                    </div>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => onNavigate?.('phone-support')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Programmer un appel
                    </Button>
                  </div>

                  <div className="p-4 border-2 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Mail className="h-6 w-6 text-orange-500" />
                      <div>
                        <h3 className="font-semibold">Email expert</h3>
                        <p className="text-sm text-gray-600">support@hubdispo.be</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>Réponse garantie sous 1h (heures ouvrables)</span>
                    </div>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => onNavigate?.('email-support')}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Envoyer un email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Consultation personnalisée</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border-2 border-purple-200 rounded-lg bg-purple-50">
                    <div className="flex items-center gap-3 mb-3">
                      <Target className="h-6 w-6 text-purple-600" />
                      <div>
                        <h3 className="font-semibold">Session stratégique</h3>
                        <p className="text-sm text-gray-600">1h avec un expert logistique senior</p>
                      </div>
                    </div>
                    <ul className="text-sm space-y-1 mb-4">
                      <li>✅ Audit de vos flux logistiques</li>
                      <li>✅ Plan d'optimisation personnalisé</li>
                      <li>✅ Formation équipe incluse</li>
                      <li>✅ Suivi post-implémentation</li>
                    </ul>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => onNavigate?.('demo-scheduler')}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Réserver ma session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ressources et communauté</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start hover:bg-blue-50" onClick={() => onNavigate?.('documentation')}>
                    <Download className="h-4 w-4 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Guide de démarrage PDF</div>
                      <div className="text-xs text-gray-500">120 pages - Tout pour commencer</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start hover:bg-green-50">
                    <Book className="h-4 w-4 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Documentation API complète</div>
                      <div className="text-xs text-gray-500">REST API, SDKs, exemples</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start hover:bg-purple-50">
                    <Users className="h-4 w-4 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Communauté des utilisateurs</div>
                      <div className="text-xs text-gray-500">1,200+ PME • Forum • Événements</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start hover:bg-yellow-50">
                    <Star className="h-4 w-4 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Évaluer hubdispo.be</div>
                      <div className="text-xs text-gray-500">Votre avis compte pour nous améliorer</div>
                    </div>
                  </Button>

                  <Separator className="my-4" />

                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Bell className="h-5 w-5 text-[#1E40AF]" />
                      <h4 className="font-semibold">Restez informé</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Recevez les dernières mises à jour, conseils d'experts et nouveautés
                    </p>
                    <Button size="sm" className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                      S'abonner à la newsletter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistiques du support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-[#10B981]">&lt; 30s</p>
                      <p className="text-xs text-gray-600">Temps de réponse chat</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-[#1E40AF]">98.5%</p>
                      <p className="text-xs text-gray-600">Satisfaction client</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">24h/24</p>
                      <p className="text-xs text-gray-600">Disponibilité chat</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">&lt; 1h</p>
                      <p className="text-xs text-gray-600">Réponse email</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Onglet Ressources */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-[#1E40AF]" />
                  Guides téléchargeables
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Guide de démarrage complet</p>
                      <p className="text-sm text-gray-600">120 pages • PDF</p>
                    </div>
                    <Download className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Checklist douanière UE</p>
                      <p className="text-sm text-gray-600">8 pages • PDF</p>
                    </div>
                    <Download className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Templates documents</p>
                      <p className="text-sm text-gray-600">Factures, CMR • ZIP</p>
                    </div>
                    <Download className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-[#10B981]" />
                  Documentation technique
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate?.('documentation')}>
                  <FileText className="h-4 w-4 mr-2" />
                  API REST Documentation
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  SDKs & Intégrations
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Webhooks & Callbacks
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Sécurité & Conformité
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Communauté & Formation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">1,247 membres actifs</span>
                  </div>
                  <p className="text-sm text-gray-600">Forum communautaire des utilisateurs</p>
                </div>
                
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Webinaires mensuels
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2" />
                  Certifications partenaires
                </Button>
                
                <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Prochains événements</p>
                  <p className="text-xs text-gray-600">Formation douane IA - 15 oct</p>
                  <p className="text-xs text-gray-600">Atelier optimisation - 22 oct</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}