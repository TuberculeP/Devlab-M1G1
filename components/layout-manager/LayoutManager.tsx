"use client";
import { ReactNode, useEffect } from "react"
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { usePathname } from "next/navigation";
import { LayoutAdmin } from "../layout-admin/layout-admin";
import Admin from "@/app/admin/page";
import { useRouter } from "next/router";

type LayoutManagerType = {
    children: ReactNode
}

export const LayoutManager = ({ children }: LayoutManagerType) => {

    const pathname = usePathname();



    return (
        <>
            {!pathname.startsWith("/admin")?
                <>
                    <Header />
                    <section>
                        {children}
                    </section>
                    <Footer />
                </>
                :
                <LayoutAdmin>
                    <Admin />
                </LayoutAdmin>
            }


        </>
    )
}