import React from "react";

const WhatsappFloatingButton = ({
  x_position = "right-5",
  y_position = "bottom-5",
}) => {
  return (
    <a
      href="https://web.whatsapp.com/send?phone=51975032529"
      target="_blank"
      className={`${x_position} ${y_position} z-50 fixed cursor-pointer group`}
    >
      <img
        src="https://static.techspot.com/images2/downloads/topdownload/2016/05/WhatsApp_Logo_1.png"
        alt="whatsapp icon"
        className="drop-shadow-md group-hover:drop-shadow-xl w-14"
      />
    </a>
  );
};

export default WhatsappFloatingButton;
