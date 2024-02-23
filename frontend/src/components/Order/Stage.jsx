import React from "react";
import { Fa1, Fa2, Fa3 } from "react-icons/fa6";
import { Element } from "react-scroll";

const Stage = ({
  children,
  stage,
  title,
  description,
  current_stage,
  set_current_stage,
}) => {
  const handle_click_stage = () => {
    if (stage < current_stage) {
      set_current_stage(stage);
    }
  };

  return (
    <section>
      <Element
        name="xd"
        className={`flex items-center gap-x-4 shadow p-1.5 cursor-pointer  ${
          current_stage == stage
            ? "border border-l-[7px] border-l-purple-500"
            : ""
        } border-gray-300`}
        onClick={handle_click_stage}
      >
        <span className="flex items-center justify-center bg-purple-200 rounded-full w-8 h-8">
          {stage == 1 ? (
            <Fa1
              className={`${
                current_stage == stage ? "text-purple-700" : "text-purple-400"
              }`}
            />
          ) : stage == 2 ? (
            <Fa2
              className={`${
                current_stage == stage ? "text-purple-700" : "text-purple-400"
              }`}
            />
          ) : (
            <Fa3
              className={`${
                current_stage == stage ? "text-purple-700" : "text-purple-400"
              }`}
            />
          )}
        </span>
        <div>
          <h4
            className={`font-bold ${
              current_stage == stage ? "text-purple-700" : "text-gray-500"
            }`}
          >
            {title}
          </h4>
          <p className="text-gray-400 text-xs">{description}</p>
        </div>
      </Element>

      {current_stage == stage && children}
    </section>
  );
};

export default Stage;
