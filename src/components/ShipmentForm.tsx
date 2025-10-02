// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from "react";
import { MapPin, Package, Upload, Calculator, CheckCircle, Clock, Zap, TrendingDown, Users, ShieldCheck, AlertTriangle, Euro, Truck, ArrowRight, ArrowLeft, Save, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";
import { BELGIAN_LOGISTICS_DATA, LogisticsDataGenerator } from "./LogisticsDataManager";
import { FormLoading, ButtonLoading } from "./LoadingStates";
import { FormValidationError } from "./ErrorStates";

interface ShipmentFormProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function ShipmentForm({ onNavigate }: ShipmentFormProps) {
  const [step, setStep] = useState(1);
  const [consolidationEnabled, setConsolidationEnabled] = useState(true);
  const [shipmentMode, setShipmentMode] = useState("economy");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [dimensions, setDimensions] = useState({ length: "", width: "", height: "", weight: "" });
  const [pricing, setPricing] = useState({ standard: 0, consolidated: 0, urgent: 0 });
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    productType: "",
    productCategory: "",
    description: "",
    value: "",
    priority: "standard",
    insurance: false,
    tracking: true
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const steps = [
    { number: 1, title: "Origine & Destination", icon: MapPin, description: "Itinéraire de l'envoi" },
    { number: 2, title: "Dimensions & Poids", icon: Package, description: "Spécifications physiques" },
    { number: 3, title: "Type de marchandise", icon: ShieldCheck, description: "Classification douanière" },
    { number: 4, title: "Options & Validation", icon: CheckCircle, description: "Finalisation et envoi" }
  ];

  const currentStep = steps.find(s => s.number === step);

  // Calcul automatique des tarifs avec données réalistes belges
  useEffect(() => {
    if (selectedCountry && dimensions.weight) {
      const weight = parseFloat(dimensions.weight);
      const destinationData = BELGIAN_LOGISTICS_DATA.destinations.find(d => d.country === selectedCountry);
      
      if (destinationData) {
        const basePrice = weight * 2.8; // Prix de base par kg
        const distanceFactor = destinationData.lead_time * 0.3 + 1; // Facteur distance
        const demandFactor = destinationData.demand / 100 + 0.8; // Facteur demande
        
        const standardPrice = Math.round(basePrice * distanceFactor * demandFactor);
        
        setPricing({
          standard: standardPrice,
          consolidated: Math.round(standardPrice * 0.58), // 42% d'économie via consolidation
          urgent: Math.round(standardPrice * 1.85) // Majoration express
        });
      }
    }
  }, [selectedCountry, dimensions.weight]);

  // Validation en temps réel
  const validateCurrentStep = () => {
    const newErrors: string[] = [];
    
    switch (step) {
      case 1:
        if (!formData.origin) newErrors.push("L'origine est requise");
        if (!selectedCountry) newErrors.push("La destination est requise");
        if (!selectedCity) newErrors.push("La ville de destination est requise");
        break;
      case 2:
        if (!dimensions.weight || parseFloat(dimensions.weight) <= 0) {
          newErrors.push("Le poids doit être supérieur à 0");
        }
        if (parseFloat(dimensions.weight) > 1000) {
          newErrors.push("Le poids ne peut pas dépasser 1000 kg");
        }
        if (!dimensions.length || !dimensions.width || !dimensions.height) {
          newErrors.push("Toutes les dimensions sont requises");
        }
        break;
      case 3:
        if (!formData.productCategory) newErrors.push("La catégorie de produit est requise");
        if (!formData.productType) newErrors.push("Le type de produit est requis");
        if (!formData.description) newErrors.push("La description est requise");
        if (!formData.value || parseFloat(formData.value) <= 0) {
          newErrors.push("La valeur déclarée est requise");
        }
        break;
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Navigation entre étapes
  const handleNext = async () => {
    setIsValidating(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulation validation
    
    if (validateCurrentStep()) {
      setStep(step + 1);
    }
    setIsValidating(false);
  };

  const handlePrevious = () => {
    setStep(step - 1);
    setErrors([]);
  };

  // Sauvegarde brouillon
  const handleSaveDraft = async () => {
    setIsDraft(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const draftData = {
      ...formData,
      dimensions,
      selectedCountry,
      selectedCity,
      pricing,
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem('hubdispo_draft', JSON.stringify(draftData));
    setIsDraft(false);
    alert('Brouillon sauvegardé avec succès !');
  };

  // Soumission finale
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    setIsSubmitting(true);
    
    // Simulation soumission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newShipment = {
      id: LogisticsDataGenerator.generateShipmentId(),
      ...formData,
      dimensions,
      selectedCountry,
      selectedCity,
      pricing,
      status: 'created',
      createdAt: new Date().toISOString()
    };
    
    // Supprimer le brouillon
    localStorage.removeItem('hubdispo_draft');
    
    setIsSubmitting(false);
    
    // Navigation vers consolidation si option activée
    if (consolidationEnabled) {
      onNavigate("consolidation", { newShipment });
    } else {
      onNavigate("shipments");
    }
  };

  // Chargement des données sauvegardées
  useEffect(() => {
    const savedDraft = localStorage.getItem('hubdispo_draft');
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setFormData(draftData);
        setDimensions(draftData.dimensions);
        setSelectedCountry(draftData.selectedCountry);
        setSelectedCity(draftData.selectedCity);
        setPricing(draftData.pricing);
      } catch (error) {
        console.error('Erreur lors du chargement du brouillon:', error);
      }
    }
  }, []);

  // Récupération des villes pour le pays sélectionné
  const getDestinationCities = () => {
    const country = BELGIAN_LOGISTICS_DATA.destinations.find(d => d.country === selectedCountry);
    return country ? country.cities : [];
  };

  // Récupération des types de produits pour la catégorie sélectionnée
  const getProductTypes = () => {
    const category = BELGIAN_LOGISTICS_DATA.productTypes.find(p => p.category === formData.productCategory);
    return category ? category.subcategories : [];
  };

  const consolidationGroups = [
    { destination: "Allemagne", departure: "5 Oct", spots: 3, savings: "45%", compatibility: "high" },
    { destination: "France", departure: "4 Oct", spots: 1, savings: "52%", compatibility: "medium" },
    { destination: "Pays-Bas", departure: "6 Oct", spots: 5, savings: "38%", compatibility: "high" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Déposer un nouvel envoi</h1>
        <p className="text-gray-600">Suivez les étapes pour créer votre envoi international</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-lg border">
        {steps.map((stepItem, index) => (
          <div key={stepItem.number} className="flex items-center">
            <div className={`flex items-center gap-2 ${step >= stepItem.number ? 'text-[#1E40AF]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= stepItem.number ? 'border-[#1E40AF] bg-[#1E40AF] text-white' : 'border-gray-300'
              }`}>
                {step > stepItem.number ? <CheckCircle className="h-4 w-4" /> : stepItem.number}
              </div>
              <span className="hidden lg:block text-sm font-medium">{stepItem.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`hidden lg:block h-px w-16 mx-4 ${step > stepItem.number ? 'bg-[#1E40AF]' : 'bg-gray-300'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <currentStep.icon className="h-5 w-5" />
                {currentStep.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 1 && (
                <>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-[#1E40AF] mb-2">📍 D'où à où ?</h4>
                    <p className="text-sm text-gray-600">Définissez votre trajet pour calculer automatiquement le prix et identifier les groupes de consolidation disponibles.</p>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="origin">Origine</Label>
                      <Select defaultValue="belgium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="belgium">🇧🇪 Belgique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="origin-city">Ville d'origine</Label>
                      <Input placeholder="ex: Bruxelles, Anvers..." />
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Select onValueChange={setSelectedCountry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Allemagne">🇩🇪 Allemagne</SelectItem>
                          <SelectItem value="France">🇫🇷 France</SelectItem>
                          <SelectItem value="Pays-Bas">🇳🇱 Pays-Bas</SelectItem>
                          <SelectItem value="Italie">🇮🇹 Italie</SelectItem>
                          <SelectItem value="Espagne">🇪🇸 Espagne</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="destination-city">Ville de destination</Label>
                      <Input placeholder="ex: Berlin, Munich..." />
                    </div>
                  </div>
                  
                  {selectedCountry && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h4 className="font-medium text-green-800">Route validée</h4>
                      </div>
                      <p className="text-sm text-green-700">
                        ✅ Consolidation disponible vers {selectedCountry}<br />
                        🚚 3 groupes actifs avec départs cette semaine<br />
                        💰 Économies estimées : 35-52%
                      </p>
                    </div>
                  )}
                </>
              )}

              {step === 2 && (
                <>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-[#1E40AF] mb-2">📦 Dimensions et poids</h4>
                    <p className="text-sm text-gray-600">Saisissez les dimensions exactes pour un calcul précis des frais et une optimisation de la consolidation.</p>
                  </div>
                  
                  <div className="grid lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="length">Longueur (cm)</Label>
                      <Input 
                        placeholder="ex: 30" 
                        value={dimensions.length}
                        onChange={(e) => setDimensions(prev => ({ ...prev, length: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="width">Largeur (cm)</Label>
                      <Input 
                        placeholder="ex: 20" 
                        value={dimensions.width}
                        onChange={(e) => setDimensions(prev => ({ ...prev, width: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Hauteur (cm)</Label>
                      <Input 
                        placeholder="ex: 15" 
                        value={dimensions.height}
                        onChange={(e) => setDimensions(prev => ({ ...prev, height: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="weight">Poids (kg)</Label>
                      <Input 
                        placeholder="ex: 2.5" 
                        value={dimensions.weight}
                        onChange={(e) => setDimensions(prev => ({ ...prev, weight: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="quantity">Nombre de colis</Label>
                      <Input placeholder="ex: 1" defaultValue="1" />
                    </div>
                  </div>
                  
                  {/* Calcul automatique du volume */}
                  {dimensions.length && dimensions.width && dimensions.height && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Volume calculé :</span>
                        <span className="font-semibold">
                          {((parseFloat(dimensions.length) * parseFloat(dimensions.width) * parseFloat(dimensions.height)) / 1000000).toFixed(3)} m³
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Prévisualisation temps réel des tarifs */}
                  {selectedCountry && dimensions.weight && (
                    <Card className="bg-gradient-to-r from-[#10B981]/10 to-blue-50 border-[#10B981]/20">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Calculator className="h-4 w-4" />
                          Comparaison des tarifs
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center p-3 bg-white rounded border">
                            <p className="text-xs text-gray-600">Envoi standard</p>
                            <p className="text-lg font-semibold">€{pricing.standard}</p>
                          </div>
                          <div className="text-center p-3 bg-[#10B981] text-white rounded">
                            <p className="text-xs">Consolidé</p>
                            <p className="text-lg font-semibold">€{pricing.consolidated}</p>
                            <p className="text-xs">-{Math.round((1 - pricing.consolidated/pricing.standard) * 100)}%</p>
                          </div>
                          <div className="text-center p-3 bg-white rounded border">
                            <p className="text-xs text-gray-600">Express</p>
                            <p className="text-lg font-semibold">€{pricing.urgent}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}

              {step === 3 && (
                <>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-[#1E40AF] mb-2">🏷️ Type de marchandise</h4>
                    <p className="text-sm text-gray-600">Ces informations sont essentielles pour les déclarations douanières et l'optimisation de la consolidation.</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="product-type">Catégorie principale</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">📱 Électronique & High-tech</SelectItem>
                        <SelectItem value="clothing">👕 Vêtements & Textile</SelectItem>
                        <SelectItem value="food">🥫 Alimentaire & Boissons</SelectItem>
                        <SelectItem value="books">📚 Livres & Papeterie</SelectItem>
                        <SelectItem value="cosmetics">💄 Cosmétiques & Beauté</SelectItem>
                        <SelectItem value="home">🏠 Maison & Décoration</SelectItem>
                        <SelectItem value="sports">⚽ Sport & Loisirs</SelectItem>
                        <SelectItem value="other">📦 Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description détaillée</Label>
                    <Textarea 
                      placeholder="ex: Smartphones Samsung Galaxy S24, écouteurs sans fil..."
                      rows={3} 
                    />
                    <p className="text-xs text-gray-500 mt-1">💡 Plus c'est précis, mieux notre IA peut vous aider avec les douanes</p>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="value">Valeur déclarée (€)</Label>
                      <Input placeholder="ex: 150.00" />
                    </div>
                    <div>
                      <Label htmlFor="origin-country">Pays de fabrication</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Pays d'origine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="china">🇨🇳 Chine</SelectItem>
                          <SelectItem value="germany">🇩🇪 Allemagne</SelectItem>
                          <SelectItem value="france">🇫🇷 France</SelectItem>
                          <SelectItem value="usa">🇺🇸 États-Unis</SelectItem>
                          <SelectItem value="korea">🇰🇷 Corée du Sud</SelectItem>
                          <SelectItem value="belgium">🇧🇪 Belgique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium text-green-800">Conformité douanière</h4>
                    </div>
                    <p className="text-sm text-green-700">
                      ✅ Produit autorisé à l'exportation<br />
                      🤖 Code SH sera détecté automatiquement<br />
                      📋 Aucun document spécial requis
                    </p>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-[#1E40AF] mb-2">🚀 Mode d'envoi et validation</h4>
                    <p className="text-sm text-gray-600">Choisissez votre mode d'envoi et finalisez votre commande. Vous pourrez toujours modifier vos préférences plus tard.</p>
                  </div>
                  
                  {/* Sélection du mode d'envoi */}
                  <div className="space-y-4 mb-6">
                    <Label>Mode d'envoi</Label>
                    <div className="grid gap-4">
                      <div 
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          shipmentMode === "economy" ? "border-[#10B981] bg-green-50" : "border-gray-200"
                        }`}
                        onClick={() => setShipmentMode("economy")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#10B981] text-white rounded-lg">
                              <Users className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Consolidé (Recommandé)</h4>
                              <p className="text-sm text-gray-600">Partagez avec d'autres expéditeurs</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-[#10B981]">€{pricing.consolidated}</p>
                            <Badge className="bg-[#10B981] text-white text-xs">-40% économie</Badge>
                          </div>
                        </div>
                        {shipmentMode === "economy" && (
                          <div className="mt-3 pt-3 border-t border-green-200">
                            <p className="text-sm text-green-700">
                              🌱 <strong>Impact :</strong> -12kg CO₂ évité<br />
                              ⏰ <strong>Délai :</strong> 3-5 jours ouvrés<br />
                              👥 <strong>Groupe :</strong> 3 autres expéditeurs vers {selectedCountry || "votre destination"}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div 
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          shipmentMode === "standard" ? "border-[#1E40AF] bg-blue-50" : "border-gray-200"
                        }`}
                        onClick={() => setShipmentMode("standard")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#1E40AF] text-white rounded-lg">
                              <Package className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Standard</h4>
                              <p className="text-sm text-gray-600">Envoi individuel classique</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">€{pricing.standard}</p>
                            <p className="text-xs text-gray-500">3-4 jours</p>
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          shipmentMode === "express" ? "border-red-500 bg-red-50" : "border-gray-200"
                        }`}
                        onClick={() => setShipmentMode("express")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-500 text-white rounded-lg">
                              <Zap className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">Express</h4>
                              <p className="text-sm text-gray-600">Livraison prioritaire</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">€{pricing.urgent}</p>
                            <p className="text-xs text-gray-500">1-2 jours</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Upload de documents */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2">Facture pro-forma (optionnel)</p>
                    <p className="text-sm text-gray-500 mb-4">Notre IA peut l'analyser pour automatiser les douanes</p>
                    <Button variant="outline">Sélectionner un fichier</Button>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-[#1E40AF] mb-2">✨ Assistant IA activé</h4>
                    <p className="text-sm text-gray-700">
                      Une fois votre facture uploadée, notre IA extraira automatiquement les informations 
                      douanières et pré-remplira votre déclaration.
                    </p>
                  </div>
                </>
              )}

              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Précédent
                  </Button>
                )}
                {step < 4 ? (
                  <Button onClick={() => setStep(step + 1)} className="ml-auto bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                    Suivant
                  </Button>
                ) : (
                  <div className="ml-auto flex gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => onNavigate("dashboard")}
                    >
                      Annuler
                    </Button>
                    <Button 
                      className="bg-[#10B981] hover:bg-[#10B981]/90"
                      onClick={() => {
                        // Créer un envoi avec les données du formulaire
                        const shipmentData = {
                          id: `BE-${Date.now()}`,
                          destination: selectedCountry,
                          weight: dimensions.weight,
                          volume: dimensions.length && dimensions.width && dimensions.height ? 
                            ((parseFloat(dimensions.length) * parseFloat(dimensions.width) * parseFloat(dimensions.height)) / 1000000).toFixed(3) : 
                            "0.100",
                          mode: shipmentMode,
                          consolidationEnabled,
                          pricing: shipmentMode === "economy" ? pricing.consolidated : pricing.standard,
                          created: new Date().toISOString()
                        };
                        
                        if (shipmentMode === "economy" && consolidationEnabled) {
                          // Naviguer vers consolidation avec les données
                          onNavigate("consolidation", { newShipment: shipmentData });
                        } else {
                          // Naviguer vers confirmation d'envoi direct
                          onNavigate("tracking", { shipmentId: shipmentData.id, newShipment: shipmentData });
                        }
                      }}
                    >
                      {shipmentMode === "economy" && consolidationEnabled ? 
                        "Rejoindre la consolidation" : 
                        "Confirmer l'envoi direct"
                      }
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Options d'envoi */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Options d'envoi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={shipmentMode} onValueChange={setShipmentMode}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="economy" className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4" />
                    Économie
                  </TabsTrigger>
                  <TabsTrigger value="urgent" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Urgent
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="economy" className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#10B981]" />
                    <span className="text-sm">Livraison: 5-8 jours</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Consolidation automatique pour réduire les coûts
                  </p>
                </TabsContent>
                <TabsContent value="urgent" className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Livraison: 2-3 jours</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Envoi direct sans consolidation
                  </p>
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-between">
                <Label htmlFor="consolidation">Consolidation intelligente</Label>
                <Switch 
                  id="consolidation"
                  checked={consolidationEnabled && shipmentMode === "economy"}
                  onCheckedChange={setConsolidationEnabled}
                  disabled={shipmentMode === "urgent"}
                />
              </div>
              {consolidationEnabled && shipmentMode === "economy" && (
                <div className="space-y-2">
                  <Badge className="bg-[#10B981] text-white">Recommandé</Badge>
                  <p className="text-sm text-gray-600">
                    Réduisez vos coûts jusqu'à 60% en partageant un conteneur avec d'autres expéditeurs.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing Estimate */}
          {/* Badges de confiance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#10B981]" />
                Garanties & certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[#1E40AF] border-[#1E40AF]">
                  🇧🇪 Agréé SPF Finances
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[#10B981] border-[#10B981]">
                  🛡️ Conformité RGPD
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  ⚓ Partenaire Port d'Anvers
                </Badge>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Vos documents sont chiffrés et vos données protégées selon les normes européennes.
              </p>
            </CardContent>
          </Card>

          {/* Pricing Estimate */}
          {selectedCountry && dimensions.weight && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Estimation détaillée
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transport {shipmentMode === "urgent" ? "express" : "standard"}</span>
                  <span>€{shipmentMode === "urgent" ? pricing.urgent : pricing.standard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais douaniers</span>
                  <span>€25.00</span>
                </div>
                {consolidationEnabled && shipmentMode === "economy" && (
                  <div className="flex justify-between text-[#10B981]">
                    <span>Réduction consolidation</span>
                    <span>-€{pricing.standard - pricing.consolidated}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total estimé</span>
                  <span className="text-[#1E40AF]">
                    €{consolidationEnabled && shipmentMode === "economy" ? pricing.consolidated + 25 : 
                       shipmentMode === "urgent" ? pricing.urgent + 25 : pricing.standard + 25}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {shipmentMode === "urgent" ? "Prix express final" : "Prix final calculé après consolidation"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}