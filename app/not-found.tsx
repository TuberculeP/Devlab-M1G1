"use client";

import { Button } from "@/components/ui/button";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {

  return (
    <>
      <section className="not-found-container">
        <div className="flex h-[100%] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <p className="z-10 whitespace-pre-wrap text-center text-8xl font-medium tracking-tighter text-black dark:text-white">
            Oups... La page n'existe pas
          </p>
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
            )}
          />
        </div>
      </section>
    </>
  )
}
