document.addEventListener("DOMContentLoaded", async () => {
    const apiKey = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    const bearerToken = localStorage.getItem("accessToken");
    const postId = new URLSearchParams(window.location.search).get("id");
    const userName = "Tonje_Albertin"; 

    if (!postId) {
        alert("No post selected for editing.");
        return;
    }

    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${userName}/${postId}`, {
            headers: {
                "X-Noroff-API-Key": apiKey,
                "Authorization": `Bearer ${bearerToken}`
            }
        });

        if (response.ok) {
            const result = await response.json();
            const post = result.data;

            
            const title = post.title || "";
            const body = post.body || "";
            const tags = post.tags ? post.tags.join(", ") : "";
            const mediaUrl = post.media?.url || "";

            // Populate the form fields
            document.getElementById("title").value = title;
            document.getElementById("body").value = body;
            document.getElementById("tags").value = tags;
            document.getElementById("mediaUrl").value = mediaUrl;
        } else {
            alert("Failed to load post data.");
        }
    } catch (error) {
        console.error("Error loading post:", error);
        alert("An error occurred while fetching the post data.");
    }

    // Form submit handler to update post
    document.getElementById("editForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatedPost = {
            title: document.getElementById("title").value,
            body: document.getElementById("body").value,
            tags: document.getElementById("tags").value.split(",").map(tag => tag.trim()),
            media: {
                url: document.getElementById("mediaUrl").value,
                alt: "Updated post image"
            }
        };

        try {
            const updateResponse = await fetch(`https://v2.api.noroff.dev/blog/posts/${userName}/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Noroff-API-Key": apiKey,
                    "Authorization": `Bearer ${bearerToken}`
                },
                body: JSON.stringify(updatedPost)
            });

            if (updateResponse.ok) {
                alert("Post updated successfully!");
                window.location.href = "index.html";
            } else {
                alert("Failed to update post.");
            }
        } catch (error) {
            console.error("Error updating post:", error);
            alert("An error occurred while updating the post.");
        }
    });
});