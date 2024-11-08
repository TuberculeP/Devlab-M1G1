"use client";

import Link from "next/link";
import { useState } from "react";
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

export const Header = () => {

    const [headerEnabled, setHeaderEnabled] = useState<boolean>(false)

    return (
        <>
            <div className={headerEnabled ? "burger-menu-enabled" : "burger-menu-disabled"}>
                <div className="burger-menu-container">
                    <div className="cross-burger-menu" onClick={() => setHeaderEnabled(!headerEnabled)} />
                    <div className="links-container-burger-menu">
                        <Link href={"#"} className="burger-menu-link">Points d'achat</Link>
                        <Link href={"#"} className="burger-menu-link">Points de Collecte</Link>
                        <Link href={"#"} className="burger-menu-link">Assistance numérique</Link>
                        <Link href={"#"} className="burger-menu-link">FAQ</Link>
                    </div>
                </div>
            </div>
            <div className="header-container">
                <div className="header-logo"></div>
                <div className="links-container">
                    <Link href={"#"} className="header-link">Points d'achat</Link>
                    <Link href={"#"} className="header-link">Points de Collecte</Link>
                    <Link href={"#"} className="header-link">Assistance numérique</Link>
                    <Link href={"#"} className="header-link">FAQ</Link>
                    <div className="burger-menu-btn" onClick={() => setHeaderEnabled(!headerEnabled)} />
                </div>
            </div>

        </>
    )
}