import {React, useState} from "react";
import { useForm } from "react-hook-form";
import axios from "../utils/api";
import GoogleAuth from "./GoogleAuth";


function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {

      const response = await axios.post("/auth/login", data)
      .catch(function(error){
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message); // Сообщение из сервера
        } else {
          console.log(error)
          setErrorMessage("An unexpected error occurred. Please try again."); // Общая ошибка
        }
      });
      
      const { user } = response.data;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/dashboard"; // Перенаправление на дашборд
      }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        {...register("password", { required: "Password is required" })}
        placeholder="Password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Login</button>
      <GoogleAuth/>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default Login;