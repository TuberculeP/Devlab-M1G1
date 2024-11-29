"use client";

import useUserHook from "@/hooks/userHook";
import { useEffect } from "react";
import {HomePage} from "@/components/pages/Home";

export default function Home() {
  const { loading, fetchUserData } = useUserHook();
  useEffect(() => {
    fetchUserData();
  }, []);

    if (loading) {
        return (
            <div className="grid place-items-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <main className="flex flex-col row-start-2 items-center sm:items-start">
            <HomePage/>
        </main>
    );
}
