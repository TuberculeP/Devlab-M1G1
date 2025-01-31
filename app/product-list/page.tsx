"use client";

import useUserHook from "@/hooks/userHook";
import { useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import React from "react";
import ProductTable from "@/components/product-list/Table";
import ExportDialog from "@/components/product-list/ExportDialog";

export default function ProductList() {
  const { loading, fetchUserData } = useUserHook();
  useEffect(() => {
    fetchUserData();
  }, []);
  const mockData = [
    {
      id: 1,
      materialName: "Ordinateur Dell",
      userInfo: "Jean.Dupont@gmail.com",
      certificate: "Certificat 1",
      status: "En cours",
    },
    {
      id: 2,
      materialName: "Écran HP",
      userInfo: "Alice.Martin@gmail.com",
      certificate: "Certificat 2",
      status: "Statut 2",
    },
    {
      id: 3,
      materialName: "Clavier Logitech",
      userInfo: "Paul.Durand@gmail.com",
      certificate: "Certificat 3",
      status: "Status 3",
    },
    {
      id: 4,
      materialName: "Souris Microsoft",
      userInfo: "Marie.Curie@gmail.com",
      certificate: "Certificat 4",
      status: "En cours",
    },
    {
      id: 5,
      materialName: "Imprimante Canon",
      userInfo: "Luc Einstein",
      certificate: "Certificat 5",
      status: "Statut 2",
    },
  ];

  return (
    <>
      {loading ? (
        <div className="grid place-items-center min-h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="min-h-screen p-8 pb-20 gap-3 sm:p-20 font-[family-name:var(--font-geist-sans)] flex flex-col">
          <h1 className="text-2xl font-bold my-6">
            Petit message de bienvenue !
          </h1>
          <div className="flex justify-between items-center">
            <ExportDialog />
            <div className="flex gap-3">
              <Input className="max-w-96" placeholder="Rechercher" />
              <Button variant={"outline"}>Exporter</Button>
            </div>
          </div>
          <div>
            <ProductTable />
          </div>
        </div>
      )}
    </>
  );
}
