// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle, Package, Truck, Clock } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'shipment' | 'consolidation' | 'ai';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  persistent?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 5000
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast après la durée spécifiée (sauf si persistent)
    if (!toast.persistent) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, newToast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAll }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast.persistent && toast.duration) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (toast.duration! / 100));
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [toast.duration, toast.persistent]);

  const getToastConfig = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-[#10B981]',
          textColor: 'text-white',
          icon: CheckCircle,
          progressColor: 'bg-white/30'
        };
      case 'error':
        return {
          bgColor: 'bg-red-500',
          textColor: 'text-white',
          icon: AlertCircle,
          progressColor: 'bg-white/30'
        };
      case 'warning':
        return {
          bgColor: 'bg-orange-500',
          textColor: 'text-white',
          icon: AlertTriangle,
          progressColor: 'bg-white/30'
        };
      case 'info':
        return {
          bgColor: 'bg-[#1E40AF]',
          textColor: 'text-white',
          icon: Info,
          progressColor: 'bg-white/30'
        };
      case 'shipment':
        return {
          bgColor: 'bg-blue-600',
          textColor: 'text-white',
          icon: Package,
          progressColor: 'bg-white/30'
        };
      case 'consolidation':
        return {
          bgColor: 'bg-purple-600',
          textColor: 'text-white',
          icon: Truck,
          progressColor: 'bg-white/30'
        };
      case 'ai':
        return {
          bgColor: 'bg-gradient-to-r from-orange-500 to-pink-500',
          textColor: 'text-white',
          icon: AlertTriangle,
          progressColor: 'bg-white/30'
        };
      default:
        return {
          bgColor: 'bg-gray-600',
          textColor: 'text-white',
          icon: Info,
          progressColor: 'bg-white/30'
        };
    }
  };

  const config = getToastConfig(toast.type);
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ 
        opacity: 0, 
        x: 300, 
        scale: 0.9,
        transition: { duration: 0.2 }
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-lg shadow-lg backdrop-blur-sm ${config.bgColor} ${config.textColor} max-w-sm`}
    >
      {/* Barre de progression */}
      {!toast.persistent && (
        <div className="absolute bottom-0 left-0 h-1 bg-black/20 w-full">
          <motion.div
            className={`h-full ${config.progressColor}`}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icône animée */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 25 }}
          >
            <IconComponent className="h-5 w-5 flex-shrink-0 mt-0.5" />
          </motion.div>

          {/* Contenu */}
          <div className="flex-1 min-w-0">
            <motion.h4
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-medium text-sm mb-1"
            >
              {toast.title}
            </motion.h4>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm opacity-90 leading-relaxed"
            >
              {toast.message}
            </motion.p>

            {/* Action button */}
            {toast.action && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-3"
              >
                <button
                  onClick={toast.action.onClick}
                  className="text-sm font-medium underline hover:no-underline transition-all"
                >
                  {toast.action.label}
                </button>
              </motion.div>
            )}
          </div>

          {/* Bouton de fermeture */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Hook pour des toasts prédéfinis avec des messages belges réalistes
export function useLogisticsToasts() {
  const { addToast } = useToast();

  return {
    shipmentCreated: (trackingNumber: string) => addToast({
      type: 'shipment',
      title: 'Envoi créé avec succès',
      message: `Votre envoi ${trackingNumber} a été enregistré et sera traité sous 24h.`,
      action: {
        label: 'Suivre l\'envoi',
        onClick: () => {/* Navigation vers suivi */}
      }
    }),

    consolidationJoined: (city: string, savings: number) => addToast({
      type: 'consolidation',
      title: 'Groupage rejoint',
      message: `Vous avez rejoint le groupage vers ${city}. Économie estimée : €${savings}`,
      action: {
        label: 'Voir les détails',
        onClick: () => {/* Navigation vers consolidation */}
      }
    }),

    customsAlert: (shipmentId: string) => addToast({
      type: 'warning',
      title: 'Attention douanière',
      message: `L'envoi ${shipmentId} nécessite des documents supplémentaires pour le dédouanement.`,
      action: {
        label: 'Compléter',
        onClick: () => {/* Navigation vers customs */}
      },
      persistent: true
    }),

    aiRecommendation: (savings: number) => addToast({
      type: 'ai',
      title: 'Opportunité détectée par l\'IA',
      message: `Notre IA a identifié une optimisation qui pourrait vous faire économiser €${savings}.`,
      action: {
        label: 'Voir l\'optimisation',
        onClick: () => {/* Navigation vers AI */}
      }
    }),

    systemStatus: (status: 'online' | 'maintenance' | 'issue') => {
      const messages = {
        online: { title: 'Système opérationnel', message: 'Tous les services fonctionnent normalement.' },
        maintenance: { title: 'Maintenance programmée', message: 'Maintenance prévue ce soir de 23h à 2h.' },
        issue: { title: 'Incident détecté', message: 'Nos équipes travaillent à résoudre le problème.' }
      };
      
      addToast({
        type: status === 'online' ? 'success' : status === 'maintenance' ? 'info' : 'error',
        title: messages[status].title,
        message: messages[status].message,
        duration: status === 'online' ? 3000 : 8000
      });
    }
  };
}