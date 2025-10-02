// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
// Données mock réalistes pour HubDispo.be - Plateforme logistique belge

export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: {
    company: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  destination: {
    company: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  status: 'pending' | 'in_transit' | 'customs' | 'delivered' | 'delayed' | 'consolidating';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  weight: number; // en kg
  dimensions: {
    length: number; // en cm
    width: number;
    height: number;
  };
  value: number; // en EUR
  shippingCost: number; // en EUR
  estimatedDelivery: string;
  createdAt: string;
  lastUpdate: string;
  carrier: string;
  service: string;
  consolidationGroup?: string;
  customsStatus?: 'pending' | 'clearing' | 'cleared' | 'issues';
  documents: string[];
}

export interface ConsolidationGroup {
  id: string;
  name: string;
  destination: {
    city: string;
    country: string;
  };
  status: 'open' | 'full' | 'in_transit' | 'delivered';
  shipments: string[]; // IDs des envois
  totalWeight: number;
  totalVolume: number;
  estimatedSavings: number; // en EUR
  departureDate: string;
  maxCapacity: {
    weight: number;
    volume: number;
  };
  currentLoad: {
    weight: number;
    volume: number;
  };
  participants: number;
  coordinator: string;
}

export interface Alert {
  id: string;
  type: 'customs' | 'delay' | 'route_optimization' | 'cost_saving' | 'document_missing' | 'consolidation_opportunity';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  shipmentId?: string;
  consolidationId?: string;
  suggestions: string[];
  estimatedSavings?: number;
  estimatedDelay?: number;
  actionRequired: boolean;
  createdAt: string;
  resolvedAt?: string;
  status: 'active' | 'resolved' | 'dismissed';
}

// Entreprises belges réalistes avec secteurs d'activité
export const belgianCompanies = [
  { name: "Delhaize Group SA", sector: "Distribution alimentaire", city: "Bruxelles" },
  { name: "AB InBev", sector: "Brasserie", city: "Louvain" },
  { name: "Solvay SA", sector: "Chimie", city: "Bruxelles" },
  { name: "UCB Pharma", sector: "Pharmaceutique", city: "Braine-l'Alleud" },
  { name: "Materialise NV", sector: "Impression 3D", city: "Louvain" },
  { name: "Proximus Group", sector: "Télécommunications", city: "Bruxelles" },
  { name: "Lotus Bakeries", sector: "Alimentaire", city: "Lembeke" },
  { name: "Barco NV", sector: "Technologie", city: "Courtrai" },
  { name: "Duvel Moortgat", sector: "Brasserie", city: "Puurs-Sint-Amands" },
  { name: "Ackermans & van Haaren", sector: "Holding", city: "Anvers" },
  { name: "Resilux NV", sector: "Emballage", city: "Wetteren" },
  { name: "Telenet Group", sector: "Télécommunications", city: "Malines" },
  { name: "Fagron NV", sector: "Pharmaceutique", city: "Nazareth" },
  { name: "Montea NV", sector: "Immobilier logistique", city: "Gand" },
  { name: "WDP Warehouses", sector: "Immobilier logistique", city: "Anvers" }
];

// Villes européennes principales pour export/import
export const europeanCities = [
  { city: "Amsterdam", country: "Pays-Bas", code: "NL" },
  { city: "Rotterdam", country: "Pays-Bas", code: "NL" },
  { city: "Hambourg", country: "Allemagne", code: "DE" },
  { city: "Munich", country: "Allemagne", code: "DE" },
  { city: "Francfort", country: "Allemagne", code: "DE" },
  { city: "Paris", country: "France", code: "FR" },
  { city: "Lyon", country: "France", code: "FR" },
  { city: "Milan", country: "Italie", code: "IT" },
  { city: "Rome", country: "Italie", code: "IT" },
  { city: "Madrid", country: "Espagne", code: "ES" },
  { city: "Barcelone", country: "Espagne", code: "ES" },
  { city: "Zurich", country: "Suisse", code: "CH" },
  { city: "Genève", country: "Suisse", code: "CH" },
  { city: "Vienne", country: "Autriche", code: "AT" },
  { city: "Prague", country: "Tchéquie", code: "CZ" },
  { city: "Varsovie", country: "Pologne", code: "PL" },
  { city: "Stockholm", country: "Suède", code: "SE" },
  { city: "Copenhague", country: "Danemark", code: "DK" }
];

// Villes belges
export const belgianCities = [
  { city: "Anvers", postalCode: "2000" },
  { city: "Gand", postalCode: "9000" },
  { city: "Charleroi", postalCode: "6000" },
  { city: "Liège", postalCode: "4000" },
  { city: "Bruges", postalCode: "8000" },
  { city: "Namur", postalCode: "5000" },
  { city: "Louvain", postalCode: "3000" },
  { city: "Mons", postalCode: "7000" },
  { city: "Aalst", postalCode: "9300" },
  { city: "Malines", postalCode: "2800" }
];

// Transporteurs réalistes
export const carriers = [
  "DHL Express Belgium", "FedEx Belgium", "UPS Belgium", 
  "PostNL", "DPD Belgium", "GLS Belgium", "TNT Express",
  "Chronopost Belgium", "GEODIS", "DSV Belgium"
];

// Services de transport
export const shippingServices = [
  "Express 24h", "Standard 48h", "Economy 5-7 jours",
  "Consolidation groupée", "Transport maritime", "Transport ferroviaire",
  "Livraison sur rendez-vous", "Livraison le samedi"
];

// Générateur de données mock
export const generateMockShipments = (count: number = 20): Shipment[] => {
  const shipments: Shipment[] = [];
  const statuses: Shipment['status'][] = ['pending', 'in_transit', 'customs', 'delivered', 'delayed', 'consolidating'];
  const priorities: Shipment['priority'][] = ['low', 'medium', 'high', 'urgent'];

  for (let i = 0; i < count; i++) {
    const originCity = belgianCities[Math.floor(Math.random() * belgianCities.length)];
    const destCity = europeanCities[Math.floor(Math.random() * europeanCities.length)];
    const company = belgianCompanies[Math.floor(Math.random() * belgianCompanies.length)];
    
    const weight = Math.round((Math.random() * 50 + 1) * 100) / 100;
    const length = Math.round(Math.random() * 100 + 10);
    const width = Math.round(Math.random() * 80 + 10);
    const height = Math.round(Math.random() * 60 + 5);
    const value = Math.round((Math.random() * 5000 + 100) * 100) / 100;
    
    const daysFromNow = Math.floor(Math.random() * 30) - 15; // -15 à +15 jours
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() + daysFromNow);
    
    const deliveryDate = new Date(createdDate);
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 7) + 1);

    shipments.push({
      id: `SHP-${String(i + 1).padStart(6, '0')}`,
      trackingNumber: `HD${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      origin: {
        company: company.name,
        address: `Rue du Commerce ${Math.floor(Math.random() * 200) + 1}`,
        city: originCity.city,
        postalCode: originCity.postalCode,
        country: "Belgique"
      },
      destination: {
        company: `${destCity.city} Trading Co.`,
        address: `${destCity.city} Business Center ${Math.floor(Math.random() * 50) + 1}`,
        city: destCity.city,
        postalCode: `${Math.floor(Math.random() * 90000) + 10000}`,
        country: destCity.country
      },
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      weight,
      dimensions: { length, width, height },
      value,
      shippingCost: Math.round((weight * 12 + value * 0.02) * 100) / 100,
      estimatedDelivery: deliveryDate.toISOString().split('T')[0],
      createdAt: createdDate.toISOString(),
      lastUpdate: new Date().toISOString(),
      carrier: carriers[Math.floor(Math.random() * carriers.length)],
      service: shippingServices[Math.floor(Math.random() * shippingServices.length)],
      consolidationGroup: Math.random() > 0.7 ? `CON-${Math.floor(Math.random() * 1000)}` : undefined,
      customsStatus: Math.random() > 0.5 ? ['pending', 'clearing', 'cleared', 'issues'][Math.floor(Math.random() * 4)] as any : undefined,
      documents: ['Facture commerciale', 'Liste de colisage', 'Certificat d\'origine'].filter(() => Math.random() > 0.3)
    });
  }

  return shipments;
};

export const generateMockConsolidationGroups = (count: number = 8): ConsolidationGroup[] => {
  const groups: ConsolidationGroup[] = [];
  const statuses: ConsolidationGroup['status'][] = ['open', 'full', 'in_transit', 'delivered'];

  for (let i = 0; i < count; i++) {
    const destCity = europeanCities[Math.floor(Math.random() * europeanCities.length)];
    const shipmentCount = Math.floor(Math.random() * 8) + 2;
    const maxWeight = 1000 + Math.floor(Math.random() * 2000);
    const maxVolume = 15 + Math.floor(Math.random() * 10);
    const currentWeight = Math.floor(Math.random() * maxWeight * 0.8);
    const currentVolume = Math.floor(Math.random() * maxVolume * 0.8);

    groups.push({
      id: `CON-${String(i + 1).padStart(4, '0')}`,
      name: `Groupage ${destCity.city} ${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
      destination: {
        city: destCity.city,
        country: destCity.country
      },
      status: statuses[Math.floor(Math.random() * statuses.length)],
      shipments: Array.from({ length: shipmentCount }, (_, j) => `SHP-${String(j + i * 10 + 1).padStart(6, '0')}`),
      totalWeight: currentWeight,
      totalVolume: currentVolume,
      estimatedSavings: Math.round((shipmentCount * 45 + currentWeight * 2.5) * 100) / 100,
      departureDate: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      maxCapacity: {
        weight: maxWeight,
        volume: maxVolume
      },
      currentLoad: {
        weight: currentWeight,
        volume: currentVolume
      },
      participants: shipmentCount,
      coordinator: belgianCompanies[Math.floor(Math.random() * belgianCompanies.length)].name
    });
  }

  return groups;
};

// Alertes réalistes pour PME logistiques belges - Axées sur l'action et les bénéfices
export const generateMockAlerts = (count: number = 12): Alert[] => {
  const mockShipmentIds = ['SHP-000123', 'SHP-000156', 'SHP-000187', 'SHP-000203', 'SHP-000245'];
  const mockConsolidationIds = ['CON-0012', 'CON-0018', 'CON-0025'];
  
  // Alertes réalistes avec CTAs clairs et langage orienté bénéfices
  const realisticAlerts: Alert[] = [
    // Alertes critiques - Documents douaniers
    {
      id: 'ALT-001',
      type: 'document_missing',
      severity: 'critical',
      title: 'Facture commerciale manquante - Envoi SHP-000123 bloqué',
      description: 'Votre envoi vers Munich (34,5kg de produits chimiques) est retenu aux douanes allemandes. La facture commerciale détaillée est requise pour le dédouanement.',
      shipmentId: 'SHP-000123',
      suggestions: [
        'Téléchargez le modèle de facture commerciale conforme UE',
        'Incluez la classification HS précise de vos produits',
        'Mentionnez la valeur unitaire et totale en EUR'
      ],
      estimatedDelay: 3,
      actionRequired: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },
    {
      id: 'ALT-002',
      type: 'customs',
      severity: 'critical',
      title: 'Certificat EUR.1 requis - Économisez 8% de droits de douane',
      description: 'Votre envoi SHP-000156 vers la Suisse peut bénéficier de l\'accord de libre-échange UE-Suisse. Un certificat EUR.1 vous ferait économiser €127 en droits.',
      shipmentId: 'SHP-000156',
      suggestions: [
        'Demandez le certificat EUR.1 auprès de votre chambre de commerce',
        'Vérifiez l\'origine de vos marchandises (min. 50% UE)',
        'Soumettez le certificat avant livraison pour éviter le remboursement'
      ],
      estimatedSavings: 127,
      actionRequired: true,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },

    // Opportunités de consolidation
    {
      id: 'ALT-003',
      type: 'consolidation_opportunity',
      severity: 'warning',
      title: 'Consolidation vers Amsterdam - Économisez €85 (départ demain)',
      description: 'Un groupage vers Amsterdam part demain avec 12,3m³ disponibles. Parfait pour vos 3 envois prévus cette semaine. Réduction de 35% vs envois séparés.',
      consolidationId: 'CON-0012',
      suggestions: [
        'Rejoignez le groupage pour économiser €85 sur vos frais de transport',
        'Livraison garantie en 48h au lieu de 72h via transport individuel',
        'Empreinte carbone réduite de 45% grâce au transport mutualisé'
      ],
      estimatedSavings: 85,
      actionRequired: true,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },
    {
      id: 'ALT-004',
      type: 'consolidation_opportunity',
      severity: 'info',
      title: 'Nouvelle ligne de groupage vers Milan - Places limitées',
      description: 'Nous lançons une ligne de consolidation hebdomadaire vers Milan. Première rotation le 15/01 avec tarifs préférentiels pour les membres fondateurs.',
      consolidationId: 'CON-0018',
      suggestions: [
        'Réservez votre place avec 25% de réduction sur les 3 premiers mois',
        'Livraison express en 48h depuis Anvers',
        'Service douanier inclus - zéro paperasse pour vous'
      ],
      estimatedSavings: 156,
      actionRequired: false,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },

    // Alertes réglementaires UE
    {
      id: 'ALT-005',
      type: 'customs',
      severity: 'warning',
      title: 'Nouvelle réglementation CBAM - Produits sidérurgiques concernés',
      description: 'Le mécanisme d\'ajustement carbone aux frontières (CBAM) entre en vigueur pour vos exportations d\'acier. Vos certificats CBAM sont-ils à jour ?',
      suggestions: [
        'Vérifiez si vos produits sidérurgiques sont soumis au CBAM',
        'Obtenez les certificats CBAM auprès de vos fournisseurs',
        'Utilisez notre assistant CBAM pour calculer vos obligations'
      ],
      actionRequired: true,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },
    {
      id: 'ALT-006',
      type: 'customs',
      severity: 'info',
      title: 'Brexit - Nouvelles règles d\'origine UK applicables',
      description: 'Les règles d\'origine préférentielle UK ont évolué. Vérifiez la conformité de vos certificats pour maintenir vos tarifs préférentiels.',
      suggestions: [
        'Consultez les nouvelles règles d\'origine UK-UE',
        'Mettez à jour vos déclarations d\'origine fournisseurs',
        'Profitez de notre audit gratuit des règles d\'origine'
      ],
      actionRequired: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },

    // Optimisations de coûts
    {
      id: 'ALT-007',
      type: 'cost_saving',
      severity: 'info',
      title: 'Seuil de remise volume atteint - €340 d\'économies disponibles',
      description: 'Félicitations ! Vos expéditions de ce mois ont atteint le seuil de 500kg. Vous êtes éligible à notre tarif "Gros Volume" avec 15% de réduction.',
      suggestions: [
        'Activez automatiquement le tarif préférentiel sur vos prochains envois',
        'Économisez jusqu\'à €340/mois avec le programme fidélité',
        'Bénéficiez de la livraison express gratuite pendant 3 mois'
      ],
      estimatedSavings: 340,
      actionRequired: false,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },
    
    // Alertes de retards/disruptions
    {
      id: 'ALT-008',
      type: 'delay',
      severity: 'warning',
      title: 'Grève SNCF - Vos envois ferroviaires vers Lyon impactés',
      description: 'Les envois SHP-000187 et SHP-000203 vers Lyon subissent un retard de 48h en raison de la grève SNCF. Solutions alternatives disponibles.',
      shipmentId: 'SHP-000187',
      suggestions: [
        'Basculez vers le transport routier (+€23, livraison maintenue)',
        'Patientez 48h supplémentaires sans surcoût',
        'Informez automatiquement vos clients du retard'
      ],
      estimatedDelay: 2,
      actionRequired: true,
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },

    // Écarts de poids
    {
      id: 'ALT-009',
      type: 'customs',
      severity: 'warning',
      title: 'Écart de poids détecté - SHP-000245 (déclaré 25kg, pesé 28,3kg)',
      description: 'L\'envoi vers Hambourg présente un écart de poids de +13%. Cela peut entraîner des frais supplémentaires et retarder le dédouanement.',
      shipmentId: 'SHP-000245',
      suggestions: [
        'Vérifiez vos procédures de pesée avant expédition',
        'Utilisez notre calculateur de poids volumétrique',
        'Acceptez l\'ajustement tarifaire (+€12) pour éviter les retards'
      ],
      estimatedDelay: 1,
      actionRequired: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },

    // Opportunités d'optimisation
    {
      id: 'ALT-010',
      type: 'route_optimization',
      severity: 'info',
      title: 'Route éco-responsable disponible - Réduisez votre empreinte carbone',
      description: 'Une route multimodale (fer + route) est disponible pour vos envois vers l\'Allemagne. 30% moins d\'émissions CO2 pour seulement +4h de transit.',
      suggestions: [
        'Adoptez le transport multimodal pour votre image RSE',
        'Obtenez un certificat carbone pour vos clients',
        'Économisez 12% sur les frais de transport longue distance'
      ],
      estimatedSavings: 67,
      actionRequired: false,
      createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },

    // Alerte de performance positive
    {
      id: 'ALT-011',
      type: 'cost_saving',
      severity: 'info',
      title: 'Performance exceptionnelle - 98% de livraisons à l\'heure ce mois',
      description: 'Excellente performance ! Votre taux de livraison à l\'heure dépasse notre standard premium. Vous méritez un avantage supplémentaire.',
      suggestions: [
        'Profitez de 5 envois express gratuits en récompense',
        'Accédez au support prioritaire pendant 30 jours',
        'Partagez votre succès sur LinkedIn avec notre badge qualité'
      ],
      actionRequired: false,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },

    // Alerte maintenance/mise à jour
    {
      id: 'ALT-012',
      type: 'cost_saving',
      severity: 'info',
      title: 'Mise à jour disponible - Nouveaux accords tarifaires négociés',
      description: 'Nous avons négocié de nouveaux tarifs préférentiels avec DHL et FedEx. Mise à jour automatique de vos grilles tarifaires en cours.',
      suggestions: [
        'Vos tarifs sont automatiquement mis à jour',
        'Économies moyennes estimées : €45/mois sur vos envois express',
        'Consultez le détail des nouveaux tarifs dans votre tableau de bord'
      ],
      estimatedSavings: 45,
      actionRequired: false,
      createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    }
  ];

  return realisticAlerts.slice(0, count);
};

// Données statiques pour le dashboard
export const dashboardStats = {
  totalShipments: 1247,
  activeShipments: 89,
  consolidationSavings: 15420,
  averageDeliveryTime: 3.2,
  customsClearanceRate: 94.5,
  monthlyGrowth: 12.3
};

// Données pour la carte des routes
export const routeData = {
  activeRoutes: [
    {
      id: "RT-001",
      origin: { city: "Anvers", lat: 51.2194, lng: 4.4025 },
      destination: { city: "Amsterdam", lat: 52.3676, lng: 4.9041 },
      shipments: 12,
      status: "active",
      estimatedDuration: "2h 15min",
      distance: "165 km"
    },
    {
      id: "RT-002", 
      origin: { city: "Gand", lat: 51.0543, lng: 3.7174 },
      destination: { city: "Paris", lat: 48.8566, lng: 2.3522 },
      shipments: 8,
      status: "delayed",
      estimatedDuration: "4h 30min",
      distance: "320 km"
    }
  ],
  consolidationHubs: [
    { id: "HUB-ANR", city: "Anvers", capacity: 85, current: 72 },
    { id: "HUB-GHT", city: "Gand", capacity: 60, current: 45 },
    { id: "HUB-LIE", city: "Liège", capacity: 45, current: 38 }
  ]
};

export const mockShipments = generateMockShipments();
export const mockConsolidationGroups = generateMockConsolidationGroups();
export const mockAlerts = generateMockAlerts();