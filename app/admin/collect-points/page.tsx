"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import apiClient from "@/lib/apiClient";
import { City, CollectPoint, CollectPointType, CollectPointsResponse } from "@/types/collect-points";

export default function CollectPointsAdmin() {
  const [collectPoints, setCollectPoints] = useState<CollectPointsResponse>({ data: [], total: 0 });
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPoint, setCurrentPoint] = useState<CollectPoint | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCity, setFilterCity] = useState<string>("all");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    url_location: "",
    phone_number: "",
    city_id: "",
    type: "collect_point" as CollectPointType,
  });

  const fetchCollectPoints = async () => {
    try {
      setLoading(true);
      
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', pageSize.toString());
      
      if (filterType && filterType !== 'all') {
        queryParams.append('type', filterType);
      }
      
      if (filterCity && filterCity !== 'all') {
        queryParams.append('cityId', filterCity);
      }
      
      const url = `/api/collect-points?${queryParams.toString()}`;
      const [data, error] = await apiClient.getRequest<CollectPointsResponse>(url);
      
      if (error) {
        console.error("Error fetching collect points:", error);
        return;
      }
      
      setCollectPoints(data || { data: [], total: 0 });
    } catch (error) {
      console.error("Error fetching collect points:", error);
    } finally {
      setLoading(false);
    }
  };

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
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    fetchCollectPoints();
  }, [currentPage, pageSize, filterType, filterCity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      url_location: "",
      phone_number: "",
      city_id: "",
      type: "collect_point",
    });
  };

  const handleCreate = async () => {
    try {
      if (!formData.name || !formData.address || !formData.city_id) {
        alert("Veuillez remplir tous les champs obligatoires (nom, adresse et ville)");
        return;
      }

      const payload = {
        ...formData,
        city_id: parseInt(formData.city_id),
      };

      const [data, error] = await apiClient.postRequest<CollectPoint>("/api/collect-points", payload);
      console.log(data, error);
      if (error) {
        console.error("Error creating collect point:", error);
        alert(`Erreur lors de la création: ${error}`);
        return;
      }

      await fetchCollectPoints();
      setCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error creating collect point:", error);
      alert("Une erreur est survenue lors de la création du point de collecte");
    }
  };

  const handleEdit = (point: CollectPoint) => {
    setCurrentPoint(point);
    setFormData({
      name: point.name,
      address: point.address,
      url_location: point.url_location,
      phone_number: point.phone_number,
      city_id: point.city_id.toString(),
      type: point.type,
    });
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!currentPoint) return;

    try {
      if (!formData.name || !formData.address || !formData.city_id) {
        alert("Veuillez remplir tous les champs obligatoires (nom, adresse et ville)");
        return;
      }

      const pointId = currentPoint.id;
      
      const payload = {
        name: formData.name,
        address: formData.address,
        url_location: formData.url_location || '',
        phone_number: formData.phone_number || '',
        city_id: parseInt(formData.city_id),
        type: formData.type,
      };
      
      const url = `/api/collect-points/${pointId}`;

      const [data, error] = await apiClient.putRequest<CollectPoint>(
        url,
        payload
      );
      if (error) {
        console.error("Error updating collect point:", error);
        alert(`Erreur lors de la mise à jour: ${error}`);
        return;
      }

      await fetchCollectPoints();
      setEditDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error updating collect point:", error);
      alert("Une erreur est survenue lors de la mise à jour du point de collecte");
    }
  };

  const handleDelete = (point: CollectPoint) => {
    setCurrentPoint(point);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentPoint) return;

    try {
      const [, error] = await apiClient.deleteRequest(`/api/collect-points/${currentPoint.id}`);
      if (error) {
        console.error("Error deleting collect point:", error);
        alert(`Erreur lors de la suppression: ${error}`);
        return;
      }

      await fetchCollectPoints();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting collect point:", error);
      alert("Une erreur est survenue lors de la suppression du point de collecte");
    }
  };

  const typeLabels = {
    collect_point: "Point de collecte",
    purchase_point: "Point d'achat",
    repairer: "Réparateur",
  };

  return (
    <div className="min-h-screen p-6 pb-20 gap-3 font-[family-name:var(--font-geist-sans)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des points de collecte</h1>
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
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Points de collecte, d&apos;achat et réparateurs</h2>
                
                <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un point
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouveau point</DialogTitle>
                    <DialogDescription>
                      Remplissez les informations pour créer un nouveau point de collecte, d&apos;achat ou réparateur.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Nom du point"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) => handleSelectChange("type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="collect_point">Point de collecte</SelectItem>
                            <SelectItem value="purchase_point">Point d&apos;achat</SelectItem>
                            <SelectItem value="repairer">Réparateur</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Adresse complète"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone_number">Téléphone</Label>
                        <Input
                          id="phone_number"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleInputChange}
                          placeholder="Numéro de téléphone"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city_id">Ville *</Label>
                        <Select
                          value={formData.city_id}
                          onValueChange={(value) => handleSelectChange("city_id", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une ville" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city.id} value={city.id.toString()}>
                                {city.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="url_location">URL de localisation</Label>
                      <Input
                        id="url_location"
                        name="url_location"
                        value={formData.url_location}
                        onChange={handleInputChange}
                        placeholder="URL Google Maps"
                      />
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
              
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Label htmlFor="filterType" className="whitespace-nowrap">Type:</Label>
                  <Select
                    value={filterType}
                    onValueChange={(value) => {
                      setFilterType(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="collect_point">Points de collecte</SelectItem>
                      <SelectItem value="purchase_point">Points d&apos;achat</SelectItem>
                      <SelectItem value="repairer">Réparateurs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Label htmlFor="filterCity" className="whitespace-nowrap">Ville:</Label>
                  <Select
                    value={filterCity}
                    onValueChange={(value) => {
                      setFilterCity(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Toutes les villes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les villes</SelectItem>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFilterType("all");
                    setFilterCity("all");
                    setCurrentPage(1);
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            </div>

            <Table>
              <TableCaption>Liste des points de collecte, d&apos;achat et réparateurs</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Adresse</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collectPoints.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      Aucun point de collecte trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  collectPoints.data.map((point) => (
                    <TableRow key={point.id}>
                      <TableCell className="font-medium">{point.name}</TableCell>
                      <TableCell>{typeLabels[point.type as CollectPointType]}</TableCell>
                      <TableCell>{point.address}</TableCell>
                      <TableCell>{point.city}</TableCell>
                      <TableCell>{point.phone_number}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(point)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => handleDelete(point)}
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
            
            {!loading && collectPoints.data.length > 0 && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Affichage de {(currentPage - 1) * pageSize + 1} à {Math.min(currentPage * pageSize, collectPoints.total)} sur {collectPoints.total} points
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, Math.ceil(collectPoints.total / pageSize)) }, (_, i) => {
                      let pageNum;
                      const totalPages = Math.ceil(collectPoints.total / pageSize);
                      
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          className="w-9 h-9 p-0"
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(Math.ceil(collectPoints.total / pageSize), p + 1))}
                    disabled={currentPage >= Math.ceil(collectPoints.total / pageSize)}
                  >
                    Suivant
                  </Button>
                  
                  <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => {
                      setPageSize(parseInt(value));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 par page</SelectItem>
                      <SelectItem value="10">10 par page</SelectItem>
                      <SelectItem value="20">20 par page</SelectItem>
                      <SelectItem value="50">50 par page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Modifier un point</DialogTitle>
                <DialogDescription>
                  Modifiez les informations du point sélectionné.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nom</Label>
                    <Input
                      id="edit-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => handleSelectChange("type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="collect_point">Point de collecte</SelectItem>
                        <SelectItem value="purchase_point">Point d&apos;achat</SelectItem>
                        <SelectItem value="repairer">Réparateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Adresse</Label>
                  <Input
                    id="edit-address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Téléphone</Label>
                    <Input
                      id="edit-phone"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-city">Ville</Label>
                    <Select
                      value={formData.city_id}
                      onValueChange={(value) => handleSelectChange("city_id", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.id.toString()}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-url">URL de localisation</Label>
                  <Input
                    id="edit-url"
                    name="url_location"
                    value={formData.url_location}
                    onChange={handleInputChange}
                  />
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
                  Êtes-vous sûr de vouloir supprimer ce point ? Cette action est irréversible.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {currentPoint && (
                  <p className="text-center font-medium">
                    {currentPoint.name} ({typeLabels[currentPoint.type as CollectPointType]})
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
