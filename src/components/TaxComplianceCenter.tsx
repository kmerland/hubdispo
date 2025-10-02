// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Euro,
  Building2,
  MapPin,
  Calendar,
  TrendingUp,
  AlertCircle,
  Users,
  Package
} from "lucide-react";
import { useToast } from "./ToastProvider";
import { useLanguage } from "./LanguageProvider";

interface TaxComplianceCenterProps {
  onNavigate: (view: string, params?: any) => void;
}

interface ComplianceCheck {
  id: string;
  title: string;
  status: 'compliant' | 'warning' | 'non-compliant';
  description: string;
  actionRequired?: string;
  deadline?: string;
}

interface TaxProfile {
  companyName: string;
  vatNumber: string;
  vatStatus: 'assujetti' | 'franchise' | 'petit-entrepreneur';
  activity: string;
  mainDestinations: string[];
  complianceScore: number;
}

export default function TaxComplianceCenter({ onNavigate }: TaxComplianceCenterProps) {
  const { showToast } = useToast();
  const { t } = useLanguage();
  
  const [selectedProfile, setSelectedProfile] = useState(0);

  // Profils types de PME belges
  const taxProfiles: TaxProfile[] = [
    {
      companyName: "Boulangerie Artisanale Delicius",
      vatNumber: "BE0123456789",
      vatStatus: "franchise",
      activity: "Boulangerie artisanale - Produits alimentaires",
      mainDestinations: ["Pays-Bas", "Luxembourg"],
      complianceScore: 95
    },
    {
      companyName: "Auto Parts Distribution SPRL",
      vatNumber: "BE0987654321",
      vatStatus: "assujetti",
      activity: "Distribution de pièces automobiles",
      mainDestinations: ["Allemagne", "France", "Pays-Bas"],
      complianceScore: 78
    },
    {
      companyName: "TechConsult Solutions",
      vatNumber: "BE0456789123",
      vatStatus: "assujetti",
      activity: "Services de conseil informatique",
      mainDestinations: ["France", "Luxembourg", "Suisse"],
      complianceScore: 88
    }
  ];

  const currentProfile = taxProfiles[selectedProfile];

  // Contrôles de conformité basés sur le profil
  const getComplianceChecks = (profile: TaxProfile): ComplianceCheck[] => {
    const baseChecks: ComplianceCheck[] = [];

    if (profile.vatStatus === 'assujetti') {
      baseChecks.push(
        {
          id: 'esl',
          title: 'Déclaration EC Sales List (ESL)',
          status: 'compliant',
          description: 'Déclaration mensuelle des livraisons intracommunautaires',
          deadline: '20/11/2024'
        },
        {
          id: 'vat-verification',
          title: 'Vérification numéros TVA destinataires',
          status: profile.complianceScore > 85 ? 'compliant' : 'warning',
          description: 'Validation des numéros TVA des clients européens',
          actionRequired: profile.complianceScore <= 85 ? '2 numéros TVA à vérifier pour la France' : undefined
        },
        {
          id: 'vat-exemption',
          title: 'Exonération TVA exports UE',
          status: 'compliant',
          description: 'Application correcte de l\'exonération art. 14, §1 du code TVA'
        }
      );
    } else if (profile.vatStatus === 'franchise') {
      baseChecks.push(
        {
          id: 'franchise-limit',
          title: 'Seuil régime de franchise',
          status: 'compliant',
          description: 'Chiffre d\'affaires sous le seuil de €25.000',
        },
        {
          id: 'no-vat-invoice',
          title: 'Facturation sans TVA',
          status: 'compliant',
          description: 'Mention obligatoire "TVA non applicable - art. 56bis, §2 du Code TVA"'
        }
      );
    }

    // Vérifications communes
    baseChecks.push({
      id: 'intrastat',
      title: 'Déclaration Intrastat',
      status: profile.activity.includes('Services') ? 'non-compliant' : 'warning',
      description: 'Déclaration statistique des échanges intracommunautaires',
      actionRequired: profile.activity.includes('Services') ? 'Seuil de €12.000 dépassé - déclaration obligatoire' : 'Surveillance du seuil requis'
    });

    return baseChecks;
  };

  const complianceChecks = getComplianceChecks(currentProfile);

  const handleProfileUpdate = () => {
    showToast({
      type: 'info',
      message: 'Formulaire de mise à jour du profil fiscal ouvert',
      duration: 3000
    });
  };

  const handleExpertConsultation = () => {
    showToast({
      type: 'success',
      message: 'Consultation avec expert fiscal programmée',
      duration: 3000
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'non-compliant':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-orange-500 bg-orange-50';
      case 'non-compliant':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#1E40AF]/10 rounded-lg">
            <FileText className="h-6 w-6 text-[#1E40AF]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Votre situation fiscale personnalisée
            </h1>
            <p className="text-gray-600 mt-1">
              En fonction de votre activité, vos envois et la réglementation belge, voici ce que vous devez déclarer ou payer
            </p>
          </div>
        </div>

        {/* Score de conformité */}
        <Card className="bg-gradient-to-r from-[#1E40AF]/5 to-[#10B981]/5 border-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Score de conformité fiscal</h3>
                <p className="text-sm text-gray-600">Basé sur votre profil et vos déclarations récentes</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#1E40AF]">{currentProfile.complianceScore}%</div>
                <Badge variant={currentProfile.complianceScore >= 90 ? "default" : currentProfile.complianceScore >= 80 ? "secondary" : "destructive"}>
                  {currentProfile.complianceScore >= 90 ? "Excellent" : currentProfile.complianceScore >= 80 ? "Bon" : "À améliorer"}
                </Badge>
              </div>
            </div>
            <Progress value={currentProfile.complianceScore} className="h-3" />
          </CardContent>
        </Card>
      </div>

      {/* Sélecteur de profil (pour demo) */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Profil d'entreprise (sélectionnez pour tester différents cas) :</h3>
        <div className="flex gap-2 flex-wrap">
          {taxProfiles.map((profile, index) => (
            <Button
              key={index}
              variant={selectedProfile === index ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedProfile(index)}
              className="text-xs"
            >
              {profile.companyName}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations du profil */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Profil fiscal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Entreprise</p>
                <p className="font-medium">{currentProfile.companyName}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-gray-600">Statut TVA</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={currentProfile.vatStatus === 'assujetti' ? 'default' : 'secondary'}>
                    {currentProfile.vatStatus === 'assujetti' ? 'Assujetti TVA' : 
                     currentProfile.vatStatus === 'franchise' ? 'Régime franchise' : 
                     'Petit entrepreneur'}
                  </Badge>
                  {currentProfile.vatStatus === 'assujetti' && (
                    <p className="text-xs text-gray-500">{currentProfile.vatNumber}</p>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-gray-600">Activité principale</p>
                <p className="text-sm mt-1">{currentProfile.activity}</p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-gray-600">Destinations principales</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {currentProfile.mainDestinations.map((dest, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      {dest}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <Button 
                onClick={handleProfileUpdate}
                variant="outline" 
                size="sm" 
                className="w-full"
              >
                Mettre à jour mon profil
              </Button>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={handleExpertConsultation}
              >
                <Users className="h-4 w-4 mr-2" />
                Consultation expert fiscal
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => onNavigate("reports")}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Rapport fiscal mensuel
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => onNavigate("shipments")}
              >
                <Package className="h-4 w-4 mr-2" />
                Historique des envois
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contrôles de conformité */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="compliance" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="compliance">Conformité</TabsTrigger>
              <TabsTrigger value="obligations">Obligations</TabsTrigger>
              <TabsTrigger value="estimations">Estimations</TabsTrigger>
            </TabsList>

            <TabsContent value="compliance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contrôles de conformité</CardTitle>
                  <CardDescription>
                    État actuel de votre conformité fiscale et TVA
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {complianceChecks.map((check) => (
                    <div 
                      key={check.id}
                      className={`p-4 border-l-4 rounded-lg ${getStatusColor(check.status)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(check.status)}
                            <h4 className="font-medium">{check.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{check.description}</p>
                          
                          {check.actionRequired && (
                            <Alert className="mt-2">
                              <AlertTriangle className="h-4 w-4" />
                              <AlertDescription className="text-sm">
                                <strong>Action requise :</strong> {check.actionRequired}
                              </AlertDescription>
                            </Alert>
                          )}
                          
                          {check.deadline && (
                            <div className="flex items-center gap-1 mt-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <p className="text-xs text-gray-500">
                                Échéance : {check.deadline}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="obligations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Obligations fiscales</CardTitle>
                  <CardDescription>
                    Vos obligations selon votre statut et activité
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentProfile.vatStatus === 'assujetti' ? (
                    <>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Régime TVA : Assujetti</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>✅ Déclaration TVA trimestrielle obligatoire</li>
                          <li>✅ EC Sales List (ESL) mensuelle pour exports UE</li>
                          <li>✅ Facturation avec exonération TVA (art. 14, §1)</li>
                          <li>⚠️ Vérification numéros TVA destinataires UE</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">Exports vers UE</h4>
                        <p className="text-sm text-green-800">
                          <strong>Exonération TVA applicable</strong> - Vos envois vers {currentProfile.mainDestinations.join(', ')} 
                          sont exonérés de TVA belge sous conditions de validité des numéros TVA destinataires.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="font-medium text-purple-900 mb-2">Régime de franchise</h4>
                        <ul className="text-sm text-purple-800 space-y-1">
                          <li>✅ Pas d'assujettissement à la TVA (CA &lt; €25.000)</li>
                          <li>✅ Facturation sans TVA avec mention obligatoire</li>
                          <li>✅ Pas de déclaration TVA à effectuer</li>
                          <li>⚠️ Surveillance du seuil de franchise</li>
                        </ul>
                      </div>
                    </>
                  )}

                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Déclarations statistiques</h4>
                    <p className="text-sm text-orange-800">
                      {currentProfile.activity.includes('Services') ? 
                        "⚠️ Déclaration Intrastat obligatoire pour les services (seuil €12.000 dépassé)" :
                        "📊 Déclaration Intrastat requise si seuil dépassé (€12.000 pour services, €250.000 pour biens)"
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="estimations" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="h-5 w-5" />
                    Estimations fiscales mensuelles
                  </CardTitle>
                  <CardDescription>
                    Montants estimés selon vos envois actuels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900">TVA à déclarer</h4>
                      <p className="text-2xl font-bold text-green-700">€0</p>
                      <p className="text-sm text-green-600">
                        {currentProfile.vatStatus === 'assujetti' ? 
                          "Exonération UE applicable" : 
                          "Régime de franchise"
                        }
                      </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900">Volume déclarable</h4>
                      <p className="text-2xl font-bold text-blue-700">€2.450</p>
                      <p className="text-sm text-blue-600">
                        Montant des livraisons UE ce mois
                      </p>
                    </div>
                  </div>

                  {currentProfile.complianceScore < 85 && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Attention :</strong> 2 de vos envois vers la France n'ont pas de numéro TVA 
                        valide pour le destinataire. Risque de rejet de l'exonération TVA.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Prochaines échéances</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center justify-between">
                        <span>Déclaration ESL octobre</span>
                        <Badge variant="outline">20/11/2024</Badge>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>Déclaration TVA Q4</span>
                        <Badge variant="outline">20/01/2025</Badge>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}