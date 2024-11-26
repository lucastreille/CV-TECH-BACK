const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  description: { type: String, required: true, minlength: 10 },
  experiencePedagogique: { type: String, required: true },
  experiencePro: { type: String, required: true },
  is_visible: { type: Number, required: true }
});

cvSchema.index({ nom: 1, prenom: 1 }, { unique: true });

module.exports = mongoose.model("CV", cvSchema);
