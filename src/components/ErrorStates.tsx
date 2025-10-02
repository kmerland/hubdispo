// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { AlertTriangle, Wifi, RefreshCw, Home, ArrowLeft, FileX, Database, Shield, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";

interface ErrorStateProps {
  title: string;
  message: string;
  action?: () => void;
  actionLabel?: string;
  onNavigate?: (view: string) => void;
  type?: 'error' | 'warning' | 'info';
}

// Composant d'erreur générique
export function ErrorState({ 
  title, 
  message, 
  action, 
  actionLabel = "Réessayer", 
  onNavigate,
  type = 'error' 
}: ErrorStateProps) {
  const colors = {
    error: "text-red-600 bg-red-50 border-red-200",
    warning: "text-amber-600 bg-amber-50 border-amber-200", 
    info: "text-blue-600 bg-blue-50 border-blue-200"
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card className={`border-2 ${colors[type]}`}>
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-full ${colors[type]}`}>
              <AlertTriangle className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {action && (
              <Button onClick={action} className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                <RefreshCw className="h-4 w-4 mr-2" />
                {actionLabel}
              </Button>
            )}
            {onNavigate && (
              <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                <Home className="h-4 w-4 mr-2" />
                Retour au tableau de bord
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Erreur de connexion réseau
export function NetworkError({ onRetry, onNavigate }: { onRetry: () => void; onNavigate?: (view: string) => void }) {
  return (
    <ErrorState
      title="Problème de connexion"
      message="Impossible de se connecter à nos serveurs. Vérifiez votre connexion internet et réessayez."
      action={onRetry}
      actionLabel="Réessayer"
      onNavigate={onNavigate}
      type="warning"
    />
  );
}

// Erreur de données non trouvées
export function NotFoundError({ item = "ressource", onBack, onNavigate }: { 
  item?: string; 
  onBack?: () => void; 
  onNavigate?: (view: string) => void 
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card className="border-2 border-gray-200 bg-gray-50">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gray-100 rounded-full">
              <FileX className="h-8 w-8 text-gray-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            {item} introuvable
          </h2>
          <p className="text-gray-600 mb-6">
            La {item} que vous recherchez n'existe pas ou a été supprimée.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onBack && (
              <Button onClick={onBack} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            )}
            {onNavigate && (
              <Button onClick={() => onNavigate('dashboard')} className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                <Home className="h-4 w-4 mr-2" />
                Tableau de bord
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Erreur de validation de formulaire
export function FormValidationError({ errors, onDismiss }: { 
  errors: string[]; 
  onDismiss?: () => void 
}) {
  return (
    <Alert className="border-red-200 bg-red-50 mb-4">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800">
        <div className="flex items-start justify-between">
          <div>
            <strong>Erreurs de validation :</strong>
            <ul className="mt-1 list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-sm">{error}</li>
              ))}
            </ul>
          </div>
          {onDismiss && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDismiss}
              className="text-red-600 hover:text-red-800 hover:bg-red-100"
            >
              ×
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}

// Erreur de serveur
export function ServerError({ onRetry, onNavigate }: { 
  onRetry: () => void; 
  onNavigate?: (view: string) => void 
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card className="border-2 border-red-200 bg-red-50">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Database className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-red-900">
            Erreur serveur
          </h2>
          <p className="text-red-700 mb-6">
            Nos serveurs rencontrent temporairement des difficultés. Notre équipe technique a été notifiée.
          </p>
          <div className="bg-red-100 p-3 rounded-lg mb-6">
            <p className="text-sm text-red-800">
              <strong>Code d'erreur:</strong> SRV_500_TEMP
            </p>
            <p className="text-sm text-red-800">
              <strong>Heure:</strong> {new Date().toLocaleString('fr-BE')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={onRetry} className="bg-red-600 hover:bg-red-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </Button>
            {onNavigate && (
              <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                <Home className="h-4 w-4 mr-2" />
                Tableau de bord
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Erreur de permissions
export function PermissionError({ requiredPlan = "Premium", onNavigate }: { 
  requiredPlan?: string; 
  onNavigate?: (view: string) => void 
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card className="border-2 border-amber-200 bg-amber-50">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-100 rounded-full">
              <Shield className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-amber-900">
            Accès restreint
          </h2>
          <p className="text-amber-700 mb-4">
            Cette fonctionnalité nécessite un abonnement {requiredPlan}.
          </p>
          <Badge className="bg-amber-600 text-white mb-6">
            Plan requis: {requiredPlan}
          </Badge>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onNavigate && (
              <>
                <Button 
                  onClick={() => onNavigate('subscription')} 
                  className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                >
                  Voir les abonnements
                </Button>
                <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                  <Home className="h-4 w-4 mr-2" />
                  Tableau de bord
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Message d'erreur inline pour les champs
export function FieldError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
      <AlertTriangle className="h-3 w-3" />
      <span>{message}</span>
    </div>
  );
}

// Erreur de timeout
export function TimeoutError({ onRetry, onNavigate }: { 
  onRetry: () => void; 
  onNavigate?: (view: string) => void 
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card className="border-2 border-orange-200 bg-orange-50">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-orange-900">
            Délai d'attente dépassé
          </h2>
          <p className="text-orange-700 mb-6">
            L'opération prend plus de temps que prévu. Nos serveurs pourraient être surchargés.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={onRetry} className="bg-orange-600 hover:bg-orange-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </Button>
            {onNavigate && (
              <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                <Home className="h-4 w-4 mr-2" />
                Tableau de bord
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Erreur de maintenance
export function MaintenanceError({ estimatedTime = "2 heures", onNavigate }: { 
  estimatedTime?: string; 
  onNavigate?: (view: string) => void 
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-blue-900">
            Maintenance en cours
          </h2>
          <p className="text-blue-700 mb-4">
            HubDispo est temporairement indisponible pour maintenance programmée.
          </p>
          <div className="bg-blue-100 p-3 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              <strong>Durée estimée:</strong> {estimatedTime}
            </p>
            <p className="text-sm text-blue-800">
              <strong>Statut:</strong> hubdispo.be/status
            </p>
          </div>
          {onNavigate && (
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}