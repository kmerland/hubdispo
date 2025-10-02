// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import React, { useState } from 'react';
import { Package, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { useAuth } from './AuthProvider';
import { useLanguage } from './LanguageProvider';
import { useToast } from './ToastProvider';
import LanguageSelector from './LanguageSelector';

interface RegisterProps {
  onNavigate: (view: string) => void;
}

export default function Register({ onNavigate }: RegisterProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'Le prénom est requis';
    if (!formData.lastName.trim()) return 'Le nom est requis';
    if (!formData.email.trim()) return 'L\'email est requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Email invalide';
    if (!formData.company.trim()) return 'Le nom de l\'entreprise est requis';
    if (formData.password.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères';
    if (formData.password !== formData.confirmPassword) return 'Les mots de passe ne correspondent pas';
    if (!acceptTerms) return 'Vous devez accepter les conditions d\'utilisation';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      showToast({
        type: 'error',
        message: validationError,
        duration: 4000
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        password: formData.password
      });
      
      if (success) {
        showToast({
          type: 'success',
          message: 'Compte créé avec succès ! Bienvenue sur hubdispo.be',
          duration: 4000
        });
        onNavigate('dashboard');
      } else {
        showToast({
          type: 'error',
          message: 'Un compte existe déjà avec cette adresse email',
          duration: 4000
        });
      }
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Erreur lors de la création du compte. Veuillez réessayer.',
        duration: 4000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 2) return 'Faible';
    if (strength < 4) return 'Moyen';
    return 'Fort';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header with language selector */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('homepage')}>
            <Package className="h-8 w-8 text-[#1E40AF]" />
            <span className="font-semibold text-xl text-gray-900">hubdispo.be</span>
          </div>
          <LanguageSelector />
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-2xl">{t('auth.register_title')}</CardTitle>
            <CardDescription className="text-gray-600">
              {t('auth.register_subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Proposition de valeur */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 text-sm mb-6">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <CheckCircle2 className="h-4 w-4" />
                <span className="font-medium">🇧🇪 Plateforme 100% belge • Gratuit 14 jours</span>
              </div>
              <p className="text-gray-600 text-xs">
                Rejoignez les 500+ PME belges qui ont simplifié leurs exports internationaux
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t('auth.first_name')}</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Marie"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    required
                    className="bg-white border-gray-300 focus:border-[#1E40AF] focus:ring-[#1E40AF]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t('auth.last_name')}</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Levert"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    required
                    className="bg-white border-gray-300 focus:border-[#1E40AF] focus:ring-[#1E40AF]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="marie@techstore.be"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="bg-white border-gray-300 focus:border-[#1E40AF] focus:ring-[#1E40AF]"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company">{t('auth.company')}</Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="TechStore SPRL"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  required
                  className="bg-white border-gray-300 focus:border-[#1E40AF] focus:ring-[#1E40AF]"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">{t('auth.phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+32 2 123 45 67"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="bg-white border-gray-300 focus:border-[#1E40AF] focus:ring-[#1E40AF]"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                    className="bg-white border-gray-300 focus:border-[#1E40AF] focus:ring-[#1E40AF] pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {formData.password && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Force du mot de passe :</span>
                      <span className={`${passwordStrength(formData.password) >= 4 ? 'text-green-600' : passwordStrength(formData.password) >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {getPasswordStrengthText(passwordStrength(formData.password))}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getPasswordStrengthColor(passwordStrength(formData.password))}`}
                        style={{ width: `${(passwordStrength(formData.password) / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('auth.confirm_password')}</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    required
                    className="bg-white border-gray-300 focus:border-[#1E40AF] focus:ring-[#1E40AF] pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {formData.confirmPassword && (
                  <div className="flex items-center gap-2 text-xs">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        <span className="text-green-600">Les mots de passe correspondent</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 text-red-600" />
                        <span className="text-red-600">Les mots de passe ne correspondent pas</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Terms acceptance */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-5">
                  {t('auth.terms')}{' '}
                  <button type="button" className="text-[#1E40AF] hover:underline">
                    {t('auth.terms_link')}
                  </button>
                  {' '}et notre{' '}
                  <button type="button" className="text-[#1E40AF] hover:underline">
                    {t('auth.privacy_link')}
                  </button>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Création du compte...
                  </>
                ) : (
                  t('auth.register')
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                {t('auth.already_account')}{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto text-[#1E40AF] hover:text-[#1E40AF]/80"
                  onClick={() => onNavigate('login')}
                >
                  {t('auth.login')}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to homepage */}
        <div className="text-center mt-6">
          <Button
            variant="link"
            className="text-gray-600 hover:text-[#1E40AF]"
            onClick={() => onNavigate('homepage')}
          >
            ← Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
}