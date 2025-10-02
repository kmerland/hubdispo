// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from "react";
import { ArrowRight, Shield, Clock, Globe, Package, Truck, CheckCircle, Star, Users, Award, Leaf, Calculator, Zap, Euro, TrendingUp, MapPin, Building2, Play, ExternalLink, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import LanguageSelector from "./LanguageSelector";
import { ButtonLoading } from "./LoadingStates";

interface EnhancedHomepageProps {
  onNavigate: (view: string) => void;
}

export default function EnhancedHomepage({ onNavigate }: EnhancedHomepageProps) {
  const [email, setEmail] = useState("");
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);
  const [liveStats, setLiveStats] = useState({
    activeShipments: 1247,
    savedAmount: 89456,
    co2Saved: 12.4,
    companiesServed: 342
  });
  
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();

  // Animation des statistiques en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        activeShipments: prev.activeShipments + Math.floor(Math.random() * 3),
        savedAmount: prev.savedAmount + Math.floor(Math.random() * 50),
        co2Saved: prev.co2Saved + Math.random() * 0.1
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmittingNewsletter(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmittingNewsletter(false);
    setEmail("");
    alert("Merci ! Vous recevrez nos actualités logistiques chaque semaine.");
  };

  // Fonctionnalités principales avec données réalistes belges
  const keyFeatures = [
    {
      icon: Package,
      title: t('home.feature_consolidation'),
      description: t('home.feature_consolidation_desc'),
      stats: "Jusqu'à 45% d'économies",
      color: "text-[#1E40AF]",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Shield,
      title: t('home.feature_customs'),
      description: t('home.feature_customs_desc'),
      stats: "99.1% de précision",
      color: "text-[#10B981]",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Clock,
      title: t('home.feature_tracking'),
      description: t('home.feature_tracking_desc'),
      stats: "Mis à jour toutes les 30min",
      color: "text-orange-500",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: Calculator,
      title: t('home.feature_pricing'),
      description: t('home.feature_pricing_desc'),
      stats: "Aucun frais caché",
      color: "text-purple-500",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  // Statistiques en temps réel
  const realTimeStats = [
    {
      label: "Envois actifs aujourd'hui",
      value: liveStats.activeShipments.toLocaleString('fr-BE'),
      icon: Package,
      color: "text-blue-600",
      change: "+12% vs hier"
    },
    {
      label: "Économisé par nos clients",
      value: `€${liveStats.savedAmount.toLocaleString('fr-BE')}`,
      icon: Euro,
      color: "text-green-600",
      change: "Ce mois"
    },
    {
      label: "CO₂ évité (tonnes)",
      value: liveStats.co2Saved.toFixed(1),
      icon: Leaf,
      color: "text-green-500",
      change: "Impact positif"
    },
    {
      label: "PME belges utilisatrices",
      value: liveStats.companiesServed.toString(),
      icon: Building2,
      color: "text-purple-600",
      change: "+8 cette semaine"
    }
  ];

  // Témoignages réalistes d'entreprises belges
  const testimonials = [
    {
      name: "Sophie Vandenabeele",
      company: "Chocolaterie Artisanale SPRL",
      location: "Bruges",
      avatar: "SV",
      rating: 5,
      text: "HubDispo nous fait économiser 40% sur nos exports vers l'Allemagne. La douane automatique est parfaite pour nos chocolats.",
      savings: "€2,400/mois",
      shipments: "23 envois"
    },
    {
      name: "Marc Dupont",
      company: "TechComponents SA",
      location: "Louvain-la-Neuve", 
      avatar: "MD",
      rating: 5,
      text: "Consolidation intelligente et suivi GPS impeccable. Nos clients français reçoivent plus vite qu'avant.",
      savings: "€1,800/mois",
      shipments: "31 envois"
    },
    {
      name: "Anna Peeters",
      company: "BioCosmetics Belgium",
      location: "Gand",
      avatar: "AP",
      rating: 5,
      text: "Interface intuitive, tarifs transparents. Le DAU automatique nous fait gagner 3h par semaine.",
      savings: "€980/mois",
      shipments: "18 envois"
    }
  ];

  // Destinations populaires depuis la Belgique
  const popularDestinations = [
    { country: "Allemagne", flag: "🇩🇪", routes: ["Hamburg", "Cologne", "Munich"], demand: 32, leadTime: "2j" },
    { country: "France", flag: "🇫🇷", routes: ["Lyon", "Lille", "Marseille"], demand: 27, leadTime: "1j" },
    { country: "Pays-Bas", flag: "🇳🇱", routes: ["Rotterdam", "Amsterdam", "Utrecht"], demand: 20, leadTime: "1j" },
    { country: "Italie", flag: "🇮🇹", routes: ["Milan", "Rome", "Turin"], demand: 14, leadTime: "3j" },
    { country: "Espagne", flag: "🇪🇸", routes: ["Barcelona", "Madrid", "Valencia"], demand: 7, leadTime: "3j" }
  ];

  // Processus simplifié
  const processSteps = [
    {
      step: 1,
      title: t('home.step1_title'),
      description: t('home.step1_desc'),
      icon: Package,
      duration: "2 min"
    },
    {
      step: 2,
      title: t('home.step2_title'),
      description: t('home.step2_desc'),
      icon: Zap,
      duration: "Instantané"
    },
    {
      step: 3,
      title: t('home.step3_title'),
      description: t('home.step3_desc'),
      icon: Shield,
      duration: "30 sec"
    },
    {
      step: 4,
      title: "Enlèvement & livraison",
      description: "Enlèvement à votre adresse, suivi GPS temps réel jusqu'à destination",
      icon: Truck,
      duration: "1-5 jours"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header avec navigation simple */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-[#1E40AF]" />
              <span className="text-2xl font-bold text-gray-900">hubdispo.be</span>
              <Badge className="bg-[#10B981] text-white">
                Version 2.0
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Bonjour, {user?.firstName}
                  </span>
                  <Button onClick={() => onNavigate("dashboard")}>
                    Tableau de bord
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={() => onNavigate("login")}>
                    Se connecter
                  </Button>
                  <Button onClick={() => onNavigate("register")} className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                    Essai gratuit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section avec statistiques live */}
      <section className="bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#3B82F6] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white border-white/20 mb-6">
                {t('home.platform_badge')}
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('home.hero_title_1')}
                <span className="block text-[#10B981]">{t('home.hero_title_2')}</span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {t('home.hero_subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                {isAuthenticated ? (
                  <Button 
                    size="lg" 
                    onClick={() => onNavigate("new-shipment")}
                    className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-xl"
                  >
                    <Package className="h-5 w-5 mr-2" />
                    {t('dashboard.new_shipment')}
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    onClick={() => onNavigate("register")}
                    className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-xl"
                  >
                    <ArrowRight className="h-5 w-5 mr-2" />
                    {t('home.cta_start_free')}
                  </Button>
                )}
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => onNavigate("demo-scheduler")}
                  className="border-white text-white hover:bg-white hover:text-[#1E40AF] shadow-xl"
                >
                  <Play className="h-5 w-5 mr-2" />
                  {t('home.cta_see_demo')}
                </Button>
              </div>
              
              {/* Garanties */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#10B981]" />
                  <span>{t('home.feature_setup')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#10B981]" />
                  <span>Conformité RGPD belge</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#10B981]" />
                  <span>{t('home.feature_support_fr')}</span>
                </div>
              </div>
            </div>
            
            {/* Statistiques live */}
            <div className="grid grid-cols-2 gap-6">
              {realTimeStats.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <stat.icon className={`h-6 w-6 ${stat.color.replace('text-', 'text-white')}`} />
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-blue-100 text-sm mb-2">{stat.label}</p>
                    <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                      {stat.change}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnalités principales */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Une plateforme complète pour vos exports
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Toutes les fonctionnalités dont une PME belge a besoin pour exporter efficacement vers l'Europe
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="border-l-4 border-l-[#1E40AF] hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <Badge className={`${feature.color} bg-opacity-10 border-none`}>
                        {feature.stats}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations populaires */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Destinations les plus populaires
            </h2>
            <p className="text-xl text-gray-600">
              Depuis la Belgique vers toute l'Europe avec consolidation intelligente
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            {popularDestinations.map((dest, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">
                    {dest.flag}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {dest.country}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Demande: {dest.demand}%</p>
                    <p>Délai: {dest.leadTime}</p>
                    <div className="pt-2">
                      {dest.routes.slice(0, 2).map((city, idx) => (
                        <Badge key={idx} variant="secondary" className="mr-1 mb-1 text-xs">
                          {city}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Progress value={dest.demand} className="h-2 mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Processus simplifié */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              4 étapes simples pour envoyer vos produits partout en Europe
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-[#1E40AF] rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">
                      {step.step}
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl mb-6 inline-block">
                      <step.icon className="h-8 w-8 text-[#1E40AF]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <Badge className="bg-[#10B981] text-white">
                      {step.duration}
                    </Badge>
                  </CardContent>
                </Card>
                
                {/* Flèche de connexion */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-[#1E40AF]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600">
              PME belges qui font confiance à HubDispo pour leurs exports
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#1E40AF] rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 italic mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <Badge className="bg-green-100 text-green-700">
                      Économies: {testimonial.savings}
                    </Badge>
                    <Badge variant="secondary">
                      {testimonial.shipments}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter et CTA final */}
      <section className="py-20 bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Prêt à révolutionner vos exports ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez les 342+ PME belges qui économisent avec HubDispo
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={() => onNavigate("register")}
                className="bg-[#10B981] hover:bg-[#10B981]/90 text-white shadow-xl"
              >
                <Package className="h-5 w-5 mr-2" />
                Commencer gratuitement
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onNavigate("demo-scheduler")}
                className="border-white text-white hover:bg-white hover:text-[#1E40AF]"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Planifier une démo
              </Button>
            </div>
          )}
          
          <Separator className="my-12 bg-white/20" />
          
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4">
              Newsletter logistique belge
            </h3>
            <p className="text-blue-100 mb-6">
              Conseils exports, réglementation douanière, success stories
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="votre.email@entreprise.be"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
                required
              />
              <Button 
                type="submit" 
                disabled={isSubmittingNewsletter}
                className="bg-[#10B981] hover:bg-[#10B981]/90"
              >
                {isSubmittingNewsletter ? <ButtonLoading text="..." /> : "S'inscrire"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Package className="h-6 w-6 text-[#1E40AF]" />
              <span className="text-xl font-bold text-white">hubdispo.be</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <button onClick={() => onNavigate("terms")} className="hover:text-white transition-colors">
                Conditions
              </button>
              <button onClick={() => onNavigate("privacy")} className="hover:text-white transition-colors">
                Confidentialité
              </button>
              <button onClick={() => onNavigate("legal")} className="hover:text-white transition-colors">
                Mentions légales
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 HubDispo.be - Plateforme SaaS belge pour micro-consolidation logistique + automatisation douanière IA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}