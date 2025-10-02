// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ArrowLeft, Users, Target, Heart, Award, MapPin, CheckCircle, Globe, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface AboutPageProps {
  onNavigate: (view: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const values = [
    {
      icon: <CheckCircle className="h-6 w-6 text-[#10B981]" />,
      title: "Simplicité",
      description: "Nous transformons la complexité de l'export en solutions simples et intuitives pour les PME belges."
    },
    {
      icon: <Globe className="h-6 w-6 text-[#1E40AF]" />,
      title: "Innovation",
      description: "Notre technologie IA révolutionne la logistique avec des algorithmes de consolidation intelligents."
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Proximité",
      description: "Support local en français, néerlandais et anglais. Une équipe belge qui comprend vos défis."
    },
    {
      icon: <Package className="h-6 w-6 text-orange-500" />,
      title: "Fiabilité",
      description: "99,8% de taux de livraison réussie. Vos envois sont entre de bonnes mains."
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Création de hubdispo.be",
      description: "Fondée par des experts logistiques belges frustrés par la complexité de l'export pour les PME."
    },
    {
      year: "2023", 
      title: "Premiers succès",
      description: "Plus de 500 PME belges nous font confiance. Économies moyennes de 35% sur les frais d'expédition."
    },
    {
      year: "2024",
      title: "Innovation IA",
      description: "Lancement de notre assistant douanier IA et des algorithmes de micro-consolidation intelligente."
    },
    {
      year: "2025",
      title: "Expansion européenne",
      description: "Extension vers les Pays-Bas et la France. Objectif : 10 000 PME utilisatrices."
    }
  ];

  const achievements = [
    { metric: "2500+", label: "PME clientes" },
    { metric: "€2.3M", label: "Économies générées" },
    { metric: "99.8%", label: "Taux de satisfaction" },
    { metric: "35%", label: "Réduction coûts moyenne" }
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
              <h1 className="text-3xl font-bold text-gray-900">À propos de hubdispo.be</h1>
              <p className="text-gray-600 mt-2">La révolution logistique belge pour les PME exportatrices</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 px-4 py-2 rounded-full mb-6">
            <Badge className="bg-[#10B981] text-white">🇧🇪 Made in Belgium</Badge>
            <span className="text-[#1E40AF] font-medium">Startup de l'année 2024</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Simplifier l'export,<br />
            <span className="text-[#1E40AF]">c'est notre mission</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nous démocratisons l'accès aux marchés internationaux pour les PME belges grâce à une plateforme SaaS 
            qui combine micro-consolidation logistique et automatisation douanière intelligente.
          </p>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-[#1E40AF] mb-2">{achievement.metric}</div>
                <div className="text-gray-600">{achievement.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <Card className="mb-16 bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5 border-none">
          <CardContent className="p-12">
            <div className="text-center">
              <Target className="h-12 w-12 text-[#1E40AF] mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre Mission</h3>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Transformer la façon dont les PME belges abordent l'export international. En tant qu'anciens dirigeants 
                de PME exportatrices, nous avons vécu les frustrations des processus douaniers complexes, des coûts 
                d'expédition prohibitifs pour les petits volumes, et du manque de transparence dans la chaîne logistique.
                <br /><br />
                <strong>hubdispo.be</strong> né de cette expérience : une plateforme "one-stop shop" qui démocratise 
                l'accès aux marchés européens grâce à la technologie, l'automatisation intelligente, et un réseau 
                de micro-consolidation collaborative.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Nos Valeurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Notre Histoire</h3>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-[#1E40AF] text-white rounded-full flex items-center justify-center font-bold">
                    {milestone.year}
                  </div>
                </div>
                <Card className="flex-1">
                  <CardContent className="pt-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <Card className="bg-gray-50">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  <MapPin className="h-6 w-6 inline-block mr-2 text-[#1E40AF]" />
                  Basés au cœur de l'Europe
                </h3>
                <div className="space-y-4 text-gray-600">
                  <p><strong>Siège social :</strong><br />Avenue Louise 149<br />1050 Bruxelles, Belgique</p>
                  <p><strong>Hub logistique :</strong><br />Port d'Anvers<br />Accès direct aux principales routes européennes</p>
                  <p><strong>Horaires :</strong><br />Lundi - Vendredi : 8h00 - 18h00 (CET)<br />Support 24/7 via chat</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  <Users className="h-6 w-6 inline-block mr-2 text-[#10B981]" />
                  Rejoignez notre communauté
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Plus de 2500 PME belges nous font déjà confiance. Découvrez comment hubdispo.be 
                  peut transformer vos opérations d'export et vous faire économiser en moyenne 35% 
                  sur vos frais logistiques.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                    onClick={() => onNavigate('register')}
                  >
                    Démarrer gratuitement
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate('demo-scheduler')}
                  >
                    Planifier une démo
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}