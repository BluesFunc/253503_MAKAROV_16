const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const validator = require('validator')


function validatePassword(password) {
    // Минимум 8 символов, хотя бы одна цифра, одна заглавная и одна строчная буква, хотя бы один спецсимвол
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  }

// Временное хранилище для авторизованных сессий
router.post("/login", passport.authenticate("local", {
    successRedirect: "protected", // После успешного логина перенаправляем на защищённую страницу
    failureRedirect: "login", // В случае ошибки перенаправляем на страницу логина
    failureFlash: true, // Включаем флеш-сообщения (если нужно)
  })
);
  
  // Регистрация нового пользователя
  router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username,email,password);

    if (!validator.isEmail(email)){
        return res.status(400).json({message: "Wrong email format"})
    }
    
    if(!validatePassword(password))
    {
        return res.status(400).json({message: "Wrong password format"})
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
  
    // Создание нового пользователя
    const newUser = new User({
      username,
      email,
      password, // Храним пароль в открытом виде
      role: "user",
    });
  
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  });
  
  // Защищённый маршрут для проверенных пользователей
  router.get("/protected", (req, res) => {
    if (req.isAuthenticated()) {
      return res.json({ message: "This is protected content", user: req.user });
    } else {
      return res.status(401).json({ message: "Not authenticated" });
    }
  });
  
  // Выход из системы (завершаем сессию)
  router.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
  
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  // Callback для Google, получение токена
  router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
    
     res.redirect(`http://localhost:3000/auth/callback?userId=${req.user._id.toString()}`);
    }
  );
  




module.exports = router;
