"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FollowPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`follow/${code}`);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-10 w-fit">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <label
          htmlFor="code"
          className="block text-sm font-medium text-gray-700"
        >
          Enter Code:
        </label>
        <Input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
}
