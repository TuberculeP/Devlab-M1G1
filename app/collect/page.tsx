"use client";
import { useState, useEffect, useContext } from "react";
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
import apiClient from "@/lib/apiClient";
import { CollectPoint as CollectPointType } from "@/types/collect-points";
import { LightAndDarkModeContext } from "@/context/lightAndDarkMode";

const api_key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

interface City {
  id: number;
  name: string;
  coordinates: string;
}

interface CollectPointsResponse {
  data: CollectPointType[];
  total: number;
}

export default function CollectPoints() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [collectPoints, setCollectPoints] = useState<CollectPointsResponse | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<CollectPointType | null>(null);
  const limit = 20;

  const fetchCities = async () => {
    const [data, error] = await apiClient.getRequest<City[]>('/api/cities');
    if (error) {
      console.error('Error fetching cities:', error);
      return;
    }
    setCities(data);
  };

  const fetchCollectPoints = async () => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.append('type', 'collect_point');
    if (selectedCity !== 'all') {
      const city = cities.find(c => c.name === selectedCity);
      if (city) {
        params.append('cityId', city.id.toString());
      }
    }
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const [data, error] = await apiClient.getRequest<CollectPointsResponse>(`/api/collect-points?${params.toString()}`);
    
    setIsLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setCollectPoints(data);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    fetchCollectPoints();
  }, [selectedCity, page, cities]);

  const { isDark } = useContext(LightAndDarkModeContext)!;
  
  const filteredPoints = collectPoints?.data.filter(point => {
    const matchesSearch = 
      point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  }) ?? [];

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    setPage(1);
  };

  const getMapUrl = () => {
    const baseUrl = "https://www.google.com/maps/embed/v1/";
    if (selectedPoint) {
      return `${baseUrl}place?key=${api_key}&q=${encodeURIComponent(`${selectedPoint.name}, ${selectedPoint.address}, ${selectedPoint.city}`)}`;
    }
    if (selectedCity !== "all") {
      const city = cities.find(c => c.name === selectedCity);
      if (!city) {
        const defaultCoords = cities.length > 0 ? cities[0].coordinates : "48.8922,2.2417";
        return `${baseUrl}search?key=${api_key}&q=déchetterie+hauts+de+seine&center=${defaultCoords}&zoom=11`;
      }
      return `${baseUrl}search?key=${api_key}&q=déchetterie+${selectedCity}&center=${city.coordinates}&zoom=14`;
    }
    const defaultCoords = cities.length > 0 ? cities[0].coordinates : "48.8922,2.2417";
    return `${baseUrl}search?key=${api_key}&q=déchetterie+hauts+de+seine&center=${defaultCoords}&zoom=11`;
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-10">
        <p className="text-red-500">Une erreur est survenue lors du chargement des points de collecte: {error}</p>
      </div>
    );
  }

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
            {cities.map((city) => (
              <SelectItem key={city.id} value={city.name}>
                {city.name}
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

      {isLoading ? (
        <div className="flex justify-center">
          <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? "border-white" : "border-gray-900"}`}></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {filteredPoints.map((point) => (
            <Card 
              key={point.id} 
              className={`hover:shadow-lg transition-shadow cursor-pointer ${isDark ? "bg-gray-800 text-white" : ""}`}
              onClick={() => setSelectedPoint(point)}
            >
              <CardContent className="p-6">
                <div className={`flex justify-between items-start ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">{point.name}</h2>
                    
                    <div className={`space-y-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{point.address}, {point.city}</span>
                      </div>
      
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${point.phone_number}`} className={`${isDark ? "hover:text-blue-400" : "hover:text-blue-600"}`}>
                          {point.phone_number}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <a 
                    href={point.url_location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:underline"}`}
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Voir sur la carte</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredPoints.length === 0 && (
            <p className={`text-center ${isDark ? "text-gray-300" : "text-gray-500"} col-span-2`}>
              Aucun point de collecte trouvé pour votre recherche.
            </p>
          )}
        </div>
      )}

      {collectPoints?.total && collectPoints.total > limit && (
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-4 py-2 border rounded-lg disabled:opacity-50 ${isDark ? "text-white border-gray-600" : ""}`}
          >
            Précédent
          </button>
          <span className={`px-4 py-2 ${isDark ? "text-white" : ""}`}>
            Page {page} sur {Math.ceil(collectPoints.total / limit)}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= Math.ceil(collectPoints.total / limit)}
            className={`px-4 py-2 border rounded-lg disabled:opacity-50 ${isDark ? "text-white border-gray-600" : ""}`}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}