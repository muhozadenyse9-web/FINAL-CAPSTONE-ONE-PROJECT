// ===============================
// main.js
// Entry point for both homepage and favorites page
// ===============================


// Import functions from favorites module
import { addFavorite, getFavorites, removeFavorite } from "./favorites.js";


// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {

    // Detect if homepage grid exists
    const bookGrid = document.getElementById("bookGrid");

    // Detect if favorites grid exists
    const favoritesGrid = document.getElementById("favoritesGrid");

    // ===============================
    // HOMEPAGE LOGIC
    // ===============================
    if (bookGrid) {

        // Select all add-to-favorites buttons
        const buttons = document.querySelectorAll(".add-to-favorites");

        // Loop through buttons
        buttons.forEach(button => {

            // Add click event
            button.addEventListener("click", () => {

                // Create book object from dataset
                const book = {
                    id: button.dataset.id,
                    title: button.dataset.title,
                    author: button.dataset.author
                };

                // Save to localStorage
                addFavorite(book);

                // Update UI
                button.textContent = "Added ✔";
                button.disabled = true;

            });

        });
    }


    // ===============================
    // FAVORITES PAGE LOGIC
    // ===============================
    if (favoritesGrid) {

        // Get empty message element
        const emptyMessage = document.getElementById("emptyMessage");

        // Retrieve saved favorites
        const favorites = getFavorites();

        // If no favorites exist
        if (favorites.length === 0) {
            emptyMessage.style.display = "block";
            return;
        }

        // Hide empty message
        emptyMessage.style.display = "none";

        // Loop through saved books
        favorites.forEach(book => {

            // Create card container
            const card = document.createElement("div");
            card.className = "bg-white p-4 rounded shadow";

            // Create title element
            const title = document.createElement("h3");
            title.className = "font-semibold text-lg mb-2";
            title.textContent = book.title;

            // Create author element
            const author = document.createElement("p");
            author.className = "text-gray-500 text-sm mb-4";
            author.textContent = book.author;

            // Create remove button
            const removeBtn = document.createElement("button");
            removeBtn.className = "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700";
            removeBtn.textContent = "Remove";

            // Add click event to remove button
            removeBtn.addEventListener("click", () => {

                // Remove from localStorage
                removeFavorite(book.id);

                // Remove card from UI
                card.remove();

                // If no cards left, show empty message
                if (getFavorites().length === 0) {
                    emptyMessage.style.display = "block";
                }

            });

            // Append elements to card
            card.appendChild(title);
            card.appendChild(author);
            card.appendChild(removeBtn);

            // Append card to grid
            favoritesGrid.appendChild(card);

        });
    }

});