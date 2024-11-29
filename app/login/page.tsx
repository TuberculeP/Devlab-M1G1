"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";

export default function Login() {

    const [message, setMessage] = useState<string>("");

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setMessage("")
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries());

        if (data.email === "") {
            return setMessage("Champ email obligatoire")
        }
        if (data.password === "") {
            return setMessage("Champ mot de passe obligatoire")
        }
        // En attendant que l'api soit prête.
        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     body: formData,
        // })
        return setMessage("Connecté")

    }

    return (
        <>
            <section className="login-container">
                <div className="login-card">
                    <form onSubmit={onSubmit}>
                        <Card className="w-[350px]">
                            <CardHeader>
                                <CardTitle>Connexion administrateur</CardTitle>
                                <CardDescription>{message}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Input type="email" name="email" placeholder="Email" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Input type="password" name="password" placeholder="Mot de passe" />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button type="submit" className="w-full">
                                    Se connecter
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </section>
        </>
    )
}