// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
}

export default function ResponsiveContainer({ children, className = "" }: ResponsiveContainerProps) {
  return (
    <div className={`
      w-full min-w-0 max-w-none
      px-3 sm:px-4 md:px-6 lg:px-8
      ${className}
    `}>
      <div className="
        w-full min-w-0 max-w-none
        flex items-center justify-between
        h-10
      ">
        {children}
      </div>
    </div>
  );
}