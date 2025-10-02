// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ArrowLeft, Download, Calendar, Users, Award, ExternalLink, FileText, Image } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface PressPageProps {
  onNavigate: (view: string) => void;
}

export default function PressPage({ onNavigate }: PressPageProps) {
  const pressReleases = [
    {
      date: "15 janvier 2025",
      title: "hubdispo.be lève 3M€ pour accélérer son expansion européenne",
      excerpt: "La startup belge spécialisée dans la micro-consolidation logistique annonce une levée de fonds Série A menée par BeCap et Volta Ventures.",
      category: "Financement",
      link: "#",
      featured: true
    },
    {
      date: "3 janvier 2025",
      title: "Bilan 2024 : 2500 PME belges ont économisé €2.3M grâce à hubdispo.be",
      excerpt: "La plateforme SaaS affiche une croissance de 340% et annonce son expansion vers les Pays-Bas et la France en 2025.",
      category: "Résultats",
      link: "#",
      featured: false
    },
    {
      date: "18 décembre 2024",
      title: "hubdispo.be remporte le Prix de l'Innovation Logistique 2024",
      excerpt: "Reconnaissance par la Fédération Belge des Entreprises de Distribution pour ses algorithmes de consolidation IA.",
      category: "Récompense",
      link: "#",
      featured: false
    },
    {
      date: "5 novembre 2024",
      title: "Partenariat stratégique avec PostNL pour la consolidation Belgique-Pays-Bas",
      excerpt: "Accord exclusif permettant aux PME belges d'accéder à des tarifs préférentiels via la consolidation intelligente.",
      category: "Partenariat",
      link: "#",
      featured: false
    },
    {
      date: "22 septembre 2024",
      title: "Launch de l'Assistant Douanier IA : automatisation complète des déclarations",
      excerpt: "Première solution belge d'automatisation douanière basée sur l'IA, développée en partenariat avec l'ULB.",
      category: "Produit",
      link: "#",
      featured: false
    },
    {
      date: "10 juillet 2024",
      title: "hubdispo.be sélectionnée parmi les 50 startups les plus prometteuses d'Europe",
      excerpt: "Distinction par EU-Startups.com dans la catégorie 'Supply Chain Innovation' pour son impact sur l'économie des PME.",
      category: "Récompense",
      link: "#",
      featured: false
    }
  ];

  const mediaContact = {
    name: "Sarah Van Der Meer",
    role: "Head of Communications",
    email: "presse@hubdispo.be",
    phone: "+32 2 123 45 89",
    linkedin: "https://linkedin.com/in/sarah-vandermeer"
  };

  const awards = [
    {
      year: "2024",
      title: "Startup de l'année",
      organization: "Digital Wallonia",
      description: "Reconnaissance pour l'impact économique sur les PME belges"
    },
    {
      year: "2024", 
      title: "Prix Innovation Logistique",
      organization: "FEBEDI",
      description: "Solutions IA pour l'optimisation des chaînes d'approvisionnement"
    },
    {
      year: "2024",
      title: "Top 50 EU Startups",
      organization: "EU-Startups.com",
      description: "Supply Chain Innovation category"
    },
    {
      year: "2023",
      title: "Jeune Entreprise Prometteuse",
      organization: "AWEX",
      description: "Soutien à l'export des entreprises wallonnes"
    }
  ];

  const mediaKit = [
    {
      name: "Logo hubdispo.be (PNG)",
      description: "Logo principal haute résolution avec variantes",
      size: "2.1 MB",
      type: "ZIP"
    },
    {
      name: "Photos équipe dirigeante", 
      description: "Photos officielles des cofondateurs",
      size: "5.3 MB",
      type: "ZIP"
    },
    {
      name: "Screenshots plateforme",
      description: "Captures d'écran de l'interface utilisateur",
      size: "3.7 MB", 
      type: "ZIP"
    },
    {
      name: "Fact Sheet 2025",
      description: "Chiffres clés et informations entreprise",
      size: "890 KB",
      type: "PDF"
    },
    {
      name: "Présentation investisseurs",
      description: "Deck de présentation corporate", 
      size: "4.2 MB",
      type: "PDF"
    }
  ];

  const mediaCoverage = [
    {
      outlet: "L'Echo",
      date: "12 janvier 2025",
      title: "La pépite belge qui révolutionne l'export des PME",
      author: "Pierre Dupont",
      link: "#"
    },
    {
      outlet: "De Tijd",
      date: "8 janvier 2025", 
      title: "Belgische startup haalt 3 miljoen euro op voor logistieke innovatie",
      author: "Marie Janssens",
      link: "#"
    },
    {
      outlet: "Trends Tendances",
      date: "20 décembre 2024",
      title: "Comment hubdispo.be démocratise l'export pour les PME",
      author: "Jean-Marie Verhulst",
      link: "#"
    },
    {
      outlet: "TechCrunch Europe",
      date: "15 décembre 2024",
      title: "Belgian logistics startup streamlines SME exports with AI",
      author: "Sophie Laurent",
      link: "#"
    },
    {
      outlet: "Le Soir",
      date: "28 novembre 2024",
      title: "L'intelligence artificielle au service de la logistique belge",
      author: "Thomas Dufour", 
      link: "#"
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
              <h1 className="text-3xl font-bold text-gray-900">Espace Presse</h1>
              <p className="text-gray-600 mt-2">Ressources médias et actualités de hubdispo.be</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 px-4 py-2 rounded-full mb-6">
            <FileText className="h-5 w-5 text-[#1E40AF]" />
            <span className="text-[#1E40AF] font-medium">Dernières actualités</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            hubdispo.be dans les <span className="text-[#1E40AF]">médias</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez l'actualité de la startup belge qui révolutionne l'export pour les PME. 
            Retrouvez nos communiqués, couverture médiatique et ressources presse.
          </p>
        </div>

        {/* Latest Press Release - Featured */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Derniers Communiqués</h3>
          {pressReleases.filter(pr => pr.featured).map((release, index) => (
            <Card key={index} className="mb-6 border-l-4 border-l-[#1E40AF] bg-gradient-to-r from-[#1E40AF]/5 to-transparent">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-[#1E40AF] text-white">À la une</Badge>
                    <Badge variant="outline">{release.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar className="h-4 w-4" />
                    {release.date}
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{release.title}</h4>
                <p className="text-gray-600 leading-relaxed mb-6">{release.excerpt}</p>
                <div className="flex gap-3">
                  <Button className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                    <FileText className="h-4 w-4 mr-2" />
                    Lire le communiqué complet
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Press Releases */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Archives Communiqués</h3>
          <div className="space-y-4">
            {pressReleases.filter(pr => !pr.featured).map((release, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">{release.category}</Badge>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Calendar className="h-3 w-3" />
                          {release.date}
                        </div>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{release.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{release.excerpt}</p>
                    </div>
                    <div className="ml-6">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Lire
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Media Coverage */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Couverture Médiatique</h3>
            <div className="space-y-4">
              {mediaCoverage.map((article, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-[#1E40AF]">{article.outlet}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{article.date}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">{article.title}</h4>
                        <p className="text-sm text-gray-600">Par {article.author}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Récompenses & Reconnaissances</h3>
            <div className="space-y-4">
              {awards.map((award, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#1E40AF] to-[#10B981] rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-[#1E40AF]">{award.year}</span>
                          <Badge variant="secondary">{award.organization}</Badge>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">{award.title}</h4>
                        <p className="text-sm text-gray-600">{award.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Media Kit */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Kit Médias</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaKit.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#1E40AF]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Image className="h-8 w-8 text-[#1E40AF]" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
                    <span>{item.size}</span>
                    <span>•</span>
                    <span>{item.type}</span>
                  </div>
                  <Button size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Media Contact */}
        <Card className="bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5 border-none">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  <Users className="h-6 w-6 inline-block mr-2 text-[#1E40AF]" />
                  Contact Presse
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">{mediaContact.name}</p>
                    <p className="text-[#1E40AF]">{mediaContact.role}</p>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <p>📧 {mediaContact.email}</p>
                    <p>📱 {mediaContact.phone}</p>
                    <p>💼 LinkedIn : {mediaContact.linkedin}</p>
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Disponible pour interviews, demandes d'informations et coordinations médias. 
                      Réponse garantie sous 24h.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Demande d'information</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Journaliste ? Besoin d'informations spécifiques, d'interviews ou de visuels ? 
                  Contactez-nous directement.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                    onClick={() => onNavigate('email-support')}
                  >
                    Contacter la presse
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate('about')}
                  >
                    En savoir plus
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