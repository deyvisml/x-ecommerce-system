import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const ApplyCoupon = () => {
  return (
    <Disclosure
      as={"div"}
      className="border-2 rounded-lg overflow-hidden"
      defaultOpen={true}
    >
      {({ open }) => (
        <>
          <Disclosure.Button
            className={`flex justify-between bg-neutral-100 px-3 py-2 w-full font-semibold text-left text-sm hover:text-rose-600 ${
              open ? "border-b-2" : ""
            }`}
          >
            <span>Aplicar Cupón</span>
            <ChevronUpIcon
              className={`${
                open ? "rotate-180 transform" : ""
              } h-5 w-5 text-purple-500`}
            />
          </Disclosure.Button>
          <Transition
            className="duration-300"
            enter="transition-all duration-300 ease-in"
            enterFrom="origin-top scale-y-0 h-0"
            enterTo="origin-top scale-y-100 h-32"
            leave="transition-all duration-300 ease-in"
            leaveFrom="origin-top scale-y-100 h-32"
            leaveTo="origin-top scale-y-0 h-0"
          >
            <Disclosure.Panel as="div" className="px-3 py-5 h-32 text-xs">
              <div className="flex flex-col gap-y-4">
                <input
                  type="text"
                  placeholder="Cupón"
                  className="block p-2 border border-gray-300 w-full outline-none rounded"
                />
                <button className="bg-white hover:bg-rose-400 p-2 border border-rose-400 rounded-lg w-full text-rose-500 hover:text-white transition-all duration-300 ease-in-out">
                  Aplicar cupón
                </button>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default ApplyCoupon;
