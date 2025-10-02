// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Calendar, Clock, User, Building2, Phone, Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { toast } from 'sonner@2.0.3';

interface DemoSchedulerProps {
  onNavigate?: (view: string, params?: any) => void;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function DemoScheduler({ onNavigate, onSuccess, onCancel }: DemoSchedulerProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<'form' | 'schedule' | 'confirmation'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    position: '',
    employees: '',
    currentVolume: '',
    challenges: '',
    preferredDate: '',
    preferredTime: '',
    timezone: 'Europe/Brussels'
  });
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Créneaux disponibles pour la démo
  const availableSlots = [
    { id: '1', date: '2024-10-15', time: '09:00', label: 'Mar 15 Oct - 9h00' },
    { id: '2', date: '2024-10-15', time: '14:00', label: 'Mar 15 Oct - 14h00' },
    { id: '3', date: '2024-10-16', time: '10:00', label: 'Mer 16 Oct - 10h00' },
    { id: '4', date: '2024-10-16', time: '15:00', label: 'Mer 16 Oct - 15h00' },
    { id: '5', date: '2024-10-17', time: '09:30', label: 'Jeu 17 Oct - 9h30' },
    { id: '6', date: '2024-10-17', time: '16:00', label: 'Jeu 17 Oct - 16h00' },
    { id: '7', date: '2024-10-18', time: '11:00', label: 'Ven 18 Oct - 11h00' },
    { id: '8', date: '2024-10-18', time: '14:30', label: 'Ven 18 Oct - 14h30' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    setStep('schedule');
  };

  const handleScheduleSubmit = async () => {
    if (!selectedSlot) {
      toast.error('Veuillez sélectionner un créneau');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulation de l'envoi des données
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStep('confirmation');
      toast.success('Démo programmée avec succès !');
      
      // Redirection automatique après 3 secondes
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else if (onNavigate) {
          onNavigate('dashboard');
        }
      }, 3000);
    } catch (error) {
      toast.error('Erreur lors de la programmation');
      setIsSubmitting(false);
    }
  };

  const getSelectedSlotDetails = () => {
    return availableSlots.find(slot => slot.id === selectedSlot);
  };

  if (step === 'confirmation') {
    const slotDetails = getSelectedSlotDetails();
    
    return (
      <div className="max-w-2xl mx-auto px-4 lg:px-6 py-12">
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Démo confirmée !</h1>
            <p className="text-gray-600 mb-6">
              Merci {formData.name} ! Votre démonstration personnalisée est programmée.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold mb-4">Détails de votre rendez-vous :</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#1E40AF]" />
                  <div>
                    <p className="font-medium">{slotDetails?.label}</p>
                    <p className="text-sm text-gray-600">Durée : 45 minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-[#1E40AF]" />
                  <div>
                    <p className="font-medium">{formData.name}</p>
                    <p className="text-sm text-gray-600">{formData.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#1E40AF]" />
                  <p>{formData.email}</p>
                </div>
                {formData.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#1E40AF]" />
                    <p>{formData.phone}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Préparez votre démo :</h4>
              <ul className="text-sm text-blue-800 text-left space-y-1">
                <li>• Un lien de visioconférence vous sera envoyé par email</li>
                <li>• Préparez vos questions sur vos besoins logistiques</li>
                <li>• Ayez vos données d'envoi récentes à portée de main</li>
                <li>• Notre expert vous montrera comment économiser jusqu'à 60%</li>
              </ul>
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
                Voir les plans
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
          <h1 className="text-2xl font-semibold">Planifier une démonstration</h1>
          <p className="text-gray-600">Découvrez comment hubdispo.be peut transformer votre logistique</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Formulaire principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 'form' ? 'bg-[#1E40AF] text-white' : 'bg-[#10B981] text-white'
            }`}>
              {step === 'form' ? '1' : <CheckCircle className="h-5 w-5" />}
            </div>
            <span className={step === 'form' ? 'text-[#1E40AF] font-medium' : 'text-[#10B981]'}>
              Informations
            </span>
            <div className="flex-1 h-0.5 bg-gray-200" />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 'schedule' ? 'bg-[#1E40AF] text-white' : 
              step === 'form' ? 'bg-gray-200 text-gray-500' : 'bg-[#10B981] text-white'
            }`}>
              {step === 'confirmation' ? <CheckCircle className="h-5 w-5" /> : '2'}
            </div>
            <span className={`${
              step === 'schedule' ? 'text-[#1E40AF] font-medium' : 
              step === 'confirmation' ? 'text-[#10B981]' : 'text-gray-500'
            }`}>
              Créneaux
            </span>
          </div>

          {step === 'form' && (
            <Card>
              <CardHeader>
                <CardTitle>Parlez-nous de votre entreprise</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div>
                      <Label htmlFor="email">Email professionnel *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="jean.dupont@entreprise.be"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+32 2 123 45 67"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="position">Votre fonction</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        placeholder="Responsable Export, PDG..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="employees">Nombre d'employés</Label>
                      <select 
                        id="employees"
                        value={formData.employees}
                        onChange={(e) => handleInputChange('employees', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="1-5">1-5 employés</option>
                        <option value="6-20">6-20 employés</option>
                        <option value="21-50">21-50 employés</option>
                        <option value="51-200">51-200 employés</option>
                        <option value="200+">Plus de 200 employés</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="currentVolume">Volume d'envois mensuel actuel</Label>
                    <select 
                      id="currentVolume"
                      value={formData.currentVolume}
                      onChange={(e) => handleInputChange('currentVolume', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="1-5">1-5 envois/mois</option>
                      <option value="6-20">6-20 envois/mois</option>
                      <option value="21-50">21-50 envois/mois</option>
                      <option value="51-100">51-100 envois/mois</option>
                      <option value="100+">Plus de 100 envois/mois</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="challenges">Vos principaux défis logistiques (optionnel)</Label>
                    <Textarea
                      id="challenges"
                      value={formData.challenges}
                      onChange={(e) => handleInputChange('challenges', e.target.value)}
                      placeholder="Ex: Coûts élevés, complexité douanière, délais imprévisibles..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                    Choisir un créneau
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 'schedule' && (
            <Card>
              <CardHeader>
                <CardTitle>Choisissez votre créneau</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {availableSlots.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedSlot === slot.id 
                          ? 'border-[#1E40AF] bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-[#1E40AF]" />
                        <div>
                          <p className="font-medium">{slot.label}</p>
                          <p className="text-sm text-gray-600">45 minutes</p>
                        </div>
                        {selectedSlot === slot.id && (
                          <CheckCircle className="h-5 w-5 text-[#10B981] ml-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep('form')}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button 
                    onClick={handleScheduleSubmit}
                    disabled={!selectedSlot || isSubmitting}
                    className="flex-1 bg-[#10B981] hover:bg-[#10B981]/90"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Confirmation...
                      </div>
                    ) : (
                      'Confirmer la démo'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar informative */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ce que vous découvrirez</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#10B981]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-[#10B981]" />
                </div>
                <div>
                  <p className="font-medium text-sm">Consolidation automatique</p>
                  <p className="text-xs text-gray-600">Réduisez vos coûts jusqu'à 60%</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#10B981]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-[#10B981]" />
                </div>
                <div>
                  <p className="font-medium text-sm">Automatisation douanière</p>
                  <p className="text-xs text-gray-600">IA qui gère vos déclarations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#10B981]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-[#10B981]" />
                </div>
                <div>
                  <p className="font-medium text-sm">Suivi en temps réel</p>
                  <p className="text-xs text-gray-600">Visibilité complète de vos envois</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#10B981]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-[#10B981]" />
                </div>
                <div>
                  <p className="font-medium text-sm">Intégration simple</p>
                  <p className="text-xs text-gray-600">API et connecteurs e-commerce</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#1E40AF]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-6 w-6 text-[#1E40AF]" />
                </div>
                <h4 className="font-medium mb-2">Expert dédié</h4>
                <p className="text-sm text-gray-600">
                  Un spécialiste logistique analysera vos besoins et vous montrera 
                  les économies possibles en direct.
                </p>
              </div>
            </CardContent>
          </Card>

          {step === 'form' && formData.company && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-[#1E40AF]" />
                  <div>
                    <p className="font-medium text-sm">Démo personnalisée pour :</p>
                    <p className="text-[#1E40AF]">{formData.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}