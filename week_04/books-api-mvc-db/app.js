const express = require("express");
const usersController = require("./controllers/userscontroller");
const booksController = require("./controllers/booksController");

const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");


const app = express();
const port = 3000;

const staticMiddleware = express.static("public");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(staticMiddleware);

app.get("/users/with-books", usersController.getUsersWithBooks);
app.get("/users/search", usersController.searchUsers);
app.post("/users", usersController.createUser); // Create user
app.get("/users", usersController.getAllUser); // Get all users
app.get("/users/:id", usersController.getUsersById); // Get user by ID
app.put("/users/:id", usersController.updateUser); // Update user
app.delete("/users/:id", usersController.deleteUser); // Delete user



app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books",  booksController.createBook);
app.put("/books/:id", booksController.updateBook); // PUT for updating books
app.delete("/books/:id", booksController.deleteBook);

app.listen(port, async () => {
    try {
        await sql.connect(dbConfig);
        console.log("Database connection established successfully");
    }catch (err) {
        console.error("Database connection error:",err);
        process.exit(1);
    }
    console.log(`Server listening on port ${port}`);
});

process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");
    await sql.close();
    console.log("Database connection closed");
    process.exit(0);
})