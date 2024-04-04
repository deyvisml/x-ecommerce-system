import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PresentationChartBarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import useManagement from "../hooks/useManagement";
import { useNavigate } from "react-router-dom";

const ChooseRole = () => {
  let navigate = useNavigate();
  const { user, role, set_role } = useManagement();

  const [roles, setRoles] = useState(user.roles);

  const handle_click_role_btn = (role) => {
    set_role(role);
  };

  const skip_first_time_navigate_effect = useRef(true);
  useEffect(() => {
    if (skip_first_time_navigate_effect.current) {
      skip_first_time_navigate_effect.current = false;
      return;
    }

    if (role) {
      switch (role.id) {
        case 1:
          return navigate("/administrador");
        case 2:
          return navigate("/vendedor");
        default:
          return navigate("/");
      }
    }
  }, [role]);

  useEffect(() => {
    if (roles.length == 1) {
      set_role(roles[0]);
    }
  }, []);

  return (
    <main className="flex flex-grow justify-center items-center bg-slate-200 min-h-screen">
      <div className="py-4 w-full md:max-w-lg">
        <motion.h4
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="font-semibold text-2xl text-center"
        >
          ¿Como deseas iniciar sesión?
        </motion.h4>

        <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
          <AnimatePresence>
            {roles.map((role, i) => {
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => handle_click_role_btn(role)}
                  className="flex flex-col justify-center items-center gap-y-2 bg-white hover:bg-slate-50 rounded-md w-52 h-40"
                >
                  {role.id == 1 ? (
                    <PresentationChartBarIcon className="w-12" />
                  ) : (
                    <UserIcon className="w-12" />
                  )}
                  <span className="capitalize">{role.name}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default ChooseRole;
