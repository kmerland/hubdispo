// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X, 
  Clock, 
  Package,
  CreditCard,
  Calendar
} from 'lucide-react';

interface ImportantNotificationsProps {
  onNavigate?: (view: string, params?: any) => void;
}

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info' | 'error';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  priority: 'high' | 'medium' | 'low';
}

export default function ImportantNotifications({ onNavigate }: ImportantNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Envoi en retard',
      message: 'Votre envoi BE-2024-003 vers l\'Allemagne accuse un retard de 2h en douane.',
      action: {
        label: 'Voir détails',
        onClick: () => onNavigate?.('tracking', { shipmentId: 'BE-2024-003' })
      },
      dismissible: true,
      priority: 'high'
    },
    {
      id: '2',
      type: 'success',
      title: 'Groupe de consolidation trouvé',
      message: 'Un nouveau groupe vers Amsterdam est disponible. Économisez jusqu\'à 45%!',
      action: {
        label: 'Rejoindre',
        onClick: () => onNavigate?.('consolidation')
      },
      dismissible: true,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'info',
      title: 'Facture disponible',
      message: 'Votre facture du mois d\'octobre est prête. Montant: €127.50',
      action: {
        label: 'Télécharger',
        onClick: () => alert('Téléchargement de la facture...')
      },
      dismissible: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'info',
      title: 'Démo disponible',
      message: 'Découvrez comment économiser 60% sur vos frais douaniers. Planifiez une démonstration personnalisée.',
      action: {
        label: 'Planifier',
        onClick: () => onNavigate?.('demo-scheduler')
      },
      dismissible: true,
      priority: 'medium'
    }
  ]);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-[#10B981]" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-[#1E40AF]" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-700">Urgent</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-700">Important</Badge>;
      case 'low':
        return <Badge className="bg-gray-100 text-gray-700">Info</Badge>;
      default:
        return null;
    }
  };

  // Trier par priorité
  const sortedNotifications = [...notifications].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  if (sortedNotifications.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          <CheckCircle className="h-8 w-8 mx-auto mb-2 text-[#10B981]" />
          <p>Aucune notification importante</p>
          <p className="text-sm">Tout semble en ordre !</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {sortedNotifications.map((notification) => (
        <Card key={notification.id} className={`border ${getBackgroundColor(notification.type)}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  {getPriorityBadge(notification.priority)}
                </div>
                <p className="text-sm text-gray-700 mb-3">{notification.message}</p>
                
                <div className="flex items-center gap-2">
                  {notification.action && (
                    <Button
                      size="sm"
                      className="h-7 text-xs"
                      onClick={notification.action.onClick}
                    >
                      {notification.action.label}
                    </Button>
                  )}
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>Il y a 2h</span>
                  </div>
                </div>
              </div>
              
              {notification.dismissible && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-gray-200"
                  onClick={() => dismissNotification(notification.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      
      {sortedNotifications.length > 0 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onNavigate?.('notifications')}
          >
            Voir toutes les notifications
          </Button>
        </div>
      )}
    </div>
  );
}