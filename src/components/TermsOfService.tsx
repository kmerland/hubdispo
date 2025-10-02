// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ArrowLeft, Building2, Globe, Shield, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "./LanguageProvider";

interface TermsOfServiceProps {
  onNavigate: (view: string) => void;
}

export default function TermsOfService({ onNavigate }: TermsOfServiceProps) {
  const { t, language } = useLanguage();

  const getContent = () => {
    switch (language) {
      case 'en':
        return {
          title: "Terms of Use",
          sections: [
            {
              title: "1. General Terms",
              content: [
                "These terms of use govern your access to and use of hubdispo.be, a SaaS platform for Belgian SMEs specializing in micro-consolidation logistics and intelligent customs automation.",
                "By using our services, you agree to comply with these terms in their entirety.",
                "We reserve the right to modify these terms at any time, with notice given to users via the platform."
              ]
            },
            {
              title: "2. Services Description", 
              content: [
                "hubdispo.be offers a comprehensive platform for managing international shipments for small volumes (<1 m³ / <200 kg).",
                "Our services include: micro-consolidation logistics, intelligent customs automation, real-time tracking, customs assistant, and consolidation management.",
                "We aim to simplify the international shipping experience through a 'one-stop shop' approach."
              ]
            },
            {
              title: "3. User Responsibilities",
              content: [
                "Users must provide accurate and complete information when creating their account and placing shipments.",
                "You are responsible for maintaining the confidentiality of your login credentials.",
                "You must comply with all applicable laws and regulations, particularly those related to international trade and customs.",
                "Any fraudulent or illegal use of the platform is strictly prohibited."
              ]
            },
            {
              title: "4. Liability and Guarantees",
              content: [
                "hubdispo.be makes every effort to provide reliable and accurate services, but cannot guarantee 100% error-free operation.",
                "Our liability is limited to the amount of fees paid for the specific service concerned.",
                "We are not responsible for delays or issues caused by third parties (carriers, customs authorities, etc.).",
                "Users must verify that their shipments comply with destination country regulations."
              ]
            },
            {
              title: "5. Data Protection",
              content: [
                "We are committed to protecting your personal and business data in accordance with GDPR.",
                "Data collected is used solely to provide our services and improve user experience.",
                "We do not share your data with third parties without your explicit consent, except as required by law.",
                "For more details, please consult our Privacy Policy."
              ]
            },
            {
              title: "6. Subscription and Payment",
              content: [
                "Our services are offered through different subscription plans (Starter, Business, Premium).",
                "Payments are processed securely and charges are made according to the chosen plan.",
                "Subscriptions automatically renew unless canceled at least 24 hours before the renewal date.",
                "Refunds are handled according to our refund policy available in your account."
              ]
            },
            {
              title: "7. Intellectual Property",
              content: [
                "All content, features, and functionality of hubdispo.be are owned by our company and protected by intellectual property laws.",
                "Users are granted a limited license to use the platform for legitimate business purposes.",
                "Any reproduction, distribution, or modification of platform content without permission is prohibited."
              ]
            },
            {
              title: "8. Account Termination",
              content: [
                "You may terminate your account at any time through your account settings.",
                "We reserve the right to suspend or terminate accounts that violate these terms.",
                "Upon termination, access to the platform will be immediately revoked, but data will be retained according to our retention policy."
              ]
            },
            {
              title: "9. Technical Support",
              content: [
                "We provide technical support during business hours (Mon-Fri 8am-6pm CET).",
                "Support is available via live chat, email, and phone.",
                "We strive to resolve issues promptly but cannot guarantee specific response times."
              ]
            },
            {
              title: "10. Governing Law",
              content: [
                "These terms are governed by Belgian law.",
                "Any disputes will be resolved by Belgian courts with jurisdiction in Brussels.",
                "If any provision of these terms is deemed invalid, the remaining provisions will remain in effect."
              ]
            }
          ]
        };
      case 'nl':
        return {
          title: "Gebruiksvoorwaarden",
          sections: [
            {
              title: "1. Algemene Voorwaarden",
              content: [
                "Deze gebruiksvoorwaarden regelen uw toegang tot en gebruik van hubdispo.be, een SaaS-platform voor Belgische KMO's gespecialiseerd in micro-consolidatie logistiek en intelligente douane-automatisering.",
                "Door gebruik te maken van onze diensten, gaat u akkoord met het volledig naleven van deze voorwaarden.",
                "Wij behouden ons het recht voor om deze voorwaarden op elk moment te wijzigen, met kennisgeving aan gebruikers via het platform."
              ]
            },
            {
              title: "2. Beschrijving van Diensten",
              content: [
                "hubdispo.be biedt een uitgebreid platform voor het beheren van internationale zendingen voor kleine volumes (<1 m³ / <200 kg).",
                "Onze diensten omvatten: micro-consolidatie logistiek, intelligente douane-automatisering, real-time tracking, douane-assistent en consolidatiebeheer.",
                "Wij streven ernaar de internationale verzendingservaring te vereenvoudigen via een 'one-stop shop' benadering."
              ]
            },
            {
              title: "3. Gebruikersverantwoordelijkheden",
              content: [
                "Gebruikers moeten accurate en volledige informatie verstrekken bij het aanmaken van hun account en het plaatsen van zendingen.",
                "U bent verantwoordelijk voor het bewaren van de vertrouwelijkheid van uw inloggegevens.",
                "U moet alle toepasselijke wetten en regelgeving naleven, vooral die gerelateerd aan internationale handel en douane.",
                "Elk frauduleus of illegaal gebruik van het platform is strikt verboden."
              ]
            },
            {
              title: "4. Aansprakelijkheid en Garanties",
              content: [
                "hubdispo.be doet er alles aan om betrouwbare en nauwkeurige diensten te leveren, maar kan geen 100% foutloze werking garanderen.",
                "Onze aansprakelijkheid is beperkt tot het bedrag van de betaalde vergoedingen voor de specifieke dienst in kwestie.",
                "Wij zijn niet verantwoordelijk voor vertragingen of problemen veroorzaakt door derden (vervoerders, douane-autoriteiten, enz.).",
                "Gebruikers moeten verifiëren dat hun zendingen voldoen aan de regelgeving van het bestemmingsland."
              ]
            },
            {
              title: "5. Gegevensbescherming",
              content: [
                "Wij zijn toegewijd aan het beschermen van uw persoonlijke en bedrijfsgegevens in overeenstemming met de GDPR.",
                "Verzamelde gegevens worden uitsluitend gebruikt om onze diensten te leveren en de gebruikerservaring te verbeteren.",
                "Wij delen uw gegevens niet met derden zonder uw expliciete toestemming, behalve wanneer wettelijk vereist.",
                "Voor meer details, raadpleeg ons Privacybeleid."
              ]
            },
            {
              title: "6. Abonnement en Betaling",
              content: [
                "Onze diensten worden aangeboden via verschillende abonnementsplannen (Starter, Business, Premium).",
                "Betalingen worden veilig verwerkt en kosten worden gemaakt volgens het gekozen plan.",
                "Abonnementen worden automatisch verlengd tenzij geannuleerd minstens 24 uur voor de verlengingsdatum.",
                "Terugbetalingen worden behandeld volgens ons terugbetalingsbeleid beschikbaar in uw account."
              ]
            },
            {
              title: "7. Intellectueel Eigendom",
              content: [
                "Alle inhoud, functies en functionaliteit van hubdispo.be zijn eigendom van ons bedrijf en beschermd door intellectuele eigendomswetten.",
                "Gebruikers krijgen een beperkte licentie om het platform te gebruiken voor legitieme zakelijke doeleinden.",
                "Elke reproductie, distributie of wijziging van platforminhoud zonder toestemming is verboden."
              ]
            },
            {
              title: "8. Accountbeëindiging",
              content: [
                "U kunt uw account op elk moment beëindigen via uw accountinstellingen.",
                "Wij behouden ons het recht voor om accounts die deze voorwaarden overtreden op te schorten of te beëindigen.",
                "Bij beëindiging wordt de toegang tot het platform onmiddellijk ingetrokken, maar gegevens worden bewaard volgens ons bewaarbeleid."
              ]
            },
            {
              title: "9. Technische Ondersteuning",
              content: [
                "Wij bieden technische ondersteuning tijdens kantooruren (Ma-Vr 8u-18u CET).",
                "Ondersteuning is beschikbaar via live chat, e-mail en telefoon.",
                "Wij streven ernaar problemen snel op te lossen maar kunnen geen specifieke responstijden garanderen."
              ]
            },
            {
              title: "10. Toepasselijk Recht",
              content: [
                "Deze voorwaarden vallen onder Belgisch recht.",
                "Eventuele geschillen worden opgelost door Belgische rechtbanken met jurisdictie in Brussel.",
                "Als een bepaling van deze voorwaarden ongeldig wordt geacht, blijven de overige bepalingen van kracht."
              ]
            }
          ]
        };
      default: // fr
        return {
          title: "Conditions d'utilisation",
          sections: [
            {
              title: "1. Conditions générales",
              content: [
                "Les présentes conditions d'utilisation régissent votre accès et votre utilisation de hubdispo.be, une plateforme SaaS destinée aux PME belges spécialisée dans la micro-consolidation logistique et l'automatisation douanière intelligente.",
                "En utilisant nos services, vous acceptez de vous conformer entièrement à ces conditions.",
                "Nous nous réservons le droit de modifier ces conditions à tout moment, avec notification aux utilisateurs via la plateforme."
              ]
            },
            {
              title: "2. Description des services",
              content: [
                "hubdispo.be offre une plateforme complète pour la gestion d'envois internationaux de petits volumes (<1 m³ / <200 kg).",
                "Nos services incluent : micro-consolidation logistique, automatisation douanière intelligente, suivi en temps réel, assistant douanier et gestion de consolidation.",
                "Nous visons à simplifier l'expérience d'envoi international à travers une approche 'one-stop shop'."
              ]
            },
            {
              title: "3. Responsabilités de l'utilisateur",
              content: [
                "Les utilisateurs doivent fournir des informations exactes et complètes lors de la création de leur compte et de la saisie d'envois.",
                "Vous êtes responsable du maintien de la confidentialité de vos identifiants de connexion.",
                "Vous devez respecter toutes les lois et réglementations applicables, notamment celles relatives au commerce international et aux douanes.",
                "Toute utilisation frauduleuse ou illégale de la plateforme est strictement interdite."
              ]
            },
            {
              title: "4. Responsabilité et garanties",
              content: [
                "hubdispo.be met tout en œuvre pour fournir des services fiables et précis, mais ne peut garantir un fonctionnement 100% sans erreur.",
                "Notre responsabilité est limitée au montant des frais payés pour le service spécifique concerné.",
                "Nous ne sommes pas responsables des retards ou problèmes causés par des tiers (transporteurs, autorités douanières, etc.).",
                "Les utilisateurs doivent vérifier que leurs envois respectent les réglementations du pays de destination."
              ]
            },
            {
              title: "5. Protection des données",
              content: [
                "Nous nous engageons à protéger vos données personnelles et professionnelles conformément au RGPD.",
                "Les données collectées sont utilisées uniquement pour fournir nos services et améliorer l'expérience utilisateur.",
                "Nous ne partageons pas vos données avec des tiers sans votre consentement explicite, sauf obligation légale.",
                "Pour plus de détails, consultez notre Politique de confidentialité."
              ]
            },
            {
              title: "6. Abonnement et paiement",
              content: [
                "Nos services sont proposés via différents plans d'abonnement (Starter, Business, Premium).",
                "Les paiements sont traités de manière sécurisée et les charges sont effectuées selon le plan choisi.",
                "Les abonnements se renouvellent automatiquement sauf annulation au moins 24h avant la date de renouvellement.",
                "Les remboursements sont traités selon notre politique de remboursement disponible dans votre compte."
              ]
            },
            {
              title: "7. Propriété intellectuelle",
              content: [
                "Tout le contenu, les fonctionnalités et les fonctionnalités de hubdispo.be appartiennent à notre société et sont protégés par les lois sur la propriété intellectuelle.",
                "Les utilisateurs se voient accorder une licence limitée pour utiliser la plateforme à des fins commerciales légitimes.",
                "Toute reproduction, distribution ou modification du contenu de la plateforme sans autorisation est interdite."
              ]
            },
            {
              title: "8. Résiliation du compte",
              content: [
                "Vous pouvez résilier votre compte à tout moment via les paramètres de votre compte.",
                "Nous nous réservons le droit de suspendre ou de résilier les comptes qui violent ces conditions.",
                "Lors de la résiliation, l'accès à la plateforme sera immédiatement révoqué, mais les données seront conservées selon notre politique de rétention."
              ]
            },
            {
              title: "9. Support technique",
              content: [
                "Nous fournissons un support technique pendant les heures ouvrables (Lun-Ven 8h-18h CET).",
                "Le support est disponible via le chat en direct, e-mail et téléphone.",
                "Nous nous efforçons de résoudre les problèmes rapidement mais ne pouvons garantir des temps de réponse spécifiques."
              ]
            },
            {
              title: "10. Droit applicable",
              content: [
                "Ces conditions sont régies par le droit belge.",
                "Tout litige sera résolu par les tribunaux belges ayant juridiction à Bruxelles.",
                "Si une disposition de ces conditions est jugée invalide, les dispositions restantes resteront en vigueur."
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
            <div className="p-2 bg-[#1E40AF]/10 rounded-lg">
              <Shield className="h-6 w-6 text-[#1E40AF]" />
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-[#1E40AF]" />
                hubdispo.be - Plateforme SaaS belge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {language === 'en' && "hubdispo.be is a Belgian SaaS platform dedicated to export/import SMEs, combining micro-consolidation logistics and intelligent customs automation. Our mission is to radically simplify the sending of small international volumes through a comprehensive 'one-stop shop' experience."}
                {language === 'nl' && "hubdispo.be is een Belgisch SaaS-platform gewijd aan export/import KMO's, dat micro-consolidatie logistiek en intelligente douane-automatisering combineert. Onze missie is het radicaal vereenvoudigen van het verzenden van kleine internationale volumes via een uitgebreide 'one-stop shop' ervaring."}
                {language === 'fr' && "hubdispo.be est une plateforme SaaS belge dédiée aux PME exportatrices/importatrices, combinant micro-consolidation logistique et automatisation douanière intelligente. Notre mission est de simplifier radicalement l'envoi de petits volumes internationaux à travers une expérience 'one-stop shop' complète."}
              </p>
            </CardContent>
          </Card>

          {/* Sections */}
          {content.sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Contact Info */}
          <Card className="border-[#1E40AF] bg-[#1E40AF]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#1E40AF]">
                <Users className="h-5 w-5" />
                {language === 'en' && 'Questions about these terms?'}
                {language === 'nl' && 'Vragen over deze voorwaarden?'}
                {language === 'fr' && 'Questions sur ces conditions ?'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> legal@hubdispo.be
                </p>
                <p>
                  <strong>Téléphone:</strong> +32 2 123 45 67
                </p>
                <p>
                  <strong>Adresse:</strong> Avenue Louise 149, 1050 Bruxelles, Belgique
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}