// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { ArrowLeft, GitBranch, Code, FileText, CheckCircle, AlertTriangle, Users, Zap, Book, Settings, Shield, Target, Layers, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { useLanguage } from "./LanguageProvider";

interface ContributionGuideProps {
  onNavigate: (view: string) => void;
}

export default function ContributionGuide({ onNavigate }: ContributionGuideProps) {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState("getting-started");

  const getContent = () => {
    switch (language) {
      case 'en':
        return {
          title: "Contribution Guide",
          subtitle: "How to contribute to hubdispo.be platform development",
          sections: {
            gettingStarted: {
              title: "Getting Started",
              icon: Zap,
              content: {
                prerequisites: [
                  "Node.js 18+ and npm/yarn",
                  "Git and GitHub account",
                  "TypeScript knowledge",
                  "React experience",
                  "Tailwind CSS familiarity"
                ],
                setupSteps: [
                  {
                    title: "1. Fork the Repository",
                    description: "Create a fork of the hubdispo.be repository on GitHub",
                    code: "# Clone your fork\ngit clone https://github.com/your-username/hubdispo.be.git\ncd hubdispo.be"
                  },
                  {
                    title: "2. Install Dependencies",
                    description: "Install all required packages and dependencies",
                    code: "# Install dependencies\nnpm install\n\n# or with yarn\nyarn install"
                  },
                  {
                    title: "3. Start Development Server",
                    description: "Run the application in development mode",
                    code: "# Start development server\nnpm run dev\n\n# Application will be available at http://localhost:3000"
                  }
                ]
              }
            },
            codeStandards: {
              title: "Code Standards",
              icon: Code,
              content: {
                rules: [
                  {
                    title: "TypeScript First",
                    description: "All new code must be written in TypeScript",
                    example: "// ✅ Good\ninterface ComponentProps {\n  onNavigate: (view: string) => void;\n}\n\n// ❌ Bad\n// No type definitions"
                  },
                  {
                    title: "Component Props Pattern",
                    description: "Use consistent prop interfaces",
                    example: "// Standard pattern for all components\ninterface ComponentProps {\n  onNavigate: (view: string, params?: any) => void;\n  initialData?: any;\n}\n\nexport default function Component({ onNavigate, initialData }: ComponentProps) {\n  // Implementation\n}"
                  },
                  {
                    title: "Import Organization",
                    description: "Organize imports in a specific order",
                    example: "// 1. React imports\nimport { useState, useEffect } from 'react';\n\n// 2. Third-party libraries\nimport { Button } from './ui/button';\n\n// 3. Internal components\nimport { useLanguage } from './LanguageProvider';\n\n// 4. Types (if separate file)\nimport type { ComponentProps } from './types';"
                  }
                ]
              }
            },
            workflow: {
              title: "Development Workflow",
              icon: GitBranch,
              content: {
                steps: [
                  {
                    title: "Create Feature Branch",
                    description: "Create a new branch for your feature",
                    commands: [
                      "git checkout main",
                      "git pull origin main",
                      "git checkout -b feature/your-feature-name"
                    ]
                  },
                  {
                    title: "Make Changes",
                    description: "Develop your feature following our guidelines",
                    tips: [
                      "Keep commits atomic and focused",
                      "Write descriptive commit messages",
                      "Test your changes thoroughly",
                      "Update documentation if needed"
                    ]
                  },
                  {
                    title: "Submit Pull Request",
                    description: "Create a PR with detailed description",
                    requirements: [
                      "Clear title and description",
                      "Link to related issues",
                      "Include screenshots if UI changes",
                      "All tests must pass"
                    ]
                  }
                ]
              }
            },
            testing: {
              title: "Testing Guidelines",
              icon: CheckCircle,
              content: {
                types: [
                  {
                    title: "Unit Tests",
                    description: "Test individual functions and components",
                    example: "// Example component test\nimport { render, screen } from '@testing-library/react';\nimport Component from './Component';\n\ntest('renders component correctly', () => {\n  render(<Component onNavigate={jest.fn()} />);\n  expect(screen.getByText('Component Title')).toBeInTheDocument();\n});"
                  },
                  {
                    title: "Integration Tests",
                    description: "Test component interactions",
                    example: "// Example integration test\nimport { render, fireEvent } from '@testing-library/react';\nimport App from './App';\n\ntest('navigation works correctly', () => {\n  render(<App />);\n  fireEvent.click(screen.getByText('Dashboard'));\n  expect(screen.getByText('Dashboard Content')).toBeInTheDocument();\n});"
                  }
                ]
              }
            }
          }
        };
      case 'nl':
        return {
          title: "Bijdrage Gids",
          subtitle: "Hoe bij te dragen aan de ontwikkeling van het hubdispo.be platform",
          sections: {
            gettingStarted: {
              title: "Aan de slag",
              icon: Zap,
              content: {
                prerequisites: [
                  "Node.js 18+ en npm/yarn",
                  "Git en GitHub account",
                  "TypeScript kennis",
                  "React ervaring",
                  "Tailwind CSS bekendheid"
                ],
                setupSteps: [
                  {
                    title: "1. Repository Forken",
                    description: "Maak een fork van de hubdispo.be repository op GitHub",
                    code: "# Clone je fork\ngit clone https://github.com/your-username/hubdispo.be.git\ncd hubdispo.be"
                  },
                  {
                    title: "2. Afhankelijkheden Installeren",
                    description: "Installeer alle vereiste pakketten en afhankelijkheden",
                    code: "# Installeer afhankelijkheden\nnpm install\n\n# of met yarn\nyarn install"
                  },
                  {
                    title: "3. Ontwikkelingsserver Starten",
                    description: "Start de applicatie in ontwikkelingsmodus",
                    code: "# Start ontwikkelingsserver\nnpm run dev\n\n# Applicatie zal beschikbaar zijn op http://localhost:3000"
                  }
                ]
              }
            },
            codeStandards: {
              title: "Code Standaarden",
              icon: Code,
              content: {
                rules: [
                  {
                    title: "TypeScript Eerst",
                    description: "Alle nieuwe code moet geschreven worden in TypeScript",
                    example: "// ✅ Goed\ninterface ComponentProps {\n  onNavigate: (view: string) => void;\n}\n\n// ❌ Slecht\n// Geen type definities"
                  },
                  {
                    title: "Component Props Patroon",
                    description: "Gebruik consistente prop interfaces",
                    example: "// Standaard patroon voor alle componenten\ninterface ComponentProps {\n  onNavigate: (view: string, params?: any) => void;\n  initialData?: any;\n}\n\nexport default function Component({ onNavigate, initialData }: ComponentProps) {\n  // Implementatie\n}"
                  },
                  {
                    title: "Import Organisatie",
                    description: "Organiseer imports in een specifieke volgorde",
                    example: "// 1. React imports\nimport { useState, useEffect } from 'react';\n\n// 2. Third-party libraries\nimport { Button } from './ui/button';\n\n// 3. Interne componenten\nimport { useLanguage } from './LanguageProvider';\n\n// 4. Types (als apart bestand)\nimport type { ComponentProps } from './types';"
                  }
                ]
              }
            },
            workflow: {
              title: "Ontwikkeling Workflow",
              icon: GitBranch,
              content: {
                steps: [
                  {
                    title: "Feature Branch Maken",
                    description: "Maak een nieuwe branch voor je feature",
                    commands: [
                      "git checkout main",
                      "git pull origin main",
                      "git checkout -b feature/your-feature-name"
                    ]
                  },
                  {
                    title: "Wijzigingen Maken",
                    description: "Ontwikkel je feature volgens onze richtlijnen",
                    tips: [
                      "Houd commits atomisch en gefocust",
                      "Schrijf beschrijvende commit berichten",
                      "Test je wijzigingen grondig",
                      "Update documentatie indien nodig"
                    ]
                  },
                  {
                    title: "Pull Request Indienen",
                    description: "Maak een PR met gedetailleerde beschrijving",
                    requirements: [
                      "Duidelijke titel en beschrijving",
                      "Link naar gerelateerde issues",
                      "Voeg screenshots toe bij UI wijzigingen",
                      "Alle tests moeten slagen"
                    ]
                  }
                ]
              }
            },
            testing: {
              title: "Test Richtlijnen",
              icon: CheckCircle,
              content: {
                types: [
                  {
                    title: "Unit Tests",
                    description: "Test individuele functies en componenten",
                    example: "// Voorbeeld component test\nimport { render, screen } from '@testing-library/react';\nimport Component from './Component';\n\ntest('renders component correctly', () => {\n  render(<Component onNavigate={jest.fn()} />);\n  expect(screen.getByText('Component Title')).toBeInTheDocument();\n});"
                  },
                  {
                    title: "Integratie Tests",
                    description: "Test component interacties",
                    example: "// Voorbeeld integratie test\nimport { render, fireEvent } from '@testing-library/react';\nimport App from './App';\n\ntest('navigation works correctly', () => {\n  render(<App />);\n  fireEvent.click(screen.getByText('Dashboard'));\n  expect(screen.getByText('Dashboard Content')).toBeInTheDocument();\n});"
                  }
                ]
              }
            }
          }
        };
      default: // fr
        return {
          title: "Guide de Contribution",
          subtitle: "Comment contribuer au développement de la plateforme hubdispo.be",
          sections: {
            gettingStarted: {
              title: "Démarrage",
              icon: Zap,
              content: {
                prerequisites: [
                  "Node.js 18+ et npm/yarn",
                  "Git et compte GitHub",
                  "Connaissance TypeScript",
                  "Expérience React",
                  "Familiarité avec Tailwind CSS"
                ],
                setupSteps: [
                  {
                    title: "1. Forker le Repository",
                    description: "Créer un fork du repository hubdispo.be sur GitHub",
                    code: "# Cloner votre fork\ngit clone https://github.com/your-username/hubdispo.be.git\ncd hubdispo.be"
                  },
                  {
                    title: "2. Installer les Dépendances",
                    description: "Installer tous les packages et dépendances requis",
                    code: "# Installer les dépendances\nnpm install\n\n# ou avec yarn\nyarn install"
                  },
                  {
                    title: "3. Démarrer le Serveur de Développement",
                    description: "Lancer l'application en mode développement",
                    code: "# Démarrer le serveur de développement\nnpm run dev\n\n# L'application sera disponible sur http://localhost:3000"
                  }
                ]
              }
            },
            codeStandards: {
              title: "Standards de Code",
              icon: Code,
              content: {
                rules: [
                  {
                    title: "TypeScript d'abord",
                    description: "Tout nouveau code doit être écrit en TypeScript",
                    example: "// ✅ Bon\ninterface ComponentProps {\n  onNavigate: (view: string) => void;\n}\n\n// ❌ Mauvais\n// Pas de définitions de types"
                  },
                  {
                    title: "Pattern Props Composant",
                    description: "Utiliser des interfaces de props cohérentes",
                    example: "// Pattern standard pour tous les composants\ninterface ComponentProps {\n  onNavigate: (view: string, params?: any) => void;\n  initialData?: any;\n}\n\nexport default function Component({ onNavigate, initialData }: ComponentProps) {\n  // Implémentation\n}"
                  },
                  {
                    title: "Organisation des Imports",
                    description: "Organiser les imports dans un ordre spécifique",
                    example: "// 1. Imports React\nimport { useState, useEffect } from 'react';\n\n// 2. Librairies tierces\nimport { Button } from './ui/button';\n\n// 3. Composants internes\nimport { useLanguage } from './LanguageProvider';\n\n// 4. Types (si fichier séparé)\nimport type { ComponentProps } from './types';"
                  }
                ]
              }
            },
            workflow: {
              title: "Workflow de Développement",
              icon: GitBranch,
              content: {
                steps: [
                  {
                    title: "Créer une Branche Feature",
                    description: "Créer une nouvelle branche pour votre fonctionnalité",
                    commands: [
                      "git checkout main",
                      "git pull origin main",
                      "git checkout -b feature/your-feature-name"
                    ]
                  },
                  {
                    title: "Effectuer les Modifications",
                    description: "Développer votre fonctionnalité en suivant nos directives",
                    tips: [
                      "Garder les commits atomiques et focalisés",
                      "Écrire des messages de commit descriptifs",
                      "Tester vos modifications minutieusement",
                      "Mettre à jour la documentation si nécessaire"
                    ]
                  },
                  {
                    title: "Soumettre une Pull Request",
                    description: "Créer une PR avec une description détaillée",
                    requirements: [
                      "Titre et description clairs",
                      "Lien vers les issues liées",
                      "Inclure des captures d'écran si changements UI",
                      "Tous les tests doivent passer"
                    ]
                  }
                ]
              }
            },
            testing: {
              title: "Directives de Test",
              icon: CheckCircle,
              content: {
                types: [
                  {
                    title: "Tests Unitaires",
                    description: "Tester les fonctions et composants individuels",
                    example: "// Exemple test de composant\nimport { render, screen } from '@testing-library/react';\nimport Component from './Component';\n\ntest('renders component correctly', () => {\n  render(<Component onNavigate={jest.fn()} />);\n  expect(screen.getByText('Component Title')).toBeInTheDocument();\n});"
                  },
                  {
                    title: "Tests d'Intégration",
                    description: "Tester les interactions entre composants",
                    example: "// Exemple test d'intégration\nimport { render, fireEvent } from '@testing-library/react';\nimport App from './App';\n\ntest('navigation works correctly', () => {\n  render(<App />);\n  fireEvent.click(screen.getByText('Dashboard'));\n  expect(screen.getByText('Dashboard Content')).toBeInTheDocument();\n});"
                  }
                ]
              }
            }
          }
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("technical-documentation")}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la documentation
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#10B981]/10 rounded-lg">
              <Users className="h-8 w-8 text-[#10B981]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
              <p className="text-gray-600 mt-1">{content.subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            {Object.entries(content.sections).map(([key, section]) => (
              <TabsTrigger key={key} value={key}>
                <section.icon className="h-4 w-4 mr-2" />
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Getting Started Tab */}
          <TabsContent value="gettingStarted">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Package className="h-6 w-6 text-[#1E40AF]" />
                    Prérequis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {content.sections.gettingStarted.content.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Configuration Initiale</h2>
                {content.sections.gettingStarted.content.setupSteps.map((step, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <p className="text-gray-600">{step.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Code Standards Tab */}
          <TabsContent value="codeStandards">
            <div className="space-y-6">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Le respect de ces standards est obligatoire pour toutes les contributions.
                </AlertDescription>
              </Alert>

              {content.sections.codeStandards.content.rules.map((rule, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Code className="h-5 w-5 text-[#1E40AF]" />
                      {rule.title}
                    </CardTitle>
                    <p className="text-gray-600">{rule.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{rule.example}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Workflow Tab */}
          <TabsContent value="workflow">
            <div className="space-y-6">
              {content.sections.workflow.content.steps.map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <GitBranch className="h-5 w-5 text-[#1E40AF]" />
                      {step.title}
                    </CardTitle>
                    <p className="text-gray-600">{step.description}</p>
                  </CardHeader>
                  <CardContent>
                    {step.commands && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Commandes :</h4>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                          <pre className="text-sm">
                            <code>{step.commands.join('\n')}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                    {step.tips && (
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Conseils :</h4>
                        <ul className="space-y-1">
                          {step.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-yellow-500" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {step.requirements && (
                      <div>
                        <h4 className="font-medium mb-2">Exigences :</h4>
                        <ul className="space-y-1">
                          {step.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Testing Tab */}
          <TabsContent value="testing">
            <div className="space-y-6">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Tous les nouveaux composants doivent inclure des tests appropriés.
                </AlertDescription>
              </Alert>

              {content.sections.testing.content.types.map((type, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#10B981]" />
                      {type.title}
                    </CardTitle>
                    <p className="text-gray-600">{type.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{type.example}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-12 grid lg:grid-cols-3 gap-6">
          <Card className="border-[#1E40AF] bg-[#1E40AF]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#1E40AF]">
                <Book className="h-5 w-5" />
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Consultez la documentation technique complète
              </p>
              <Button 
                className="w-full" 
                onClick={() => onNavigate('technical-documentation')}
              >
                Voir la Documentation
              </Button>
            </CardContent>
          </Card>

          <Card className="border-[#10B981] bg-[#10B981]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#10B981]">
                <GitBranch className="h-5 w-5" />
                Repository
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Accédez au code source sur GitHub
              </p>
              <Button variant="outline" className="w-full">
                Voir sur GitHub
              </Button>
            </CardContent>
          </Card>

          <Card className="border-orange-500 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-orange-600">
                <Users className="h-5 w-5" />
                Communauté
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Rejoignez notre communauté de développeurs
              </p>
              <Button variant="outline" className="w-full">
                Rejoindre Discord
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}