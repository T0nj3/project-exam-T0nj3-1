document.addEventListener("DOMContentLoaded", async () => {
    const apiKey = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVG9uamVfQWxiZXJ0aW4iLCJlbWFpbCI6InRvbmFsYjAwMTg3QHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzMwOTAyMDU1fQ.54Vke8usbZ08rWgcaVMeMSvX9eQYvOcXpeNNUQ8eNdY"; // Direct token
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

            
            document.getElementById("title").value = post.title || "";
            document.getElementById("body").value = post.body || "";
            document.getElementById("tags").value = post.tags ? post.tags.join(", ") : "";
            document.getElementById("mediaUrl").value = post.media?.url || "";
            document.getElementById("created").value = post.created ? new Date(post.created).toISOString().slice(0, 16) : ""; 
            
            
            const mediaPreviewElement = document.getElementById("mediaPreview");
            mediaPreviewElement.src = post.media?.url || "";
            mediaPreviewElement.style.display = post.media?.url ? "block" : "none"; 
        } else {
            alert("Failed to load post data.");
        }
    } catch (error) {
        console.error("Error loading post:", error);
        alert("An error occurred while fetching the post data.");
    }

    document.getElementById("mediaUrl").addEventListener("input", updateImagePreview);

    function updateImagePreview() {
        const mediaUrlElement = document.getElementById("mediaUrl");
        const mediaPreviewElement = document.getElementById("mediaPreview");
        mediaPreviewElement.src = mediaUrlElement.value || "";
        mediaPreviewElement.style.display = mediaUrlElement.value ? "block" : "none";
    }

    document.getElementById("editForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatedPost = {
            title: document.getElementById("title").value,
            body: document.getElementById("body").value,
            tags: document.getElementById("tags").value.split(",").map(tag => tag.trim()),
            media: {
                url: document.getElementById("mediaUrl").value,
                alt: "Updated post image"
            },
            created: new Date(document.getElementById("created").value).toISOString() 
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