// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useMemo } from "react";
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ThumbsUp, 
  ThumbsDown, 
  BookOpen, 
  MessageCircle, 
  ArrowRight, 
  Package, 
  Truck, 
  Shield, 
  BarChart3, 
  Settings, 
  Globe, 
  Clock, 
  CreditCard, 
  Users, 
  Zap, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calendar, 
  TrendingUp,
  Target,
  Award,
  Brain,
  Activity,
  MapPin,
  Building2,
  HelpCircle,
  ExternalLink,
  Lightbulb,
  Star
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "./LanguageProvider";
import { useAuth } from "./AuthProvider";

interface FAQProps {
  onNavigate?: (view: string, params?: any) => void;
  category?: string; // Pour afficher une catégorie spécifique
  searchQuery?: string; // Pour une recherche initiale
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  subcategory?: string;
  tags: string[];
  helpful: number;
  notHelpful: number;
  lastUpdated: string;
  priority: "high" | "medium" | "low";
  relatedQuestions?: string[];
  relatedActions?: {
    label: string;
    action: string;
    params?: any;
    icon?: any;
  }[];
  featured: boolean;
  views: number;
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface FAQCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  count: number;
  featured: boolean;
}

export default function ComprehensiveFAQ({ onNavigate, category, searchQuery: initialSearch }: FAQProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState(initialSearch || "");
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [userFeedback, setUserFeedback] = useState<Record<string, 'helpful' | 'not_helpful'>>({});

  // Base de données FAQ complète pour hubdispo.be
  const faqItems: FAQItem[] = [
    // DÉMARRAGE & CONFIGURATION
    {
      id: "what-is-hubdispo",
      question: "Qu'est-ce que hubdispo.be exactement ?",
      answer: "hubdispo.be est la première plateforme SaaS belge spécialisée dans la micro-consolidation logistique intelligente. Nous aidons les PME exportatrices/importatrices à optimiser leurs envois internationaux de petits volumes (1-50 colis) en les regroupant avec d'autres entreprises vers les mêmes destinations. Notre IA automatise 99% des formalités douanières et réduit vos coûts logistiques de 30-65%.",
      category: "démarrage",
      subcategory: "présentation",
      tags: ["plateforme", "consolidation", "PME", "économies", "automatisation"],
      helpful: 456,
      notHelpful: 12,
      lastUpdated: "2024-10-01",
      priority: "high",
      featured: true,
      views: 8924,
      difficulty: "beginner",
      relatedActions: [
        { label: "Créer un compte", action: "navigate", params: { view: "register" }, icon: Package },
        { label: "Voir la démo", action: "navigate", params: { view: "demo-scheduler" }, icon: Calendar }
      ]
    },
    {
      id: "account-setup",
      question: "Comment configurer mon compte professionnel ?",
      answer: "L'inscription est simple et rapide : 1) Renseignez vos coordonnées d'entreprise et numéro de TVA belge, 2) Vérifiez votre email et téléphone, 3) Configurez vos préférences logistiques (destinations fréquentes, types de produits, volume mensuel), 4) Connectez vos systèmes existants (optionnel). Vous accédez immédiatement à votre tableau de bord personnalisé avec des recommandations basées sur votre secteur.",
      category: "démarrage",
      subcategory: "configuration",
      tags: ["inscription", "compte", "TVA", "configuration", "onboarding"],
      helpful: 298,
      notHelpful: 8,
      lastUpdated: "2024-09-28",
      priority: "high",
      featured: true,
      views: 5672,
      difficulty: "beginner",
      relatedActions: [
        { label: "S'inscrire maintenant", action: "navigate", params: { view: "register" }, icon: Users },
        { label: "Aide configuration", action: "navigate", params: { view: "direct-chat", topic: "setup" }, icon: MessageCircle }
      ]
    },
    {
      id: "first-shipment-time",
      question: "Combien de temps pour organiser mon premier envoi ?",
      answer: "Votre premier envoi peut être configuré en 3-5 minutes seulement ! Notre assistant intelligent vous guide étape par étape : 1) Saisissez destination et contenu (auto-complétion IA), 2) L'IA génère automatiquement les documents douaniers, 3) Vous rejoignez instantanément le meilleur groupe de consolidation disponible, 4) Confirmation et enlèvement programmé. Plus vous utilisez la plateforme, plus le processus s'accélère grâce à l'apprentissage automatique.",
      category: "démarrage",
      subcategory: "premier envoi",
      tags: ["premier envoi", "rapidité", "assistant IA", "guide"],
      helpful: 387,
      notHelpful: 15,
      lastUpdated: "2024-09-30",
      priority: "high",
      featured: true,
      views: 6234,
      difficulty: "beginner",
      relatedActions: [
        { label: "Créer mon envoi", action: "navigate", params: { view: "new-shipment" }, icon: Package },
        { label: "Tutoriel vidéo", action: "navigate", params: { view: "help", tab: "videos" }, icon: BookOpen }
      ]
    },

    // CONSOLIDATION & OPTIMISATION
    {
      id: "consolidation-process",
      question: "Comment fonctionne exactement la micro-consolidation ?",
      answer: "Notre algorithme IA analyse en temps réel tous les envois vers la même destination pour créer des groupes optimaux. Vous gardez le contrôle total : visualisez vos co-expéditeurs (anonymisés), suivez le taux de remplissage en direct, et validez avant expédition. Chaque colis garde son identité propre, son tracking individuel, et sa livraison séparée chez le destinataire final. Économies moyennes : 35% vs transport traditionnel.",
      category: "consolidation",
      subcategory: "fonctionnement",
      tags: ["consolidation", "algorithme", "groupes", "économies", "contrôle"],
      helpful: 523,
      notHelpful: 18,
      lastUpdated: "2024-10-01",
      priority: "high",
      featured: true,
      views: 9456,
      difficulty: "intermediate",
      relatedActions: [
        { label: "Voir groupes disponibles", action: "navigate", params: { view: "consolidation" }, icon: Truck },
        { label: "Calculer mes économies", action: "navigate", params: { view: "consolidation", tab: "calculator" }, icon: BarChart3 }
      ]
    },
    {
      id: "consolidation-timing",
      question: "Quels sont les délais réels de consolidation ?",
      answer: "Délais moyens par destination : 🇩🇪 Allemagne : 24-48h, 🇳🇱 Pays-Bas : 24-36h, 🇫🇷 France : 48-72h, 🇮🇹 Italie : 72-96h, 🇪🇸 Espagne : 72-120h. Notre IA optimise continuellement ces délais en fonction du taux de remplissage et de la demande. Option 'Smart Priority' : consolidation accélérée avec d'autres envois urgents pour réduire les délais de 30-50%.",
      category: "consolidation",
      subcategory: "délais",
      tags: ["délais", "destinations", "Europe", "optimisation", "priorité"],
      helpful: 445,
      notHelpful: 22,
      lastUpdated: "2024-09-29",
      priority: "high",
      featured: false,
      views: 7892,
      difficulty: "beginner",
      relatedActions: [
        { label: "Voir carte délais", action: "navigate", params: { view: "map" }, icon: MapPin },
        { label: "Mode prioritaire", action: "navigate", params: { view: "new-shipment", mode: "priority" }, icon: Zap }
      ]
    },
    {
      id: "urgent-shipments",
      question: "Solutions pour les envois vraiment urgents ?",
      answer: "3 options d'urgence : 1) **Mode Express** : bypass total de la consolidation, transport direct prioritaire, livraison garantie sous 48h UE (supplément 40-60%), 2) **Smart Priority** : consolidation ultra-rapide avec autres envois urgents (supplément 15-25%), 3) **Same-Day** : enlèvement et livraison dans la journée pour Bruxelles-Amsterdam-Paris (supplément 80-120%). Garantie délai ou remboursement intégral.",
      category: "consolidation",
      subcategory: "urgence",
      tags: ["urgent", "express", "garantie", "same-day", "priorité"],
      helpful: 334,
      notHelpful: 11,
      lastUpdated: "2024-09-27",
      priority: "medium",
      featured: false,
      views: 4567,
      difficulty: "intermediate",
      relatedActions: [
        { label: "Mode express", action: "navigate", params: { view: "new-shipment", mode: "express" }, icon: Zap },
        { label: "Contacter urgence", action: "navigate", params: { view: "phone-support" }, icon: Phone }
      ]
    },

    // DOUANE & CONFORMITÉ
    {
      id: "ai-customs-reliability",
      question: "Quelle est la fiabilité réelle de l'assistant douanier IA ?",
      answer: "Notre IA affiche un taux de réussite documenté de 99.2% sur plus de 75,000 déclarations traitées depuis janvier 2024. Base de données : nomenclatures douanières complètes UE/Belgique, accords commerciaux internationaux, régimes fiscaux préférentiels. Machine learning continu basé sur les retours douaniers réels, validation par notre équipe d'experts certifiés, et mise à jour automatique selon les évolutions réglementaires.",
      category: "douane",
      subcategory: "fiabilité",
      tags: ["IA douanière", "fiabilité", "taux de réussite", "machine learning", "experts"],
      helpful: 678,
      notHelpful: 14,
      lastUpdated: "2024-10-01",
      priority: "high",
      featured: true,
      views: 12456,
      difficulty: "intermediate",
      relatedActions: [
        { label: "Tester l'IA douanière", action: "navigate", params: { view: "dau-generator" }, icon: Brain },
        { label: "Voir statistiques", action: "navigate", params: { view: "help", tab: "status" }, icon: Activity }
      ]
    },
    {
      id: "customs-error-handling",
      question: "Que se passe-t-il en cas d'erreur ou de blocage douanier ?",
      answer: "Processus d'intervention 24/7 : 1) **Détection automatique** : alertes instantanées via IA de monitoring, 2) **Intervention experte** : spécialistes douaniers certifiés mobilisés sous 60 minutes, 3) **Résolution rapide** : correction, re-soumission et suivi jusqu'à déblocage complet, 4) **Compensation** : frais supplémentaires pris en charge + dédommagement selon SLA. Assurance 'Zéro Souci Douane' incluse dans tous les plans.",
      category: "douane",
      subcategory: "support",
      tags: ["erreur douanière", "blocage", "intervention", "experts", "assurance"],
      helpful: 567,
      notHelpful: 9,
      lastUpdated: "2024-09-30",
      priority: "high",
      featured: true,
      views: 8934,
      difficulty: "intermediate",
      relatedActions: [
        { label: "Urgence douanière", action: "navigate", params: { view: "phone-support", type: "customs" }, icon: AlertTriangle },
        { label: "Voir assurance", action: "navigate", params: { view: "help", topic: "insurance" }, icon: Shield }
      ]
    },
    {
      id: "document-compliance",
      question: "Conformité et validité légale des documents générés ?",
      answer: "Conformité totale garantie : **Certifications** : ISO 27001 (sécurité), ISO 9001 (qualité), agrément UE pour édition de documents douaniers, **Validation légale** : cabinet Loyens & Loeff (droit douanier), audit semestriel par EY, **Mise à jour** : surveillance continue des évolutions réglementaires, intégration automatique des nouvelles directives UE/nationales. Tous nos documents ont valeur légale équivalente aux déclarations manuelles traditionnelles.",
      category: "douane",
      subcategory: "conformité",
      tags: ["conformité", "légal", "certifications", "ISO", "validation"],
      helpful: 445,
      notHelpful: 6,
      lastUpdated: "2024-09-28",
      priority: "medium",
      featured: false,
      views: 6789,
      difficulty: "advanced",
      relatedActions: [
        { label: "Voir certifications", action: "navigate", params: { view: "legal" }, icon: Award },
        { label: "Audit conformité", action: "navigate", params: { view: "demo-scheduler", type: "compliance" }, icon: CheckCircle }
      ]
    },

    // FACTURATION & ÉCONOMIES
    {
      id: "pricing-model",
      question: "Comment fonctionne exactement votre modèle de tarification ?",
      answer: "Modèle transparent basé sur vos économies réelles : **Principe** : nous ne facturons que si vous économisez vs solutions traditionnelles, **Commission** : 20-30% des économies réalisées (dégressif selon volume), **Calcul temps réel** : comparateur automatique avec DHL/UPS/FedEx pour chaque envoi, **Garantie** : si vous n'économisez pas minimum 15%, l'envoi est gratuit. Aucun frais caché, aucun engagement, facturation mensuelle claire avec détail par envoi.",
      category: "facturation",
      subcategory: "tarification",
      tags: ["tarification", "économies", "commission", "transparence", "garantie"],
      helpful: 612,
      notHelpful: 23,
      lastUpdated: "2024-10-01",
      priority: "high",
      featured: true,
      views: 11234,
      difficulty: "beginner",
      relatedActions: [
        { label: "Calculateur économies", action: "navigate", params: { view: "consolidation", tab: "calculator" }, icon: BarChart3 },
        { label: "Voir tarifs détaillés", action: "navigate", params: { view: "subscription" }, icon: CreditCard }
      ]
    },
    {
      id: "cost-breakdown",
      question: "Détail précis des coûts et économies par envoi ?",
      answer: "Dashboard de transparence totale : **Coûts détaillés** : transport (prix négocié), douane (frais réels), assurance (0.3% valeur), commission hubdispo.be, **Comparaison automatique** : prix traditionnel vs prix consolidé avec % d'économie exact, **Reporting** : économies mensuelles/annuelles, projection basée sur vos volumes, ROI détaillé par destination. Export comptable disponible (CSV/Excel/API).",
      category: "facturation",
      subcategory: "économies",
      tags: ["coûts", "détail", "économies", "transparence", "reporting"],
      helpful: 489,
      notHelpful: 18,
      lastUpdated: "2024-09-29",
      priority: "medium",
      featured: false,
      views: 7456,
      difficulty: "intermediate",
      relatedActions: [
        { label: "Mon dashboard coûts", action: "navigate", params: { view: "dashboard", tab: "costs" }, icon: TrendingUp },
        { label: "Export comptable", action: "navigate", params: { view: "reports", type: "financial" }, icon: FileText }
      ]
    },
    {
      id: "payment-methods",
      question: "Quels sont les moyens de paiement acceptés ?",
      answer: "Options de paiement flexibles : **Prélèvement SEPA** : automatique mensuel (recommandé), **Virement bancaire** : paiement à 30 jours sur facture, **Carte de crédit** : Visa/Mastercard avec sécurisation 3D-Secure, **Wallet digital** : PayPal Business, **Crédit inter-entreprises** : disponible après validation (limite selon chiffre d'affaires). Facturation électronique compatible avec vos systèmes comptables.",
      category: "facturation",
      subcategory: "paiement",
      tags: ["paiement", "SEPA", "crédit", "facturation", "comptabilité"],
      helpful: 356,
      notHelpful: 12,
      lastUpdated: "2024-09-25",
      priority: "medium",
      featured: false,
      views: 5234,
      difficulty: "beginner",
      relatedActions: [
        { label: "Configurer paiement", action: "navigate", params: { view: "settings", tab: "billing" }, icon: CreditCard },
        { label: "Demander crédit", action: "navigate", params: { view: "direct-chat", topic: "credit" }, icon: MessageCircle }
      ]
    },

    // INTÉGRATION & TECHNIQUE
    {
      id: "api-availability",
      question: "API et intégrations techniques disponibles ?",
      answer: "Écosystème technique complet : **API REST** : endpoints complets (envois, tracking, facturation, reporting), **Webhooks** : notifications temps réel des changements d'état, **SDKs officiels** : PHP, Python, Node.js, C# avec exemples, **Intégrations natives** : WooCommerce, Shopify, PrestaShop, Magento, SAP, Odoo, **Documentation** : guides détaillés, Postman collections, sandbox de test illimité.",
      category: "technique",
      subcategory: "API",
      tags: ["API", "intégrations", "webhooks", "SDK", "documentation"],
      helpful: 234,
      notHelpful: 8,
      lastUpdated: "2024-10-01",
      priority: "medium",
      featured: false,
      views: 3456,
      difficulty: "advanced",
      relatedActions: [
        { label: "Documentation API", action: "navigate", params: { view: "documentation" }, icon: BookOpen },
        { label: "Sandbox de test", action: "navigate", params: { view: "demo-scheduler", type: "api" }, icon: Settings }
      ]
    },
    {
      id: "api-limits",
      question: "Limites et performances de l'API ?",
      answer: "Performances enterprise : **Rate limits** : 1000 req/min (Standard), 5000 req/min (Premium), 25000 req/min (Enterprise), **SLA** : 99.9% uptime garanti, **Latence** : <150ms moyenne Europe, <300ms worldwide, **Monitoring** : dashboard Grafana accessible, alertes proactives, **Support** : équipe DevOps dédiée, Slack/Teams connect possible. Infrastructure AWS multi-zones avec auto-scaling.",
      category: "technique",
      subcategory: "performance",
      tags: ["rate limits", "SLA", "performance", "monitoring", "infrastructure"],
      helpful: 189,
      notHelpful: 5,
      lastUpdated: "2024-09-30",
      priority: "low",
      featured: false,
      views: 2345,
      difficulty: "advanced",
      relatedActions: [
        { label: "Monitoring en direct", action: "navigate", params: { view: "system-status" }, icon: Activity },
        { label: "Support technique", action: "navigate", params: { view: "technical-support" }, icon: MessageCircle }
      ]
    },

    // SÉCURITÉ & CONFIDENTIALITÉ
    {
      id: "data-security",
      question: "Sécurité et protection de mes données entreprise ?",
      answer: "Sécurité de niveau bancaire : **Chiffrement** : AES-256 en transit et au repos, clés gérées par AWS KMS, **Accès** : authentification multi-facteurs obligatoire, SSO enterprise (SAML/OIDC), **Audit** : logs immutables, traçabilité complète, audit annuel par Deloitte Cyber, **Conformité** : RGPD strict, ISO 27001, SOC2 Type II, hébergement UE exclusivement. Vos données ne sont jamais partagées avec des tiers.",
      category: "sécurité",
      subcategory: "données",
      tags: ["sécurité", "chiffrement", "RGPD", "audit", "confidentialité"],
      helpful: 445,
      notHelpful: 7,
      lastUpdated: "2024-09-28",
      priority: "high",
      featured: true,
      views: 6789,
      difficulty: "intermediate",
      relatedActions: [
        { label: "Politique RGPD", action: "navigate", params: { view: "privacy" }, icon: Shield },
        { label: "Audit sécurité", action: "navigate", params: { view: "demo-scheduler", type: "security" }, icon: Award }
      ]
    },

    // SUPPORT & ASSISTANCE
    {
      id: "support-availability",
      question: "Disponibilité et types de support client ?",
      answer: "Support premium multicanal : **Chat en direct** : 24/7 avec IA + agents experts en français/anglais/néerlandais, **Téléphone** : ligne directe prioritaire 9h-19h (BE), urgences 24/7, **Email** : réponse garantie <4h en journée, <12h le weekend, **Success Manager** : dédié aux comptes Premium/Enterprise avec reviews trimestrielles, **Formation** : webinaires mensuels, onboarding personnalisé, certification utilisateurs.",
      category: "support",
      subcategory: "disponibilité",
      tags: ["support", "multicanal", "24/7", "formation", "success manager"],
      helpful: 523,
      notHelpful: 11,
      lastUpdated: "2024-10-01",
      priority: "high",
      featured: true,
      views: 8765,
      difficulty: "beginner",
      relatedActions: [
        { label: "Chat support", action: "navigate", params: { view: "direct-chat" }, icon: MessageCircle },
        { label: "Programmer formation", action: "navigate", params: { view: "demo-scheduler", type: "training" }, icon: Calendar }
      ]
    },

    // SPÉCIFICITÉS BELGES
    {
      id: "belgian-specifics",
      question: "Spécificités et avantages pour les entreprises belges ?",
      answer: "Plateforme conçue pour les PME belges : **Réglementation** : expertise pointue douane belge/UE, procédures spécifiques port d'Anvers, **Réseau** : partenaires logistiques belges certifiés, entrepôts Anvers/Bruxelles/Liège, **Fiscal** : optimisation TVA intracommunautaire, gestion régimes suspensifs, **Langue** : interface en français/néerlandais, support local, **Proximité** : équipe basée à Bruxelles, visites clients possibles, événements networking réguliers.",
      category: "belgique",
      subcategory: "spécificités",
      tags: ["Belgique", "PME", "TVA", "Anvers", "local"],
      helpful: 378,
      notHelpful: 9,
      lastUpdated: "2024-09-29",
      priority: "medium",
      featured: true,
      views: 5678,
      difficulty: "beginner",
      relatedActions: [
        { label: "Avantages belges", action: "navigate", params: { view: "homepage", section: "belgium" }, icon: Building2 },
        { label: "Rencontrer l'équipe", action: "navigate", params: { view: "demo-scheduler", type: "meeting" }, icon: Users }
      ]
    },

    // ÉVOLUTIVITÉ & VOLUMES
    {
      id: "volume-scaling",
      question: "La plateforme s'adapte-t-elle à ma croissance ?",
      answer: "Scalabilité illimitée : **Volumes** : de 1 colis/mois à 10,000+/mois sans rupture de service, **Tarification dégressive** : plus vous expédiez, moins vous payez (jusqu'à -40% sur les gros volumes), **Automatisation** : API complète pour intégrer vos flux existants, **Analytics** : BI avancée avec prédictions de croissance, **International** : extension graduelle vers nouveaux pays selon vos besoins, **Équipe dédiée** : Account Manager + support priority dès 100 envois/mois.",
      category: "évolutivité",
      subcategory: "croissance",
      tags: ["scalabilité", "croissance", "volumes", "automatisation", "international"],
      helpful: 289,
      notHelpful: 6,
      lastUpdated: "2024-09-27",
      priority: "medium",
      featured: false,
      views: 4321,
      difficulty: "intermediate",
      relatedActions: [
        { label: "Planifier croissance", action: "navigate", params: { view: "demo-scheduler", type: "scaling" }, icon: TrendingUp },
        { label: "Voir tarifs volume", action: "navigate", params: { view: "subscription", tab: "enterprise" }, icon: Target }
      ]
    }
  ];

  // Catégories avec design amélioré
  const categories: FAQCategory[] = [
    {
      id: "all",
      title: "Toutes les questions",
      description: "L'ensemble de notre base de connaissances",
      icon: HelpCircle,
      color: "bg-gray-100 text-gray-700",
      count: faqItems.length,
      featured: false
    },
    {
      id: "démarrage",
      title: "🚀 Démarrage",
      description: "Configuration, premier envoi, onboarding",
      icon: Package,
      color: "bg-blue-100 text-blue-700",
      count: faqItems.filter(item => item.category === "démarrage").length,
      featured: true
    },
    {
      id: "consolidation",
      title: "📦 Consolidation",
      description: "Groupages, optimisation, délais",
      icon: Truck,
      color: "bg-green-100 text-green-700",
      count: faqItems.filter(item => item.category === "consolidation").length,
      featured: true
    },
    {
      id: "douane",
      title: "🛃 Douane & IA",
      description: "Automatisation, conformité, fiabilité",
      icon: Shield,
      color: "bg-purple-100 text-purple-700",
      count: faqItems.filter(item => item.category === "douane").length,
      featured: true
    },
    {
      id: "facturation",
      title: "💰 Facturation",
      description: "Tarifs, économies, paiements",
      icon: BarChart3,
      color: "bg-amber-100 text-amber-700",
      count: faqItems.filter(item => item.category === "facturation").length,
      featured: true
    },
    {
      id: "technique",
      title: "⚙️ Technique",
      description: "API, intégrations, performance",
      icon: Settings,
      color: "bg-indigo-100 text-indigo-700",
      count: faqItems.filter(item => item.category === "technique").length,
      featured: false
    },
    {
      id: "sécurité",
      title: "🔒 Sécurité",
      description: "Protection données, RGPD, audits",
      icon: Shield,
      color: "bg-red-100 text-red-700",
      count: faqItems.filter(item => item.category === "sécurité").length,
      featured: false
    },
    {
      id: "support",
      title: "🆘 Support",
      description: "Assistance, formation, contact",
      icon: MessageCircle,
      color: "bg-teal-100 text-teal-700",
      count: faqItems.filter(item => item.category === "support").length,
      featured: false
    },
    {
      id: "belgique",
      title: "🇧🇪 Spécial Belgique",
      description: "Avantages et spécificités belges",
      icon: Building2,
      color: "bg-yellow-100 text-yellow-700",
      count: faqItems.filter(item => item.category === "belgique").length,
      featured: true
    },
    {
      id: "évolutivité",
      title: "📈 Évolutivité",
      description: "Croissance, volumes, scalabilité",
      icon: TrendingUp,
      color: "bg-pink-100 text-pink-700",
      count: faqItems.filter(item => item.category === "évolutivité").length,
      featured: false
    }
  ];

  // Filtrage et recherche intelligente
  const filteredItems = useMemo(() => {
    let filtered = faqItems;

    // Filtre par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filtre par difficulté
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(item => item.difficulty === selectedDifficulty);
    }

    // Recherche textuelle intelligente
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query)) ||
        item.subcategory?.toLowerCase().includes(query)
      );
    }

    // Tri
    switch (sortBy) {
      case "relevance":
        return filtered.sort((a, b) => {
          // Prioriser featured, puis helpful, puis views
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.priority !== b.priority) {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          }
          return b.helpful - a.helpful;
        });
      case "popular":
        return filtered.sort((a, b) => b.views - a.views);
      case "helpful":
        return filtered.sort((a, b) => b.helpful - a.helpful);
      case "recent":
        return filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
      default:
        return filtered;
    }
  }, [faqItems, selectedCategory, selectedDifficulty, searchQuery, sortBy]);

  // Gestion de l'expansion des items
  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
      // Marquer comme vue
      // Dans un vrai système, on ferait un call API
    }
    setExpandedItems(newExpanded);
  };

  // Gestion du feedback
  const handleFeedback = (itemId: string, helpful: boolean) => {
    setUserFeedback(prev => ({
      ...prev,
      [itemId]: helpful ? 'helpful' : 'not_helpful'
    }));
    
    toast.success(helpful ? "Merci !" : "Merci pour votre retour !", {
      description: helpful 
        ? "Cette réponse a été marquée comme utile" 
        : "Nous allons améliorer cette réponse",
      action: helpful ? undefined : {
        label: "Suggérer amélioration",
        onClick: () => onNavigate?.("direct-chat", { topic: "faq_feedback", itemId })
      }
    });
  };

  // Action sur les boutons d'action
  const handleAction = (action: any) => {
    if (action.action === "navigate" && onNavigate) {
      onNavigate(action.params.view, action.params);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-8">
      {/* Header avec recherche avancée */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-10 w-10 text-[#1E40AF]" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#1E40AF] to-[#2563EB] bg-clip-text text-transparent">
              Questions Fréquentes
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tout ce que vous devez savoir sur hubdispo.be, la plateforme de micro-consolidation 
            logistique intelligente pour PME belges
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{faqItems.length} questions répondues</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Mise à jour quotidienne</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>96% de satisfaction</span>
            </div>
          </div>
        </div>

        {/* Barre de recherche intelligente */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          <Input
            placeholder="Recherchez parmi toutes nos questions fréquentes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-[#1E40AF] rounded-xl shadow-lg"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Catégories principales */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.filter(cat => cat.featured || cat.id === "all").map((category) => (
          <Card 
            key={category.id}
            className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
              selectedCategory === category.id 
                ? "border-[#1E40AF] bg-blue-50" 
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <CardContent className="p-4 text-center">
              <category.icon className={`h-8 w-8 mx-auto mb-2 ${
                selectedCategory === category.id ? "text-[#1E40AF]" : "text-gray-600"
              }`} />
              <h3 className="font-semibold text-sm mb-1">{category.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtres et tri */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Toutes catégories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tous niveaux" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous niveaux</SelectItem>
                  <SelectItem value="beginner">👶 Débutant</SelectItem>
                  <SelectItem value="intermediate">🎯 Intermédiaire</SelectItem>
                  <SelectItem value="advanced">🚀 Avancé</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">🎯 Pertinence</SelectItem>
                  <SelectItem value="popular">👀 Populaires</SelectItem>
                  <SelectItem value="helpful">👍 Plus utiles</SelectItem>
                  <SelectItem value="recent">🆕 Récentes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{filteredItems.length} résultat{filteredItems.length > 1 ? 's' : ''}</span>
              {searchQuery && (
                <Badge variant="outline">
                  Recherche: "{searchQuery}"
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions fréquentes */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <HelpCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
              <p className="text-gray-600 mb-4">
                Essayez d'autres mots-clés ou explorez nos catégories principales
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Effacer la recherche
                </Button>
                <Button variant="outline" onClick={() => setSelectedCategory("all")}>
                  Toutes catégories
                </Button>
                <Button onClick={() => onNavigate?.("direct-chat", { topic: "faq_search" })}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Poser une question
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className={`border-2 transition-all hover:shadow-lg ${
                item.featured ? "border-l-4 border-l-[#1E40AF]" : ""
              }`}
            >
              <CardContent className="p-0">
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpanded(item.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {item.question}
                        </h3>
                        {item.featured && (
                          <Badge className="bg-[#1E40AF] text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Populaire
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {item.difficulty === "beginner" ? "👶 Débutant" :
                           item.difficulty === "intermediate" ? "🎯 Intermédiaire" : "🚀 Avancé"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {item.helpful}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {item.views}
                        </span>
                        <span>Mis à jour: {new Date(item.lastUpdated).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      {expandedItems.has(item.id) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedItems.has(item.id) && (
                  <div className="px-6 pb-6 border-t bg-gray-50">
                    <div className="pt-4 space-y-4">
                      {/* Réponse */}
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions liées */}
                      {item.relatedActions && item.relatedActions.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm text-gray-900">Actions recommandées :</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.relatedActions.map((action, idx) => (
                              <Button
                                key={idx}
                                size="sm"
                                variant="outline"
                                onClick={() => handleAction(action)}
                                className="flex items-center gap-2"
                              >
                                {action.icon && <action.icon className="h-4 w-4" />}
                                {action.label}
                                <ArrowRight className="h-3 w-3" />
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      <Separator />

                      {/* Feedback */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Cette réponse vous a-t-elle aidé ?</span>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeedback(item.id, true)}
                              className={`p-2 ${
                                userFeedback[item.id] === 'helpful' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'hover:bg-green-50'
                              }`}
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleFeedback(item.id, false)}
                              className={`p-2 ${
                                userFeedback[item.id] === 'not_helpful' 
                                  ? 'bg-red-100 text-red-700' 
                                  : 'hover:bg-red-50'
                              }`}
                            >
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onNavigate?.("direct-chat", { topic: "faq_question", itemId: item.id })}
                          className="text-[#1E40AF] hover:text-[#1E40AF] hover:bg-blue-50"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Question complémentaire
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Call to action */}
      <Card className="bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas la réponse ?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Notre équipe d'experts est là pour vous aider ! Support multicanal disponible 
            24/7 en français, anglais et néerlandais.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => onNavigate?.("direct-chat")}
              className="bg-white text-[#1E40AF] hover:bg-gray-100"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat en direct
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate?.("phone-support")}
              className="border-white text-white hover:bg-white hover:text-[#1E40AF]"
            >
              <Phone className="h-5 w-5 mr-2" />
              Téléphone
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate?.("demo-scheduler")}
              className="border-white text-white hover:bg-white hover:text-[#1E40AF]"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Démonstration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}