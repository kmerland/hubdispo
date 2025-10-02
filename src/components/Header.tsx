// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { Package, Bell, User, Menu, Settings, Home, Plus, Search, HelpCircle, MessageCircle, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useToast } from "./ToastProvider";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import LanguageSelector from "./LanguageSelector";
import AlertsBadge from "./AlertsBadge";
import ConnectionStatus from "./ConnectionStatus";
import ResponsiveContainer from "./ResponsiveContainer";
import { useHeaderLayout } from "./useResponsive";

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onShowChat?: () => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { showToast } = useToast();
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const layout = useHeaderLayout();

  const navItems = [
    { id: "dashboard", label: "Tableau de bord", shortLabel: "Accueil", icon: "🏠" },
    { id: "shipments", label: "Mes envois", shortLabel: "Envois", icon: "📦" },
    { id: "map", label: "Carte trajets", shortLabel: "Carte", icon: "🗺️" },
    { id: "consolidation", label: "Consolidation", shortLabel: "Groupage", icon: "🤝" },
    { id: "tax-compliance", label: "Fiscalité & TVA", shortLabel: "TVA", icon: "📊" },
    { id: "intelligent-alerts", label: "Alertes IA", shortLabel: "Alertes", icon: "🤖" },
    { id: "faq", label: "FAQ", shortLabel: "Aide", icon: "❓" }
  ];

 const handleSearch = () => {
  if (searchQuery.trim()) {
    // Sauvegarde temporaire de la requête
    try {
      sessionStorage.setItem('hubdispo_search_query', searchQuery);
    } catch (e) {
      console.warn("Could not save search query to sessionStorage");
    }
    onNavigate("search"); // ✅ 1 seul argument
    showToast({
      type: 'info',
      message: `Search launched : "${searchQuery}"`,
      duration: 3000
    });
  } else {
    showToast({
      type: 'warning',
      message: "Please enter a search term",
      duration: 3000
    });
  }
};

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleNotificationClick = () => {
    onNavigate("notifications");
    showToast({
      type: 'info',
      message: "3 nouvelles notifications",
      duration: 3000
    });
  };

  const handleMessagesClick = () => {
    onNavigate("messages");
    showToast({
      type: 'info',
      message: "2 nouveaux messages",
      duration: 3000
    });
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <ResponsiveContainer className="py-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 shrink-0">
            {!layout.showCenterNav && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-8 h-8 shrink-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            )}
            <div 
              className="flex items-center gap-2 cursor-pointer shrink-0" 
              onClick={() => onNavigate("homepage")}
            >
              <Package className="h-6 w-6 text-[#1E40AF]" />
              {layout.showFullLogo && (
                <span className="font-semibold text-base whitespace-nowrap">hubdispo.be</span>
              )}
              {!layout.showFullLogo && (
                <span className="font-semibold text-base">HD</span>
              )}
            </div>
            {layout.isUltraWide && (
              <div className="flex items-center gap-2 ml-2">
                <div className="h-4 w-px bg-gray-300"></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate("homepage")}
                  className="text-gray-600 hover:text-[#1E40AF] px-2 h-8"
                >
                  <Home className="h-3 w-3 mr-1" />
                  <span className="text-sm">Accueil</span>
                </Button>
              </div>
            )}
          </div>

          <div className="flex-1 flex justify-center min-w-0">
            {layout.showCenterNav && (
              <nav className="flex items-center gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`
                      relative px-2 py-1.5 rounded-md transition-all duration-200 
                      font-medium text-sm flex items-center gap-1.5 whitespace-nowrap
                      ${
                        currentView === item.id
                          ? "bg-[#1E40AF]/10 text-[#1E40AF] shadow-sm"
                          : "text-gray-600 hover:text-[#1E40AF] hover:bg-gray-50"
                      }
                    `}
                    title={item.label}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-xs">{layout.isUltraWide ? item.label : item.shortLabel}</span>
                    {currentView === item.id && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#1E40AF] rounded-full"></div>
                    )}
                  </button>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {layout.showConnectionStatus && <ConnectionStatus />}
            {layout.showLanguageSelector && <LanguageSelector variant="light" />}
            {isAuthenticated ? (
              <>
                {layout.showFullSearch && (
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                    <Input
                      placeholder="Rechercher..."
                      className="pl-7 pr-3 w-32 h-8 text-xs border-gray-200"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleSearchKeyPress}
                    />
                    {searchQuery && (
                      <Button
                        size="sm"
                        className="absolute right-0.5 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                        onClick={handleSearch}
                      >
                        <Search className="h-2.5 w-2.5" />
                      </Button>
                    )}
                  </div>
                )}
                {layout.showSearchIcon && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="w-8 h-8"
                    onClick={() => onNavigate("search")}
                    title="Rechercher"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                )}
                {layout.showFullButtons ? (
                  <Button 
                    size="sm" 
                    className="bg-[#1E40AF] hover:bg-[#1E40AF]/90 h-8 px-2"
                    onClick={() => onNavigate("new-shipment")}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    <span className="text-xs">Nouvel envoi</span>
                  </Button>
                ) : layout.showCenterNav ? (
                  <Button 
                    size="sm" 
                    className="bg-[#1E40AF] hover:bg-[#1E40AF]/90 h-8 px-2"
                    onClick={() => onNavigate("new-shipment")}
                  >
                    <Plus className="h-3 w-3" />
                    <span className="text-xs ml-1">Envois</span>
                  </Button>
                ) : (
                  <Button 
                    size="icon" 
                    className="bg-[#1E40AF] hover:bg-[#1E40AF]/90 w-8 h-8"
                    onClick={() => onNavigate("new-shipment")}
                    title="Nouvel envoi"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
                <div className="flex items-center">
                  {layout.showSupportButton && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="w-8 h-8"
                      title="Support"
                      onClick={() => onNavigate("help")}
                    >
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  )}
                  {layout.showMessagesButton && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="relative w-8 h-8"
                      title="Messages"
                      onClick={() => onNavigate("messages")}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <div className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold leading-none">2</span>
                      </div>
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative w-8 h-8"
                    onClick={() => onNavigate("notifications")}
                    title="Notifications"
                  >
                    <Bell className="h-4 w-4" />
                    <div className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold leading-none">3</span>
                    </div>
                  </Button>
                  {layout.showCenterNav && <AlertsBadge onNavigate={onNavigate} />}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1.5 px-1.5 h-8 ml-1">
                      <div className="w-6 h-6 rounded-full bg-[#1E40AF] flex items-center justify-center text-white text-xs font-semibold">
                        {user?.firstName?.[0]?.toUpperCase() || 'U'}
                      </div>
                      {layout.showFullUserName && (
                        <span className="text-xs font-medium max-w-16 truncate">
                          {user?.firstName}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2 border-b">
                      <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                      <Badge className="bg-[#10B981] text-white text-xs mt-1">
                        {user?.plan || "Starter"}
                      </Badge>
                    </div>
                    <DropdownMenuItem onClick={() => onNavigate("dashboard")} className="text-sm">
                      <Home className="h-4 w-4 mr-2" />
                      Tableau de bord
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate("profile")} className="text-sm">
                      <User className="h-4 w-4 mr-2" />
                      Profil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate("settings")} className="text-sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Paramètres
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate("notifications")} className="text-sm">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onNavigate("subscription")} className="text-sm">
                      <Package className="h-4 w-4 mr-2" />
                      Abonnement
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate("help")} className="text-sm">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Aide
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => { logout(); onNavigate("homepage"); }} 
                      className="text-red-600 text-sm"
                    >
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate("login")}
                  className="text-gray-600 hover:text-[#1E40AF] h-8 px-2 text-xs"
                >
                  {layout.isMobile ? "Se connecter" : "Connexion"}
                </Button>
                <Button
                  size="sm"
                  onClick={() => onNavigate("register")}
                  className="bg-[#1E40AF] hover:bg-[#1E40AF]/90 h-8 px-2 text-xs"
                >
                  {layout.isMobile ? "Créer" : "S'inscrire"}
                </Button>
              </>
            )}
          </div>
        </div>
      </ResponsiveContainer>

      {isMobileMenuOpen && !layout.showCenterNav && (
        <div className="fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative bg-white border-t shadow-lg">
            <div className="px-4 py-4 max-h-[80vh] overflow-y-auto">
              {isAuthenticated && (
                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-10 pr-4 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                  />
                  {searchQuery && (
                    <Button
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 px-2 bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                      onClick={() => {
                        handleSearch();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Search className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              )}
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      currentView === item.id
                        ? "bg-[#1E40AF] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#1E40AF]"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
              {isAuthenticated && (
                <div className="mt-4 pt-4 border-t space-y-2">
                  <button
                    onClick={() => {
                      onNavigate("new-shipment");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg bg-[#1E40AF] text-white flex items-center gap-3 font-medium"
                  >
                    <Plus className="h-5 w-5" />
                    Nouvel envoi
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("messages");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#1E40AF] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5" />
                      <span className="font-medium">Messages</span>
                    </div>
                    <Badge className="bg-blue-500 text-white text-xs">2</Badge>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("help");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#1E40AF] flex items-center gap-3"
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span className="font-medium">Centre d'aide</span>
                  </button>
                </div>
              )}
              <div className="mt-4 pt-4 border-t space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Langue</span>
                  <LanguageSelector variant="light" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Connexion</span>
                  <ConnectionStatus />
                </div>
                {!isAuthenticated && (
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        onNavigate("login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-[#1E40AF] font-medium"
                    >
                      Connexion
                    </button>
                    <button
                      onClick={() => {
                        onNavigate("register");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg bg-[#1E40AF] text-white font-medium"
                    >
                      Créer un compte
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
