const User = require("../models/user");
const { user } = require("../dbConfig")

async function getUsersWithBooks(req, res) {
  try {
    const users = await User.getUsersWithBooks();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users with books" });
  }
}

async function searchUsers(req, res) {
    const searchTerm = req.query.searchTerm; // Extract search term from query params
  
    try {    
      const users = await User.searchUsers(searchTerm);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error searching users" });
    }
  }
const getAllUser = async (req, res) => {
    try {
        const user = await User.getAllUser();
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving user");
    }
};

const getUsersById = async (req, res) => {
    const UserId = parseInt(req.params.id);
    try {
        const book = await User.getUserById(UserId);
        if(!book) {
            return res.status(404).send("User not found");
        }
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving user");
    }
};

const createUser = async (req, res) => {
    const newUser = req.body;
    try {
      const createdUser = await User.createUser(newUser);
      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating user");
    }
};

const updateUser = async (req, res) => {
    const UserId = parseInt(req.params.id);
    const newUserData = req.body;
  
    try {
      const updatedUser = await User.updateUser(UserId, newUserData);
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating user");
    }
  };
  
  const deleteUser = async (req, res) => {
    const UserId = parseInt(req.params.id);
  
    try {
      const success = await User.deleteUser(UserId);
      if (!success) {
        return res.status(404).send("User not found");
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting user");
    }
};
  
  module.exports = {
    getAllUser,
    createUser,
    getUsersById,
    updateUser,
    deleteUser,
    getUsersWithBooks,
    searchUsers
  };
