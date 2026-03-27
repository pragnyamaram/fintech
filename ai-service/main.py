from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime

app = FastAPI()

# 🔥 Transaction model (matches Spring Boot DTO)
class Transaction(BaseModel):
    id: Optional[int] = None
    amount: float
    category: str
    description: Optional[str] = None
    type: Optional[str] = "DEBIT"
    timestamp: Optional[datetime] = None


# 🔥 Request model
class AIAnalysisRequestDTO(BaseModel):
    userId: Optional[int] = None
    salary: float
    transactions: List[Transaction]


# 🔥 API endpoint
@app.post("/analyze")
def analyze(payload: AIAnalysisRequestDTO):

    income = 0.0
    spent = 0.0
    category_breakdown: Dict[str, float] = {}

    for txn in payload.transactions:
        ttype = (txn.type or "DEBIT").upper()
        amount = txn.amount or 0.0
        category = txn.category or "other"

        if ttype == "CREDIT":
            income += amount
        else:
            spent += amount
            category_breakdown[category] = category_breakdown.get(category, 0.0) + amount

    net_balance = payload.salary - spent

    top_category = (
        max(category_breakdown, key=category_breakdown.get)
        if category_breakdown else "none"
    )

    alerts = []
    suggestions = []

    if spent > payload.salary:
        alerts.append("Your spending is higher than your salary.")
    elif spent > payload.salary * 0.7:
        alerts.append("You have crossed 70% of your salary.")

    if top_category != "none":
        suggestions.append(f"Try reducing expenses in {top_category} category.")

    if category_breakdown.get("subscriptions", 0) > payload.salary * 0.1:
        alerts.append("Subscriptions are too high.")
        suggestions.append("Cancel unused subscriptions.")

    if not alerts:
        alerts.append("Your spending is under control.")

    # 🔥 Score logic
    score = 100

    if spent > payload.salary:
        score -= 40
    elif spent > payload.salary * 0.7:
        score -= 20

    if top_category != "none" and category_breakdown.get(top_category, 0) > payload.salary * 0.3:
        score -= 15

    score = max(0, min(100, score))

    summary = (
        f"You spent ₹{spent:.2f} out of ₹{payload.salary:.2f}. "
        f"Remaining balance: ₹{net_balance:.2f}."
    )

    return {
        "summary": summary,
        "alerts": alerts,
        "suggestions": suggestions,
        "score": score,
        "predictedBalance": round(net_balance, 2),
        "topCategory": top_category
    }