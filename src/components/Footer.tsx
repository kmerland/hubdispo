// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Github, Leaf, Shield, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useLanguage } from "./LanguageProvider";

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const companyLinks = [
    { name: "À propos", href: "#", action: () => onNavigate("about") },
    { name: "Notre équipe", href: "#", action: () => onNavigate("team") },
    { name: "Carrières", href: "#", action: () => onNavigate("careers") },
    { name: "Presse", href: "#", action: () => onNavigate("press") },
    { name: "Partenaires", href: "#", action: () => onNavigate("partners") }
  ];

  const productLinks = [
    { name: "Fonctionnalités", href: "#", action: () => onNavigate("features") },
    { name: "Tarifs", href: "#", action: () => onNavigate("subscription") },
    { name: "API", href: "#", action: () => onNavigate("api") },
    { name: "Intégrations", href: "#", action: () => onNavigate("integrations") },
    { name: "Mises à jour", href: "#", action: () => onNavigate("updates") }
  ];

  const supportLinks = [
    { name: t('support.help_center'), href: "#", action: () => onNavigate("help") },
    { name: "❓ Questions fréquentes", href: "#", action: () => onNavigate("faq") },
    { name: t('support.documentation'), href: "#", action: () => onNavigate("documentation") },
    { name: t('support.guides'), href: "#", action: () => onNavigate("guides") },
    { name: t('support.technical_support'), href: "#", action: () => onNavigate("technical-support") },
    { name: t('support.platform_status'), href: "#", action: () => onNavigate("platform-status") }
  ];

  const legalLinks = [
    { name: t('legal.terms'), href: "#", action: () => onNavigate("terms") },
    { name: t('legal.privacy'), href: "#", action: () => onNavigate("privacy") },
    { name: t('legal.notices'), href: "#", action: () => onNavigate("legal") },
    { name: "RGPD", href: "#", action: () => onNavigate("privacy") },
    { name: "Cookies", href: "#", action: () => onNavigate("privacy") }
  ];

  const certifications = [
    { name: "ISO 27001", description: "Sécurité des données" },
    { name: "GDPR", description: "Conformité européenne" },
    { name: "B-Corp", description: "Impact social positif" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">hubdispo.be</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                La plateforme SaaS belge qui révolutionne l'export pour les PME. 
                Micro-consolidation logistique et automatisation douanière intelligente 
                pour simplifier vos envois internationaux.
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#10B981] text-white">
                  <Leaf className="h-3 w-3 mr-1" />
                  Éco-responsable
                </Badge>
                <Badge className="bg-[#1E40AF] text-white">
                  🇧🇪 Made in Belgium
                </Badge>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span>Avenue Louise 149, 1050 Bruxelles, Belgique</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a 
                  href="tel:+3221234567" 
                  className="hover:text-white transition-colors"
                >
                  +32 2 123 45 67
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a 
                  href="mailto:contact@hubdispo.be" 
                  className="hover:text-white transition-colors"
                >
                  contact@hubdispo.be
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Clock className="h-5 w-5 flex-shrink-0" />
                <span>Lun-Ven 8h-18h (CET)</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Suivez-nous</h4>
              <div className="flex gap-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-700 hover:bg-gray-800"
                  onClick={() => window.open('https://linkedin.com/company/hubdispo', '_blank')}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-700 hover:bg-gray-800"
                  onClick={() => window.open('https://twitter.com/hubdispo', '_blank')}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-700 hover:bg-gray-800"
                  onClick={() => window.open('https://facebook.com/hubdispo', '_blank')}
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-700 hover:bg-gray-800"
                  onClick={() => window.open('https://github.com/hubdispo', '_blank')}
                >
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-white mb-4">Entreprise</h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={link.action}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-white mb-4">Produit</h4>
              <ul className="space-y-3">
                {productLinks.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={link.action}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={link.action}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Légal</h4>
              <ul className="space-y-3">
                {legalLinks.slice(0, 3).map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={link.action}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Certifications & Trust Badges */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Certifications */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-center lg:text-left">
                Certifications & Conformité
              </h4>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
                    <Shield className="h-4 w-4 text-[#10B981]" />
                    <div>
                      <div className="text-sm font-medium text-white">{cert.name}</div>
                      <div className="text-xs text-gray-400">{cert.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="text-center lg:text-right">
              <h4 className="font-semibold text-white mb-4">Démarrez maintenant</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                  onClick={() => onNavigate("dashboard")}
                >
                  Essai gratuit
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-700 hover:bg-gray-800"
                  onClick={() => onNavigate("demo-scheduler")}
                >
                  Demander une démo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm text-center lg:text-left">
              © {currentYear} hubdispo.be - Tous droits réservés. 
              <span className="block lg:inline lg:ml-2">
                Simplifier l'export, c'est notre mission.
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#10B981]" />
                <span>Startup de l'année 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-[#10B981]" />
                <span>Neutre en carbone</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}