import React from "react";
import ImageZoom from "react-image-zooom";
import axios_client from "../../helpers/axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { FaWhatsapp } from "react-icons/fa";

import QuantityButton from "./QuantityButton";
import ProductsGrid from "../ProductsGrid";

const Product = () => {
  const { category_id, product_id } = useParams();
  console.log(product_id);
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [product_type_id, setProductTypeId] = useState();

  const fetch_category = async (category_id) => {
    const { data } = await axios_client(`api/categories/${category_id}`);

    setCategory(data.data);
  };

  const fetch_product = async (product_id) => {
    const { data } = await axios_client(`api/products/${product_id}`);

    setProduct(data.data);

    setProductTypeId(data.data.product_type_id);
  };

  useEffect(() => {
    fetch_category(category_id);
  }, []);

  useEffect(() => {
    fetch_product(product_id);
  }, [product_id]);

  const benefits_information = [
    {
      id: 1,
      title: "SERVICIO DE DELIVERY",
      description:
        "Envío de flores en Lima y Callao. Entregas para el mismo dia.",
      image_url:
        "https://cdn.shopify.com/s/files/1/0567/4352/6574/files/enviado_1.png",
    },
    {
      id: 2,
      title: "PAGOS SEGUROS",
      description: "Compras de manera simple y segura con unos clicks.",
      image_url:
        "https://cdn.shopify.com/s/files/1/0567/4352/6574/files/Group.png",
    },
    {
      id: 3,
      title: "SERVICIOS PERSONALIZADOS",
      description:
        "Cuidamos cada detalle para ti y la persona que tienes en el corazón.",
      image_url:
        "https://cdn.shopify.com/s/files/1/0567/4352/6574/files/servicio-al-cliente_1.png",
    },
  ];

  /* ====== FETCH PRODUCTS ====== */
  const [products, setProducts] = useState();

  const fetch_products_by_category = async (
    category_id,
    product_type_id,
    product_id
  ) => {
    const { data } = await axios_client(
      `api/categories/${category_id}/products?product_type_id=${product_type_id}&exclude_product_id=${product_id}&order=random&limit=`
    );

    setProducts(data.data);
  };

  useEffect(() => {
    setProducts();
    setTimeout(() => {
      fetch_products_by_category(category_id, product_type_id, product_id);
    }, 1000);
  }, [product_type_id, product]);
  /* ====== END FETCH PRODUCTS ====== */

  return (
    <div className="text-gray-800 ">
      <div className="my-5">
        <div className="flex items-center gap-1.5 text-gray-500 text-xs md:text-sm">
          <Link className="hover:text-gray-900 hover:underline" to="/">
            Home
          </Link>
          <span>/</span>
          <Link
            className="hover:text-gray-900 hover:underline"
            to={`/categorias/${category_id}/productos`}
          >
            {category && category.name}
          </Link>
          <span>/</span>
          <span>{product && product.name}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap items-start gap-y-5">
        <div className="flex items-center justify-center w-full md:w-1/2">
          <div className="sm:mx-5 w-full leading-none overflow-hidden">
            {product && (
              <ImageZoom
                src={product.image_url}
                alt="Product image"
                className="border border-gray-400"
                zoom="180"
              />
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex flex-col gap-4 sm:mx-10">
            <Link
              to={`/categorias/${category_id}/productos`}
              className="hover:text-rose-600 uppercase transition-all duration-100 ease-in-out"
            >
              {category && category.name}
            </Link>
            <h2 className="font-extrabold text-3xl">
              {product && product.name}
            </h2>
            <p className="font-bold text-2xl">
              S/ {product && product.price}
              <span className="font-normal text-sm ms-2">
                (impuestos incluidos)
              </span>
            </p>
            <div>
              <span className="block mb-2 font-semibold text-sm uppercase">
                Descripción:
              </span>
              <p className="text-sm">{product && product.description}</p>
            </div>
            <div>
              <span className="block mb-2 font-semibold text-sm uppercase">
                Disponibilidad:
              </span>
              <p className="font-bold text-green-600 text-sm">En stock 🗸</p>
              <p className="font-bold text-red-600 text-sm">Agotado ✗</p>
            </div>
            <div>
              <span className="block mb-2 font-semibold text-sm uppercase">
                Cantidad:
              </span>
              <QuantityButton />
            </div>
            <div>
              <button className="bg-rose-600 hover:bg-rose-700 mb-1.5 py-2.5 p-2 border md:rounded-md w-full font-semibold text-sm text-white uppercase transition-all duration-300 ease-in-out rounded">
                Añadir al carrito
              </button>
              <a
                href="#"
                className="flex items-center justify-center gap-x-2 bg-green-500 hover:bg-green-600 py-2.5 p-2 border md:rounded-md w-full font-semibold text-center text-sm text-white uppercase transition-all duration-300 ease-in-out rounded"
              >
                <FaWhatsapp className="text-xl" /> Comprar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="relative flex justify-center mb-5">
          <p className="inline-block z-40 bg-white px-2 md:px-8 font-bold text-center text-xl md:text-2xl uppercase">
            Productos relacionados
          </p>
          <hr className="top-3 md:top-3.5 left-0 z-10 absolute border border-gray-400 w-full" />
        </div>

        <div>
          <ProductsGrid products={products} />
        </div>

        <div className="bg-neutral-100 my-10">
          <ul className="flex flex-wrap md:flex-nowrap gap-x-12 gap-y-8 px-5 py-10">
            {benefits_information.map(
              ({ id, title, description, image_url }) => {
                return (
                  <li
                    key={id}
                    className="flex items-start gap-4 w-full md:w-1/3"
                  >
                    <img src={image_url} alt="" className="w-12 h-auto" />
                    <div className="text-sm">
                      <p className="mb-1 font-bold uppercase">{title}</p>
                      <p>{description}</p>
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;
