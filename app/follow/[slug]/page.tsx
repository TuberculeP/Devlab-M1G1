"use client";

import apiClient from "@/lib/apiClient";
import { PgProduct } from "@/types/products";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import { formatStatus } from "@/lib/utils";

export default function FollowProduct({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const code = slug.toUpperCase();

  const [product, setProduct] = useState<PgProduct>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug !== code) {
      router.replace(`/follow/${code}`);
    }
    const fetchProduct = async () => {
      setLoading(true);
      const [response, responseError] = await apiClient.getRequest<PgProduct>(
        "/products/follow/" + code
      );

      if (responseError) return;
      setProduct(response);
      setLoading(false);
    };
    fetchProduct();
  }, []);
  return (
    <div className="container mx-auto px-4 pt-24 pb-10">
      <h1 className="text-4xl font-bold mb-6 text-center">Suivi de produit</h1>
      <hr className="my-4" />
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          {product ? (
            <>
              <div className="grid grid-cols-[1fr_2fr] p-8 gap-8">
                <div className="aspect-square">
                  {product.picture_url && (
                    <img
                      className="object-cover w-full h-full"
                      src={product.picture_url}
                      alt={product.name}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center items-center gap-4 w-fit">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <div
                      className={`px-2 py-1 rounded-full w-fit text-xs ${
                        product.status === "recycled"
                          ? "bg-green-200"
                          : product.status === "collected"
                          ? "bg-sky-200"
                          : "bg-slate-200"
                      }`}
                    >
                      {formatStatus(product.status)}
                    </div>
                  </div>
                  <div>
                    <p className="px-2 py-1 bg-slate-200 rounded-md w-fit text-xs">
                      {code}
                    </p>
                  </div>
                  <div>
                    <p>Description Client :</p>
                    <p className="text-justify">{product.description}</p>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex flex-col justify-center items-center gap-4">
                <h2 className="text-xl font-bold mb-6">Gardez le lien !</h2>
                <QRCode value={window.location.href} />
              </div>
            </>
          ) : (
            <p>Produit introuvable</p>
          )}
        </>
      )}
    </div>
  );
}
