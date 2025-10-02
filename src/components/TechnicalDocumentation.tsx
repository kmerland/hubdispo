// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { ArrowLeft, Search, Book, Code, Layers, Shield, Settings, Globe, ChevronRight, Copy, ExternalLink, Download, FileCode, Database, Zap, Monitor, Users, Package, Truck, HelpCircle, Lock, Activity, Cog } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useLanguage } from "./LanguageProvider";

interface TechnicalDocumentationProps {
  onNavigate: (view: string) => void;
}

export default function TechnicalDocumentation({ onNavigate }: TechnicalDocumentationProps) {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("architecture");

  const getContent = () => {
    switch (language) {
      case 'en':
        return {
          title: "Technical Documentation",
          subtitle: "Complete technical architecture and development guide for hubdispo.be",
          sections: {
            architecture: {
              title: "Architecture & Components",
              icon: Layers,
              items: [
                { title: "Application Structure", description: "React application architecture and file organization", complexity: "Beginner" },
                { title: "Component Design System", description: "UI components, Tailwind CSS implementation and design tokens", complexity: "Intermediate" },
                { title: "State Management", description: "Local state, context providers and data flow", complexity: "Intermediate" },
                { title: "Navigation System", description: "Client-side routing implementation and view management", complexity: "Advanced" },
                { title: "Performance Optimization", description: "Code splitting, lazy loading and optimization techniques", complexity: "Advanced" }
              ]
            },
            authentication: {
              title: "Authentication System",
              icon: Lock,
              items: [
                { title: "AuthProvider Implementation", description: "User authentication context and session management", complexity: "Intermediate" },
                { title: "Protected Routes", description: "Route protection and access control implementation", complexity: "Intermediate" },
                { title: "User Management", description: "User profiles, permissions and role-based access", complexity: "Advanced" },
                { title: "Security Best Practices", description: "Security implementation and threat prevention", complexity: "Advanced" }
              ]
            },
            internationalization: {
              title: "Internationalization",
              icon: Globe,
              items: [
                { title: "LanguageProvider Setup", description: "Multi-language context and translation system", complexity: "Beginner" },
                { title: "Translation Management", description: "Adding and managing translations (FR/EN/NL)", complexity: "Beginner" },
                { title: "Locale-specific Features", description: "Date formats, currency and regional settings", complexity: "Intermediate" },
                { title: "Dynamic Content Translation", description: "Runtime content translation and fallbacks", complexity: "Advanced" }
              ]
            },
            components: {
              title: "Core Components",
              icon: FileCode,
              items: [
                { title: "Dashboard System", description: "OptimizedDashboard, widgets and real-time indicators", complexity: "Intermediate" },
                { title: "FAQ System", description: "ComprehensiveFAQ, FloatingFAQButton and QuickFAQWidget", complexity: "Intermediate" },
                { title: "Shipment Management", description: "EnhancedShipmentForm, tracking and consolidation", complexity: "Advanced" },
                { title: "Help Center", description: "Comprehensive help system and documentation", complexity: "Intermediate" },
                { title: "Notification System", description: "Real-time notifications and alert management", complexity: "Advanced" }
              ]
            },
            api: {
              title: "API Integration",
              icon: Database,
              items: [
                { title: "REST API Endpoints", description: "Backend API integration and data fetching", complexity: "Intermediate" },
                { title: "Data Models", description: "TypeScript interfaces and data structures", complexity: "Beginner" },
                { title: "Error Handling", description: "API error management and user feedback", complexity: "Intermediate" },
                { title: "Real-time Features", description: "WebSocket connections and live updates", complexity: "Advanced" }
              ]
            },
            development: {
              title: "Development Guide",
              icon: Code,
              items: [
                { title: "Development Setup", description: "Local environment setup and dependencies", complexity: "Beginner" },
                { title: "Coding Standards", description: "TypeScript conventions and code quality", complexity: "Beginner" },
                { title: "Component Creation", description: "Creating new components and following patterns", complexity: "Intermediate" },
                { title: "Testing Strategy", description: "Unit testing, integration tests and E2E testing", complexity: "Advanced" },
                { title: "Deployment Process", description: "Build process, CI/CD and production deployment", complexity: "Advanced" }
              ]
            }
          },
          architectureDetails: {
            fileStructure: `hubdispo.be/
├── App.tsx                 # Main application component
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── AuthProvider.tsx  # Authentication context
│   ├── LanguageProvider.tsx # Internationalization
│   ├── OptimizedDashboard.tsx # Main dashboard
│   ├── ComprehensiveFAQ.tsx # FAQ system
│   └── ... other components
├── styles/
│   └── globals.css       # Tailwind CSS configuration
└── guidelines/
    └── Guidelines.md     # Development guidelines`,
            corePatterns: [
              {
                title: "Component Props Pattern",
                description: "Standard interface pattern for navigation and state management",
                code: `interface ComponentProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function Component({ onNavigate }: ComponentProps) {
  // Component implementation
}`
              },
              {
                title: "Language Context Usage",
                description: "Using the language provider for translations",
                code: `import { useLanguage } from "./LanguageProvider";

function Component() {
  const { t, language } = useLanguage();
  
  return <h1>{t('welcome.title')}</h1>;
}`
              },
              {
                title: "Authentication Protection",
                description: "Protecting routes with authentication",
                code: `import { useAuth } from "./AuthProvider";

function ProtectedComponent() {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  return <DashboardContent />;
}`
              }
            ]
          },
          apiExamples: [
            {
              title: "Component Communication",
              language: "typescript",
              code: `// Parent component
const [currentView, setCurrentView] = useState("dashboard");
const [viewParams, setViewParams] = useState<any>({});

const handleNavigate = (view: string, params?: any) => {
  setCurrentView(view);
  setViewParams(params || {});
};

// Child component
<ChildComponent 
  onNavigate={handleNavigate}
  initialData={viewParams}
/>`
            },
            {
              title: "Language Provider Setup",
              language: "typescript", 
              code: `// In App.tsx
export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}`
            },
            {
              title: "Creating New Components",
              language: "typescript",
              code: `import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface NewComponentProps {
  onNavigate: (view: string) => void;
  initialData?: any;
}

export default function NewComponent({ onNavigate, initialData }: NewComponentProps) {
  const { t, language } = useLanguage();
  const [localState, setLocalState] = useState(initialData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('component.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Component content */}
      </CardContent>
    </Card>
  );
}`
            }
          ]
        };
      case 'nl':
        return {
          title: "Technische Documentatie",
          subtitle: "Volledige technische architectuur en ontwikkelingsgids voor hubdispo.be",
          sections: {
            architecture: {
              title: "Architectuur & Componenten",
              icon: Layers,
              items: [
                { title: "Applicatie Structuur", description: "React applicatie architectuur en bestandsorganisatie", complexity: "Beginner" },
                { title: "Component Design Systeem", description: "UI componenten, Tailwind CSS implementatie en design tokens", complexity: "Gemiddeld" },
                { title: "State Management", description: "Lokale state, context providers en dataflow", complexity: "Gemiddeld" },
                { title: "Navigatie Systeem", description: "Client-side routing implementatie en view management", complexity: "Gevorderd" },
                { title: "Performance Optimalisatie", description: "Code splitting, lazy loading en optimalisatie technieken", complexity: "Gevorderd" }
              ]
            },
            authentication: {
              title: "Authenticatie Systeem",
              icon: Lock,
              items: [
                { title: "AuthProvider Implementatie", description: "Gebruikersauthenticatie context en sessie management", complexity: "Gemiddeld" },
                { title: "Beschermde Routes", description: "Route beveiliging en toegangscontrole implementatie", complexity: "Gemiddeld" },
                { title: "Gebruikersbeheer", description: "Gebruikersprofielen, permissies en rol-gebaseerde toegang", complexity: "Gevorderd" },
                { title: "Beveiligingspraktijken", description: "Beveiligingsimplementatie en bedreigingspreventie", complexity: "Gevorderd" }
              ]
            },
            internationalization: {
              title: "Internationalisatie",
              icon: Globe,
              items: [
                { title: "LanguageProvider Setup", description: "Meertalige context en vertaalsysteem", complexity: "Beginner" },
                { title: "Vertaling Management", description: "Toevoegen en beheren van vertalingen (FR/EN/NL)", complexity: "Beginner" },
                { title: "Locale-specifieke Functies", description: "Datumformaten, valuta en regionale instellingen", complexity: "Gemiddeld" },
                { title: "Dynamische Inhoudsvertaling", description: "Runtime inhoudsvertaling en fallbacks", complexity: "Gevorderd" }
              ]
            },
            components: {
              title: "Kern Componenten",
              icon: FileCode,
              items: [
                { title: "Dashboard Systeem", description: "OptimizedDashboard, widgets en real-time indicatoren", complexity: "Gemiddeld" },
                { title: "FAQ Systeem", description: "ComprehensiveFAQ, FloatingFAQButton en QuickFAQWidget", complexity: "Gemiddeld" },
                { title: "Zending Management", description: "EnhancedShipmentForm, tracking en consolidatie", complexity: "Gevorderd" },
                { title: "Help Center", description: "Uitgebreid helpsysteem en documentatie", complexity: "Gemiddeld" },
                { title: "Notificatie Systeem", description: "Real-time notificaties en alert management", complexity: "Gevorderd" }
              ]
            },
            api: {
              title: "API Integratie",
              icon: Database,
              items: [
                { title: "REST API Endpoints", description: "Backend API integratie en data ophaling", complexity: "Gemiddeld" },
                { title: "Data Modellen", description: "TypeScript interfaces en datastructuren", complexity: "Beginner" },
                { title: "Foutafhandeling", description: "API foutbeheer en gebruikersfeedback", complexity: "Gemiddeld" },
                { title: "Real-time Functies", description: "WebSocket verbindingen en live updates", complexity: "Gevorderd" }
              ]
            },
            development: {
              title: "Ontwikkelingsgids",
              icon: Code,
              items: [
                { title: "Ontwikkelingssetup", description: "Lokale omgeving setup en afhankelijkheden", complexity: "Beginner" },
                { title: "Codeerstandaarden", description: "TypeScript conventies en codekwaliteit", complexity: "Beginner" },
                { title: "Component Creatie", description: "Nieuwe componenten maken en patronen volgen", complexity: "Gemiddeld" },
                { title: "Test Strategie", description: "Unit testing, integratie tests en E2E testing", complexity: "Gevorderd" },
                { title: "Deployment Proces", description: "Build proces, CI/CD en productie deployment", complexity: "Gevorderd" }
              ]
            }
          },
          architectureDetails: {
            fileStructure: `hubdispo.be/
├── App.tsx                 # Hoofdapplicatie component
├── components/            # React componenten
│   ├── ui/               # Herbruikbare UI componenten (shadcn/ui)
│   ├── AuthProvider.tsx  # Authenticatie context
│   ├── LanguageProvider.tsx # Internationalisatie
│   ├── OptimizedDashboard.tsx # Hoofddashboard
│   ├── ComprehensiveFAQ.tsx # FAQ systeem
│   └── ... andere componenten
├── styles/
│   └── globals.css       # Tailwind CSS configuratie
└── guidelines/
    └── Guidelines.md     # Ontwikkelingsrichtlijnen`,
            corePatterns: [
              {
                title: "Component Props Patroon",
                description: "Standaard interface patroon voor navigatie en state management",
                code: `interface ComponentProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function Component({ onNavigate }: ComponentProps) {
  // Component implementatie
}`
              },
              {
                title: "Taal Context Gebruik",
                description: "Gebruik van de taal provider voor vertalingen",
                code: `import { useLanguage } from "./LanguageProvider";

function Component() {
  const { t, language } = useLanguage();
  
  return <h1>{t('welcome.title')}</h1>;
}`
              },
              {
                title: "Authenticatie Beveiliging",
                description: "Routes beveiligen met authenticatie",
                code: `import { useAuth } from "./AuthProvider";

function ProtectedComponent() {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  return <DashboardContent />;
}`
              }
            ]
          },
          apiExamples: [
            {
              title: "Component Communicatie",
              language: "typescript",
              code: `// Parent component
const [currentView, setCurrentView] = useState("dashboard");
const [viewParams, setViewParams] = useState<any>({});

const handleNavigate = (view: string, params?: any) => {
  setCurrentView(view);
  setViewParams(params || {});
};

// Child component
<ChildComponent 
  onNavigate={handleNavigate}
  initialData={viewParams}
/>`
            },
            {
              title: "Language Provider Setup",
              language: "typescript", 
              code: `// In App.tsx
export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}`
            },
            {
              title: "Nieuwe Componenten Maken",
              language: "typescript",
              code: `import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface NewComponentProps {
  onNavigate: (view: string) => void;
  initialData?: any;
}

export default function NewComponent({ onNavigate, initialData }: NewComponentProps) {
  const { t, language } = useLanguage();
  const [localState, setLocalState] = useState(initialData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('component.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Component content */}
      </CardContent>
    </Card>
  );
}`
            }
          ]
        };
      default: // fr
        return {
          title: "Documentation Technique",
          subtitle: "Architecture technique complète et guide de développement pour hubdispo.be",
          sections: {
            architecture: {
              title: "Architecture & Composants",
              icon: Layers,
              items: [
                { title: "Structure de l'Application", description: "Architecture de l'application React et organisation des fichiers", complexity: "Débutant" },
                { title: "Système de Design", description: "Composants UI, implémentation Tailwind CSS et design tokens", complexity: "Intermédiaire" },
                { title: "Gestion d'État", description: "État local, context providers et flux de données", complexity: "Intermédiaire" },
                { title: "Système de Navigation", description: "Implémentation du routing côté client et gestion des vues", complexity: "Avancé" },
                { title: "Optimisation Performance", description: "Code splitting, lazy loading et techniques d'optimisation", complexity: "Avancé" }
              ]
            },
            authentication: {
              title: "Système d'Authentification",
              icon: Lock,
              items: [
                { title: "Implémentation AuthProvider", description: "Context d'authentification et gestion de session", complexity: "Intermédiaire" },
                { title: "Routes Protégées", description: "Protection des routes et implémentation du contrôle d'accès", complexity: "Intermédiaire" },
                { title: "Gestion Utilisateurs", description: "Profils utilisateurs, permissions et accès basé sur les rôles", complexity: "Avancé" },
                { title: "Pratiques de Sécurité", description: "Implémentation sécurisée et prévention des menaces", complexity: "Avancé" }
              ]
            },
            internationalization: {
              title: "Internationalisation",
              icon: Globe,
              items: [
                { title: "Configuration LanguageProvider", description: "Context multilingue et système de traduction", complexity: "Débutant" },
                { title: "Gestion des Traductions", description: "Ajout et gestion des traductions (FR/EN/NL)", complexity: "Débutant" },
                { title: "Fonctionnalités Locales", description: "Formats de date, devise et paramètres régionaux", complexity: "Intermédiaire" },
                { title: "Traduction Dynamique", description: "Traduction de contenu runtime et fallbacks", complexity: "Avancé" }
              ]
            },
            components: {
              title: "Composants Principaux",
              icon: FileCode,
              items: [
                { title: "Système Dashboard", description: "OptimizedDashboard, widgets et indicateurs temps réel", complexity: "Intermédiaire" },
                { title: "Système FAQ", description: "ComprehensiveFAQ, FloatingFAQButton et QuickFAQWidget", complexity: "Intermédiaire" },
                { title: "Gestion Envois", description: "EnhancedShipmentForm, suivi et consolidation", complexity: "Avancé" },
                { title: "Centre d'Aide", description: "Système d'aide complet et documentation", complexity: "Intermédiaire" },
                { title: "Système Notifications", description: "Notifications temps réel et gestion des alertes", complexity: "Avancé" }
              ]
            },
            api: {
              title: "Intégration API",
              icon: Database,
              items: [
                { title: "Endpoints REST API", description: "Intégration API backend et récupération de données", complexity: "Intermédiaire" },
                { title: "Modèles de Données", description: "Interfaces TypeScript et structures de données", complexity: "Débutant" },
                { title: "Gestion d'Erreurs", description: "Gestion des erreurs API et feedback utilisateur", complexity: "Intermédiaire" },
                { title: "Fonctionnalités Temps Réel", description: "Connexions WebSocket et mises à jour live", complexity: "Avancé" }
              ]
            },
            development: {
              title: "Guide de Développement",
              icon: Code,
              items: [
                { title: "Configuration Développement", description: "Configuration environnement local et dépendances", complexity: "Débutant" },
                { title: "Standards de Code", description: "Conventions TypeScript et qualité de code", complexity: "Débutant" },
                { title: "Création de Composants", description: "Créer de nouveaux composants et suivre les patterns", complexity: "Intermédiaire" },
                { title: "Stratégie de Tests", description: "Tests unitaires, tests d'intégration et tests E2E", complexity: "Avancé" },
                { title: "Processus de Déploiement", description: "Processus de build, CI/CD et déploiement production", complexity: "Avancé" }
              ]
            }
          },
          architectureDetails: {
            fileStructure: `hubdispo.be/
├── App.tsx                 # Composant principal de l'application
├── components/            # Composants React
│   ├── ui/               # Composants UI réutilisables (shadcn/ui)
│   ├── AuthProvider.tsx  # Context d'authentification
│   ├── LanguageProvider.tsx # Internationalisation
│   ├── OptimizedDashboard.tsx # Dashboard principal
│   ├── ComprehensiveFAQ.tsx # Système FAQ
│   └── ... autres composants
├── styles/
│   └── globals.css       # Configuration Tailwind CSS
└── guidelines/
    └── Guidelines.md     # Directives de développement`,
            corePatterns: [
              {
                title: "Pattern Props Composant",
                description: "Pattern d'interface standard pour la navigation et gestion d'état",
                code: `interface ComponentProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function Component({ onNavigate }: ComponentProps) {
  // Implémentation du composant
}`
              },
              {
                title: "Utilisation Context Langue",
                description: "Utilisation du provider de langue pour les traductions",
                code: `import { useLanguage } from "./LanguageProvider";

function Component() {
  const { t, language } = useLanguage();
  
  return <h1>{t('welcome.title')}</h1>;
}`
              },
              {
                title: "Protection Authentification",
                description: "Protection des routes avec authentification",
                code: `import { useAuth } from "./AuthProvider";

function ProtectedComponent() {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  return <DashboardContent />;
}`
              }
            ]
          },
          apiExamples: [
            {
              title: "Communication Composants",
              language: "typescript",
              code: `// Composant parent
const [currentView, setCurrentView] = useState("dashboard");
const [viewParams, setViewParams] = useState<any>({});

const handleNavigate = (view: string, params?: any) => {
  setCurrentView(view);
  setViewParams(params || {});
};

// Composant enfant
<ChildComponent 
  onNavigate={handleNavigate}
  initialData={viewParams}
/>`
            },
            {
              title: "Configuration Language Provider",
              language: "typescript", 
              code: `// Dans App.tsx
export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}`
            },
            {
              title: "Création Nouveaux Composants",
              language: "typescript",
              code: `import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface NewComponentProps {
  onNavigate: (view: string) => void;
  initialData?: any;
}

export default function NewComponent({ onNavigate, initialData }: NewComponentProps) {
  const { t, language } = useLanguage();
  const [localState, setLocalState] = useState(initialData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('component.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Contenu du composant */}
      </CardContent>
    </Card>
  );
}`
            }
          ]
        };
    }
  };

  const content = getContent();

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner':
      case 'Débutant':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
      case 'Intermédiaire':
      case 'Gemiddeld':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
      case 'Avancé':
      case 'Gevorderd':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSections = Object.entries(content.sections).filter(([key, section]) =>
    searchQuery === "" ||
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.items.some(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("help")}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('support.back_to_help')}
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#1E40AF]/10 rounded-lg">
              <FileCode className="h-8 w-8 text-[#1E40AF]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
              <p className="text-gray-600 mt-1">{content.subtitle}</p>
            </div>
          </div>
          
          {/* Search */}
          <div className="mt-6 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder={t('support.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            {Object.entries(content.sections).map(([key, section]) => (
              <TabsTrigger key={key} value={key} className="text-xs lg:text-sm">
                <section.icon className="h-4 w-4 mr-1 lg:mr-2" />
                <span className="hidden lg:inline">{section.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {filteredSections.map(([key, section]) => (
            <TabsContent key={key} value={key}>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <section.icon className="h-6 w-6 text-[#1E40AF]" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {section.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer group">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900 group-hover:text-[#1E40AF]">
                                {item.title}
                              </h3>
                              <Badge className={`text-xs ${getComplexityColor(item.complexity)}`}>
                                {item.complexity}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#1E40AF]" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Architecture Details for Architecture Tab */}
                {key === 'architecture' && (
                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <Layers className="h-5 w-5 text-[#1E40AF]" />
                          Structure des Fichiers
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm whitespace-pre-wrap">
                            <code>{content.architectureDetails.fileStructure}</code>
                          </pre>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <Code className="h-5 w-5 text-[#1E40AF]" />
                          Patterns Principaux
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible>
                          {content.architectureDetails.corePatterns.map((pattern, index) => (
                            <AccordionItem key={index} value={`pattern-${index}`}>
                              <AccordionTrigger className="text-left">
                                <div>
                                  <div className="font-semibold">{pattern.title}</div>
                                  <div className="text-sm text-gray-600">{pattern.description}</div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                  <pre className="text-sm">
                                    <code>{pattern.code}</code>
                                  </pre>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Code Examples for Development Tab */}
                {key === 'development' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Exemples de Code</h2>
                    {content.apiExamples.map((example, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>{example.title}</span>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Copy className="h-4 w-4 mr-2" />
                                Copier
                              </Button>
                              <Button size="sm" variant="outline">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Essayer
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                            <pre className="text-sm">
                              <code>{example.code}</code>
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Reference Cards */}
        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          <Card className="border-[#1E40AF] bg-[#1E40AF]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#1E40AF]">
                <Zap className="h-5 w-5" />
                Démarrage Rapide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Cloner le repository</li>
                <li>• Installer les dépendances</li>
                <li>• Configurer l'environnement</li>
                <li>• Lancer le serveur de développement</li>
              </ul>
              <Button className="w-full mt-4" onClick={() => onNavigate('guides')}>
                Guide Complet
              </Button>
            </CardContent>
          </Card>

          <Card className="border-[#10B981] bg-[#10B981]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#10B981]">
                <Users className="h-5 w-5" />
                Contribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Standards de code</li>
                <li>• Processus de review</li>
                <li>• Tests requis</li>
                <li>• Documentation</li>
              </ul>
              <Button variant="outline" className="w-full mt-4">
                Guidelines
              </Button>
            </CardContent>
          </Card>

          <Card className="border-orange-500 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-orange-600">
                <Activity className="h-5 w-5" />
                Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Performance monitoring</li>
                <li>• Error tracking</li>
                <li>• Analytics</li>
                <li>• Health checks</li>
              </ul>
              <Button variant="outline" className="w-full mt-4" onClick={() => onNavigate('platform-status')}>
                Statut Plateforme
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Download Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Download className="h-6 w-6 text-[#10B981]" />
              Ressources Téléchargeables
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <Download className="h-4 w-4" />
                    <span className="font-medium">Architecture Guide</span>
                  </div>
                  <p className="text-sm text-gray-600">Documentation PDF complète</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <Code className="h-4 w-4" />
                    <span className="font-medium">TypeScript Definitions</span>
                  </div>
                  <p className="text-sm text-gray-600">Types et interfaces</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <Settings className="h-4 w-4" />
                    <span className="font-medium">Configuration Templates</span>
                  </div>
                  <p className="text-sm text-gray-600">Templates de configuration</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">Style Guide</span>
                  </div>
                  <p className="text-sm text-gray-600">Guide de style et design</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}