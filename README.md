# E-Commerce Web App

This workspace contains a full-stack e-commerce prototype using:

- Vue 3 + Vite for frontend
- Python FastAPI for backend
- Clerk for authentication placeholder integration
- Responsive modern CSS and reusable components

## Setup

### 1. Backend

1. Activate the existing Python virtual environment:
   - Windows PowerShell: `venv\Scripts\Activate.ps1`
   - Windows CMD: `venv\Scripts\activate.bat`

2. Install backend dependencies:
   ```powershell
   cd backend
   pip install -r requirements.txt
   ```

3. Copy `.env.example` to `.env` and set your Clerk API key if used.

4. Run the backend:
   ```powershell
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### 2. Frontend

1. Install frontend dependencies:
   ```powershell
   cd frontend
   npm install
   ```

2. Copy `.env.example` to `.env` and provide `VITE_CLERK_PUBLISHABLE_KEY`.

3. Run the frontend dev server:
   ```powershell
   npm run dev
   ```

### 3. Application Notes

- Home page shows mock products from the backend.
- Product categories are filterable.
- Cart updates quantity and calculates totals with delivery fee logic.
- Authentication is scaffolded with Clerk components for login/signup.

## Project structure

- `backend/` — FastAPI backend source and static data
- `frontend/` — Vue 3 application with reusable components
