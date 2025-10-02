// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ArrowLeft, Shield, Database, Eye, Lock, Users, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "./LanguageProvider";

interface PrivacyPolicyProps {
  onNavigate: (view: string) => void;
}

export default function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
  const { t, language } = useLanguage();

  const getContent = () => {
    switch (language) {
      case 'en':
        return {
          title: "Privacy Policy",
          intro: "At hubdispo.be, protecting your privacy and personal data is a priority. This policy explains how we collect, use, and protect your information in compliance with GDPR.",
          sections: [
            {
              title: "1. Data Controller",
              icon: Users,
              content: [
                "hubdispo.be, located at Avenue Louise 149, 1050 Brussels, Belgium, is the data controller for all personal information collected via our platform.",
                "For any questions regarding data protection, contact us at: privacy@hubdispo.be"
              ]
            },
            {
              title: "2. Data Collected",
              icon: Database,
              content: [
                "Account data: first name, last name, email, company name, phone number, business address",
                "Shipment data: sender/recipient addresses, package details, customs information",
                "Usage data: connection logs, platform interactions, preferences",
                "Payment data: billing information (processed securely by our payment partners)",
                "Communication data: support exchanges, messages, feedback"
              ]
            },
            {
              title: "3. Legal Basis for Processing",
              icon: Shield,
              content: [
                "Contract execution: processing shipments, customs management, billing",
                "Legitimate interests: platform improvement, fraud prevention, customer support",
                "Legal compliance: customs obligations, tax requirements, KYC",
                "Consent: marketing communications, cookies, optional features"
              ]
            },
            {
              title: "4. Data Usage",
              icon: Eye,
              content: [
                "Provide logistics and customs services as described in our terms",
                "Process payments and manage your subscription",
                "Provide customer support and respond to your requests",
                "Improve our platform and develop new features",
                "Send important notifications about your shipments",
                "Comply with legal and regulatory obligations"
              ]
            },
            {
              title: "5. Data Sharing",
              icon: Users,
              content: [
                "Logistics partners: carriers, consolidation centers (limited to necessary shipment data)",
                "Customs authorities: as required by international trade regulations",
                "Payment processors: for secure payment processing",
                "Technical service providers: hosting, security, analytics (under strict confidentiality agreements)",
                "We never sell your personal data to third parties"
              ]
            },
            {
              title: "6. International Transfers",
              icon: Globe,
              content: [
                "Your data may be transferred outside the EU for logistics operations",
                "All transfers are protected by appropriate safeguards (adequacy decisions, standard contractual clauses)",
                "Key destinations: Switzerland, UK, Canada (countries with adequacy decisions)",
                "For other countries, we implement additional protection measures"
              ]
            },
            {
              title: "7. Data Retention",
              icon: Database,
              content: [
                "Account data: 3 years after account closure",
                "Shipment data: 7 years (customs and tax requirements)",
                "Payment data: 10 years (accounting obligations)",
                "Marketing data: until you withdraw consent",
                "Technical logs: 12 months maximum"
              ]
            },
            {
              title: "8. Your Rights",
              icon: Shield,
              content: [
                "Access: obtain a copy of your personal data",
                "Rectification: correct inaccurate or incomplete data",
                "Erasure: request deletion of your data (subject to legal obligations)",
                "Portability: receive your data in a structured format",
                "Restriction: limit processing in certain circumstances",
                "Objection: oppose processing based on legitimate interests",
                "Withdraw consent: for processing based on consent"
              ]
            },
            {
              title: "9. Security Measures",
              icon: Lock,
              content: [
                "Data encryption in transit and at rest",
                "Multi-factor authentication for sensitive operations",
                "Regular security audits and penetration testing",
                "Staff training on data protection",
                "Incident response procedures",
                "ISO 27001 certified infrastructure"
              ]
            },
            {
              title: "10. Cookies and Tracking",
              icon: Eye,
              content: [
                "Essential cookies: for platform functionality (no consent required)",
                "Analytics cookies: to improve user experience (with consent)",
                "Marketing cookies: for personalized advertising (with consent)",
                "You can manage your cookie preferences in your account settings",
                "Third-party cookies: Google Analytics, payment processors (privacy policies apply)"
              ]
            },
            {
              title: "11. Changes to This Policy",
              icon: Shield,
              content: [
                "We may update this policy to reflect legal changes or service improvements",
                "Significant changes will be notified by email and platform notification",
                "We encourage you to regularly review this policy",
                "Continued use of our services constitutes acceptance of changes"
              ]
            },
            {
              title: "12. Contact and Complaints",
              icon: Users,
              content: [
                "Data Protection Officer: privacy@hubdispo.be",
                "Response time: maximum 30 days for access requests",
                "Right to complain: Belgian Data Protection Authority (APD/GBA)",
                "APD website: www.dataprotectionauthority.be"
              ]
            }
          ]
        };
      case 'nl':
        return {
          title: "Privacybeleid",
          intro: "Bij hubdispo.be is het beschermen van uw privacy en persoonlijke gegevens een prioriteit. Dit beleid legt uit hoe we uw informatie verzamelen, gebruiken en beschermen in overeenstemming met de GDPR.",
          sections: [
            {
              title: "1. Verwerkingsverantwoordelijke",
              icon: Users,
              content: [
                "hubdispo.be, gevestigd op Avenue Louise 149, 1050 Brussel, België, is de verwerkingsverantwoordelijke voor alle persoonlijke informatie verzameld via ons platform.",
                "Voor vragen betreffende gegevensbescherming, neem contact op via: privacy@hubdispo.be"
              ]
            },
            {
              title: "2. Verzamelde Gegevens",
              icon: Database,
              content: [
                "Accountgegevens: voornaam, achternaam, e-mail, bedrijfsnaam, telefoonnummer, bedrijfsadres",
                "Zendinggegevens: afzender-/ontvangeradressen, pakketdetails, douane-informatie",
                "Gebruiksgegevens: verbindingslogs, platforminteracties, voorkeuren",
                "Betalingsgegevens: factuurinformatie (veilig verwerkt door onze betalingspartners)",
                "Communicatiegegevens: supportuitwisselingen, berichten, feedback"
              ]
            },
            {
              title: "3. Rechtsgrondslag voor Verwerking",
              icon: Shield,
              content: [
                "Contractuitvoering: verwerking van zendingen, douanebeheer, facturering",
                "Legitieme belangen: platformverbetering, fraudepreventie, klantenservice",
                "Wettelijke naleving: douaneverplichtingen, belastingvereisten, KYC",
                "Toestemming: marketingcommunicatie, cookies, optionele functies"
              ]
            },
            {
              title: "4. Gegevensgebruik",
              icon: Eye,
              content: [
                "Logistieke en douanediensten leveren zoals beschreven in onze voorwaarden",
                "Betalingen verwerken en uw abonnement beheren",
                "Klantenservice bieden en reageren op uw verzoeken",
                "Ons platform verbeteren en nieuwe functies ontwikkelen",
                "Belangrijke meldingen over uw zendingen verzenden",
                "Voldoen aan wettelijke en regelgevingsverplichtingen"
              ]
            },
            {
              title: "5. Gegevensdeling",
              icon: Users,
              content: [
                "Logistieke partners: vervoerders, consolidatiecentra (beperkt tot noodzakelijke zendinggegevens)",
                "Douane-autoriteiten: zoals vereist door internationale handelsregelgeving",
                "Betalingsverwerkers: voor veilige betalingsverwerking",
                "Technische dienstverleners: hosting, beveiliging, analytics (onder strikte vertrouwelijkheidsovereenkomsten)",
                "We verkopen nooit uw persoonlijke gegevens aan derden"
              ]
            },
            {
              title: "6. Internationale Overdrachten",
              icon: Globe,
              content: [
                "Uw gegevens kunnen buiten de EU worden overgedragen voor logistieke operaties",
                "Alle overdrachten zijn beschermd door passende waarborgen (adequaatheidsbesluiten, standaard contractuele clausules)",
                "Belangrijkste bestemmingen: Zwitserland, VK, Canada (landen met adequaatheidsbesluiten)",
                "Voor andere landen implementeren we aanvullende beschermingsmaatregelen"
              ]
            },
            {
              title: "7. Gegevensbewaring",
              icon: Database,
              content: [
                "Accountgegevens: 3 jaar na accountsluiting",
                "Zendinggegevens: 7 jaar (douane- en belastingvereisten)",
                "Betalingsgegevens: 10 jaar (boekhoudverplichtingen)",
                "Marketinggegevens: tot u uw toestemming intrekt",
                "Technische logs: maximaal 12 maanden"
              ]
            },
            {
              title: "8. Uw Rechten",
              icon: Shield,
              content: [
                "Toegang: een kopie van uw persoonlijke gegevens verkrijgen",
                "Rectificatie: onjuiste of onvolledige gegevens corrigeren",
                "Wissing: verwijdering van uw gegevens verzoeken (onderworpen aan wettelijke verplichtingen)",
                "Overdraagbaarheid: uw gegevens ontvangen in een gestructureerd formaat",
                "Beperking: verwerking beperken onder bepaalde omstandigheden",
                "Bezwaar: bezwaar maken tegen verwerking gebaseerd op legitieme belangen",
                "Toestemming intrekken: voor verwerking gebaseerd op toestemming"
              ]
            },
            {
              title: "9. Beveiligingsmaatregelen",
              icon: Lock,
              content: [
                "Gegevensversleuteling tijdens transport en opslag",
                "Multi-factor authenticatie voor gevoelige operaties",
                "Regelmatige beveiligingsaudits en penetratietests",
                "Personeelstraining over gegevensbescherming",
                "Incidentresponseprocedures",
                "ISO 27001 gecertificeerde infrastructuur"
              ]
            },
            {
              title: "10. Cookies en Tracking",
              icon: Eye,
              content: [
                "Essentiële cookies: voor platformfunctionaliteit (geen toestemming vereist)",
                "Analytics cookies: om gebruikerservaring te verbeteren (met toestemming)",
                "Marketing cookies: voor gepersonaliseerde advertenties (met toestemming)",
                "U kunt uw cookievoorkeuren beheren in uw accountinstellingen",
                "Cookies van derden: Google Analytics, betalingsverwerkers (privacybeleid van toepassing)"
              ]
            },
            {
              title: "11. Wijzigingen in Dit Beleid",
              icon: Shield,
              content: [
                "We kunnen dit beleid bijwerken om wettelijke wijzigingen of servicevverbeteringen weer te geven",
                "Significante wijzigingen worden gemeld via e-mail en platformnotificatie",
                "We moedigen u aan dit beleid regelmatig te bekijken",
                "Voortgezet gebruik van onze services vormt acceptatie van wijzigingen"
              ]
            },
            {
              title: "12. Contact en Klachten",
              icon: Users,
              content: [
                "Functionaris voor Gegevensbescherming: privacy@hubdispo.be",
                "Responstijd: maximaal 30 dagen voor toegangsverzoeken",
                "Recht om te klagen: Belgische Gegevensbeschermingsautoriteit (APD/GBA)",
                "APD website: www.dataprotectionauthority.be"
              ]
            }
          ]
        };
      default: // fr
        return {
          title: "Politique de confidentialité",
          intro: "Chez hubdispo.be, protéger votre vie privée et vos données personnelles est une priorité. Cette politique explique comment nous collectons, utilisons et protégeons vos informations en conformité avec le RGPD.",
          sections: [
            {
              title: "1. Responsable du traitement",
              icon: Users,
              content: [
                "hubdispo.be, située Avenue Louise 149, 1050 Bruxelles, Belgique, est le responsable du traitement de toutes les informations personnelles collectées via notre plateforme.",
                "Pour toute question concernant la protection des données, contactez-nous à : privacy@hubdispo.be"
              ]
            },
            {
              title: "2. Données collectées",
              icon: Database,
              content: [
                "Données de compte : prénom, nom, email, nom d'entreprise, numéro de téléphone, adresse professionnelle",
                "Données d'envoi : adresses expéditeur/destinataire, détails des colis, informations douanières",
                "Données d'usage : logs de connexion, interactions sur la plateforme, préférences",
                "Données de paiement : informations de facturation (traitées de manière sécurisée par nos partenaires de paiement)",
                "Données de communication : échanges support, messages, retours d'expérience"
              ]
            },
            {
              title: "3. Base légale du traitement",
              icon: Shield,
              content: [
                "Exécution du contrat : traitement des envois, gestion douanière, facturation",
                "Intérêts légitimes : amélioration de la plateforme, prévention de la fraude, support client",
                "Obligation légale : obligations douanières, exigences fiscales, KYC",
                "Consentement : communications marketing, cookies, fonctionnalités optionnelles"
              ]
            },
            {
              title: "4. Utilisation des données",
              icon: Eye,
              content: [
                "Fournir les services logistiques et douaniers décrits dans nos conditions",
                "Traiter les paiements et gérer votre abonnement",
                "Fournir un support client et répondre à vos demandes",
                "Améliorer notre plateforme et développer de nouvelles fonctionnalités",
                "Envoyer des notifications importantes concernant vos envois",
                "Respecter les obligations légales et réglementaires"
              ]
            },
            {
              title: "5. Partage des données",
              icon: Users,
              content: [
                "Partenaires logistiques : transporteurs, centres de consolidation (limité aux données d'envoi nécessaires)",
                "Autorités douanières : comme requis par les réglementations du commerce international",
                "Processeurs de paiement : pour le traitement sécurisé des paiements",
                "Prestataires de services techniques : hébergement, sécurité, analytique (sous accords stricts de confidentialité)",
                "Nous ne vendons jamais vos données personnelles à des tiers"
              ]
            },
            {
              title: "6. Transferts internationaux",
              icon: Globe,
              content: [
                "Vos données peuvent être transférées hors UE pour les opérations logistiques",
                "Tous les transferts sont protégés par des garanties appropriées (décisions d'adéquation, clauses contractuelles types)",
                "Destinations principales : Suisse, Royaume-Uni, Canada (pays avec décisions d'adéquation)",
                "Pour les autres pays, nous mettons en place des mesures de protection supplémentaires"
              ]
            },
            {
              title: "7. Durée de conservation",
              icon: Database,
              content: [
                "Données de compte : 3 ans après fermeture du compte",
                "Données d'envoi : 7 ans (obligations douanières et fiscales)",
                "Données de paiement : 10 ans (obligations comptables)",
                "Données marketing : jusqu'à retrait de votre consentement",
                "Logs techniques : 12 mois maximum"
              ]
            },
            {
              title: "8. Vos droits",
              icon: Shield,
              content: [
                "Accès : obtenir une copie de vos données personnelles",
                "Rectification : corriger des données inexactes ou incomplètes",
                "Effacement : demander la suppression de vos données (sous réserve d'obligations légales)",
                "Portabilité : recevoir vos données dans un format structuré",
                "Limitation : limiter le traitement dans certaines circonstances",
                "Opposition : vous opposer au traitement basé sur l'intérêt légitime",
                "Retrait du consentement : pour les traitements basés sur le consentement"
              ]
            },
            {
              title: "9. Mesures de sécurité",
              icon: Lock,
              content: [
                "Chiffrement des données en transit et au repos",
                "Authentification multi-facteurs pour les opérations sensibles",
                "Audits de sécurité réguliers et tests d'intrusion",
                "Formation du personnel sur la protection des données",
                "Procédures de réponse aux incidents",
                "Infrastructure certifiée ISO 27001"
              ]
            },
            {
              title: "10. Cookies et suivi",
              icon: Eye,
              content: [
                "Cookies essentiels : pour le fonctionnement de la plateforme (pas de consentement requis)",
                "Cookies analytiques : pour améliorer l'expérience utilisateur (avec consentement)",
                "Cookies marketing : pour la publicité personnalisée (avec consentement)",
                "Vous pouvez gérer vos préférences de cookies dans les paramètres de votre compte",
                "Cookies tiers : Google Analytics, processeurs de paiement (politiques de confidentialité applicables)"
              ]
            },
            {
              title: "11. Modifications de cette politique",
              icon: Shield,
              content: [
                "Nous pouvons mettre à jour cette politique pour refléter les changements légaux ou les améliorations de service",
                "Les changements significatifs seront notifiés par email et notification sur la plateforme",
                "Nous vous encourageons à réviser régulièrement cette politique",
                "L'utilisation continue de nos services constitue l'acceptation des changements"
              ]
            },
            {
              title: "12. Contact et réclamations",
              icon: Users,
              content: [
                "Délégué à la protection des données : privacy@hubdispo.be",
                "Délai de réponse : maximum 30 jours pour les demandes d'accès",
                "Droit de réclamation : Autorité de protection des données belge (APD/GBA)",
                "Site APD : www.dataprotectionauthority.be"
              ]
            }
          ]
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("homepage")}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('legal.back_to_home')}
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#10B981]/10 rounded-lg">
              <Shield className="h-6 w-6 text-[#10B981]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
              <p className="text-gray-600">{t('legal.last_updated')} 30 septembre 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8">
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="border-[#10B981] bg-[#10B981]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#10B981]">
                <Database className="h-5 w-5" />
                RGPD - Protection des données
                <Badge className="bg-[#10B981] text-white ml-2">
                  Conforme
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {content.intro}
              </p>
            </CardContent>
          </Card>

          {/* Sections */}
          {content.sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
                    <IconComponent className="h-5 w-5 text-[#1E40AF]" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-[#1E40AF] rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Data Protection Officer Contact */}
          <Card className="border-[#10B981] bg-[#10B981]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#10B981]">
                <Shield className="h-5 w-5" />
                {language === 'en' && 'Data Protection Contact'}
                {language === 'nl' && 'Contact Gegevensbescherming'}
                {language === 'fr' && 'Contact Protection des Données'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> privacy@hubdispo.be
                </p>
                <p>
                  <strong>Téléphone:</strong> +32 2 123 45 67
                </p>
                <p>
                  <strong>Adresse:</strong> Avenue Louise 149, 1050 Bruxelles, Belgique
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  {language === 'en' && 'We respond to all privacy requests within 30 days maximum.'}
                  {language === 'nl' && 'We reageren op alle privacyverzoeken binnen maximaal 30 dagen.'}
                  {language === 'fr' && 'Nous répondons à toutes les demandes de confidentialité dans un délai maximum de 30 jours.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}