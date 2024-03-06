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
  const search_value = query_params.get("search_value");

  console.log(search_value);

  const [order_by, setOrderBy] = useState({
    name: "",
    direction: "",
  });

  /* ====== FETCH PRODUCTS ====== */
  const [products, setProducts] = useState();

  const fetch_products = async (search_value, order_by) => {
    const { data } = await axios_client(
      `api/products?search_value=${search_value}&order_by_name=${order_by.name}&order_by_direction=${order_by.direction}`
    );

    setProducts(data.data);
  };

  useEffect(() => {
    if (search_value) {
      setProducts();
      setTimeout(() => {
        fetch_products(search_value, order_by);
      }, 1000);
    } else {
      setProducts([]);
    }
  }, [order_by, search_value]);
  /* ====== END FETCH PRODUCTS ====== */

  return (
    <div className="mx-auto px-4 max-w-7xl text-gray-800">
      <div className="my-5">
        Resultados de la búsqueda:{" "}
        <span className="font-bold">{search_value}</span>
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
