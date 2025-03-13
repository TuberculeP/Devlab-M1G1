"use client";

import apiClient from "@/lib/apiClient";
import { PgProduct } from "@/types/products";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatStatus } from "@/lib/utils";

export default function AdminProduct({
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
      router.replace(`/admin/emmaus/${code}`);
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

  async function updateProductStatus(status: string) {
    const [response, responseError] = await apiClient.postRequest<PgProduct>(
      `/admin/update-product-status`,
      { id: product?.id, status }
    );
    console.log(
      "\x1b[44m%s\x1b[0m",
      "app/admin/emmaus/products/[slug]/page.tsx:51 response, responseError",
      response,
      responseError
    );
    if (responseError) return;
    setProduct(response);
  }

  return (
    <div className="container">
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          {product ? (
            <>
              <div className="flex items-center justify-center gap-4  mb-6">
                <h1 className="text-2xl font-bold text-center">
                  {product.name}
                </h1>
                <p className="px-2 py-1 bg-slate-200 rounded-md w-fit text-xs">
                  {code}
                </p>
              </div>
              <hr className="my-4" />
              <div>
                <div className="aspect-square m-8">
                  {product.picture_url && (
                    <img
                      className="object-cover w-full h-full"
                      src={product.picture_url}
                      alt={product.name}
                    />
                  )}
                </div>
              </div>
              {/* <div
                className={`mx-auto px-2 py-1 rounded-full w-fit text-center ${
                  product.status === "recycled"
                    ? "bg-green-200"
                    : product.status === "collected"
                    ? "bg-sky-200"
                    : "bg-slate-200"
                }`}
              >
                {formatStatus(product.status)}
              </div> */}

              <div className="flex justify-center">
                <Select
                  value={product.status}
                  onValueChange={(value) => {
                    updateProductStatus(value);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Modifier le statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>État du produit</SelectLabel>
                      <SelectItem value="recovered">
                        {formatStatus("recovered")}
                      </SelectItem>
                      <SelectItem value="collected">
                        {formatStatus("collected")}
                      </SelectItem>
                      <SelectItem value="recycled">
                        {formatStatus("recycled")}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
