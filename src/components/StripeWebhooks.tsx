// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Webhook, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Code,
  Zap,
  Shield,
  Copy,
  RefreshCw,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { toast } from 'sonner@2.0.3';

interface StripeWebhooksProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function StripeWebhooks({ onNavigate }: StripeWebhooksProps) {
  const { t } = useLanguage();
  const [webhookUrl, setWebhookUrl] = useState('https://api.hubdispo.be/webhooks/stripe');
  const [webhookSecret, setWebhookSecret] = useState('whsec_1234567890abcdef...');
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedEvents, setSelectedEvents] = useState([
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
    'invoice.payment_succeeded',
    'invoice.payment_failed',
    'payment_method.attached'
  ]);

  // Simulation des événements webhook
  const webhookEvents = [
    {
      id: 'evt_1234567890',
      type: 'invoice.payment_succeeded',
      status: 'succeeded',
      created: new Date('2024-01-15T10:30:00Z'),
      attempts: 1,
      data: {
        object: {
          id: 'in_1234567890',
          amount_paid: 5929,
          currency: 'eur',
          customer: 'cus_1234567890',
          subscription: 'sub_1234567890'
        }
      },
      response: {
        status: 200,
        body: '{"status": "ok"}'
      }
    },
    {
      id: 'evt_1234567891',
      type: 'customer.subscription.updated',
      status: 'succeeded',
      created: new Date('2024-01-14T15:45:00Z'),
      attempts: 1,
      data: {
        object: {
          id: 'sub_1234567890',
          status: 'active',
          current_period_end: 1707696000,
          customer: 'cus_1234567890'
        }
      },
      response: {
        status: 200,
        body: '{"status": "ok"}'
      }
    },
    {
      id: 'evt_1234567892',
      type: 'payment_method.attached',
      status: 'failed',
      created: new Date('2024-01-13T09:15:00Z'),
      attempts: 3,
      data: {
        object: {
          id: 'pm_1234567890',
          type: 'card',
          customer: 'cus_1234567890'
        }
      },
      response: {
        status: 500,
        body: '{"error": "Internal server error"}'
      }
    }
  ];

  const availableEvents = [
    { 
      name: 'customer.subscription.created', 
      description: 'Nouvel abonnement créé',
      category: 'Abonnements'
    },
    { 
      name: 'customer.subscription.updated', 
      description: 'Abonnement modifié',
      category: 'Abonnements'
    },
    { 
      name: 'customer.subscription.deleted', 
      description: 'Abonnement supprimé',
      category: 'Abonnements'
    },
    { 
      name: 'invoice.payment_succeeded', 
      description: 'Paiement de facture réussi',
      category: 'Paiements'
    },
    { 
      name: 'invoice.payment_failed', 
      description: 'Échec de paiement de facture',
      category: 'Paiements'
    },
    { 
      name: 'payment_method.attached', 
      description: 'Méthode de paiement ajoutée',
      category: 'Paiements'
    },
    { 
      name: 'customer.created', 
      description: 'Nouveau client créé',
      category: 'Clients'
    },
    { 
      name: 'customer.updated', 
      description: 'Client modifié',
      category: 'Clients'
    }
  ];

  const handleSaveWebhook = async () => {
    toast.info('Sauvegarde de la configuration webhook...');
    
    // Simulation de la sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Configuration webhook sauvegardée avec succès');
  };

  const handleTestWebhook = async () => {
    toast.info('Envoi d\'un événement de test...');
    
    // Simulation du test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Événement de test envoyé avec succès');
  };

  const handleRetryEvent = async (eventId: string) => {
    toast.info('Nouvelle tentative d\'envoi...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Événement renvoyé avec succès');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copié dans le presse-papiers');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <Badge className="bg-[#10B981] text-white">Succès</Badge>;
      case 'failed':
        return <Badge variant="destructive">Échec</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 text-white">En attente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getEventIcon = (type: string) => {
    if (type.includes('subscription')) {
      return <Zap className="h-4 w-4" />;
    } else if (type.includes('payment') || type.includes('invoice')) {
      return <CheckCircle className="h-4 w-4" />;
    } else if (type.includes('customer')) {
      return <Shield className="h-4 w-4" />;
    }
    return <Webhook className="h-4 w-4" />;
  };

  const toggleEvent = (eventName: string) => {
    setSelectedEvents(prev => 
      prev.includes(eventName) 
        ? prev.filter(e => e !== eventName)
        : [...prev, eventName]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Configuration Webhooks Stripe</h1>
          <p className="text-gray-600">Gérez les événements en temps réel de votre intégration Stripe</p>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
            id="webhook-enabled"
          />
          <Label htmlFor="webhook-enabled" className="text-sm font-medium">
            Webhooks activés
          </Label>
        </div>
      </div>

      {!isEnabled && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Webhooks désactivés</p>
                <p className="text-sm text-yellow-700">
                  Les événements Stripe ne seront pas traités automatiquement. 
                  Activez les webhooks pour une synchronisation en temps réel.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="configuration" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="test">Test</TabsTrigger>
        </TabsList>

        <TabsContent value="configuration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuration du webhook
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">URL du webhook *</Label>
                <div className="flex gap-2">
                  <Input
                    id="webhook-url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://votre-app.com/webhooks/stripe"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(webhookUrl)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  URL publique accessible où Stripe enverra les événements
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-secret">Secret de signature</Label>
                <div className="flex gap-2">
                  <Input
                    id="webhook-secret"
                    type="password"
                    value={webhookSecret}
                    onChange={(e) => setWebhookSecret(e.target.value)}
                    placeholder="whsec_..."
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(webhookSecret)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Utilisé pour vérifier l'authenticité des événements Stripe
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">Sécurité</p>
                    <p className="text-sm text-blue-700">
                      Vérifiez toujours la signature des webhooks pour vous assurer qu'ils proviennent de Stripe.
                      Le secret de signature est fourni dans votre dashboard Stripe.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleSaveWebhook}
                  className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                  disabled={!isEnabled}
                >
                  Sauvegarder la configuration
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleTestWebhook}
                  disabled={!isEnabled}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Tester la connexion
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Événements surveillés</CardTitle>
              <p className="text-sm text-gray-600">
                Sélectionnez les événements Stripe que vous souhaitez recevoir
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {['Abonnements', 'Paiements', 'Clients'].map(category => (
                  <div key={category}>
                    <h4 className="font-medium mb-3">{category}</h4>
                    <div className="space-y-2">
                      {availableEvents
                        .filter(event => event.category === category)
                        .map(event => (
                          <div key={event.name} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {getEventIcon(event.name)}
                              <div>
                                <p className="font-medium text-sm">{event.name}</p>
                                <p className="text-xs text-gray-600">{event.description}</p>
                              </div>
                            </div>
                            <Switch
                              checked={selectedEvents.includes(event.name)}
                              onCheckedChange={() => toggleEvent(event.name)}
                              disabled={!isEnabled}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t">
                <p className="text-sm text-gray-500 mb-3">
                  {selectedEvents.length} événement(s) sélectionné(s)
                </p>
                <Button 
                  onClick={handleSaveWebhook}
                  disabled={!isEnabled}
                >
                  Mettre à jour les événements
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Historique des événements</CardTitle>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualiser
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {webhookEvents.map((event) => (
                  <div key={event.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          {getEventIcon(event.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{event.type}</p>
                            {getStatusBadge(event.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {event.created.toLocaleString('fr-FR')}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>ID: {event.id}</span>
                            <span>Tentatives: {event.attempts}</span>
                            <span>Statut HTTP: {event.response.status}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {event.status === 'failed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRetryEvent(event.id)}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Détails de la réponse */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium text-gray-600 mb-1">Données de l'événement</p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{JSON.stringify(event.data, null, 2)}
                          </pre>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600 mb-1">Réponse du serveur</p>
                          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{event.response.body}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test des webhooks</CardTitle>
              <p className="text-sm text-gray-600">
                Envoyez des événements de test pour vérifier votre intégration
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableEvents.slice(0, 6).map(event => (
                  <Button
                    key={event.name}
                    variant="outline"
                    className="h-auto p-4 text-left"
                    onClick={() => {
                      toast.info(`Envoi d'un événement de test: ${event.name}`);
                      setTimeout(() => toast.success('Événement de test envoyé'), 1000);
                    }}
                    disabled={!isEnabled}
                  >
                    <div className="flex items-center gap-2">
                      {getEventIcon(event.name)}
                      <div>
                        <p className="font-medium text-sm">{event.name}</p>
                        <p className="text-xs text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Note sur les tests</p>
                    <p className="text-sm text-yellow-700">
                      Les événements de test utilisent des données fictives et ne reflètent pas les vraies transactions.
                      Utilisez l'environnement de test Stripe pour des tests plus réalistes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="custom-payload">Événement personnalisé (JSON)</Label>
                <Textarea
                  id="custom-payload"
                  placeholder="Collez ici un payload JSON d'événement Stripe..."
                  rows={8}
                  className="font-mono text-sm"
                  disabled={!isEnabled}
                />
                <Button 
                  className="w-full"
                  disabled={!isEnabled}
                >
                  Envoyer l'événement personnalisé
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}