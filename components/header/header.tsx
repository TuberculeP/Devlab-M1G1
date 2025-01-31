"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button"

export const Header = () => {
    const [headerEnabled, setHeaderEnabled] = useState<boolean>(false);



    return (
        <>
            <div className={headerEnabled ? "burger-menu-enabled" : "burger-menu-disabled"}>
                <div className="burger-menu-container">
                    <div className="cross-burger-menu" onClick={() => setHeaderEnabled(!headerEnabled)} />
                    <div className="links-container-burger-menu">
                        <Link href={"/purchase"} onClick={() => setHeaderEnabled(!headerEnabled)}>
                            <Button className="burger-menu-link" variant="link">Points d&apos;achat
                            </Button>
                        </Link>
                        <Link href={'/collect'} onClick={() => setHeaderEnabled(!headerEnabled)}>
                            <Button className="burger-menu-link" variant="link">Points de Collecte
                            </Button>
                        </Link>
                        <Link href={"/repairer"} onClick={() => setHeaderEnabled(!headerEnabled)}>
                            <Button className="burger-menu-link" variant="link">Trouver un réparateur
                            </Button>
                        </Link>
                        <Link href={"/device-repair"} onClick={() => setHeaderEnabled(!headerEnabled)}>
                            <Button className="burger-menu-link" variant="link">Assistance numérique
                            </Button>
                        </Link>
                        <Link href={"/faq"} onClick={() => setHeaderEnabled(!headerEnabled)}>
                            <Button className="burger-menu-link" variant="link">FAQ
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="header-container">
                <Link href={"/"}>
                    <div className="header-logo" />
                </Link>
                <div className="links-container">
                    <Link href={"/purchase"} className="header-link">
                        <Button variant="link">Points d&apos;achat</Button>
                    </Link>
                    <Link href={'/collect'} className="header-link">
                        <Button variant="link">Points de Collecte</Button>
                    </Link>
                    <Link href={"/repairer"} className="header-link">
                        <Button variant="link">Trouver un réparateur
                        </Button>
                    </Link>
                    <Link href={"#"} className="header-link">
                        <Button variant="link">Assistance numérique
                        </Button>
                    </Link>
                    <Link href={"/device-repair"} className="header-link">
                        <Button variant="link">Assistant Réparation</Button>
                    </Link>
                    <Link href={"/faq"} className="header-link">
                        <Button variant="link">FAQ
                        </Button>
                    </Link>
                    <div className="burger-menu-btn" onClick={() => setHeaderEnabled(!headerEnabled)} />
                </div>
            </div>

        </>
    )
}
