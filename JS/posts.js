document.addEventListener("DOMContentLoaded", async () => {
    const apiKey = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    const bearerToken = localStorage.getItem("accessToken");
    const postList = document.getElementById("postList");
    const addPostFormContainer = document.getElementById("addPostFormContainer");
    const showAddPostFormButton = document.getElementById("showAddPostForm");

    async function fetchPosts() {
        try {
            const response = await fetch("https://v2.api.noroff.dev/blog/posts/Tonje_Albertin?limit=50", {
                headers: {
                    "X-Noroff-API-Key": apiKey,
                    "Authorization": `Bearer ${bearerToken}`
                }
            });

            if (response.ok) {
                const result = await response.json();
                const posts = result.data || result;

                if (posts.length === 0) {
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
                                <button class="delete" onclick="deletePost('${post.id}')">Delete</button>
                            </div>
                        </div>
                    `).join("");
                }
            } else {
                console.error("Failed to fetch posts:", response.status, response.statusText);
                alert("Failed to fetch posts.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while fetching posts.");
        }
    }

    fetchPosts();

    showAddPostFormButton.addEventListener("click", () => {
        addPostFormContainer.style.display = "block";
    });

    document.getElementById("addPostForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("postTitle").value;
        const body = document.getElementById("postBody").value;
        const mediaUrl = document.getElementById("postMediaUrl").value;
        const mediaAlt = document.getElementById("postMediaAlt").value;

        const newPost = {
            title: title,
            body: body
        };

        if (mediaUrl || mediaAlt) {
            newPost.media = {
                url: mediaUrl,
                alt: mediaAlt
            };
        }

        try {
            const response = await fetch("https://v2.api.noroff.dev/blog/posts/Tonje_Albertin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Noroff-API-Key": apiKey,
                    "Authorization": `Bearer ${bearerToken}`
                },
                body: JSON.stringify(newPost)
            });

            if (response.ok) {
                alert("New post added successfully!");
                fetchPosts();
                document.getElementById("addPostForm").reset();
                addPostFormContainer.style.display = "none";
            } else {
                console.error("Failed to add post:", response.status, response.statusText);
                alert(`Failed to add post: ${response.status}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding the post.");
        }
    });
});

function closeForm() {
    document.getElementById("addPostFormContainer").style.display = "none";
}

function editPost(id) {
    window.location.href = `edit.html?id=${id}`;
}

async function deletePost(id) {
    const apiKey = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    const bearerToken = localStorage.getItem("accessToken");
    const name = "Tonje_Albertin";

    if (confirm("Are you sure you want to delete this post?")) {
        try {
            const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${name}/${id}`, {
                method: "DELETE",
                headers: {
                    "X-Noroff-API-Key": apiKey,
                    "Authorization": `Bearer ${bearerToken}`
                }
            });

            if (response.ok) {
                alert("Post deleted successfully!");
                location.reload();
            } else {
                console.error("Failed to delete post:", response.status, response.statusText);
                alert("Failed to delete post. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while deleting the post.");
        }
    }
}