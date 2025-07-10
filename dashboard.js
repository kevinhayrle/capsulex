document.addEventListener("DOMContentLoaded", async function () {
  //  Splash Screen effect
  const splash = document.getElementById("splashScreen");
  const dashboard = document.getElementById("mainDashboard");

  setTimeout(() => {
    splash.style.opacity = "0";
    splash.style.pointerEvents = "none";
    splash.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      splash.style.display = "none";
      dashboard.style.display = "block";
    }, 500);  
  }, 2500); 

  // Welcome Message
  const name = localStorage.getItem("userName") || "User";
  const token = localStorage.getItem("token");

  const welcomeElement = document.getElementById("welcomeText");
  if (welcomeElement) {
    welcomeElement.textContent = `Welcome, ${name}`;
  }

  // If not logged in, redirect
  if (!token) {
    alert("You're not logged in!");
    window.location.href = "login.html";
    return;
  }

  // Load Message History
  try {
    const res = await fetch("https://capsule-x-backend.onrender.com/api/message/history", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await res.json();

    const container = document.getElementById("messageHistory");
    container.innerHTML = "";

    if (Array.isArray(data) && data.length === 0) {
      container.textContent = "No messages sent yet.";
    } else {
      data.forEach((msg) => {
        const div = document.createElement("div");
        div.textContent = `To: ${msg.recipient_email} - Sent on: ${new Date(msg.sent_time).toLocaleString()}`;
        container.appendChild(div);
      });
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
});
