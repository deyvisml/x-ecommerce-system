import React from "react";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";
import axios_client from "../../helpers/axios";
import OrderBy from "../Products/OrderBy";
import ProductsGrid from "../ProductsGrid";
import { useLocation } from "react-router-dom";

const Products = () => {
  const location = useLocation();

  // Extrae los parámetros de consulta de la ubicación
  const query_params = new URLSearchParams(location.search);

  // Obtiene el valor de un parámetro de consulta específico
  const search_query = query_params.get("search_query");

  console.log(search_query);

  const [order_by, setOrderBy] = useState({
    column: "products.id",
    way: "asc",
  });

  /* ====== FETCH PRODUCTS ====== */
  const [products, setProducts] = useState();

  const fetch_products = async (search_query, order_by) => {
    const { data } = await axios_client(`api/products`, {
      method: "get",
      params: {
        search_query,
        sorting: [
          {
            column: order_by.column,
            way: order_by.way,
          },
        ],
        options: {
          only_published: true,
        },
      },
    });

    setProducts(data.data);
  };

  useEffect(() => {
    if (search_query) {
      setProducts();
      setTimeout(() => {
        fetch_products(search_query, order_by);
      }, 1000);
    } else {
      setProducts([]);
    }
  }, [order_by, search_query]);
  /* ====== END FETCH PRODUCTS ====== */

  return (
    <div className="mx-auto px-4 max-w-7xl text-gray-800">
      <div className="my-5">
        Resultados de la búsqueda:{" "}
        <span className="font-bold">{search_query}</span>
      </div>
      <hr className="mb-2" />

      {products && products.length == 0 ? (
        <p className="block my-5 text-center text-sm">
          No existen productos disponibles para esta busqueda.
        </p>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-3">
            <OrderBy setOrderBy={setOrderBy} />

            {products ? (
              <p className="font-bold text-sm">
                Hay {products && products.length} productos encontrados
              </p>
            ) : (
              <Skeleton count={1} width={200} />
            )}
          </div>
          <div className="mb-10">
            <ProductsGrid products={products} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
