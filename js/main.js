// ===============================
// main.js
// Entry point for homepage
// ===============================


// Import functions from favorites module
import { addFavorite, getFavorites } from "./favorites.js";


// Test if module works by logging favorites
console.log("Current favorites:", getFavorites());


// Example test book object
const testBook = {
    id: "123",
    title: "Sample Book",
    author: "Test Author"
};


// Temporary button test (for development only)
document.addEventListener("DOMContentLoaded", () => {

    // Log message when page loads
    console.log("Page loaded successfully");

});