"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";
import useUserHook from "@/hooks/userHook";
import apiClient from "@/lib/apiClient";
import { City } from "@/types/collect-points";

export default function CitiesAdmin() {
  const { user, fetchUserData } = useUserHook();
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState<City | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    coordinates: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCities = async () => {
    try {
      const [data, error] = await apiClient.getRequest<City[]>("/api/cities");
      if (error) {
        console.error("Error fetching cities:", error);
        return;
      }
      setCities(data || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchCities();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      coordinates: "",
    });
  };

  const handleCreate = async () => {
    try {
      if (!formData.name || !formData.coordinates) {
        alert("Veuillez remplir tous les champs obligatoires (nom et coordonnées)");
        return;
      }

      const [data, error] = await apiClient.postRequest<City>("/api/cities", formData);
      if (error) {
        console.error("Error creating city:", error);
        alert(`Erreur lors de la création: ${error}`);
        return;
      }

      await fetchCities();
      setCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error creating city:", error);
    }
  };

  const handleEdit = (city: City) => {
    setCurrentCity(city);
    setFormData({
      name: city.name,
      coordinates: city.coordinates,
    });
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!currentCity) return;

    try {
      if (!formData.name || !formData.coordinates) {
        alert("Veuillez remplir tous les champs obligatoires (nom et coordonnées)");
        return;
      }

      const [data, error] = await apiClient.putRequest<City>(
        `/api/cities/${currentCity.id}`,
        formData
      );
      if (error) {
        console.error("Error updating city:", error);
        return;
      }

      await fetchCities();
      setEditDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error updating city:", error);
    }
  };

  const handleDelete = (city: City) => {
    setCurrentCity(city);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentCity) return;

    try {
      const [, error] = await apiClient.deleteRequest(`/api/cities/${currentCity.id}`);
      if (error) {
        console.error("Error deleting city:", error);
        alert(`Erreur lors de la suppression: ${error}`);
        return;
      }

      await fetchCities();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  const filteredCities = cities.filter((city: City) => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 pb-20 gap-3 font-[family-name:var(--font-geist-sans)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des villes</h1>
        <Button variant="outline" onClick={() => window.history.back()}>
          Retour
        </Button>
      </div>

      {loading ? (
        <div className="grid place-items-center min-h-[50vh]">
          <p>Chargement...</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">Villes disponibles</h2>
                <div className="w-64">
                  <Input
                    placeholder="Rechercher une ville..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>

              <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter une ville
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Ajouter une nouvelle ville</DialogTitle>
                    <DialogDescription>
                      Entrez le nom de la ville et ses coordonnées géographiques.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom de la ville</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Paris"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coordinates">
                        Coordonnées (latitude,longitude)
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="coordinates"
                          name="coordinates"
                          value={formData.coordinates}
                          onChange={handleInputChange}
                          placeholder="Ex: 48.8566,2.3522"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          type="button"
                          className="flex-shrink-0"
                          onClick={() => {
                            window.open("https://www.google.com/maps", "_blank");
                          }}
                        >
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Astuce: Vous pouvez obtenir les coordonnées en faisant un clic droit sur Google Maps
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleCreate}>Créer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableCaption>Liste des villes disponibles</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Coordonnées</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6">
                      {searchTerm ? "Aucune ville trouvée avec ce terme de recherche" : "Aucune ville disponible"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCities.map((city: City) => (
                    <TableRow key={city.id}>
                      <TableCell className="font-medium">{city.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {city.coordinates}
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${city.coordinates}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MapPin className="h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(city)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleDelete(city)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Modifier une ville</DialogTitle>
                <DialogDescription>
                  Modifiez les informations de la ville sélectionnée.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nom de la ville</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-coordinates">
                    Coordonnées (latitude,longitude)
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="edit-coordinates"
                      name="coordinates"
                      value={formData.coordinates}
                      onChange={handleInputChange}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      className="flex-shrink-0"
                      onClick={() => {
                        window.open("https://www.google.com/maps", "_blank");
                      }}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleUpdate}>Enregistrer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer cette ville ? Cette action est irréversible.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {currentCity && (
                  <p className="text-center font-medium">
                    {currentCity.name}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Annuler
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Supprimer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
