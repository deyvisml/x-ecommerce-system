import React, { forwardRef } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// https://github.com/tailwindlabs/headlessui/issues/1512
const EditRecordLink = forwardRef(({ to }, ref) => {
  return (
    <Link
      to={to}
      ref={ref}
      className={` p-2 hover:bg-slate-100 w-full flex items-center gap-x-1`}
    >
      <PencilSquareIcon className="w-4" />
      Editar
    </Link>
  );
});

export default EditRecordLink;
