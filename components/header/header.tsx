"use client";

import Link from "next/link";

export const Header = () => {

    return (
        <>
            <div className="header-container">
                <div className="header-logo"></div>
                <div className="links-container">
                    <Link href={"#"} className="header-link">Lien</Link>
                    <Link href={"#"} className="header-link">Lien</Link>
                    <Link href={"#"} className="header-link">Lien</Link>
                    <Link href={"#"} className="header-link">Lien</Link>
                    <Link href={"#"} className="header-link">Lien</Link>
                </div>
            </div>
        </>
    )
}