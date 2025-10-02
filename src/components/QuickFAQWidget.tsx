// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { HelpCircle, ChevronRight, Search, Star, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

interface QuickFAQWidgetProps {
  onNavigate?: (view: string, params?: any) => void;
}

interface QuickFAQItem {
  id: string;
  question: string;
  shortAnswer: string;
  category: string;
  views: number;
  helpful: number;
}

export default function QuickFAQWidget({ onNavigate }: QuickFAQWidgetProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Top FAQ rapides pour le dashboard
  const quickFAQs: QuickFAQItem[] = [
    {
      id: "what-is-hubdispo",
      question: "Qu'est-ce que hubdispo.be ?",
      shortAnswer: "Plateforme SaaS belge de micro-consolidation logistique pour PME avec IA douanière",
      category: "démarrage",
      views: 8924,
      helpful: 456
    },
    {
      id: "first-shipment-time",
      question: "Temps pour le premier envoi ?",
      shortAnswer: "3-5 minutes avec notre assistant intelligent et génération automatique des documents",
      category: "démarrage", 
      views: 6234,
      helpful: 387
    },
    {
      id: "consolidation-savings",
      question: "Économies avec la consolidation ?",
      shortAnswer: "30-65% d'économies moyennes vs transporteurs traditionnels grâce au groupage intelligent",
      category: "consolidation",
      views: 9456,
      helpful: 523
    },
    {
      id: "ai-customs-reliability",
      question: "Fiabilité de l'IA douanière ?",
      shortAnswer: "99.2% de réussite sur 75,000+ déclarations avec mise à jour continue des réglementations",
      category: "douane",
      views: 12456,
      helpful: 678
    },
    {
      id: "pricing-model",
      question: "Comment fonctionne la tarification ?",
      shortAnswer: "Commission sur les économies réalisées uniquement - vous ne payez que si vous économisez",
      category: "facturation",
      views: 11234,
      helpful: 612
    }
  ];

  const filteredFAQs = quickFAQs.filter(faq => 
    searchQuery === "" || 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFAQClick = (faqId: string) => {
    onNavigate?.("faq", { search: faqId });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "démarrage": "bg-blue-100 text-blue-700",
      "consolidation": "bg-green-100 text-green-700", 
      "douane": "bg-purple-100 text-purple-700",
      "facturation": "bg-amber-100 text-amber-700",
      "technique": "bg-indigo-100 text-indigo-700"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  return (
    <Card className="border-2 hover:shadow-lg transition-all">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#1E40AF]" />
            <span>FAQ Rapide</span>
            <Badge variant="secondary" className="bg-[#1E40AF] text-white">
              Questions fréquentes
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate?.("faq")}
            className="text-[#1E40AF] hover:text-[#1E40AF] hover:bg-blue-50"
          >
            Voir toutes
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Barre de recherche mini */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher une question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 text-sm"
          />
        </div>

        {/* Liste des FAQ */}
        <div className="space-y-2">
          {filteredFAQs.slice(0, 4).map((faq) => (
            <div
              key={faq.id}
              className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
              onClick={() => handleFAQClick(faq.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm group-hover:text-[#1E40AF] transition-colors">
                      {faq.question}
                    </h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getCategoryColor(faq.category)}`}
                    >
                      {faq.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {faq.shortAnswer}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span>{faq.helpful}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{faq.views} vues</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#1E40AF] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <HelpCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">Aucune question trouvée</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSearchQuery("")}
              className="mt-2"
            >
              Voir toutes les questions
            </Button>
          </div>
        )}

        {filteredFAQs.length > 4 && (
          <div className="text-center pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate?.("faq", { search: searchQuery })}
              className="text-xs"
            >
              Voir {filteredFAQs.length - 4} autres résultats
            </Button>
          </div>
        )}

        {/* Actions rapides */}
        <div className="flex flex-col gap-2 pt-3 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate?.("faq", { category: "démarrage" })}
            className="justify-start text-xs"
          >
            🚀 Questions démarrage
          </Button>
          <Button
            variant="outline"
            size="sm" 
            onClick={() => onNavigate?.("direct-chat", { topic: "faq_help" })}
            className="justify-start text-xs"
          >
            💬 Poser une question
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}