document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const apiKey = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login?_holidaze=false", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey
      },
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("Login response data:", data);

      if (data.data && data.data.accessToken) {  
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("username", email.split('@')[0]);  
        window.location.href = "../post/index.html";
      } else {
        alert("Login failed: No access token received.");
      }
    } else {
      alert("Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
