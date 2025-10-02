// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { Upload, Brain, CheckCircle, Download, AlertCircle, FileText, Sparkles, X, Shield, Clock, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface CustomsAssistantProps {
  shipmentId?: string;
  onNavigate?: (view: string, params?: any) => void;
}

export default function CustomsAssistant({ shipmentId, onNavigate }: CustomsAssistantProps) {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [processingStep, setProcessingStep] = useState(0);
  const [completenessCheck, setCompletenessCheck] = useState<any>(null);
  const [simulationMode, setSimulationMode] = useState(false);

  const processingSteps = [
    "Analyse du document...",
    "Extraction des données...",
    "Reconnaissance des produits...",
    "Suggestion du code SH...",
    "Génération du DAU..."
  ];

  const handleFileUpload = (file: File, type: string) => {
    const newFile = {
      id: Date.now(),
      name: file.name,
      type: type,
      size: file.size,
      status: 'uploaded'
    };
    
    setUploadedFiles(prev => [...prev, newFile]);
    
    if (type === 'invoice') {
      setAiProcessing(true);
      setProcessingStep(0);

      // Simulate AI processing
      const interval = setInterval(() => {
        setProcessingStep(prev => {
          if (prev >= 4) {
            clearInterval(interval);
            setAiProcessing(false);
            setExtractedData({
              description: "Équipements électroniques - Smartphones Samsung Galaxy",
              value: "1,250.00",
              quantity: "5",
              weight: "2.3",
              origin: "Corée du Sud",
              hsCode: "8517.12.00",
              confidence: 94
            });
            checkCompleteness();
            return 4;
          }
          return prev + 1;
        });
      }, 800);
    }
  };

  const checkCompleteness = () => {
    const hasInvoice = uploadedFiles.some(f => f.type === 'invoice');
    const hasOrigin = uploadedFiles.some(f => f.type === 'origin');
    const hasLicense = uploadedFiles.some(f => f.type === 'license');
    
    setCompletenessCheck({
      invoice: hasInvoice,
      origin: hasOrigin,
      license: hasLicense,
      score: (hasInvoice ? 70 : 0) + (hasOrigin ? 20 : 0) + (hasLicense ? 10 : 0),
      missing: [
        ...(!hasInvoice ? ['Facture pro-forma'] : []),
        ...(!hasOrigin ? ['Certificat d\'origine'] : []),
        ...(!hasLicense ? ['Licence d\'exportation'] : [])
      ]
    });
  };

  const removeFile = (fileId: number) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    checkCompleteness();
  };

  const mockShipmentData = shipmentId === "BE-2024-789" ? {
    id: "BE-2024-789",
    destination: "Allemagne",
    description: "Équipements électroniques",
    value: "890.00",
    status: "missing_dau"
  } : null;

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Assistant douanier IA</h1>
          <p className="text-gray-600">
            {shipmentId ? `Complétez la déclaration douanière pour l'envoi ${shipmentId}` : 
             "Automatisez vos déclarations douanières grâce à l'intelligence artificielle"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge 
            variant={simulationMode ? "outline" : "default"}
            className={simulationMode ? "border-purple-500 text-purple-700" : "bg-[#10B981] text-white"}
            onClick={() => setSimulationMode(!simulationMode)}
          >
            {simulationMode ? "Mode Simulation" : "Mode Réel"}
          </Badge>
          <Badge className="bg-[#10B981] text-white">
            <Sparkles className="h-4 w-4 mr-1" />
            IA Activée
          </Badge>
        </div>
      </div>

      {/* Alert for specific shipment */}
      {mockShipmentData && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-800">Action requise pour l'envoi {mockShipmentData.id}</p>
                <p className="text-sm text-amber-700">
                  Destination: {mockShipmentData.destination} • Valeur: €{mockShipmentData.value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload & AI Processing */}
        <div className="lg:col-span-2 space-y-6">
          {/* Multi-Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload multi-documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="invoice" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="invoice">Facture</TabsTrigger>
                  <TabsTrigger value="origin">Origine</TabsTrigger>
                  <TabsTrigger value="license">Licence</TabsTrigger>
                </TabsList>
                
                <TabsContent value="invoice">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h4 className="font-medium mb-2">Facture pro-forma</h4>
                    <p className="text-sm text-gray-600 mb-3">Document obligatoire</p>
                    <Button 
                      onClick={() => {
                        const mockFile = new File([''], 'facture-pro-forma.pdf', { type: 'application/pdf' });
                        handleFileUpload(mockFile, 'invoice');
                      }}
                      className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                      size="sm"
                    >
                      Sélectionner
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="origin">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Shield className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h4 className="font-medium mb-2">Certificat d'origine</h4>
                    <p className="text-sm text-gray-600 mb-3">Recommandé pour les accords commerciaux</p>
                    <Button 
                      onClick={() => {
                        const mockFile = new File([''], 'certificat-origine.pdf', { type: 'application/pdf' });
                        handleFileUpload(mockFile, 'origin');
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Sélectionner
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="license">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h4 className="font-medium mb-2">Licence d'exportation</h4>
                    <p className="text-sm text-gray-600 mb-3">Si requis selon la réglementation</p>
                    <Button 
                      onClick={() => {
                        const mockFile = new File([''], 'licence-export.pdf', { type: 'application/pdf' });
                        handleFileUpload(mockFile, 'license');
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Sélectionner
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium">Documents uploadés</h4>
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="h-6 w-6 text-[#1E40AF]" />
                      <div className="flex-1">
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-600">
                          {file.type === 'invoice' ? 'Facture pro-forma' : 
                           file.type === 'origin' ? 'Certificat d\'origine' : 'Licence d\'exportation'}
                        </p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-[#10B981]" />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {aiProcessing && (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-[#1E40AF] animate-pulse" />
                    <span className="font-medium">IA en cours d'analyse...</span>
                  </div>
                  <div className="space-y-2">
                    <Progress value={(processingStep + 1) * 20} className="h-2" />
                    <p className="text-sm text-gray-600">{processingSteps[processingStep]}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vérification de complétude */}
          {completenessCheck && (
            <Card className={completenessCheck.score >= 90 ? "border-[#10B981] bg-green-50" : "border-amber-500 bg-amber-50"}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Vérification de complétude du dossier
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Score de complétude</span>
                  <Badge className={completenessCheck.score >= 90 ? "bg-[#10B981] text-white" : "bg-amber-500 text-white"}>
                    {completenessCheck.score}%
                  </Badge>
                </div>
                <Progress value={completenessCheck.score} className="h-3" />
                
                {completenessCheck.missing.length > 0 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Documents manquants : {completenessCheck.missing.join(', ')}
                    </AlertDescription>
                  </Alert>
                )}
                
                {completenessCheck.score >= 90 && (
                  <div className="flex items-center gap-2 text-[#10B981]">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Dossier complet pour l'exportation</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Extracted Data */}
          {extractedData && !aiProcessing && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#10B981]" />
                  Données extraites automatiquement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid lg:grid-cols-2 gap-4">
                  <div>
                    <Label>Description du produit</Label>
                    <Textarea 
                      value={extractedData.description}
                      className="bg-green-50 border-green-200"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Pays d'origine</Label>
                    <Input 
                      value={extractedData.origin}
                      className="bg-green-50 border-green-200"
                    />
                  </div>
                  <div>
                    <Label>Valeur totale (€)</Label>
                    <Input 
                      value={extractedData.value}
                      className="bg-green-50 border-green-200"
                    />
                  </div>
                  <div>
                    <Label>Quantité</Label>
                    <Input 
                      value={extractedData.quantity}
                      className="bg-green-50 border-green-200"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-[#1E40AF]">Code SH recommandé</h4>
                    <Badge className="bg-[#10B981] text-white">{extractedData.confidence}% de confiance</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="bg-white px-3 py-1 rounded border text-lg font-mono">
                      {extractedData.hsCode}
                    </code>
                    <div>
                      <p className="text-sm font-medium">Téléphones mobiles et smartphones</p>
                      <p className="text-xs text-gray-600">Chapitre 85 - Machines électriques</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="bg-[#1E40AF] hover:bg-[#1E40AF]/90 flex-1"
                    onClick={() => {
                      // Simulation de génération DAU
                      window.open('data:application/pdf;base64,JVBERi0xLjQKJdP...', '_blank');
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Générer mon DAU
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Modifier
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Premium Features */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center space-y-3">
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                  Premium
                </Badge>
                <h4 className="font-semibold">Représentation douanière incluse</h4>
                <p className="text-sm text-gray-600">
                  Notre équipe d'experts gère vos déclarations complexes
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  En savoir plus
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-white"
                onClick={() => onNavigate && onNavigate("dau-generator", { shipmentId })}
              >
                <FileText className="h-4 w-4 mr-2" />
                Générer mon DAU
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Modèle de facture pro-forma
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="h-4 w-4 mr-2" />
                Vérifier un code SH
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Brain className="h-4 w-4 mr-2" />
                Base de données IA
              </Button>
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle>Besoin d'aide ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600">
                Notre équipe douanière est disponible pour vous accompagner
              </p>
              <Button className="w-full bg-[#10B981] hover:bg-[#10B981]/90">
                Contacter le support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}