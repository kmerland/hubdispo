// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Search, Play, BookOpen, Clock, Star, Users, Truck, Shield, Settings, Globe, ChevronRight, Filter, X, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { useLanguage } from "./LanguageProvider";

interface GuidesProps {
  onNavigate: (view: string) => void;
}

export default function Guides({ onNavigate }: GuidesProps) {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedGuide, setSelectedGuide] = useState<any>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("8:32");
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSimulatedVideo, setIsSimulatedVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (videoRef.current && selectedGuide) {
      console.log('Setting up video with:', {
        videoUrl: selectedGuide.videoUrl,
        volume,
        isMuted
      });
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
      
      // Force load the video
      videoRef.current.load();
    }
  }, [selectedGuide, volume, isMuted]);

  const getContent = () => {
    switch (language) {
      case 'en':
        return {
          title: "Guides",
          subtitle: "Step-by-step guides and video tutorials",
          categories: [
            { id: "all", name: "All categories", icon: BookOpen },
            { id: "getting-started", name: "Getting Started", icon: BookOpen },
            { id: "logistics", name: "Logistics", icon: Truck },
            { id: "customs", name: "Customs", icon: Shield },
            { id: "advanced", name: "Advanced", icon: Settings }
          ],
          types: [
            { id: "all", name: "All types" },
            { id: "written", name: "Written guides" },
            { id: "video", name: "Video tutorials" },
            { id: "interactive", name: "Interactive guides" }
          ],
          guides: [
            {
              id: 1,
              title: "Your First Shipment - Complete Walkthrough",
              description: "Learn how to create, configure and send your first package with hubdispo.be",
              category: "getting-started",
              type: "video",
              duration: "8:32",
              difficulty: "Beginner",
              views: "3.2k",
              rating: 4.9,
              thumbnail: "video-thumbnail-1.jpg",
              tags: ["setup", "basics", "tutorial"]
            },
            {
              id: 2,
              title: "Optimizing Costs with Consolidation",
              description: "Advanced strategies to maximize savings through micro-consolidation",
              category: "logistics",
              type: "written",
              readTime: "12 min",
              difficulty: "Intermediate",
              views: "2.1k",
              rating: 4.7,
              tags: ["consolidation", "costs", "optimization"]
            },
            {
              id: 3,
              title: "Customs Documents: AI Assistant Guide",
              description: "How to use our AI assistant for automated customs document generation",
              category: "customs",
              type: "interactive",
              duration: "Interactive",
              difficulty: "Beginner",
              views: "1.8k",
              rating: 4.8,
              tags: ["customs", "AI", "automation"]
            },
            {
              id: 4,
              title: "API Integration: Complete Setup",
              description: "Integrate hubdispo.be into your existing systems",
              category: "advanced",
              type: "written",
              readTime: "25 min",
              difficulty: "Advanced",
              views: "892",
              rating: 4.6,
              tags: ["API", "integration", "development"]
            },
            {
              id: 5,
              title: "Managing Multiple Destinations",
              description: "Efficiently handle shipments to multiple European countries",
              category: "logistics",
              type: "video",
              duration: "6:45",
              difficulty: "Intermediate",
              views: "1.5k",
              rating: 4.5,
              tags: ["multi-destination", "Europe", "efficiency"],
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            },
            {
              id: 6,
              title: "Troubleshooting Common Issues",
              description: "Solutions to the most frequent problems encountered",
              category: "getting-started",
              type: "written",
              readTime: "8 min",
              difficulty: "Beginner",
              views: "2.3k",
              rating: 4.4,
              tags: ["troubleshooting", "support", "FAQ"]
            }
          ]
        };
      case 'nl':
        return {
          title: "Gidsen",
          subtitle: "Stap-voor-stap gidsen en video tutorials",
          categories: [
            { id: "all", name: "Alle categorieën", icon: BookOpen },
            { id: "getting-started", name: "Aan de slag", icon: BookOpen },
            { id: "logistics", name: "Logistiek", icon: Truck },
            { id: "customs", name: "Douane", icon: Shield },
            { id: "advanced", name: "Geavanceerd", icon: Settings }
          ],
          types: [
            { id: "all", name: "Alle types" },
            { id: "written", name: "Geschreven gidsen" },
            { id: "video", name: "Video tutorials" },
            { id: "interactive", name: "Interactieve gidsen" }
          ],
          guides: [
            {
              id: 1,
              title: "Uw Eerste Zending - Complete Doorloop",
              description: "Leer hoe u uw eerste pakket creëert, configureert en verzendt met hubdispo.be",
              category: "getting-started",
              type: "video",
              duration: "8:32",
              difficulty: "Beginner",
              views: "3.2k",
              rating: 4.9,
              thumbnail: "video-thumbnail-1.jpg",
              tags: ["setup", "basics", "tutorial"]
            },
            {
              id: 2,
              title: "Kosten Optimaliseren met Consolidatie",
              description: "Geavanceerde strategieën om besparingen te maximaliseren via micro-consolidatie",
              category: "logistics",
              type: "written",
              readTime: "12 min",
              difficulty: "Gemiddeld",
              views: "2.1k",
              rating: 4.7,
              tags: ["consolidatie", "kosten", "optimalisatie"]
            },
            {
              id: 3,
              title: "Douanedocumenten: AI Assistent Gids",
              description: "Hoe onze AI-assistent te gebruiken voor geautomatiseerde douanedocumentgeneratie",
              category: "customs",
              type: "interactive",
              duration: "Interactief",
              difficulty: "Beginner",
              views: "1.8k",
              rating: 4.8,
              tags: ["douane", "AI", "automatisering"]
            },
            {
              id: 4,
              title: "API Integratie: Complete Setup",
              description: "Integreer hubdispo.be in uw bestaande systemen",
              category: "advanced",
              type: "written",
              readTime: "25 min",
              difficulty: "Geavanceerd",
              views: "892",
              rating: 4.6,
              tags: ["API", "integratie", "ontwikkeling"]
            },
            {
              id: 5,
              title: "Meerdere Bestemmingen Beheren",
              description: "Efficiënt zendingen naar meerdere Europese landen afhandelen",
              category: "logistics",
              type: "video",
              duration: "6:45",
              difficulty: "Gemiddeld",
              views: "1.5k",
              rating: 4.5,
              tags: ["multi-bestemming", "Europa", "efficiëntie"]
            },
            {
              id: 6,
              title: "Probleemoplossing Veelvoorkomende Problemen",
              description: "Oplossingen voor de meest voorkomende problemen",
              category: "getting-started",
              type: "written",
              readTime: "8 min",
              difficulty: "Beginner",
              views: "2.3k",
              rating: 4.4,
              tags: ["probleemoplossing", "ondersteuning", "FAQ"]
            }
          ]
        };
      default: // fr
        return {
          title: "Guides",
          subtitle: "Guides étape par étape et tutoriels vidéo",
          categories: [
            { id: "all", name: "Toutes catégories", icon: BookOpen },
            { id: "getting-started", name: "Démarrage", icon: BookOpen },
            { id: "logistics", name: "Logistique", icon: Truck },
            { id: "customs", name: "Douane", icon: Shield },
            { id: "advanced", name: "Avancé", icon: Settings }
          ],
          types: [
            { id: "all", name: "Tous types" },
            { id: "written", name: "Guides écrits" },
            { id: "video", name: "Tutoriels vidéo" },
            { id: "interactive", name: "Guides interactifs" }
          ],
          guides: [
            {
              id: 1,
              title: "Votre Premier Envoi - Procédure Complète",
              description: "Apprenez à créer, configurer et envoyer votre premier colis avec hubdispo.be",
              category: "getting-started",
              type: "video",
              duration: "8:32",
              difficulty: "Débutant",
              views: "3.2k",
              rating: 4.9,
              thumbnail: "video-thumbnail-1.jpg",
              tags: ["configuration", "bases", "tutoriel"],
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            },
            {
              id: 2,
              title: "Optimiser les Coûts avec la Consolidation",
              description: "Stratégies avancées pour maximiser les économies via micro-consolidation",
              category: "logistics",
              type: "written",
              readTime: "12 min",
              difficulty: "Intermédiaire",
              views: "2.1k",
              rating: 4.7,
              tags: ["consolidation", "coûts", "optimisation"]
            },
            {
              id: 3,
              title: "Documents Douaniers : Guide Assistant IA",
              description: "Comment utiliser notre assistant IA pour la génération automatique de documents douaniers",
              category: "customs",
              type: "interactive",
              duration: "Interactif",
              difficulty: "Débutant",
              views: "1.8k",
              rating: 4.8,
              tags: ["douane", "IA", "automatisation"]
            },
            {
              id: 4,
              title: "Intégration API : Configuration Complète",
              description: "Intégrez hubdispo.be dans vos systèmes existants",
              category: "advanced",
              type: "written",
              readTime: "25 min",
              difficulty: "Avancé",
              views: "892",
              rating: 4.6,
              tags: ["API", "intégration", "développement"]
            },
            {
              id: 5,
              title: "Gérer Plusieurs Destinations",
              description: "Gérer efficacement les envois vers plusieurs pays européens",
              category: "logistics",
              type: "video",
              duration: "6:45",
              difficulty: "Intermédiaire",
              views: "1.5k",
              rating: 4.5,
              tags: ["multi-destinations", "Europe", "efficacité"],
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            },
            {
              id: 6,
              title: "Résolution des Problèmes Courants",
              description: "Solutions aux problèmes les plus fréquemment rencontrés",
              category: "getting-started",
              type: "written",
              readTime: "8 min",
              difficulty: "Débutant",
              views: "2.3k",
              rating: 4.4,
              tags: ["dépannage", "support", "FAQ"]
            }
          ]
        };
    }
  };

  const content = getContent();

  const filteredGuides = content.guides.filter(guide => {
    const matchesSearch = searchQuery === "" || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || guide.category === selectedCategory;
    const matchesType = selectedType === "all" || guide.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
      case "Débutant":
        return "bg-green-100 text-green-700";
      case "Intermediate":
      case "Intermédiaire":
      case "Gemiddeld":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
      case "Avancé":
      case "Geavanceerd":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />;
      case "written":
        return <BookOpen className="h-4 w-4" />;
      case "interactive":
        return <Globe className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getVideoThumbnail = (guideId: number) => {
    switch (guideId) {
      case 1:
        return "https://images.unsplash.com/photo-1659353740176-ab1d8f8c6c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBzaGlwcGluZyUyMHBhY2thZ2UlMjB0dXRvcmlhbHxlbnwxfHx8fDE3NTkzMjc4NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral";
      case 5:
        return "https://images.unsplash.com/photo-1672552226669-f6c3041972ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBjb25zb2xpZGF0aW9uJTIwbG9naXN0aWNzfGVufDF8fHx8MTc1OTMyNzg4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral";
      default:
        return "https://images.unsplash.com/photo-1586528243235-c6e6c4a4ccbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21zJTIwZG9jdW1lbnRzJTIwc2hpcHBpbmd8ZW58MXx8fHwxNzU5MzI3ODgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral";
    }
  };

  const getVideoSteps = (guideId: number) => {
    switch (guideId) {
      case 1:
        return [
          { time: "0:00", title: "Introduction à HubDispo", description: "Découvrez la plateforme" },
          { time: "1:30", title: "Créer votre compte", description: "Configuration initiale" },
          { time: "3:00", title: "Nouveau envoi", description: "Formulaire de création" },
          { time: "5:15", title: "Documents douaniers", description: "Assistant IA automatique" },
          { time: "7:00", title: "Validation et envoi", description: "Finalisation de l'envoi" }
        ];
      case 5:
        return [
          { time: "0:00", title: "Stratégie multi-destinations", description: "Planification optimale" },
          { time: "2:00", title: "Groupage intelligent", description: "Consolidation par pays" },
          { time: "4:30", title: "Économies réalisées", description: "Calcul des bénéfices" },
          { time: "6:00", title: "Suivi coordonné", description: "Gestion centralisée" }
        ];
      default:
        return [
          { time: "0:00", title: "Introduction", description: "Aperçu général" },
          { time: "2:00", title: "Étapes principales", description: "Guide détaillé" },
          { time: "4:00", title: "Conseils pratiques", description: "Optimisation" }
        ];
    }
  };

  const getVideoSlides = (guideId: number) => {
    switch (guideId) {
      case 1: // Premier Envoi
        return [
          {
            title: "Bienvenue sur HubDispo.be",
            subtitle: "Votre plateforme logistique intelligente",
            content: "Découvrez comment créer votre premier envoi international en quelques clics avec notre système de micro-consolidation.",
            image: "logistics workspace"
          },
          {
            title: "Étape 1: Vos Produits",
            subtitle: "Ajout et description des articles",
            content: "• Code HS automatique par IA\n• Poids et dimensions précises\n• Valeur déclarée\n• Pays d'origine\n• Classification douanière",
            image: "package preparation"
          },
          {
            title: "Étape 2: Destination", 
            subtitle: "Configuration de livraison",
            content: "• Sélection pays UE/International\n• Adresse destinataire complète\n• Options de livraison express/standard\n• Délais souhaités\n• Assurance optionnelle",
            image: "european map"
          },
          {
            title: "Étape 3: Micro-Consolidation",
            subtitle: "Optimisation automatique des coûts",
            content: "• Groupage intelligent avec autres PME\n• Sélection transporteur optimal\n• Économies jusqu'à 40%\n• Respect strict des délais\n• Traçabilité individuelle",
            image: "warehouse logistics"
          },
          {
            title: "Documents Douaniers Automatiques",
            subtitle: "Intelligence artificielle douanière",
            content: "• Facture commerciale automatique\n• EUR.1 si applicable\n• Déclaration douanière complète\n• Étiquetage conforme\n• Validation pré-expédition",
            image: "business documents"
          },
          {
            title: "Suivi Temps Réel & Livraison",
            subtitle: "Visibilité complète de bout en bout",
            content: "• Notifications SMS/Email automatiques\n• Tracking GPS en temps réel\n• Alertes proactives de retard\n• Confirmation de livraison\n• Satisfaction client mesurée",
            image: "tracking dashboard"
          }
        ];
      case 5: // Multi-destinations
        return [
          {
            title: "Gestion Multi-Destinations",
            subtitle: "Export européen optimisé pour PME",
            content: "Maximisez l'efficacité de vos envois vers plusieurs pays européens avec notre plateforme de consolidation intelligente.",
            image: "international shipping"
          },
          {
            title: "Planification Stratégique",
            subtitle: "Intelligence logistique avancée",
            content: "• Analyse volumes par destination\n• Calendrier optimal d'expédition\n• Regroupement intelligent par zone\n• Prévisions coûts précises\n• ROI calculé automatiquement",
            image: "business planning"
          },
          {
            title: "Consolidation par Zone UE",
            subtitle: "Économies d'échelle maximales",
            content: "• Hub Europe du Nord (Allemagne, Pays-Bas)\n• Hub Europe du Sud (France, Espagne)\n• Livraisons coordonnées\n• Réduction coûts jusqu'à 45%\n• Délais optimisés",
            image: "european warehouse"
          },
          {
            title: "Tableau de Bord Unifié",
            subtitle: "Contrôle total de vos opérations",
            content: "• Vue d'ensemble temps réel\n• Statuts détaillés par destination\n• Alertes prioritaires automatiques\n• Reporting financier complet\n• KPIs performance logistique",
            image: "control dashboard"
          }
        ];
      default:
        return [
          {
            title: "Guide HubDispo",
            subtitle: "Formation professionnelle",
            content: "Apprenez à maîtriser tous les aspects de votre plateforme logistique intelligente",
            image: "business training"
          }
        ];
    }
  };

  const getSlideImage = (imageKey: string) => {
    const imageMap = {
      "logistics workspace": "https://images.unsplash.com/photo-1601912552080-0fb89fd08042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU5MzI5NDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral",
      "package preparation": "https://images.unsplash.com/photo-1606295835125-2338079fdfc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWNrYWdlJTIwcHJlcGFyYXRpb258ZW58MXx8fHwxNzU5MzI5NDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral",
      "european map": "https://images.unsplash.com/photo-1589262804704-c5aa9e6def89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGVhbiUyMG1hcHxlbnwxfHx8fDE3NTkzMjk0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral",
      "warehouse logistics": "https://images.unsplash.com/photo-1644079446600-219068676743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzU5MzIyNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral",
      "business documents": "https://images.unsplash.com/photo-1521791055366-0d553872125f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRvY3VtZW50c3xlbnwxfHx8fDE3NTkzMjk0OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral",
      "tracking dashboard": "https://images.unsplash.com/photo-1758411898049-4de9588be514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFja2luZyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTkzMjk0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral",
      "international shipping": "https://images.unsplash.com/photo-1644079446600-219068676743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzU5MzIyNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral",
      "business planning": "https://images.unsplash.com/photo-1521791055366-0d553872125f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRvY3VtZW50c3xlbnwxfHx8fDE3NTkzMjk0OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral",
      "european warehouse": "https://images.unsplash.com/photo-1644079446600-219068676743?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzU5MzIyNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral",
      "control dashboard": "https://images.unsplash.com/photo-1758411898049-4de9588be514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFja2luZyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTkzMjk0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral",
      "business training": "https://images.unsplash.com/photo-1601912552080-0fb89fd08042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU5MzI5NDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=HubDispo&utm_medium=referral"
    };
    return imageMap[imageKey] || imageMap["logistics workspace"];
  };

  const handleGuideClick = (guide: any) => {
    if (guide.type === 'video') {
      // Simulation de tutoriel vidéo HubDispo avec slides réalistes
      const slides = getVideoSlides(guide.id);
        
      const guideWithVideo = {
        ...guide,
        videoUrl: null, // Simulation avec slides
        thumbnail: getVideoThumbnail(guide.id),
        steps: getVideoSteps(guide.id),
        slides
      };
      setSelectedGuide(guideWithVideo);
      setTotalTime(guide.duration);
      setIsVideoPlaying(false);
      setVideoProgress(0);
      setCurrentTime("0:00");
      setVideoError(null);
      setVideoLoaded(true); // Simulation donc toujours "chargé"
      setCurrentSlide(0);
      setIsSimulatedVideo(true);
      
      // Clear any existing interval
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
      
      console.log('Opening simulated video tutorial for guide:', guide.id, 'with', slides.length, 'slides');
    } else if (guide.type === 'interactive') {
      // Simuler l'ouverture d'un guide interactif
      alert(`Ouverture du guide interactif: ${guide.title}\n\nCe guide vous permettra d'apprendre de manière interactive avec des exercices pratiques.`);
    } else {
      // Simuler l'ouverture d'un guide écrit
      alert(`Ouverture du guide: ${guide.title}\n\nCe guide détaillé vous expliquera toutes les étapes nécessaires.`);
    }
  };

  const toggleVideoPlay = async () => {
    if (isSimulatedVideo) {
      // Simulation de lecture pour les tutoriels HubDispo
      if (!isVideoPlaying) {
        console.log('Starting simulated video playback...');
        setIsVideoPlaying(true);
        
        // Calculer la durée totale en secondes
        const totalSeconds = parseInt(totalTime.split(':')[0]) * 60 + parseInt(totalTime.split(':')[1]);
        const slideDuration = totalSeconds / (selectedGuide?.slides?.length || 1);
        
        // Démarrer la simulation
        simulationIntervalRef.current = setInterval(() => {
          setVideoProgress(prev => {
            if (prev >= 100) {
              setIsVideoPlaying(false);
              if (simulationIntervalRef.current) {
                clearInterval(simulationIntervalRef.current);
              }
              return 100;
            }
            return prev + (100 / (totalSeconds * 4)); // 4 updates par seconde
          });
          
          setCurrentTime(prev => {
            const current = parseInt(prev.split(':')[0]) * 60 + parseInt(prev.split(':')[1]);
            if (current >= totalSeconds) return prev;
            
            const newCurrent = current + 0.25; // 0.25 seconde par update
            const minutes = Math.floor(newCurrent / 60);
            const seconds = Math.floor(newCurrent % 60);
            
            // Changer de slide en fonction du temps
            const newSlide = Math.floor(newCurrent / slideDuration);
            if (newSlide !== currentSlide && newSlide < (selectedGuide?.slides?.length || 0)) {
              setCurrentSlide(newSlide);
            }
            
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
          });
        }, 250);
      } else {
        console.log('Pausing simulated video...');
        setIsVideoPlaying(false);
        if (simulationIntervalRef.current) {
          clearInterval(simulationIntervalRef.current);
        }
      }
      return;
    }

    // Code original pour vraies vidéos (gardé en fallback)
    console.log('Toggle video play clicked', { 
      videoRef: videoRef.current, 
      paused: videoRef.current?.paused,
      videoUrl: selectedGuide?.videoUrl 
    });
    
    if (!videoRef.current) {
      console.error('Video reference not found');
      return;
    }

    try {
      if (videoRef.current.paused) {
        console.log('Attempting to play video...');
        await videoRef.current.play();
        console.log('Video play successful');
      } else {
        console.log('Pausing video...');
        videoRef.current.pause();
        console.log('Video paused');
      }
    } catch (error) {
      console.error('Video play/pause error:', error);
      if (error.name === 'NotAllowedError') {
        try {
          videoRef.current.muted = true;
          setIsMuted(true);
          await videoRef.current.play();
          console.log('Video played with mute');
        } catch (mutedError) {
          console.error('Even muted play failed:', mutedError);
        }
      }
    }
  };

  const skipVideo = (seconds: number) => {
    if (isSimulatedVideo) {
      const current = parseInt(currentTime.split(':')[0]) * 60 + parseInt(currentTime.split(':')[1]);
      const total = parseInt(totalTime.split(':')[0]) * 60 + parseInt(totalTime.split(':')[1]);
      const newCurrent = Math.max(0, Math.min(total, current + seconds));
      
      const minutes = Math.floor(newCurrent / 60);
      const secondsRemainder = Math.floor(newCurrent % 60);
      setCurrentTime(`${minutes}:${secondsRemainder.toString().padStart(2, '0')}`);
      setVideoProgress((newCurrent / total) * 100);
      
      // Mettre à jour la slide
      const slideDuration = total / (selectedGuide?.slides?.length || 1);
      const newSlide = Math.floor(newCurrent / slideDuration);
      if (newSlide < (selectedGuide?.slides?.length || 0)) {
        setCurrentSlide(newSlide);
      }
      return;
    }

    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration, videoRef.current.currentTime + seconds));
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      
      if (duration && !isNaN(duration)) {
        const progress = (current / duration) * 100;
        setVideoProgress(progress);
        
        const minutes = Math.floor(current / 60);
        const seconds = Math.floor(current % 60);
        setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    }
  };

  const handleVideoLoadedMetadata = () => {
    console.log('Video metadata loaded');
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      console.log('Video duration:', duration);
      if (!isNaN(duration)) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        setTotalTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    }
  };

  const handleVideoPlay = () => {
    console.log('Video play event');
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    console.log('Video pause event');
    setIsVideoPlaying(false);
  };

  const handleVideoEnded = () => {
    console.log('Video ended event');
    setIsVideoPlaying(false);
    setVideoProgress(100);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const error = e.currentTarget.error;
    console.error('Video error:', error);
    setVideoError(error?.message || 'Erreur de chargement vidéo');
    setVideoLoaded(false);
  };

  const handleVideoCanPlay = () => {
    console.log('Video can play');
    setVideoLoaded(true);
    setVideoError(null);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const closeVideoModal = () => {
    // Nettoyer la simulation
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current);
      simulationIntervalRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    
    setSelectedGuide(null);
    setIsVideoPlaying(false);
    setVideoProgress(0);
    setCurrentTime("0:00");
    setIsMuted(false);
    setVideoError(null);
    setVideoLoaded(false);
    setCurrentSlide(0);
    setIsSimulatedVideo(false);
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
              <BookOpen className="h-6 w-6 text-[#10B981]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
              <p className="text-gray-600">{content.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Rechercher un guide..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4"
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {content.categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <category.icon className="h-4 w-4" />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {content.types.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#1E40AF]">{content.guides.length}</div>
              <div className="text-sm text-gray-600">Guides disponibles</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#10B981]">
                {content.guides.filter(g => g.type === 'video').length}
              </div>
              <div className="text-sm text-gray-600">Tutoriels vidéo</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#2563EB]">
                {content.guides.reduce((sum, g) => sum + parseFloat(g.views.replace('k', '')), 0).toFixed(1)}k
              </div>
              <div className="text-sm text-gray-600">Vues totales</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">
                {(content.guides.reduce((sum, g) => sum + g.rating, 0) / content.guides.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Note moyenne</div>
            </CardContent>
          </Card>
        </div>

        {/* Guides Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleGuideClick(guide)}>
              <CardContent className="p-0">
                {guide.type === 'video' && (
                  <div 
                    className="relative h-48 rounded-t-lg overflow-hidden bg-cover bg-center flex items-center justify-center"
                    style={{ 
                      backgroundImage: `url(${getVideoThumbnail(guide.id)})`,
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                    <div className="relative z-10 text-center text-white">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 group-hover:bg-white/30 transition-colors">
                        <Play className="h-8 w-8 ml-1" />
                      </div>
                      <div className="mt-3 bg-black/60 backdrop-blur-sm rounded px-2 py-1 text-sm font-medium">
                        Tutoriel vidéo
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                      🔴 LIVE
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                      {guide.duration}
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(guide.type)}
                      <Badge className={getDifficultyColor(guide.difficulty)}>
                        {guide.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {guide.rating}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1E40AF] transition-colors">
                    {guide.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {guide.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {guide.readTime || guide.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {guide.views}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#1E40AF] transition-colors" />
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {guide.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Aucun guide trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche ou filtres
            </p>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      <Dialog open={!!selectedGuide} onOpenChange={closeVideoModal}>
        <DialogContent className="max-w-4xl w-full p-0">
          <div className="bg-black relative rounded-lg overflow-hidden">
            {selectedGuide && (
              <>
                {/* Video Player - Simulation HubDispo */}
                <div className="relative aspect-video bg-gradient-to-br from-[#1E40AF] to-[#2563EB] overflow-hidden">
                  {isSimulatedVideo && selectedGuide.slides ? (
                    // Système de slides professionnelles
                    <div className="relative w-full h-full">
                      {selectedGuide.slides.map((slide: any, index: number) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <div 
                            className="relative w-full h-full bg-cover bg-center"
                            style={{ 
                              backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.85), rgba(37, 99, 235, 0.85)), url(${getSlideImage(slide.image)})` 
                            }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                              <div className="max-w-4xl text-center text-white">
                                {/* Logo HubDispo */}
                                <div className="mb-8">
                                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
                                    <Package className="h-8 w-8 text-white" />
                                  </div>
                                  <p className="text-sm opacity-90">hubdispo.be</p>
                                </div>

                                {/* Contenu de la slide */}
                                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                                  <h2 className="text-3xl font-bold mb-3">{slide.title}</h2>
                                  <p className="text-xl mb-6 text-blue-100">{slide.subtitle}</p>
                                  <div className="text-left max-w-2xl mx-auto">
                                    {slide.content.split('\n').map((line: string, lineIndex: number) => (
                                      <p key={lineIndex} className="text-lg mb-2 leading-relaxed">
                                        {line}
                                      </p>
                                    ))}
                                  </div>
                                </div>

                                {/* Indicateur de progression */}
                                <div className="mt-8 flex justify-center space-x-2">
                                  {selectedGuide.slides.map((_: any, dotIndex: number) => (
                                    <div
                                      key={dotIndex}
                                      className={`w-2 h-2 rounded-full transition-all ${
                                        dotIndex === currentSlide 
                                          ? 'bg-white scale-125' 
                                          : 'bg-white/50'
                                      }`}
                                    />
                                  ))}
                                </div>

                                {/* Numéro de slide */}
                                <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1 text-sm">
                                  {currentSlide + 1} / {selectedGuide.slides.length}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Fallback pour vraies vidéos (si nécessaire)
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      poster={selectedGuide.thumbnail}
                      onTimeUpdate={handleVideoTimeUpdate}
                      onLoadedMetadata={handleVideoLoadedMetadata}
                      onCanPlay={handleVideoCanPlay}
                      onPlay={handleVideoPlay}
                      onPause={handleVideoPause}
                      onEnded={handleVideoEnded}
                      onError={handleVideoError}
                      preload="metadata"
                      playsInline
                      controls={false}
                    >
                      <source src={selectedGuide.videoUrl} type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                  )}
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-4">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-white hover:bg-white/20 transition-colors"
                        onClick={(e) => { e.stopPropagation(); skipVideo(-10); }}
                        title="Reculer de 10 secondes"
                      >
                        <SkipBack className="h-6 w-6" />
                      </Button>
                      
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-white hover:bg-white/20 w-16 h-16 bg-black/30 backdrop-blur-sm border border-white/20 transition-all hover:scale-105 active:scale-95"
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          console.log('Play button clicked', {
                            videoRef: !!videoRef.current,
                            videoSrc: videoRef.current?.src,
                            videoError: videoError,
                            videoLoaded: videoLoaded
                          });
                          toggleVideoPlay(); 
                        }}
                        title={isVideoPlaying ? "Pause" : "Lecture"}
                      >
                        {isVideoPlaying ? 
                          <Pause className="h-8 w-8" /> : 
                          <Play className="h-8 w-8 ml-1" />
                        }
                      </Button>
                      
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-white hover:bg-white/20 transition-colors"
                        onClick={(e) => { e.stopPropagation(); skipVideo(10); }}
                        title="Avancer de 10 secondes"
                      >
                        <SkipForward className="h-6 w-6" />
                      </Button>
                    </div>
                    
                    {/* Video Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                        <h4 className="text-white font-semibold text-sm">{selectedGuide.title}</h4>
                        <p className="text-white/80 text-xs mt-1">
                          {selectedGuide.steps?.find((step: any) => {
                            const stepSeconds = parseInt(step.time.split(':')[0]) * 60 + parseInt(step.time.split(':')[1]);
                            const currentSeconds = parseInt(currentTime.split(':')[0]) * 60 + parseInt(currentTime.split(':')[1]);
                            return stepSeconds <= currentSeconds;
                          })?.title || "Introduction"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Close Button */}
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute top-4 right-4 text-white hover:bg-white/20"
                    onClick={closeVideoModal}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Video Progress Bar */}
                <div className="bg-black p-4">
                  <div className="flex items-center gap-4 text-white">
                    <span className="text-sm font-mono">{currentTime}</span>
                    <div className="flex-1 group">
                      <div 
                        className="h-2 bg-gray-700 rounded-full cursor-pointer relative overflow-hidden"
                        onClick={handleProgressClick}
                      >
                        <div 
                          className="h-full bg-[#1E40AF] transition-all duration-150"
                          style={{ width: `${videoProgress}%` }}
                        />
                        <div 
                          className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ left: `${videoProgress}%`, marginLeft: '-6px' }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-mono">{totalTime}</span>
                    
                    {/* Volume Control */}
                    <div className="flex items-center gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-white hover:bg-white/20"
                        onClick={toggleMute}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <div className="w-16 h-1 bg-gray-700 rounded-full hidden lg:block">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                          className="w-full h-full appearance-none bg-transparent cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #1E40AF 0%, #1E40AF ${(isMuted ? 0 : volume) * 100}%, #4b5563 ${(isMuted ? 0 : volume) * 100}%, #4b5563 100%)`
                          }}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="text-white hover:bg-white/20"
                      onClick={() => videoRef.current?.requestFullscreen?.()}
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                    
                    {/* Debug: Enable native controls button */}
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="text-white hover:bg-white/20"
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.controls = !videoRef.current.controls;
                          console.log('Native controls toggled:', videoRef.current.controls);
                        }
                      }}
                      title="Activer/désactiver les contrôles natifs"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Video Info */}
                <div className="bg-white">
                  {/* Header Info */}
                  <div className="p-6 border-b">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {selectedGuide.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {selectedGuide.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 ml-4">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {selectedGuide.rating}
                        <span className="mx-2">•</span>
                        <Users className="h-4 w-4" />
                        {selectedGuide.views}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {selectedGuide.tags?.map((tag: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span><strong>Niveau:</strong> {selectedGuide.difficulty}</span>
                        <span><strong>Durée:</strong> {selectedGuide.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Steps/Chapters */}
                  {selectedGuide.steps && (
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Chapitres du tutoriel
                      </h4>
                      <div className="space-y-3">
                        {selectedGuide.steps.map((step: any, index: number) => {
                          const stepSeconds = parseInt(step.time.split(':')[0]) * 60 + parseInt(step.time.split(':')[1]);
                          const currentSeconds = parseInt(currentTime.split(':')[0]) * 60 + parseInt(currentTime.split(':')[1]);
                          const isActive = stepSeconds <= currentSeconds && 
                            (index === selectedGuide.steps.length - 1 || 
                             currentSeconds < parseInt(selectedGuide.steps[index + 1].time.split(':')[0]) * 60 + 
                             parseInt(selectedGuide.steps[index + 1].time.split(':')[1]));
                          
                          return (
                            <div 
                              key={index}
                              className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer hover:bg-gray-50 ${
                                isActive ? 'border-[#1E40AF] bg-blue-50' : 'border-gray-200'
                              }`}
                              onClick={() => {
                                if (isSimulatedVideo) {
                                  const minutes = Math.floor(stepSeconds / 60);
                                  const seconds = stepSeconds % 60;
                                  setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
                                  const total = parseInt(totalTime.split(':')[0]) * 60 + parseInt(totalTime.split(':')[1]);
                                  setVideoProgress((stepSeconds / total) * 100);
                                  
                                  // Mettre à jour la slide
                                  const slideDuration = total / (selectedGuide?.slides?.length || 1);
                                  const newSlide = Math.floor(stepSeconds / slideDuration);
                                  if (newSlide < (selectedGuide?.slides?.length || 0)) {
                                    setCurrentSlide(newSlide);
                                  }
                                } else if (videoRef.current) {
                                  videoRef.current.currentTime = stepSeconds;
                                }
                              }}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                                isActive ? 'bg-[#1E40AF] text-white' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <p className={`font-medium text-sm ${
                                    isActive ? 'text-[#1E40AF]' : 'text-gray-900'
                                  }`}>
                                    {step.title}
                                  </p>
                                  <Badge variant="outline" className="text-xs">
                                    {step.time}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600">{step.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}