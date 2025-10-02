// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, Zap, Clock, Users, Package, Truck, Euro, Shield, Activity, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

// Interface pour les données en temps réel
interface RealTimeData {
  activeShipments: number;
  consolidationRate: number;
  customsProcessing: number;
  avgDeliveryTime: number;
  monthlyRevenue: number;
  customerSatisfaction: number;
  aiPerformance: number;
  costSavings: number;
}

// Indicateur de performance en temps réel
export function PerformanceIndicator({ 
  title, 
  value, 
  unit = "", 
  trend, 
  icon: Icon, 
  color = "blue",
  isPercentage = false,
  target,
  onClick 
}: {
  title: string;
  value: number;
  unit?: string;
  trend?: number;
  icon: any;
  color?: string;
  isPercentage?: boolean;
  target?: number;
  onClick?: () => void;
}) {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const colors = {
    blue: "text-blue-600 bg-blue-50 border-blue-200",
    green: "text-green-600 bg-green-50 border-green-200",
    orange: "text-orange-600 bg-orange-50 border-orange-200",
    purple: "text-purple-600 bg-purple-50 border-purple-200",
    red: "text-red-600 bg-red-50 border-red-200"
  };

  const getTrendIcon = () => {
    if (!trend) return <Minus className="h-3 w-3" />;
    if (trend > 0) return <TrendingUp className="h-3 w-3 text-green-600" />;
    return <TrendingDown className="h-3 w-3 text-red-600" />;
  };

  const getTrendColor = () => {
    if (!trend) return "text-gray-500";
    return trend > 0 ? "text-green-600" : "text-red-600";
  };

  return (
    <Card 
      className={`border-l-4 ${colors[color]} hover:shadow-lg transition-all duration-300 cursor-pointer`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Icon className={`h-5 w-5 ${colors[color].split(' ')[0]}`} />
          <div className="flex items-center justify-center w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
        
        <div className="space-y-1">
          <p className="text-2xl font-bold text-gray-900 transition-all duration-1000">
            {isPercentage ? `${animatedValue.toFixed(1)}%` : `${animatedValue.toLocaleString('fr-BE')}${unit}`}
          </p>
          <p className="text-sm text-gray-600">{title}</p>
          
          {trend !== undefined && (
            <div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{trend > 0 ? '+' : ''}{trend}%</span>
              <span className="text-gray-500">vs hier</span>
            </div>
          )}
          
          {target && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Objectif</span>
                <span>{target}{isPercentage ? '%' : unit}</span>
              </div>
              <Progress 
                value={Math.min((value / target) * 100, 100)} 
                className="h-1" 
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Tableau de bord des métriques en temps réel
export function RealTimeDashboard({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const [data, setData] = useState<RealTimeData>({
    activeShipments: 47,
    consolidationRate: 94.2,
    customsProcessing: 3,
    avgDeliveryTime: 3.2,
    monthlyRevenue: 18547,
    customerSatisfaction: 98.5,
    aiPerformance: 99.1,
    costSavings: 2847
  });

  // Simulation des mises à jour en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        activeShipments: prev.activeShipments + Math.floor(Math.random() * 3) - 1,
        consolidationRate: Math.max(90, Math.min(100, prev.consolidationRate + (Math.random() - 0.5) * 2)),
        customsProcessing: Math.max(0, prev.customsProcessing + Math.floor(Math.random() * 3) - 1),
        avgDeliveryTime: Math.max(2, Math.min(5, prev.avgDeliveryTime + (Math.random() - 0.5) * 0.2)),
        monthlyRevenue: prev.monthlyRevenue + Math.floor(Math.random() * 200) - 100,
        customerSatisfaction: Math.max(95, Math.min(100, prev.customerSatisfaction + (Math.random() - 0.5) * 0.5)),
        aiPerformance: Math.max(95, Math.min(100, prev.aiPerformance + (Math.random() - 0.5) * 0.3)),
        costSavings: prev.costSavings + Math.floor(Math.random() * 100) - 50
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <PerformanceIndicator
        title="Envois actifs"
        value={data.activeShipments}
        trend={2.3}
        icon={Package}
        color="blue"
        target={60}
        onClick={() => onNavigate?.('shipments')}
      />
      
      <PerformanceIndicator
        title="Taux consolidation"
        value={data.consolidationRate}
        trend={1.2}
        icon={Truck}
        color="orange"
        isPercentage={true}
        target={95}
        onClick={() => onNavigate?.('consolidation')}
      />
      
      <PerformanceIndicator
        title="En douane"
        value={data.customsProcessing}
        trend={-15.7}
        icon={Shield}
        color="green"
        onClick={() => onNavigate?.('customs')}
      />
      
      <PerformanceIndicator
        title="Délai moyen"
        value={data.avgDeliveryTime}
        unit=" jours"
        trend={-8.2}
        icon={Clock}
        color="purple"
        target={3}
        onClick={() => onNavigate?.('reports')}
      />
      
      <PerformanceIndicator
        title="Revenus mensuel"
        value={data.monthlyRevenue}
        unit="€"
        trend={12.4}
        icon={Euro}
        color="green"
        target={25000}
        onClick={() => onNavigate?.('subscription')}
      />
      
      <PerformanceIndicator
        title="Satisfaction client"
        value={data.customerSatisfaction}
        trend={0.3}
        icon={Users}
        color="blue"
        isPercentage={true}
        target={99}
        onClick={() => onNavigate?.('reports')}
      />
      
      <PerformanceIndicator
        title="Performance IA"
        value={data.aiPerformance}
        trend={0.1}
        icon={Zap}
        color="orange"
        isPercentage={true}
        target={99.5}
        onClick={() => onNavigate?.('customs')}
      />
      
      <PerformanceIndicator
        title="Économies réalisées"
        value={data.costSavings}
        unit="€"
        trend={8.7}
        icon={TrendingUp}
        color="green"
        target={4000}
        onClick={() => onNavigate?.('reports')}
      />
    </div>
  );
}

// Statut du système en temps réel
export function SystemStatus() {
  const [status, setStatus] = useState({
    api: { status: 'operational', responseTime: 45 },
    consolidation: { status: 'operational', processing: 12 },
    customs: { status: 'operational', automated: 99.1 },
    notifications: { status: 'operational', pending: 3 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        api: {
          ...prev.api,
          responseTime: Math.max(20, Math.min(200, prev.api.responseTime + Math.floor(Math.random() * 20) - 10))
        },
        consolidation: {
          ...prev.consolidation,
          processing: Math.max(0, prev.consolidation.processing + Math.floor(Math.random() * 3) - 1)
        },
        customs: {
          ...prev.customs,
          automated: Math.max(95, Math.min(100, prev.customs.automated + (Math.random() - 0.5) * 0.2))
        },
        notifications: {
          ...prev.notifications,
          pending: Math.max(0, prev.notifications.pending + Math.floor(Math.random() * 2) - 1)
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (serviceStatus: string) => {
    switch (serviceStatus) {
      case 'operational':
        return <Badge className="bg-green-100 text-green-700">Opérationnel</Badge>;
      case 'degraded':
        return <Badge className="bg-amber-100 text-amber-700">Dégradé</Badge>;
      case 'down':
        return <Badge className="bg-red-100 text-red-700">Indisponible</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-[#1E40AF]" />
          Statut système en temps réel
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">API HubDispo</p>
              <p className="text-sm text-gray-600">{status.api.responseTime}ms</p>
            </div>
            {getStatusBadge(status.api.status)}
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Consolidation</p>
              <p className="text-sm text-gray-600">{status.consolidation.processing} en cours</p>
            </div>
            {getStatusBadge(status.consolidation.status)}
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Douane IA</p>
              <p className="text-sm text-gray-600">{status.customs.automated.toFixed(1)}% auto</p>
            </div>
            {getStatusBadge(status.customs.status)}
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-gray-600">{status.notifications.pending} en attente</p>
            </div>
            {getStatusBadge(status.notifications.status)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Indicateur de charge du système
export function SystemLoadIndicator() {
  const [load, setLoad] = useState({
    cpu: 23,
    memory: 45,
    network: 67,
    storage: 12
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(prev => ({
        cpu: Math.max(0, Math.min(100, prev.cpu + Math.floor(Math.random() * 20) - 10)),
        memory: Math.max(0, Math.min(100, prev.memory + Math.floor(Math.random() * 15) - 7)),
        network: Math.max(0, Math.min(100, prev.network + Math.floor(Math.random() * 25) - 12)),
        storage: Math.max(0, Math.min(100, prev.storage + Math.floor(Math.random() * 5) - 2))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getLoadColor = (value: number) => {
    if (value < 30) return "text-green-600";
    if (value < 70) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <Card className="border-l-4 border-l-[#1E40AF]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5 text-[#1E40AF]" />
          Charge système
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>CPU</span>
            <span className={getLoadColor(load.cpu)}>{load.cpu}%</span>
          </div>
          <Progress value={load.cpu} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Mémoire</span>
            <span className={getLoadColor(load.memory)}>{load.memory}%</span>
          </div>
          <Progress value={load.memory} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Réseau</span>
            <span className={getLoadColor(load.network)}>{load.network}%</span>
          </div>
          <Progress value={load.network} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Stockage</span>
            <span className={getLoadColor(load.storage)}>{load.storage}%</span>
          </div>
          <Progress value={load.storage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}