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
import { CollectPoint } from "@/types/collect-points";
import { LightAndDarkModeContext } from "@/context/lightAndDarkMode";
import apiClient from "@/lib/apiClient";

const api_key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

interface City {
  id: number;
  name: string;
  coordinates: string;
}

interface CollectPointsResponse {
  data: CollectPoint[];
  total: number;
}

// List of devices for the filter
const devices = [
  "Smartphone",
  "Tablette",
  "Ordinateur portable",
  "Ordinateur de bureau",
  "Télévision",
  "Électroménager"
];

export default function RepairerPoints() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState("all");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [repairers, setRepairers] = useState<CollectPointsResponse | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<CollectPoint | null>(null);
  const limit = 20;
  const { isDark } = useContext(LightAndDarkModeContext)!;

  const fetchCities = async () => {
    const [data, error] = await apiClient.getRequest<City[]>('/api/cities');
    if (error) {
      console.error('Error fetching cities:', error);
      return;
    }
    setCities(data);
  };

  const fetchRepairers = async () => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.append('type', 'repairer');
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
    setRepairers(data);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    fetchRepairers();
  }, [selectedCity, page, cities]);

  const filteredPoints = repairers?.data.filter(point => {
    // First filter by search term
    console.log(point);
    const matchesSearch = 
      point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then filter by device if selected
    if (selectedDevice !== "all" && point.supported_devices) {
      const deviceFound = point.supported_devices.some(device => 
        device.toLowerCase().includes(selectedDevice.toLowerCase())
      );
      return matchesSearch && deviceFound;
    }
    
    return matchesSearch;
  }) ?? [];

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    setPage(1); 
  };

  const handleDeviceChange = (value: string) => {
    setSelectedDevice(value);
    setPage(1);
  };

  const getMapUrl = () => {
    const baseUrl = "https://www.google.com/maps/embed/v1/";
    if (selectedPoint) {
      return `${baseUrl}place?key=${api_key}&q=${encodeURIComponent(`${selectedPoint.name}, ${selectedPoint.address}, ${selectedPoint.city}`)}`;}
    if (selectedCity !== "all") {
      const city = cities.find(c => c.name === selectedCity);
      if (!city) {
        const defaultCoords = cities.length > 0 ? cities[0].coordinates : "48.8922,2.2417";
        return `${baseUrl}search?key=${api_key}&q=réparateur+hauts+de+seine&center=${defaultCoords}&zoom=11`;
      }
      return `${baseUrl}search?key=${api_key}&q=réparateur+${selectedCity}&center=${city.coordinates}&zoom=14`;
    }
    const defaultCoords = cities.length > 0 ? cities[0].coordinates : "48.8922,2.2417";
    return `${baseUrl}search?key=${api_key}&q=réparateur+hauts+de+seine&center=${defaultCoords}&zoom=11`;
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-10">
        <p className="text-red-500">Une erreur est survenue lors du chargement des réparateurs: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-10">
      <h1 className={`${isDark ? "text-white" : ""} text-2xl font-bold mb-6`}>Réparateurs</h1>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-6">
        <Input 
          placeholder="Rechercher un réparateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${isDark ? "text-white" : ""}`}
        />
        <Select
          value={selectedCity}
          onValueChange={handleCityChange}
        >
          <SelectTrigger className={`w-[180px] ${isDark ? "text-white" : ""}`}>
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
        <Select
          value={selectedDevice}
          onValueChange={handleDeviceChange}
        >
          <SelectTrigger className={`w-[180px] ${isDark ? "text-white" : ""}`}>
            <SelectValue placeholder="Appareil" />
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
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
                <div className="flex justify-between items-start">
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
                    
                    {point.supported_devices && point.supported_devices.length > 0 && (
                      <div className="mt-2">
                        <h3 className="text-sm font-medium mb-1">Appareils pris en charge:</h3>
                        <ul className="list-disc list-inside text-sm">
                          {point.supported_devices.map((device, idx) => (
                            <li key={idx}>{device}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
              Aucun réparateur trouvé pour votre recherche.
            </p>
          )}
        </div>
      )}

      {repairers?.total && repairers.total > limit && (
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className={`px-4 py-2 border rounded-lg disabled:opacity-50 ${isDark ? "text-white border-gray-600" : ""}`}
          >
            Précédent
          </button>
          <span className={`px-4 py-2 ${isDark ? "text-white" : ""}`}>
            Page {page} sur {Math.ceil(repairers.total / limit)}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= Math.ceil(repairers.total / limit)}
            className={`px-4 py-2 border rounded-lg disabled:opacity-50 ${isDark ? "text-white border-gray-600" : ""}`}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}