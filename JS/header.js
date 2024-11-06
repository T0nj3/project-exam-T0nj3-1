document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    const navMenu = document.getElementById("navMenu");
    const loginLink = document.getElementById("loginLink");
    const userMenu = document.getElementById("userMenu");
    const dropdownContent = document.getElementById("dropdownContent");
    const usernameElement = document.getElementById("username");

    if (navMenu && userMenu && usernameElement) { // Check if elements exist
        if (username) {
            navMenu.style.display = "none"; 
            userMenu.style.display = "flex"; 
            usernameElement.textContent = username;

            document.getElementById("logout").addEventListener("click", () => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("username");
                window.location.href = "./login/index.html"; 
            });

            usernameElement.addEventListener("click", () => {
                dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
            });

            document.addEventListener("click", (event) => {
                if (!userMenu.contains(event.target) && dropdownContent.style.display === "block") {
                    dropdownContent.style.display = "none";
                }
            });
        } else {
            loginLink.style.display = "block";
        }
    } else {
        console.error("One or more elements are missing from the DOM.");
    }
});