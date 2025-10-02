// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Download, 
  Search, 
  Filter, 
  Receipt, 
  Calendar,
  TrendingUp,
  Euro,
  FileText,
  ExternalLink,
  CreditCard
} from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { toast } from 'sonner@2.0.3';

interface BillingHistoryProps {
  onNavigate?: (view: string, params?: any) => void;
}

export default function BillingHistory({ onNavigate }: BillingHistoryProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');

  // Simulation des données de facturation
  const invoices = [
    {
      id: 'in_202401001',
      number: 'HUB-2024-001',
      status: 'paid',
      amount: 49.00,
      tax_amount: 10.29,
      total_amount: 59.29,
      currency: 'EUR',
      created: new Date('2024-01-01'),
      period_start: new Date('2024-01-01'),
      period_end: new Date('2024-02-01'),
      plan: 'Premium Mensuel',
      payment_method: 'Carte **** 4242',
      pdf_url: '#',
      hosted_invoice_url: '#',
      customer: {
        name: 'Jean Dupont',
        company: 'Dupont Export SPRL',
        vat_number: 'BE0123456789'
      }
    },
    {
      id: 'in_202312001',
      number: 'HUB-2023-012',
      status: 'paid',
      amount: 49.00,
      tax_amount: 10.29,
      total_amount: 59.29,
      currency: 'EUR',
      created: new Date('2023-12-01'),
      period_start: new Date('2023-12-01'),
      period_end: new Date('2024-01-01'),
      plan: 'Premium Mensuel',
      payment_method: 'Carte **** 4242',
      pdf_url: '#',
      hosted_invoice_url: '#',
      customer: {
        name: 'Jean Dupont',
        company: 'Dupont Export SPRL',
        vat_number: 'BE0123456789'
      }
    },
    {
      id: 'in_202311001',
      number: 'HUB-2023-011',
      status: 'paid',
      amount: 49.00,
      tax_amount: 10.29,
      total_amount: 59.29,
      currency: 'EUR',
      created: new Date('2023-11-01'),
      period_start: new Date('2023-11-01'),
      period_end: new Date('2023-12-01'),
      plan: 'Premium Mensuel',
      payment_method: 'Virement SEPA',
      pdf_url: '#',
      hosted_invoice_url: '#',
      customer: {
        name: 'Jean Dupont',
        company: 'Dupont Export SPRL',
        vat_number: 'BE0123456789'
      }
    },
    {
      id: 'in_202310001',
      number: 'HUB-2023-010',
      status: 'void',
      amount: 49.00,
      tax_amount: 10.29,
      total_amount: 59.29,
      currency: 'EUR',
      created: new Date('2023-10-01'),
      period_start: new Date('2023-10-01'),
      period_end: new Date('2023-11-01'),
      plan: 'Premium Mensuel',
      payment_method: 'Carte **** 4242',
      pdf_url: '#',
      hosted_invoice_url: '#',
      customer: {
        name: 'Jean Dupont',
        company: 'Dupont Export SPRL',
        vat_number: 'BE0123456789'
      }
    }
  ];

  const billingStats = {
    total_spent: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total_amount, 0),
    average_monthly: 59.29,
    invoices_count: invoices.length,
    paid_count: invoices.filter(inv => inv.status === 'paid').length,
    this_year_total: invoices.filter(inv => inv.created.getFullYear() === 2024 && inv.status === 'paid').reduce((sum, inv) => sum + inv.total_amount, 0)
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.plan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesYear = yearFilter === 'all' || invoice.created.getFullYear().toString() === yearFilter;
    
    return matchesSearch && matchesStatus && matchesYear;
  });

  const handleDownloadInvoice = (invoice: any) => {
    toast.success(`Téléchargement de la facture ${invoice.number}`);
    // Simulation du téléchargement
    const link = document.createElement('a');
    link.href = '#';
    link.download = `facture-${invoice.number}.pdf`;
    link.click();
  };

  const handleViewInvoice = (invoice: any) => {
    toast.info(`Ouverture de la facture ${invoice.number}`);
    // Simulation de l'ouverture dans un nouvel onglet
    window.open('#', '_blank');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-[#10B981] text-white">Payée</Badge>;
      case 'open':
        return <Badge className="bg-blue-500 text-white">En attente</Badge>;
      case 'past_due':
        return <Badge variant="destructive">Échue</Badge>;
      case 'void':
        return <Badge variant="secondary">Annulée</Badge>;
      case 'draft':
        return <Badge variant="outline">Brouillon</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    if (method.includes('Carte')) {
      return <CreditCard className="h-4 w-4" />;
    } else if (method.includes('SEPA')) {
      return <FileText className="h-4 w-4" />;
    }
    return <Receipt className="h-4 w-4" />;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Historique de facturation</h1>
          <p className="text-gray-600">Consultez et téléchargez vos factures</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => toast.info('Export en cours...')}
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button
            onClick={() => onNavigate?.('subscription-management')}
            className="bg-[#1E40AF] hover:bg-[#1E40AF]/90"
          >
            Gérer l'abonnement
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Euro className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total dépensé</p>
                <p className="text-2xl font-semibold">&euro;{billingStats.total_spent.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Moyenne mensuelle</p>
                <p className="text-2xl font-semibold">&euro;{billingStats.average_monthly.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Receipt className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Factures payées</p>
                <p className="text-2xl font-semibold">{billingStats.paid_count}/{billingStats.invoices_count}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total 2024</p>
                <p className="text-2xl font-semibold">&euro;{billingStats.this_year_total.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par numéro de facture ou plan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="paid">Payées</SelectItem>
                <SelectItem value="open">En attente</SelectItem>
                <SelectItem value="past_due">Échues</SelectItem>
                <SelectItem value="void">Annulées</SelectItem>
              </SelectContent>
            </Select>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des factures */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Factures ({filteredInvoices.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Receipt className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{invoice.number}</h3>
                        {getStatusBadge(invoice.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {invoice.plan} • {invoice.created.toLocaleDateString('fr-FR')}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {getPaymentMethodIcon(invoice.payment_method)}
                        <span>{invoice.payment_method}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:items-end gap-2">
                    <div className="text-right">
                      <p className="font-semibold text-lg">&euro;{invoice.total_amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">
                        dont TVA: &euro;{invoice.tax_amount.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewInvoice(invoice)}
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Voir
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadInvoice(invoice)}
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Détails de la période */}
                <div className="mt-4 pt-4 border-t bg-gray-50 rounded-lg p-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Période de facturation</p>
                      <p className="font-medium">
                        {invoice.period_start.toLocaleDateString('fr-FR')} - {invoice.period_end.toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Client</p>
                      <p className="font-medium">{invoice.customer.company}</p>
                      <p className="text-xs text-gray-500">{invoice.customer.vat_number}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Montant HT</p>
                      <p className="font-medium">&euro;{invoice.amount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <Receipt className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucune facture trouvée</p>
              <p className="text-sm text-gray-400">Essayez de modifier vos filtres de recherche</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informations fiscales */}
      <Card>
        <CardHeader>
          <CardTitle>Informations fiscales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Informations de facturation</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Société:</span> hubdispo.be SPRL</p>
                <p><span className="font-medium">Adresse:</span> Rue de la Logistique 123, 1000 Bruxelles</p>
                <p><span className="font-medium">TVA:</span> BE0987654321</p>
                <p><span className="font-medium">Email:</span> facturation@hubdispo.be</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Conditions de paiement</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <p>• Paiement immédiat par carte bancaire</p>
                <p>• Virement SEPA: 2 jours ouvrés maximum</p>
                <p>• TVA appliquée selon la réglementation belge</p>
                <p>• Factures envoyées par email automatiquement</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}