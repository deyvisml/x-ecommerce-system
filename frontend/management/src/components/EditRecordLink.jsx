import React, { forwardRef } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// https://github.com/tailwindlabs/headlessui/issues/1512
const EditRecordLink = forwardRef(({ to }, ref) => {
  const { t } = useTranslation();
  return (
    <Link
      to={to}
      ref={ref}
      className={` p-2 hover:bg-slate-100 w-full flex items-center gap-x-1`}
    >
      <PencilSquareIcon className="w-4" />
      {t("general.buttons.edit")}
    </Link>
  );
});

export default EditRecordLink;
