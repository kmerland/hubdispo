// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import React, { useState, useEffect } from "react";
import { MapPin, Package, ShieldCheck, CheckCircle, ArrowRight, ArrowLeft, Save, Send, Calculator, Clock, Euro, Truck, AlertTriangle, Upload, X, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";
import { BELGIAN_LOGISTICS_DATA, LogisticsDataGenerator } from "./LogisticsDataManager";
import { ButtonLoading } from "./LoadingStates";
import { FormValidationError } from "./ErrorStates";

interface EnhancedShipmentFormProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function EnhancedShipmentForm({ onNavigate }: EnhancedShipmentFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    origin: "Bruxelles", // Origine par défaut
    originAddress: "",
    destinationCountry: "",
    destinationCity: "",
    destinationAddress: "",
    productCategory: "",
    productType: "",
    description: "",
    hsCode: "",
    value: "",
    currency: "EUR",
    weight: "",
    length: "",
    width: "",
    height: "",
    priority: "standard",
    insurance: false,
    tracking: true,
    consolidation: true,
    urgentDelivery: false,
    specialHandling: "",
    documents: []
  });
  
  const [pricing, setPricing] = useState({
    standard: 0,
    consolidated: 0,
    urgent: 0,
    insurance: 0,
    total: 0
  });
  
  const [errors, setErrors] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  const steps = [
    { 
      number: 1, 
      title: "Origine & Destination", 
      icon: MapPin, 
      description: "Définissez l'itinéraire",
      fields: ["origin", "destinationCountry", "destinationCity"]
    },
    { 
      number: 2, 
      title: "Colis & Dimensions", 
      icon: Package, 
      description: "Spécifications physiques",
      fields: ["weight", "length", "width", "height"]
    },
    { 
      number: 3, 
      title: "Marchandise & Douane", 
      icon: ShieldCheck, 
      description: "Classification et valeur",
      fields: ["productCategory", "productType", "value", "description"]
    },
    { 
      number: 4, 
      title: "Options & Finalisation", 
      icon: CheckCircle, 
      description: "Validation et envoi",
      fields: ["priority", "insurance", "tracking"]
    }
  ];

  // Calcul automatique des prix
  useEffect(() => {
    if (formData.destinationCountry && formData.weight) {
      const weight = parseFloat(formData.weight);
      const value = parseFloat(formData.value) || 0;
      const destinationData = BELGIAN_LOGISTICS_DATA.destinations.find(d => d.country === formData.destinationCountry);
      
      if (destinationData && weight > 0) {
        const basePrice = weight * 3.2; // Prix de base par kg
        const distanceFactor = destinationData.lead_time * 0.4 + 1;
        const demandFactor = destinationData.demand / 100 + 0.9;
        
        const standardPrice = Math.round(basePrice * distanceFactor * demandFactor);
        const consolidatedPrice = Math.round(standardPrice * 0.55); // 45% d'économie
        const urgentPrice = Math.round(standardPrice * 1.9);
        const insurancePrice = Math.round(value * 0.02); // 2% de la valeur
        
        let totalPrice = formData.consolidation ? consolidatedPrice : 
                        formData.urgentDelivery ? urgentPrice : standardPrice;
        
        if (formData.insurance) totalPrice += insurancePrice;
        
        setPricing({
          standard: standardPrice,
          consolidated: consolidatedPrice,
          urgent: urgentPrice,
          insurance: insurancePrice,
          total: totalPrice
        });
        
        setShowPricing(true);
      }
    }
  }, [formData.destinationCountry, formData.weight, formData.value, formData.consolidation, formData.urgentDelivery, formData.insurance]);

  // Validation par étape
  const validateStep = (stepNumber: number) => {
    const newErrors: string[] = [];
    const step = steps[stepNumber - 1];
    
    step.fields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        const fieldNames = {
          origin: "l'origine",
          destinationCountry: "le pays de destination",
          destinationCity: "la ville de destination",
          weight: "le poids",
          length: "la longueur",
          width: "la largeur", 
          height: "la hauteur",
          productCategory: "la catégorie de produit",
          productType: "le type de produit",
          value: "la valeur déclarée",
          description: "la description"
        };
        newErrors.push(`Veuillez renseigner ${fieldNames[field as keyof typeof fieldNames] || field}`);
      }
    });
    
    // Validations spécifiques
    if (stepNumber === 2) {
      const weight = parseFloat(formData.weight);
      if (weight && (weight <= 0 || weight > 1000)) {
        newErrors.push("Le poids doit être entre 0.1 et 1000 kg");
      }
      
      const volume = parseFloat(formData.length) * parseFloat(formData.width) * parseFloat(formData.height) / 1000000; // m³
      if (volume > 2) {
        newErrors.push("Le volume ne peut pas dépasser 2 m³");
      }
    }
    
    if (stepNumber === 3) {
      const value = parseFloat(formData.value);
      if (value && value <= 0) {
        newErrors.push("La valeur déclarée doit être positive");
      }
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Navigation
  const handleNext = async () => {
    setIsValidating(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    if (validateStep(step)) {
      setStep(step + 1);
      setErrors([]);
    }
    setIsValidating(false);
  };

  const handlePrevious = () => {
    setStep(Math.max(1, step - 1));
    setErrors([]);
  };

  // Mise à jour des données
  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Effacer les erreurs liées à ce champ
    if (errors.length > 0) {
      setErrors(prev => prev.filter(error => !error.toLowerCase().includes(field)));
    }
  };

  // Sauvegarde brouillon
  const handleSaveDraft = async () => {
    setIsDraft(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const draftData = {
      ...formData,
      pricing,
      step,
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('hubdispo_shipment_draft', JSON.stringify(draftData));
    setIsDraft(false);
  };

  // Soumission finale
  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    // Simulation d'envoi avec délai réaliste
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const newShipment = {
      id: LogisticsDataGenerator.generateShipmentId(),
      ...formData,
      pricing,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: calculateDeliveryDate()
    };
    
    localStorage.removeItem('hubdispo_shipment_draft');
    setIsSubmitting(false);
    
    // Navigation conditionnelle
    if (formData.consolidation) {
      onNavigate("consolidation", { newShipment });
    } else {
      onNavigate("tracking", { shipmentId: newShipment.id });
    }
  };

  // Calcul de la date de livraison estimée
  const calculateDeliveryDate = () => {
    const destinationData = BELGIAN_LOGISTICS_DATA.destinations.find(d => d.country === formData.destinationCountry);
    const leadTime = destinationData?.lead_time || 3;
    const additionalDays = formData.urgentDelivery ? 0 : formData.consolidation ? 1 : 0;
    
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + leadTime + additionalDays);
    return deliveryDate.toLocaleDateString('fr-BE');
  };

  // Récupération des villes de destination
  const getDestinationCities = () => {
    const country = BELGIAN_LOGISTICS_DATA.destinations.find(d => d.country === formData.destinationCountry);
    return country?.cities || [];
  };

  // Récupération des types de produits
  const getProductTypes = () => {
    const category = BELGIAN_LOGISTICS_DATA.productTypes.find(p => p.category === formData.productCategory);
    return category?.subcategories || [];
  };

  // Chargement du brouillon au montage
  useEffect(() => {
    const draft = localStorage.getItem('hubdispo_shipment_draft');
    if (draft) {
      try {
        const draftData = JSON.parse(draft);
        setFormData(draftData);
        setPricing(draftData.pricing || pricing);
        setStep(draftData.step || 1);
      } catch (error) {
        console.error('Erreur lors du chargement du brouillon');
      }
    }
  }, []);

  // Calcul du volume
  const calculateVolume = () => {
    const l = parseFloat(formData.length);
    const w = parseFloat(formData.width);
    const h = parseFloat(formData.height);
    return l && w && h ? ((l * w * h) / 1000000).toFixed(3) : "0";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* En-tête avec progression */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-6 w-6 text-[#1E40AF]" />
                Nouvel envoi international
              </CardTitle>
              <p className="text-gray-600 mt-1">
                Étape {step}/4: {steps[step - 1].description}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleSaveDraft} 
              disabled={isDraft}
              size="sm"
            >
              {isDraft ? <ButtonLoading text="Sauvegarde..." /> : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Barre de progression */}
          <div className="flex items-center gap-4 mb-6">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  step > s.number ? 'bg-[#1E40AF] border-[#1E40AF] text-white' :
                  step === s.number ? 'border-[#1E40AF] text-[#1E40AF]' :
                  'border-gray-300 text-gray-400'
                }`}>
                  {step > s.number ? <CheckCircle className="h-5 w-5" /> : s.number}
                </div>
                <div className="ml-3 flex-1">
                  <p className={`font-medium text-sm ${step >= s.number ? 'text-gray-900' : 'text-gray-400'}`}>
                    {s.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-4 ${step > s.number ? 'bg-[#1E40AF]' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
          
          <Progress value={(step / steps.length) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Erreurs de validation */}
      {errors.length > 0 && (
        <FormValidationError errors={errors} onDismiss={() => setErrors([])} />
      )}

      {/* Formulaire par étapes */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {React.createElement(steps[step - 1].icon, { className: "h-5 w-5 text-[#1E40AF]" })}
                {steps[step - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Étape 1: Origine & Destination */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="origin">Origine (Belgique)</Label>
                      <Select value={formData.origin} onValueChange={(value) => updateFormData('origin', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bruxelles">Bruxelles</SelectItem>
                          <SelectItem value="Anvers">Anvers</SelectItem>
                          <SelectItem value="Gand">Gand</SelectItem>
                          <SelectItem value="Liège">Liège</SelectItem>
                          <SelectItem value="Charleroi">Charleroi</SelectItem>
                          <SelectItem value="Namur">Namur</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="originAddress">Adresse d'enlèvement</Label>
                      <Input
                        id="originAddress"
                        placeholder="Rue, numéro, code postal"
                        value={formData.originAddress}
                        onChange={(e) => updateFormData('originAddress', e.target.value)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="destinationCountry">Pays de destination</Label>
                      <Select value={formData.destinationCountry} onValueChange={(value) => {
                        updateFormData('destinationCountry', value);
                        updateFormData('destinationCity', ''); // Reset city
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          {BELGIAN_LOGISTICS_DATA.destinations.map((dest) => (
                            <SelectItem key={dest.country} value={dest.country}>
                              {dest.country}
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {dest.lead_time}j
                              </Badge>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="destinationCity">Ville de destination</Label>
                      <Select 
                        value={formData.destinationCity} 
                        onValueChange={(value) => updateFormData('destinationCity', value)}
                        disabled={!formData.destinationCountry}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une ville" />
                        </SelectTrigger>
                        <SelectContent>
                          {getDestinationCities().map((city) => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="destinationAddress">Adresse de livraison</Label>
                    <Textarea
                      id="destinationAddress"
                      placeholder="Adresse complète de livraison"
                      value={formData.destinationAddress}
                      onChange={(e) => updateFormData('destinationAddress', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Étape 2: Dimensions & Poids */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="weight">Poids (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="1000"
                        placeholder="ex: 15.5"
                        value={formData.weight}
                        onChange={(e) => updateFormData('weight', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Volume calculé</Label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{calculateVolume()} m³</span>
                        {parseFloat(calculateVolume()) > 0.1 && (
                          <Badge variant="secondary" className="ml-2">
                            Volumineux
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="length">Longueur (cm)</Label>
                      <Input
                        id="length"
                        type="number"
                        min="1"
                        placeholder="ex: 30"
                        value={formData.length}
                        onChange={(e) => updateFormData('length', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="width">Largeur (cm)</Label>
                      <Input
                        id="width"
                        type="number"
                        min="1"
                        placeholder="ex: 20"
                        value={formData.width}
                        onChange={(e) => updateFormData('width', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Hauteur (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        min="1"
                        placeholder="ex: 15"
                        value={formData.height}
                        onChange={(e) => updateFormData('height', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialHandling">Manutention spéciale</Label>
                    <Select value={formData.specialHandling} onValueChange={(value) => updateFormData('specialHandling', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Aucune" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Aucune</SelectItem>
                        <SelectItem value="fragile">Fragile</SelectItem>
                        <SelectItem value="hazardous">Matières dangereuses</SelectItem>
                        <SelectItem value="refrigerated">Réfrigéré</SelectItem>
                        <SelectItem value="valuable">Objets de valeur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Étape 3: Marchandise & Douane */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productCategory">Catégorie de produit</Label>
                      <Select value={formData.productCategory} onValueChange={(value) => {
                        updateFormData('productCategory', value);
                        updateFormData('productType', ''); // Reset type
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {BELGIAN_LOGISTICS_DATA.productTypes.map((type) => (
                            <SelectItem key={type.category} value={type.category}>
                              {type.category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="productType">Type de produit</Label>
                      <Select 
                        value={formData.productType} 
                        onValueChange={(value) => updateFormData('productType', value)}
                        disabled={!formData.productCategory}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                        <SelectContent>
                          {getProductTypes().map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description détaillée</Label>
                    <Textarea
                      id="description"
                      placeholder="Description précise du contenu pour la douane"
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="value">Valeur déclarée</Label>
                      <Input
                        id="value"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="ex: 150.00"
                        value={formData.value}
                        onChange={(e) => updateFormData('value', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Devise</Label>
                      <Select value={formData.currency} onValueChange={(value) => updateFormData('currency', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="USD">USD - Dollar US</SelectItem>
                          <SelectItem value="GBP">GBP - Livre Sterling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="hsCode">Code HS (optionnel)</Label>
                      <Input
                        id="hsCode"
                        placeholder="ex: 8471.30.00"
                        value={formData.hsCode}
                        onChange={(e) => updateFormData('hsCode', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Étape 4: Options & Finalisation */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Options de livraison</h3>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Consolidation intelligente</p>
                        <p className="text-sm text-gray-600">Regroupez avec d'autres envois pour économiser</p>
                      </div>
                      <Switch
                        checked={formData.consolidation}
                        onCheckedChange={(checked) => updateFormData('consolidation', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Livraison express</p>
                        <p className="text-sm text-gray-600">Livraison prioritaire sous 24-48h</p>
                      </div>
                      <Switch
                        checked={formData.urgentDelivery}
                        onCheckedChange={(checked) => updateFormData('urgentDelivery', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Assurance transport</p>
                        <p className="text-sm text-gray-600">Couverture complète en cas de dommage</p>
                      </div>
                      <Switch
                        checked={formData.insurance}
                        onCheckedChange={(checked) => updateFormData('insurance', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Suivi GPS</p>
                        <p className="text-sm text-gray-600">Localisation en temps réel</p>
                      </div>
                      <Switch
                        checked={formData.tracking}
                        onCheckedChange={(checked) => updateFormData('tracking', checked)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3">Récapitulatif de l'envoi</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Route:</span>
                        <span>{formData.origin} → {formData.destinationCity}, {formData.destinationCountry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Poids/Volume:</span>
                        <span>{formData.weight} kg • {calculateVolume()} m³</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Produit:</span>
                        <span>{formData.productType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Valeur:</span>
                        <span>{formData.value} {formData.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Livraison estimée:</span>
                        <span>{calculateDeliveryDate()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Boutons de navigation */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={step === 1 || isValidating || isSubmitting}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Précédent
                </Button>
                
                {step < 4 ? (
                  <Button 
                    onClick={handleNext}
                    disabled={isValidating}
                    className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                  >
                    {isValidating ? <ButtonLoading text="Validation..." /> : (
                      <>
                        Suivant
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-[#10B981] hover:bg-[#10B981]/90"
                  >
                    {isSubmitting ? <ButtonLoading text="Envoi en cours..." /> : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Créer l'envoi
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar avec pricing et informations */}
        <div className="space-y-6">
          {/* Estimation tarifaire */}
          {showPricing && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-[#1E40AF]" />
                  Estimation tarifaire
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Envoi standard:</span>
                    <span>€{pricing.standard}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#10B981]">Avec consolidation:</span>
                    <span className="text-[#10B981] font-medium">€{pricing.consolidated}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Express:</span>
                    <span>€{pricing.urgent}</span>
                  </div>
                  {formData.insurance && (
                    <div className="flex justify-between text-sm">
                      <span>Assurance:</span>
                      <span>€{pricing.insurance}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total estimé:</span>
                    <span className="text-[#1E40AF]">€{pricing.total}</span>
                  </div>
                </div>
                
                {formData.consolidation && (
                  <Alert className="border-green-200 bg-green-50">
                    <TrendingDown className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Économie: €{pricing.standard - pricing.consolidated}</strong><br />
                      Soit {Math.round(((pricing.standard - pricing.consolidated) / pricing.standard) * 100)}% d'économies !
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Informations de livraison */}
          {formData.destinationCountry && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#1E40AF]" />
                  Infos livraison
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Délai standard:</span>
                  <span>{BELGIAN_LOGISTICS_DATA.destinations.find(d => d.country === formData.destinationCountry)?.lead_time || 3} jours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Douane:</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    UE - Automatique
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Livraison estimée:</span>
                  <span className="font-medium">{calculateDeliveryDate()}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Aide contextuelle */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Aide
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              {step === 1 && (
                <p>Sélectionnez votre ville d'origine en Belgique et la destination européenne.</p>
              )}
              {step === 2 && (
                <p>Pesez et mesurez précisément votre colis. Ces données impactent le prix final.</p>
              )}
              {step === 3 && (
                <p>Une description précise facilite le passage en douane et évite les retards.</p>
              )}
              {step === 4 && (
                <p>La consolidation peut réduire vos coûts jusqu'à 45% avec un délai légèrement prolongé.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}