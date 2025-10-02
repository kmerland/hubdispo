// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Package, TrendingUp, Clock, AlertTriangle, CheckCircle, 
  Eye, ExternalLink, Copy, Download, ChevronRight
} from 'lucide-react';

// Carte interactive avec états visuels
export function InteractiveShipmentCard({ 
  shipment, 
  onView, 
  onTrack 
}: {
  shipment: any;
  onView: () => void;
  onTrack: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: string) => {
    const colors = {
      delivered: 'bg-[#10B981] text-white',
      in_transit: 'bg-[#1E40AF] text-white',
      customs: 'bg-orange-500 text-white',
      delayed: 'bg-red-500 text-white',
      consolidating: 'bg-purple-500 text-white',
      pending: 'bg-gray-500 text-white'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500 text-white';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-3 w-3" />;
      case 'in_transit': return <Package className="h-3 w-3" />;
      case 'customs': return <AlertTriangle className="h-3 w-3" />;
      case 'delayed': return <Clock className="h-3 w-3" />;
      default: return <Package className="h-3 w-3" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg cursor-pointer"
        onClick={() => setShowActions(!showActions)}
      >
        {/* Indicateur de statut coloré */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${getStatusColor(shipment.status).split(' ')[0]}`} />
        
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Package className="h-4 w-4 text-[#1E40AF]" />
              </motion.div>
              <div>
                <CardTitle className="text-sm font-medium">{shipment.trackingNumber}</CardTitle>
                <p className="text-xs text-gray-500">{shipment.destination.city}</p>
              </div>
            </div>
            <Badge className={`${getStatusColor(shipment.status)} text-xs flex items-center gap-1`}>
              {getStatusIcon(shipment.status)}
              {shipment.status === 'delivered' ? 'Livré' :
               shipment.status === 'in_transit' ? 'En transit' :
               shipment.status === 'customs' ? 'Douanes' :
               shipment.status === 'delayed' ? 'Retardé' :
               shipment.status === 'consolidating' ? 'Groupage' : 'En attente'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>{shipment.weight}kg</span>
              <span>€{shipment.shippingCost}</span>
            </div>
            
            {/* Barre de progression pour les envois en transit */}
            {shipment.status === 'in_transit' && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <Progress value={65} className="h-1" />
                <p className="text-xs text-gray-500 mt-1">65% du trajet</p>
              </motion.div>
            )}

            {/* Actions rapides */}
            <AnimatePresence>
              {(showActions || isHovered) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-2 pt-2 border-t"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs h-7"
                    onClick={(e) => {
                      e.stopPropagation();
                      onView();
                    }}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Voir
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 text-xs h-7 bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTrack();
                    }}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Suivre
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Carte de consolidation interactive
export function InteractiveConsolidationCard({ 
  group, 
  onJoin, 
  onView 
}: {
  group: any;
  onJoin: () => void;
  onView: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const fillPercentage = Math.round((group.currentLoad.weight / group.maxCapacity.weight) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg">
        {/* Indicateur de remplissage */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1E40AF] to-[#10B981]"
            initial={{ width: 0 }}
            animate={{ width: `${fillPercentage}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium">{group.destination.city}</CardTitle>
              <p className="text-xs text-gray-500">{group.participants} participants</p>
            </div>
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <Badge 
                className={`${
                  group.status === 'open' ? 'bg-[#10B981]' : 
                  group.status === 'full' ? 'bg-orange-500' : 
                  'bg-gray-500'
                } text-white text-xs`}
              >
                {group.status === 'open' ? 'Ouvert' : 
                 group.status === 'full' ? 'Complet' : 
                 'Fermé'}
              </Badge>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Progression visuelle */}
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Capacité utilisée</span>
                <span>{fillPercentage}%</span>
              </div>
              <Progress value={fillPercentage} className="h-2" />
            </div>

            {/* Économies estimées */}
            <motion.div
              className="bg-[#10B981]/10 p-2 rounded-lg"
              whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}
            >
              <p className="text-xs text-[#10B981] font-medium">
                Économies estimées : €{group.estimatedSavings}
              </p>
            </motion.div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs h-7"
                onClick={onView}
              >
                Détails
              </Button>
              {group.status === 'open' && (
                <motion.div className="flex-1">
                  <Button
                    size="sm"
                    className="w-full text-xs h-7 bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                    onClick={onJoin}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Rejoindre
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Alerte interactive avec actions
export function InteractiveAlertCard({ 
  alert, 
  onAction, 
  onDismiss 
}: {
  alert: any;
  onAction: () => void;
  onDismiss: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-orange-500 bg-orange-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'info': return <TrendingUp className="h-4 w-4 text-blue-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Card className={`${getSeverityColor(alert.severity)} border-l-4 transition-all duration-300`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {getSeverityIcon(alert.severity)}
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <button
                className="text-left w-full"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <h4 className="font-medium text-sm mb-1">{alert.title}</h4>
                <p className="text-xs text-gray-600 line-clamp-2">{alert.description}</p>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 space-y-2"
                  >
                    {alert.suggestions && (
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-1">Actions recommandées :</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {alert.suggestions.map((suggestion: string, index: number) => (
                            <li key={index} className="flex items-start gap-1">
                              <ChevronRight className="h-3 w-3 mt-0.5 text-gray-400 flex-shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {alert.estimatedSavings && (
                      <div className="bg-[#10B981]/10 p-2 rounded text-xs text-[#10B981] font-medium">
                        💰 Économie potentielle : €{alert.estimatedSavings}
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="text-xs h-7 bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                        onClick={onAction}
                      >
                        Résoudre
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7"
                        onClick={onDismiss}
                      >
                        Reporter
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Indicateur de statut temps réel animé
export function LiveStatusIndicator({ 
  status, 
  label 
}: {
  status: 'online' | 'offline' | 'warning';
  label: string;
}) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'online':
        return {
          color: '#10B981',
          animation: { scale: [1, 1.2, 1] },
          duration: 2
        };
      case 'warning':
        return {
          color: '#F59E0B',
          animation: { scale: [1, 1.1, 1] },
          duration: 1.5
        };
      case 'offline':
        return {
          color: '#EF4444',
          animation: { opacity: [1, 0.5, 1] },
          duration: 1
        };
      default:
        return {
          color: '#6B7280',
          animation: {},
          duration: 1
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: config.color }}
        animate={config.animation}
        transition={{ 
          duration: config.duration, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  );
}