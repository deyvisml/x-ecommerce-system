import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios_client from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import useManagement from "../hooks/useManagement";

const Login = () => {
  let navigate = useNavigate();
  const { set_token, set_user } = useManagement();

  // trigger on component mount
  useEffect(() => {
    // vaciando
    set_token();
    set_user();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await axios_client(`/api/auth/login`, {
      method: "post",
      data,
    });

    if (!response.data.status) {
      if (response.data.type_error == "validation-error") {
        console.log(response.data.errors);
      } else {
        alert(response.data.message);
      }
      throw new Error(response.data.message);
    }

    const roles = response.data.data.user.roles.map((rol) => rol.name);

    if (roles.includes("administrator") || roles.includes("seller")) {
      set_token(response.data.data.token);
      set_user(response.data.data.user);

      roles.includes("administrator")
        ? navigate(`/administrador`)
        : navigate(`/vendedor`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email", { required: true })} />

        <input type="password" {...register("password", { required: true })} />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;