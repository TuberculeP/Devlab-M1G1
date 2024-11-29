import { ReactNode } from "react"

type LayoutAdminType = {
    children: ReactNode
}

export const LayoutAdmin = ({children}: LayoutAdminType) => {

    return (
        <>
            <div className="admin-layout-container">
                <h1>Admin</h1>
                {children}
            </div>
        </>
    )
}