// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import React, { useState } from 'react';
import { Package, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useAuth } from './AuthProvider';
import { useLanguage } from './LanguageProvider';
import { useToast } from './ToastProvider';
import LanguageSelector from './LanguageSelector';

interface LoginProps {
  onNavigate: (view: string) => void;
}

export default function Login({ onNavigate }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        showToast({
          type: 'success',
          message: 'Connexion réussie ! Bienvenue sur hubdispo.be',
          duration: 4000
        });
        onNavigate('dashboard');
      } else {
        showToast({
          type: 'error',
          message: 'Email ou mot de passe incorrect',
          duration: 4000
        });
      }
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Erreur lors de la connexion. Veuillez réessayer.',
        duration: 4000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('marie@techstore.be');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
            <CardTitle className="text-2xl">{t('auth.login_title')}</CardTitle>
            <CardDescription className="text-gray-600">
              {t('auth.login_subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Demo credentials hint */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-blue-800 mb-2 font-medium">
                    🎯 Découvrez hubdispo.be en 2 minutes
                  </p>
                  <p className="text-blue-700 mb-3 text-xs">
                    <strong>Compte de démonstration :</strong><br />
                    Email: marie@techstore.be<br />
                    Mot de passe: demo123
                  </p>
                  <div className="flex items-center gap-2 text-xs text-green-700 mb-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Application entièrement fonctionnelle
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400"
                    onClick={handleDemoLogin}
                  >
                    🚀 Accès demo instantané
                  </Button>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white border-gray-300 focus:border-[#1E40AF] focus:ring-[#1E40AF]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </div>

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-[#1E40AF] hover:text-[#1E40AF]/80"
                >
                  {t('auth.forgot_password')}
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Connexion...
                  </>
                ) : (
                  t('auth.login')
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                {t('auth.no_account')}{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto text-[#1E40AF] hover:text-[#1E40AF]/80"
                  onClick={() => onNavigate('register')}
                >
                  {t('auth.register')}
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