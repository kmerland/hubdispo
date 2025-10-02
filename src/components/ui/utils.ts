// Copyright (c) 2025 Gamaliel BENDEGUE. Tous droits réservés.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
