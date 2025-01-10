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
import e from "express";
import { DialogClose } from "@radix-ui/react-dialog";

export default function AdminUsersPage() {
  const [adminUsers, setAdminUsers] = useState<PgUser[]>();
  const [currentPasswordUser, setCurrentPasswordUser] = useState<PgUser>();
  const [newPassword, setNewPassword] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

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

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-fit">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Ajouter/Modifier le mot de passe</DialogTitle>
                <DialogDescription>
                  Le mot de passe sera immédiatement encrypté et ne pourra pas
                  être lu par la suite.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Label htmlFor="name" className="whitespace-nowrap">
                  Nouveau mot de passe :
                </Label>
                <Input
                  type="password"
                  id="name"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    onClick={() => savePassword(currentPasswordUser?.id || "")}
                  >
                    Sauvegarder
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Table>
            <TableCaption>Tous les administrateurs existants</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Mot de Passe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.last_name}
                  </TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <p
                        className="text-ellipsis overflow-hidden"
                        style={{ width: "250px" }}
                      >
                        {user.password ?? "Aucun mot de passe"}
                      </p>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openDialogForUser(user)}
                      >
                        <Pencil />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
