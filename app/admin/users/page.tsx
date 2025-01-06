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

export default function AdminUsersPage() {
  const [adminUsers, setAdminUsers] = useState<PgUser[]>();
  useEffect(() => {
    const fetchAdminUsers = async () => {
      const [data, error] = await apiClient.getRequest<PgUser[]>(
        "/admin/get-users"
      );
      if (error) return;
      console.log(data);
      setAdminUsers(data);
    };
    fetchAdminUsers();
  }, []);
  return (
    <>
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
              <TableCell className="font-medium">{user.last_name}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.password}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
