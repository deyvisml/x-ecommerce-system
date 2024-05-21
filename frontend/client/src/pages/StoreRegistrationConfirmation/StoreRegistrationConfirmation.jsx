import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const StoreRegistrationConfirmation = () => {
  return (
    <main className="flex flex-grow justify-center items-center">
      <div className="flex flex-col gap-y-4 px-4 py-4 md:py-20 w-full max-w-md text-center text-slate-800">
        <div className="flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key="icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3 }}
            >
              <CheckIcon className="w-36 text-green-400" strokeWidth={2} />
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.h4
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="font-semibold text-2xl"
        >
          Registro de tienda exitoso!
        </motion.h4>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Se revisará la información enviada y obtendrá noticias de su solicitud
          mediante su correo electrónico.
        </motion.p>
      </div>
    </main>
  );
};

export default StoreRegistrationConfirmation;
