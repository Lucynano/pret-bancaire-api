const express = require("express")
const router = express.Router()
const pretBancaireController = require("../controllers/pretBancaireController")

router.post('/pret_bancaire', pretBancaireController.createPretBancaire)
router.get('/pret_bancaire', pretBancaireController.getAllPretBancaires)
router.get('/pret_bancaire/total', pretBancaireController.montantTotal)
router.get('/pret_bancaire/min', pretBancaireController.montantMinimal)
router.get('/pret_bancaire/max', pretBancaireController.montantMaximal)
router.get('/pret_bancaire/:id', pretBancaireController.getPretBancaireById)
router.put('/pret_bancaire/:id', pretBancaireController.updatePretBancaire)
router.delete('/pret_bancaire/:id', pretBancaireController.deletePretBancaire)

module.exports = router