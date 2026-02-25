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

    // Import fetch function dynamically
    import("./fetchBooks.js").then(module => {

        const { fetchBooks } = module;

        // Select search elements
        const searchInput = document.getElementById("searchInput");
        const searchBtn = document.getElementById("searchBtn");
        const loadingMessage = document.getElementById("loadingMessage");
        const noResultsMessage = document.getElementById("noResultsMessage");

        // Function to render books
        async function handleSearch() {

            // Clear previous results
            bookGrid.innerHTML = "";
            noResultsMessage.classList.add("hidden");

            // Get search value
            const query = searchInput.value.trim();

            if (!query) return;

            // Show loading
            loadingMessage.classList.remove("hidden");

            // Fetch books
            const books = await fetchBooks(query);

            // Hide loading
            loadingMessage.classList.add("hidden");

            // If no results
            if (books.length === 0) {
                noResultsMessage.classList.remove("hidden");
                return;
            }

            // Render books
            books.forEach(book => {

                // Create card
                const card = document.createElement("div");
                card.className = "bg-white p-4 rounded shadow";

                // Title
                const title = document.createElement("h3");
                title.className = "font-semibold text-lg mb-2";
                title.textContent = book.title;

                // Author
                const author = document.createElement("p");
                author.className = "text-gray-500 text-sm mb-4";
                author.textContent = book.author_name ? book.author_name[0] : "Unknown Author";

                // Button
                const button = document.createElement("button");
                button.className = "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700";
                button.textContent = "Add to Favorites";

                // Add click event
                button.addEventListener("click", () => {

                    const bookData = {
                        id: book.key,
                        title: book.title,
                        author: book.author_name ? book.author_name[0] : "Unknown"
                    };

                    addFavorite(bookData);

                    button.textContent = "Added ✔";
                    button.disabled = true;

                });

                // Append elements
                card.appendChild(title);
                card.appendChild(author);
                card.appendChild(button);

                bookGrid.appendChild(card);

            });

        }

        // Attach search button event
        searchBtn.addEventListener("click", handleSearch);

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