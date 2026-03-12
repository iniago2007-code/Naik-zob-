# African Fruit Production & Prediction

A full-stack application designed to explore, analyze, and predict fruit production across various African countries. This project combines a high-performance FastAPI backend with a modern React frontend.

## 🚀 Overview

The system allows users to search for specific African countries and retrieve detailed information about their fruit production, including:
- Main fruits produced
- Production ratings (1-10)
- Detailed production volumes (tonnes)
- Production seasons and cultivation notes

## 🛠️ Technology Stack

### Backend
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Data Processing:** [Pandas](https://pandas.pydata.org/)
- **Serialization:** Pickle for pre-processed data loading
- **Documentation:** Automated Swagger/OpenAPI docs at `/docs`

### Frontend
- **Framework:** [React](https://reactjs.org/) (Vite)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** Functional components and Hooks
- **Language:** TypeScript

## 📂 Project Structure

- `backend/`: FastAPI application code (`main.py`)
- `frontend/`: React Vite application
- `fruit.ipynb`: Jupyter Notebook used for initial data exploration and processing
- `africa_fruit_train.csv` / `africa_fruit_test.csv`: Source datasets
- `fruit_data.pkl`: Processed data object for efficient server loading

## ⚙️ Setup and Installation

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies (FastAPI, Uvicorn, Pandas):
   ```bash
   pip install fastapi uvicorn pandas
   ```
3. Start the server:
   ```bash
   python -m uvicorn main:app --reload --port 8000
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   bun install  # or npm install
   ```
3. Start the development server:
   ```bash
   bun dev     # or npm run dev
   ```

## 📈 Data Pipeline
The data is processed via `fruit.ipynb`, which cleans the raw CSV data, parses production strings into structured dictionaries, and serializes the result into `fruit_data.pkl`. The FastAPI server loads this pickle file at startup for lightning-fast lookups.
