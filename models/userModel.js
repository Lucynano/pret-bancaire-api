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
const createUser = async (name, email, password, role="admin") => {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    const results = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, hashedPassword, role]
    )
    return results.rows[0]
}

// PUT updated data in an existing user
const updateUser = async (id, name, email, password, role="admin") => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const results = await pool.query(
        'UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *', 
        [name, email, hashedPassword, role, id]
    )
    return results.rows[0]
}

// DELETE a user
const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = $1', [id])
}

const getUserByEmail = async (email) => {
    const results = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    return results.rows
}

const saveRefreshToken = async (id, token) => {
    await pool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [token, id])
}

module.exports = {
    getAllUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    saveRefreshToken
}