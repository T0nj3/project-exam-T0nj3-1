document.addEventListener("DOMContentLoaded", () => {
    const usernameElement = document.getElementById("username");
    const logoutLink = document.getElementById("logout");
    const dropdownContent = document.getElementById("dropdownContent");
    const addPostFormModal = document.getElementById("addPostFormModal");
    const showAddPostFormButton = document.getElementById("showAddPostForm");
    const mediaUrlInput = document.getElementById("postMediaUrl");
    const mediaPreviewElement = document.getElementById("mediaPreview");
    const sideMenu = document.getElementById("sideMenu");
    const hamburger = document.querySelector(".hamburger");

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
        window.location.href = "../index.html";
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

    hamburger.addEventListener("click", () => {
        toggleMenu();
    });

    document.querySelector(".close").addEventListener("click", () => {
        toggleMenu();
    });

    document.addEventListener("click", (event) => {
        if (!dropdownContent.contains(event.target) && !usernameElement.contains(event.target)) {
            dropdownContent.style.display = "none";
        }
    });

    function toggleMenu() {
        sideMenu.style.display = sideMenu.style.display === "block" ? "none" : "block";
    }
});