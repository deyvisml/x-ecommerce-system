import { cloneDeep } from "lodash";

const addItemToCart = ({ id, product, quantity }, cart, setCart) => {
  const cart_copy = cloneDeep(cart); // usefull, copy a var state (to not change the state directly)
  const product_id = product.id;
  let error_occurred = false;
  let message = "Agregado al carrito  de compras";

  if (!product.in_stock) {
    error_occurred = true;
    message = "No existe stock disponible.";
  } else {
    let product_exists = false;

    cart_copy.items.forEach((item) => {
      if (item.product.id == product_id) {
        item.quantity += quantity;
        product_exists = true;
      }
    });

    if (!product_exists) {
      cart_copy.items.push({ id, product, quantity });
    }

    setCart(cart_copy);
  }

  return [error_occurred, message];
};

export default addItemToCart;
