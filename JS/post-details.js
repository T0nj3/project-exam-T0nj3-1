import { fetchPostById } from "./api-utils.js";

const userName = "Tonje_Albertin"; 
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVG9uamVfQWxiZXJ0aW4iLCJlbWFpbCI6InRvbmFsYjAwMTg3QHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzMwOTAyMDU1fQ.54Vke8usbZ08rWgcaVMeMSvX9eQYvOcXpeNNUQ8eNdY";

async function displayPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id"); 
    
    if (!postId) {
        console.error("Post ID is missing in the URL.");
        document.getElementById("blogContainer").innerHTML = "<p>Error: Post ID is missing.</p>";
        return;
    }

    try {
        const post = await fetchPostById(postId);
        
        if (!post) {
            document.getElementById("blogContainer").innerHTML = "<p>Error: Post not found.</p>";
            return;
        }

        
        const paragraphs = post.fullDescription.split(/\n+/);
        const formattedBody = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join("");

        document.getElementById("blogContainer").innerHTML = `
            <article class="single-post">
                <img src="${post.media.url}" alt="${post.media.alt}" style="max-width: 100%; height: auto; border-radius: 8px; ">
                <h2>${post.title}</h2>
                <p style="font-size: 12px; color: #555; font-weight: 200;">
                    <em>Published on: ${new Date(post.created).toLocaleDateString()}</em>
                    <span style="margin-left: 10px;">| Author: ${post.author.name}</span>
                </p>
                ${formattedBody}
            </article>
        `;
    } catch (error) {
        console.error("Error fetching the post:", error);
        document.getElementById("blogContainer").innerHTML = "<p>Error loading post data.</p>";
    }
}

displayPost();