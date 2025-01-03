const express = require('express');
const Merchandise = require('../models/Merchandise');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Merchandise:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the merchandise
 *         description:
 *           type: string
 *           description: Description of the merchandise
 *         price:
 *           type: number
 *           description: Price of the merchandise
 *         stock:
 *           type: number
 *           description: Number of items in stock
 *         image:
 *           type: string
 *           description: URL of the merchandise image
 *         category:
 *           type: string
 *           description: Category of the merchandise
 */

/**
 * @swagger
 * tags:
 *   name: Merchandise
 *   description: API for managing merchandise
 */

// Create Merchandise
/**
 * @swagger
 * /api/merchandise:
 *   post:
 *     summary: Create new merchandise
 *     tags: [Merchandise]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Merchandise'
 *     responses:
 *       201:
 *         description: Merchandise created successfully
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const merchandise = new Merchandise(req.body);
    await merchandise.save();
    res.status(201).json(merchandise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Merchandise
/**
 * @swagger
 * /api/merchandise:
 *   get:
 *     summary: Get all merchandise
 *     tags: [Merchandise]
 *     responses:
 *       200:
 *         description: List of merchandise
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const merchandise = await Merchandise.find();
    res.status(200).json(merchandise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Merchandise by ID
/**
 * @swagger
 * /api/merchandise/{id}:
 *   get:
 *     summary: Get merchandise by ID
 *     tags: [Merchandise]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Merchandise ID
 *     responses:
 *       200:
 *         description: Merchandise data
 *       404:
 *         description: Merchandise not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const merchandise = await Merchandise.findById(req.params.id);
    if (!merchandise) return res.status(404).json({ error: 'Merchandise not found' });
    res.status(200).json(merchandise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Merchandise
/**
 * @swagger
 * /api/merchandise/{id}:
 *   put:
 *     summary: Update merchandise by ID
 *     tags: [Merchandise]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Merchandise ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Merchandise'
 *     responses:
 *       200:
 *         description: Merchandise updated
 *       404:
 *         description: Merchandise not found
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
  try {
    const merchandise = await Merchandise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!merchandise) return res.status(404).json({ error: 'Merchandise not found' });
    res.status(200).json(merchandise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Merchandise
/**
 * @swagger
 * /api/merchandise/{id}:
 *   delete:
 *     summary: Delete merchandise by ID
 *     tags: [Merchandise]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Merchandise ID
 *     responses:
 *       200:
 *         description: Merchandise deleted
 *       404:
 *         description: Merchandise not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  try {
    const merchandise = await Merchandise.findByIdAndDelete(req.params.id);
    if (!merchandise) return res.status(404).json({ error: 'Merchandise not found' });
    res.status(200).json({ message: 'Merchandise deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
