const CV = require("../models/Cv");
const Recommandation = require("../models/Recommandation");
const jwt = require("jsonwebtoken");

exports.createCv = async (req, res) => {

  try {

    const { nom, prenom, description, experiencePedagogique, experiencePro, is_visible } = req.body;

    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    

    const newCv = new CV({ userId, nom, prenom, description, experiencePedagogique, experiencePro, is_visible});
    await newCv.save();
    res.status(201).json({ message: newCv });

  } catch (err) {

    res.status(500).json({ message: "Erreur serveur", error: err.message });
    
  }

};



exports.updateCv = async (req, res) => {

  try {

    const cvId = req.params.id;
    const cvData = req.body;

    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    

    const updatedCV = await CV.findOneAndUpdate(
      { _id: cvId, userId: userId }, 
      cvData, 
      { new: true, runValidators: true } 
    );
    if (!updatedCV) {
      return res.status(404).json({ 
        message: "CV non trouvé"
      });
    }

    res.status(200).json({ 
      message: "CV mis à jour avec succès", 
      cv: updatedCV 
    });

  } catch (err) {

    res.status(500).json({ message: "Erreur serveur", error: err.message });
    
  }

};


exports.showVisibleCv = async (req, res) => {

  try {

    const visibleCVs = await CV.find({ is_visible: 1 });

    res.status(200).json({
      message: "Liste des CV visibles",
      cvs: visibleCVs,
    });


  } catch (err) {

    res.status(500).json({ message: "Erreur serveur", error: err.message });
    
  }

};


exports.listeUserCv = async (req, res) => {

  try {

    
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    
    const listeUserCv = await CV.find({ userId: userId});

    res.status(200).json({
      message: "Liste des CV pour chaque utilisateur",
      cvs: listeUserCv,
    });


  } catch (err) {

    res.status(500).json({ message: "Erreur serveur", error: err.message });
    
  }

};


exports.rechercheCv = async (req, res) => {

  const { recherche } = req.body; 

  if (!recherche) {
    return res.status(400).json({ message: "Le paramètre 'recherche' est requis" });
  }

  try {

    const cvs = await CV.find({
      $and: [
        {
          $or: [
            { nom: new RegExp(recherche, "i") },  
            { prenom: new RegExp(recherche, "i") } 
          ]
        },
        { is_visible: 1 } 
      ]
    });

    if (cvs.length === 0) {
      return res.status(404).json({ message: "Aucun CV trouvé" });
    }

    res.status(200).json({
      message: "Résultats de la recherche",
      cvs
    });

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });

  }

};

exports.detailsCv = async (req, res) => {

  const cvId = req.params.id;

  try {

    const visibleCV = await CV.findOne({ _id: cvId, is_visible: 1 });

    if (!visibleCV) {
      return res.status(404).json({ message: "CV non trouvé ou non visible." });
    }

    // Retourner le CV trouvé
    res.status(200).json({
      message: "Détails du CV",
      cv: visibleCV,
    });

  } catch (err) {
    res.status(500).json({
      message: "Erreur serveur",
      error: err.message,
    });
  }

};


exports.giveRecommandationCv = async (req, res) => {
  const { idCv, recommendation } = req.body;

  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const newRecommandation = new Recommandation({
      idCv,
      recommendation,
      userId, 
    });
    
    await newRecommandation.save();
    res.status(201).json({ message: "Recommandation ajoutée avec succès", recommandation: newRecommandation });
  } catch (err) {
    res.status(500).json({
      message: "Erreur serveur",
      error: err.message,
    });
  }
};


exports.listeRecommandationCv = async (req, res) => {

  const cvId = req.params.idCv;

  try {

    const recommandationCV = await Recommandation.find({ idCv: cvId });

    if (!recommandationCV) {
      return res.status(404).json({ message: "Recommandation non trouvée." });
    }

    // Retourner le CV trouvé
    res.status(200).json({
      message: "Recommendation du CV",
      recommantation: recommandationCV,
    });

  } catch (err) {
    res.status(500).json({
      message: "Erreur serveur",
      error: err.message,
    });
  }

  exports.listeRecommandationCv = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: "Token manquant ou invalide." });
    }
  
    try {
      const decodedToken = jwt.decode(token);
      const userId = decodedToken.id;  // L'ID de l'utilisateur connecté
  
      const recommendations = await Recommandation.find({ userId });
  
      if (recommendations.length === 0) {
        return res.status(404).json({ message: "Aucune recommandation trouvée pour cet utilisateur." });
      }
  
      return res.status(200).json({ recommantation: recommendations });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur lors du chargement des recommandations." });
    }
  };  

};
