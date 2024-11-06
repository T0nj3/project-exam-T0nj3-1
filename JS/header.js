document.addEventListener("DOMContentLoaded", () => {
    const addPostFormModal = document.getElementById("addPostFormModal");
    const showAddPostFormButton = document.getElementById("showAddPostForm");
    const mediaUrlInput = document.getElementById("postMediaUrl");
    const mediaPreviewElement = document.getElementById("mediaPreview");
    const usernameElement = document.getElementById("username");
    const logoutLink = document.getElementById("logout");
    const dropdownContent = document.getElementById("dropdownContent");

    const username = localStorage.getItem("username");
    if (username) {
        usernameElement.textContent = username;
        document.getElementById("navMenu").style.display = "none";
        document.getElementById("userMenu").style.display = "flex";
    }

    usernameElement.addEventListener("click", () => {
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    });

    logoutLink.addEventListener("click", () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        window.location.href = "./account/login.html";
    });

    showAddPostFormButton.addEventListener("click", () => {
        addPostFormModal.style.display = "block";
    });

    document.getElementById("closeModalButton").addEventListener("click", () => {
        addPostFormModal.style.display = "none";
    });

    mediaUrlInput.addEventListener("input", () => {
        mediaPreviewElement.src = mediaUrlInput.value || "";
        mediaPreviewElement.style.display = mediaUrlInput.value ? "block" : "none";
    });

    document.getElementById("addPostForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const title = document.getElementById("postTitle").value;
        const body = document.getElementById("postBody").value;
        const mediaUrl = mediaUrlInput.value;
        const newPost = { title, body, media: { url: mediaUrl } };

        try {
            await createPost(newPost);
            alert("New post added successfully!");
            displayPosts();
            document.getElementById("addPostForm").reset();
            addPostFormModal.style.display = "none";
        } catch (error) {
            alert("Failed to add post. Please try again.");
        }
    });

    document.addEventListener("click", (event) => {
        if (!dropdownContent.contains(event.target) && !usernameElement.contains(event.target)) {
            dropdownContent.style.display = "none";
        }
    });

    displayPosts();
});