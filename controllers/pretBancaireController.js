const pretBancaireModel = require("../models/pretBancaireModel")

const createPretBancaire = async (request, response) => {
    const { n_compte, nom_client, nom_banque, montant, date_pret, taux_pret } = request.body
    try {
        const pret_bancaire = await pretBancaireModel.createPretBancaire(n_compte, nom_client, nom_banque, montant, date_pret, taux_pret)
        response.status(201).json(pret_bancaire)
    } catch (error) {
        console.error(error);
        response.status(500).send("Error creating pret_bancaire")
    }
}

const getAllPretBancaires = async (request, response) => {
    try {
        const pret_bancaires = await pretBancaireModel.getAllPretBancaires();
        response.status(200).json(pret_bancaires);
    } catch (error) {
        console.error(error);
        response.status(500).send("Error retrieving pret_bancaire")
    }
}

const getPretBancaireById = async (request, response) => {
    const id = parseInt(request.params.id, 10)
    try {
        const pret_bancaire = await pretBancaireModel.getPretBancaireById(id)
        if (!pret_bancaire) return response.status(404).send("Pret bancaire not found")
        response.status(200).json(pret_bancaire)
    } catch (error) {
        console.error(error);
        response.status(500).send("Error retrieving pret_bancaire")
    }
}

const updatePretBancaire = async (request, response) => {
    const id = parseInt(request.params.id, 10)
    const { n_compte, nom_client, nom_banque, montant, date_pret, taux_pret } = request.body
    try {
        const pret_bancaire = await pretBancaireModel.updatePretBancaire(id, n_compte, nom_client, nom_banque, montant, date_pret, taux_pret)
        response.status(200).send(`Pret bancaire modified with ID: ${pret_bancaire.id}`)
    } catch (error) {
        console.error(error);
        response.status(500).send("Error updating pret_bancaire")
    }
}

const deletePretBancaire = async (request, response) => {
    const id = parseInt(request.params.id, 10)
    try {
        await pretBancaireModel.deletePretBancaire(id)
        response.status(200).send(`Pret bancaire deleted with ID: ${id}`)
    } catch (error) {
        console.error(error);
        response.status(500).send("Error deleting pret_bancaire")
    }
}

const montantTotal = async (request, response) => {
    try {
        const total = await pretBancaireModel.montantTotal();
        response.status(200).json({ total });
    } catch (error) {
        console.error(error);
        response.status(500).send("Error in calculating the sum")
    }
}

const montantMinimal = async (request, response) => {
    try {
        const min = await pretBancaireModel.montantMinimal();
        response.status(200).json({ min });
    } catch (error) {
        console.error(error);
        response.status(500).send("Error finding min")
    }
}

const montantMaximal = async (request, response) => {
    try {
        const max = await pretBancaireModel.montantMaximal();
        response.status(200).json({ max });
    } catch (error) {
        console.error(error);
        response.status(500).send("Error finding max")
    }
}

module.exports = {
    createPretBancaire,
    getAllPretBancaires,
    getPretBancaireById, 
    updatePretBancaire,
    deletePretBancaire,
    montantTotal,
    montantMinimal,
    montantMaximal
}