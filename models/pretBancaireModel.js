const pool = require("../config/database")

const createPretBancaire = async (compte, nom, banque, montant, date, taux) => {
    const results = await pool.query(
        'INSERT INTO pret_bancaire (n_compte, nom_client, nom_banque, montant, date_pret, taux_pret) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [compte, nom, banque, montant, date, taux]
    )
    return results.rows[0]
}

const getAllPretBancaires = async () => {
    const results = await pool.query('SELECT * FROM pret_bancaire ORDER BY id ASC')
    return results.rows
}

const updatePretBancaire = async (id, compte, nom, banque, montant, date, taux) => {
    const results = await pool.query(
        'UPDATE pret_bancaire SET n_compte = $1, nom_client = $2, nom_banque = $3, montant = $4, date_pret = $5, taux_pret = $6 WHERE id = $7 RETURNING *', 
        [compte, nom, banque, montant, date, taux, id]
    )
    return results.rows[0]
}

const deletePretBancaire = async (id) => {
    await pool.query('DELETE FROM pret_bancaire WHERE id = $1', [id])
}

const montantTotal = async () => {
    const results = await pool.query('SELECT SUM(montant) FROM pret_bancaire')
    return results.rows[0].sum
}

const montantMinimal = async () => {
    const results = await pool.query('SELECT MIN(montant) FROM pret_bancaire')
    return results.rows[0].min
}

const montantMaximal = async () => {
    const results = await pool.query('SELECT MAX(montant) FROM pret_bancaire')
    return results.rows[0].max
}

module.exports = {
    createPretBancaire,
    getAllPretBancaires,
    updatePretBancaire,
    deletePretBancaire,
    montantTotal,
    montantMaximal,
    montantMinimal
}