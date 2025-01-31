"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <>
      <div className="w-full min-h-[100vh] p-8">
        <header className="flex items-center justify-between gap-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
            Administration
          </h1>
          <Button variant="outline" onClick={() => router.push("/")}>
            <ArrowLeft />
            <span>Retour au site</span>
          </Button>
        </header>
        {children}
      </div>
    </>
  );
}
