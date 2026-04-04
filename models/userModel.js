const pool = require("../config/database")
const bcrypt = require("bcrypt")

// GET all users
const getAllUsers = async () => {
    const results = await pool.query('SELECT * FROM users ORDER BY id ASC')
    return results.rows
}

// GET a single user by ID
const getUserById = async (id) => {
    const results = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return results.rows
}

// POST a new user
const createUser = async (name, email, password, role="user") => {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    const results = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, hashedPassword, role]
    )
    return results.rows[0]
}

// PUT updated data in an existing user
const updateUser = async (id, name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const results = await pool.query(
        'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', 
        [name, email, hashedPassword, id]
    )
    return results.rows[0]
}

// DELETE a user
const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id])
}

module.exports = {
    getAllUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}