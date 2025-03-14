import { PgProduct } from "@/types/products";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatStatus(status: PgProduct["status"]) {
  switch (status) {
    case "recovered":
      return "Récupéré par le point de collecte";
    case "collected":
      return "Récupéré par Emaeus";
    case "recycled":
      return "Recyclé par Emaeus";
  }
}
