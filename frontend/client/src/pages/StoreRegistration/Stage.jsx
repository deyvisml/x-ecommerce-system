import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/outline";

const Stage = ({
  stage,
  completed_stages,
  setShowStage,
  name,
  description,
  icon,
}) => {
  const handle_complete_btn = () => {
    setShowStage(stage);
  };

  return (
    <li className={`flex items-center gap-x-4  px-3 py-6`}>
      <div className="relative flex justify-center items-center border-2 border-slate-300 rounded-full w-10 h-10">
        {icon}
        {completed_stages.has(stage) && (
          <CheckCircleIcon className="-right-1 -bottom-0.5 absolute w-5 text-green-600" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-semibold">{name}</p>
        <p className="text-xs">{description}</p>
      </div>
      <div>
        {completed_stages.has(stage) ? (
          <button
            type="button"
            onClick={handle_complete_btn}
            className="hover:bg-rose-100 px-3 py-2 rounded text-rose-500 transition-all duration-300 ease-in-out"
          >
            <PencilIcon className="w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handle_complete_btn}
            className="bg-rose-500 hover:bg-rose-600 px-3 py-2 rounded font-semibold text-white text-xs transition-all duration-200 ease-in-out"
          >
            Completar
          </button>
        )}
      </div>
    </li>
  );
};

export default Stage;
