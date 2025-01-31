"use client";

import { LightAndDarkModeContext } from "@/context/lightAndDarkMode";
import Link from "next/link";
import { useContext } from "react";

export const Footer = () => {

  const { isDark } = useContext(LightAndDarkModeContext)!;

  return (
    <>
      <section className={isDark ? "footer-container-dark" :"footer-container"}>
        <div className={isDark ? "footer-logo-dark" :"footer-logo"} />
        <div className="footer-links-container">
          <Link href={"#"} className="footer-link">
            Plan du site
          </Link>
          <Link href={"/collect"} className="footer-link">
            Points de Collecte
          </Link>
          <Link href={"#"} className="footer-link">
            Assistance numérique
          </Link>
          <Link href={"/faq"} className="footer-link">
            FAQ
          </Link>
        </div>
      </section>
    </>
  );
};
