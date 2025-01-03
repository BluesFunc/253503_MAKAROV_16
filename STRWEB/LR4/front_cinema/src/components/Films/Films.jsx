import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "../utils/api";

const Films = () => {
  const [films, setFilms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [user, setUser] = useState(null);


 const navigate = useNavigate();

  

 useEffect(() => {
  const storedUser = localStorage.getItem("user");
    
      
      const fetchFilms = async () => {
        let params = null;
        try {
          if (storedUser){
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            params =  { userId: parsedUser._id }
          
          }
          
          const response =  await axios.get("/films", {
            params: params,
          });
          setFilms(response.data);
      
    }
        catch (error) {
        console.error("Failed to fetch films", error);
      }
    };
    fetchFilms();

}, []);






  const filteredFilms = films
    .filter((film) =>
      film.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "date") {
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      }
      return 0;
    });

    const toggleFavorite = (id) => {
      if (!user){
        navigate('/login')
      }

      const response = axios.post("films/favorites/"+ id,
        {
          userId: user._id,
        }
       );

    
    setFilms((prevFilms) =>
        prevFilms.map((film) =>
          film._id === id ? { ...film, favorite: !film.favorite } : film
        )
      );
    };

    

  return (
    <div>
      <h2>Films</h2>
      <div>
        <input
          type="text"
          placeholder="Search films..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort by</option>
          <option value="title">Title</option>
          <option value="date">Release Date</option>
        </select>
      </div>
      <div className="card-container">
        {filteredFilms.length > 0 ? (
          filteredFilms.map((film) => (
            <div className="card" key={film._id}>
              <img src={film.poster} alt={film.title} />
              <h3>{film.title}</h3>
              <p>{film.description}</p>
              <p>{new Date(film.releaseDate).toDateString()}</p> 
                <button onClick={() => toggleFavorite(film._id)}>
                  {film.favorite ? "❤️" : "🤍"}
                 </button> 
            </div>
          ))
        ) : (
          <p>No films available.</p>
        )}
      </div>
    </div>
  );
};

export default Films;
