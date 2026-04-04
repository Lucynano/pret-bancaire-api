const userModel = require("../models/userModel")

// GET all users
const getAllUsers = async (request, response) => {
    try {
        const users = await userModel.getAllUsers();
        response.status(200).json(users);
    } catch (error) {
        console.error(error);
        response.status(500).send("Error retrieving users")
    }
}

// GET a single user by ID
const getUserById = async (request, response) => {
    const id = parseInt(request.params.id, 10)
    try {
        const user = await userModel.getUserById(id)
        if (!user) return response.status(404).send("User not found")
        response.status(200).json(user)
    } catch (error) {
        console.error(error);
        response.status(500).send("Error retrieving user")
    }
}

// POST a new user
const createUser = async (request, response) => {
    const { name, email, password, role } = request.body
    try {
        const user = await userModel.createUser(name, email, password, role)
        response.status(201).send(`User added with ID: ${user.id}`)
    } catch (error) {
        console.error(error);
        response.status(500).send("Error creating user")
    }
}

// PUT updated data in an existing user
const updateUser = async (request, response) => {
    const id = parseInt(request.params.id, 10)
    const { name, email, password } = request.body
    try {
        const user = await userModel.updateUser(id, name, email, password)
        response.status(200).send(`User modified with ID: ${user.id}`)
    } catch (error) {
        console.error(error);
        response.status(500).send("Error updating user")
    }
}

// DELETE a user
const deleteUser = async (request, response) => {
    const id = parseInt(request.params.id, 10)
    try {
        await userModel.deleteUser(id)
        response.status(200).send(`User deleted with ID: ${id}`)
    } catch (error) {
        console.error(error);
        response.status(500).send("Error deleting user")
        
    }
}

module.exports = {
    getAllUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}