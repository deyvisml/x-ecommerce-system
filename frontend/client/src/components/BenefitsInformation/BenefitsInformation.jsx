import React from "react";

const BenefitsInformation = () => {
  const benefits_information = [
    {
      id: 1,
      title: "SERVICIO DE DELIVERY",
      description:
        "Envío de flores en Lima y Callao. Entregas para el mismo dia.",
      image_name: "delivery.webp",
    },
    {
      id: 2,
      title: "PAGOS SEGUROS",
      description: "Compras de manera simple y segura con unos clicks.",
      image_name: "security.png",
    },
    {
      id: 3,
      title: "SERVICIOS PERSONALIZADOS",
      description:
        "Cuidamos cada detalle para ti y la persona que tienes en el corazón.",
      image_name: "client-service.webp",
    },
  ];

  return (
    <div className="bg-neutral-100">
      <div className="mx-auto px-4 max-w-7xl">
        <ul className="flex flex-wrap md:flex-nowrap gap-x-12 gap-y-8 px-5 py-10 sm:py-16">
          {benefits_information.map(
            ({ id, title, description, image_name }) => {
              return (
                <li key={id} className="flex items-start gap-4 w-full md:w-1/3">
                  <img
                    src={`/images/benefits/${image_name}`}
                    alt=""
                    className="w-12 h-auto"
                  />
                  <div className="text-sm">
                    <p className="mb-1 font-bold uppercase">{title}</p>
                    <p className="text-xs sm:text-base">{description}</p>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default BenefitsInformation;
