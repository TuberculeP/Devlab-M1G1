import { ReactNode } from "react"

type LayoutAdminType = {
    children: ReactNode
}

export const LayoutAdmin = ({children}: LayoutAdminType) => {

    return (
        <>
            <div className="h-full w-full px-32">
                <h1>Admin</h1>
                {children}
            </div>
        </>
    )
}