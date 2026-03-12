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

- `src/`: React application components and logic
- `public/`: Static assets and the `data/` repository
  - `data/countries.json`: List of supported territories
  - `data/fruit_data.json`: Detailed agricultural intelligence
- `fruit.ipynb`: Jupyter Notebook for data exploration
- `africa_fruit_train.csv` / `africa_fruit_test.csv`: Source datasets
- `export_data.py`: Script to export CSV data to the structured JSON repository

## ⚙️ Setup and Installation

### Frontend Application
1. Install dependencies from the root directory:
   ```bash
   npm install  # or npm install
   ```
2. Start the development server:
   ```bash
   npm run dev     # or npm run dev
   ```

### Data Pipeline
The data is managed via the `public/data/` repository. You can use `export_data.py` to process the source CSV files into the structured JSON format required by the dashboard.
