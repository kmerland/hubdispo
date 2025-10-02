// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ArrowLeft, Linkedin, Mail, MapPin, Award, Users, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./HubDispo/ImageWithFallback";

interface TeamPageProps {
  onNavigate: (view: string) => void;
}

export default function TeamPage({ onNavigate }: TeamPageProps) {
  const leadership = [
    {
      name: "Marc Vandenbroucke",
      role: "CEO & Co-fondateur",
      location: "Bruxelles",
      bio: "Ex-directeur export chez Solvay pendant 12 ans. Diplômé de la Solvay Business School. Passionné par l'innovation logistique et l'entrepreneuriat belge.",
      expertise: ["Stratégie d'export", "Négociations internationales", "Gestion d'équipe"],
      linkedin: "https://linkedin.com/in/marc-vandenbroucke",
      email: "marc@hubdispo.be",
      image: "business-man-portrait"
    },
    {
      name: "Sophie Delaere",
      role: "CTO & Co-fondatrice", 
      location: "Gand",
      bio: "Ancienne Lead Engineer chez Materialise. Spécialiste en IA et systèmes distribués. Diplômée UGent en informatique.",
      expertise: ["Intelligence Artificielle", "Architecture cloud", "Optimisation algorithmique"],
      linkedin: "https://linkedin.com/in/sophie-delaere",
      email: "sophie@hubdispo.be",
      image: "professional-woman-tech"
    },
    {
      name: "David Lemaire",
      role: "COO & Expert Douanes",
      location: "Anvers",
      bio: "20 ans d'expérience en douanes et logistique internationale. Ex-consultant senior chez Deloitte Trade & Customs.",
      expertise: ["Réglementation douanière", "Conformité UE", "Processus logistiques"],
      linkedin: "https://linkedin.com/in/david-lemaire",
      email: "david@hubdispo.be",
      image: "logistics-expert"
    }
  ];

  const team = [
    {
      name: "Julie Mortier",
      role: "Head of Customer Success",
      location: "Bruxelles",
      expertise: ["Relation client", "Onboarding", "Formation"],
      image: "customer-success-manager"
    },
    {
      name: "Thomas Peeters",
      role: "Lead Developer Full-Stack",
      location: "Louvain",
      expertise: ["React/Node.js", "DevOps", "API Design"],
      image: "developer-male"
    },
    {
      name: "Emma Van Houten",
      role: "Data Scientist IA",
      location: "Gand",
      expertise: ["Machine Learning", "Optimisation", "Analytics"],
      image: "data-scientist-woman"
    },
    {
      name: "Olivier Janssens",
      role: "Partnerships Manager",
      location: "Anvers",
      expertise: ["Développement commercial", "Négociations", "Business Development"],
      image: "business-development"
    },
    {
      name: "Nathalie Dubois",
      role: "Head of Operations",
      location: "Charleroi", 
      expertise: ["Gestion opérationnelle", "Qualité", "Processus"],
      image: "operations-manager"
    },
    {
      name: "Kevin De Smet",
      role: "UX/UI Designer",
      location: "Bruges",
      expertise: ["Design thinking", "Prototypage", "User research"],
      image: "ui-designer"
    }
  ];

  const advisors = [
    {
      name: "Prof. Dr. Ann Vereecke",
      role: "Conseillère Académique",
      org: "Vlerick Business School",
      expertise: "Supply Chain Management & Innovation"
    },
    {
      name: "Jean-Claude Frenay",
      role: "Conseiller Stratégique",
      org: "Ex-CEO Port d'Anvers",
      expertise: "Logistique portuaire & Infrastructure"
    },
    {
      name: "Marie-Hélène Ska",
      role: "Conseillère Réglementaire",
      org: "Ex-Douanes Belges",
      expertise: "Conformité douanière & Brexit"
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
              onClick={() => onNavigate('about')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notre Équipe</h1>
              <p className="text-gray-600 mt-2">Les visionnaires derrière la révolution logistique belge</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E40AF]/10 px-4 py-2 rounded-full mb-6">
            <Users className="h-5 w-5 text-[#1E40AF]" />
            <span className="text-[#1E40AF] font-medium">25+ talents passionnés</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Une équipe d'<span className="text-[#1E40AF]">experts</span><br />
            au service des <span className="text-[#10B981]">PME belges</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Notre équipe combine expertise logistique, innovation technologique et passion pour l'entrepreneuriat. 
            Ensemble, nous révolutionnons l'export pour les PME belges.
          </p>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Équipe de Direction</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={`/api/placeholder/400/300`}
                      alt={leader.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{leader.name}</h4>
                        <p className="text-[#1E40AF] font-medium">{leader.role}</p>
                        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                          <MapPin className="h-3 w-3" />
                          {leader.location}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="p-2">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="p-2">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{leader.bio}</p>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-900 text-sm">Expertises :</h5>
                      <div className="flex flex-wrap gap-1">
                        {leader.expertise.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Team */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Équipe Core</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#1E40AF] to-[#10B981] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-[#1E40AF] font-medium text-sm">{member.role}</p>
                    <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mt-1">
                      <MapPin className="h-3 w-3" />
                      {member.location}
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {member.expertise.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Advisory Board */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Conseil Consultatif</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advisors.map((advisor, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-8 w-8 text-[#1E40AF]" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{advisor.name}</h4>
                  <p className="text-[#1E40AF] font-medium text-sm">{advisor.role}</p>
                  <p className="text-gray-600 text-sm">{advisor.org}</p>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">{advisor.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Join the Team */}
        <Card className="bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5 border-none">
          <CardContent className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-[#1E40AF] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Rejoignez notre aventure</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Nous recherchons constamment de nouveaux talents passionnés par l'innovation logistique 
              et l'entrepreneuriat. Contribuez à révolutionner l'export pour les PME belges !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                onClick={() => onNavigate('careers')}
              >
                Voir nos postes ouverts
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('email-support')}
              >
                Candidature spontanée
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}