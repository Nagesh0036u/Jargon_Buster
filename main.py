from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from groq import Groq

app = FastAPI()

# Enable CORS so your Chrome extension can talk to Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the Groq client securely using Vercel's environment variable
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))


class TextRequest(BaseModel):
    text: str


@app.get("/")
def read_root():
    return {"status": "JargonBuster backend is running successfully!"}


@app.post("/simplify")
def simplify_text(request: TextRequest):
  try:
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a helpful assistant that simplifies complex"
                    " jargon, difficult text, or legal terms into clear,"
                    " simple, everyday language."
                ),
            },
            {
                "role": "user",
                "content": (
                    f"Please simplify this text in simple words:\n\n{request.text}"
                ),
            },
        ],
        temperature=0.7,
        max_tokens=300,
    )
    simplified_output = response.choices[0].message.content
    return {"simplified_text": simplified_output}
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))