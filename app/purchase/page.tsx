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
import type { PurchasePoint } from "@/types/purchasePoint";

//TODO move this to backend 
const api_key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const cityCoordinates: { [key: string]: string } = {
  "Antony": "48.7543,2.3020",
  "Asnières-sur-Seine": "48.9147,2.2874",
  "Bagneux": "48.7978,2.3083",
  "Bois-Colombes": "48.9171,2.2566",
  "Boulogne-Billancourt": "48.8333,2.2500",
  "Bourg-la-Reine": "48.7808,2.3178",
  "Châtenay-Malabry": "48.7672,2.2693",
  "Châtillon": "48.8024,2.2946",
  "Clamart": "48.7996,2.2667",
  "Clichy": "48.9068,2.3047",
  "Colombes": "48.9184,2.2542",
  "Courbevoie": "48.8972,2.2567",
  "Fontenay-aux-Roses": "48.7889,2.2925",
  "Garches": "48.8426,2.1858",
  "Gennevilliers": "48.9298,2.3030",
  "Issy-les-Moulineaux": "48.8256,2.2741",
  "La Garenne-Colombes": "48.9065,2.2457",
  "Le Plessis-Robinson": "48.7806,2.2660",
  "Levallois-Perret": "48.8932,2.2889",
  "Malakoff": "48.8194,2.3011",
  "Marnes-la-Coquette": "48.8364,2.1778",
  "Meudon": "48.8133,2.2356",
  "Montrouge": "48.8183,2.3194",
  "Nanterre": "48.8925,2.2068",
  "Neuilly-sur-Seine": "48.8846,2.2691",
  "Rueil-Malmaison": "48.8765,2.1894",
  "Sèvres": "48.8222,2.2061",
  "Suresnes": "48.8692,2.2289",
  "Vanves": "48.8236,2.2914",
  "Vaucresson": "48.8408,2.1647",
  "Ville-d'Avray": "48.8226,2.1919",
  "Villeneuve-la-Garenne": "48.9441,2.3319",
  "all": "48.8922,2.2417"
};
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
//NOT REAL DATA -> this will not work for production
const mockPurchasePoints = [
  {
    "name": "Darty La Défense",
    "address": "2 Parvis de la Défense, Centre Commercial des 4 Temps, 92800 Puteaux",
    "city": "Puteaux",
    "urlLocation": "https://magasin.darty.com/15-darty-gennevilliers",
    "phoneNumber": "+33 892 01 10 10"
  },
  {
    "name": "Darty Boulogne",
    "address": "122 Avenue du Général Leclerc, 92100 Boulogne-Billancourt",
    "city": "Boulogne-Billancourt",
    "urlLocation": "https://magasin.darty.com/15-darty-gennevilliers",
    "phoneNumber": "+33 892 01 10 10"
  },
  {
    "name": "Darty Gennevilliers",
    "address": "106 Avenue du Vieux Chemin de Saint Denis, Centre commercial Enox Parc des Chanteraines, 92230 Gennevilliers",
    "city": "Gennevilliers",
    "urlLocation": "https://magasin.darty.com/15-darty-gennevilliers",
    "phoneNumber": "+33 892 01 10 10"
  },
  {
    "name": "Boulanger Gennevilliers",
    "address": "ZAC des Barbanniers, 1 Rue du Moulin de Cage, 92230 Gennevilliers",
    "city": "Gennevilliers",
    "urlLocation": "https://www.boulanger.com/magasins/",
    "phoneNumber": "Non disponible"
  },
  {
    "name": "BUT Nanterre",
    "address": "200 Avenue Georges Clemenceau, 92000 Nanterre",
    "city": "Nanterre",
    "urlLocation": "https://www.but.fr/magasins/Hauts-de-Seine/index-d92.html",
    "phoneNumber": "Non disponible"
  },
  {
    "name": "Electro Dépôt Gennevilliers",
    "address": "106 Avenue du Vieux Chemin de Saint Denis, 92230 Gennevilliers",
    "city": "Gennevilliers",
    "urlLocation": "https://magasins.electrodepot.fr/fr",
    "phoneNumber": "Non disponible"
  },
  {
    "name": "Extra Issy-les-Moulineaux",
    "address": "Adresse non spécifiée",
    "city": "Issy-les-Moulineaux",
    "urlLocation": "https://magasin.extra.fr/departement/hauts-de-seine",
    "phoneNumber": "Non disponible"
  },
  {
    "name": "Pulsat Nanterre",
    "address": "Adresse non spécifiée",
    "city": "Nanterre",
    "urlLocation": "https://magasins.pulsat.fr/17-pulsat-nanterre",
    "phoneNumber": "Non disponible"
  }
]
//

export default function PurchasePoint() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedPurchase, setSelectedPurchase] = useState(null as PurchasePoint | null);

  const filteredPoints = mockPurchasePoints.filter(point => {
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

  const handleCardClick = (purchase: PurchasePoint) => setSelectedPurchase(purchase);
  

  const getMapUrl = () => {
    const baseUrl = "https://www.google.com/maps/embed/v1/search";
    if (selectedCity !== "all") {
      if (!cityCoordinates[selectedCity]) {
        //TODO : get precise query for shop location more than 'electronics store'
        return `${baseUrl}?key=${api_key}&q=electronics+store+hauts+de+seine&center=${cityCoordinates.all}&zoom=11`;
      }
      const coordinates = cityCoordinates[selectedCity];
      return `${baseUrl}?key=${api_key}&q=electronics+store+${selectedCity}&center=${coordinates}&zoom=14`;
    }
    if(selectedPurchase){
      return `${baseUrl}?key=${api_key}&q=electronics+store+${selectedPurchase.address}&zoom=14`;
    }
    console.log(cityCoordinates.all);
    return `${baseUrl}?key=${api_key}&q=electronics+store+hauts+de+seine&center=${cityCoordinates.all}&zoom=11`;
  };


  
  return (
    <div className="container mx-auto px-4 pt-24 pb-10">
      <h1 className="text-2xl font-bold mb-6 ">Points d&apos;achat</h1>
      <div className="flex gap-4 items-center mb-6">
        <Input 
          placeholder="Rechercher un point d'achat..."
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

      <div className="mb-8 h-[400px] rounded-lg overflow-hidden shadow-lg">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={getMapUrl()}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredPoints.map((point, index) => (
          <Card key={index} onClick={() => handleCardClick(point)} className="hover:shadow-lg transition-shadow">
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
                  <MapPin className="h-4 w-4" />
                  <span className="whitespace-nowrap">Voir sur la carte</span>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredPoints.length === 0 && (
          <p className="text-center text-gray-500 col-span-2">
            Aucun points d&apos;achat trouvé pour votre recherche.
          </p>
        )}
      </div>
    </div>
  );
}