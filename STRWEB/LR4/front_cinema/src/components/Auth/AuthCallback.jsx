import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                // Получаем параметры из URL
                const params = new URLSearchParams(window.location.search);
                const userId = params.get("userId");

                if (!userId) {
                    console.error("Токен не найден");
                    navigate("/login");
                    return;
                }



                // Запрос на получение данных пользователя
                const response = await axios.get("http://localhost:8000/api/users/" + userId);

                // Сохраняем данные пользователя в localStorage
                
                const user = response.data;
                console.log(user)
                localStorage.setItem("user", JSON.stringify(user));

                // Перенаправляем на дашборд
                navigate("/dashboard");
            } catch (error) {
                console.error("Ошибка при обработке аутентификации", error);
                navigate("/login");
            }
        };

        handleAuthCallback();
    }, [navigate]);

    return <p>Processing authentication...</p>;
};

export default AuthCallback;
