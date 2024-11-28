import { fetchPosts } from './api-utils.js';

document.addEventListener("DOMContentLoaded", async () => {
    const searchInputDesktop = document.getElementById("searchInputDesktop");
    const suggestionsDesktop = document.getElementById("suggestionsDesktop");
    const searchInputHamburger = document.getElementById("searchInputHamburger");
    const suggestionsHamburger = document.getElementById("suggestionsHamburger");
    let allPosts = [];

    try {
        allPosts = await fetchPosts();
    } catch (error) {
        console.error("Error fetching posts:", error);
        suggestionsDesktop.innerHTML = `<div>Failed to load posts. Please try again later.</div>`;
        suggestionsHamburger.innerHTML = `<div>Failed to load posts. Please try again later.</div>`;
        return;
    }

    function displaySuggestions(query, suggestionsContainer) {
        const lowerCaseQuery = query.toLowerCase().trim();
        if (!lowerCaseQuery) {
            suggestionsContainer.innerHTML = "";
            return;
        }

        const filteredPosts = allPosts.filter(post =>
            post.title.toLowerCase().includes(lowerCaseQuery) ||
            post.body.toLowerCase().includes(lowerCaseQuery)
        );

        suggestionsContainer.innerHTML = filteredPosts.length
            ? filteredPosts.map(post => `
                <div data-id="${post.id}">
                    <strong>${post.title}</strong>
                </div>
            `).join("")
            : "<div>No results found</div>";
    }

    function handleSuggestionClick(event) {
        const target = event.target.closest("div[data-id]");
        if (target) {
            const postId = target.dataset.id;
            window.location.href = `./HTML/one-post.html?id=${postId}`;
        }
    }

    searchInputDesktop.addEventListener("input", (event) => {
        displaySuggestions(event.target.value, suggestionsDesktop);
    });

    searchInputHamburger.addEventListener("input", (event) => {
        displaySuggestions(event.target.value, suggestionsHamburger);
    });

    suggestionsDesktop.addEventListener("click", handleSuggestionClick);
    suggestionsHamburger.addEventListener("click", handleSuggestionClick);

    searchInputDesktop.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            displaySuggestions(event.target.value, suggestionsDesktop);
        }
    });

    searchInputHamburger.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            displaySuggestions(event.target.value, suggestionsHamburger);
        }
    });
});