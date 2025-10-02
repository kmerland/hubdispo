// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { ArrowLeft, Server, Shield, Monitor, Zap, AlertCircle, CheckCircle, Settings, Cloud, Database, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { useLanguage } from "./LanguageProvider";

interface DeploymentGuideProps {
  onNavigate: (view: string) => void;
}

export default function DeploymentGuide({ onNavigate }: DeploymentGuideProps) {
  const { t, language } = useLanguage();

  const environments = [
    {
      name: "Développement",
      url: "http://localhost:3000",
      status: "active",
      description: "Environnement local pour développement",
      config: {
        NODE_ENV: "development",
        API_URL: "http://localhost:8000",
        DEBUG: "true"
      }
    },
    {
      name: "Staging",
      url: "https://staging.hubdispo.be",
      status: "active", 
      description: "Environnement de pré-production",
      config: {
        NODE_ENV: "staging",
        API_URL: "https://api-staging.hubdispo.be",
        DEBUG: "false"
      }
    },
    {
      name: "Production",
      url: "https://hubdispo.be",
      status: "active",
      description: "Environnement de production",
      config: {
        NODE_ENV: "production",
        API_URL: "https://api.hubdispo.be",
        DEBUG: "false"
      }
    }
  ];

  const deploymentSteps = [
    {
      title: "1. Préparation du Build",
      description: "Optimiser et compiler l'application",
      commands: [
        "npm run build",
        "npm run test",
        "npm run lint"
      ],
      checks: [
        "Tous les tests passent",
        "Aucune erreur de lint",
        "Build réussi sans erreurs",
        "Assets optimisés"
      ]
    },
    {
      title: "2. Déploiement Infrastructure",
      description: "Configuration serveurs et services",
      commands: [
        "terraform plan",
        "terraform apply",
        "kubectl apply -f k8s/"
      ],
      checks: [
        "Infrastructure provisionnée",
        "Services démarrés",
        "Health checks OK",
        "SSL/TLS configuré"
      ]
    },
    {
      title: "3. Déploiement Application",
      description: "Upload et activation nouvelle version",
      commands: [
        "docker build -t hubdispo:latest .",
        "docker push registry.hubdispo.be/hubdispo:latest",
        "kubectl set image deployment/hubdispo hubdispo=registry.hubdispo.be/hubdispo:latest"
      ],
      checks: [
        "Image Docker créée",
        "Upload registry réussi",
        "Pods redémarrés",
        "Application accessible"
      ]
    }
  ];

  const monitoringMetrics = [
    {
      category: "Performance",
      metrics: [
        { name: "Page Load Time", value: "< 2s", status: "good" },
        { name: "First Contentful Paint", value: "< 1.5s", status: "good" },
        { name: "Largest Contentful Paint", value: "< 2.5s", status: "good" },
        { name: "Time to Interactive", value: "< 3s", status: "warning" }
      ]
    },
    {
      category: "Disponibilité", 
      metrics: [
        { name: "Uptime", value: "99.9%", status: "good" },
        { name: "Error Rate", value: "< 0.1%", status: "good" },
        { name: "Response Time", value: "< 500ms", status: "good" },
        { name: "Throughput", value: "1000 req/min", status: "good" }
      ]
    },
    {
      category: "Ressources",
      metrics: [
        { name: "CPU Usage", value: "< 70%", status: "good" },
        { name: "Memory Usage", value: "< 80%", status: "warning" },
        { name: "Disk Usage", value: "< 85%", status: "good" },
        { name: "Network I/O", value: "< 1 Gbps", status: "good" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600 bg-green-100";
      case "warning": return "text-yellow-600 bg-yellow-100";
      case "error": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

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
            <div className="p-3 bg-[#1E40AF]/10 rounded-lg">
              <Server className="h-8 w-8 text-[#1E40AF]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Guide de Déploiement</h1>
              <p className="text-gray-600 mt-1">Infrastructure, déploiement et monitoring de hubdispo.be</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        <Tabs defaultValue="environments" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="environments">
              <Globe className="h-4 w-4 mr-2" />
              Environnements
            </TabsTrigger>
            <TabsTrigger value="deployment">
              <Zap className="h-4 w-4 mr-2" />
              Déploiement
            </TabsTrigger>
            <TabsTrigger value="monitoring">
              <Monitor className="h-4 w-4 mr-2" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Sécurité
            </TabsTrigger>
          </TabsList>

          {/* Environments Tab */}
          <TabsContent value="environments">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Environnements de Déploiement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {environments.map((env, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{env.name}</h3>
                            <Badge className={getStatusColor(env.status)}>
                              {env.status === 'active' ? 'Actif' : 'Inactif'}
                            </Badge>
                          </div>
                          <a 
                            href={env.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1E40AF] hover:underline"
                          >
                            {env.url}
                          </a>
                        </div>
                        <p className="text-gray-600 mb-3">{env.description}</p>
                        <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
                          <div className="space-y-1">
                            {Object.entries(env.config).map(([key, value]) => (
                              <div key={key}>
                                <span className="text-blue-300">{key}</span>=<span className="text-green-300">"{value}"</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Variables d'Environnement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{`# Configuration de base
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://hubdispo.be
NEXT_PUBLIC_API_URL=https://api.hubdispo.be

# Services externes
STRIPE_SECRET_KEY=sk_live_...
SENDGRID_API_KEY=SG...
GOOGLE_ANALYTICS_ID=GA-...

# Base de données
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# Sécurité
JWT_SECRET=...
ENCRYPTION_KEY=...
CORS_ORIGIN=https://hubdispo.be`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Deployment Tab */}
          <TabsContent value="deployment">
            <div className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Suivez ces étapes dans l'ordre pour un déploiement réussi.
                </AlertDescription>
              </Alert>

              {deploymentSteps.map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-[#1E40AF]" />
                      {step.title}
                    </CardTitle>
                    <p className="text-gray-600">{step.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Commandes :</h4>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                          <pre className="text-sm">
                            <code>{step.commands.join('\n')}</code>
                          </pre>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Vérifications :</h4>
                        <ul className="space-y-2">
                          {step.checks.map((check, checkIndex) => (
                            <li key={checkIndex} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              {check}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardHeader>
                  <CardTitle>Pipeline CI/CD</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{`# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run lint
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/hubdispo \\
            hubdispo=registry.hubdispo.be/hubdispo:${{ github.sha }}
          kubectl rollout status deployment/hubdispo`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring">
            <div className="space-y-6">
              {monitoringMetrics.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Monitor className="h-5 w-5 text-[#1E40AF]" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {category.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{metric.name}</span>
                            <Badge className={getStatusColor(metric.status)}>
                              {metric.status === 'good' ? '✓' : metric.status === 'warning' ? '⚠' : '✗'}
                            </Badge>
                          </div>
                          <div className="text-lg font-semibold">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardHeader>
                  <CardTitle>Alertes et Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-red-500 bg-red-50">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-red-800">Critique</span>
                      </div>
                      <p className="text-sm text-red-700">
                        Application inaccessible, erreur 5xx, downtime > 1 minute
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Avertissement</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Performance dégradée, taux d'erreur > 1%, utilisation ressources > 80%
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Information</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Déploiement réussi, mise à jour configuration, maintenance programmée
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-[#10B981]" />
                    Sécurité Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">SSL/TLS</span>
                        <p className="text-sm text-gray-600">Certificats Let's Encrypt avec renouvellement automatique</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Actif</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">Firewall</span>
                        <p className="text-sm text-gray-600">WAF CloudFlare + règles personnalisées</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Actif</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">DDoS Protection</span>
                        <p className="text-sm text-gray-600">Protection automatique CloudFlare</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Actif</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Headers de Sécurité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{`# Headers de sécurité
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sauvegarde et Récupération</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Sauvegarde Base de Données</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Sauvegarde quotidienne automatique</li>
                        <li>• Rétention 30 jours</li>
                        <li>• Test de restauration mensuel</li>
                        <li>• Chiffrement AES-256</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Sauvegarde Application</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Versioning automatique</li>
                        <li>• Rollback instantané</li>
                        <li>• Images Docker archivées</li>
                        <li>• Configuration versionnée</li>
                      </ul>
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