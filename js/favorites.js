// ===============================
// favorites.js
// Handles adding, removing, and retrieving favorite books
// ===============================


// Define the key used to store favorites in localStorage
const STORAGE_KEY = "bookExplorerFavorites";


// Function to get all favorite books from localStorage
export function getFavorites() {

    // Retrieve stored favorites string
    const favorites = localStorage.getItem(STORAGE_KEY);

    // If no favorites exist, return empty array
    if (!favorites) {
        return [];
    }

    // Parse JSON string into JavaScript array
    return JSON.parse(favorites);
}


// Function to save favorites array back into localStorage
function saveFavorites(favoritesArray) {

    // Convert array into JSON string
    const favoritesString = JSON.stringify(favoritesArray);

    // Store string in localStorage
    localStorage.setItem(STORAGE_KEY, favoritesString);
}


// Function to add a book to favorites
export function addFavorite(book) {

    // Get current favorites
    const favorites = getFavorites();

    // Check if book already exists using id
    const exists = favorites.find(item => item.id === book.id);

    // If book is not already saved
    if (!exists) {

        // Add book to array
        favorites.push(book);

        // Save updated array
        saveFavorites(favorites);
    }
}


// Function to remove a book from favorites
export function removeFavorite(bookId) {

    // Get current favorites
    let favorites = getFavorites();

    // Filter out the book by id
    favorites = favorites.filter(book => book.id !== bookId);

    // Save updated array
    saveFavorites(favorites);
}