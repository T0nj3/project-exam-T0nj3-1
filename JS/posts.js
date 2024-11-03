document.addEventListener("DOMContentLoaded", async () => {
    const apiKey = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    const bearerToken = localStorage.getItem("accessToken");
    const postList = document.getElementById("postList");

    console.log("Bearer token:", bearerToken); 

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
                      <div class="post-date">${new Date(post.created).toLocaleString()}</div> <!-- Show date and time here -->
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
});

function editPost(id) {
    window.location.href = `edit.html?id=${id}`;
}

function deletePost(id) {
    alert(`Delete post ${id}`);
}
