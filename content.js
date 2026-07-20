// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "show_loading") {
    showPopup("🧠 JargonBuster is reading...");
  } else if (request.action === "show_result") {
    showPopup(request.result, true);
  }
});

function showPopup(text, isResult = false) {
  // Remove existing popup if there is one
  let existingPopup = document.getElementById("jargonbuster-popup");
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create the floating card container
  const popup = document.createElement("div");
  popup.id = "jargonbuster-popup";
  popup.className = "jargonbuster-card";
  
  // Show the close button if it's the final result
  let closeBtnHTML = '';
  if (isResult) {
    closeBtnHTML = `<button id="jb-close-btn" class="jb-close-btn">✖</button>`;
  }

  popup.innerHTML = `
    <div class="jb-header">
      <strong>✨ JargonBuster</strong>
      ${closeBtnHTML}
    </div>
    <div class="jb-body">
      ${text}
    </div>
  `;

  // Inject the card into the web page
  document.body.appendChild(popup);

  // Activate the close button
  if (isResult) {
    document.getElementById("jb-close-btn").addEventListener("click", () => {
      popup.remove();
    });
  }
}