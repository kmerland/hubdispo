// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
// src/components/HubDispo/ImageWithFallback.tsx
import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = '/placeholder-avatar.png', // ou une image par défaut dans /public
  alt = 'Image',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return <img src={imgSrc} alt={alt} onError={handleError} {...props} />;
};