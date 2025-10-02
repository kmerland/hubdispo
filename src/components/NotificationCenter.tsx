// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from "react";
import { Bell, Check, X, AlertTriangle, Package, Truck, Info, Settings, Filter, Download, Archive, Search, RefreshCw, Volume2, VolumeX, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import ActionBar from "./ActionBar";

interface NotificationCenterProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function NotificationCenter({ onNavigate }: NotificationCenterProps) {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showArchived, setShowArchived] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  
  // État vide au démarrage - les notifications seront chargées depuis le système
  const [notificationList, setNotificationList] = useState<any[]>([]);
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    push: true,
    delivery: true,
    customs: true,
    consolidation: false,
    system: true,
    browser: true,
    sound: true,
    vibration: false,
    quietHours: false,
    quietStart: "22:00",
    quietEnd: "08:00"
  });
  const [preferencesChanged, setPreferencesChanged] = useState(false);

  // Simulation du chargement de notifications depuis l'API
  useEffect(() => {
    const loadNotifications = async () => {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Pour l'instant, pas de notifications par défaut
      // Les notifications apparaîtront quand des événements se produisent
      setNotificationList([]);
    };

    loadNotifications();
  }, []);

  // Auto-refresh des notifications
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setLastRefresh(new Date());
      // Ici on ferait un appel API pour récupérer les nouvelles notifications
    }, 30000); // Refresh toutes les 30 secondes

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Simulation d'arrivée de nouvelles notifications (pour démonstration)
  const simulateNewNotification = () => {
    const newNotification = {
      id: Date.now(),
      type: "info",
      category: "system",
      title: "Notification de test",
      message: "Ceci est une notification de démonstration du système",
      time: "À l'instant",
      read: false,
      priority: "normal",
      timestamp: new Date().toISOString()
    };

    setNotificationList(prev => [newNotification, ...prev]);
    
    if (soundEnabled) {
      // Simulation du son de notification
      console.log("🔔 Son de notification");
    }
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  const getIcon = (type: string, category: string) => {
    if (category === "delivery") return Package;
    if (category === "customs") return AlertTriangle;
    if (category === "consolidation") return Truck;
    return Info;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success": return "text-green-600 bg-green-100";
      case "warning": return "text-amber-600 bg-amber-100";
      case "error": return "text-red-600 bg-red-100";
      default: return "text-blue-600 bg-blue-100";
    }
  };

  const markAsRead = (id: number) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationList(prev => 
      prev.filter(n => n.id !== id)
    );
  };

  const updatePreference = (key: string, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    setPreferencesChanged(true);
  };

  const filteredNotifications = notificationList.filter(n => {
    // Filtre par recherche
    const matchesSearch = searchQuery === "" || 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtre par catégorie/statut
    let matchesFilter = true;
    if (filter === "unread") matchesFilter = !n.read;
    else if (filter === "high") matchesFilter = n.priority === "high";
    else if (filter !== "all") matchesFilter = n.category === filter;
    
    // Filtre archives
    const matchesArchive = showArchived || !n.archived;
    
    return matchesSearch && matchesFilter && matchesArchive;
  }).sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.timestamp || 0).getTime() - new Date(b.timestamp || 0).getTime();
      case "priority":
        const priorityOrder = { high: 3, normal: 2, low: 1 };
        return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
      case "category":
        return a.category.localeCompare(b.category);
      default: // newest
        return new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime();
    }
  });

  const archiveNotification = (id: number) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, archived: true, read: true } : n)
    );
  };

  const archiveSelected = () => {
    const selectedIds = notificationList.filter(n => n.selected).map(n => n.id);
    setNotificationList(prev => 
      prev.map(n => selectedIds.includes(n.id) ? { ...n, archived: true, read: true, selected: false } : n)
    );
  };

  const markSelectedAsRead = () => {
    const selectedIds = notificationList.filter(n => n.selected).map(n => n.id);
    setNotificationList(prev => 
      prev.map(n => selectedIds.includes(n.id) ? { ...n, read: true, selected: false } : n)
    );
  };

  const toggleSelection = (id: number) => {
    setNotificationList(prev => 
      prev.map(n => n.id === id ? { ...n, selected: !n.selected } : n)
    );
  };

  const toggleSelectAll = () => {
    const allSelected = filteredNotifications.every(n => n.selected);
    setNotificationList(prev => 
      prev.map(n => ({ ...n, selected: !allSelected }))
    );
  };

  const exportNotifications = () => {
    const dataStr = JSON.stringify(filteredNotifications, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `notifications_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const refreshNotifications = async () => {
    setLastRefresh(new Date());
    // Ici on ferait un appel API pour récupérer les dernières notifications
    console.log("🔄 Actualisation des notifications");
  };

  const selectedCount = notificationList.filter(n => n.selected).length;

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.category === "delivery") {
      const regex = /BE-\d{4}-\d{3}/;
      const shipmentId = notification.message.match(regex)?.[0] || "BE-2024-123";
      onNavigate && onNavigate("tracking", { shipmentId });
    } else if (notification.category === "customs") {
      onNavigate && onNavigate("customs");
    } else if (notification.category === "consolidation") {
      onNavigate && onNavigate("consolidation");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 space-y-6">
      {/* Action Bar */}
      <ActionBar 
        onNavigate={onNavigate!}
        currentView="notifications"
        showBackButton={true}
        backTo="dashboard"
        customActions={[
          {
            label: "Paramètres notifications",
            action: () => {
              // Changer vers l'onglet préférences
              const preferencesTab = document.querySelector('[data-value="preferences"]') as HTMLElement;
              if (preferencesTab) {
                preferencesTab.click();
              }
            },
            icon: Settings,
            variant: "outline"
          },
          {
            label: "Messages",
            action: () => onNavigate && onNavigate("messages"),
            icon: Bell,
            variant: "outline"
          }
        ]}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Centre de notifications</h1>
          <p className="text-gray-600 mt-1">
            Gérez vos notifications et préférences de communication
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">
              Dernière synchro: {lastRefresh.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <Badge variant="secondary" className="bg-[#1E40AF] text-white">
            {unreadCount} non lues
          </Badge>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={refreshNotifications}
              title="Actualiser"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Désactiver le son" : "Activer le son"}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
              <Check className="h-4 w-4 mr-2" />
              Tout marquer comme lu
            </Button>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      {notificationList.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{notificationList.length}</p>
                </div>
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Non lues</p>
                  <p className="text-2xl font-bold text-[#1E40AF]">{unreadCount}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-[#1E40AF]" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Urgentes</p>
                  <p className="text-2xl font-bold text-red-600">
                    {notificationList.filter(n => n.priority === 'high').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Archivées</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {notificationList.filter(n => n.archived).length}
                  </p>
                </div>
                <Archive className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Contrôles avancés */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Recherche */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher dans les notifications..."
                      className="w-full pl-10 pr-4 py-2 border rounded-md"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Tri */}
                <select 
                  className="border rounded-md px-3 py-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Plus récentes</option>
                  <option value="oldest">Plus anciennes</option>
                  <option value="priority">Par priorité</option>
                  <option value="category">Par catégorie</option>
                </select>
                
                {/* Options d'affichage */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowArchived(!showArchived)}
                    className={showArchived ? "bg-gray-100" : ""}
                  >
                    <Archive className="h-4 w-4 mr-1" />
                    Archivées
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportNotifications}
                    disabled={filteredNotifications.length === 0}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
              
              {/* Actions en lot */}
              {selectedCount > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">
                      {selectedCount} notification(s) sélectionnée(s)
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={markSelectedAsRead}>
                        Marquer comme lues
                      </Button>
                      <Button size="sm" variant="outline" onClick={archiveSelected}>
                        Archiver
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Filtres */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  Toutes ({notificationList.length})
                </Button>
                <Button
                  variant={filter === "unread" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("unread")}
                >
                  Non lues ({unreadCount})
                </Button>
                <Button
                  variant={filter === "high" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("high")}
                >
                  Priorité haute
                </Button>
                <Button
                  variant={filter === "delivery" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("delivery")}
                >
                  Livraisons
                </Button>
                <Button
                  variant={filter === "customs" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("customs")}
                >
                  Douane
                </Button>
                <Button
                  variant={filter === "consolidation" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("consolidation")}
                >
                  Consolidation
                </Button>
                {filteredNotifications.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSelectAll}
                    className="ml-auto"
                  >
                    {filteredNotifications.every(n => n.selected) ? "Désélectionner tout" : "Sélectionner tout"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {notificationList.length === 0 ? "Aucune notification" : "Aucune notification correspondante"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {notificationList.length === 0 
                      ? "Vous êtes à jour ! Les notifications apparaîtront ici quand de nouveaux événements se produisent."
                      : searchQuery 
                        ? "Aucune notification ne correspond à votre recherche."
                        : "Aucune notification ne correspond aux filtres sélectionnés."
                    }
                  </p>
                  {notificationList.length === 0 && (
                    <Button 
                      onClick={simulateNewNotification}
                      variant="outline"
                      size="sm"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Tester une notification
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => {
                const IconComponent = getIcon(notification.type, notification.category);
                return (
                  <Card 
                    key={notification.id} 
                    className={`${!notification.read ? 'ring-2 ring-[#1E40AF] ring-opacity-20' : ''} ${notification.selected ? 'bg-blue-50 border-blue-200' : ''} hover:shadow-md transition-all`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Checkbox de sélection */}
                        <input
                          type="checkbox"
                          checked={notification.selected || false}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleSelection(notification.id);
                          }}
                          className="mt-1"
                        />
                        <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div 
                            className="cursor-pointer"
                            onClick={() => handleNotificationClick(notification)}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                    {notification.title}
                                  </h3>
                                  {!notification.read && <div className="w-2 h-2 bg-[#1E40AF] rounded-full" />}
                                  {notification.priority === "high" && (
                                    <Badge variant="destructive" className="text-xs">Urgent</Badge>
                                  )}
                                  {notification.actionRequired && (
                                    <Badge className="bg-amber-100 text-amber-800 text-xs">Action requise</Badge>
                                  )}
                                  {notification.archived && (
                                    <Badge variant="outline" className="text-xs">Archivée</Badge>
                                  )}
                                </div>
                                <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  <span>{notification.time}</span>
                                  <span>•</span>
                                  <span className="capitalize">{notification.category}</span>
                                  {notification.timestamp && (
                                    <>
                                      <span>•</span>
                                      <span>{new Date(notification.timestamp).toLocaleDateString('fr-FR')}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                {!notification.read && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsRead(notification.id);
                                    }}
                                    title="Marquer comme lu"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    archiveNotification(notification.id);
                                  }}
                                  title="Archiver"
                                >
                                  <Archive className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  title="Supprimer"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          {notification.actionRequired && (
                            <div className="mt-3 pt-3 border-t">
                              <Button 
                                size="sm" 
                                className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (notification.category === "customs") {
                                    onNavigate && onNavigate("dau-generator", { shipmentId: "BE-2024-124" });
                                  } else if (notification.category === "delivery") {
                                    onNavigate && onNavigate("tracking", { shipmentId: "BE-2024-125" });
                                  } else {
                                    onNavigate && onNavigate("dashboard");
                                  }
                                  markAsRead(notification.id);
                                }}
                              >
                                Résoudre maintenant
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Communication Channels */}
            <Card>
              <CardHeader>
                <CardTitle>Canaux de communication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">Notifications par email</p>
                  </div>
                  <Switch
                    checked={preferences.email}
                    onCheckedChange={(checked) => updatePreference('email', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS</p>
                    <p className="text-sm text-gray-600">Notifications par SMS (urgent uniquement)</p>
                  </div>
                  <Switch
                    checked={preferences.sms}
                    onCheckedChange={(checked) => updatePreference('sms', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push</p>
                    <p className="text-sm text-gray-600">Notifications push dans l'application</p>
                  </div>
                  <Switch
                    checked={preferences.push}
                    onCheckedChange={(checked) => updatePreference('push', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Types */}
            <Card>
              <CardHeader>
                <CardTitle>Types de notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Livraisons</p>
                    <p className="text-sm text-gray-600">Statuts et mises à jour de livraison</p>
                  </div>
                  <Switch
                    checked={preferences.delivery}
                    onCheckedChange={(checked) => updatePreference('delivery', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Douane</p>
                    <p className="text-sm text-gray-600">Documents et procédures douanières</p>
                  </div>
                  <Switch
                    checked={preferences.customs}
                    onCheckedChange={(checked) => updatePreference('customs', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Consolidation</p>
                    <p className="text-sm text-gray-600">Opportunités d'économies</p>
                  </div>
                  <Switch
                    checked={preferences.consolidation}
                    onCheckedChange={(checked) => updatePreference('consolidation', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Système</p>
                    <p className="text-sm text-gray-600">Mises à jour et nouvelles fonctionnalités</p>
                  </div>
                  <Switch
                    checked={preferences.system}
                    onCheckedChange={(checked) => updatePreference('system', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Paramètres avancés */}
            <Card>
              <CardHeader>
                <CardTitle>Paramètres avancés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications navigateur</p>
                      <p className="text-sm text-gray-600">Notifications système du navigateur</p>
                    </div>
                    <Switch
                      checked={preferences.browser}
                      onCheckedChange={(checked) => updatePreference('browser', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Actualisation automatique</p>
                      <p className="text-sm text-gray-600">Vérifier les nouvelles notifications</p>
                    </div>
                    <Switch
                      checked={autoRefresh}
                      onCheckedChange={setAutoRefresh}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mode silencieux</p>
                    <p className="text-sm text-gray-600">Désactiver les notifications pendant certaines heures</p>
                  </div>
                  <Switch
                    checked={preferences.quietHours}
                    onCheckedChange={(checked) => updatePreference('quietHours', checked)}
                  />
                </div>

                {preferences.quietHours && (
                  <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="quietStart">Début mode silencieux</Label>
                      <input
                        id="quietStart"
                        type="time"
                        className="w-full mt-1 p-2 border rounded"
                        value={preferences.quietStart}
                        onChange={(e) => updatePreference('quietStart', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="quietEnd">Fin mode silencieux</Label>
                      <input
                        id="quietEnd"
                        type="time"
                        className="w-full mt-1 p-2 border rounded"
                        value={preferences.quietEnd}
                        onChange={(e) => updatePreference('quietEnd', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Permissions notifications navigateur */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Permissions navigateur</span>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Activez les notifications navigateur pour recevoir des alertes même quand l'onglet n'est pas actif.
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      if ('Notification' in window) {
                        Notification.requestPermission().then(permission => {
                          if (permission === 'granted') {
                            new Notification('HubDispo', {
                              body: 'Notifications activées avec succès !',
                              icon: '/favicon.ico'
                            });
                          }
                        });
                      }
                    }}
                  >
                    Activer les notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {preferencesChanged ? (
                <span className="text-amber-600">• Modifications non sauvegardées</span>
              ) : (
                <span className="text-[#10B981]">✓ Préférences sauvegardées</span>
              )}
            </div>
            <Button 
              className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
              disabled={!preferencesChanged}
              onClick={() => {
                // Simulation de sauvegarde
                setTimeout(() => {
                  setPreferencesChanged(false);
                }, 500);
              }}
            >
              Sauvegarder les préférences
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}