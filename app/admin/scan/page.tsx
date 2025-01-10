"use client";

import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

export default function AdminScan() {
  const [result, setResult] = useState<IDetectedBarcode[]>();
  return (
    <>
      <h1>Ma scanette</h1>
      <Scanner onScan={setResult} />
      <pre>{result?.[0]?.rawValue}</pre>
    </>
  );
}
