/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Routes liées aux utilisateurs
 */

const express = require("express");
const { getUser, updateUser } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Récupérer les informations d'un utilisateur
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de l'utilisateur à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get("/:id", verifyToken, getUser);


/**
 * @swagger
 * /api/user/updateUser/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update username
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/updateUser/:id", verifyToken, updateUser);


module.exports = router;
