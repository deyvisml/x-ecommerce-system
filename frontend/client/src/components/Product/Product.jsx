import React from "react";
import axios_client from "../../helpers/axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useECommerce from "../../hooks/useECommerce";
import { PulseLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWhatsapp } from "react-icons/fa";
import QuantityButton from "./QuantityButton";
import ProductsGrid from "../ProductsGrid";
import BreadCrumb from "../BreadCrumb/BreadCrumb";
import currency from "currency.js";
import { cloneDeep } from "lodash";
import { useNavigate } from "react-router-dom";
import BenefitsInformation from "../BenefitsInformation/BenefitsInformation";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

const Product = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();

  const { category_id, product_id } = useParams();
  const { cart, set_cart } = useECommerce();
  const [aux_cart, setAuxCart] = useState(cart);
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [collection_id, setCollectionId] = useState();
  const [quantity_to_buy, setQuantityToBuy] = useState(1);
  const [add_to_cart_loader, setAddToCartLoader] = useState(false);
  const [path_parts, setPathParts] = useState();
  const [customization_message_saved, setCustomizationMessageSaved] =
    useState(false);
  const [customization_message, setCustomizationMessage] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetch_category = async (category_id) => {
    const { data } = await axios_client(`api/categories/${category_id}`);

    setCategory(data.data);
  };

  const fetch_product = async (product_id) => {
    try {
      const { data } = await axios_client(`api/products`, {
        method: "get",
        params: {
          filtering: [
            {
              column: "products.id",
              values: [product_id],
            },
            {
              column: "products.state_id",
              values: [1],
            },
          ],
          options: {
            only_published: true,
          },
        },
      });

      if (data.data.length == 0) throw new Error("Producto no disponible");

      const product = data.data[0];
      console.log("debug", product);

      setProduct(product);
      setQuantityToBuy(1);

      setCollectionId(product.collection_id);
    } catch (error) {
      toast.error(error.message ?? error?.response?.data?.message, {
        autoClose: 5000,
      });

      navigate("/");
    }
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

  const [products, setProducts] = useState();
  const fetch_products_by_collection = async (collection_id) => {
    const { data } = await axios_client(`api/products`, {
      method: "get",
      params: {
        filtering: [
          {
            column: "products.collection_id",
            values: [collection_id],
          },
        ],
        excluding: [
          {
            column: "products.id",
            values: [product.id],
          },
        ],
        sorting: [
          {
            column: null,
            way: "random",
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
    if (collection_id && product) {
      setProducts();

      setTimeout(() => {
        fetch_products_by_collection(collection_id);
      }, 1000);
    }
  }, [collection_id, product]);
  /* ====== END FETCH PRODUCTS ====== */

  const handle_buy_now_btn = () => {
    if (product.is_customizable && !customization_message_saved) {
      toast.error("Primero debe completar la personalización");
      return;
    }

    setAddToCartLoader(true);

    const item = {
      id: uuidv4(),
      product,
      customization_message: customization_message,
      quantity: quantity_to_buy,
    };

    if (product.in_stock) {
      const cart_copy = cloneDeep(cart);
      cart_copy.items = [];
      cart_copy.items.push(item);

      set_cart(cart_copy);
      toast.success(t("product.stock.with_stock"));
    } else {
      toast.error(t("product.stock.without_stock"));
    }

    setAddToCartLoader(false);
  };

  const saveCustomization = (data) => {
    setCustomizationMessageSaved(true);
    setCustomizationMessage(data.customization_message);
    toast.success("Peronalización guardada!");
  };

  useEffect(() => {
    if (cart != aux_cart) navigate("/pedido");
  }, [cart]);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} - Florecer Contigo`;
    }
  }, [product]);

  return (
    <div className="text-gray-800">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="my-5 text-gray-600">
          {path_parts && <BreadCrumb path_parts={path_parts} />}
        </div>

        <div className="flex md:flex-row flex-col flex-wrap items-start gap-y-5">
          <div className="flex justify-center items-center w-full md:w-1/2">
            <div className="sm:mx-5 w-full leading-none">
              {product && (
                <img
                  src={`${
                    import.meta.env.VITE_API_URL
                  }/storage/images/products/large/${product.image_name}`}
                  alt="product image"
                  className="border-2 shadow w-full"
                />
              )}

              {/* product && (
              <ImageZoom
                src={`${import.meta.env.VITE_API_URL}/storage/images/products/large/${product.image_name}`}
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
                className="hover:text-rose-600 uppercase transition-all duration-100 ease-in-out"
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
                  ({t("product.taxes.description")})
                </span>
              </p>
              <div>
                <span className="block mb-2 font-semibold text-sm uppercase">
                  {t("product.description")}:
                </span>
                <p className="text-sm">{product && product.description}</p>
              </div>
              <div>
                <span className="block mb-2 font-semibold text-sm uppercase">
                  {t("product.availability")}:
                </span>
                {product &&
                  (product.in_stock ? (
                    <p className="inline-block bg-green-500 px-2 py-1 rounded font-bold text-white text-xs">
                      {t("product.stock.yes")} 🗸
                    </p>
                  ) : (
                    <p className="inline-block bg-red-500 px-2 py-1 rounded font-bold text-white text-xs">
                      {t("product.stock.no")} ✗
                    </p>
                  ))}
              </div>
              {product && product.is_customizable == true && (
                <div className="bg-slate-100 p-4">
                  <form onSubmit={handleSubmit(saveCustomization)}>
                    <span className="block mb-2 font-semibold text-sm uppercase">
                      {t("product.personalization")}:
                    </span>
                    <div className="text-sm">
                      <span className="text-xs">
                        {t("product.personalization_information")}
                      </span>
                      <div className="mt-2">
                        <label
                          htmlFor="customization_message"
                          className="block"
                        >
                          {product && product.customization_label}{" "}
                          <span className="">*</span>
                        </label>
                        <textarea
                          className={` focus:bg-gray-50 px-3 py-2 border min-h-10 border-gray-300 focus:border-blue-600 rounded-md w-full  cursor-pointer outline-none`}
                          id="customization_message"
                          {...register("customization_message")}
                          placeholder="Escriba aqui"
                          rows="1"
                        ></textarea>
                        {errors.customization_message && (
                          <p className="text-red-500 text-xs ps-2">
                            {t(errors.customization_message.message)}
                          </p>
                        )}
                      </div>
                      {customization_message_saved && (
                        <div className="mt-2">
                          <p>
                            <span className="font-bold">
                              {t("product.personalization")}:{" "}
                            </span>
                            {customization_message}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-slate-500 hover:bg-slate-600 px-4 py-2 rounded-md text-white text-xs transition-all duration-300 ease-in-out"
                      >
                        {t("general.buttons.save")}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              <div>
                <span className="block mb-2 font-semibold text-sm uppercase">
                  {t("product.quantity")}:
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
                      product.in_stock
                        ? handle_buy_now_btn
                        : (e) => {
                            e.preventDefault;
                          }
                    }
                    className={`${
                      product.in_stock
                        ? "bg-rose-600 hover:bg-rose-700"
                        : "bg-rose-300 cursor-not-allowed"
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
                      t("product.buy_now_button")
                    )}
                  </button>
                  <a
                    href={`https://wa.me/${product.stores_phone_number}?text=${
                      "Deseo realizar mi pedido de este producto: " +
                      product.name.toUpperCase()
                    }`}
                    target={"_blank"}
                    onClick={(e) => {
                      !product.in_stock && e.preventDefault();
                    }}
                    className={`${
                      product.in_stock
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-green-300 cursor-not-allowed"
                    }   flex items-center justify-center gap-x-2  h-11 px-2 border md:rounded-md w-full font-semibold text-center text-sm text-white uppercase transition-all duration-300 ease-in-out rounded`}
                  >
                    <FaWhatsapp className="text-xl" />{" "}
                    {t("product.buy_wspp_button")}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="relative flex justify-center mb-5">
            <p className="inline-block z-20 bg-white px-2 md:px-8 font-bold text-center text-xl md:text-2xl uppercase">
              {t("product.related_products_section.title")}
            </p>
            <hr className="top-3 md:top-3.5 left-0 z-10 absolute border-gray-300 border w-full" />
          </div>
          <div>
            <ProductsGrid products={products} />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <BenefitsInformation />
      </div>
    </div>
  );
};

export default Product;
