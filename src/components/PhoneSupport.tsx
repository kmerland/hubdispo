// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { Phone, Clock, Calendar, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useLanguage } from "./LanguageProvider";

interface PhoneSupportProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function PhoneSupport({ onNavigate }: PhoneSupportProps) {
  const { language } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<'immediate' | 'scheduled'>('immediate');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    preferredTime: '',
    subject: '',
    description: '',
    urgency: 'normal'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentTime = new Date();
  const isBusinessHours = currentTime.getHours() >= 9 && currentTime.getHours() < 17 && 
                         currentTime.getDay() >= 1 && currentTime.getDay() <= 5;

  const supportTeam = [
    {
      name: "Sophie Durand",
      role: "Support Technique",
      specialty: "Consolidation & Envois",
      availability: "9h-17h",
      languages: ["FR", "EN"],
      avatar: "S"
    },
    {
      name: "Marc Janssen",
      role: "Expert Douanier",
      specialty: "Documents & Réglementations",
      availability: "9h-17h",
      languages: ["FR", "NL", "EN"],
      avatar: "M"
    },
    {
      name: "Laura Van Berg",
      role: "Support Commercial",
      specialty: "Tarification & Abonnements",
      availability: "9h-17h",
      languages: ["NL", "FR", "EN"],
      avatar: "L"
    }
  ];

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold mb-2">Demande envoyée avec succès !</h1>
            <p className="text-gray-600">
              {selectedOption === 'immediate' 
                ? "Nous vous rappelons dans les 5 prochaines minutes au " + formData.phone
                : "Votre rendez-vous téléphonique est confirmé pour " + formData.preferredTime
              }
            </p>
          </div>
          <div className="space-y-4">
            <Card className="text-left max-w-md mx-auto">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Détails de votre demande :</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Nom :</strong> {formData.name}</div>
                  <div><strong>Entreprise :</strong> {formData.company}</div>
                  <div><strong>Téléphone :</strong> {formData.phone}</div>
                  <div><strong>Sujet :</strong> {formData.subject}</div>
                  <div><strong>Urgence :</strong> 
                    <Badge className={`ml-2 ${
                      formData.urgency === 'high' ? 'bg-red-100 text-red-700' :
                      formData.urgency === 'normal' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {formData.urgency === 'high' ? 'Élevée' : 
                       formData.urgency === 'normal' ? 'Normale' : 'Faible'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button onClick={() => onNavigate?.('help')} variant="outline">
              Retour au centre d'aide
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
      {/* En-tête */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate?.('help')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au centre d'aide
        </Button>
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto">
            <Phone className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">Support téléphonique</h1>
            <p className="text-gray-600 text-lg">Parlez directement avec nos experts</p>
          </div>
        </div>

        {/* Statut de disponibilité */}
        <Card className="border-l-4 border-l-[#10B981]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isBusinessHours ? 'bg-green-500' : 'bg-amber-500'}`}></div>
              <div>
                <p className="font-medium">
                  {isBusinessHours ? 'Support disponible maintenant' : 'En dehors des heures d\'ouverture'}
                </p>
                <p className="text-sm text-gray-600">
                  Lundi - Vendredi : 9h00 - 17h00 (CET)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Formulaire principal */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Demander un appel</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Type d'appel */}
                  <div className="space-y-3">
                    <Label>Type d'appel souhaité</Label>
                    <RadioGroup 
                      value={selectedOption} 
                      onValueChange={(value) => setSelectedOption(value as 'immediate' | 'scheduled')}
                      className="grid grid-cols-1 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="immediate" id="immediate" />
                        <Label htmlFor="immediate" className="flex-1">
                          <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Rappel immédiat</p>
                                <p className="text-sm text-gray-600">
                                  {isBusinessHours ? 'Rappel dans les 5 minutes' : 'Rappel dès 9h demain'}
                                </p>
                              </div>
                              {isBusinessHours && (
                                <Badge className="bg-green-100 text-green-700">Disponible</Badge>
                              )}
                            </div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="scheduled" id="scheduled" />
                        <Label htmlFor="scheduled" className="flex-1">
                          <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <div>
                              <p className="font-medium">Rendez-vous planifié</p>
                              <p className="text-sm text-gray-600">Choisissez votre créneau préféré</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Informations personnelles */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+32 2 123 45 67"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>

                  {/* Créneaux horaires pour rendez-vous planifié */}
                  {selectedOption === 'scheduled' && (
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime">Créneau préféré *</Label>
                      <Select onValueChange={(value) => handleInputChange('preferredTime', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un créneau" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Sujet */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet de votre appel *</Label>
                    <Select onValueChange={(value) => handleInputChange('subject', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un sujet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first-steps">Premiers pas sur hubdispo.be</SelectItem>
                        <SelectItem value="consolidation">Questions sur la consolidation</SelectItem>
                        <SelectItem value="customs">Assistance douanière</SelectItem>
                        <SelectItem value="tracking">Problème de suivi</SelectItem>
                        <SelectItem value="billing">Facturation et tarifs</SelectItem>
                        <SelectItem value="technical">Problème technique</SelectItem>
                        <SelectItem value="partnership">Partenariat commercial</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Niveau d'urgence */}
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Niveau d'urgence</Label>
                    <Select onValueChange={(value) => handleInputChange('urgency', value)} defaultValue="normal">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Faible - Question générale</SelectItem>
                        <SelectItem value="normal">Normal - Besoin d'assistance</SelectItem>
                        <SelectItem value="high">Élevé - Problème bloquant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description du problème (optionnel)</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez brièvement votre problème ou question..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#10B981] hover:bg-[#10B981]/90" 
                    size="lg"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {selectedOption === 'immediate' ? 'Demander un rappel immédiat' : 'Programmer l\'appel'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Équipe support et informations */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notre équipe support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportTeam.map((member, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-10 h-10 bg-[#1E40AF] text-white rounded-full flex items-center justify-center font-semibold">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <p className="text-xs text-gray-500">{member.specialty}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{member.availability}</span>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {member.languages.map((lang) => (
                          <Badge key={lang} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alternatives rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate?.('direct-chat')}
                >
                  💬 Chat en direct (immédiat)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate?.('email-support')}
                >
                  ✉️ Support par email (2h)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate?.('documentation')}
                >
                  📚 Documentation
                </Button>
              </CardContent>
            </Card>

            {!isBusinessHours && (
              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-700">En dehors des heures d'ouverture</p>
                      <p className="text-sm text-amber-600">
                        Pour une assistance immédiate, utilisez notre chat en direct disponible 24h/24.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}