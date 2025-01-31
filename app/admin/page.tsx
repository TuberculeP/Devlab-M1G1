"use client";
import { Button } from "@/components/ui/button";
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

      <div className="flex flex-col items-center justify-center">
        <Button>
          <Link href={"/admin/emmaus"}>Espace Emmaeüs</Link>
        </Button>
      </div>
    </>
  );
}
