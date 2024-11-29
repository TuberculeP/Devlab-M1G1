"use client";

import Link from "next/link";
import { useState } from "react";

export const Header = () => {

    const [headerEnabled, setHeaderEnabled] = useState<boolean>(false)

    return (
        <>
            <div className={headerEnabled ? "burger-menu-enabled" : "burger-menu-disabled"}>
                <div className="burger-menu-container">
                    <div className="cross-burger-menu" onClick={() => setHeaderEnabled(!headerEnabled)} />
                    <div className="links-container-burger-menu">
                        <Link href={"/purchase"} className="burger-menu-link">Points d&apos;achat</Link>
                        <Link href={'/collect'} className="burger-menu-link">Points de Collecte</Link>
                        <Link href={"/repairer"} className="header-link">Trouver un réparateur</Link>
                        <Link href={"#"} className="burger-menu-link">Assistance numérique</Link>
                        <Link href={"#"} className="burger-menu-link">FAQ</Link>
                    </div>
                </div>
            </div>
            <div className="header-container">
                <div className="header-logo" />
                <div className="links-container">
                    <Link href={"/purchase"} className="header-link">Points d&apos;achat</Link>
                    <Link href={'/collect'} className="header-link">Points de Collecte</Link>
                    <Link href={"/repairer"} className="header-link">Trouver un réparateur</Link>
                    <Link href={"#"} className="header-link">Assistance numérique</Link>
                    <Link href={"#"} className="header-link">FAQ</Link>
                    <div className="burger-menu-btn" onClick={() => setHeaderEnabled(!headerEnabled)} />
                </div>
            </div>

        </>
    )
}