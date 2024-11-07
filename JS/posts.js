import { fetchPosts, deletePost, createPost } from './api-utils.js';

document.addEventListener("DOMContentLoaded", () => {
    const postList = document.getElementById("postList");
    const addPostFormModal = document.getElementById("addPostFormModal");
    const showAddPostFormButton = document.getElementById("showAddPostForm");
    const mediaUrlInput = document.getElementById("postMediaUrl");
    const mediaPreviewElement = document.getElementById("mediaPreview");

    async function displayPosts() {
        try {
            const posts = await fetchPosts();
            postList.innerHTML = posts.length === 0 ? "<p>No posts found.</p>" : posts.map(post => `
                <div class="post">
                    <img src="${post.media?.url || 'https://via.placeholder.com/100'}" alt="${post.media?.alt || 'Post image'}">
                    <div class="post-info">
                        <div class="post-title">${post.title || 'No title'}</div>
                        <div class="post-date">${new Date(post.created).toLocaleString()}</div>
                    </div>
                    <div class="post-actions">
                        <button class="edit" onclick="editPost('${post.id}')">Edit</button>
                        <button class="delete" data-post-id="${post.id}">Delete</button>
                    </div>
                </div>
            `).join("");

            document.querySelectorAll(".delete").forEach(button => {
                button.addEventListener("click", async (event) => {
                    const postId = event.target.getAttribute("data-post-id");
                    if (confirm("Are you sure you want to delete this post?")) {
                        const success = await deletePost(postId);
                        if (success) {
                            alert("Post deleted successfully!");
                            displayPosts(); 
                        } else {
                            alert("Failed to delete post.");
                        }
                    }
                });
            });
        } catch (error) {
            console.error("Error fetching posts:", error);
            postList.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
        }
    }

    showAddPostFormButton.addEventListener("click", () => {
        addPostFormModal.style.display = "block"; 
    });

    document.getElementById("closeModalButton").addEventListener("click", () => {
        addPostFormModal.style.display = "none"; 
        mediaPreviewElement.style.display = "none"; 
    });

    mediaUrlInput.addEventListener("input", () => {
        const url = mediaUrlInput.value;
        mediaPreviewElement.src = url || "";
        mediaPreviewElement.style.display = url ? "block" : "none"; 
    });

    document.getElementById("addPostForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("postTitle").value;
        const body = document.getElementById("postBody").value;
        const mediaUrl = mediaUrlInput.value;
        const mediaAlt = document.getElementById("postMediaAlt").value;

        const newPost = { 
            title, 
            body, 
            media: { url: mediaUrl, alt: mediaAlt },
        };

        try {
            await createPost(newPost);
            alert("New post added successfully!");
            displayPosts();
            document.getElementById("addPostForm").reset();
            addPostFormModal.style.display = "none"; 
            mediaPreviewElement.style.display = "none"; 
        } catch (error) {
            alert("Failed to add post: " + error.message);
            console.error("Error:", error);
        }
    });

    displayPosts(); 
});

window.editPost = (id) => {
    window.location.href = `edit.html?id=${id}`;
};