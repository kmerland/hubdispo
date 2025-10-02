// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { HelpCircle, X, Search, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface FloatingFAQButtonProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function FloatingFAQButton({ onNavigate }: FloatingFAQButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Questions fréquentes rapides
  const quickFAQs = [
    {
      id: "first-shipment",
      question: "Comment créer mon premier envoi ?",
      answer: "En 3 minutes avec notre assistant IA",
      category: "démarrage"
    },
    {
      id: "consolidation-how",
      question: "Comment fonctionne la consolidation ?",
      answer: "Groupage automatique avec autres PME vers même destination",
      category: "consolidation"
    },
    {
      id: "customs-ai",
      question: "L'IA douanière est-elle fiable ?",
      answer: "99.2% de réussite sur 75,000+ déclarations",
      category: "douane"
    },
    {
      id: "pricing",
      question: "Comment ça coûte ?",
      answer: "Commission sur économies uniquement",
      category: "facturation"
    }
  ];

  const filteredFAQs = quickFAQs.filter(faq =>
    searchQuery === "" ||
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed bottom-20 right-6 z-40">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1E40AF] to-[#2563EB] hover:from-[#1E40AF]/90 hover:to-[#2563EB]/90 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110"
            title="Questions fréquentes"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent 
          className="w-80 p-0 mr-6 mb-2" 
          align="end"
          side="top"
        >
          <Card className="border-0 shadow-xl">
            <CardHeader className="pb-3 bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  <span className="text-lg">FAQ Rapide</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 p-0 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-4 space-y-4">
              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher une question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>

              {/* Questions rapides */}
              <div className="space-y-2">
                {filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="p-3 border rounded-lg hover:bg-blue-50 cursor-pointer transition-colors group"
                    onClick={() => {
                      setIsOpen(false);
                      onNavigate?.("faq", { search: faq.question });
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1 group-hover:text-[#1E40AF]">
                          {faq.question}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {faq.answer}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-[#1E40AF] transition-colors mt-1" />
                    </div>
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <p className="text-sm">Aucune question trouvée</p>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate?.("faq");
                  }}
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Voir toutes les FAQ
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate?.("direct-chat", { topic: "faq_help" });
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Poser une question
                </Button>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}