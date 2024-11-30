"use client";
import useUserHook from "@/hooks/userHook";
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
      <pre>{JSON.stringify(user)}</pre>
    </>
  );
}
