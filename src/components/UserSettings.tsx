// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { User, Building, Bell, Shield, CreditCard, Key, Globe, Mail, Phone, MapPin, Save, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface UserSettingsProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function UserSettings({ onNavigate }: UserSettingsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "Marie",
    lastName: "Dubois",
    email: "marie.dubois@entreprise.be",
    phone: "+32 2 123 45 67",
    company: "Artisanat Belge Export",
    vatNumber: "BE0123456789",
    address: "Rue de la Paix 123",
    city: "Bruxelles",
    postalCode: "1000",
    country: "BE",
    language: "fr",
    timezone: "Europe/Brussels",
    currency: "EUR"
  });

  const [companyData, setCompanyData] = useState({
    name: "Artisanat Belge Export",
    vatNumber: "BE0123456789",
    address: "Rue de la Paix 123",
    city: "Bruxelles",
    postalCode: "1000",
    country: "BE",
    website: "www.artisanat-belge.be",
    description: "Exportateur d'artisanat belge traditionnel vers l'Europe",
    employees: "10-50",
    sector: "Artisanat"
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    loginNotifications: true,
    sessionTimeout: "4hours",
    apiAccess: false
  });

  const handleUserDataChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleCompanyDataChange = (field: string, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres du compte</h1>
          <p className="text-gray-600 mt-1">
            Gérez vos informations personnelles et préférences
          </p>
        </div>
        <Badge className="bg-[#10B981] text-white">
          Compte Pro actif
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="company">Entreprise</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
          <TabsTrigger value="billing">Facturation</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle>Photo de profil</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="/avatar-placeholder.jpg" />
                  <AvatarFallback className="text-2xl bg-[#1E40AF] text-white">
                    {userData.firstName[0]}{userData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button size="sm" variant="outline">
                    Changer la photo
                  </Button>
                  <p className="text-xs text-gray-500">
                    JPG, PNG ou GIF. Max 2MB.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={userData.firstName}
                      onChange={(e) => handleUserDataChange("firstName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={userData.lastName}
                      onChange={(e) => handleUserDataChange("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleUserDataChange("email", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={userData.phone}
                    onChange={(e) => handleUserDataChange("phone", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language">Langue</Label>
                    <Select value={userData.language} onValueChange={(value) => handleUserDataChange("language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="nl">Nederlands</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select value={userData.timezone} onValueChange={(value) => handleUserDataChange("timezone", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Brussels">Europe/Brussels (CET)</SelectItem>
                        <SelectItem value="Europe/Paris">Europe/Paris (CET)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder les modifications
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Informations de l'entreprise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Nom de l'entreprise</Label>
                <Input
                  id="companyName"
                  value={companyData.name}
                  onChange={(e) => handleCompanyDataChange("name", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vatNumber">Numéro TVA</Label>
                  <Input
                    id="vatNumber"
                    value={companyData.vatNumber}
                    onChange={(e) => handleCompanyDataChange("vatNumber", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Site web</Label>
                  <Input
                    id="website"
                    value={companyData.website}
                    onChange={(e) => handleCompanyDataChange("website", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="companyAddress">Adresse</Label>
                <Input
                  id="companyAddress"
                  value={companyData.address}
                  onChange={(e) => handleCompanyDataChange("address", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="companyCity">Ville</Label>
                  <Input
                    id="companyCity"
                    value={companyData.city}
                    onChange={(e) => handleCompanyDataChange("city", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="companyPostalCode">Code postal</Label>
                  <Input
                    id="companyPostalCode"
                    value={companyData.postalCode}
                    onChange={(e) => handleCompanyDataChange("postalCode", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="companyCountry">Pays</Label>
                  <Select value={companyData.country} onValueChange={(value) => handleCompanyDataChange("country", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BE">Belgique</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                      <SelectItem value="NL">Pays-Bas</SelectItem>
                      <SelectItem value="DE">Allemagne</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description de l'activité</Label>
                <Textarea
                  id="description"
                  value={companyData.description}
                  onChange={(e) => handleCompanyDataChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employees">Nombre d'employés</Label>
                  <Select value={companyData.employees} onValueChange={(value) => handleCompanyDataChange("employees", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-9">1-9 employés</SelectItem>
                      <SelectItem value="10-50">10-50 employés</SelectItem>
                      <SelectItem value="51-200">51-200 employés</SelectItem>
                      <SelectItem value="200+">200+ employés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sector">Secteur d'activité</Label>
                  <Select value={companyData.sector} onValueChange={(value) => handleCompanyDataChange("sector", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Artisanat">Artisanat</SelectItem>
                      <SelectItem value="Textile">Textile</SelectItem>
                      <SelectItem value="Alimentaire">Alimentaire</SelectItem>
                      <SelectItem value="Technologie">Technologie</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder les modifications
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Password */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Mot de passe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Entrez votre mot de passe actuel"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Entrez votre nouveau mot de passe"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirmez votre nouveau mot de passe"
                  />
                </div>

                <Button className="w-full">
                  Modifier le mot de passe
                </Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Paramètres de sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Authentification à deux facteurs</p>
                    <p className="text-sm text-gray-600">Code SMS ou app authentificateur</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactor}
                    onCheckedChange={(checked) => 
                      setSecuritySettings(prev => ({ ...prev, twoFactor: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications de connexion</p>
                    <p className="text-sm text-gray-600">Email lors de nouvelles connexions</p>
                  </div>
                  <Switch
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) => 
                      setSecuritySettings(prev => ({ ...prev, loginNotifications: checked }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="sessionTimeout">Expiration de session</Label>
                  <Select 
                    value={securitySettings.sessionTimeout} 
                    onValueChange={(value) => 
                      setSecuritySettings(prev => ({ ...prev, sessionTimeout: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1hour">1 heure</SelectItem>
                      <SelectItem value="4hours">4 heures</SelectItem>
                      <SelectItem value="8hours">8 heures</SelectItem>
                      <SelectItem value="24hours">24 heures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Accès API</p>
                    <p className="text-sm text-gray-600">Autoriser l'accès aux API</p>
                  </div>
                  <Switch
                    checked={securitySettings.apiAccess}
                    onCheckedChange={(checked) => 
                      setSecuritySettings(prev => ({ ...prev, apiAccess: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Préférences générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Devise</Label>
                  <Select value={userData.currency} onValueChange={(value) => handleUserDataChange("currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="USD">Dollar US ($)</SelectItem>
                      <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateFormat">Format de date</Label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Informations de facturation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Les informations de facturation sont gérées via votre abonnement
                </p>
                <Button variant="outline">
                  Gérer l'abonnement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}