import {React, useState} from "react";
import { useForm } from "react-hook-form";
import axios from "../utils/api";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
  
    try {
      const response = await axios.post("/auth/register", data);
      const { message } = response.data;
  
      if (message) {
        window.alert("Registration successful! You can now log in.");
        window.location.href = "/login"; // Перенаправление на страницу логина
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Сообщение из сервера
      } else {
        setErrorMessage("An unexpected error occurred. Please try again."); // Общая ошибка
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("username", { required: "Name is required" })}
        placeholder="Name"
      />
      {errors.name && <p>{errors.name.message}</p>}

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

      <button type="submit">Register</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default Register;