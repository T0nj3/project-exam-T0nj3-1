import { fetchPosts, deletePost, createPost } from './api-utils.js';

document.addEventListener("DOMContentLoaded", () => {
    const postList = document.getElementById("postList");
    const addPostFormContainer = document.getElementById("addPostFormContainer");
    const showAddPostFormButton = document.getElementById("showAddPostForm");
    const userName = "Tonje_Albertin"; // Username for fetching posts
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVG9uamVfQWxiZXJ0aW4iLCJlbWFpbCI6InRvbmFsYjAwMTg3QHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzMwOTAyMDU1fQ.54Vke8usbZ08rWgcaVMeMSvX9eQYvOcXpeNNUQ8eNdY"; // Direct token

    async function displayPosts() {
        const posts = await fetchPosts();

        if (!posts || posts.length === 0) {
            postList.innerHTML = "<p>No posts found.</p>";
        } else {
            postList.innerHTML = posts.map(post => `
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

            // Add event listeners for delete buttons
            document.querySelectorAll(".delete").forEach(button => {
                button.addEventListener("click", async (event) => {
                    const postId = event.target.getAttribute("data-post-id");
                    if (confirm("Are you sure you want to delete this post?")) {
                        const success = await deletePost(postId);
                        if (success) {
                            alert("Post deleted successfully!");
                            displayPosts(); // Refresh post list after deletion
                        } else {
                            alert("Failed to delete post.");
                        }
                    }
                });
            });
        }
    }

    showAddPostFormButton.addEventListener("click", () => {
        addPostFormContainer.style.display = "block";
    });

    document.getElementById("addPostForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("postTitle").value;
        const body = document.getElementById("postBody").value;
        const mediaUrl = document.getElementById("postMediaUrl").value;
        const mediaAlt = document.getElementById("postMediaAlt").value;

        const newPost = { title, body, media: { url: mediaUrl, alt: mediaAlt } };

        try {
            await createPost(newPost);
            alert("New post added successfully!");
            displayPosts();
            document.getElementById("addPostForm").reset();
            addPostFormContainer.style.display = "none";
        } catch (error) {
            alert("Failed to add post. Please try again.");
            console.error("Error:", error);
        }
    });

    displayPosts();
});

window.editPost = (id) => {
    window.location.href = `edit.html?id=${id}`;
};