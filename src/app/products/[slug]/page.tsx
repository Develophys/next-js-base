import { Suspense } from "react";

import { LoaderSpinner } from "@/components/LoaderSpinner";
import { ProductsList } from "@/components/ProductsList";

async function ProductsPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { name?: string; page?: string };
}) {
  const { slug } = params;
  const { name } = searchParams;

  return (
    <div className="m-1">
      <h1>SLUG: {slug}</h1>
      <h1>Search Params NAME: {name}</h1>

      <Suspense fallback={<LoaderSpinner />}>
        <ProductsList />
      </Suspense>
    </div>
  );
}

export default ProductsPage;
