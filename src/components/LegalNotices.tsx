// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ArrowLeft, Building2, Scale, Shield, Globe, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "./LanguageProvider";

interface LegalNoticesProps {
  onNavigate: (view: string) => void;
}

export default function LegalNotices({ onNavigate }: LegalNoticesProps) {
  const { t, language } = useLanguage();

  const getContent = () => {
    switch (language) {
      case 'en':
        return {
          title: "Legal Notices",
          sections: [
            {
              title: "1. Site Publisher",
              icon: Building2,
              content: [
                {
                  label: "Company Name",
                  value: "hubdispo.be SPRL/BVBA"
                },
                {
                  label: "Legal Form",
                  value: "Private Limited Liability Company (SPRL/BVBA)"
                },
                {
                  label: "Company Number",
                  value: "BE 0123.456.789"
                },
                {
                  label: "VAT Number",
                  value: "BE 0123 456 789"
                },
                {
                  label: "Registered Office",
                  value: "Avenue Louise 149, 1050 Brussels, Belgium"
                },
                {
                  label: "Share Capital",
                  value: "€25,000 fully paid up"
                }
              ]
            },
            {
              title: "2. Contact Information",
              icon: Phone,
              content: [
                {
                  label: "General Contact",
                  value: "contact@hubdispo.be"
                },
                {
                  label: "Technical Support",
                  value: "support@hubdispo.be"
                },
                {
                  label: "Sales & Commercial",
                  value: "sales@hubdispo.be"
                },
                {
                  label: "Legal & Privacy",
                  value: "legal@hubdispo.be"
                },
                {
                  label: "Phone",
                  value: "+32 2 123 45 67"
                },
                {
                  label: "Business Hours", 
                  value: "Monday to Friday, 8am-6pm (CET)"
                }
              ]
            },
            {
              title: "3. Management",
              icon: Shield,
              content: [
                {
                  label: "CEO & Managing Director",
                  value: "Jean Dupont"
                },
                {
                  label: "CTO",
                  value: "Marie Lambert"
                },
                {
                  label: "Legal Representative",
                  value: "Jean Dupont"
                },
                {
                  label: "Data Protection Officer",
                  value: "Sophie Martin (privacy@hubdispo.be)"
                }
              ]
            },
            {
              title: "4. Regulatory Information",
              icon: Scale,
              content: [
                {
                  label: "Business License",
                  value: "Transport and Logistics License B-2024-LOG-001"
                },
                {
                  label: "Customs Registration",
                  value: "EORI Number: BE123456789012345"
                },
                {
                  label: "Insurance",
                  value: "Professional Liability - AXA Belgium (Policy #PRO-2024-001)"
                },
                {
                  label: "Banking",
                  value: "BNP Paribas Fortis - IBAN: BE68 5390 0754 7034"
                }
              ]
            },
            {
              title: "5. Technical Information",
              icon: Globe,
              content: [
                {
                  label: "Website Hosting",
                  value: "Amazon Web Services (AWS) - Ireland"
                },
                {
                  label: "Domain Registration",
                  value: "DNS Belgium (hubdispo.be)"
                },
                {
                  label: "SSL Certificate",
                  value: "Let's Encrypt Authority"
                },
                {
                  label: "Data Centers",
                  value: "AWS Europe (Ireland, Frankfurt)"
                },
                {
                  label: "Backup Locations",
                  value: "Multi-region backup (EU only)"
                }
              ]  
            },
            {
              title: "6. Professional Memberships",
              icon: Shield,
              content: [
                {
                  label: "Belgian Logistics Association",
                  value: "Member #BLA-2024-456"
                },
                {
                  label: "European Freight Forwarders",
                  value: "CLECAT Associate Member"
                },
                {
                  label: "Brussels Business Chamber",
                  value: "Member #BBC-2024-789"
                },
                {
                  label: "TechBelgium",
                  value: "SaaS Sector Member"
                }
              ]
            },
            {
              title: "7. Certifications & Compliance",
              icon: Shield,
              content: [
                {
                  label: "ISO 27001",
                  value: "Information Security Management (Cert. #ISO27001-BE-2024)"
                },
                {
                  label: "GDPR Compliance",
                  value: "Certified by Belgian DPA"
                },
                {
                  label: "SOC 2 Type II",
                  value: "Security & Privacy Controls"
                },
                {
                  label: "AEO Status",
                  value: "Authorized Economic Operator (Customs)"
                }
              ]
            },
            {
              title: "8. Intellectual Property",
              icon: Scale,
              content: [
                {
                  label: "Trademark",
                  value: "hubdispo® - Registered in Belgium & EU"
                },
                {
                  label: "Software Copyright",
                  value: "© 2024 hubdispo.be SPRL - All rights reserved"
                },
                {
                  label: "Patents",
                  value: "Micro-consolidation algorithm (Pending BE-2024-001)"
                },
                {
                  label: "Domain Names",
                  value: "hubdispo.be, hubdispo.com, hubdispo.eu"
                }
              ]
            },
            {
              title: "9. Dispute Resolution",
              icon: Scale,
              content: [
                {
                  label: "Competent Courts",
                  value: "Courts of Brussels, Belgium"
                },
                {
                  label: "Applicable Law",
                  value: "Belgian Law"
                },
                {
                  label: "Mediation",
                  value: "Belgian Mediation Commission for Consumer Disputes"
                },
                {
                  label: "Online Dispute Resolution",
                  value: "EU ODR Platform: ec.europa.eu/consumers/odr"
                }
              ]
            },
            {
              title: "10. Publication Details",
              icon: Globe,
              content: [
                {
                  label: "Website",
                  value: "https://hubdispo.be"
                },
                {
                  label: "Publication Director",
                  value: "Jean Dupont, CEO"
                },
                {
                  label: "Content Manager",
                  value: "Marie Lambert, CTO"
                },
                {
                  label: "Last Update",
                  value: "September 30, 2024"
                }
              ]
            }
          ]
        };
      case 'nl':
        return {
          title: "Juridische vermeldingen",
          sections: [
            {
              title: "1. Site Uitgever",
              icon: Building2,
              content: [
                {
                  label: "Bedrijfsnaam",
                  value: "hubdispo.be SPRL/BVBA"
                },
                {
                  label: "Rechtsvorm",
                  value: "Besloten Vennootschap met Beperkte Aansprakelijkheid (SPRL/BVBA)"
                },
                {
                  label: "Ondernemingsnummer",
                  value: "BE 0123.456.789"
                },
                {
                  label: "BTW-nummer",
                  value: "BE 0123 456 789"
                },
                {
                  label: "Maatschappelijke zetel",
                  value: "Louizalaan 149, 1050 Brussel, België"
                },
                {
                  label: "Maatschappelijk kapitaal",
                  value: "€25.000 volledig volgestort"
                }
              ]
            },
            {
              title: "2. Contactgegevens",
              icon: Phone,
              content: [
                {
                  label: "Algemeen contact",
                  value: "contact@hubdispo.be"
                },
                {
                  label: "Technische ondersteuning",
                  value: "support@hubdispo.be"
                },
                {
                  label: "Verkoop & Commercieel",
                  value: "sales@hubdispo.be"
                },
                {
                  label: "Juridisch & Privacy",
                  value: "legal@hubdispo.be"
                },
                {
                  label: "Telefoon",
                  value: "+32 2 123 45 67"
                },
                {
                  label: "Kantooruren", 
                  value: "Maandag tot vrijdag, 8u-18u (CET)"
                }
              ]
            },
            {
              title: "3. Directie",
              icon: Shield,
              content: [
                {
                  label: "CEO & Gedelegeerd bestuurder",
                  value: "Jean Dupont"
                },
                {
                  label: "CTO",
                  value: "Marie Lambert"
                },
                {
                  label: "Wettelijke vertegenwoordiger",
                  value: "Jean Dupont"
                },
                {
                  label: "Functionaris Gegevensbescherming",
                  value: "Sophie Martin (privacy@hubdispo.be)"
                }
              ]
            },
            {
              title: "4. Regelgevingsinformatie",
              icon: Scale,
              content: [
                {
                  label: "Bedrijfsvergunning",
                  value: "Transport en Logistiek Vergunning B-2024-LOG-001"
                },
                {
                  label: "Douaneregistratie",
                  value: "EORI Nummer: BE123456789012345"
                },
                {
                  label: "Verzekering",
                  value: "Professionele Aansprakelijkheid - AXA België (Polis #PRO-2024-001)"
                },
                {
                  label: "Bankgegevens",
                  value: "BNP Paribas Fortis - IBAN: BE68 5390 0754 7034"
                }
              ]
            },
            {
              title: "5. Technische informatie",
              icon: Globe,
              content: [
                {
                  label: "Website hosting",
                  value: "Amazon Web Services (AWS) - Ierland"
                },
                {
                  label: "Domeinregistratie",
                  value: "DNS België (hubdispo.be)"
                },
                {
                  label: "SSL Certificaat",
                  value: "Let's Encrypt Authority"
                },
                {
                  label: "Datacenters",
                  value: "AWS Europa (Ierland, Frankfurt)"
                },
                {
                  label: "Backup locaties",
                  value: "Multi-regio backup (alleen EU)"
                }
              ]  
            },
            {
              title: "6. Professionele lidmaatschappen",
              icon: Shield,
              content: [
                {
                  label: "Belgische Logistiek Vereniging",
                  value: "Lid #BLA-2024-456"
                },
                {
                  label: "Europese Vrachtvervoerders",
                  value: "CLECAT Geassocieerd Lid"
                },
                {
                  label: "Brusselse Handelskamer",
                  value: "Lid #BBC-2024-789"
                },
                {
                  label: "TechBelgium",
                  value: "SaaS Sector Lid"
                }
              ]
            },
            {
              title: "7. Certificeringen & Naleving",
              icon: Shield,
              content: [
                {
                  label: "ISO 27001",
                  value: "Informatiebeveiliging Management (Cert. #ISO27001-BE-2024)"
                },
                {
                  label: "GDPR Naleving",
                  value: "Gecertificeerd door Belgische GBA"
                },
                {
                  label: "SOC 2 Type II",
                  value: "Beveiliging & Privacy Controls"
                },
                {
                  label: "AEO Status",
                  value: "Geautoriseerde Economische Operator (Douane)"
                }
              ]
            },
            {
              title: "8. Intellectueel eigendom",
              icon: Scale,
              content: [
                {
                  label: "Handelsmerk",
                  value: "hubdispo® - Geregistreerd in België & EU"
                },
                {
                  label: "Software Copyright",
                  value: "© 2024 hubdispo.be SPRL - Alle rechten voorbehouden"
                },
                {
                  label: "Patenten",
                  value: "Micro-consolidatie algoritme (In behandeling BE-2024-001)"
                },
                {
                  label: "Domeinnamen",
                  value: "hubdispo.be, hubdispo.com, hubdispo.eu"
                }
              ]
            },
            {
              title: "9. Geschillenbeslechting",
              icon: Scale,
              content: [
                {
                  label: "Bevoegde rechtbanken",
                  value: "Rechtbanken van Brussel, België"
                },
                {
                  label: "Toepasselijk recht",
                  value: "Belgisch recht"
                },
                {
                  label: "Bemiddeling",
                  value: "Belgische Bemiddelingscommissie voor Consumentengeschillen"
                },
                {
                  label: "Online Geschillenbeslechting",
                  value: "EU ODR Platform: ec.europa.eu/consumers/odr"
                }
              ]
            },
            {
              title: "10. Publicatiedetails",
              icon: Globe,
              content: [
                {
                  label: "Website",
                  value: "https://hubdispo.be"
                },
                {
                  label: "Publicatiedirecteur",
                  value: "Jean Dupont, CEO"
                },
                {
                  label: "Content Manager",
                  value: "Marie Lambert, CTO"
                },
                {
                  label: "Laatste update",
                  value: "30 september 2024"
                }
              ]
            }
          ]
        };
      default: // fr
        return {
          title: "Mentions légales",
          sections: [
            {
              title: "1. Éditeur du site",
              icon: Building2,
              content: [
                {
                  label: "Raison sociale",
                  value: "hubdispo.be SPRL/BVBA"
                },
                {
                  label: "Forme juridique",
                  value: "Société Privée à Responsabilité Limitée (SPRL/BVBA)"
                },
                {
                  label: "Numéro d'entreprise",
                  value: "BE 0123.456.789"
                },
                {
                  label: "Numéro de TVA",
                  value: "BE 0123 456 789"
                },
                {
                  label: "Siège social",
                  value: "Avenue Louise 149, 1050 Bruxelles, Belgique"
                },
                {
                  label: "Capital social",
                  value: "25.000€ entièrement libéré"
                }
              ]
            },
            {
              title: "2. Coordonnées",
              icon: Phone,
              content: [
                {
                  label: "Contact général",
                  value: "contact@hubdispo.be"
                },
                {
                  label: "Support technique",
                  value: "support@hubdispo.be"
                },
                {
                  label: "Commercial & Ventes",
                  value: "sales@hubdispo.be"
                },
                {
                  label: "Juridique & Confidentialité",
                  value: "legal@hubdispo.be"
                },
                {
                  label: "Téléphone",
                  value: "+32 2 123 45 67"
                },
                {
                  label: "Heures d'ouverture", 
                  value: "Lundi au vendredi, 8h-18h (CET)"
                }
              ]
            },
            {
              title: "3. Direction",
              icon: Shield,
              content: [
                {
                  label: "CEO & Administrateur délégué",
                  value: "Jean Dupont"
                },
                {
                  label: "CTO",
                  value: "Marie Lambert"
                },
                {
                  label: "Représentant légal",
                  value: "Jean Dupont"
                },
                {
                  label: "Délégué à la protection des données",
                  value: "Sophie Martin (privacy@hubdispo.be)"
                }
              ]
            },
            {
              title: "4. Informations réglementaires",
              icon: Scale,
              content: [
                {
                  label: "Licence d'activité",
                  value: "Licence Transport et Logistique B-2024-LOG-001"
                },
                {
                  label: "Enregistrement douanier",
                  value: "Numéro EORI : BE123456789012345"
                },
                {
                  label: "Assurance",
                  value: "Responsabilité Civile Professionnelle - AXA Belgique (Police #PRO-2024-001)"
                },
                {
                  label: "Données bancaires",
                  value: "BNP Paribas Fortis - IBAN : BE68 5390 0754 7034"
                }
              ]
            },
            {
              title: "5. Informations techniques",
              icon: Globe,
              content: [
                {
                  label: "Hébergement du site",
                  value: "Amazon Web Services (AWS) - Irlande"
                },
                {
                  label: "Enregistrement du domaine",
                  value: "DNS Belgium (hubdispo.be)"
                },
                {
                  label: "Certificat SSL",
                  value: "Let's Encrypt Authority"
                },
                {
                  label: "Centres de données",
                  value: "AWS Europe (Irlande, Francfort)"
                },
                {
                  label: "Sauvegardes",
                  value: "Backup multi-régions (UE uniquement)"
                }
              ]  
            },
            {
              title: "6. Adhésions professionnelles",
              icon: Shield,
              content: [
                {
                  label: "Association Belge de Logistique",
                  value: "Membre #BLA-2024-456"
                },
                {
                  label: "Transitaires Européens",
                  value: "Membre Associé CLECAT"
                },
                {
                  label: "Chambre de Commerce de Bruxelles",
                  value: "Membre #BBC-2024-789"
                },
                {
                  label: "TechBelgium",
                  value: "Membre Secteur SaaS"
                }
              ]
            },
            {
              title: "7. Certifications & Conformité",
              icon: Shield,
              content: [
                {
                  label: "ISO 27001",
                  value: "Management de la Sécurité de l'Information (Cert. #ISO27001-BE-2024)"
                },
                {
                  label: "Conformité RGPD",
                  value: "Certifié par l'APD belge"
                },
                {
                  label: "SOC 2 Type II",
                  value: "Contrôles Sécurité & Confidentialité"
                },
                {
                  label: "Statut OEA",
                  value: "Opérateur Économique Agréé (Douanes)"
                }
              ]
            },
            {
              title: "8. Propriété intellectuelle",
              icon: Scale,
              content: [
                {
                  label: "Marque déposée",
                  value: "hubdispo® - Enregistrée en Belgique & UE"
                },
                {
                  label: "Droits d'auteur logiciel",
                  value: "© 2024 hubdispo.be SPRL - Tous droits réservés"
                },
                {
                  label: "Brevets",
                  value: "Algorithme de micro-consolidation (En cours BE-2024-001)"
                },
                {
                  label: "Noms de domaine",
                  value: "hubdispo.be, hubdispo.com, hubdispo.eu"
                }
              ]
            },
            {
              title: "9. Résolution des litiges",
              icon: Scale,
              content: [
                {
                  label: "Tribunaux compétents",
                  value: "Tribunaux de Bruxelles, Belgique"
                },
                {
                  label: "Droit applicable",
                  value: "Droit belge"
                },
                {
                  label: "Médiation",
                  value: "Commission belge de médiation pour les litiges de consommation"
                },
                {
                  label: "Règlement en ligne des litiges",
                  value: "Plateforme RLL UE : ec.europa.eu/consumers/odr"
                }
              ]
            },
            {
              title: "10. Détails de publication",
              icon: Globe,
              content: [
                {
                  label: "Site web",
                  value: "https://hubdispo.be"
                },
                {
                  label: "Directeur de publication",
                  value: "Jean Dupont, CEO"
                },
                {
                  label: "Responsable contenu",
                  value: "Marie Lambert, CTO"
                },
                {
                  label: "Dernière mise à jour",
                  value: "30 septembre 2024"
                }
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
              <Scale className="h-6 w-6 text-[#1E40AF]" />
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
          {/* Company Overview */}
          <Card className="border-[#1E40AF] bg-[#1E40AF]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#1E40AF]">
                <Building2 className="h-5 w-5" />
                hubdispo.be SPRL/BVBA
                <Badge className="bg-[#10B981] text-white ml-2">
                  🇧🇪 Belgique
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {language === 'en' && "Belgian SaaS company specializing in micro-consolidation logistics and intelligent customs automation for export/import SMEs. Registered in Brussels, Belgium."}
                {language === 'nl' && "Belgisch SaaS-bedrijf gespecialiseerd in micro-consolidatie logistiek en intelligente douane-automatisering voor export/import KMO's. Geregistreerd in Brussel, België."}
                {language === 'fr' && "Société SaaS belge spécialisée dans la micro-consolidation logistique et l'automatisation douanière intelligente pour les PME exportatrices/importatrices. Enregistrée à Bruxelles, Belgique."}
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-1">
                        <dt className="font-medium text-gray-900">{item.label}</dt>
                        <dd className="text-gray-700">{item.value}</dd>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Contact for Legal Questions */}
          <Card className="border-[#10B981] bg-[#10B981]/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#10B981]">
                <Mail className="h-5 w-5" />
                {language === 'en' && 'Legal Questions'}
                {language === 'nl' && 'Juridische vragen'}
                {language === 'fr' && 'Questions légales'}
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