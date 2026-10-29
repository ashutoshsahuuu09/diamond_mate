# DiamondMate

DiamondMate is a diamond jewelry storefront with a React frontend and a FastAPI backend. Customers can browse and filter rings, customize designs, manage a cart, place orders, and look up diamond certificates.

## Features

- Browse featured rings and collections, with product details and filters
- Customize ring metal, diamond carat, setting, and size
- Shopping cart, checkout, and order confirmation
- Certificate lookup, ring-size guide, 360-degree viewer, and virtual try-on

## Tech stack

- **Frontend:** React, Vite, React Router, Axios
- **Backend:** Python, FastAPI, Pydantic
- **Database:** MongoDB, accessed through Motor

## Prerequisites

- Node.js and npm
- Python and pip
- MongoDB running locally, or a MongoDB connection URL

## Run locally

### 1. Configure and start the backend

In PowerShell, from the repository root:

```powershell
cd backend
Copy-Item .env.example .env
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

Make sure MongoDB is running. The example configuration connects to `mongodb://localhost:27017` and uses the `diamondmate` database. Update `MONGODB_URL` and `DATABASE_NAME` in `backend/.env` if needed.

To load the demo rings and certificates, run this once from the `backend` directory:

```powershell
python seed_data.py
```

Start the API:

```powershell
python main.py
```

The API is available at `http://localhost:8000`. Interactive API documentation is at `http://localhost:8000/docs`; the health endpoint is `http://localhost:8000/health`.

### 2. Configure and start the frontend

Open a second PowerShell terminal from the repository root:

```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```

The Vite development server runs at `http://localhost:5173`. The frontend's `VITE_API_BASE_URL` setting defaults to `http://localhost:8000`; change it in `frontend/.env` if your API runs elsewhere.

## API overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/rings` | List and filter rings |
| `GET` | `/api/rings/featured` | Get featured rings |
| `GET` | `/api/rings/collections` | Get available collections |
| `GET` | `/api/rings/{ring_id}` | Get a ring |
| `GET` | `/api/certificates/{certificate_id}` | Look up a certificate |
| `GET`, `POST`, `DELETE` | `/api/cart/...` | Retrieve and update a cart |
| `GET`, `POST` | `/api/orders/...` | Create or retrieve an order |
| `GET`, `POST` | `/api/customizations/...` | Create or retrieve a customization |

For request schemas and the complete API, see the interactive documentation at `/docs` while the backend is running.
