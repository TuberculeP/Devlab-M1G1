"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminScan() {
  const [rawResult, setRawResult] = useState<IDetectedBarcode[]>();
  const [digest, setDigest] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    const url = rawResult?.[0]?.rawValue;
    if (url) {
      const code = url.split("/").pop();
      setDigest(code);
    }
  }, [rawResult]);
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Scanner le QR Code
      </h1>
      <div className="flex justify-center mb-6">
        <Scanner
          onScan={setRawResult}
          classNames={{ container: "w-full h-full" }}
        />
      </div>
      <h1 className="text-xl font-semibold mb-6 text-center">
        Ou entrez le code ci-dessous
      </h1>
      <Input
        className="mb-4"
        value={digest}
        onChange={(e) => setDigest(e.target.value)}
      />
      <Button
        className="w-full"
        onClick={() =>
          digest &&
          digest.length &&
          router.push(`/admin/emmaus/products/${digest}`)
        }
      >
        Valider
      </Button>
    </>
  );
}
