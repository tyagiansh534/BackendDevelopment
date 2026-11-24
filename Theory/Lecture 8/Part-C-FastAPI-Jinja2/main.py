from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

app = FastAPI(title="Lecture 8: FastAPI + Jinja2 SSR")

# Configure directories
base_dir = os.path.dirname(os.path.abspath(__file__))
templates_dir = os.path.join(base_dir, "templates")
static_dir = os.path.join(base_dir, "../Part-D-Static-Content/public")

templates = Jinja2Templates(directory=templates_dir)
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

courses = [
    {"code": "CSFS3008P", "name": "Backend Development Laboratory", "credits": 2},
    {"code": "CSFS3008", "name": "Backend Development Theory", "credits": 4},
    {"code": "CSAI4001", "name": "Artificial Intelligence Systems", "credits": 3}
]

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {
        "request": request,
        "title": "FastAPI + Jinja2 SSR",
        "author": "Ansh Tyagi",
        "sapId": "590014867",
        "courses": courses
    })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
