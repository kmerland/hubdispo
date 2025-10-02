// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { CheckCircle, AlertCircle, Clock, Settings, Zap, Shield, Package, Globe, Calculator, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useLanguage } from "./LanguageProvider";
import { useAuth } from "./AuthProvider";

interface SystemStatusProps {
  onNavigate: (view: string) => void;
}

interface ServiceStatus {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
  enabled: boolean;
  icon: any;
  category: 'core' | 'features' | 'integrations';
}

export default function SystemStatus({ onNavigate }: SystemStatusProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      id: 'micro-consolidation',
      name: 'Micro-consolidation intelligente',
      description: 'Regroupement automatique des envois pour optimiser les coûts',
      status: 'active',
      enabled: true,
      icon: Package,
      category: 'core'
    },
    {
      id: 'customs-ai',
      name: 'Assistant douanier IA',
      description: 'Génération automatique des déclarations douanières',
      status: 'active',
      enabled: true,
      icon: Shield,
      category: 'core'
    },
    {
      id: 'real-time-tracking',
      name: 'Suivi temps réel',
      description: 'Tracking complet des envois avec notifications',
      status: 'active',
      enabled: true,
      icon: Clock,
      category: 'core'
    },
    {
      id: 'pricing-calculator',
      name: 'Calculateur de prix',
      description: 'Tarification transparente en temps réel',
      status: 'active',
      enabled: true,
      icon: Calculator,
      category: 'features'
    },
    {
      id: 'route-optimization',
      name: 'Optimisation des trajets',
      description: 'Intelligence artificielle pour les routes optimales',
      status: 'active',
      enabled: true,
      icon: Truck,
      category: 'features'
    },
    {
      id: 'multilingual-support',
      name: 'Support multilingue',
      description: 'Interface en français, anglais et néerlandais',
      status: 'active',
      enabled: true,
      icon: Globe,
      category: 'features'
    },
    {
      id: 'api-integration',
      name: 'Intégrations API',
      description: 'Connexion avec ERP et systèmes externes',
      status: 'active',
      enabled: true,
      icon: Zap,
      category: 'integrations'
    },
    {
      id: 'webhook-notifications',
      name: 'Notifications webhook',
      description: 'Alertes automatiques vers vos systèmes',
      status: 'active',
      enabled: true,
      icon: Settings,
      category: 'integrations'
    }
  ]);

  const toggleService = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { ...service, enabled: !service.enabled }
        : service
    ));
  };

  const enableAllServices = () => {
    setServices(services.map(service => ({ ...service, enabled: true })));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-[#10B981] text-white">Opérationnel</Badge>;
      case 'maintenance':
        return <Badge className="bg-orange-500 text-white">Maintenance</Badge>;
      case 'inactive':
        return <Badge className="bg-red-500 text-white">Inactif</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">Inconnu</Badge>;
    }
  };

  const getStatusIcon = (status: string, enabled: boolean) => {
    if (!enabled) return <AlertCircle className="h-5 w-5 text-gray-400" />;
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-[#10B981]" />;
      case 'maintenance':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'inactive':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const categorizeServices = (category: string) => {
    return services.filter(service => service.category === category);
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'core':
        return 'Services essentiels';
      case 'features':
        return 'Fonctionnalités avancées';
      case 'integrations':
        return 'Intégrations & API';
      default:
        return 'Autres services';
    }
  };

  const activeServicesCount = services.filter(s => s.enabled).length;
  const totalServicesCount = services.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                État des services hubdispo.be
              </h1>
              <p className="text-gray-600">
                Gestion et supervision de toutes les fonctionnalités de la plateforme
              </p>
            </div>
            <Button
              onClick={() => onNavigate("dashboard")}
              variant="outline"
            >
              Retour au dashboard
            </Button>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Services actifs</p>
                    <p className="text-2xl font-bold text-[#10B981]">
                      {activeServicesCount}/{totalServicesCount}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-[#10B981]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Disponibilité</p>
                    <p className="text-2xl font-bold text-[#1E40AF]">99.9%</p>
                  </div>
                  <Zap className="h-8 w-8 text-[#1E40AF]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Utilisateur</p>
                    <p className="text-lg font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                  <Badge className="bg-[#1E40AF] text-white">
                    {user?.plan || 'starter'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Button
                      onClick={enableAllServices}
                      className="bg-[#10B981] hover:bg-[#10B981]/90 text-white w-full"
                      size="sm"
                    >
                      Activer tout
                    </Button>
                  </div>
                  <Settings className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Services by Category */}
          {['core', 'features', 'integrations'].map(category => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {getCategoryTitle(category)}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {categorizeServices(category).map((service) => (
                  <Card key={service.id} className={`${service.enabled ? 'ring-2 ring-[#10B981]/20' : 'opacity-60'}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${service.enabled ? 'bg-[#10B981]/10' : 'bg-gray-100'}`}>
                            <service.icon className={`h-5 w-5 ${service.enabled ? 'text-[#10B981]' : 'text-gray-400'}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(service.status, service.enabled)}
                          <Switch
                            checked={service.enabled}
                            onCheckedChange={() => toggleService(service.id)}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 mb-3">{service.description}</p>
                      <div className="flex items-center justify-between">
                        {getStatusBadge(service.status)}
                        <span className={`text-sm ${service.enabled ? 'text-[#10B981]' : 'text-gray-400'}`}>
                          {service.enabled ? 'Activé' : 'Désactivé'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}