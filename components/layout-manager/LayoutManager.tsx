"use client";
import { ReactNode } from "react"
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { usePathname } from "next/navigation";
import { LayoutAdmin } from "../layout-admin/layout-admin";

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
                    {children}
                </LayoutAdmin>
            }


        </>
    )
}