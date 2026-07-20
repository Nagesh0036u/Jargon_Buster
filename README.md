# ✨ JargonBuster

JargonBuster is a Chrome extension that simplifies complex jargon, legal terms, or difficult text into everyday language using AI. Just highlight the confusing text, right-click, and let the AI instantly translate it into plain English directly on the webpage.

## 🛠️ Tech Stack
* **Frontend:** Chrome Extension V3 (JavaScript, HTML, CSS)
* **Backend:** Python, FastAPI, Uvicorn
* **AI Model:** Llama-3.1 via Groq API

## 🚀 Installation & Setup

### Backend Setup
1. Clone this repository to your local machine.
2. Navigate to the `JargonBuster_Backend` folder in your terminal.
3. Install the required Python dependencies: `pip install fastapi uvicorn pydantic groq python-dotenv`
4. Create a `.env` file in the backend directory.
5. Add your API key to the file: `GROQ_API_KEY=your_actual_api_key_here`
6. Start the local server: `uvicorn main:app --reload`

### Chrome Extension Setup
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Toggle **Developer mode** on in the top right corner.
3. Click **Load unpacked** in the top left.
4. Select the folder containing your frontend extension files.
5. Ensure the backend Uvicorn server is running before testing.
