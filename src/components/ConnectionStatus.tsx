// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { Badge } from "./ui/badge";

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionType, setConnectionType] = useState<string>("unknown");

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Détection du type de connexion si disponible
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      setConnectionType(connection?.effectiveType || 'unknown');
      
      const updateConnectionType = () => {
        setConnectionType(connection?.effectiveType || 'unknown');
      };
      
      connection?.addEventListener('change', updateConnectionType);
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        connection?.removeEventListener('change', updateConnectionType);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getConnectionQuality = () => {
    if (!isOnline) return { color: "bg-red-500", text: "Hors ligne" };
    
    switch (connectionType) {
      case 'slow-2g':
      case '2g':
        return { color: "bg-red-500", text: "Connexion lente" };
      case '3g':
        return { color: "bg-yellow-500", text: "Connexion modérée" };
      case '4g':
      case '5g':
        return { color: "bg-green-500", text: "Connexion rapide" };
      default:
        return { color: "bg-green-500", text: "En ligne" };
    }
  };

  const status = getConnectionQuality();

  if (!isOnline) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <WifiOff className="h-4 w-4 text-red-500" />
          <Badge className="bg-red-100 text-red-800 text-xs">
            Hors ligne
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden xl:flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Wifi className="h-4 w-4 text-green-500" />
        <div className={`w-2 h-2 rounded-full ${status.color} animate-pulse`}></div>
      </div>
    </div>
  );
}