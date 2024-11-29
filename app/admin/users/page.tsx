'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger} from "@radix-ui/react-dialog";
import {Button} from "@/components/ui/button";
import {DialogHeader} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {DialogFooter} from "@/components/ui/dialog";
import {useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

function UsersTable() {
    return (
        <Table className="border">
            <TableCaption>Here you can add, update and remove users.</TableCaption>
            <TableHeader className="bg-accent">
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function FormDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (isOpen: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">Add User</Button>
            </DialogTrigger>
            <DialogContent
                className="sm:w-[400px] w-[280px] absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background p-4 rounded"
            >
                <DialogHeader>
                    <DialogTitle>Add user</DialogTitle>
                    <DialogDescription>
                        Create new user
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-rows-4 gap-4 py-4">
                    <div className="flex justify-start items-center gap-2">
                        <Label htmlFor="name" className="text-right w-12">
                            Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3 text-sm max-w-38"/>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                        <Label htmlFor="role" className="text-right w-12">
                            Role
                        </Label>
                        <Select>
                            <SelectTrigger className="flex-grow text-sm max-w-38" id="role">
                                <SelectValue placeholder="Select a role"/>
                            </SelectTrigger>
                            <SelectContent className="text-sm">
                                <SelectGroup>
                                    <SelectItem value="collecter">Collecter</SelectItem>
                                    <SelectItem value="reconditioner">Reconditioner</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                        <Label htmlFor="email" className="text-right w-12">
                            Email
                        </Label>
                        <Input id="email" type="email" placeholder="example@email.com" className="col-span-3 text-sm max-w-38"/>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                        <Label htmlFor="phone" className="text-right w-12">
                            Phone
                        </Label>
                        <Input id="phone" type="tel" placeholder="01 23 45 67 89" className="col-span-3 text-sm max-w-38"/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default function UsersList() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    console.log(isDialogOpen)

    return (
        <>
            {isDialogOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => setIsDialogOpen(false)} // Permet de fermer le Dialog en cliquant à l'extérieur
                />
            )}

            <h1>Users List</h1>
            <div className="h-full flex flex-col justify-center items-end gap-2">
                <FormDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
                <UsersTable />
            </div>
        </>
    )
}

