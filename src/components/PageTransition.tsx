// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionKey: string;
  direction?: 'left' | 'right' | 'up' | 'down' | 'fade';
  duration?: number;
}

export default function PageTransition({ 
  children, 
  transitionKey, 
  direction = 'fade',
  duration = 0.3 
}: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [transitionKey]);

  const getVariants = () => {
    switch (direction) {
      case 'left':
        return {
          initial: { x: '-100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '100%', opacity: 0 }
        };
      case 'right':
        return {
          initial: { x: '100%', opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: '-100%', opacity: 0 }
        };
      case 'up':
        return {
          initial: { y: 20, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -20, opacity: 0 }
        };
      case 'down':
        return {
          initial: { y: -20, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: 20, opacity: 0 }
        };
      default: // fade
        return {
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.02 }
        };
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        variants={getVariants()}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ 
          duration, 
          ease: [0.4, 0, 0.2, 1] // Cubic bezier pour une transition naturelle
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Composant pour animations de micro-interactions
export function InteractiveCard({ 
  children, 
  onClick, 
  className = "",
  hoverScale = 1.02,
  tapScale = 0.98
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverScale?: number;
  tapScale?: number;
}) {
  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// Composant pour boutons avec feedback tactile
export function InteractiveButton({ 
  children, 
  onClick, 
  className = "",
  variant = "default"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "primary" | "secondary";
}) {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

// Composant pour badges avec animation
export function AnimatedBadge({ 
  children, 
  className = "",
  pulse = false 
}: {
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      {...(pulse && {
        animate: { scale: [1, 1.05, 1] },
        transition: { duration: 2, repeat: Infinity }
      })}
    >
      {children}
    </motion.div>
  );
}

// Composant pour états de chargement élégants
export function LoadingSpinner({ 
  size = "default",
  className = "" 
}: {
  size?: "small" | "default" | "large";
  className?: string;
}) {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-6 h-6", 
    large: "w-8 h-8"
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-full h-full border-2 border-[#1E40AF]/20 border-t-[#1E40AF] rounded-full"></div>
    </motion.div>
  );
}

// Composant pour notifications toast animées
export function AnimatedToast({ 
  children, 
  type = "info",
  onClose 
}: {
  children: React.ReactNode;
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
}) {
  const colorMap = {
    success: "bg-[#10B981] border-[#10B981]/20",
    error: "bg-red-500 border-red-500/20",
    warning: "bg-orange-500 border-orange-500/20",
    info: "bg-[#1E40AF] border-[#1E40AF]/20"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${colorMap[type]} text-white p-4 rounded-lg border backdrop-blur-sm`}
    >
      {children}
    </motion.div>
  );
}

// Composant pour progression fluide
export function AnimatedProgress({ 
  value, 
  className = "" 
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <motion.div
        className="bg-[#1E40AF] h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}