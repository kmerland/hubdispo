// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { TrendingDown, Leaf, Clock, Users, Zap, Calculator, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface CostComparisonProps {
  destination: string;
  weight: number;
  volume: number;
  onSelectMode: (mode: string) => void;
}

export default function CostComparison({ destination, weight, volume, onSelectMode }: CostComparisonProps) {
  const pricing = {
    express: {
      price: 210,
      delivery: "24-48h",
      co2: 45,
      icon: Zap,
      color: "bg-red-500",
      description: "Priorité absolue"
    },
    standard: {
      price: 125,
      delivery: "3-5 jours",
      co2: 28,
      icon: Clock,
      color: "bg-blue-500",
      description: "Envoi individuel"
    },
    consolidated: {
      price: 78,
      delivery: "4-6 jours",
      co2: 12,
      savings: 63,
      icon: Users,
      color: "bg-[#10B981]",
      description: "Groupage intelligent",
      coShippers: 3,
      nextDeparture: "Jeudi 3 Oct"
    }
  };

  const environmentalImpact = {
    co2Saved: pricing.standard.co2 - pricing.consolidated.co2,
    treesEquivalent: Math.round((pricing.standard.co2 - pricing.consolidated.co2) / 12),
    fuelSaved: Math.round((pricing.standard.co2 - pricing.consolidated.co2) * 0.4)
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Comparaison des modes d'envoi</h3>
        <p className="text-gray-600">
          Pour {weight}kg vers {destination} • Volume: {volume}m³
        </p>
      </div>

      {/* Comparaison des prix */}
      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(pricing).map(([mode, data]) => (
          <Card 
            key={mode}
            className={`relative overflow-hidden transition-all hover:shadow-lg cursor-pointer ${
              mode === 'consolidated' ? 'ring-2 ring-[#10B981] bg-green-50' : ''
            }`}
            onClick={() => onSelectMode(mode)}
          >
            {mode === 'consolidated' && (
              <Badge className="absolute top-3 right-3 bg-[#10B981] text-white">
                Recommandé
              </Badge>
            )}
            
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${data.color} text-white`}>
                  <data.icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg capitalize">{mode === 'consolidated' ? 'Consolidé' : mode}</CardTitle>
                  <p className="text-sm text-gray-600">{data.description}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1E40AF]">€{data.price}</div>
                {data.savings && (
                  <Badge className="bg-[#10B981] text-white mt-1">
                    -{data.savings}% d'économie
                  </Badge>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Délai:</span>
                  <span className="font-medium">{data.delivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CO₂:</span>
                  <span className="font-medium">{data.co2}kg</span>
                </div>
                {mode === 'consolidated' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Co-expéditeurs:</span>
                      <span className="font-medium">{data.coShippers} autres</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prochain départ:</span>
                      <span className="font-medium text-[#10B981]">{data.nextDeparture}</span>
                    </div>
                  </>
                )}
              </div>

              {mode === 'consolidated' && (
                <div className="bg-white p-3 rounded border">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-[#10B981]" />
                    <span className="text-sm font-medium">Groupe disponible</span>
                  </div>
                  <Progress value={75} className="h-2 mb-2" />
                  <p className="text-xs text-gray-600">75% rempli • 2 places restantes</p>
                </div>
              )}

              <Button 
                className={`w-full ${
                  mode === 'consolidated' 
                    ? 'bg-[#10B981] hover:bg-[#10B981]/90' 
                    : 'bg-[#1E40AF] hover:bg-[#1E40AF]/90'
                }`}
                onClick={() => onSelectMode(mode)}
              >
                {mode === 'consolidated' ? 'Rejoindre le groupe' : 'Choisir ce mode'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Impact environnemental */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Leaf className="h-5 w-5" />
            Impact environnemental du groupage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <TrendingDown className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <div className="font-semibold text-green-800">{environmentalImpact.co2Saved}kg CO₂</div>
              <div className="text-sm text-gray-600">économisés</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl mb-2">🌳</div>
              <div className="font-semibold text-green-800">{environmentalImpact.treesEquivalent} arbres</div>
              <div className="text-sm text-gray-600">équivalent</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl mb-2">⛽</div>
              <div className="font-semibold text-green-800">{environmentalImpact.fuelSaved}L</div>
              <div className="text-sm text-gray-600">carburant évité</div>
            </div>
          </div>
          <p className="text-center text-sm text-green-700 mt-4">
            En choisissant le groupage, vous contribuez activement à la réduction de l'empreinte carbone du transport !
          </p>
        </CardContent>
      </Card>

      {/* Détails techniques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Détails du calcul
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Facteurs de prix</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Poids ({weight}kg):</span>
                  <span>€{(weight * 2.5).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance vers {destination}:</span>
                  <span>€{(weight * 1.2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assurance & manutention:</span>
                  <span>€12.50</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Prix consolidé:</span>
                  <span className="font-medium text-[#10B981]">€{pricing.consolidated.price}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Économies réalisées</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Partage des frais fixes:</span>
                  <span className="text-[#10B981]">-€25</span>
                </div>
                <div className="flex justify-between">
                  <span>Optimisation du remplissage:</span>
                  <span className="text-[#10B981]">-€18</span>
                </div>
                <div className="flex justify-between">
                  <span>Négociation volume:</span>
                  <span className="text-[#10B981]">-€4</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Total économisé:</span>
                  <span className="font-medium text-[#10B981]">-€47 (37%)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}