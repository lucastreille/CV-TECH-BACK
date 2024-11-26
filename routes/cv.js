/**
 * @swagger
 * tags:
 *   - name: CV
 *     description: Routes liées aux CVs
 *   - name: Recommendations
 *     description: Routes liées aux recommandations
 */

const express = require("express");
const {
  createCv,
  updateCv,
  listeUserCv,
  showVisibleCv,
  rechercheCv,
  detailsCv,
  giveRecommandationCv,
  listeRecommandationCv,
} = require("../controllers/cvController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/cv/createCv:
 *   post:
 *     tags:
 *       - CV
 *     summary: Create a new CV
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: CV created successfully
 */
router.post("/createCv", verifyToken, createCv);

/**
 * @swagger
 * /api/cv/updateCv/{id}:
 *   put:
 *     tags:
 *       - CV
 *     summary: Update an existing CV
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
 *         description: CV updated successfully
 */
router.put("/updateCv/:id", verifyToken, updateCv);

/**
 * @swagger
 * /api/cv/liste-user-cv:
 *   get:
 *     tags:
 *       - CV
 *     summary: Get list of user CVs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user CVs
 */
router.get("/liste-user-cv", verifyToken, listeUserCv);

/**
 * @swagger
 * /api/cv/show-visible-cv:
 *   get:
 *     tags:
 *       - CV
 *     summary: Show visible CVs
 *     responses:
 *       200:
 *         description: List of visible CVs
 */
router.get("/show-visible-cv", showVisibleCv);

/**
 * @swagger
 * /api/cv/recherche-cv:
 *   post:
 *     tags:
 *       - CV
 *     summary: Search for CVs
 *     responses:
 *       200:
 *         description: Search results
 */
router.post("/recherche-cv", rechercheCv);

/**
 * @swagger
 * /api/cv/details-cv/{id}:
 *   get:
 *     tags:
 *       - CV
 *     summary: Get CV details
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
 *         description: CV details
 */
router.get("/details-cv/:id", verifyToken, detailsCv);

/**
 * @swagger
 * /api/cv/give-recommandation-cv:
 *   post:
 *     tags:
 *       - Recommendations
 *     summary: Give a recommendation for a CV
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recommendation given successfully
 */
router.post("/give-recommandation-cv", verifyToken, giveRecommandationCv);

/**
 * @swagger
 * /api/cv/list-recommandation-cv/{idCv}:
 *   get:
 *     tags:
 *       - Recommendations
 *     summary: Get list of recommendations for a CV
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCv
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of recommendations for a CV
 */
router.get("/list-recommandation-cv/:idCv", verifyToken, listeRecommandationCv);

/**
 * @swagger
 * /api/cv/list-recommandation-cv:
 *   get:
 *     tags:
 *       - Recommendations
 *     summary: Get list of all recommendations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all recommendations
 */
router.get("/list-recommandation-cv", verifyToken, listeRecommandationCv);

module.exports = router;
