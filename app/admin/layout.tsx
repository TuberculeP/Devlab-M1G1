import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="admin-layout-container">
        <h1>Admin</h1>
        {children}
      </div>
    </>
  );
}
