const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const cvRoutes = require("./cv");

router.use("/auth", authRoutes); 
router.use("/users", userRoutes); 
router.use("/cv", cvRoutes); 

module.exports = router;
