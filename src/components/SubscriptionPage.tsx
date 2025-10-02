// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { Check, Star, Zap, Shield, Clock, TrendingUp, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface SubscriptionPageProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function SubscriptionPage({ onNavigate }: SubscriptionPageProps) {
  const features = {
    free: [
      "Jusqu'à 5 envois/mois",
      "Consolidation automatique",
      "Suivi en temps réel",
      "Support par email",
      "Documents de base"
    ],
    premium: [
      "Envois illimités",
      "Automatisation douanière complète",
      "Représentation douanière incluse",
      "Support prioritaire (chat + téléphone)",
      "Rapports d'export détaillés",
      "API d'intégration",
      "Gestionnaire de compte dédié",
      "Formation personnalisée"
    ]
  };

  const stats = [
    { label: "Entreprises clientes", value: "2,500+", icon: Users },
    { label: "Économies moyennes", value: "60%", icon: TrendingUp },
    { label: "Temps gagné/envoi", value: "45min", icon: Clock }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-semibold">Choisissez votre plan</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Simplifiez vos envois internationaux avec nos solutions adaptées à votre volume d'activité
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-2">
            <div className="w-12 h-12 bg-[#1E40AF]/10 rounded-full flex items-center justify-center mx-auto">
              <stat.icon className="h-6 w-6 text-[#1E40AF]" />
            </div>
            <div className="text-2xl font-semibold text-[#1E40AF]">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Pricing Cards */}
      <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Free Plan */}
        <Card className="relative">
          <CardHeader className="text-center pb-4">
            <div className="space-y-2">
              <CardTitle className="text-xl">Gratuit</CardTitle>
              <div className="space-y-1">
                <div className="text-3xl font-semibold">€0</div>
                <div className="text-gray-600">Pour démarrer</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {features.free.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-[#10B981]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full" variant="outline">
              Plan actuel
            </Button>
          </CardContent>
        </Card>

        {/* Premium Plan */}
        <Card className="relative border-[#1E40AF] shadow-lg">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-[#1E40AF] text-white px-4 py-1">
              <Star className="h-4 w-4 mr-1" />
              Recommandé
            </Badge>
          </div>
          <CardHeader className="text-center pb-4">
            <div className="space-y-2">
              <CardTitle className="text-xl text-[#1E40AF]">Premium</CardTitle>
              <div className="space-y-1">
                <div className="text-3xl font-semibold">€49<span className="text-lg text-gray-600">/mois</span></div>
                <div className="text-gray-600">Facturation mensuelle</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {features.premium.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-[#10B981]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90"
              onClick={() => onNavigate && onNavigate('stripe-checkout', { planType: 'premium' })}
            >
              S'abonner maintenant
            </Button>
          </CardContent>
        </Card>

        {/* Premium Annual Plan */}
        <Card className="relative border-[#10B981] shadow-lg">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-[#10B981] text-white px-4 py-1">
              💰 Économie
            </Badge>
          </div>
          <CardHeader className="text-center pb-4">
            <div className="space-y-2">
              <CardTitle className="text-xl text-[#10B981]">Premium Annuel</CardTitle>
              <div className="space-y-1">
                <div className="text-3xl font-semibold">€490<span className="text-lg text-gray-600">/an</span></div>
                <div className="text-sm text-[#10B981] font-medium">Économisez €98 (2 mois gratuits)</div>
                <div className="text-gray-600">Facturation annuelle</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {features.premium.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-[#10B981]" />
                  <span>{feature}</span>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-[#10B981]" />
                <span className="font-medium text-[#10B981]">+ 2 mois gratuits inclus</span>
              </li>
            </ul>
            <Button 
              className="w-full bg-[#10B981] hover:bg-[#10B981]/90"
              onClick={() => onNavigate && onNavigate('stripe-checkout', { planType: 'annual' })}
            >
              S'abonner pour 1 an
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-[#10B981] to-[#059669] rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-semibold mb-4">Économisez jusqu'à 60% sur vos frais douaniers</h3>
        <p className="text-green-100 mb-6 max-w-3xl mx-auto">
          Notre automatisation douanière et notre représentation agréée vous font gagner du temps et de l'argent 
          sur chaque envoi international.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="space-y-2">
            <Zap className="h-8 w-8 mx-auto text-yellow-300" />
            <h4 className="font-semibold">Automatisation complète</h4>
            <p className="text-sm text-green-100">IA avancée pour vos déclarations</p>
          </div>
          <div className="space-y-2">
            <Shield className="h-8 w-8 mx-auto text-yellow-300" />
            <h4 className="font-semibold">Conformité garantie</h4>
            <p className="text-sm text-green-100">Représentation douanière officielle</p>
          </div>
          <div className="space-y-2">
            <Clock className="h-8 w-8 mx-auto text-yellow-300" />
            <h4 className="font-semibold">Support prioritaire</h4>
            <p className="text-sm text-green-100">Équipe dédiée disponible 24/7</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h3 className="text-xl font-semibold text-center">Questions fréquentes</h3>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Puis-je changer de plan à tout moment ?</h4>
              <p className="text-gray-600 text-sm">
                Oui, vous pouvez passer au plan Premium ou revenir au plan Gratuit à tout moment. 
                Les changements prennent effet immédiatement.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Que comprend la représentation douanière ?</h4>
              <p className="text-gray-600 text-sm">
                Notre équipe d'experts agréés gère toutes vos déclarations douanières complexes, 
                répond aux contrôles et assure la conformité avec les réglementations européennes.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Y a-t-il un engagement minimum ?</h4>
              <p className="text-gray-600 text-sm">
                Non, aucun engagement. Vous pouvez annuler votre abonnement Premium à tout moment 
                et continuer avec le plan Gratuit.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="text-center space-y-4 pt-8 border-t">
        <h3 className="text-xl font-semibold">Prêt à automatiser vos envois ?</h3>
        <p className="text-gray-600">
          Rejoignez plus de 2,500 entreprises belges qui font confiance à hubdispo.be
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
            onClick={() => onNavigate && onNavigate('stripe-checkout', { planType: 'premium' })}
          >
            Commencer gratuitement
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => onNavigate && onNavigate('demo-scheduler')}
          >
            Planifier une démo
          </Button>
        </div>
      </div>
    </div>
  );
}