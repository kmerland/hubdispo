// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { User, Mail, Phone, Building2, MapPin, Calendar, Shield, Edit2, Camera, Save, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";

interface UserProfileProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function UserProfile({ onNavigate }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Marie",
    lastName: "Levert",
    email: "marie@techstore.be",
    phone: "+32 2 123 45 67",
    company: "TechStore SPRL",
    position: "Directrice Export",
    address: "Rue de la Tech 42",
    city: "Bruxelles",
    postalCode: "1000",
    country: "Belgique",
    vatNumber: "BE0123456789",
    bio: "Spécialisée dans l'export de produits électroniques vers l'Europe. Utilise hubdispo.be depuis 2 ans pour optimiser ses envois.",
    website: "www.techstore.be",
    industry: "Électronique"
  });

  const subscriptionInfo = {
    plan: "Business",
    status: "Actif",
    renewalDate: "15/11/2024",
    shipmentsUsed: 247,
    shipmentsLimit: 500,
    features: [
      "Consolidation illimitée",
      "Assistant douanier IA",
      "Support prioritaire",
      "Rapports avancés",
      "API access"
    ]
  };

  const recentActivity = [
    { date: "2024-10-01", action: "Profil mis à jour", details: "Informations de contact" },
    { date: "2024-09-28", action: "Abonnement renouvelé", details: "Plan Business - 12 mois" },
    { date: "2024-09-15", action: "Mot de passe modifié", details: "Connexion sécurisée" },
    { date: "2024-09-01", action: "Préférences mises à jour", details: "Notifications activées" }
  ];

  const handleSaveProfile = () => {
    // Simulation de sauvegarde
    console.log("Profil sauvegardé:", profileData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset des données si nécessaire
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* En-tête du profil */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[#1E40AF] text-white text-2xl">
                    {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 p-2 rounded-full"
                >
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
              <div>
                <h1 className="text-2xl font-semibold">
                  {profileData.firstName} {profileData.lastName}
                </h1>
                <p className="text-gray-600">{profileData.position} chez {profileData.company}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge className="bg-[#10B981] text-white">{subscriptionInfo.plan}</Badge>
                  <span className="text-sm text-gray-500">Membre depuis Mars 2022</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              ) : (
                <>
                  <Button onClick={handleCancelEdit} variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-[#10B981] hover:bg-[#10B981]/90"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Informations personnelles */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
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
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-medium mt-1">{profileData.firstName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-medium mt-1">{profileData.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-medium mt-1">{profileData.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-medium mt-1">{profileData.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-gray-600 mt-1">{profileData.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informations entreprise
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Entreprise</Label>
                  {isEditing ? (
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-medium mt-1">{profileData.company}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="position">Poste</Label>
                  {isEditing ? (
                    <Input
                      id="position"
                      value={profileData.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-medium mt-1">{profileData.position}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="address">Adresse</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                ) : (
                  <p className="text-sm font-medium mt-1">{profileData.address}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">Ville</Label>
                  {isEditing ? (
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-medium mt-1">{profileData.city}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="postalCode">Code postal</Label>
                  {isEditing ? (
                    <Input
                      id="postalCode"
                      value={profileData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-medium mt-1">{profileData.postalCode}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="country">Pays</Label>
                  {isEditing ? (
                    <Select value={profileData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Belgique">Belgique</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Luxembourg">Luxembourg</SelectItem>
                        <SelectItem value="Pays-Bas">Pays-Bas</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm font-medium mt-1">{profileData.country}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vatNumber">Numéro TVA</Label>
                  {isEditing ? (
                    <Input
                      id="vatNumber"
                      value={profileData.vatNumber}
                      onChange={(e) => handleInputChange("vatNumber", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-medium mt-1">{profileData.vatNumber}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="website">Site web</Label>
                  {isEditing ? (
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm font-medium mt-1">{profileData.website}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Abonnement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Abonnement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge className="bg-[#10B981] text-white text-lg px-4 py-2">
                  Plan {subscriptionInfo.plan}
                </Badge>
                <p className="text-sm text-gray-600 mt-2">Renouvellement le {subscriptionInfo.renewalDate}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Envois utilisés</span>
                  <span>{subscriptionInfo.shipmentsUsed}/{subscriptionInfo.shipmentsLimit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#1E40AF] h-2 rounded-full" 
                    style={{ width: `${(subscriptionInfo.shipmentsUsed / subscriptionInfo.shipmentsLimit) * 100}%` }}
                  ></div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-sm mb-2">Fonctionnalités incluses</h4>
                <ul className="space-y-1">
                  {subscriptionInfo.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                onClick={() => onNavigate?.("subscription")}
              >
                Gérer l'abonnement
              </Button>
            </CardContent>
          </Card>

          {/* Activité récente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Activité récente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                    {index < recentActivity.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}