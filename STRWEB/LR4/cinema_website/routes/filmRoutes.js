const express = require('express');
const Film = require('../models/Film');
const router = express.Router();
const User = require('../models/User')

/**
 * @swagger
 * components:
 *   schemas:
 *     Film:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the film
 *         description:
 *           type: string
 *           description: Description of the film
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: Genre(s) of the film
 *         duration:
 *           type: number
 *           description: Duration of the film in minutes
 *         releaseDate:
 *           type: string
 *           format: date
 *           description: Release date of the film
 *         poster:
 *           type: string
 *           description: URL of the film poster
 *         trailerUrl:
 *           type: string
 *           description: URL of the film trailer
 */

/**
 * @swagger
 * tags:
 *   name: Films
 *   description: API for managing films
 */

// Create Film
router.post('/', async (req, res) => {
  try {
    const film = new Film(req.body);
    await film.save();
    res.status(201).json(film);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Films
router.get('/', async (req, res) => {
  
    const userId = req.query.userId; // Передавайте идентификатор пользователя в запросе
    if (userId) {
      try {
        const allFilms = await Film.find();
        const user = await User.findById(userId).populate("favorites");
        const favorites = user.favorites.map((fav) => fav._id.toString());
  
        const filmsWithFavorites = allFilms.map((film) => ({
          ...film.toObject(),
          favorite: favorites.some((fav) => fav === film._id.toString()),
        }));
    
        res.status(200).json(filmsWithFavorites);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch films" });
      }
    }
    else{
      res.status(200).json(await Film.find());
    }
     

});

// Get Film by ID
router.get('/:id', async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ error: 'Film not found' });
    res.status(200).json(film);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Film
router.put('/:id', async (req, res) => {
  try {
    const film = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!film) return res.status(404).json({ error: 'Film not found' });
    res.status(200).json(film);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Film
router.delete('/:id', async (req, res) => {
  try {
    const film = await Film.findByIdAndDelete(req.params.id);
    if (!film) return res.status(404).json({ error: 'Film not found' });
    res.status(200).json({ message: 'Film deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/favorites/:filmId", async (req, res) => {
  const { filmId } = req.params;
  const {userId } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFavorite = user.favorites.includes(filmId);

    if (isFavorite) {
    
      user.favorites = user.favorites.filter((id) => id.toString() !== filmId);
      await user.save();
      return res.status(200).json({ message: "Film removed from favorites" });
    } else {
      
      const film = await Film.findById(filmId);
      if (!film) {
        return res.status(404).json({ message: "Film not found" });
      }

      user.favorites.push(filmId);
      await user.save();
      return res.status(200).json({ message: "Film added to favorites" });
    }
  } catch (error) {
    console.error("Error toggling favorite film:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:userId/favorites", async (req, res) => {
  const {userId} = req.params;


  try {
    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.favorites.map((film) => film._id));
  } catch (error) {
    console.error("Error fetching favorite films:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
