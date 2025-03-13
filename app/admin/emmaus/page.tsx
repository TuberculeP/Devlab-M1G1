import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Emmaeus() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center">Gestion Emmaüs</h1>
      <div>
        <Button>
          <Link href={"/admin/emmaus/scan"}>Retrouver un produit</Link>
        </Button>
      </div>
    </>
  );
}
