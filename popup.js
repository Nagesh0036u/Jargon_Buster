document.getElementById("simplifyBtn").addEventListener("click", async () => {
  const text = document.getElementById("inputText").value.trim();
  const resultBox = document.getElementById("resultBox");

  if (!text) {
    resultBox.style.display = "block";
    resultBox.innerText = "Please paste some text first!";
    return;
  }

  resultBox.style.display = "block";
  resultBox.innerText = "🧠 Simplifying...";

  try {
    const response = await fetch("jargon-buster-coral.vercel.app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
    });

    const data = await response.json();

    if (data.simplified_text) {
      resultBox.innerText = data.simplified_text;
    } else {
      resultBox.innerText = "Error: " + (data.error || "Failed to parse text.");
    }
  } catch (err) {
    resultBox.innerText = "Error connecting to backend. Is your Python server running?";
  }
});