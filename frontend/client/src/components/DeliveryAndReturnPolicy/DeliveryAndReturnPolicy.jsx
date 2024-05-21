import React, { useState, useRef, useEffect } from "react";
import deliveryReturnPolicyData from "./DeliveryAndReturnPolicyData";

const DeliveryAndReturnPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (activeIndex !== null) {
      const contentEl = contentRefs.current[activeIndex];
      if (contentEl) {
        contentEl.style.maxHeight = contentEl.scrollHeight + "px";
      }
    }

    contentRefs.current.forEach((contentEl, idx) => {
      if (idx !== activeIndex && contentEl) {
        contentEl.style.maxHeight = "0px";
      }
    });
  }, [activeIndex]);

  return (
    <div className="bg-gray-100 p-8">
      <div className="bg-white shadow-md mx-auto p-6 rounded-lg max-w-3xl">
        <h1 className="mb-6 font-semibold text-3xl text-center text-rose-600">
          Políticas de Entrega, Garantía y Devolución de Productos
        </h1>
        <p className="mb-4">
          En Florecer Contigo, nos comprometemos a proporcionar productos y
          servicios de alta calidad a nuestros clientes. Lea atentamente
          nuestras políticas de entrega, garantía y devolución para comprender
          mejor cómo manejamos estos aspectos importantes.
        </p>

        {deliveryReturnPolicyData.map((policy, index) => (
          <div key={index} className="mb-4 border-rose-700 border-b">
            <div
              className="flex justify-between items-center bg-rose-500 hover:bg-rose-600 p-4 text-white cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <h2 className="font-semibold text-xl">{policy.title}</h2>
              <span
                className={`arrow transition-transform duration-300 ${
                  activeIndex === index ? "rotate-90" : ""
                }`}
              >
                &#9654;
              </span>
            </div>
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="max-h-0 transition-all duration-300 overflow-hidden ease-in-out"
            >
              <div className="bg-white p-4">
                <p className="text-black">{policy.content}</p>
              </div>
            </div>
          </div>
        ))}

        <p className="mb-4">
          Si tiene alguna pregunta o inquietud sobre estas Políticas de Entrega,
          Garantía y Devolución de Productos, por favor contáctenos en
          <a href="mailto:admin@admin.com" className="mt-6 text-rose-600">
            {" "}
            florecer.contigo.business@gmail.com
          </a>
          .
        </p>
        <p className="mb-4">Gracias por elegir 'Florecer Contigo'.</p>
      </div>
    </div>
  );
};

export default DeliveryAndReturnPolicy;
