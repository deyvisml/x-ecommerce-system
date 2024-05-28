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
        padding: 15px 5px;
        background-color: #eeeeee;
      }
      .container {
        max-width: 500px;
        margin: auto;
        box-sizing: border-box;
        padding: 15px 12px;
        background-color: white;
        border-radius: 8px;
        margin-bottom: 20px;
      }
      .container-two {
        max-width: 500px;
        margin: auto;
        box-sizing: border-box;
        background-color: white;
        border-radius: 8px;
        overflow: hidden;
      }
      .logo {
        display: block;
        margin: auto;
        height: 70px;
      }
      .title {
        margin: 20px 0px;
        display: block;
        text-align: center;
        color: #424242;
        font-size: 20px;
        font-weight: 700;
      }
      .text-info-container {
        padding: 3px 0px;
        margin: 5px 0px;
      }

      .text-info-container p {
        padding-bottom: 12px;
      }
      .text-info-container p:last-of-type {
        padding-bottom: 0px;
      }

      .call-us-container {
        width: 100%;
        text-align: center;
        padding: 10px 5px;
        background-color: #f43f5e;

        color: white;
        font-weight: 3s00;
        font-size: 14px;
      }
      .call-us-container a {
        text-decoration: none;
        color: white;
        font-size: 12px;
      }

      .reset-password-btn-container {
        margin-top: 40px;
        text-align: center;
      }

      .reset-password-btn {
        text-decoration: none;
        border-radius: 40px;
        display: inline-block;
        color: white !important;
        background-color: #be123c;
        font-size: 13px;
        padding: 8px 20px 9px;
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
          <h4 class="title">Restablecimiento de contraseña</h4>
        </div>
        <hr />
        <br />
        <div>
          <div class="text-info-container">
            <p>
              Hola <strong style="text-transform: uppercase">{{ $user->first_name }}</strong>, ha
              solicitado restablecer sus credenciales de inicio de sesión.
            </p>
            <p>
              Tenga en cuenta que esta acción cambiará su contraseña actual.
            </p>
            <p>
              Para confirmar esta acción, por favor presione el siguiente botón.
            </p>
          </div>

          <div class="reset-password-btn-container">
            <a href="{{ $url }}" class="reset-password-btn">Restablece tu contraseña</a>
          </div>
        </div>
      </div>

      <div class="container-two">
        <div class="call-us-container">
          <p>
            Para consultas llame a
            <strong><a href="tel:+56971359643">+56 971359643</a></strong>
            o responda este correo.
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
