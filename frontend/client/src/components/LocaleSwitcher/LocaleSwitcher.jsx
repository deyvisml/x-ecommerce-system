import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { supportedLngs } from "../../i18n/config";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";

import { GlobeAltIcon } from "@heroicons/react/24/outline";

export default function LocaleSwitcher() {
  const { i18n } = useTranslation();

  const [selected, setSelected] = useState(i18n.resolvedLanguage);

  return (
    <>
      <Listbox
        value={selected}
        onChange={(v) => {
          setSelected(v);
          i18n.changeLanguage(v);
        }}
        as={"div"}
        className="w-28 md:w-56"
      >
        <div className="relative">
          <Listbox.Button className="relative flex items-center border-slate-300 bg-white py-2 pr-10 pl-3 border rounded-lg w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <GlobeAltIcon className="inline-block min-w-5 max-w-5 min-h-5 max-h-5 me-1" />
            <span className="md:inline-block hidden mt-0.5">
              {supportedLngs[selected]}
            </span>
            <span className="md:hidden mt-0.5 uppercase">{selected}</span>
            <span className="right-0 absolute inset-y-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute bg-white shadow-lg mt-1 py-1 border rounded-md w-full max-h-60 text-base sm:text-sm cursor-pointer overflow-auto ring-1 ring-black/5 focus:outline-none">
              {Object.entries(supportedLngs).map(([code, name]) => (
                <Listbox.Option
                  key={code}
                  className={({ active }) =>
                    `relative  cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-rose-50 text-red-800" : "text-gray-900"
                    }`
                  }
                  value={code}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate  ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        <span className="md:inline-block hidden">{name} -</span>
                        <span className="uppercase"> {code}</span>
                      </span>
                      {selected ? (
                        <span className="left-0 absolute inset-y-0 flex items-center pl-3 text-rose-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
}
