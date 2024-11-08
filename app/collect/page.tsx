"use client";

import { useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";



const hautsDeSeineCities = [
    "Antony",
    "Asnières-sur-Seine",
    "Bagneux",
    "Bois-Colombes",
    "Boulogne-Billancourt",
    "Bourg-la-Reine",
    "Châtenay-Malabry",
    "Châtillon",
    "Clamart",
    "Clichy",
    "Colombes",
    "Courbevoie",
    "Fontenay-aux-Roses",
    "Garches",
    "Gennevilliers",
    "Issy-les-Moulineaux",
    "La Garenne-Colombes",
    "Le Plessis-Robinson",
    "Levallois-Perret",
    "Malakoff",
    "Marnes-la-Coquette",
    "Meudon",
    "Montrouge",
    "Nanterre",
    "Neuilly-sur-Seine",
    "Rueil-Malmaison",
    "Sèvres",
    "Suresnes",
    "Vanves",
    "Vaucresson",
    "Ville-d'Avray",
    "Villeneuve-la-Garenne"
]
  
const mockCollectPoints = [
    {
      name: "Déchetterie de Boulogne-Billancourt",
      address: "36 Quai Alphonse Le Gallo",
      city: "Boulogne-Billancourt",
      urlLocation: "https://www.google.com/maps/place/36+Quai+Alphonse+le+Gallo,+92100+Boulogne-Billancourt/",
      phoneNumber: "01 55 18 53 00"
    },
    {
      name: "Déchetterie de Suresnes",
      address: "1 Rue Benoît Malon",
      city: "Suresnes",
      urlLocation: "https://www.google.com/maps/place/1+Rue+Beno%C3%AEt+Malon,+92150+Suresnes/",
      phoneNumber: "01 41 18 19 20"
    },
    {
      name: "Déchetterie d'Issy-les-Moulineaux",
      address: "15 Rue Jean-Jacques Rousseau",
      city: "Issy-les-Moulineaux",
      urlLocation: "https://www.google.com/maps/place/15+Rue+Jean-Jacques+Rousseau,+92130+Issy-les-Moulineaux/",
      phoneNumber: "01 40 95 66 00"
    },
    {
      name: "Déchetterie de Courbevoie",
      address: "3 Rue du Président Kruger",
      city: "Courbevoie",
      urlLocation: "https://www.google.com/maps/place/3+Rue+du+Pr%C3%A9sident+Kruger,+92400+Courbevoie/",
      phoneNumber: "01 47 68 51 00"
    },
    {
      name: "Déchetterie de Montrouge",
      address: "10 Avenue de la République",
      city: "Montrouge",
      urlLocation: "https://www.google.com/maps/place/10+Avenue+de+la+R%C3%A9publique,+92120+Montrouge/",
      phoneNumber: "01 46 12 76 00"
    }
];
  
export default function CollectPoint() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");

  const filteredPoints = mockCollectPoints.filter(point => {
    const matchesSearch = 
      point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = selectedCity === "all" || point.city === selectedCity;
    
    return matchesSearch && matchesCity;
  });

  const handleCityChange = (value: string) => {
      setSelectedCity(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Points de Collecte</h1>
      
      <div className="flex gap-4 items-center mb-6">
        <Input 
          placeholder="Rechercher un point de collecte..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
         value={selectedCity}
         onValueChange={handleCityChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ville" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les villes</SelectItem>
            {hautsDeSeineCities.map((city, index) => (
              <SelectItem key={index} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredPoints.map((point, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">{point.name}</h2>
                  
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{point.address}, {point.city}</span>
                    </div>
  
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <a href={`tel:${point.phoneNumber}`} className="hover:text-blue-600">
                        {point.phoneNumber}
                      </a>
                    </div>
                  </div>
                </div>
                
                <a 
                  href={point.urlLocation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  {/* <ExternalLink className="h-4 w-4" /> */}
                  <MapPin className="h-4 w-4" />
                  <span>Voir sur la carte</span>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPoints.length === 0 && (
          <p className="text-center text-gray-500 col-span-2">
            Aucun point de collecte trouvé pour votre recherche.
          </p>
        )}
      </div>
    </div>
  );
}