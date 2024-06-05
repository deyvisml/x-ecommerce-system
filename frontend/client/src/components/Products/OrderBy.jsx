import { Fragment, useState, useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

const OrderBy = ({ setOrderBy }) => {
  const { t } = useTranslation();

  const options = useMemo(
    () => [
      { id: 1, column: null, way: null, name: t("order_by.options.one") },
      {
        id: 2,
        column: "products.name",
        way: "ASC",
        name: t("order_by.options.two"),
      },
      {
        id: 3,
        column: "products.name",
        way: "DESC",
        name: t("order_by.options.three"),
      },
      {
        id: 4,
        column: "products.price",
        way: "ASC",
        name: t("order_by.options.four"),
      },
      {
        id: 5,
        column: "products.price",
        way: "DESC",
        name: t("order_by.options.five"),
      },
    ],
    []
  );

  const [selected, setSelected] = useState(options[0]);

  const handle_change_order_by_select = (e) => {
    setSelected(e);
    setOrderBy({ column: e.column, way: e.way });
  };

  return (
    <div className="z-10 w-60 text-gray-700 text-sm">
      <Listbox value={selected} onChange={handle_change_order_by_select}>
        <div className="relative">
          <Listbox.Label className="block mb-1 font-bold text-sm">
            {t("order_by.title")}:
          </Listbox.Label>
          <Listbox.Button className="relative border-gray-400 bg-white py-1.5 border rounded-lg w-full text-left text-xs pe-8 ps-1.5 focus:outline-none">
            <span className="block truncate">{selected.name}</span>
            <span className="right-0 absolute inset-y-0 flex items-center pr-0.5 pointer-events-none">
              <ChevronUpDownIcon
                className="w-4 h-4 text-gray-400"
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
            <Listbox.Options className="absolute bg-white shadow-lg mt-1 py-1 rounded-md w-full max-h-60 sm:text-sm overflow-auto ring-1 ring-black/5 focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative select-none p-2 cursor-pointer text-xs  ${
                      active ? " text-amber-900 bg-gray-100" : "text-gray-900"
                    } ${selected == option ? "bg-rose-100" : ""}`
                  }
                  value={option}
                >
                  <span>{option.name}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default OrderBy;
