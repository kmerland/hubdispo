// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useLanguage } from './LanguageProvider';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' }
];

interface LanguageSelectorProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function LanguageSelector({ variant = 'light', className = '' }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  
  const currentLanguage = languages.find(lang => lang.code === language);

  // Theme-based styling
  const themeStyles = {
    light: {
      button: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300',
      dropdown: 'bg-white border-gray-200',
      item: 'text-gray-900 hover:bg-gray-50',
      itemActive: 'bg-blue-50 text-[#1E40AF]'
    },
    dark: {
      button: 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 hover:border-gray-600',
      dropdown: 'bg-gray-800 border-gray-700',
      item: 'text-white hover:bg-gray-700',
      itemActive: 'bg-blue-900 text-blue-300'
    }
  };

  const styles = themeStyles[variant];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`
            min-w-[120px] justify-between h-10 px-3 py-2
            font-medium transition-all duration-200
            focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-2
            ${styles.button}
            ${className}
          `}
        >
          <span className="text-sm font-medium">
            {currentLanguage?.name || 'Français'}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={`
          w-56 p-1 shadow-lg border
          ${styles.dropdown}
        `}
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as 'fr' | 'en' | 'nl')}
            className={`
              flex items-center gap-3 px-3 py-2.5 cursor-pointer
              rounded-md transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:ring-offset-1
              ${language === lang.code ? styles.itemActive : styles.item}
            `}

          >
            <span className="text-lg leading-none" role="img" aria-label={`${lang.name} flag`}>
              {lang.flag}
            </span>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-medium text-sm leading-5 truncate">
                {lang.name}
              </span>
            </div>
            {language === lang.code && (
              <span className="text-[#1E40AF] text-sm font-medium" aria-label="Selected">
                ✓
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}