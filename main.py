from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from groq import Groq
from dotenv import load_dotenv

# 1. Force Python to read the .env file FIRST
load_dotenv()

app = FastAPI()

# 2. Enable CORS so your Chrome extension is allowed to talk to this server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Initialize Groq (This will now successfully find the key!)
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

class TextRequest(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"status": "JargonBuster backend is active!"}

@app.post("/simplify")
def simplify_text(request: TextRequest):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that simplifies complex jargon, difficult text, or legal terms into clear, simple, everyday language."
                },
                {
                    "role": "user",
                    "content": f"Please simplify this text in simple words:\n\n{request.text}"
                }
            ],
            temperature=0.7,
            max_tokens=300,
        )
        simplified_output = response.choices[0].message.content
        return {"simplified_text": simplified_output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))