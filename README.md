# 🫀 CardioPredict

> **AI-Powered Cardiovascular Risk Prediction** — Built with FastAPI, scikit-learn, React 19, and Tailwind CSS v4.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

---

## 📋 Overview

CardioPredict uses a **Logistic Regression** model trained on 70,000+ health records to estimate a patient's cardiovascular disease risk based on clinical and lifestyle inputs.

| Layer | Technology |
|---|---|
| ML Model | scikit-learn Logistic Regression + StandardScaler |
| Backend API | FastAPI + Uvicorn |
| Frontend | React 19 + Vite + Tailwind CSS v4 |
| Hosting (API) | Render (free tier) |
| Hosting (UI) | Vercel (free tier) |

---

## 🏗️ Project Structure

```
CardioPredict/
├── backend/
│   ├── main.py                  # FastAPI application
│   ├── cardio_model_lr.pkl      # Trained model + scaler (pickled tuple)
│   ├── requirements.txt         # Pinned Python dependencies
│   ├── Procfile                 # Render process definition
│   └── .env.example             # Environment variable template
├── cardio-frontend/
│   ├── src/
│   │   ├── pages/               # Home, Predict, Insights
│   │   ├── components/          # Navbar, ResultCard, InputField, …
│   │   └── services/api.js      # Axios API client
│   ├── vercel.json              # Vercel SPA routing fix
│   └── .env.production.example  # Production env template
├── render.yaml                  # Render Blueprint (one-click deploy)
└── README.md
```

---

## 🚀 Deployment Guide

### Step 1 — Deploy the Backend on Render

1. Push this repository to GitHub (public or private).
2. Go to [render.com](https://render.com) → **New → Web Service**
3. Connect your GitHub repository.
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3.11
5. Under **Environment Variables**, add:
   - `ALLOWED_ORIGINS` → leave blank for now (update after frontend is deployed)
6. Click **Deploy**. Wait for the service to go live.
7. Note your Render URL, e.g. `https://cardiopredict-api.onrender.com`
8. Test it: `https://cardiopredict-api.onrender.com/health` → should return `{"status":"healthy"}`

---

### Step 2 — Deploy the Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo.
2. Configure:
   - **Root Directory**: `cardio-frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Under **Environment Variables**, add:
   - `VITE_API_URL` → `https://cardiopredict-api.onrender.com` *(your Render URL)*
4. Click **Deploy**. Note your Vercel URL, e.g. `https://cardiopredict.vercel.app`

---

### Step 3 — Connect Backend ↔ Frontend (CORS)

1. Go back to Render → your backend service → **Environment Variables**.
2. Set `ALLOWED_ORIGINS` to your Vercel URL:
   ```
   https://cardiopredict.vercel.app
   ```
3. Click **Save** — Render will automatically redeploy.

✅ Done! Your app is now live and fully connected.

---

## 💻 Local Development

### Backend

```bash
cd backend

# Create virtual environment
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run the API server
uvicorn main:app --reload --port 8000
```

API docs available at: [http://localhost:8000/docs](http://localhost:8000/docs)

### Frontend

```bash
cd cardio-frontend

# Install dependencies
npm install

# Start dev server (ensure backend is running on :8000)
npm run dev
```

Frontend available at: [http://localhost:5173](http://localhost:5173)

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API root + status |
| `GET` | `/health` | Health check |
| `GET` | `/model/info` | Model metadata + coefficients |
| `POST` | `/predict` | Single patient prediction |
| `POST` | `/predict/batch` | Batch prediction |
| `POST` | `/predict/engineered` | Raw feature-vector prediction |

### Example Request

```bash
curl -X POST https://YOUR-APP.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 50,
    "gender": "female",
    "height": 165,
    "weight": 72,
    "ap_hi": 130,
    "ap_lo": 85,
    "cholesterol": 2,
    "gluc": 1,
    "smoke": 0,
    "alco": 0,
    "active": 1
  }'
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env.example`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `8000` | Port the server listens on (auto-set by Render) |
| `ALLOWED_ORIGINS` | `http://localhost:5173,...` | Comma-separated allowed CORS origins |
| `MODEL_PATH` | *(auto-detected)* | Optional explicit path to `.pkl` file |

### Frontend

| Variable | Description |
|---|---|
| `VITE_API_URL` | Full URL of the FastAPI backend |

---

## ⚠️ Disclaimer

This application is built for **educational and research purposes only**.
Predictions are generated by a machine learning model and **must not** be used as a substitute for professional medical advice, diagnosis, or treatment.
