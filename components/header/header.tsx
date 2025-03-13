"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { DarkAndLightBtn } from "../ui/darkAndLightBtn/darkAndLightBtn";
import { LightAndDarkModeContext } from "@/context/lightAndDarkMode";

export const Header = () => {
  const [headerEnabled, setHeaderEnabled] = useState<boolean>(false);
  const { isDark } = useContext(LightAndDarkModeContext)!;

  return (
    <>
      <div
        className={
          headerEnabled ? "burger-menu-enabled" : "burger-menu-disabled"
        }
      >
        <div
          className={
            isDark ? "burger-menu-container-dark" : "burger-menu-container"
          }
        >
          <div
            className={isDark ? "dark-cross-burger-menu" : "cross-burger-menu"}
            onClick={() => setHeaderEnabled(!headerEnabled)}
          />
          <div className="links-container-burger-menu">
            <Link
              href={"/purchase"}
              onClick={() => setHeaderEnabled(!headerEnabled)}
            >
              <Button
                className={
                  isDark ? "burger-menu-link white" : "burger-menu-link"
                }
                variant="link"
              >
                Points d&apos;achat
              </Button>
            </Link>
            <Link
              href={"/collect"}
              onClick={() => setHeaderEnabled(!headerEnabled)}
            >
              <Button
                className={
                  isDark ? "burger-menu-link white" : "burger-menu-link"
                }
                variant="link"
              >
                Points de Collecte
              </Button>
            </Link>
            <Link
              href={"/repairer"}
              onClick={() => setHeaderEnabled(!headerEnabled)}
            >
              <Button
                className={
                  isDark ? "burger-menu-link white" : "burger-menu-link"
                }
                variant="link"
              >
                Trouver un réparateur
              </Button>
            </Link>
            <Link
              href={"/follow"}
              onClick={() => setHeaderEnabled(!headerEnabled)}
            >
              <Button className={
                isDark ? "burger-menu-link white" : "burger-menu-link"
              } variant="link">
                Suivre mon produit
              </Button>
            </Link>
            <Link
              href={"/device-repair"}
              onClick={() => setHeaderEnabled(!headerEnabled)}
            >
              <Button className={
                isDark ? "burger-menu-link white" : "burger-menu-link"
              } variant="link">
                Assistant réparation
              </Button>
            </Link>
            <Link
              href={"/faq"}
              onClick={() => setHeaderEnabled(!headerEnabled)}
            >
              <Button
                className={
                  isDark ? "burger-menu-link white" : "burger-menu-link"
                }
                variant="link"
              >
                FAQ
              </Button>
            </Link>
            <DarkAndLightBtn />
          </div>
        </div>
      </div>
      <div className={isDark ? "header-container-dark" : "header-container"}>
        <Link href={"/"} className="logo-link">
          <div className={isDark ? "header-logo-dark" : "header-logo"} />
        </Link>
        <div className="links-container">
          <Link href={"/purchase"} className="header-link">
            <Button className={isDark ? "white" : ""} variant="link">
              Points d&apos;achat
            </Button>
          </Link>
          <Link href={"/collect"} className="header-link">
            <Button className={isDark ? "white" : ""} variant="link">
              Points de Collecte
            </Button>
          </Link>
          <Link href={"/repairer"} className="header-link">
            <Button className={isDark ? "white" : ""} variant="link">
              Trouver un réparateur
            </Button>
          </Link>
          <Link href={"/follow"} className="header-link">
            <Button className={isDark ? "white" : ""} variant="link">
              Suivre mon produit
            </Button>
          </Link>
          <Link href={"/device-repair"} className="header-link">
            <Button className={
              isDark ? "burger-menu-link white" : "burger-menu-link"
            } variant="link">Assistant Réparation</Button>
          </Link>
          <Link href={"/faq"} className="header-link">
            <Button className={isDark ? "white" : ""} variant="link">
              FAQ
            </Button>
          </Link>
          <div id="dark-laptop-btn">
            <DarkAndLightBtn />
          </div>
          <div
            className={isDark ? "dark-burger-menu-btn" : "burger-menu-btn"}
            onClick={() => setHeaderEnabled(!headerEnabled)}
          />
        </div>
      </div>
    </>
  );
};
