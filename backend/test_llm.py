# test_readme.py

import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

# Example project description (you can change this)
project_description = """
This project is a FastAPI backend that generates README files for GitHub repositories using Google Gemini AI.
It stores job requests in a PostgreSQL database using SQLAlchemy.
"""

prompt = f"""
Write a professional and detailed README.md for the following project:
{project_description}
"""

if __name__ == "__main__":
    print("⏳ Generating README...")
    try:
        response = model.generate_content(prompt)
        print("\n✅ [Generated README]:\n")
        print(response.text.strip())
    except Exception as e:
        print("❌ Error:", str(e))
