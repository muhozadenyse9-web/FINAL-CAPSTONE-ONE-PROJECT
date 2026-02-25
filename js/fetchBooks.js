// ===============================
// fetchBooks.js
// Handles API requests to Open Library
// ===============================


// Base URL for Open Library Search API
const BASE_URL = "https://openlibrary.org/search.json";


// Function to fetch books by search query
export async function fetchBooks(query) {

    try {

        // Construct API URL with query parameter
        const response = await fetch(`${BASE_URL}?title=${query}`);

        // Convert response to JSON
        const data = await response.json();

        // Return first 20 books only for cleaner UI
        return data.docs.slice(0, 20);

    } catch (error) {

        // Log error if request fails
        console.error("Error fetching books:", error);

        // Return empty array if error occurs
        return [];

    }
}