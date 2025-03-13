"use client";

import apiClient from "@/lib/apiClient";
import { PgUser } from "@/types/users";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import { DialogClose } from "@radix-ui/react-dialog";

export default function AdminUsersPage() {
  const [adminUsers, setAdminUsers] = useState<PgUser[]>();
  const [currentPasswordUser, setCurrentPasswordUser] = useState<PgUser>();
  const [newPassword, setNewPassword] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });

  const fetchAdminUsers = async () => {
    const [data, error] = await apiClient.getRequest<PgUser[]>(
      "/admin/get-users"
    );
    if (error) return;
    console.log(data);
    setAdminUsers(data);
  };
  

  function openDialogForUser(user: PgUser) {
    setCurrentPasswordUser(user);
    setDialogOpen(true);
  }

  useEffect(() => {
    if (!dialogOpen) {
      setNewUser({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      });
      setNewPassword("");
    }
  }, [dialogOpen]);

  async function savePassword(user_id: string) {
    if (!newPassword || !newPassword.length) return;
    const [, error] = await apiClient.postRequest<PgUser>(
      "/admin/update-password",
      { user_id, password: newPassword }
    );
    if (error) return;
    await fetchAdminUsers();
    setNewPassword("");
    setDialogOpen(false);
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [id]: value
    }));
    
    if (id === "password") {
      setNewPassword(value);
    }
  };
  
  async function handleAddUser() {
    if (!newUser.first_name || !newUser.last_name || !newUser.email || !newPassword) {
      console.error("All fields are required");
      return;
    }
    
    const [, error] = await apiClient.postRequest<PgUser>(
      "/admin/create-user",
      { 
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newPassword
      }
    );
    
    if (error) {
      console.error("Error creating user:", error);
      return;
    }
    
    await fetchAdminUsers();
    setDialogOpen(false);
  }

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestion des Utilisateurs</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Liste des Administrateurs</h2>
          <Button 
            className="bg-green-600 hover:bg-green-700 transition-colors text-white font-medium shadow-md hover:shadow-lg flex items-center gap-2"
            onClick={() => {
              setCurrentPasswordUser(undefined);
              setDialogOpen(true);
            }}
          >
            <span>+</span>
            Ajouter un administrateur
          </Button>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="sm:max-w-[500px] p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">
                {currentPasswordUser ? "Modifier le mot de passe" : "Ajouter un administrateur"}
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-2">
                {currentPasswordUser 
                  ? "Le mot de passe sera immédiatement encrypté et ne pourra pas être lu par la suite."
                  : "Créez un nouvel administrateur en renseignant ses informations."}
              </DialogDescription>
            </DialogHeader>
              
            <div className="space-y-4 py-4">
              {!currentPasswordUser && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700 font-medium">
                        Prénom
                      </Label>
                      <Input
                        id="first_name"
                        placeholder="Prénom"
                        value={newUser.first_name}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700 font-medium">
                        Nom
                      </Label>
                      <Input
                        id="last_name"
                        placeholder="Nom"
                        value={newUser.last_name}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@exemple.com"
                      value={newUser.email}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}
                
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  {currentPasswordUser ? "Nouveau mot de passe" : "Mot de passe"}
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={handleInputChange}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Le mot de passe doit contenir au moins 8 caractères.</p>
              </div>
            </div>
              
            <DialogFooter className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </Button>
              <DialogClose asChild>
                <Button
                  onClick={() => currentPasswordUser ? savePassword(currentPasswordUser.id || "") : handleAddUser()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {currentPasswordUser ? "Mettre à jour" : "Créer l'administrateur"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <Table>
            <TableCaption className="bg-gray-50 py-3 text-gray-600">Liste des administrateurs de la plateforme</TableCaption>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-semibold text-gray-700">Nom</TableHead>
                <TableHead className="font-semibold text-gray-700">Prénom</TableHead>
                <TableHead className="font-semibold text-gray-700">E-mail</TableHead>
                <TableHead className="font-semibold text-gray-700">Mot de Passe</TableHead>
                <TableHead className="font-semibold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!adminUsers || adminUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Aucun administrateur trouvé
                  </TableCell>
                </TableRow>
              ) : (
                adminUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium text-gray-800">
                      {user.last_name || "--"}
                    </TableCell>
                    <TableCell>{user.first_name || "--"}</TableCell>
                    <TableCell className="text-blue-600">{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs">
                          {user.password ? "Mot de passe défini" : "Non défini"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                          onClick={() => openDialogForUser(user)}
                        >
                          <Pencil size={14} />
                          <span>Modifier</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Dernière mise à jour: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
