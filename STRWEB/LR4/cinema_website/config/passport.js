const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: "SECRET",
      clientSecret: "SECRET",
      callbackURL: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Если пользователь не найден, создаём нового пользователя
          const temporaryPassword = generatePassword();

          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            password: temporaryPassword, // Временный пароль
            role: "user"
          });

          await user.save();
        }

        // После того как мы нашли или создали пользователя, сериализуем его
        return done(null, user); // В сессии будет храниться объект user
      } catch (error) {
        return done(error, null);
      }
    }
  )
);


passport.use(
    new LocalStrategy(
      {
        usernameField: "email",  // Мы используем email как логин
        passwordField: "password",  // Поле для пароля
      },
      async (email, password, done) => {
        try {
          // Ищем пользователя по email
          const user = await User.findOne({ email });
  
          if (!user) {
            // Если пользователь не найден, возвращаем ошибку
            return done(null, false, { message: "Incorrect email or password" });
          }
  
          // Сравниваем пароль в открытом виде (это небезопасно, но для вашего случая подходит)
          if (user.password !== password) {
            // Если пароли не совпадают, возвращаем ошибку
            return done(null, false, { message: "Incorrect email or password" });
          }
          
          // Если пользователь найден и пароли совпали, возвращаем пользователя
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

// Сериализация пользователя (сохранение данных о пользователе в сессии)
passport.serializeUser((user, done) => {
  done(null, user.id); // Сохраняем только ID пользователя
});

// Десериализация пользователя (получение данных из сессии)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // Добавляем пользователя в объект сессии
  } catch (error) {
    done(error, null);
  }
});

// Функция для генерации имени пользователя


// Функция для генерации временного пароля
function generatePassword() {
  const crypto = require("crypto");
  return crypto.randomBytes(8).toString("hex");
}

module.exports = passport;
