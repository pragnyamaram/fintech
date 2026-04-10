# 💰 FinTech AI Coach

An intelligent full-stack financial management platform that combines **transaction tracking, goal planning, and AI-powered insights** to help users manage and optimize their finances.

---

# 🚀 Features

### 🤖 AI Financial Coach

* Chat-based assistant for financial queries
* Daily spending insights
* End-of-month predictions
* Smart alerts and suggestions

### 📊 Expense Tracking

* Add, update, delete transactions
* Categorized spending analysis
* Real-time dashboard

### 🎯 Goals Management

* Set savings goals
* Track progress
* Monthly planning

### 🔮 Predictive Insights

* Daily spending rate
* Predicted monthly balance
* Overspending alerts

---

# 🧠 System Architecture

```
Frontend (React + Vite)
        ↓
FastAPI (AI Layer)
        ↓
Spring Boot Backend (REST APIs)
        ↓
PostgreSQL Database
```

---

# 🧩 Architecture Explanation

## 1️⃣ Frontend Layer (React + TypeScript)

Responsible for:

* UI rendering
* User interaction
* Chat interface
* API communication

Key files:

* `AICoach.tsx` → AI chat UI
* `Goals.tsx` → Goal tracking
* `api.tsx` → API integration

---

## 2️⃣ AI Layer (FastAPI)

Acts as an **intelligent middleware**

### Responsibilities:

* Fetch real data from backend
* Analyze financial data
* Generate responses (rule-based + LLM)
* Provide predictions and insights

### Key Endpoints:

* `/chat` → AI assistant
* `/analyze` → financial analysis

### Core Logic:

* Fetch transactions from Spring Boot
* Compute:

  * Total spending
  * Savings rate
  * Category breakdown
* Apply:

  * Rule-based intelligence
  * AI model (Groq LLM)

---

## 3️⃣ Backend Layer (Spring Boot)

Handles all **business logic and data access**

### Modules:

* Transaction Management
* Dashboard API
* Goals API
* AI Integration

### Key Controllers:

* `TransactionController`
* `DashboardController`
* `GoalController`

---

## 4️⃣ Database Layer (PostgreSQL)

Stores:

* Transactions
* Goals
* User financial data

### Schema Example:

* amount
* category
* type (CREDIT / DEBIT)
* userId

---

# 🔄 Data Flow

## 🧠 AI Chat Flow

```
User → React UI → FastAPI (/chat)
                      ↓
        Fetch data from Spring Boot
                      ↓
        Process + AI reasoning
                      ↓
        Return response → UI
```

---

## 📊 Transaction Flow

```
User → React → Spring Boot → Database
```

---

# ⚙️ Tech Stack

| Layer    | Technology              |
| -------- | ----------------------- |
| Frontend | React, TypeScript, Vite |
| Backend  | Spring Boot (Java)      |
| AI Layer | FastAPI (Python)        |
| AI Model | Groq (LLM)              |
| Database | PostgreSQL              |
| API      | REST                    |

---

# 🔐 Security

* API keys stored using `.env`
* No secrets exposed in code
* GitHub secret scanning handled

---

# 🧪 How to Run

## 1️⃣ Backend

```bash
mvn spring-boot:run
```

## 2️⃣ AI Server

```bash
uvicorn main:app --reload --port 8000
```

## 3️⃣ Frontend

```bash
npm run dev
```

---

# 📌 Future Improvements

* Chat memory (conversation history)
* GPT-based advanced reasoning
* Real-time notifications
* Budget optimization engine
* Deployment (Docker + Cloud)

---

# 💡 Key Highlights

* Full-stack architecture (React + Spring Boot + FastAPI)
* AI-integrated financial system
* Real-time data-driven insights
* Clean separation of concerns
* Scalable microservice-like design

---

# 👩‍💻 Author

**Pragnya Maram**

* GitHub: https://github.com/pragnyamaram
* LinkedIn: https://www.linkedin.com/in/maram-pragnya-255758266/
**Digvijay Singh**
* GitHub: https://www.github.com/vijj918
* LinkedIn: https://www.linkedin.com/in/thakur-digvijay-singh-078247259/

---
