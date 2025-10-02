// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from "react";
import { Package } from "lucide-react";
import Header from "./components/Header";
import EnhancedHomepage from "./components/EnhancedHomepage";
import Footer from "./components/Footer";
import MainDashboard from "./components/MainDashboard";
import EnhancedShipmentForm from "./components/EnhancedShipmentForm";
import EnhancedConsolidationHub from "./components/EnhancedConsolidationHub";
import ConsolidationCenter from "./components/ConsolidationCenter";
import CustomsAssistant from "./components/CustomsAssistant";
import EnhancedTrackingDetail from "./components/EnhancedTrackingDetail";
import SubscriptionPage from "./components/SubscriptionPage";
import EnhancedShipmentsList from "./components/EnhancedShipmentsList";
import CustomsHistoryHub from "./components/CustomsHistoryHub";
import NotificationCenter from "./components/NotificationCenter";
import UserSettings from "./components/UserSettings";
import Reports from "./components/Reports";
import HelpCenter from "./components/ComprehensiveHelpCenter";
import Messages from "./components/Messages";
import UserProfile from "./components/UserProfile";
import SearchResults from "./components/SearchResults";
import LiveChat from "./components/LiveChat";
import MapView from "./components/MapView";
import InteractiveRouteMap from "./components/InteractiveRouteMap";
import Login from "./components/Login";
import Register from "./components/Register";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import LegalNotices from "./components/LegalNotices";
import Documentation from "./components/Documentation";
import Guides from "./components/Guides";
import TechnicalSupport from "./components/TechnicalSupport";
import PlatformStatus from "./components/PlatformStatus";
import DirectChatSupport from "./components/DirectChatSupport";
import PhoneSupport from "./components/PhoneSupport";
import EmailSupport from "./components/EmailSupport";
import SystemStatus from "./components/SystemStatus";
import StripeCheckout from "./components/StripeCheckout";
import DemoScheduler from "./components/DemoScheduler";
import DAUGenerator from "./components/DAUGenerator";
import DAUHistory from "./components/DAUHistory";
import EnhancedIntelligentAlertsSystem from "./components/EnhancedIntelligentAlertsSystem";
import IntelligentAlertsCenter from "./components/IntelligentAlertsCenter";
import ComprehensiveFAQ from "./components/ComprehensiveFAQ";
import FloatingFAQButton from "./components/FloatingFAQButton";
import SmartBreadcrumb from "./components/SmartBreadcrumb";
import TaxComplianceCenter from "./components/TaxComplianceCenter";
import SubscriptionManagement from "./components/SubscriptionManagement";
import BillingHistory from "./components/BillingHistory";
import StripeWebhooks from "./components/StripeWebhooks";
import AboutPage from "./components/AboutPage";
import TeamPage from "./components/TeamPage";
import CareersPage from "./components/CareersPage";
import PressPage from "./components/PressPage";
import PartnersPage from "./components/PartnersPage";
import FeaturesPage from "./components/FeaturesPage";
import APIPage from "./components/APIPage";
import IntegrationsPage from "./components/IntegrationsPage";
import UpdatesPage from "./components/UpdatesPage";
import PageTransition from "./components/PageTransition";

import { ToastProvider } from "./components/ToastProvider";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import { LanguageProvider } from "./components/LanguageProvider";

function AppContent() {
  const [currentView, setCurrentView] = useState("homepage");
  const [viewParams, setViewParams] = useState<any>({});
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  const handleNavigate = (view: string, params?: any) => {
    // Petite transition avant de changer la vue pour un effet fluide
    setCurrentView(view);
    setViewParams(params || {});
    
    // Scroll vers le haut lors de la navigation avec animation douce
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleShowChat = () => {
    setShowLiveChat(true);
    setIsChatMinimized(false);
  };

  const handleCloseChat = () => {
    setShowLiveChat(false);
    setIsChatMinimized(false);
  };

  const handleMinimizeChat = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  const renderCurrentView = () => {
    // Pour les vues qui nécessitent une authentification
    const protectedViews = [
      "dashboard", "new-shipment", "consolidation", "customs", "tracking", 
      "subscription", "shipments", "customs-history", "notifications", 
      "settings", "reports", "help", "messages", "profile", "search", 
      "map", "system-status", "stripe-checkout", "dau-generator", "dau-history",
      "intelligent-alerts", "faq", "direct-chat", "tax-compliance",
      "subscription-management", "billing-history", "stripe-webhooks"
    ];

    // Si l'utilisateur n'est pas authentifié et tente d'accéder à une vue protégée
    if (protectedViews.includes(currentView) && !isAuthenticated) {
      return <Login onNavigate={handleNavigate} />;
    }

    switch (currentView) {
      case "homepage":
        return <EnhancedHomepage onNavigate={handleNavigate} />;
      case "login":
        return <Login onNavigate={handleNavigate} />;
      case "register":
        return <Register onNavigate={handleNavigate} />;
      case "dashboard":
        return <MainDashboard onNavigate={handleNavigate} />;
      case "new-shipment":
        return <EnhancedShipmentForm onNavigate={handleNavigate} />;
      case "consolidation":
        return <ConsolidationCenter onNavigate={handleNavigate} />;
      case "customs":
        return <CustomsAssistant shipmentId={viewParams.shipmentId} onNavigate={handleNavigate} />;
      case "tracking":
        return <EnhancedTrackingDetail shipmentId={viewParams.shipmentId} onNavigate={handleNavigate} />;
      case "subscription":
        return <SubscriptionPage onNavigate={handleNavigate} />;
      case "shipments":
        return <EnhancedShipmentsList 
          onViewTracking={(id) => handleNavigate("tracking", { shipmentId: id })} 
          onNavigate={handleNavigate}
        />;
      case "customs-history":
        return <CustomsHistoryHub onNavigate={handleNavigate} />;
      case "notifications":
        return <NotificationCenter onNavigate={handleNavigate} />;
      case "settings":
        return <UserSettings onNavigate={handleNavigate} />;
      case "reports":
        return <Reports onNavigate={handleNavigate} />;
      case "help":
        return <HelpCenter onNavigate={handleNavigate} />;
      case "messages":
        return <Messages onNavigate={handleNavigate} />;
      case "profile":
        return <UserProfile onNavigate={handleNavigate} />;
      case "search":
        return <SearchResults onNavigate={handleNavigate} initialQuery={viewParams?.query || ""} />;
      case "map":
        return <InteractiveRouteMap onNavigate={handleNavigate} />;
      case "terms":
        return <TermsOfService onNavigate={handleNavigate} />;
      case "privacy":
        return <PrivacyPolicy onNavigate={handleNavigate} />;
      case "legal":
        return <LegalNotices onNavigate={handleNavigate} />;
      case "documentation":
        return <Documentation onNavigate={handleNavigate} />;
      case "guides":
        return <Guides onNavigate={handleNavigate} />;
      case "technical-support":
        return <TechnicalSupport onNavigate={handleNavigate} />;
      case "direct-chat":
        return <DirectChatSupport onNavigate={handleNavigate} />;
      case "phone-support":
        return <PhoneSupport onNavigate={handleNavigate} />;
      case "email-support":
        return <EmailSupport onNavigate={handleNavigate} />;
      case "platform-status":
        return <PlatformStatus onNavigate={handleNavigate} />;
      case "system-status":
        return <SystemStatus onNavigate={handleNavigate} />;
      case "stripe-checkout":
        return <StripeCheckout 
          planType={viewParams?.planType || 'premium'} 
          onNavigate={handleNavigate}
          onSuccess={() => handleNavigate('dashboard')}
          onCancel={() => handleNavigate('subscription')}
        />;
      case "demo-scheduler":
        return <DemoScheduler 
          onNavigate={handleNavigate}
          onSuccess={() => handleNavigate('dashboard')}
          onCancel={() => handleNavigate('subscription')}
        />;
      case "dau-generator":
        return <DAUGenerator 
          onNavigate={handleNavigate}
          shipmentId={viewParams?.shipmentId}
        />;
      case "dau-history":
        return <DAUHistory onNavigate={handleNavigate} />;
      case "intelligent-alerts":
        return <IntelligentAlertsCenter onNavigate={handleNavigate} />;
      case "faq":
        return <ComprehensiveFAQ onNavigate={handleNavigate} category={viewParams?.category} searchQuery={viewParams?.search} />;
      case "direct-chat":
        return <DirectChatSupport onNavigate={handleNavigate} initialTopic={viewParams?.topic} />;
      case "about":
        return <AboutPage onNavigate={handleNavigate} />;
      case "team":
        return <TeamPage onNavigate={handleNavigate} />;
      case "careers":
        return <CareersPage onNavigate={handleNavigate} />;
      case "press":
        return <PressPage onNavigate={handleNavigate} />;
      case "partners":
        return <PartnersPage onNavigate={handleNavigate} />;
      case "features":
        return <FeaturesPage onNavigate={handleNavigate} />;
      case "api":
        return <APIPage onNavigate={handleNavigate} />;
      case "integrations":
        return <IntegrationsPage onNavigate={handleNavigate} />;
      case "updates":
        return <UpdatesPage onNavigate={handleNavigate} />;
      case "tax-compliance":
        return <TaxComplianceCenter onNavigate={handleNavigate} />;
      case "subscription-management":
        return <SubscriptionManagement onNavigate={handleNavigate} />;
      case "billing-history":
        return <BillingHistory onNavigate={handleNavigate} />;
      case "stripe-webhooks":
        return <StripeWebhooks onNavigate={handleNavigate} />;

      default:
        return <EnhancedHomepage onNavigate={handleNavigate} />;
    }
  };

  const showHeaderAndFooter = currentView !== "homepage" && currentView !== "login" && currentView !== "register" && currentView !== "terms" && currentView !== "privacy" && currentView !== "legal" && currentView !== "documentation" && currentView !== "guides" && currentView !== "technical-support" && currentView !== "platform-status" && currentView !== "direct-chat" && currentView !== "phone-support" && currentView !== "email-support" && currentView !== "stripe-checkout" && currentView !== "demo-scheduler" && currentView !== "about" && currentView !== "team" && currentView !== "careers" && currentView !== "press" && currentView !== "partners" && currentView !== "features" && currentView !== "api" && currentView !== "integrations" && currentView !== "updates";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center gap-3 mb-6">
            <Package className="h-10 w-10 text-[#1E40AF]" />
            <span className="text-2xl font-bold text-gray-900">hubdispo.be</span>
          </div>
          <div className="w-16 h-16 border-4 border-[#1E40AF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement de votre plateforme logistique...</p>
          <p className="text-sm text-gray-500 mt-2">Optimisation des routes et consolidation en cours</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeaderAndFooter && <Header currentView={currentView} onNavigate={handleNavigate} onShowChat={handleShowChat} />}
      {showHeaderAndFooter && <SmartBreadcrumb currentView={currentView} onNavigate={handleNavigate} params={viewParams} />}
      <main>
        <PageTransition 
          transitionKey={currentView} 
          direction={currentView === 'homepage' ? 'fade' : 'up'}
        >
          {renderCurrentView()}
        </PageTransition>
      </main>
      {showHeaderAndFooter && <Footer onNavigate={handleNavigate} />}
      
      {/* Chat en direct */}
      {showLiveChat && (
        <LiveChat
          onClose={handleCloseChat}
          onMinimize={handleMinimizeChat}
          isMinimized={isChatMinimized}
        />
      )}
      
      {/* Boutons flottants */}
      {showHeaderAndFooter && (
        <>
          {/* FAQ flottante */}
          <FloatingFAQButton onNavigate={handleNavigate} />
          
          {/* Bouton de chat flottant quand le chat n'est pas affiché */}
          {!showLiveChat && (
            <div className="fixed bottom-6 right-6 z-50">
              <button
                onClick={handleShowChat}
                className="w-14 h-14 bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                title="Chat support"
              >
                💬
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

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
}