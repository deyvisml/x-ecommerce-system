import React from "react";
import axios_client from "../../helpers/axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useECommerce from "../../hooks/useECommerce";
import { PulseLoader } from "react-spinners";
import addItemToCart from "../../utils/addItemToCart";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWhatsapp } from "react-icons/fa";
import QuantityButton from "./QuantityButton";
import ProductsGrid from "../ProductsGrid";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import currency from "currency.js";

const Product = () => {
  const { category_id, product_id } = useParams();
  const { cart, setCart } = useECommerce();
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [product_type_id, setProductTypeId] = useState();
  const [quantity_to_buy, setQuantityToBuy] = useState(1);
  const [add_to_cart_loader, setAddToCartLoader] = useState(false);
  const [path_parts, setPathParts] = useState();

  const fetch_category = async (category_id) => {
    const { data } = await axios_client(`api/categories/${category_id}`);

    setCategory(data.data);
  };

  const fetch_product = async (product_id) => {
    const { data } = await axios_client(`api/products/${product_id}`);

    setProduct(data.data);
    setQuantityToBuy(1);

    setProductTypeId(data.data.product_type_id);
  };

  useEffect(() => {
    if (product && category) {
      setPathParts([
        { title: "Home", url: "/", is_home: true, disabled: false },
        {
          title: category.name,
          url: `/categorias/${category_id}/productos`,
          is_home: false,
          disabled: false,
        },
        { title: product.name, url: "", is_home: false, disabled: true },
      ]);
    }
  }, [product, category]);

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
      image_url: "delivery.webp",
    },
    {
      id: 2,
      title: "PAGOS SEGUROS",
      description: "Compras de manera simple y segura con unos clicks.",
      image_url: "security.png",
    },
    {
      id: 3,
      title: "SERVICIOS PERSONALIZADOS",
      description:
        "Cuidamos cada detalle para ti y la persona que tienes en el corazón.",
      image_url: "client-service.webp",
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
      `api/categories/${category_id}/products?product_type_id=${product_type_id}&exclude_product_id=${product_id}&order_by_name=random&limit=`
    );

    setProducts(data.data);
  };

  useEffect(() => {
    if (product_type_id) {
      setProducts();
      setTimeout(() => {
        fetch_products_by_category(category_id, product_type_id, product_id);
      }, 1000);
    }
  }, [product_type_id, product]);
  /* ====== END FETCH PRODUCTS ====== */

  const handle_add_product_to_cart_btn = () => {
    setAddToCartLoader(true);

    const item = {
      id: uuidv4(),
      product,
      quantity: quantity_to_buy,
    };

    const [error_occurred, message] = addItemToCart(item, cart, setCart);

    if (!error_occurred) {
      toast.success(message);
    } else {
      toast.error(message);
    }

    setAddToCartLoader(false);
  };

  return (
    <div className="text-gray-800">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="my-5 text-gray-600">
          {path_parts && <BreadCrumb path_parts={path_parts} />}
        </div>

        <div className="flex md:flex-row flex-col flex-wrap items-start gap-y-5">
          <div className="flex justify-center items-center w-full md:w-1/2">
            <div className="bg-purple-400 sm:mx-5 w-full leading-none">
              {product && (
                <img
                  src={`/images/products/${product.image_url}`}
                  alt="product image"
                  className="border-2 shadow w-full"
                />
              )}

              {/* product && (
              <ImageZoom
                src={`/images/products/${product.image_url}`}
                alt="Product image"
                className="border-2 border-gray-400"
                width="50%"
                zoom="180"
              />
            ) */}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex flex-col gap-4 sm:mx-10">
              <Link
                to={`/categorias/${category_id}/productos`}
                className="hover:text-purple-600 uppercase transition-all duration-100 ease-in-out"
              >
                {category && category.name}
              </Link>
              <h2 className="font-extrabold text-3xl">
                {product && product.name}
              </h2>
              <p className="flex items-center gap-x-1 font-bold text-2xl">
                {product &&
                  (product.in_offer == true ? (
                    <>
                      <span>
                        {currency(product.offer_price, {
                          symbol: "S/ ",
                        }).format()}
                      </span>
                      <span className="text-gray-500 text-lg line-through">
                        {currency(product.price, {
                          symbol: "S/ ",
                        }).format()}
                      </span>
                      <span className="bg-rose-600 mb-0.5 px-1.5 py-0.5 rounded font-bold text-white text-xs">
                        -{product.discount_rate}%
                      </span>
                    </>
                  ) : (
                    currency(product.price, {
                      symbol: "S/ ",
                    }).format()
                  ))}
                <span className="font-normal text-sm ms-2">
                  (impuestos inc.)
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
                {product &&
                  (product.has_stock ? (
                    <p className="inline-block bg-green-500 px-2 py-1 rounded font-bold text-white text-xs">
                      En stock 🗸
                    </p>
                  ) : (
                    <p className="inline-block bg-red-500 px-2 py-1 rounded font-bold text-white text-xs">
                      Agotado ✗
                    </p>
                  ))}
              </div>
              <div>
                <span className="block mb-2 font-semibold text-sm uppercase">
                  Cantidad:
                </span>
                {product && (
                  <QuantityButton
                    quantity={quantity_to_buy}
                    setQuantity={setQuantityToBuy}
                    min_quantity={product.min_quantity_buy}
                    max_quantity={product.max_quantity_buy}
                  />
                )}
              </div>

              {product && (
                <div>
                  <button
                    onClick={
                      product.has_stock
                        ? handle_add_product_to_cart_btn
                        : (e) => {
                            e.preventDefault;
                          }
                    }
                    className={`${
                      product.has_stock
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-purple-300 cursor-not-allowed"
                    }   mb-1.5 h-11 px-2 border md:rounded-md w-full font-semibold text-sm text-white uppercase transition-all duration-300 ease-in-out rounded`}
                  >
                    {add_to_cart_loader ? (
                      <PulseLoader
                        color="#ffffff"
                        loading
                        size={9}
                        className="m-0 p-0 pt-1"
                      />
                    ) : (
                      "Añadir al carrito"
                    )}
                  </button>
                  <a
                    href={
                      product.has_stock
                        ? `https://wa.me/${"+51975032529"}?text=${
                            "Deseo realizar mi pedido de este producto: " +
                            product.name.toUpperCase()
                          }`
                        : "javascript:void(0)"
                    }
                    target={product.has_stock ? "_blank" : "_self"}
                    className={`${
                      product.has_stock
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-green-300 cursor-not-allowed"
                    }   flex items-center justify-center gap-x-2  h-11 px-2 border md:rounded-md w-full font-semibold text-center text-sm text-white uppercase transition-all duration-300 ease-in-out rounded`}
                  >
                    <FaWhatsapp className="text-xl" /> Comprar por WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="relative flex justify-center mb-5">
            <p className="inline-block z-20 bg-white px-2 md:px-8 font-bold text-center text-xl md:text-2xl uppercase">
              Productos relacionados
            </p>
            <hr className="top-3 md:top-3.5 left-0 z-10 absolute border-gray-300 border w-full" />
          </div>
          <div>
            <ProductsGrid products={products} />
          </div>
        </div>
      </div>

      <div className="bg-neutral-100 mt-10">
        <div className="mx-auto px-4 max-w-7xl">
          <ul className="flex flex-wrap md:flex-nowrap gap-x-12 gap-y-8 px-5 py-10 sm:py-16">
            {benefits_information.map(
              ({ id, title, description, image_url }) => {
                return (
                  <li
                    key={id}
                    className="flex items-start gap-4 w-full md:w-1/3"
                  >
                    <img
                      src={`/images/benefits/${image_url}`}
                      alt=""
                      className="w-12 h-auto"
                    />
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
