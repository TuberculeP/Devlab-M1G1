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
import type { Repairer } from "@/types/repairer";

//TODO move this to backend 
const api_key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const repairer = [
    {
        "name": "Pixou Phone Nanterre",
        "address": "65 Rue Maurice Thorez, 92000 Nanterre, France",
        "phone": "01 40 88 00 22",
        "services": ["Réparation de téléphones", "Réparation de tablettes", "Réparation d'ordinateurs"],
        "supported_devices": ["Téléphone", "Tablette", "Ordinateur"],
        "site_web": "https://pixouphone.fr/cliniques/pixou-phone-nanterre/",
        "coordinates": "48.894005,2.195941"
    },
    {
        "name": "01-Portable",
        "address": "32 Rue Léon Maurice Nordmann, 92250 La Garenne-Colombes, France",
        "phone": "01 56 83 25 67",
        "services": ["Réparation d'ordinateurs portables", "Réparation de MacBook", "Réparation d'iPhone"],
        "supported_devices": ["MacBook", "iPhone", "Ordinateur"],
        "site_web": "https://www.01-portable.fr/",
        "coordinates": "48.903025,2.242195"
    },
    {
        "name": "Docteur IT Issy-les-Moulineaux",
        "address": "Centre Commercial Les Trois Moulineaux, 3 Allée Sainte Lucie, 92130 Issy-les-Moulineaux, France",
        "phone": "01 87 42 54 70",
        "services": ["Réparation de téléphones portables", "Réparation de tablettes tactiles", "Réparation d'ordinateurs portables et de bureau", "Réparation de consoles de jeux", "Réparation d'iPod"],
        "supported_devices": ["Téléphone", "Tablette", "Ordinateur", "Console de jeux", "iPod"],
        "site_web": "https://issy.docteur-it.com/",
        "coordinates": "48.8231,2.2631"
    },
    {
        "name": "Laurent Dépannage PC et Mac",
        "address": "5 Villa des Sablons, 92200 Neuilly-sur-Seine, France",
        "phone": "06 01 76 98 86",
        "services": ["Suppression de virus", "Remplacement de disques durs", "Réparation d'écrans cassés", "Récupération de données", "Installation complète de nouveaux PC ou Mac"],
        "supported_devices": ["PC", "MacBook", "PC portable", "PC de bureau"],
        "site_web": "https://www.jesuisreparateur.fr/reparateur/56079",
        "coordinates": "48.8846,2.2686"
    },
    {
        "name": "Arkadia PC",
        "address": "Boulogne-Billancourt, 92100, France",
        "phone": "01 47 08 98 38",
        "services": ["Dépannage informatique à domicile", "Réparation d'ordinateurs de bureau", "Réparation d'ordinateurs portables"],
        "supported_devices": ["PC", "Ordinateur", "PC portable"],
        "site_web": "https://www.arkadia-pc.fr/services-hauts-de-seine/depannage/ordinateur/boulogne-billancourt/",
        "coordinates": "48.8355,2.2412"
    },
    {
        "name": "Tech in Clic",
        "address": "Hauts-de-Seine, France",
        "phone": "09 70 38 24 23",
        "services": ["Dépannage informatique à domicile", "Réparation d'ordinateurs"],
        "supported_devices": ["PC", "Ordinateur"],
        "site_web": "https://techinclic.fr/service/informatique/depannage-reparateurs-informatiques/ile-de-france/hauts-de-seine",
        "coordinates": "48.8600,2.2068"
    },
    {
        "name": "Le Comptoir des Mobiles",
        "address": "27 Rue de Chartres, 92200 Neuilly-sur-Seine, France",
        "phone": "01 41 92 82 04",
        "services": ["Réparation de smartphones", "Réparation d'ordinateurs portables", "Réparation de MacBook", "Réparation de Samsung"],
        "supported_devices": ["Téléphone", "PC portable", "MacBook", "Samsung"],
        "site_web": "https://www.lecomptoirdesmobiles.com/",
        "coordinates": "48.8840,2.2685"
    },
    {
        "name": "Tech Center",
        "address": "Île-de-France, France",
        "phone": "Non spécifié",
        "services": ["Dépannage informatique à domicile", "Réparation de PC et Mac"],
        "supported_devices": ["PC", "Mac"],
        "site_web": "https://techcenterivry.com/",
        "coordinates": "48.8600,2.3500"
    }
];
const hautsDeSeineCities = [
    "Antony",
    "Asnières-sur-Seine",
    "Bagneux",
    "Bois-Colombes",
    "Boulogne-Billancourt",
    "Bourg-la-Reine",
    "Châtenay-Malabry",
    "Châtillon",
    "Chaville",
    "Clamart",
    "Clichy",
    "Colombes",
    "Courbevoie",
    "Fontenay-aux-Roses",
    "Garches",
    "La Garenne-Colombes",
    "Gennevilliers",
    "Issy-les-Moulineaux",
    "Levallois-Perret",
    "Malakoff",
    "Marnes-la-Coquette",
    "Meudon",
    "Montrouge",
    "Nanterre",
    "Neuilly-sur-Seine",
    "Puteaux",
    "Rueil-Malmaison",
    "Saint-Cloud",
    "Sceaux",
    "Sèvres",
    "Suresnes",
    "Vanves",
    "Vaucresson",
    "Ville-d'Avray",
    "Villeneuve-la-Garenne"
];
const devices = [
    "Téléphone",
    "Tablette",
    "Ordinateur",
    "Console de jeux",
    "iPod",
    "PC",
    "MacBook",
    "iPhone",
    "Mac",
    "PC portable",
    "PC de bureau",
    "Samsung"
];

export default function FindARepairer() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCity, setSelectedCity] = useState("all");
    const [selectedDevice, setSelectedDevice] = useState("all");
    const [selectedRepairer, setSelectedRepairer] = useState({} as Repairer);
    const [nearestRepairer] = useState({} as Repairer);
  
    const filteredRepairer = repairer.filter((repairer) => {
      if (selectedCity !== "all" && !repairer.address.includes(selectedCity)) {
        return false;
      }
      if (selectedDevice !== "all") {
        const deviceFound = repairer.supported_devices.find((service) => service.includes(selectedDevice));
        if (!deviceFound) {
          return false;
        }
      }
      if (searchTerm && !repairer.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
  
    const handleDeviceChange = (value: string) => setSelectedDevice(value);
  
    const handleCityChange = (value: string) => setSelectedCity(value);
  
    const handleCardClick = (repairer: Repairer) => setSelectedRepairer(repairer);
  
    const mapUrl = selectedRepairer
        ? `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${selectedRepairer.address}`
        : nearestRepairer
        ? `https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${nearestRepairer.address}`
        : `https://www.google.com/maps/embed/v1/view?key=${api_key}&center=48.8566,2.3522&zoom=11`; // Default to Paris

    return (
      <div className="container mx-auto px-4 pt-24 pb-10 flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-6">Trouver un réparateur</h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Input
            placeholder="Rechercher un réparateur"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2"
          />
          <Select value={selectedCity} onValueChange={handleCityChange}>
            <SelectTrigger>
              <SelectValue>{selectedCity === "all" ? "Toutes les villes" : selectedCity}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les villes</SelectItem>
              {hautsDeSeineCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedDevice} onValueChange={handleDeviceChange}>
            <SelectTrigger>
              <SelectValue>
                {selectedDevice === "all" ? "Tous les appareils" : selectedDevice}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les appareils</SelectItem>
              {devices.map((device) => (
                <SelectItem key={device} value={device}>
                  {device}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="h-96 rounded overflow-hidden shadow-lg mb-6">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
         <div className="flex flex-col gap-4">
            {filteredRepairer.map((repairer, index) => (
                <Card key={index} onClick={() => handleCardClick(repairer)}  className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col gap-2">
                        <h2 className="text-xl font-bold">{repairer.name}</h2>
                        <div className="flex items-center text-sm text-gray-500 gap-2">
                            <MapPin size={16} /> 
                            <p>{repairer.address}</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 gap-2">
                            <Phone size={16} /> 
                            <p>{repairer.phone}</p>
                        </div>
                        <ul className="list-disc list-inside">
                        {repairer.services.map((service, index) => (
                            <li key={index} className="text-sm">
                            {service}
                            </li>
                        ))}
                        </ul>
                        <a
                            href={repairer.site_web}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Site web
                        </a>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    );
  }