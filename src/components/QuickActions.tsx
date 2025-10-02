// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Package, Users, CreditCard, Calendar, MapPin, FileText } from 'lucide-react';

interface QuickActionsProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function QuickActions({ onNavigate }: QuickActionsProps) {
  const quickActions = [
    {
      id: 'new-shipment',
      title: 'Nouvel envoi',
      description: 'Créer un envoi international',
      icon: Package,
      color: 'bg-[#1E40AF]',
      action: () => onNavigate?.('new-shipment')
    },
    {
      id: 'consolidation',
      title: 'Consolidation',
      description: 'Rejoindre un groupe d\'envoi',
      icon: Users,
      color: 'bg-[#10B981]',
      action: () => onNavigate?.('consolidation')
    },
    {
      id: 'map',
      title: 'Carte trajets',
      description: 'Visualiser vos envois',
      icon: MapPin,
      color: 'bg-purple-600',
      action: () => onNavigate?.('map')
    },
    {
      id: 'subscription',
      title: 'Abonnement',
      description: 'Gérer votre plan',
      icon: CreditCard,
      color: 'bg-orange-600',
      action: () => onNavigate?.('subscription')
    },
    {
      id: 'demo',
      title: 'Planifier démo',
      description: 'Réserver une démonstration',
      icon: Calendar,
      color: 'bg-indigo-600',
      action: () => onNavigate?.('demo-scheduler')
    },
    {
      id: 'reports',
      title: 'Rapports',
      description: 'Analyser vos performances',
      icon: FileText,
      color: 'bg-gray-600',
      action: () => onNavigate?.('reports')
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions rapides</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={action.action}
            >
              <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-gray-600">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}