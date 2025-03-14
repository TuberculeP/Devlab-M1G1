"use client";
import { Button } from "@/components/ui/button";
import useUserHook from "@/hooks/userHook";
import Link from "next/link";
import { useEffect } from "react";

export default function Admin() {
  const { user, fetchUserData } = useUserHook();
  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="mb-8">
        <p className="text-gray-600">Gérez votre plateforme depuis cette interface</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Options disponibles</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-5 text-white font-medium shadow-md hover:shadow-lg">
            <Link href={"/admin/emmaus"} className="flex items-center">
              <span className="mr-2">🏠</span>
              Espace Emmaeüs
            </Link>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 transition-colors px-6 py-5 text-white font-medium shadow-md hover:shadow-lg">
            <Link href={"/admin/users"} className="flex items-center">
              <span className="mr-2">👥</span>
              Gestion utilisateurs
            </Link>
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-5 text-white font-medium shadow-md hover:shadow-lg">
            <Link href={"/admin/product-list"} className="flex items-center">
              <span className="mr-2">📦</span>
              Liste des produits
            </Link>
          </Button>
          <Button className="bg-amber-600 hover:bg-amber-700 transition-colors px-6 py-5 text-white font-medium shadow-md hover:shadow-lg">
            <Link href={"/admin/collect-points"} className="flex items-center">
              <span className="mr-2">📍</span>
              Points de collecte
            </Link>
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 transition-colors px-6 py-5 text-white font-medium shadow-md hover:shadow-lg">
            <Link href={"/admin/cities"} className="flex items-center">
              <span className="mr-2">🏙️</span>
              Gestion des villes
            </Link>
          </Button>
        </div>
      </div>
      
      {user && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Bienvenue, {user?.email ? user.email.split('@')[0] : 'Administrateur'}</h2>
          <p className="text-gray-600 mb-2">Dernière connexion: {new Date().toLocaleDateString()}</p>
          <div className="text-sm text-gray-500">Accès administrateur</div>
        </div>
      )}
    </div>
  );
}
