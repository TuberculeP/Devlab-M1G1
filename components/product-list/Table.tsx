import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Link as LinkIcon } from "lucide-react";

const mockData = [
  {
    id: 1,
    materialName: "Ordinateur Dell",
    userInfo: "Jean Dupont",
    certificate: "Certificat_1.pdf",
    status: "En cours",
  },
  {
    id: 2,
    materialName: "Écran HP",
    userInfo: "Alice Martin",
    certificate: "",
    status: "Statut 2",
  },
  {
    id: 3,
    materialName: "Clavier Logitech",
    userInfo: "Paul Durand",
    certificate: "Certificat_3.pdf",
    status: "Status 3",
  },
  {
    id: 4,
    materialName: "Souris Microsoft",
    userInfo: "Marie Curie",
    certificate: "Certificat_4.pdf",
    status: "En cours",
  },
  {
    id: 5,
    materialName: "Imprimante Canon",
    userInfo: "Luc Einstein",
    certificate: "",
    status: "Statut 2",
  },
];

interface StatusDropdownProps {
  value: string;
  onChange: (newStatus: string) => void;
}

const StatusDropdown: React.FC<StatusDropdownProps> = ({ value, onChange }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="p-2 border rounded-md flex items-center justify-between w-32">
      {value}
      <ChevronDown className="ml-2 h-4 w-4" />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-white border rounded-md shadow-md">
      <DropdownMenuItem onClick={() => onChange("En cours")}>
        En cours
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => onChange("Statut 2")}>
        Statut 2
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => onChange("Status 3")}>
        Status 3
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const ProductTable = () => {
  const [data, setData] = React.useState(mockData);

  const handleStatusChange = (id: number, newStatus: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  console.log(data);
  data.map((item) => console.log(item.certificate));

  return (
    <Table className="min-w-full border border-gray-200">
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead className="w-10 text-center">✔</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Nom du Matériel</TableHead>
          <TableHead>Informations de l'Utilisateur</TableHead>
          <TableHead>Certificat</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id} className="border-b hover:bg-gray-50">
            <TableCell className="text-center">
              <div className="flex items-center">
                <Checkbox id="select" />
              </div>
            </TableCell>
            <TableCell>
              <StatusDropdown
                value={row.status}
                onChange={(newStatus: string) =>
                  handleStatusChange(row.id, newStatus)
                }
              />
            </TableCell>
            <TableCell>{row.materialName}</TableCell>
            <TableCell>{row.userInfo}</TableCell>
            <TableCell>
              {row.certificate ? (
                <a href={row.certificate} download={row.certificate}>
                  <Button variant="secondary">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    {row.certificate}
                  </Button>
                </a>
              ) : (
                <Button variant="secondary">Ajouter un certificat</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
