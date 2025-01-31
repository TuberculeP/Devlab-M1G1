"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FollowPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`follow/${code}`);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-10">
      <form onSubmit={handleSubmit}>
        <label htmlFor="code">Enter Code:</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
