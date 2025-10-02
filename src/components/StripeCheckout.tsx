// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CheckCircle, CreditCard, Lock, ArrowLeft, Star, Shield, AlertCircle, Banknote } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { toast } from 'sonner@2.0.3';

interface StripeCheckoutProps {
  planType: 'premium' | 'annual';
  onNavigate?: (view: string, params?: any) => void;
  onSuccess?: () => void;
  onCancel?: () => void;
}

// Simulation des configurations Stripe
const STRIPE_CONFIG = {
  publishableKey: 'pk_test_51234567890abcdef...',
  priceIds: {
    premium: 'price_1234567890premium',
    annual: 'price_1234567890annual'
  },
  webhookEndpoint: '/api/stripe/webhook'
};

export default function StripeCheckout({ 
  planType, 
  onNavigate, 
  onSuccess, 
  onCancel 
}: StripeCheckoutProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    country: 'BE',
    vatNumber: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'billing' | 'payment' | 'success'>('billing');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'sepa' | 'bancontact'>('card');
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number} | null>(null);
  const [stripeReady, setStripeReady] = useState(false);

  const planDetails = {
    premium: {
      name: 'Premium',
      price: 49,
      frequency: 'mois',
      savings: 0,
      trial: 14,
      features: [
        'Envois illimités',
        'Automatisation douanière complète',
        'Représentation douanière incluse',
        'Support prioritaire 24/7',
        'API d\'intégration',
        'Gestionnaire de compte dédié'
      ]
    },
    annual: {
      name: 'Premium Annuel',
      price: 490,
      frequency: 'an',
      savings: 98,
      trial: 14,
      features: [
        'Envois illimités',
        'Automatisation douanière complète',
        'Représentation douanière incluse',
        'Support prioritaire 24/7',
        'API d\'intégration',
        'Gestionnaire de compte dédié',
        '2 mois gratuits'
      ]
    }
  };

  const currentPlan = planDetails[planType];

  // Simulation du chargement de Stripe
  useEffect(() => {
    const loadStripe = async () => {
      // Simulation du chargement de Stripe
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStripeReady(true);
    };
    loadStripe();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePromoCode = () => {
    const validPromoCodes = {
      'WELCOME10': { discount: 10, type: 'percentage' },
      'HUBDISPO15': { discount: 15, type: 'percentage' },
      'FIRST30': { discount: 30, type: 'fixed' }
    };

    const promo = validPromoCodes[promoCode.toUpperCase() as keyof typeof validPromoCodes];
    if (promo) {
      setAppliedPromo({ code: promoCode.toUpperCase(), discount: promo.discount });
      toast.success(`Code promo appliqué ! ${promo.type === 'percentage' ? promo.discount + '%' : '€' + promo.discount} de réduction`);
    } else {
      toast.error('Code promo invalide');
    }
  };

  const getDiscountedPrice = () => {
    if (!appliedPromo) return currentPlan.price;
    
    if (appliedPromo.code === 'FIRST30') {
      return Math.max(0, currentPlan.price - appliedPromo.discount);
    } else {
      return Math.round(currentPlan.price * (1 - appliedPromo.discount / 100));
    }
  };

  const handleBillingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.company || !formData.address || !formData.city || !formData.postalCode) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Veuillez saisir une adresse email valide');
      return;
    }
    
    // Validation numéro TVA belge si renseigné
    if (formData.vatNumber && formData.country === 'BE') {
      const beVatRegex = /^BE[0-9]{10}$/;
      if (!beVatRegex.test(formData.vatNumber)) {
        toast.error('Format de numéro TVA belge invalide (ex: BE0123456789)');
        return;
      }
    }
    
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreementAccepted) {
      toast.error('Vous devez accepter les conditions générales');
      return;
    }
    
    setIsProcessing(true);

    // Simulation d'un traitement de paiement Stripe réaliste
    try {
      toast.info('Validation des informations de paiement...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulation de la création du PaymentMethod
      toast.info('Traitement du paiement en cours...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulation de la création de l'abonnement
      toast.info('Création de votre abonnement...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sauvegarde des données client (simulation)
      const subscriptionData = {
        customer: {
          email: formData.email,
          name: formData.name,
          company: formData.company,
          address: {
            line1: formData.address,
            city: formData.city,
            postal_code: formData.postalCode,
            country: formData.country
          },
          tax_exempt: formData.vatNumber ? 'reverse' : 'none',
          metadata: {
            vat_number: formData.vatNumber,
            plan_type: planType,
            promo_code: appliedPromo?.code || null
          }
        },
        subscription: {
          price_id: STRIPE_CONFIG.priceIds[planType],
          payment_method: paymentMethod,
          billing_cycle_anchor: new Date().toISOString(),
          trial_end: planType === 'premium' ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() : null
        },
        payment: {
          amount: getDiscountedPrice() * 100, // en centimes
          currency: 'eur',
          payment_method_types: [paymentMethod],
          metadata: {
            hubdispo_plan: planType,
            hubdispo_company: formData.company
          }
        }
      };
      
      console.log('Subscription created:', subscriptionData);
      
      // Simulation d'un paiement réussi
      setStep('success');
      toast.success('Paiement traité avec succès !');
      
      // Simulation d'envoi d'email de confirmation
      setTimeout(() => {
        toast.success('Email de confirmation envoyé à ' + formData.email);
      }, 1000);
      
      // Redirection vers le succès après 3 secondes
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else if (onNavigate) {
          onNavigate('dashboard');
        }
      }, 3000);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Erreur lors du traitement du paiement. Veuillez réessayer.');
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 lg:px-6 py-12">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Paiement confirmé !</h1>
            <p className="text-gray-600 mb-6">
              Bienvenue dans le plan {currentPlan.name}. Votre abonnement est maintenant actif.
            </p>
            
            {currentPlan.trial > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-700 mb-2">
                  <Star className="h-4 w-4" />
                  <span className="font-medium">Période d'essai gratuite</span>
                </div>
                <p className="text-sm text-blue-600">
                  Vous bénéficiez de {currentPlan.trial} jours d'essai gratuit. 
                  Le premier paiement aura lieu le {new Date(Date.now() + currentPlan.trial * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}.
                </p>
              </div>
            )}
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span>Plan {currentPlan.name}</span>
                <span className="font-semibold">&euro;{getDiscountedPrice()}/{currentPlan.frequency}</span>
              </div>
              {appliedPromo && (
                <div className="text-sm text-[#10B981] mt-2">
                  Code promo "{appliedPromo.code}" appliqué
                </div>
              )}
              {currentPlan.savings > 0 && (
                <div className="text-sm text-[#10B981] mt-2">
                  Vous économisez &euro;{currentPlan.savings} par an !
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                onClick={() => onNavigate?.('dashboard')}
              >
                Accéder au dashboard
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onNavigate?.('subscription')}
              >
                Gérer mon abonnement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onCancel ? onCancel() : onNavigate?.('subscription')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Finaliser votre abonnement</h1>
          <p className="text-gray-600">Plan {currentPlan.name} - &euro;{getDiscountedPrice()}/{currentPlan.frequency}</p>
        </div>
      </div>

      {/* Stripe Loading */}
      {!stripeReady && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-blue-700">
            <div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
            <span className="font-medium">Chargement du système de paiement sécurisé...</span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 'billing' ? 'bg-[#1E40AF] text-white' : 'bg-[#10B981] text-white'
            }`}>
              {step === 'billing' ? '1' : <CheckCircle className="h-5 w-5" />}
            </div>
            <span className={step === 'billing' ? 'text-[#1E40AF] font-medium' : 'text-[#10B981]'}>
              Informations de facturation
            </span>
            <div className="flex-1 h-0.5 bg-gray-200" />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 'payment' ? 'bg-[#1E40AF] text-white' : step === 'billing' ? 'bg-gray-200 text-gray-500' : 'bg-[#10B981] text-white'
            }`}>
              {step === 'success' ? <CheckCircle className="h-5 w-5" /> : '2'}
            </div>
            <span className={`${
              step === 'payment' ? 'text-[#1E40AF] font-medium' : 
              step === 'success' ? 'text-[#10B981]' : 'text-gray-500'
            }`}>
              Paiement
            </span>
          </div>

          {step === 'billing' && (
            <Card>
              <CardHeader>
                <CardTitle>Informations de facturation</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBillingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Jean Dupont"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Entreprise *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Nom de votre entreprise"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Adresse *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Rue et numéro"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Bruxelles"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Code postal *</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        placeholder="1000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">Pays *</Label>
                      <select 
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                        required
                      >
                        <option value="BE">Belgique</option>
                        <option value="FR">France</option>
                        <option value="NL">Pays-Bas</option>
                        <option value="DE">Allemagne</option>
                        <option value="LU">Luxembourg</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="vatNumber">Numéro de TVA</Label>
                      <Input
                        id="vatNumber"
                        value={formData.vatNumber}
                        onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                        placeholder="BE0123456789"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Optionnel - Pour l'exonération de TVA
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                    Continuer vers le paiement
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 'payment' && (
            <>
              {/* Méthodes de paiement */}
              <Card>
                <CardHeader>
                  <CardTitle>Méthode de paiement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 border rounded-lg flex items-center gap-2 text-sm ${
                        paymentMethod === 'card' ? 'border-[#1E40AF] bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      Carte bancaire
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('sepa')}
                      className={`p-3 border rounded-lg flex items-center gap-2 text-sm ${
                        paymentMethod === 'sepa' ? 'border-[#1E40AF] bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <Banknote className="h-4 w-4" />
                      Virement SEPA
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bancontact')}
                      className={`p-3 border rounded-lg flex items-center gap-2 text-sm ${
                        paymentMethod === 'bancontact' ? 'border-[#1E40AF] bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <Shield className="h-4 w-4" />
                      Bancontact
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Informations de paiement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Informations de paiement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-blue-700">
                      <Lock className="h-4 w-4" />
                      <span className="text-sm font-medium">Paiement sécurisé par Stripe</span>
                    </div>
                    <p className="text-sm text-blue-600 mt-1">
                      Vos informations de paiement sont chiffrées et sécurisées selon les standards PCI DSS
                    </p>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    {paymentMethod === 'card' && (
                      <>
                        <div>
                          <Label htmlFor="cardNumber">Numéro de carte *</Label>
                          <Input
                            id="cardNumber"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Date d'expiration *</Label>
                            <Input
                              id="expiryDate"
                              value={formData.expiryDate}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length >= 2) {
                                  value = value.substring(0, 2) + '/' + value.substring(2, 4);
                                }
                                handleInputChange('expiryDate', value);
                              }}
                              placeholder="MM/AA"
                              maxLength={5}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              type="password"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                              placeholder="123"
                              maxLength={4}
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {paymentMethod === 'sepa' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-yellow-800">Paiement par virement SEPA</p>
                            <p className="text-sm text-yellow-700 mt-1">
                              Après validation, vous recevrez les instructions de virement par email. 
                              Votre abonnement sera activé dès réception du paiement (1-2 jours ouvrés).
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'bancontact' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800">Paiement Bancontact</p>
                            <p className="text-sm text-blue-700 mt-1">
                              Vous serez redirigé vers votre banque pour valider le paiement de manière sécurisée.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="agreement"
                        checked={agreementAccepted}
                        onChange={(e) => setAgreementAccepted(e.target.checked)}
                        className="mt-1"
                        required
                      />
                      <label htmlFor="agreement" className="text-sm text-gray-600">
                        J'accepte les{' '}
                        <button
                          type="button"
                          onClick={() => onNavigate?.('terms')}
                          className="text-[#1E40AF] underline"
                        >
                          conditions générales
                        </button>
                        {' '}et confirme avoir lu la{' '}
                        <button
                          type="button"
                          onClick={() => onNavigate?.('privacy')}
                          className="text-[#1E40AF] underline"
                        >
                          politique de confidentialité
                        </button>
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setStep('billing')}
                        className="flex-1"
                      >
                        Retour
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isProcessing || !stripeReady || !agreementAccepted}
                        className="flex-1 bg-[#10B981] hover:bg-[#10B981]/90"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Traitement...
                          </div>
                        ) : (
                          `Payer &euro;${getDiscountedPrice()}`
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Récapitulatif */}
        <div className="space-y-6">
          {/* Code promo */}
          {!appliedPromo && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Code promo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Entrez votre code"
                    className="flex-1"
                  />
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={handlePromoCode}
                    disabled={!promoCode}
                  >
                    Appliquer
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Codes disponibles : WELCOME10, HUBDISPO15, FIRST30
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-[#1E40AF]" />
                Récapitulatif
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{currentPlan.name}</p>
                    <p className="text-sm text-gray-600">
                      Facturation {currentPlan.frequency === 'mois' ? 'mensuelle' : 'annuelle'}
                    </p>
                  </div>
                  <div className="text-right">
                    {appliedPromo && (
                      <p className="text-sm text-gray-500 line-through">&euro;{currentPlan.price}</p>
                    )}
                    <p className="font-semibold">&euro;{getDiscountedPrice()}</p>
                  </div>
                </div>
                
                {appliedPromo && (
                  <div className="bg-[#10B981]/10 text-[#10B981] px-3 py-2 rounded-lg text-sm">
                    Code "{appliedPromo.code}" appliqué
                  </div>
                )}
                
                {currentPlan.savings > 0 && (
                  <div className="bg-[#10B981]/10 text-[#10B981] px-3 py-2 rounded-lg text-sm">
                    Économie de &euro;{currentPlan.savings} par an
                  </div>
                )}

                {currentPlan.trial > 0 && (
                  <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm">
                    Inclut {currentPlan.trial} jours d'essai gratuit
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="font-medium text-sm">Inclus dans votre plan :</p>
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-[#10B981]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>&euro;{getDiscountedPrice()}</span>
              </div>
              
              <p className="text-xs text-gray-500">
                TVA incluse selon la réglementation européenne
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#10B981]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-[#10B981]" />
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Garantie satisfait ou remboursé</p>
                  <p className="text-gray-600">
                    Annulez à tout moment dans les 30 premiers jours pour un remboursement complet
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Paiement sécurisé</p>
                  <p className="text-gray-600">
                    Powered by Stripe - Leader mondial des paiements en ligne
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}