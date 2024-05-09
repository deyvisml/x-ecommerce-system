<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Mail</title>

        <style>
            * {
                margin: 0px;
                padding: 0px;
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            }
            .bg-container {
                padding: 15px;
                background-color: #eeeeee;
            }
            .container {
                width: 100%;
                box-sizing: border-box;
                padding: 20px;
                background-color: white;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            .container-two {
                width: 100%;
                box-sizing: border-box;
                background-color: white;
                border-radius: 8px;
                overflow: hidden;
            }
            .logo {
                display: block;
                margin: auto;
                width: 200px;
            }
            .title {
                margin: 20px 0px;
                display: block;
                text-align: center;
                color: #424242;
                font-size: 25px;
                font-weight: 700;
            }
            .text-info-container {
                padding: 3px 0px;
                margin: 5px 0px;
            }

            .text-info-container p {
                padding-bottom: 8px;
            }
            .text-info-container p:last-of-type {
                padding-bottom: 0px;
            }

            .container-first-info-table {
                margin: 20px 0px;
            }
            .summary-and-shipping-container {
                max-width: 700px;
                margin: auto;
            }
            .summary-and-shipping-container > div {
                background-color: #fbfafb;
                width: 100%;
                padding: 10px;
                font-size: 13px;
                border: 1px solid #ddd;
            }
            .summary-and-shipping-container table td {
                width: 50%;
            }
            .container-second-table {
                margin-bottom: 20px;
            }
            .products_table {
                border-collapse: collapse;
                width: 100%;
                font-size: 13px;
            }
            .products_table tr td,
            .products_table tr th {
                padding: 5px 0px;
                border-bottom: 1px solid #bbb;
            }
            .aux-table tr td {
                padding: 0px !important;
                border-bottom: 0px;
            }
            .products_table th {
                text-transform: uppercase;
                background-color: #eee;
            }
            .product_image {
                width: 80px;
                object-fit: contain;
                height: 80px;
            }
            .product_price,
            .order-total-value {
                font-weight: bold;
                color: #e11d48;
            }

            .product_quantity, .product_price{
                text-align: right;
                padding: 8px !important;
            }
            .resume-order-table {
                font-size: 14px;
                width: 100%;
            }
            .resume-order-table td {
                text-align: right;
                padding: 2px 0px;
            }
            .resume-order-table .value-cell {
                width: 100px;
            }
            .call-us-container {
                width: 100%;
                text-align: center;
                padding: 10px 5px;
                background-color: #e11d48;
                color: white;
                font-weight: 3s00;
                font-size: 14px;
            }
            .call-us-container a {
                text-decoration: none;
                color: white;
            }
        </style>
    </head>
    <body>
        <div class="bg-container">
            <div class="container">
                <img
                    class="logo"
                    style="background-color: white"
                    src="{{ config('app.frontend_url') . '/images/logos/logo.png' }}"
                    alt=""
                />

                <div>
                    <h3 class="title">Confirmación de Orden</h3>
                </div>
                <hr />
                <br />
                <div>
                    <div class="text-info-container">
                        <p>Hola <strong style="text-transform: uppercase">{{ $user->first_name }}</strong>.</p>
                        <p>Su orden se ha cofirmado.</p>
                        <p>
                            Gracias por su compra en
                            <a href="{{ config('app.frontend_url') }}">Florecer Contigo</a>.
                            Encuentre los detalles de su pedido a continuación.
                        </p>
                    </div>

                    <div class="container-first-info-table">
                        <div class="summary-and-shipping-container">
                            <div>
                                <strong
                                    style="margin-bottom: 2px; display: block"
                                    >RESUMEN:</strong
                                >
                                <table style="width: 100%">
                                    <tr>
                                        <td>Orden #:</td>
                                        <td>{{ $order->id }}</td>
                                    </tr>
                                    <tr>
                                        <td>Orden Fecha:</td>
                                        <td>{{ date('d-m-Y', strtotime($order->created_at)) }}</td>
                                    </tr>
                                    <tr>
                                        <td>Orden Total:</td>
                                        <td>S/ {{ number_format($order->total_price, 2) }}</td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <strong
                                    style="margin-bottom: 2px; display: block"
                                    >DIRECCIÓN DELIVERY</strong
                                >
                                <table style="width: 100%">
                                    <tr>
                                        <td>Departamento:</td>
                                        <td style="text-transform: uppercase">{{ $delivery_full['region']->name }}</td>
                                    </tr>
                                    <tr>
                                        <td>Ciudad:</td>
                                        <td style="text-transform: capitalize">{{ $delivery_full['location']->name }}</td>
                                    </tr>
                                    <tr>
                                        <td>Dirección:</td>
                                        <td>{{ $delivery_full['delivery']->address }}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="container-second-table">
                        <table class="products_table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>

                            <tbody>
                                @foreach ($cart_products as $cart_product)
                                    <tr>
                                        <td>
                                            <table
                                                style="width: 100%"
                                                class="aux-table"
                                            >
                                                <tr>
                                                    <td style="width: 80px">
                                                        <img
                                                            class="product_image"
                                                            src="{{ config('app.url') . '/storage/images/products/small/'. $cart_product['product']->image_name }}"
                                                            alt=""
                                                        />
                                                    </td>
                                                    <td>
                                                        <p
                                                            style="
                                                                width: 40%;
                                                                display: inline;
                                                                padding-left: 12px;
                                                            "
                                                        >
                                                            {{ $cart_product['product']->name }}
                                                        </p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td class="product_quantity">{{ $cart_product['cart_product']->quantity }}</td>
                                        <td class="product_price">S/ {{ number_format(($cart_product['product']->in_offer == true ? $cart_product['product']->offer_price : $cart_product['product']->price) * $cart_product['cart_product']->quantity, 2) }}</td>
                                    </tr>     
                                @endforeach
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <table class="resume-order-table">
                            <tr>
                                <td>Subtotal:</td>
                                <td class="value-cell">S/ {{ number_format($cart->total_price, 2) }}</td>
                            </tr>
                            <tr>
                                <td>Costo delivery:</td>
                                <td class="value-cell">S/ {{ number_format($delivery_full['location']->delivery_cost, 2) }}</td>
                            </tr>
                            <tr>
                                <td>Impuestos:</td>
                                <td class="value-cell">S/ {{ number_format(0, 2) }}</td>
                            </tr>
                            <tr>
                                <td><strong>Orden Total:</strong></td>
                                <td class="value-cell">
                                    <span class="order-total-value">S/ {{ number_format($order->total_price, 2) }}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <div class="container-two">
                <div class="call-us-container">
                    <p>
                        Para consultas llame a
                        <strong
                            ><a href="tel:+56971359643"
                                >+56 971359643</a
                            ></strong
                        >
                        o responda este correo.
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>
