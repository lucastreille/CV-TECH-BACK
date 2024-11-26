const mongoose = require("mongoose");

const recommandationSchema = new mongoose.Schema({
  idCv: { type: String, required: true },
  recommendation: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model("Recommandation", recommandationSchema);
