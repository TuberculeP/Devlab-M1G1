"use client";

import Link from "next/link";

export const Footer = () => {


    return (
        <>
            <section className="footer-container">
                <Link href={"/"} className="footer-link-logo">
                    <div className="footer-logo" />
                </Link>
                <div className="footer-links-container">
                    <Link href={"#"} className="footer-link">Plan du site</Link>
                    <Link href={"/collect"} className="footer-link">Points de Collecte</Link>
                    <Link href={"#"} className="footer-link">Assistance numérique</Link>
                    <Link href={"#"} className="footer-link">FAQ</Link>
                </div>
            </section>
        </>
    )
}