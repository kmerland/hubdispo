// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Search, BookOpen, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Separator } from "./ui/separator";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  context: string[];
  helpful?: number;
  tags: string[];
}

interface ContextualFAQProps {
  context?: string; // "customs", "consolidation", "tracking", etc.
  shipmentId?: string;
  onNavigate?: (view: string, params?: any) => void;
}

export default function ContextualFAQ({ context = "general", shipmentId, onNavigate }: ContextualFAQProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [chatOpen, setChatOpen] = useState(false);

  const faqItems: FAQItem[] = [
    {
      id: "dau-1",
      question: "Qu'est-ce qu'un DAU (Document Administratif Unique) ?",
      answer: "Le DAU est le document douanier principal pour les échanges entre l'UE et les pays tiers. Il remplace plusieurs formulaires et simplifie les démarches. HubDispo génère automatiquement votre DAU à partir de vos factures.",
      category: "Douanes",
      context: ["customs", "shipment"],
      tags: ["DAU", "douanes", "document"],
      helpful: 42
    },
    {
      id: "consol-1", 
      question: "Comment fonctionne la consolidation ?",
      answer: "La consolidation regroupe plusieurs envois dans un même conteneur pour réduire les coûts. Vos marchandises sont sécurisées et identifiées séparément. L'économie moyenne est de 40-60% par rapport à un envoi individuel.",
      category: "Consolidation",
      context: ["consolidation", "shipment"],
      tags: ["consolidation", "économies", "conteneur"],
      helpful: 38
    },
    {
      id: "hs-1",
      question: "Comment trouver le bon code HS pour mes produits ?",
      answer: "Le code HS (Système Harmonisé) classifie vos marchandises. Notre IA l'identifie automatiquement à partir de votre facture. Vous pouvez aussi utiliser l'outil de recherche du SPF Finances ou nous contacter pour validation.",
      category: "Classification",
      context: ["customs"],
      tags: ["code HS", "classification", "SPF Finances"],
      helpful: 35
    },
    {
      id: "track-1",
      question: "Pourquoi mon envoi est-il bloqué en douane ?",
      answer: "Les causes principales : documents manquants, valeur sous-évaluée, code HS incorrect, ou contrôle aléatoire. Consultez votre espace client pour voir le statut détaillé et les actions requises.",
      category: "Suivi",
      context: ["tracking", "customs"],
      tags: ["blocage", "douanes", "contrôle"],
      helpful: 29
    },
    {
      id: "price-1",
      question: "Comment sont calculés les frais douaniers ?",
      answer: "Les frais incluent : droits de douane (selon origine/destination), TVA (21% en Belgique), et frais de dossier (€25 forfait HubDispo). Notre calculateur vous donne une estimation précise avant envoi.",
      category: "Tarification",
      context: ["general", "shipment"],
      tags: ["frais", "douanes", "TVA", "tarification"],
      helpful: 33
    },
    {
      id: "origin-1",
      question: "Ai-je besoin d'un certificat d'origine ?",
      answer: "Obligatoire pour bénéficier des accords commerciaux (ex: UE-Canada, UE-Japon). Facultatif sinon, mais recommandé pour éviter les contrôles. HubDispo vous indique automatiquement si c'est requis.",
      category: "Documents",
      context: ["customs"],
      tags: ["certificat origine", "accords commerciaux"],
      helpful: 27
    },
    {
      id: "delay-1",
      question: "Combien de temps prend un dédouanement ?",
      answer: "Dédouanement normal : 2-6h. Contrôle documentaire : 24-48h. Contrôle physique : 2-5 jours. HubDispo vous notifie en temps réel et fournit des estimations mises à jour.",
      category: "Délais",
      context: ["tracking", "customs"],
      tags: ["délais", "dédouanement", "contrôle"],
      helpful: 31
    },
    {
      id: "share-1",
      question: "Qui voit mes marchandises dans un envoi consolidé ?",
      answer: "Seul HubDispo et le transitaire agréé ont accès aux détails. Les autres expéditeurs voient uniquement le secteur d'activité et le volume. Option anonyme disponible sur demande.",
      category: "Confidentialité",
      context: ["consolidation"],
      tags: ["confidentialité", "transparence", "sécurité"],
      helpful: 25
    }
  ];

  const contextualItems = faqItems.filter(item => 
    item.context.includes(context) || context === "general"
  );

  const filteredItems = contextualItems.filter(item =>
    !searchTerm || 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getContextTitle = (context: string) => {
    const titles = {
      customs: "Questions douanières",
      consolidation: "Consolidation & groupage", 
      tracking: "Suivi & livraison",
      shipment: "Création d'envoi",
      general: "Questions fréquentes"
    };
    return titles[context as keyof typeof titles] || "FAQ";
  };

  const getContextIcon = (context: string) => {
    switch (context) {
      case "customs": return "🛂";
      case "consolidation": return "📦";
      case "tracking": return "📍";
      case "shipment": return "📋";
      default: return "❓";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span>{getContextIcon(context)}</span>
            {getContextTitle(context)}
          </h3>
          <p className="text-sm text-gray-600">
            {context !== "general" ? "Questions spécifiques à cette section" : "Toutes les questions fréquentes"}
          </p>
        </div>
        <Button 
          size="sm" 
          onClick={() => onNavigate ? onNavigate("direct-chat") : setChatOpen(!chatOpen)}
          className="bg-[#10B981] hover:bg-[#10B981]/90"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Chat support 24/7
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher dans la FAQ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Quick access based on context */}
      {context === "customs" && shipmentId && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[#1E40AF]" />
              Aide contextuelle pour l'envoi {shipmentId}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <Button 
                variant="link" 
                className="justify-start p-0 h-auto text-[#1E40AF]"
                onClick={() => onNavigate && onNavigate("customs", { shipmentId })}
              >
                → Vérifier mes documents douaniers
              </Button>
              <Button 
                variant="link" 
                className="justify-start p-0 h-auto text-[#1E40AF]"
                onClick={() => onNavigate && onNavigate("customs", { shipmentId })}
              >
                → Comprendre le blocage en douane
              </Button>
              <Button 
                variant="link" 
                className="justify-start p-0 h-auto text-[#1E40AF]"
                onClick={() => onNavigate && onNavigate("new-shipment")}
              >
                → Calculer mes frais douaniers
              </Button>
              <Button 
                variant="link" 
                className="justify-start p-0 h-auto text-[#1E40AF]"
                onClick={() => onNavigate ? onNavigate("direct-chat") : setChatOpen(true)}
              >
                → Contacter un expert douanier
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAQ Items */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="border border-gray-200 hover:border-[#1E40AF]/30 transition-colors">
            <Collapsible 
              open={openItems.includes(item.id)}
              onOpenChange={() => toggleItem(item.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-[#1E40AF] mt-0.5 flex-shrink-0" />
                      <div className="text-left">
                        <CardTitle className="text-base font-medium pr-4">
                          {item.question}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          {item.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {item.helpful && (
                            <span className="text-xs text-gray-500 ml-2">
                              👍 {item.helpful} personnes aidées
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {openItems.includes(item.id) ? 
                      <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" /> : 
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    }
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <Separator className="mb-4" />
                  <div className="pl-8">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {item.answer}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // Simulation du feedback positif
                          alert("Merci pour votre feedback positif ! Cette réponse a été marquée comme utile.");
                        }}
                      >
                        👍 Utile
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // Simulation du feedback négatif
                          alert("Merci pour votre feedback. Un expert va améliorer cette réponse.");
                        }}
                      >
                        👎 Pas utile
                      </Button>
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="text-[#1E40AF] p-0"
                        onClick={() => onNavigate && onNavigate("documentation")}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Plus d'infos
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredItems.length === 0 && searchTerm && (
        <Card>
          <CardContent className="p-8 text-center">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="font-medium mb-2">Aucun résultat trouvé</h4>
            <p className="text-gray-600 mb-4">
              Nous n'avons pas trouvé de réponse à votre recherche "{searchTerm}".
            </p>
            <Button 
              className="bg-[#10B981] hover:bg-[#10B981]/90"
              onClick={() => onNavigate ? onNavigate("direct-chat") : setChatOpen(true)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Poser votre question au support
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Ressources utiles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="link" 
            className="justify-start p-0 h-auto text-[#1E40AF]"
            onClick={() => onNavigate && onNavigate("documentation")}
          >
            📋 Guide complet des démarches douanières
          </Button>
          <Button 
            variant="link" 
            className="justify-start p-0 h-auto text-[#1E40AF]"
            onClick={() => onNavigate && onNavigate("guides")}
          >
            🇧🇪 Réglementation SPF Finances
          </Button>
          <Button 
            variant="link" 
            className="justify-start p-0 h-auto text-[#1E40AF]"
            onClick={() => onNavigate && onNavigate("guides")}
          >
            🌍 Accords commerciaux internationaux
          </Button>
          <Button 
            variant="link" 
            className="justify-start p-0 h-auto text-[#1E40AF]"
            onClick={() => onNavigate && onNavigate("messages")}
          >
            💬 Communauté des exportateurs belges
          </Button>
        </CardContent>
      </Card>

      {/* Chat widget simulation */}
      {chatOpen && (
        <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg">
          <CardHeader className="bg-[#10B981] text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Support douanier 24/7</CardTitle>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setChatOpen(false)}
                className="text-white hover:bg-white/20"
              >
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 h-64 bg-gray-50">
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border text-sm">
                <strong>Bot HubDispo :</strong> Bonjour ! En quoi puis-je vous aider aujourd'hui ?
              </div>
              <div className="bg-[#1E40AF] text-white p-3 rounded-lg ml-8 text-sm">
                J'ai une question sur les codes HS
              </div>
              <div className="bg-white p-3 rounded-lg border text-sm">
                <strong>Bot :</strong> Parfait ! Je peux vous aider avec les codes HS. De quel type de produit s'agit-il ?
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <Input placeholder="Tapez votre message..." className="text-sm" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}