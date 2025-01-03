import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../utils/api";

const AdminFilms = () => {
  const [films, setFilms] = useState([]);
  const [editingFilm, setEditingFilm] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Проверка роли пользователя
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate("/login"); // Если пользователь не авторизован, отправляем на страницу входа
      return;
    }

    const user = JSON.parse(storedUser);
    if (user['role'] !== "admin") {
      
      navigate("/dashboard"); // Если пользователь не админ, перенаправляем на главную страницу
      return;
    }

    // Загрузка фильмов
    const fetchFilms = async () => {
      try {
        const response = await axios.get("/films");
        setFilms(response.data);
      } catch (error) {
        console.error("Failed to fetch films", error);
      }
    };
    fetchFilms();
  }, [navigate]);

  const handleCreateFilm = async (data) => {
    try {
      const response = await axios.post("/films", data);
      setFilms((prev) => [...prev, response.data]);
      reset();
    } catch (error) {
      console.error("Failed to create film", error);
    }
  };

  const handleEditFilm = (film) => {
    setEditingFilm(film);
    reset(film);
  };

  const handleUpdateFilm = async (data) => {
    try {
      const response = await axios.put(`/films/${editingFilm._id}`, data);
      setFilms((prev) =>
        prev.map((film) => (film._id === editingFilm._id ? response.data : film))
      );
      setEditingFilm(null);
      reset();
    } catch (error) {
      console.error("Failed to update film", error);
    }
  };

  const handleDeleteFilm = async (id) => {
    try {
      await axios.delete(`/films/${id}`);
      setFilms((prev) => prev.filter((film) => film._id !== id));
    } catch (error) {
      console.error("Failed to delete film", error);
    }
  };

  return (
    <div>
      <h2>Admin - Films</h2>
      <form
        onSubmit={handleSubmit(editingFilm ? handleUpdateFilm : handleCreateFilm)}
      >
        <div>
          <label>Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Film Title"
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <label>Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Film Description"
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div>
          <label>Duration (minutes)</label>
          <input
            type="number"
            {...register("duration", {
              required: "Duration is required",
              min: { value: 1, message: "Duration must be at least 1 minute" },
            })}
            placeholder="Film Duration"
          />
          {errors.duration && <p>{errors.duration.message}</p>}
        </div>
        <div>
          <label>Release Date</label>
          <input
            type="date"
            {...register("releaseDate", { required: "Release date is required" })}
          />
          {errors.releaseDate && <p>{errors.releaseDate.message}</p>}
        </div>
        <div>
          <label>Poster URL</label>
          <input
            {...register("poster", { required: "Poster URL is required" })}
            placeholder="Film Poster URL"
          />
          {errors.poster && <p>{errors.poster.message}</p>}
        </div>
        <div>
          <label>Trailer URL</label>
          <input
            {...register("trailerUrl")}
            placeholder="Film Trailer URL"
          />
          {errors.trailerUrl && <p>{errors.trailerUrl.message}</p>}
        </div>
        <button type="submit">{editingFilm ? "Update" : "Create"} Film</button>
        {editingFilm && (
          <button type="button" onClick={() => setEditingFilm(null)}>
            Cancel Edit
          </button>
        )}
      </form>
      <hr />
      <h3>All Films</h3>
      <div className="film-list">
        {films.map((film) => (
          <div key={film._id} className="film-item">
            <h4>{film.title}</h4>
            <p>{film.description}</p>
            <p>Duration: {film.duration} minutes</p>
            <p>Release Date: {new Date(film.releaseDate).toDateString()}</p>
            <img src={film.poster} alt={film.title} style={{ width: "100px" }} />
            <div>
              <button onClick={() => handleEditFilm(film)}>Edit</button>
              <button onClick={() => handleDeleteFilm(film._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFilms;
