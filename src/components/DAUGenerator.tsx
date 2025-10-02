// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from "react";
import { 
  FileText, 
  Download, 
  Save, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Package, 
  MapPin, 
  Building, 
  User,
  Calendar,
  Euro,
  Truck,
  Shield,
  Upload,
  Eye,
  Copy,
  Send
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import ActionBar from "./ActionBar";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";

interface DAUGeneratorProps {
  onNavigate: (view: string, params?: any) => void;
  shipmentId?: string;
}

export default function DAUGenerator({ onNavigate, shipmentId }: DAUGeneratorProps) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [completionProgress, setCompletionProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  
  const [dauData, setDauData] = useState({
    // Informations exportateur
    exporterName: user?.company || "",
    exporterAddress: "",
    exporterTVA: "",
    exporterEORI: "",
    
    // Informations destinataire
    consigneeName: "",
    consigneeAddress: "",
    consigneeCountry: "",
    consigneeTVA: "",
    
    // Informations marchandises
    goodsDescription: "",
    tariffCode: "",
    netWeight: "",
    grossWeight: "",
    totalValue: "",
    currency: "EUR",
    packagesCount: "",
    packagesType: "",
    
    // Transport
    transportMode: "Route",
    vehicleRegistration: "",
    carrierName: "",
    carrierCountry: "BE",
    
    // Itinéraire
    departureDate: "",
    departurePlace: "",
    destinationPlace: "",
    transitCountries: [],
    
    // Documents
    commercialInvoice: false,
    packingList: false,
    transportDocument: false,
    certificates: []
  });

  // Calcul automatique du progress
  useEffect(() => {
    const fields = Object.keys(dauData);
    const filledFields = fields.filter(key => {
      const value = dauData[key as keyof typeof dauData];
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'boolean') return true;
      return value !== "";
    });
    
    setCompletionProgress(Math.round((filledFields.length / fields.length) * 100));
  }, [dauData]);

  const steps = [
    { number: 1, title: "Exportateur", icon: Building, fields: ["exporterName", "exporterAddress", "exporterTVA", "exporterEORI"] },
    { number: 2, title: "Destinataire", icon: User, fields: ["consigneeName", "consigneeAddress", "consigneeCountry"] },
    { number: 3, title: "Marchandises", icon: Package, fields: ["goodsDescription", "tariffCode", "netWeight", "totalValue"] },
    { number: 4, title: "Transport", icon: Truck, fields: ["transportMode", "carrierName", "departureDate"] },
    { number: 5, title: "Validation", icon: CheckCircle, fields: [] }
  ];

  const currentStepData = steps.find(s => s.number === currentStep);

  const euCountries = [
    "Allemagne", "Autriche", "Bulgarie", "Chypre", "Croatie", "Danemark", 
    "Espagne", "Estonie", "Finlande", "France", "Grèce", "Hongrie", 
    "Irlande", "Italie", "Lettonie", "Lituanie", "Luxembourg", "Malte", 
    "Pays-Bas", "Pologne", "Portugal", "République tchèque", "Roumanie", 
    "Slovaquie", "Slovénie", "Suède"
  ];

  const handleFieldChange = (field: string, value: any) => {
    setDauData(prev => ({ ...prev, [field]: value }));
  };

  const validateCurrentStep = () => {
    if (!currentStepData) return false;
    return currentStepData.fields.every(field => {
      const value = dauData[field as keyof typeof dauData];
      return value !== "" && value !== undefined;
    });
  };

  const handleGenerateDAU = async () => {
    setIsGenerating(true);
    
    // Simulation de génération
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGenerating(false);
    setIsValidated(true);
  };

  const handleDownloadDAU = () => {
    // Simulation de téléchargement
    const link = document.createElement('a');
    link.href = '#';
    link.download = `DAU_${dauData.exporterName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6">
      {/* Action Bar */}
      <ActionBar 
        onNavigate={onNavigate}
        currentView="dau-generator"
        showBackButton={true}
        backTo="customs"
        customActions={[
          {
            label: "Mes DAU",
            action: () => onNavigate("dau-history"),
            icon: FileText,
            variant: "outline"
          },
          {
            label: "Assistant IA Douanes",
            action: () => onNavigate("customs", { shipmentId }),
            icon: Shield,
            variant: "outline"
          },
          {
            label: "Mes envois",
            action: () => onNavigate("shipments"),
            icon: Package,
            variant: "outline"
          }
        ]}
      />

      {/* En-tête */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#1E40AF] text-white rounded-lg">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Générateur DAU</h1>
            <p className="text-gray-600">Document Administratif Unique pour l'exportation UE</p>
          </div>
          <div className="ml-auto">
            <Badge className={`${completionProgress === 100 ? 'bg-[#10B981]' : 'bg-orange-500'} text-white`}>
              {completionProgress}% complété
            </Badge>
          </div>
        </div>
        
        <Progress value={completionProgress} className="h-2" />
      </div>

      {/* Navigation des étapes */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div 
                  className={`flex items-center gap-2 cursor-pointer ${
                    currentStep >= step.number ? 'text-[#1E40AF]' : 'text-gray-400'
                  }`}
                  onClick={() => setCurrentStep(step.number)}
                >
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                    currentStep >= step.number 
                      ? 'border-[#1E40AF] bg-[#1E40AF] text-white' 
                      : 'border-gray-300'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="hidden lg:block font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden lg:block h-px w-16 mx-4 ${
                    currentStep > step.number ? 'bg-[#1E40AF]' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Formulaire principal */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <currentStepData.icon className="h-5 w-5" />
                {currentStepData.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Étape 1: Exportateur */}
              {currentStep === 1 && (
                <>
                  <Alert>
                    <Building className="h-4 w-4" />
                    <AlertDescription>
                      Ces informations proviennent de votre profil entreprise et sont automatiquement pré-remplies.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="exporterName">Nom de l'entreprise *</Label>
                      <Input
                        id="exporterName"
                        value={dauData.exporterName}
                        onChange={(e) => handleFieldChange('exporterName', e.target.value)}
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div>
                      <Label htmlFor="exporterTVA">Numéro TVA *</Label>
                      <Input
                        id="exporterTVA"
                        value={dauData.exporterTVA}
                        onChange={(e) => handleFieldChange('exporterTVA', e.target.value)}
                        placeholder="BE 0123.456.789"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="exporterAddress">Adresse complète *</Label>
                    <Textarea
                      id="exporterAddress"
                      value={dauData.exporterAddress}
                      onChange={(e) => handleFieldChange('exporterAddress', e.target.value)}
                      placeholder="Rue, numéro, code postal, ville, Belgique"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="exporterEORI">Numéro EORI *</Label>
                    <Input
                      id="exporterEORI"
                      value={dauData.exporterEORI}
                      onChange={(e) => handleFieldChange('exporterEORI', e.target.value)}
                      placeholder="BE123456789000"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Si vous n'avez pas de numéro EORI, vous pouvez en faire la demande auprès des douanes belges.
                    </p>
                  </div>
                </>
              )}

              {/* Étape 2: Destinataire */}
              {currentStep === 2 && (
                <>
                  <Alert>
                    <User className="h-4 w-4" />
                    <AlertDescription>
                      Informations sur le destinataire final de la marchandise dans le pays de destination.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="consigneeName">Nom du destinataire *</Label>
                      <Input
                        id="consigneeName"
                        value={dauData.consigneeName}
                        onChange={(e) => handleFieldChange('consigneeName', e.target.value)}
                        placeholder="Nom de l'entreprise ou personne"
                      />
                    </div>
                    <div>
                      <Label htmlFor="consigneeCountry">Pays de destination *</Label>
                      <Select onValueChange={(value) => handleFieldChange('consigneeCountry', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un pays" />
                        </SelectTrigger>
                        <SelectContent>
                          {euCountries.map(country => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="consigneeAddress">Adresse complète du destinataire *</Label>
                    <Textarea
                      id="consigneeAddress"
                      value={dauData.consigneeAddress}
                      onChange={(e) => handleFieldChange('consigneeAddress', e.target.value)}
                      placeholder="Adresse complète du destinataire"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="consigneeTVA">Numéro TVA du destinataire</Label>
                    <Input
                      id="consigneeTVA"
                      value={dauData.consigneeTVA}
                      onChange={(e) => handleFieldChange('consigneeTVA', e.target.value)}
                      placeholder="Numéro TVA (si applicable)"
                    />
                  </div>
                </>
              )}

              {/* Étape 3: Marchandises */}
              {currentStep === 3 && (
                <>
                  <Alert>
                    <Package className="h-4 w-4" />
                    <AlertDescription>
                      Description précise des marchandises pour la classification douanière automatique.
                    </AlertDescription>
                  </Alert>
                  
                  <div>
                    <Label htmlFor="goodsDescription">Description des marchandises *</Label>
                    <Textarea
                      id="goodsDescription"
                      value={dauData.goodsDescription}
                      onChange={(e) => handleFieldChange('goodsDescription', e.target.value)}
                      placeholder="Description précise et détaillée des marchandises"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tariffCode">Code tarifaire SH *</Label>
                      <Input
                        id="tariffCode"
                        value={dauData.tariffCode}
                        onChange={(e) => handleFieldChange('tariffCode', e.target.value)}
                        placeholder="ex: 8517.12.00"
                      />
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-sm mt-1"
                        onClick={() => {
                          // Simulation IA - classification automatique
                          const descriptions = dauData.goodsDescription.toLowerCase();
                          let suggestedCode = "";
                          
                          if (descriptions.includes("smartphone") || descriptions.includes("téléphone")) {
                            suggestedCode = "8517.12.00";
                          } else if (descriptions.includes("vêtement") || descriptions.includes("textile")) {
                            suggestedCode = "6109.10.00";
                          } else if (descriptions.includes("électronique")) {
                            suggestedCode = "8543.70.00";
                          } else {
                            suggestedCode = "9999.99.99"; // Code générique
                          }
                          
                          handleFieldChange('tariffCode', suggestedCode);
                        }}
                      >
                        🤖 Détecter automatiquement avec l'IA
                      </Button>
                    </div>
                    <div>
                      <Label htmlFor="packagesCount">Nombre de colis *</Label>
                      <Input
                        id="packagesCount"
                        type="number"
                        value={dauData.packagesCount}
                        onChange={(e) => handleFieldChange('packagesCount', e.target.value)}
                        placeholder="ex: 5"
                      />
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="netWeight">Poids net (kg) *</Label>
                      <Input
                        id="netWeight"
                        type="number"
                        step="0.01"
                        value={dauData.netWeight}
                        onChange={(e) => handleFieldChange('netWeight', e.target.value)}
                        placeholder="ex: 12.50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="grossWeight">Poids brut (kg)</Label>
                      <Input
                        id="grossWeight"
                        type="number"
                        step="0.01"
                        value={dauData.grossWeight}
                        onChange={(e) => handleFieldChange('grossWeight', e.target.value)}
                        placeholder="ex: 15.30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalValue">Valeur totale *</Label>
                      <div className="flex">
                        <Input
                          id="totalValue"
                          type="number"
                          step="0.01"
                          value={dauData.totalValue}
                          onChange={(e) => handleFieldChange('totalValue', e.target.value)}
                          placeholder="ex: 1250.00"
                          className="rounded-r-none"
                        />
                        <Select onValueChange={(value) => handleFieldChange('currency', value)}>
                          <SelectTrigger className="w-20 rounded-l-none">
                            <SelectValue placeholder="EUR" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Étape 4: Transport */}
              {currentStep === 4 && (
                <>
                  <Alert>
                    <Truck className="h-4 w-4" />
                    <AlertDescription>
                      Informations sur le mode de transport et l'itinéraire prévu.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="transportMode">Mode de transport *</Label>
                      <Select onValueChange={(value) => handleFieldChange('transportMode', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Route">Route</SelectItem>
                          <SelectItem value="Rail">Rail</SelectItem>
                          <SelectItem value="Mer">Mer</SelectItem>
                          <SelectItem value="Air">Air</SelectItem>
                          <SelectItem value="Multimodal">Multimodal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="departureDate">Date de départ prévue *</Label>
                      <Input
                        id="departureDate"
                        type="date"
                        value={dauData.departureDate}
                        onChange={(e) => handleFieldChange('departureDate', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="carrierName">Nom du transporteur *</Label>
                      <Input
                        id="carrierName"
                        value={dauData.carrierName}
                        onChange={(e) => handleFieldChange('carrierName', e.target.value)}
                        placeholder="Nom de l'entreprise de transport"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vehicleRegistration">Immatriculation véhicule</Label>
                      <Input
                        id="vehicleRegistration"
                        value={dauData.vehicleRegistration}
                        onChange={(e) => handleFieldChange('vehicleRegistration', e.target.value)}
                        placeholder="ex: 1-ABC-123"
                      />
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="departurePlace">Lieu de départ</Label>
                      <Input
                        id="departurePlace"
                        value={dauData.departurePlace}
                        onChange={(e) => handleFieldChange('departurePlace', e.target.value)}
                        placeholder="ex: Bruxelles, Belgique"
                      />
                    </div>
                    <div>
                      <Label htmlFor="destinationPlace">Lieu de destination</Label>
                      <Input
                        id="destinationPlace"
                        value={dauData.destinationPlace}
                        onChange={(e) => handleFieldChange('destinationPlace', e.target.value)}
                        placeholder="ex: Berlin, Allemagne"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Étape 5: Validation */}
              {currentStep === 5 && (
                <>
                  <Alert className={isValidated ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}>
                    {isValidated ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    )}
                    <AlertDescription className={isValidated ? "text-green-700" : "text-amber-700"}>
                      {isValidated 
                        ? "Votre DAU a été généré avec succès et est prêt à être utilisé."
                        : "Vérifiez les informations avant de générer le document officiel."
                      }
                    </AlertDescription>
                  </Alert>

                  {!isValidated && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-3">Récapitulatif du DAU</h4>
                      <div className="grid lg:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Exportateur:</strong> {dauData.exporterName}</p>
                          <p><strong>Destinataire:</strong> {dauData.consigneeName}</p>
                          <p><strong>Destination:</strong> {dauData.consigneeCountry}</p>
                        </div>
                        <div>
                          <p><strong>Marchandises:</strong> {dauData.goodsDescription}</p>
                          <p><strong>Valeur:</strong> {dauData.totalValue} {dauData.currency}</p>
                          <p><strong>Poids:</strong> {dauData.netWeight} kg</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {isValidated && (
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-medium text-green-800 mb-2">DAU généré avec succès</h4>
                        <p className="text-sm text-green-700 mb-3">
                          Votre Document Administratif Unique est maintenant prêt. 
                          Vous pouvez le télécharger, l'envoyer par email ou l'imprimer.
                        </p>
                        <div className="flex gap-3 flex-wrap">
                          <Button onClick={handleDownloadDAU} className="bg-[#10B981] hover:bg-[#10B981]/90">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger PDF
                          </Button>
                          <Button variant="outline">
                            <Send className="h-4 w-4 mr-2" />
                            Envoyer par email
                          </Button>
                          <Button variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Aperçu
                          </Button>
                          <Button variant="outline">
                            <Copy className="h-4 w-4 mr-2" />
                            Copier le lien
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t">
                {currentStep > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Précédent
                  </Button>
                )}
                
                {currentStep < 5 ? (
                  <Button 
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="ml-auto bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                    disabled={!validateCurrentStep()}
                  >
                    Suivant
                  </Button>
                ) : (
                  !isValidated && (
                    <Button 
                      onClick={handleGenerateDAU}
                      className="ml-auto bg-[#10B981] hover:bg-[#10B981]/90"
                      disabled={isGenerating || completionProgress < 80}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Génération en cours...
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 mr-2" />
                          Générer le DAU
                        </>
                      )}
                    </Button>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar d'assistance */}
        <div className="space-y-4">
          {/* Aide contextuelle */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💡 Aide contextuelle</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              {currentStep === 1 && (
                <div>
                  <p className="font-medium mb-2">Informations exportateur</p>
                  <p className="text-gray-600">
                    Le numéro EORI est obligatoire pour les exportations UE. 
                    Si vous n'en avez pas, contactez les douanes belges.
                  </p>
                </div>
              )}
              {currentStep === 2 && (
                <div>
                  <p className="font-medium mb-2">Destinataire</p>
                  <p className="text-gray-600">
                    Assurez-vous que l'adresse du destinataire est complète 
                    et exacte pour éviter les retards douaniers.
                  </p>
                </div>
              )}
              {currentStep === 3 && (
                <div>
                  <p className="font-medium mb-2">Classification SH</p>
                  <p className="text-gray-600">
                    Notre IA peut suggérer le code tarifaire approprié 
                    basé sur la description de vos marchandises.
                  </p>
                </div>
              )}
              {currentStep === 4 && (
                <div>
                  <p className="font-medium mb-2">Transport</p>
                  <p className="text-gray-600">
                    Les informations de transport permettent le suivi 
                    et la coordination avec nos partenaires logistiques.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Modèles sauvegardés */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📋 Modèles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Building className="h-4 w-4 mr-2" />
                Export standard Electronics
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                Textile vers Allemagne
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder ce modèle
              </Button>
            </CardContent>
          </Card>

          {/* Statut réglementaire */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#10B981]" />
                Conformité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#10B981]" />
                <span className="text-sm">Réglementation UE 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#10B981]" />
                <span className="text-sm">Normes douanes BE</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#10B981]" />
                <span className="text-sm">RGPD compliant</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}