// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useState, useEffect } from 'react';

interface BreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

const defaultBreakpoints: BreakpointConfig = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
  wide: 1536
};

export function useResponsive(breakpoints = defaultBreakpoints) {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenSize.width < breakpoints.mobile;
  const isTablet = screenSize.width >= breakpoints.mobile && screenSize.width < breakpoints.tablet;
  const isDesktop = screenSize.width >= breakpoints.tablet && screenSize.width < breakpoints.desktop;
  const isWide = screenSize.width >= breakpoints.desktop;
  const isUltraWide = screenSize.width >= breakpoints.wide;

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    isUltraWide,
    breakpoints
  };
}

export function useHeaderLayout() {
  const { isMobile, isTablet, isDesktop, isWide, isUltraWide } = useResponsive();

  const showFullLogo = !isMobile;
  const showCenterNav = isDesktop || isWide || isUltraWide;
  const showFullSearch = isUltraWide;
  const showSearchIcon = !isUltraWide;
  const showFullButtons = isWide || isUltraWide;
  const showLanguageSelector = !isMobile;
  const showConnectionStatus = isUltraWide;
  const showSupportButton = isUltraWide;
  const showMessagesButton = isDesktop || isWide || isUltraWide;
  const showFullUserName = isUltraWide;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    isUltraWide,
    showFullLogo,
    showCenterNav,
    showFullSearch,
    showSearchIcon,
    showFullButtons,
    showLanguageSelector,
    showConnectionStatus,
    showSupportButton,
    showMessagesButton,
    showFullUserName
  };
}