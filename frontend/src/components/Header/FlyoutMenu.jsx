import { Fragment, useRef, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FlyoutMenu({
  name = "Hover Popover",
  subitems = [
    // [[title: string, href: string], ...]
    ["Home", "/"],
    ["About", "/about"],
    ["Blog", "/blog"],
  ],
}) {
  let timeout; // NodeJS.Timeout
  const timeoutDuration = 100;

  const buttonRef = useRef(null); // useRef<HTMLButtonElement>(null)
  const [openState, setOpenState] = useState(false);

  const toggleMenu = (open) => {
    // log the current open state in React (toggle open state)
    setOpenState((openState) => !openState);
    // toggle the menu by clicking on buttonRef
    buttonRef?.current?.click(); // eslint-disable-line
  };

  // Open the menu after a delay of timeoutDuration
  const onHover = (open, action) => {
    // if the modal is currently closed, we need to open it
    // OR
    // if the modal is currently open, we need to close it
    if (
      (!open && !openState && action === "onMouseEnter") ||
      (open && openState && action === "onMouseLeave")
    ) {
      // clear the old timeout, if any
      clearTimeout(timeout);
      // open the modal after a timeout
      timeout = setTimeout(() => toggleMenu(open), timeoutDuration);
    }
    // else: don't click! 😁
  };

  const handleClick = (open) => {
    setOpenState(!open); // toggle open state in React state
    clearTimeout(timeout); // stop the hover timer if it's running
  };

  const LINK_STYLES = classNames(
    "py-5 px-1 w-48",
    "text-base text-gray-900 uppercase font-bold",
    "transition duration-500 ease-in-out",
    "bg-gray-100 hover:text-blue-700 hover:bg-blue-100"
  );

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      event.stopPropagation();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div>
      <Popover className="relative text-sm">
        {({ open }) => (
          <div
            onMouseEnter={() => onHover(open, "onMouseEnter")}
            onMouseLeave={() => onHover(open, "onMouseLeave")}
            className="flex flex-col border-none"
          >
            <Popover.Button
              ref={buttonRef}
              className="px-4 py-2 text-left outline-none"
            >
              <div
                className="inline-block font-semibold "
                onClick={() => handleClick(open)}
              >
                <span>{name}</span>
              </div>
            </Popover.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="absolute z-10 mx-auto w-36 top-8"
              >
                <div
                  className={classNames(
                    "relative grid space-y-[2px]",
                    "bg-white border border-gray-300 border-solid",
                    "rounded-md text-center"
                  )}
                >
                  {subitems.map(({ name, url }) => {
                    return (
                      <Fragment key={"PopoverPanel<>" + name + url}>
                        <a
                          href={url}
                          className="p-1 duration-200 ease-in-out text-neutral-500 hover:bg-neutral-100"
                        >
                          {name}
                        </a>
                      </Fragment>
                    );
                  })}
                </div>
              </Popover.Panel>
            </Transition>
          </div>
        )}
      </Popover>
    </div>
  );
}
