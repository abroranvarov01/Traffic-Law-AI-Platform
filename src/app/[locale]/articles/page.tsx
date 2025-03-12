"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import ProductCard from "@/components/articles/product-card";
import ProductDetails from "@/components/articles/product-detail";

export interface ArticleType {
  id: number;
  title: string;
  quote: string;
  author: string;
  date: string;
  image: string;
  description: string;
}

export default function Page() {
  const t = useTranslations("Articles");
  const router = useRouter();
  const products = t.raw("products") as ArticleType[];
  const [selectedProduct, setSelectedProduct] = useState<ArticleType | null>(
    products[0]
  );
  return (
    <div className="bg-background-prices h-dvh">
      <div className="bg-background-prices w-full">
        <div className="container  mx-auto p-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 "
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </button>
          <h1 className="mb-6 text-center text-2xl font-bold text-text lg:text-3xl lg:mb-8">
            {t("title")}
          </h1>
          <div className="relative flex flex-col lg:flex-row lg:gap-2">
            <div className="lg:w-1/2">
              <div className=" items-center gap-3 grid md:grid-cols-2 lg:grid-cols-1">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedProduct?.id === product.id}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </div>
            <div
              className={`fixed inset-0 z-50 bg-background-prices backdrop-blur-sm lg:static lg:z-auto lg:w-1/2 lg:bg-transparent lg:backdrop-blur-none ${
                selectedProduct ? "block" : "hidden lg:block"
              }`}
              style={{
                scrollbarColor:
                  "var(--scrollbar-color-first) var(--scrollbar-color-second)",
              }}
            >
              <div className="bg-background-prices rounded-lg p-6 lg:p-0 overflow-auto custom-scrollbar">
                {selectedProduct ? (
                  <ProductDetails
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                  />
                ) : (
                  <div className="flex text-text items-center justify-center rounded-lg border p-6 text-center bg-textInput">
                    <p>{t("noSelected")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
