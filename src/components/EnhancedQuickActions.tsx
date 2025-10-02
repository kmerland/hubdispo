// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Plus, Package, Map, Users, Brain, HelpCircle, 
  TrendingUp, Search, Calendar, Settings, 
  FileText, CheckCircle, Clock, Zap
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  badge?: string;
  shortcut?: string;
  isNew?: boolean;
  onClick: () => void;
}

interface EnhancedQuickActionsProps {
  onNavigate: (view: string, params?: any) => void;
}

export default function EnhancedQuickActions({ onNavigate }: EnhancedQuickActionsProps) {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [expandedView, setExpandedView] = useState(false);

  const quickActions: QuickAction[] = [
    {
      id: 'new-shipment',
      title: 'Nouvel envoi',
      description: 'Créer un nouvel envoi international',
      icon: Plus,
      color: 'text-white',
      bgColor: 'bg-[#1E40AF]',
      shortcut: 'Ctrl+N',
      onClick: () => onNavigate('new-shipment')
    },
    {
      id: 'track',
      title: 'Suivi envois',
      description: 'Consulter tous vos envois',
      icon: Package,
      color: 'text-white',
      bgColor: 'bg-[#10B981]',
      badge: '12',
      onClick: () => onNavigate('shipments')
    },
    {
      id: 'consolidation',
      title: 'Groupage',
      description: 'Rejoindre une consolidation',
      icon: Users,
      color: 'text-white',
      bgColor: 'bg-purple-500',
      badge: '3 ouverts',
      onClick: () => onNavigate('consolidation')
    },
    {
      id: 'map',
      title: 'Carte des routes',
      description: 'Visualiser vos envois',
      icon: Map,
      color: 'text-white',
      bgColor: 'bg-blue-500',
      onClick: () => onNavigate('map')
    },
    {
      id: 'ai-alerts',
      title: 'Alertes IA',
      description: 'Optimisations intelligentes',
      icon: Brain,
      color: 'text-white',
      bgColor: 'bg-orange-500',
      badge: '5',
      isNew: true,
      onClick: () => onNavigate('intelligent-alerts')
    },
    {
      id: 'faq',
      title: 'FAQ',
      description: 'Questions fréquentes',
      icon: HelpCircle,
      color: 'text-white',
      bgColor: 'bg-gray-600',
      onClick: () => onNavigate('faq')
    }
  ];

  const extendedActions: QuickAction[] = [
    {
      id: 'reports',
      title: 'Rapports',
      description: 'Analytics et performance',
      icon: TrendingUp,
      color: 'text-white',
      bgColor: 'bg-indigo-500',
      onClick: () => onNavigate('reports')
    },
    {
      id: 'search',
      title: 'Recherche',
      description: 'Rechercher dans vos données',
      icon: Search,
      color: 'text-white',
      bgColor: 'bg-slate-500',
      shortcut: 'Ctrl+K',
      onClick: () => onNavigate('search')
    },
    {
      id: 'calendar',
      title: 'Planification',
      description: 'Calendrier des envois',
      icon: Calendar,
      color: 'text-white',
      bgColor: 'bg-teal-500',
      onClick: () => onNavigate('calendar')
    },
    {
      id: 'settings',
      title: 'Paramètres',
      description: 'Configuration compte',
      icon: Settings,
      color: 'text-white',
      bgColor: 'bg-gray-700',
      onClick: () => onNavigate('settings')
    }
  ];

  const displayedActions = expandedView 
    ? [...quickActions, ...extendedActions] 
    : quickActions;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-gray-900">Actions rapides</h3>
            <p className="text-sm text-gray-500">Accès direct à vos fonctions principales</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setExpandedView(!expandedView)}
            className="text-xs"
          >
            {expandedView ? 'Moins' : 'Plus'}
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {displayedActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ 
                  delay: index * 0.05, 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25 
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredAction(action.id)}
                onHoverEnd={() => setHoveredAction(null)}
              >
                <button
                  onClick={action.onClick}
                  className="w-full p-4 rounded-lg border-2 border-transparent hover:border-[#1E40AF]/20 transition-all duration-300 group relative overflow-hidden"
                  style={{ 
                    background: hoveredAction === action.id 
                      ? `linear-gradient(135deg, ${action.bgColor.replace('bg-', '').replace('[', '').replace(']', '')}, ${action.bgColor.replace('bg-', '').replace('[', '').replace(']', '')}dd)` 
                      : action.bgColor
                  }}
                >
                  {/* Fond animé au hover */}
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: hoveredAction === action.id ? 1 : 0,
                      opacity: hoveredAction === action.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Contenu de la carte */}
                  <div className="relative z-10 text-left">
                    <div className="flex items-start justify-between mb-3">
                      <motion.div
                        animate={{ 
                          rotate: hoveredAction === action.id ? 5 : 0,
                          scale: hoveredAction === action.id ? 1.1 : 1
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <action.icon className={`h-6 w-6 ${action.color}`} />
                      </motion.div>
                      
                      <div className="flex flex-col items-end gap-1">
                        {action.isNew && (
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">
                              <Zap className="h-2 w-2 mr-1" />
                              NEW
                            </Badge>
                          </motion.div>
                        )}
                        {action.badge && !action.isNew && (
                          <Badge className="bg-white/20 text-white text-xs px-2 py-0.5">
                            {action.badge}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <h4 className={`font-medium text-sm mb-1 ${action.color}`}>
                      {action.title}
                    </h4>
                    <p className={`text-xs opacity-90 ${action.color}`}>
                      {action.description}
                    </p>

                    {action.shortcut && (
                      <motion.div
                        className="mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredAction === action.id ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-xs bg-white/20 px-2 py-1 rounded text-white">
                          {action.shortcut}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Effet de brillance au hover */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: hoveredAction === action.id ? '100%' : '-100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Indicateur de performance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-gradient-to-r from-[#10B981]/10 to-[#1E40AF]/10 rounded-lg border border-[#10B981]/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <CheckCircle className="h-5 w-5 text-[#10B981]" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-gray-900">Système opérationnel</p>
                <p className="text-xs text-gray-600">Tous les services fonctionnent normalement</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-[#10B981] rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs text-gray-600">Temps réel</span>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}