"use client";

import useUserHook from "@/hooks/userHook";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React from "react";
import ProductTable from "@/components/product-list/Table";
import ExportDialog from "@/components/product-list/ExportDialog";
import { downloadCSV } from "@/utils/exportUtils";

export default function AdminProductList() {
  const { loading, fetchUserData } = useUserHook();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for the product list
  const mockData = [
    {
      id: 1,
      materialName: "Ordinateur Dell",
      userInfo: "Jean Dupont",
      certificate: "Certificat_1.pdf",
      status: "En cours",
    },
    {
      id: 2,
      materialName: "Écran HP",
      userInfo: "Alice Martin",
      certificate: "",
      status: "Statut 2",
    },
    {
      id: 3,
      materialName: "Clavier Logitech",
      userInfo: "Paul Durand",
      certificate: "Certificat_3.pdf",
      status: "Status 3",
    },
    {
      id: 4,
      materialName: "Souris Microsoft",
      userInfo: "Marie Curie",
      certificate: "Certificat_4.pdf",
      status: "En cours",
    },
    {
      id: 5,
      materialName: "Imprimante Canon",
      userInfo: "Luc Einstein",
      certificate: "",
      status: "Statut 2",
    },
  ];

  // Handle export functionality
  const handleExport = () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    downloadCSV(mockData, `produits-export-${timestamp}.csv`);
  };
  
  useEffect(() => {
    fetchUserData();
  }, []);
  
  return (
    <div className="min-h-screen p-6 pb-20 gap-3 font-[family-name:var(--font-geist-sans)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Liste des produits</h1>
        <Button variant="outline" onClick={() => window.history.back()}>Retour</Button>
      </div>
      
      {loading ? (
        <div className="grid place-items-center min-h-[50vh]">
          <p>Chargement...</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <ExportDialog />
              <div className="flex gap-3">
                <Input 
                  className="max-w-96" 
                  placeholder="Rechercher" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button 
                  variant="outline"
                  onClick={handleExport}
                  className="bg-green-50 hover:bg-green-100 text-green-700 border-green-300"
                >
                  Exporter CSV
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <ProductTable />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
