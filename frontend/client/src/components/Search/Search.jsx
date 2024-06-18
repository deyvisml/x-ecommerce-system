import React from "react";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";
import axios_client from "../../helpers/axios";
import OrderBy from "../Products/OrderBy";
import ProductsGrid from "../ProductsGrid";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
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
        filtering: [
          {
            column: "products.state_id",
            values: [1],
          },
        ],
        sorting: [
          {
            column: order_by.column,
            way: order_by.way,
          },
        ],
        search_query,
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
        {t("search.search_results")}:{" "}
        <span className="font-bold">{search_query}</span>
      </div>
      <hr className="mb-2" />

      {products && products.length == 0 ? (
        <p className="block my-5 text-center text-sm">
          {t("search.no_find_products")}
        </p>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-3">
            <OrderBy setOrderBy={setOrderBy} />

            {products ? (
              <p className="font-bold text-sm">
                {t("search.find_products.part1")} {products && products.length}{" "}
                {t("search.find_products.part2")}
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
