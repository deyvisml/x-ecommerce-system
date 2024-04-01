import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Modal = ({ children, title, is_open_modal, setIsOpenModal }) => {
  const close_modal = () => {
    setIsOpenModal(false);
  };

  return (
    <Dialog
      static
      open={is_open_modal}
      onClose={close_modal}
      onClick={() => console.log("xdxd")}
      className="relative z-60 bg-red-200 text-gray-800"
    >
      {/* background */}
      <motion.div
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
        key={"modal-bg"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut" }}
      />
      {/* modal */}
      <div className="fixed inset-0 flex justify-center items-center p-4 w-screen">
        <Dialog.Panel
          as={motion.div}
          className="top-0 flex flex-col gap-4 bg-white py-4 rounded-lg w-full max-w-lg max-h-[90%] text-left overflow-hidden"
          key={"modal"}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ ease: "easeInOut" }}
        >
          <Dialog.Title
            as="div"
            className="flex justify-between items-center px-4 pb-2 border-b"
          >
            <h4 className="font-semibold text-xl">{title}</h4>
            <button
              onClick={close_modal}
              className="flex items-center content-center bg-slate-100 p-1.5 rounded-md text-lg outline-none"
            >
              <XMarkIcon className="w-4" strokeWidth={2.5} />
            </button>
          </Dialog.Title>

          <div className="px-4 overflow-y-auto body">{children}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
