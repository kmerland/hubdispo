// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ArrowLeft, MapPin, Clock, Euro, Users, Zap, Heart, Target, Coffee, Laptop, Car, Plane } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface CareersPageProps {
  onNavigate: (view: string) => void;
}

export default function CareersPage({ onNavigate }: CareersPageProps) {
  const openPositions = [
    {
      title: "Développeur Frontend Senior",
      department: "Technologie",
      location: "Bruxelles/Gand",
      type: "CDI",
      salary: "€55k - €75k",
      experience: "3-5 ans",
      urgent: true,
      description: "Rejoignez notre équipe pour développer l'interface utilisateur de notre plateforme SaaS révolutionnaire.",
      requirements: [
        "Maîtrise de React/TypeScript",
        "Expérience avec Tailwind CSS", 
        "Connaissance des API REST",
        "Français ou Néerlandais + Anglais"
      ],
      benefits: ["Télétravail flexible", "MacBook Pro", "Formation continue", "Stock options"]
    },
    {
      title: "Customer Success Manager",
      department: "Commercial",
      location: "Bruxelles", 
      type: "CDI",
      salary: "€45k - €60k",
      experience: "2-4 ans",
      urgent: false,
      description: "Accompagnez nos clients PME dans leur transformation digitale et leur croissance à l'export.",
      requirements: [
        "Expérience en relation client B2B",
        "Connaissance du secteur logistique",
        "Excellent communicant",
        "Trilingue FR/NL/EN"
      ],
      benefits: ["Commission attractive", "Voiture de société", "Formation export", "Télétravail 2j/semaine"]
    },
    {
      title: "Data Scientist IA",
      department: "Technologie",
      location: "Gand/Remote",
      type: "CDI", 
      salary: "€60k - €80k",
      experience: "4-6 ans",
      urgent: true,
      description: "Développez nos algorithmes d'optimisation logistique et d'automatisation douanière.",
      requirements: [
        "PhD/Master en informatique ou mathématiques",
        "Python, TensorFlow, scikit-learn",
        "Expérience en optimisation",
        "Passion pour la logistique"
      ],
      benefits: ["Recherche appliquée", "Conférences internationales", "Équipement haut de gamme", "Flexible hours"]
    },
    {
      title: "Expert Douanes & Conformité",
      department: "Opérations",
      location: "Anvers",
      type: "CDI",
      salary: "€50k - €70k", 
      experience: "5+ ans",
      urgent: false,
      description: "Guidez nos clients dans la complexité réglementaire douanière et optimisez nos processus.",
      requirements: [
        "Formation en droit douanier",
        "Expérience en commerce international",
        "Connaissance Brexit/CBAM",
        "Rigueur et pédagogie"
      ],
      benefits: ["Expert reconnu", "Formation continue", "Mission consultante", "Voiture + carte carburant"]
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Bruxelles/Remote",
      type: "Freelance",
      salary: "€400-€600/jour",
      experience: "3+ ans",
      urgent: false,
      description: "Concevez des expériences utilisateur exceptionnelles pour nos outils logistiques.",
      requirements: [
        "Portfolio en SaaS B2B",
        "Maîtrise HubDispo/Adobe Suite",
        "Design thinking",
        "Sensibilité UX mobile"
      ],
      benefits: ["Mission 6-12 mois", "Remote friendly", "Projets innovants", "Équipe créative"]
    },
    {
      title: "Business Development Manager",
      department: "Commercial",
      location: "Anvers/Liège",
      type: "CDI",
      salary: "€50k + commissions",
      experience: "4+ ans",
      urgent: true,
      description: "Développez notre réseau de partenaires transporteurs et notre présence en Wallonie.",
      requirements: [
        "Réseau dans la logistique",
        "Expérience partnerships B2B",
        "Négociation commerciale",
        "Autonomie et résultats"
      ],
      benefits: ["Commissions attractives", "Voiture + frais", "Objectifs réalistes", "Team events"]
    }
  ];

  const benefits = [
    {
      icon: <Laptop className="h-6 w-6 text-[#1E40AF]" />,
      title: "Télétravail flexible",
      description: "2-3 jours de télétravail par semaine selon votre poste"
    },
    {
      icon: <Euro className="h-6 w-6 text-[#10B981]" />,
      title: "Package compétitif",
      description: "Salaire, primes, stock options et avantages extra-légaux"
    },
    {
      icon: <Target className="h-6 w-6 text-orange-500" />,
      title: "Formation continue",
      description: "Budget formation 2k€/an + conférences internationales"
    },
    {
      icon: <Coffee className="h-6 w-6 text-amber-600" />,
      title: "Bien-être au travail",
      description: "Bureaux modernes, café premium, fruits, événements équipe"
    },
    {
      icon: <Car className="h-6 w-6 text-blue-500" />,
      title: "Mobilité",
      description: "Voiture de société ou budget mobilité selon le poste"
    },
    {
      icon: <Plane className="h-6 w-6 text-purple-500" />,
      title: "Congés généreux",
      description: "25 jours + récupération + jours fériés belges"
    }
  ];

  const perks = [
    "🏢 Bureaux design au cœur de Bruxelles",
    "🍕 Lunch vouchers 8€/jour",
    "🏥 Mutuelle entreprise premium",
    "🚲 Indemnité vélo 0,25€/km",
    "📱 Gsm + abonnement entreprise", 
    "🎯 Objectifs clairs et atteignables",
    "🚀 Startup en hyper-croissance",
    "🌍 Impact positif sur l'économie belge"
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
              onClick={() => onNavigate('team')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Carrières chez hubdispo.be</h1>
              <p className="text-gray-600 mt-2">Rejoignez la révolution logistique belge</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 px-4 py-2 rounded-full mb-6">
            <Users className="h-5 w-5 text-[#1E40AF]" />
            <span className="text-[#1E40AF] font-medium">{openPositions.length} postes ouverts</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Construisons l'avenir de la <span className="text-[#1E40AF]">logistique</span><br />
            <span className="text-[#10B981]">ensemble</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Rejoignez une équipe passionnée qui révolutionne l'export pour les PME belges. 
            Impactez positivement l'économie locale tout en développant vos compétences dans un environnement stimulant.
          </p>
        </div>

        {/* Company Culture */}
        <Card className="mb-16 bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5 border-none">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-center">
              <div>
                <Zap className="h-12 w-12 text-[#1E40AF] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">Technologie de pointe, IA, startup mindset</p>
              </div>
              <div>
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bienveillance</h3>
                <p className="text-gray-600">Équipe soudée, respect, équilibre vie pro/perso</p>
              </div>
              <div>
                <Target className="h-12 w-12 text-[#10B981] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Impact</h3>
                <p className="text-gray-600">Mission claire : aider les PME à conquérir l'Europe</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Postes Ouverts</h3>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-gray-900">{position.title}</h4>
                        {position.urgent && (
                          <Badge className="bg-red-100 text-red-600">Urgent</Badge>
                        )}
                        <Badge variant="outline">{position.department}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {position.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {position.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <Euro className="h-4 w-4" />
                          {position.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {position.experience}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">{position.description}</p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Prérequis :</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {position.requirements.map((req, reqIndex) => (
                              <li key={reqIndex} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-[#1E40AF] rounded-full" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Avantages :</h5>
                          <div className="flex flex-wrap gap-1">
                            {position.benefits.map((benefit, benefitIndex) => (
                              <Badge key={benefitIndex} variant="secondary" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:text-right">
                      <Button 
                        className="bg-[#1E40AF] hover:bg-[#1E40AF]/90 w-full lg:w-auto"
                        onClick={() => onNavigate('email-support')}
                      >
                        Postuler
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Pourquoi nous rejoindre ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-gray-50">
            <CardContent className="p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Et plein d'autres avantages...
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {perks.map((perk, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Application Process */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Processus de recrutement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#1E40AF] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  1
                </div>
                <h4 className="font-semibold mb-2">Candidature</h4>
                <p className="text-sm text-gray-600">CV + lettre de motivation en français ou anglais</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#1E40AF] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  2
                </div>
                <h4 className="font-semibold mb-2">Échange RH</h4>
                <p className="text-sm text-gray-600">30min pour faire connaissance et valider le fit</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#1E40AF] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  3
                </div>
                <h4 className="font-semibold mb-2">Test technique</h4>
                <p className="text-sm text-gray-600">Cas pratique ou exercice selon le poste</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#10B981] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  ✓
                </div>
                <h4 className="font-semibold mb-2">Décision</h4>
                <p className="text-sm text-gray-600">Réponse sous 48h max</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5 border-none">
          <CardContent className="p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pas le bon poste ?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Nous sommes toujours à la recherche de talents exceptionnels. 
              N'hésitez pas à nous envoyer une candidature spontanée !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                onClick={() => onNavigate('email-support')}
              >
                Candidature spontanée
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('team')}
              >
                Rencontrer l'équipe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}