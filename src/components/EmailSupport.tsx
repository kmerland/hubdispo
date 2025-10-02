// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle, Clock, Paperclip, X, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useLanguage } from "./LanguageProvider";

interface EmailSupportProps {
  onNavigate?: (view: string, params?: any) => void;
}

interface TicketTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  fields: string[];
}

export default function EmailSupport({ onNavigate }: EmailSupportProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    category: '',
    priority: 'normal',
    description: '',
    orderNumber: '',
    shipmentId: ''
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ticketTemplates: TicketTemplate[] = [
    {
      id: 'first-shipment',
      title: 'Premier envoi - Assistance',
      category: 'getting-started',
      description: 'Aide pour créer votre premier envoi sur hubdispo.be',
      fields: ['company', 'description']
    },
    {
      id: 'consolidation-issue',
      title: 'Problème de consolidation',
      category: 'consolidation',
      description: 'Signaler un problème avec un groupe de consolidation',
      fields: ['shipmentId', 'description']
    },
    {
      id: 'customs-error',
      title: 'Erreur dans les documents douaniers',
      category: 'customs',
      description: 'Correction nécessaire sur les documents générés',
      fields: ['shipmentId', 'orderNumber', 'description']
    },
    {
      id: 'tracking-problem',
      title: 'Problème de suivi',
      category: 'tracking',
      description: 'Colis non mis à jour ou suivi incorrect',
      fields: ['shipmentId', 'orderNumber', 'description']
    },
    {
      id: 'billing-question',
      title: 'Question de facturation',
      category: 'billing',
      description: 'Demande concernant les tarifs ou la facturation',
      fields: ['orderNumber', 'description']
    },
    {
      id: 'technical-issue',
      title: 'Problème technique',
      category: 'technical',
      description: 'Bug ou dysfonctionnement de la plateforme',
      fields: ['description']
    }
  ];

  const responseTimesByCategory = {
    'getting-started': '1-2h',
    'consolidation': '30min-1h',
    'customs': '15-30min',
    'tracking': '30min-1h',
    'billing': '2-4h',
    'technical': '1-2h',
    'general': '2-4h'
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = ticketTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setFormData(prev => ({
        ...prev,
        subject: template.title,
        category: template.category
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getEstimatedResponseTime = () => {
    return responseTimesByCategory[formData.category as keyof typeof responseTimesByCategory] || '2-4h';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold mb-2">Ticket créé avec succès !</h1>
            <p className="text-gray-600">
              Nous avons bien reçu votre demande. Vous recevrez une réponse sous {getEstimatedResponseTime()}.
            </p>
          </div>
          <Card className="text-left max-w-md mx-auto">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Détails de votre ticket :</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Numéro :</strong> #HD{Date.now().toString().slice(-6)}</div>
                <div><strong>Sujet :</strong> {formData.subject}</div>
                <div><strong>Catégorie :</strong> {formData.category}</div>
                <div><strong>Priorité :</strong> 
                  <Badge className={`ml-2 ${
                    formData.priority === 'high' ? 'bg-red-100 text-red-700' :
                    formData.priority === 'normal' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {formData.priority === 'high' ? 'Élevée' : 
                     formData.priority === 'normal' ? 'Normale' : 'Faible'}
                  </Badge>
                </div>
                <div><strong>Temps de réponse estimé :</strong> {getEstimatedResponseTime()}</div>
              </div>
            </CardContent>
          </Card>
          <div className="space-x-4">
            <Button onClick={() => onNavigate?.('help')} variant="outline">
              Retour au centre d'aide
            </Button>
            <Button onClick={() => onNavigate?.('direct-chat')} className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
              Chat en direct
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
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">Support par email</h1>
            <p className="text-gray-600 text-lg">Décrivez votre problème en détail, nous vous répondrons rapidement</p>
          </div>
        </div>

        <Tabs defaultValue="new-ticket" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new-ticket">Nouveau ticket</TabsTrigger>
            <TabsTrigger value="templates">Modèles rapides</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-4">
              {ticketTemplates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate === template.id ? 'ring-2 ring-[#1E40AF] border-[#1E40AF]' : ''
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{template.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {responseTimesByCategory[template.category as keyof typeof responseTimesByCategory]}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      Temps de réponse : {responseTimesByCategory[template.category as keyof typeof responseTimesByCategory]}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {selectedTemplate && (
              <Button 
                onClick={() => setSelectedTemplate('')} 
                className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90"
              >
                Utiliser ce modèle
              </Button>
            )}
          </TabsContent>

          <TabsContent value="new-ticket" className="grid lg:grid-cols-3 gap-6">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Créer un ticket de support</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </div>

                    {/* Catégorie et priorité */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Catégorie *</Label>
                        <Select onValueChange={(value) => handleInputChange('category', value)} value={formData.category}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="getting-started">Premiers pas</SelectItem>
                            <SelectItem value="consolidation">Consolidation</SelectItem>
                            <SelectItem value="customs">Douane</SelectItem>
                            <SelectItem value="tracking">Suivi</SelectItem>
                            <SelectItem value="billing">Facturation</SelectItem>
                            <SelectItem value="technical">Technique</SelectItem>
                            <SelectItem value="general">Général</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priorité</Label>
                        <Select onValueChange={(value) => handleInputChange('priority', value)} defaultValue="normal">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Faible</SelectItem>
                            <SelectItem value="normal">Normale</SelectItem>
                            <SelectItem value="high">Élevée</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Champs contextuels */}
                    {(formData.category === 'tracking' || formData.category === 'consolidation' || formData.category === 'customs') && (
                      <div className="space-y-2">
                        <Label htmlFor="shipmentId">ID Envoi</Label>
                        <Input
                          id="shipmentId"
                          placeholder="ex: HD-2024-001234"
                          value={formData.shipmentId}
                          onChange={(e) => handleInputChange('shipmentId', e.target.value)}
                        />
                      </div>
                    )}

                    {(formData.category === 'billing' || formData.category === 'tracking') && (
                      <div className="space-y-2">
                        <Label htmlFor="orderNumber">Numéro de commande</Label>
                        <Input
                          id="orderNumber"
                          placeholder="ex: ORD-2024-5678"
                          value={formData.orderNumber}
                          onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                        />
                      </div>
                    )}

                    {/* Sujet */}
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet *</Label>
                      <Input
                        id="subject"
                        placeholder="Résumé de votre problème"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description détaillée *</Label>
                      <Textarea
                        id="description"
                        placeholder="Décrivez votre problème en détail. Plus vous donnerez d'informations, plus nous pourrons vous aider efficacement."
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={6}
                        required
                      />
                    </div>

                    {/* Pièces jointes */}
                    <div className="space-y-3">
                      <Label>Pièces jointes (optionnel)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Paperclip className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Glissez vos fichiers ici ou cliquez pour parcourir
                        </p>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          Choisir des fichiers
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">
                          Max 10MB par fichier. Formats: PDF, JPG, PNG, DOC, DOCX
                        </p>
                      </div>

                      {/* Liste des fichiers attachés */}
                      {attachments.length > 0 && (
                        <div className="space-y-2">
                          {attachments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Paperclip className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{file.name}</span>
                                <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeAttachment(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-orange-500 hover:bg-orange-600" 
                      size="lg"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Envoyer le ticket
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Informations et aide */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Temps de réponse</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {formData.category && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-700">
                          {getEstimatedResponseTime()}
                        </span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        Temps de réponse estimé pour votre catégorie
                      </p>
                    </div>
                  )}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Douane</span>
                      <Badge className="bg-green-100 text-green-700">15-30min</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Consolidation</span>
                      <Badge className="bg-blue-100 text-blue-700">30min-1h</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Technique</span>
                      <Badge className="bg-orange-100 text-orange-700">1-2h</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Général</span>
                      <Badge className="bg-gray-100 text-gray-700">2-4h</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Besoin d'aide plus rapidement ?</CardTitle>
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
                    onClick={() => onNavigate?.('phone-support')}
                  >
                    📞 Appel téléphonique (5min)
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

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-700">Conseil</p>
                      <p className="text-sm text-blue-600">
                        Plus votre description est détaillée, plus nous pourrons vous aider rapidement et efficacement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}