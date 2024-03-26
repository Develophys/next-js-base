import { NextRequest, NextResponse } from "next/server"

import { products } from "@/mocks/data.mock";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const nameParam = searchParams.get('name');
  const pageParam = searchParams.get('page');

  const limit = 15;
  const page = pageParam && parseInt(pageParam, 10) || 0;
  const offset = page ? (page - 1) * limit : 0;
  const end = offset + limit;

  if (nameParam) {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(nameParam)
    );

    const slicedProducts = filteredProducts.slice(offset, end);

    return NextResponse.json({
      products: slicedProducts,
      total: filteredProducts.length,
    })
  }

  const slicedProducts = products.slice(offset, end);

  return NextResponse.json({
    products: slicedProducts,
    total: products.length,
  })
}