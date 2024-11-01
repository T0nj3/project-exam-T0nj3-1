document.getElementById("registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const apiKey = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  
    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey
        },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        alert("Registration successful! Please login.");
        window.location.href = "login.html";
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });