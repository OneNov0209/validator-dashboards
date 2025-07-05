from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from validator_fetcher import get_validator_status

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/status")
def status():
    return get_validator_status()
