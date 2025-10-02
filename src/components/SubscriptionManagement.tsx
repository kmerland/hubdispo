// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  CreditCard, 
  Calendar, 
  Download, 
  AlertCircle, 
  CheckCircle, 
  Settings, 
  Receipt,
  Crown,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { toast } from 'sonner@2.0.3';

interface SubscriptionManagementProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function SubscriptionManagement({ onNavigate }: SubscriptionManagementProps) {
  const { t } = useLanguage();
  const [showChangeCard, setShowChangeCard] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulation des données d'abonnement
  const subscription = {
    id: 'sub_1234567890',
    status: 'active',
    plan: {
      name: 'Premium',
      price: 49,
      currency: 'EUR',
      interval: 'month'
    },
    current_period_start: new Date('2024-01-01'),
    current_period_end: new Date('2024-02-01'),
    trial_end: null,
    cancel_at_period_end: false,
    created: new Date('2024-01-01'),
    customer: {
      email: 'jean.dupont@exemple.com',
      name: 'Jean Dupont',
      company: 'Dupont Export SPRL'
    }
  };

  const paymentMethod = {
    id: 'pm_1234567890',
    type: 'card',
    card: {
      brand: 'visa',
      last4: '4242',
      exp_month: 12,
      exp_year: 2025
    }
  };

  // Simulation de l'historique des factures
  const invoices = [
    {
      id: 'in_202401001',
      number: 'HUB-2024-001',
      status: 'paid',
      amount: 49,
      currency: 'EUR',
      created: new Date('2024-01-01'),
      period_start: new Date('2024-01-01'),
      period_end: new Date('2024-02-01'),
      pdf_url: '#'
    },
    {
      id: 'in_202312001',
      number: 'HUB-2023-012',
      status: 'paid',
      amount: 49,
      currency: 'EUR',
      created: new Date('2023-12-01'),
      period_start: new Date('2023-12-01'),
      period_end: new Date('2024-01-01'),
      pdf_url: '#'
    }
  ];

  const usage = {
    shipments_current: 127,
    shipments_limit: 'unlimited',
    api_calls_current: 2340,
    api_calls_limit: 'unlimited',
    customs_declarations: 89,
    storage_used: '2.3 GB',
    storage_limit: '10 GB'
  };

  const handleUpdatePaymentMethod = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Méthode de paiement mise à jour avec succès');
      setShowChangeCard(false);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelSubscription = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Votre abonnement sera annulé à la fin de la période actuelle');
      setShowCancelDialog(false);
    } catch (error) {
      toast.error('Erreur lors de l\'annulation');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadInvoice = (invoice: any) => {
    toast.success(`Téléchargement de la facture ${invoice.number}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-[#10B981] text-white">Actif</Badge>;
      case 'trialing':
        return <Badge className="bg-blue-500 text-white">Période d'essai</Badge>;
      case 'past_due':
        return <Badge variant="destructive">Impayé</Badge>;
      case 'canceled':
        return <Badge variant="secondary">Annulé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Gestion de l'abonnement</h1>
          <p className="text-gray-600">Gérez votre plan, facturation et utilisation</p>
        </div>
        <Button
          onClick={() => onNavigate?.('subscription')}
          className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
        >
          Changer de plan
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statut de l'abonnement */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-[#1E40AF]" />
                  Plan actuel
                </CardTitle>
                {getStatusBadge(subscription.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{subscription.plan.name}</h3>
                  <p className="text-gray-600">
                    &euro;{subscription.plan.price}/{subscription.plan.interval === 'month' ? 'mois' : 'an'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Prochain renouvellement</p>
                  <p className="font-medium">
                    {subscription.current_period_end.toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              {subscription.cancel_at_period_end && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Abonnement à résilier</p>
                      <p className="text-sm text-yellow-700">
                        Votre abonnement sera annulé le {subscription.current_period_end.toLocaleDateString('fr-FR')}. 
                        Vous pouvez le réactiver à tout moment.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">Membre depuis</p>
                  <p className="font-medium">{subscription.created.toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">Envois ce mois</p>
                  <p className="font-medium">{usage.shipments_current}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600">Déclarations douanières</p>
                  <p className="font-medium">{usage.customs_declarations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Méthode de paiement */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Méthode de paiement
                </CardTitle>
                <Dialog open={showChangeCard} onOpenChange={setShowChangeCard}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Modifier la méthode de paiement</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Numéro de carte</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiration</Label>
                          <Input id="expiry" placeholder="MM/AA" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setShowChangeCard(false)}
                          className="flex-1"
                        >
                          Annuler
                        </Button>
                        <Button
                          onClick={handleUpdatePaymentMethod}
                          disabled={isProcessing}
                          className="flex-1 bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                        >
                          {isProcessing ? 'Mise à jour...' : 'Confirmer'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• {paymentMethod.card.last4}</p>
                  <p className="text-sm text-gray-600">
                    Expire {paymentMethod.card.exp_month.toString().padStart(2, '0')}/{paymentMethod.card.exp_year}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historique des factures */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Historique des factures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Receipt className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{invoice.number}</p>
                        <p className="text-sm text-gray-600">
                          {invoice.created.toLocaleDateString('fr-FR')} • 
                          &euro;{invoice.amount}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={invoice.status === 'paid' ? 'bg-[#10B981] text-white' : 'bg-red-500 text-white'}
                      >
                        {invoice.status === 'paid' ? 'Payée' : 'Impayée'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadInvoice(invoice)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne latérale */}
        <div className="space-y-6">
          {/* Utilisation */}
          <Card>
            <CardHeader>
              <CardTitle>Utilisation ce mois</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Envois</span>
                  <span>{usage.shipments_current}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#10B981] h-2 rounded-full w-1/3"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Illimité</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Appels API</span>
                  <span>{usage.api_calls_current.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Illimité</p>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Stockage</span>
                  <span>{usage.storage_used}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full w-1/5"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">sur {usage.storage_limit}</p>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Support Premium</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#10B981]" />
                <span className="text-sm">Chat prioritaire 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#10B981]" />
                <span className="text-sm">Gestionnaire de compte dédié</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#10B981]" />
                <span className="text-sm">Support téléphonique</span>
              </div>
              <Button 
                className="w-full mt-4"
                onClick={() => onNavigate?.('direct-chat')}
              >
                Contacter le support
              </Button>
            </CardContent>
          </Card>

          {/* Actions d'abonnement */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onNavigate?.('subscription')}
              >
                Changer de plan
              </Button>
              
              <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                    Annuler l'abonnement
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmer l'annulation</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800">Attention</p>
                          <p className="text-sm text-yellow-700">
                            Votre abonnement sera annulé à la fin de la période de facturation actuelle.
                            Vous conserverez l'accès jusqu'au {subscription.current_period_end.toLocaleDateString('fr-FR')}.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowCancelDialog(false)}
                        className="flex-1"
                      >
                        Conserver l'abonnement
                      </Button>
                      <Button
                        onClick={handleCancelSubscription}
                        disabled={isProcessing}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      >
                        {isProcessing ? 'Annulation...' : 'Confirmer l\'annulation'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}