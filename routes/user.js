const express = require("express");
const { getUser } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// Route protégée : Récupérer les informations d'un utilisateur
router.get("/:id", verifyToken, getUser);

module.exports = router;
