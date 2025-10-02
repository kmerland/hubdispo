// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { Button } from "./ui/button";
import { 
  Package, 
  Truck, 
  Shield, 
  Map,
  MessageCircle,
  Settings,
  HelpCircle,
  Bell,
  User,
  FileText,
  BarChart3,
  Search,
  Plus,
  Home,
  CreditCard,
  Calendar,
  Phone,
  Mail,
  Download,
  Activity,
  FileText
} from "lucide-react";

interface QuickNavigationProps {
  onNavigate: (view: string, params?: any) => void;
  variant?: 'sidebar' | 'horizontal' | 'grid' | 'minimal';
  exclude?: string[];
  context?: 'dashboard' | 'shipment' | 'help' | 'settings' | 'general';
}

export default function QuickNavigation({ 
  onNavigate, 
  variant = 'grid', 
  exclude = [],
  context = 'general'
}: QuickNavigationProps) {
  
  const allLinks = [
    { id: 'dashboard', label: 'Tableau de bord', icon: Home, category: 'main' },
    { id: 'new-shipment', label: 'Nouvel envoi', icon: Plus, category: 'main', primary: true },
    { id: 'shipments', label: 'Mes envois', icon: Package, category: 'main' },
    { id: 'consolidation', label: 'Consolidation', icon: Truck, category: 'main' },
    { id: 'customs', label: 'Douane', icon: Shield, category: 'main' },
    { id: 'dau-generator', label: 'Générer DAU', icon: FileText, category: 'main' },
    { id: 'dau-history', label: 'Mes DAU', icon: FileText, category: 'analytics' },
    { id: 'map', label: 'Carte', icon: Map, category: 'main' },
    { id: 'tracking', label: 'Suivi temps réel', icon: Activity, category: 'tracking' },
    { id: 'reports', label: 'Rapports', icon: BarChart3, category: 'analytics' },
    { id: 'search', label: 'Recherche', icon: Search, category: 'tools' },
    { id: 'notifications', label: 'Notifications', icon: Bell, category: 'communication' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, category: 'communication' },
    { id: 'profile', label: 'Profil', icon: User, category: 'account' },
    { id: 'settings', label: 'Paramètres', icon: Settings, category: 'account' },
    { id: 'subscription', label: 'Abonnement', icon: CreditCard, category: 'account' },
    { id: 'help', label: 'Centre d\'aide', icon: HelpCircle, category: 'support' },
    { id: 'documentation', label: 'Documentation', icon: FileText, category: 'support' },
    { id: 'guides', label: 'Guides vidéo', icon: Download, category: 'support' },
    { id: 'technical-support', label: 'Support technique', icon: Phone, category: 'support' },
    { id: 'demo-scheduler', label: 'Demander une démo', icon: Calendar, category: 'sales' },
    { id: 'email-support', label: 'Support email', icon: Mail, category: 'support' },
    { id: 'platform-status', label: 'État plateforme', icon: Activity, category: 'info' }
  ];

  // Filtrer les liens selon le contexte et les exclusions
  const getContextualLinks = () => {
    let filteredLinks = allLinks.filter(link => !exclude.includes(link.id));
    
    switch (context) {
      case 'dashboard':
        return filteredLinks.filter(link => 
          ['main', 'tracking', 'communication'].includes(link.category)
        );
      case 'shipment':
        return filteredLinks.filter(link => 
          ['main', 'tracking', 'support'].includes(link.category)
        );
      case 'help':
        return filteredLinks.filter(link => 
          ['support', 'main', 'communication'].includes(link.category)
        );
      case 'settings':
        return filteredLinks.filter(link => 
          ['account', 'support', 'info'].includes(link.category)
        );
      default:
        return filteredLinks;
    }
  };

  const contextualLinks = getContextualLinks();

  const handleNavigation = (linkId: string) => {
    if (linkId === 'tracking' || linkId === 'customs' || linkId === 'dau-generator') {
      // Ajouter des paramètres par défaut pour certaines vues
      onNavigate(linkId, { shipmentId: 'BE-2024-789' });
    } else {
      onNavigate(linkId);
    }
  };

  if (variant === 'sidebar') {
    return (
      <div className="space-y-2">
        {contextualLinks.map(link => (
          <Button
            key={link.id}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation(link.id)}
          >
            <link.icon className="h-4 w-4 mr-2" />
            {link.label}
          </Button>
        ))}
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="flex flex-wrap gap-2">
        {contextualLinks.slice(0, 6).map(link => (
          <Button
            key={link.id}
            variant={link.primary ? "default" : "outline"}
            size="sm"
            onClick={() => handleNavigation(link.id)}
            className={link.primary ? "bg-[#1E40AF] hover:bg-[#1E40AF]/90" : ""}
          >
            <link.icon className="h-4 w-4 mr-1" />
            {link.label}
          </Button>
        ))}
      </div>
    );
  }

  if (variant === 'minimal') {
    const primaryLinks = contextualLinks.filter(link => 
      ['dashboard', 'new-shipment', 'shipments', 'help'].includes(link.id)
    );
    
    return (
      <div className="flex gap-2">
        {primaryLinks.map(link => (
          <Button
            key={link.id}
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation(link.id)}
            title={link.label}
          >
            <link.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
    );
  }

  // Variant 'grid' (default)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {contextualLinks.map(link => (
        <Button
          key={link.id}
          variant={link.primary ? "default" : "outline"}
          className={`flex flex-col h-20 p-3 ${
            link.primary ? "bg-[#1E40AF] hover:bg-[#1E40AF]/90" : ""
          }`}
          onClick={() => handleNavigation(link.id)}
        >
          <link.icon className="h-5 w-5 mb-1" />
          <span className="text-xs text-center leading-tight">{link.label}</span>
        </Button>
      ))}
    </div>
  );
}