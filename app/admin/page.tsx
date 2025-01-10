"use client";
import useUserHook from "@/hooks/userHook";
import Link from "next/link";
import { useEffect } from "react";

export default function Admin() {
  const { user, fetchUserData } = useUserHook();
  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, []);
  return (
    <>
      <h1>Welcome admin !</h1>

      <ul>
        <li>
          <Link href={"/admin/scan"} className="burger-menu-link">
            Ma scanette
          </Link>
        </li>
      </ul>
    </>
  );
}
