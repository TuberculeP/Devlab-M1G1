import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ExportDialog = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    materiel: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Ajoute ici la logique d'envoi des données (API, stockage, etc.)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Ajouter un nouveau produit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un matériel</DialogTitle>
          <DialogDescription>Texte explicatif</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div>
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Nom"
              />
            </div>
            <div>
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Prénom"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div>
            <Label htmlFor="materiel">Matériel</Label>
            <Input
              id="materiel"
              name="materiel"
              value={formData.materiel}
              onChange={handleChange}
              required
              placeholder="Nom du matériel"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline">
              Annuler
            </Button>
            <Button type="submit">Envoyer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
