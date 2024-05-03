import { cloneDeep } from "lodash";

const addItemToCart = ({ id, product, quantity }, cart, setCart) => {
  const cart_copy = cloneDeep(cart); // usefull, copy a var state (to not change the state directly)

  let error_occurred = false;
  let message = "Agregado al carrito  de compras";

  if (product.in_stock) {
    cart_copy.items = [];
    cart_copy.items.push({ id, product, quantity });

    setCart(cart_copy);
  } else {
    error_occurred = true;
    message = "No existe stock disponible.";
  }

  return [error_occurred, message];
};

export default addItemToCart;
