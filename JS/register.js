document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const bio = "";  
    const avatar = { url: "https://example.com/default-avatar.png", alt: "Default avatar" };
    const banner = { url: "https://example.com/default-banner.png", alt: "Default banner" };
    const venueManager = false;

    const requestBody = { name, email, password };
    console.log("Request Body:", requestBody);

    try {
        const response = await fetch("https://v2.api.noroff.dev/auth/register?_holidaze=false", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        console.log("Response status:", response.status);

        if (response.ok) {
            alert("Registration successful! Redirecting to login page...");
            window.location.href = "login.html";
        } else {
            const errorData = await response.json();
            if (errorData.errors && errorData.errors.some(e => e.message.includes("Profile already exists"))) {
                alert("This email is already registered. Please use a different email or log in.");
            } else {
                alert(`Registration failed: ${errorData.errors.map(error => error.message).join(", ") || "Please try again."}`);
            }
            console.error("Error Details:", errorData.errors);
        }
    } catch (error) {
        console.error("Network Error:", error);
        alert("An error occurred. Please try again later.");
    }
});