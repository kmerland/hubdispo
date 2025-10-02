// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { ArrowRight, Shield, Clock, Globe, Package, Truck, CheckCircle, Star, Users, Award, Leaf, Calculator, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./HubDispo/ImageWithFallback";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import LanguageSelector from "./LanguageSelector";

interface HomepageProps {
  onNavigate: (view: string) => void;
}

export default function Homepage({ onNavigate }: HomepageProps) {
  const [email, setEmail] = useState("");
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();

  const features = [
    {
      icon: Package,
      title: t('home.feature_consolidation'),
      description: t('home.feature_consolidation_desc'),
      color: "text-[#1E40AF]"
    },
    {
      icon: Shield,
      title: t('home.feature_customs'),
      description: t('home.feature_customs_desc'),
      color: "text-[#10B981]"
    },
    {
      icon: Clock,
      title: t('home.feature_tracking'),
      description: t('home.feature_tracking_desc'),
      color: "text-orange-500"
    },
    {
      icon: Calculator,
      title: t('home.feature_pricing'),
      description: t('home.feature_pricing_desc'),
      color: "text-purple-500"
    }
  ];

  const benefits = [
    { 
      title: t('home.savings_average'), 
      value: t('home.savings_average_value'), 
      subtitle: t('home.savings_average_subtitle') 
    },
    { 
      title: t('home.co2_reduction'), 
      value: t('home.co2_reduction_value'), 
      subtitle: t('home.co2_reduction_subtitle') 
    },
    { 
      title: t('home.time_saved'), 
      value: t('home.time_saved_value'), 
      subtitle: t('home.time_saved_subtitle') 
    },
    { 
      title: t('home.satisfaction'), 
      value: t('home.satisfaction_value'), 
      subtitle: t('home.satisfaction_subtitle') 
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      company: "Artisanat Belge Export",
      role: "Directrice",
      content: "Depuis hubdispo.be, l'export n'est plus un casse-tête. Je gagne 3h par semaine et mes coûts ont baissé de 35%. L'assistant douanier IA est fantastique !",
      rating: 5
    },
    {
      name: "Pierre Van Damme",
      company: "TechBelgium SPRL",
      role: "CEO",
      content: "Parfait pour les PME comme nous. L'interface est intuitive et le support client exceptionnel. Nos livraisons européennes n'ont jamais été aussi fluides.",
      rating: 5
    },
    {
      name: "Sarah Janssens",
      company: "Chocolats Premium BE",
      role: "Responsable Export",
      content: "La consolidation automatique nous fait économiser énormément. En plus, c'est écologique ! Nos clients européens reçoivent plus vite qu'avant.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: t('home.plan_starter'),
      price: "49",
      period: "/mois",
      description: t('home.plan_starter_desc'),
      features: [
        "Jusqu'à 20 envois/mois",
        "Assistant douanier IA",
        "Suivi temps réel",
        "Support email",
        "Interface web"
      ],
      badge: null,
      buttonText: t('home.plan_button_start')
    },
    {
      name: t('home.plan_business'),
      price: "149",
      period: "/mois",
      description: t('home.plan_business_desc'),
      features: [
        "Jusqu'à 100 envois/mois",
        "Consolidation prioritaire",
        "API & intégrations",
        "Support téléphonique",
        "Reporting avancé",
        "Gestionnaire dédié"
      ],
      badge: t('home.plan_popular'),
      buttonText: t('home.plan_button_trial')
    },
    {
      name: t('home.plan_enterprise'),
      price: t('home.plan_custom_price'),
      period: "",
      description: t('home.plan_enterprise_desc'),
      features: [
        "Envois illimités",
        "Intégration ERP/CRM",
        "SLA garantis",
        "Support 24/7",
        "Formation équipe",
        "Tarifs négociés"
      ],
      badge: null,
      buttonText: t('home.plan_button_contact')
    }
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      onNavigate("dashboard");
    } else {
      onNavigate("register");
    }
  };

  const handleLoginOrProfile = () => {
    if (isAuthenticated) {
      onNavigate("profile");
    } else {
      onNavigate("login");
    }
  };

  const handleSubscribe = (plan: string) => {
    if (plan === "Enterprise") {
      // Ouvrir formulaire de contact
      return;
    }
    if (isAuthenticated) {
      onNavigate("subscription");
    } else {
      onNavigate("register");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Language selector floating */}
      <div className="fixed top-6 right-6 z-50">
        <LanguageSelector />
      </div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#10B981] text-white">
              {t('home.platform_badge')}
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('home.hero_title_1')} <br />
              <span className="text-[#1E40AF]">{t('home.hero_title_2')}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('home.hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#1E40AF] hover:bg-[#1E40AF]/90 px-8"
                onClick={handleGetStarted}
              >
                {isAuthenticated ? t('home.cta_dashboard') : t('home.cta_start_free')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8"
                onClick={handleLoginOrProfile}
              >
                {isAuthenticated ? t('home.cta_profile') : t('home.cta_see_demo')}
              </Button>
            </div>
            {isAuthenticated && user && (
              <div className="mt-4 text-gray-600">
                Bienvenue, {user.firstName} {user.lastName} - {user.company}
              </div>
            )}
          </div>

          {/* Benefits Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#1E40AF] mb-2">
                  {benefit.value}
                </div>
                <div className="font-medium text-gray-900 mb-1">
                  {benefit.title}
                </div>
                <div className="text-sm text-gray-600">
                  {benefit.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('home.features_title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.features_subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-gray-100 ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('home.how_it_works_title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.how_it_works_subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#1E40AF] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('home.step1_title')}</h3>
              <p className="text-gray-600">
                {t('home.step1_desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#10B981] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('home.step2_title')}</h3>
              <p className="text-gray-600">
                {t('home.step2_desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('home.step3_title')}</h3>
              <p className="text-gray-600">
                {t('home.step3_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('home.testimonials_title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.testimonials_subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg border-none">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-[#1E40AF] font-medium">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('home.pricing_title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('home.pricing_subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`shadow-lg border-none relative ${plan.badge ? 'ring-2 ring-[#1E40AF]' : ''}`}>
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#1E40AF] text-white">
                    {plan.badge}
                  </Badge>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-end justify-center gap-1">
                    {plan.price !== t('home.plan_custom_price') && <span className="text-sm text-gray-600">€</span>}
                    <span className="text-4xl font-bold text-[#1E40AF]">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-[#10B981] flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.badge ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan.name)}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1E40AF] to-[#2563EB]">
        <div className="max-w-4xl mx-auto text-center px-4 lg:px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            {t('home.cta_final_title')}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('home.cta_final_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-[#1E40AF] hover:bg-gray-50 px-8"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? t('home.cta_dashboard') : t('home.cta_free_trial')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1E40AF] px-8">
              {t('home.cta_talk_expert')}
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 text-blue-100 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              {t('home.feature_setup')}
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {t('home.feature_support_fr')}
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              {t('home.feature_instant')}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}