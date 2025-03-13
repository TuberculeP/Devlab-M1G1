"use client";
import { useContext, useState } from "react";
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
import { LightAndDarkModeContext } from "@/context/lightAndDarkMode";


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
  },
  {
      name: "Déchetterie d'Antony",
      address: "5 Rue des Sources",
      city: "Antony",
      urlLocation: "https://www.google.com/maps/place/5+Rue+des+Sources,+92160+Antony/",
      phoneNumber: "01 47 02 80 00"
  },
  {
      name: "Déchetterie d'Asnières-sur-Seine",
      address: "12 Rue de la Mairie",
      city: "Asnières-sur-Seine",
      urlLocation: "https://www.google.com/maps/place/12+Rue+de+la+Mairie,+92600+Asni%C3%A8res-sur-Seine/",
      phoneNumber: "01 47 33 85 00"
  },
  {
      name: "Déchetterie de Bagneux",
      address: "22 Rue des Fleurs",
      city: "Bagneux",
      urlLocation: "https://www.google.com/maps/place/22+Rue+des+Fleurs,+92220+Bagneux/",
      phoneNumber: "01 46 73 99 00"
  },
  {
      name: "Déchetterie de Bois-Colombes",
      address: "8 Rue des Peupliers",
      city: "Bois-Colombes",
      urlLocation: "https://www.google.com/maps/place/8+Rue+des+Peupliers,+92270+Bois-Colombes/",
      phoneNumber: "01 43 01 90 00"
  },
  {
      name: "Déchetterie de Bourg-la-Reine",
      address: "14 Avenue Victor Hugo",
      city: "Bourg-la-Reine",
      urlLocation: "https://www.google.com/maps/place/14+Avenue+Victor+Hugo,+92340+Bourg-la-Reine/",
      phoneNumber: "01 47 16 80 00"
  },
  {
      name: "Déchetterie de Châtenay-Malabry",
      address: "7 Rue des Acacias",
      city: "Châtenay-Malabry",
      urlLocation: "https://www.google.com/maps/place/7+Rue+des+Acacias,+92290+Ch%C3%A2tenay-Malabry/",
      phoneNumber: "01 46 61 77 00"
  },
  {
      name: "Déchetterie de Châtillon",
      address: "9 Avenue des Écoles",
      city: "Châtillon",
      urlLocation: "https://www.google.com/maps/place/9+Avenue+des+%C3%89coles,+92320+Ch%C3%A2tillon/",
      phoneNumber: "01 46 72 88 00"
  },
  {
      name: "Déchetterie de Clamart",
      address: "18 Rue de la Paix",
      city: "Clamart",
      urlLocation: "https://www.google.com/maps/place/18+Rue+de+la+Paix,+92140+Clamart/",
      phoneNumber: "01 47 15 91 00"
  },
  {
      name: "Déchetterie de Clichy",
      address: "20 Rue Jean Jaurès",
      city: "Clichy",
      urlLocation: "https://www.google.com/maps/place/20+Rue+Jean+Jaur%C3%A8s,+92110+Clichy/",
      phoneNumber: "01 41 11 65 00"
  },
  {
      name: "Déchetterie de Colombes",
      address: "15 Boulevard des Nations",
      city: "Colombes",
      urlLocation: "https://www.google.com/maps/place/15+Boulevard+des+Nations,+92700+Colombes/",
      phoneNumber: "01 46 15 82 00"
  },
  {
      name: "Déchetterie de Fontenay-aux-Roses",
      address: "6 Rue Victor Hugo",
      city: "Fontenay-aux-Roses",
      urlLocation: "https://www.google.com/maps/place/6+Rue+Victor+Hugo,+92260+Fontenay-aux-Roses/",
      phoneNumber: "01 41 45 90 00"
  },
  {
      name: "Déchetterie de Garches",
      address: "11 Rue de la République",
      city: "Garches",
      urlLocation: "https://www.google.com/maps/place/11+Rue+de+la+R%C3%A9publique,+92380+Garches/",
      phoneNumber: "01 47 41 91 00"
  },
  {
      name: "Déchetterie de Gennevilliers",
      address: "19 Rue du Port",
      city: "Gennevilliers",
      urlLocation: "https://www.google.com/maps/place/19+Rue+du+Port,+92230+Gennevilliers/",
      phoneNumber: "01 47 92 80 00"
  },
  {
      name: "Déchetterie de La Garenne-Colombes",
      address: "13 Avenue du Général Leclerc",
      city: "La Garenne-Colombes",
      urlLocation: "https://www.google.com/maps/place/13+Avenue+du+G%C3%A9n%C3%A9ral+Leclerc,+92250+La+Garenne-Colombes/",
      phoneNumber: "01 41 16 86 00"
  },
  {
      name: "Déchetterie de Levallois-Perret",
      address: "3 Rue Louis Blanc",
      city: "Levallois-Perret",
      urlLocation: "https://www.google.com/maps/place/3+Rue+Louis+Blanc,+92300+Levallois-Perret/",
      phoneNumber: "01 41 34 78 00"
  },
  {
      name: "Déchetterie de Malakoff",
      address: "22 Rue Étienne Dolet",
      city: "Malakoff",
      urlLocation: "https://www.google.com/maps/place/22+Rue+%C3%89tienne+Dolet,+92240+Malakoff/",
      phoneNumber: "01 46 07 93 00"
  },
  {
      name: "Déchetterie de Marnes-la-Coquette",
      address: "10 Rue de Versailles",
      city: "Marnes-la-Coquette",
      urlLocation: "https://www.google.com/maps/place/10+Rue+de+Versailles,+92430+Marnes-la-Coquette/",
      phoneNumber: "01 47 53 81 00"
  },
  {
      name: "Déchetterie de Meudon",
      address: "12 Rue Henri Barbusse",
      city: "Meudon",
      urlLocation: "https://www.google.com/maps/place/12+Rue+Henri+Barbusse,+92190+Meudon/",
      phoneNumber: "01 41 28 75 00"
  },
  {
      name: "Déchetterie de Nanterre",
      address: "8 Boulevard de la Défense",
      city: "Nanterre",
      urlLocation: "https://www.google.com/maps/place/8+Boulevard+de+la+D%C3%A9fense,+92000+Nanterre/",
      phoneNumber: "01 47 52 95 00"
  },
  {
      name: "Déchetterie de Neuilly-sur-Seine",
      address: "4 Rue de Longchamp",
      city: "Neuilly-sur-Seine",
      urlLocation: "https://www.google.com/maps/place/4+Rue+de+Longchamp,+92200+Neuilly-sur-Seine/",
      phoneNumber: "01 47 47 87 00"
  },
  {
      name: "Déchetterie de Rueil-Malmaison",
      address: "18 Rue des Martinets",
      city: "Rueil-Malmaison",
      urlLocation: "https://www.google.com/maps/place/18+Rue+des+Martinets,+92500+Rueil-Malmaison/",
      phoneNumber: "01 41 96 76 00"
  },
  {
      name: "Déchetterie de Sèvres",
      address: "20 Rue Brancas",
      city: "Sèvres",
      urlLocation: "https://www.google.com/maps/place/20+Rue+Brancas,+92310+S%C3%A8vres/",
      phoneNumber: "01 41 34 89 00"
  },
  {
      name: "Déchetterie de Vanves",
      address: "6 Rue Jean Bleuzen",
      city: "Vanves",
      urlLocation: "https://www.google.com/maps/place/6+Rue+Jean+Bleuzen,+92170+Vanves/",
      phoneNumber: "01 46 38 87 00"
  },
  {
      name: "Déchetterie de Vaucresson",
      address: "9 Rue de Saint-Cloud",
      city: "Vaucresson",
      urlLocation: "https://www.google.com/maps/place/9+Rue+de+Saint-Cloud,+92420+Vaucresson/",
      phoneNumber: "01 47 40 78 00"
  },
  {
      name: "Déchetterie de Ville-d'Avray",
      address: "5 Rue de la Prairie",
      city: "Ville-d'Avray",
      urlLocation: "https://www.google.com/maps/place/5+Rue+de+la+Prairie,+92410+Ville-d'Avray/",
      phoneNumber: "01 41 15 94 00"
  },
  {
      name: "Déchetterie de Villeneuve-la-Garenne",
      address: "14 Rue des Quais",
      city: "Villeneuve-la-Garenne",
      urlLocation: "https://www.google.com/maps/place/14+Rue+des+Quais,+92390+Villeneuve-la-Garenne/",
      phoneNumber: "01 46 92 71 00"
  }
];

//

export default function CollectPoint() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");

  const { isDark } = useContext(LightAndDarkModeContext)!;

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

  const getMapUrl = () => {
    const baseUrl = "https://www.google.com/maps/embed/v1/search";
    //TODO : get precise collect center to narrow the search by city ( ex :q=déchetterie+hauts+de+seine&center not enough )
    if (selectedCity !== "all") {
      if (!cityCoordinates[selectedCity]) {
        return `${baseUrl}?key=${api_key}&q=déchetterie+hauts+de+seine&center=${cityCoordinates.all}&zoom=11`;
      }
      const coordinates = cityCoordinates[selectedCity];
      return `${baseUrl}?key=${api_key}&q=déchetterie+${selectedCity}&center=${coordinates}&zoom=14`;
    }
    console.log(cityCoordinates.all);
    return `${baseUrl}?key=${api_key}&q=déchetterie+hauts+de+seine&center=${cityCoordinates.all}&zoom=11`;
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-10">
      <h1 className={`${isDark ? "text-white" : ""} text-2xl font-bold mb-6 `}>Points de Collecte</h1>
      <div className="flex gap-4 items-center mb-6">
        <Input 
          placeholder="Rechercher un point de collecte..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={isDark ? "text-white" : ""}
        />
        <Select
          value={selectedCity}
          onValueChange={handleCityChange}
        >
          <SelectTrigger className={`${isDark ? "text-white" : ""} w-[180px]`}>
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

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
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