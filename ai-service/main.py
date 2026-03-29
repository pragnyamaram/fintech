from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import json
import os
import requests
from datetime import datetime
from fastapi import HTTPException
from datetime import datetime
from dotenv import load_dotenv

import requests


from typing import Any

load_dotenv()

SPRING_BASE_URL = "http://localhost:8080/api"
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class AnalyzeRequest(BaseModel):
    userId: int
    salary: float
    transactions: list[dict[str, Any]]

class ChatRequest(BaseModel):
    userId: int
    message: str
    

def tool_categorize_spending(transactions):
    breakdown = {}
    total_spent = 0.0
    total_income = 0.0

    for t in transactions:
        amt = float(t.get("amount", 0) or 0)
        cat = t.get("category", "other")
        typ = (t.get("type") or "DEBIT").upper()

        if typ == "CREDIT":
            total_income += amt
        else:
            total_spent += amt
            breakdown[cat] = breakdown.get(cat, 0.0) + amt

    return {
        "breakdown": breakdown,
        "totalSpent": total_spent,
        "totalIncome": total_income,
        "topCategory": max(breakdown, key=breakdown.get) if breakdown else "none"
    }

def tool_detect_patterns(transactions, salary):
    alerts = []
    breakdown = tool_categorize_spending(transactions)
    spent = breakdown["totalSpent"]

    if salary > 0 and spent > salary * 0.5:
        alerts.append(f"High spending: ₹{spent:.0f} is {(spent / salary * 100):.0f}% of salary")

    for cat, amt in breakdown["breakdown"].items():
        if cat.lower() in ["entertainment", "dining", "shopping", "clothing"] and salary > 0 and amt > salary * 0.2:
            alerts.append(f"High discretionary spending: ₹{amt:.0f} on {cat}")

    base_income = salary if salary > 0 else max(breakdown["totalIncome"], 1)
    savings_rate = ((base_income - spent) / base_income * 100) if base_income > 0 else 0

    if savings_rate < 20:
        alerts.append(f"Savings rate {savings_rate:.0f}% is below recommended 20%")

    return {"alerts": alerts, "savingsRate": round(savings_rate, 1)}

def tool_predict_balance(transactions, salary):
    now = datetime.now()
    days_in_month = 30
    days_passed = max(now.day, 1)
    days_left = max(days_in_month - days_passed, 0)

    breakdown = tool_categorize_spending(transactions)
    daily_spend = breakdown["totalSpent"] / days_passed if days_passed > 0 else 0

    predicted_total = breakdown["totalSpent"] + (daily_spend * days_left)
    predicted_balance = salary - predicted_total

    return {
        "dailySpendRate": round(daily_spend, 2),
        "predictedMonthlySpend": round(predicted_total, 2),
        "predictedBalance": round(predicted_balance, 2),
        "daysLeft": days_left
    }

def tool_health_score(transactions, salary):
    score = 100
    breakdown = tool_categorize_spending(transactions)
    spent = breakdown["totalSpent"]

    ratio = spent / salary if salary > 0 else 1

    if ratio > 0.8:
        score -= 40
    elif ratio > 0.6:
        score -= 25
    elif ratio > 0.4:
        score -= 10

    savings_rate = (1 - ratio) * 100

    if savings_rate < 10:
        score -= 20
    elif savings_rate < 20:
        score -= 10

    if len(transactions) > 20:
        score -= 5

    return max(0, min(100, score))

def compute_financials(transactions, salary):
    total_spent = 0
    total_income = 0
    breakdown = {}

    for t in transactions:
        amt = float(t.get("amount", 0) or 0)
        typ = (t.get("type") or "").upper()       # ✅ match your DB values
        cat = t.get("category", "other")

        if typ == "CREDIT":
            total_income += amt
        else:                                      # DEBIT or NULL → expense
            total_spent += amt
            breakdown[cat] = breakdown.get(cat, 0) + amt

    income = salary if salary > 0 else total_income
    remaining = income - total_spent
    savings_rate = (remaining / income * 100) if income > 0 else 0

    return {
        "income": income,
        "totalSpent": total_spent,
        "remaining": remaining,
        "savingsRate": round(savings_rate, 1),
        "topCategory": max(breakdown, key=breakdown.get) if breakdown else "None",
        "breakdown": breakdown
    }
def tool_generate_suggestions(patterns, prediction, salary):
    suggestions = []

    if prediction["predictedBalance"] < salary * 0.2:
        suggestions.append("Reduce discretionary spending to maintain 20% savings")

    if patterns["savingsRate"] < 30:
        suggestions.append("Auto-save at least 30% of your salary")

    if prediction["dailySpendRate"] > salary / 30 * 0.6:
        suggestions.append("Your daily spend is high, set a strict daily budget")

    suggestions.append("Review subscriptions monthly")
    return suggestions

def tool_budget_planner(salary: float, transactions: list) -> dict:
    breakdown = tool_categorize_spending(transactions)["breakdown"]

    # Recommended monthly allocation
    category_limits = {
        "rent": round(salary * 0.30, 2),
        "groceries": round(salary * 0.12, 2),
        "transport": round(salary * 0.08, 2),
        "dining": round(salary * 0.08, 2),
        "shopping": round(salary * 0.10, 2),
        "subscriptions": round(salary * 0.05, 2),
        "entertainment": round(salary * 0.05, 2),
        "health": round(salary * 0.05, 2),
        "education": round(salary * 0.05, 2),
        "misc": round(salary * 0.02, 2),
    }

    category_spending = {}
    for cat, limit in category_limits.items():
        category_spending[cat] = round(breakdown.get(cat, 0), 2)

    planned_spend = sum(category_limits.values())
    savings_target = round(salary * 0.20, 2)

    return {
        "monthlyIncome": round(salary, 2),
        "savingsTarget": savings_target,
        "plannedSpend": round(planned_spend, 2),
        "categoryLimits": category_limits,
        "categorySpending": category_spending,
        "budgetRemaining": round(salary - tool_categorize_spending(transactions)["totalSpent"], 2),
    }

def calculate_health_score(transactions, salary):
    score = 100

    total_spent = sum(t.get("amount", 0) for t in transactions)

    # 1. Spending ratio
    if salary > 0:
        spend_ratio = total_spent / salary
        if spend_ratio > 0.7:
            score -= 25
        elif spend_ratio > 0.5:
            score -= 15
        elif spend_ratio > 0.3:
            score -= 5

    # 2. Investment check
    has_investment = any(
        t.get("category", "").lower() in ["investment", "sip", "mutual fund"]
        for t in transactions
    )
    if not has_investment:
        score -= 15

    # 3. Transaction activity
    if len(transactions) < 3:
        score -= 10

    # 4. Subscription check
    subscriptions = [t for t in transactions if "subscription" in t.get("category","").lower()]
    if len(subscriptions) > 3:
        score -= 10

    return max(score, 0)


def tool_smart_alerts(transactions: list, salary: float, budget_plan: dict, prediction: dict) -> list:
    alerts = []
    breakdown = tool_categorize_spending(transactions)["breakdown"]

    # Category overspend alerts
    for cat, limit in budget_plan["categoryLimits"].items():
        spent = breakdown.get(cat, 0)
        if spent > limit:
            alerts.append(
                f"You overspent on {cat} by ₹{spent - limit:.0f} "
                f"(spent ₹{spent:.0f}, limit ₹{limit:.0f})."
            )

    # Prediction-based alert
    if prediction["predictedBalance"] < salary * 0.2:
        alerts.append(
            f"Predicted month-end balance is only ₹{prediction['predictedBalance']:.0f}, "
            f"below your 20% savings target."
        )

    # Burn-rate alert
    if prediction["dailySpendRate"] > (salary / 30) * 0.6:
        alerts.append(
            f"Your daily spending rate ₹{prediction['dailySpendRate']:.0f} is high compared to your salary."
        )

    # Transaction-count alert
    if len(transactions) > 20:
        alerts.append("You have many transactions this month; review for impulse spending.")

    return alerts

def detect_intent(message: str):
    msg = message.lower()

    if any(k in msg for k in ["hi", "hello", "hey"]):
        return "greeting"

    if any(k in msg for k in ["daily", "per day"]):
        return "daily"

    if any(k in msg for k in ["prediction", "future", "end"]):
        return "prediction"

    if any(k in msg for k in ["goal", "save", "saving"]):
        return "goal"

    if any(k in msg for k in ["budget", "plan"]):
        return "budget"

    if any(k in msg for k in ["category", "spending"]):
        return "category"

    if any(k in msg for k in ["alert", "warning"]):
        return "alert"

    return "analysis"

def run_agent(salary, transactions):
    categorization = tool_categorize_spending(transactions)
    patterns = tool_detect_patterns(transactions, salary)
    prediction = tool_predict_balance(transactions, salary)
    score = tool_health_score(transactions, salary)
    budget_plan = tool_budget_planner(salary, transactions)
    smart_alerts = tool_smart_alerts(transactions, salary, budget_plan, prediction)

    suggestions = tool_generate_suggestions(patterns, prediction, salary)

    context = f"""
You are FinCoach AI, a precise financial coach for young salaried professionals.

USER DATA:
Salary: ₹{salary}
Total Spent: ₹{categorization['totalSpent']}
Savings Rate: {patterns['savingsRate']}%
Top Category: {categorization['topCategory']}
Predicted Balance: ₹{prediction['predictedBalance']}
Daily Spend: ₹{prediction['dailySpendRate']}

BUDGET PLAN:
{json.dumps(budget_plan, indent=2)}

SMART ALERTS:
{chr(10).join(smart_alerts) if smart_alerts else 'No major alerts'}

TASK:
Write exactly 2 sentences:
1. Summarize financial health using real ₹ numbers.
2. Give one practical action based on the biggest issue.
"""

    try:
        resp = client.chat.completions.create(
            model="mixtral-8x7b-32768",
            messages=[
                {"role": "system", "content": "You are a precise financial coach."},
                {"role": "user", "content": context}
            ],
            max_tokens=150
        )
        summary = resp.choices[0].message.content
    except Exception:
        summary = (
            f"You've spent ₹{categorization['totalSpent']:.0f} with "
            f"{patterns['savingsRate']}% savings. "
            f"Predicted balance: ₹{prediction['predictedBalance']:.0f}."
        )

    return {
        "score": score,
        "summary": summary,
        "alerts": smart_alerts,
        "suggestions": suggestions,
        "prediction": prediction,
        "budgetPlan": budget_plan,
        "categoryBreakdown": categorization["breakdown"]
    }


# @app.post("/analyze")
# def analyze(req: AnalyzeRequest):
#     return run_agent(req.salary, req.transactions)

@app.post("/analyze")
def analyze(data: dict):
    transactions = data.get("transactions", [])
    salary = data.get("salary", 50000)

    # 👉 USE IT HERE
    score = calculate_health_score(transactions, salary)

    total_spent = sum(t["amount"] for t in transactions)
    predicted_balance = salary - total_spent

    return {
        "score": score,   # 👈 this goes to frontend
        "totalSpent": total_spent,
        "prediction": {
            "predictedBalance": predicted_balance,
            "daysLeft": 10,
            "dailySpendRate": total_spent / 20 if total_spent else 0
        }
    }

@app.post("/chat")
async def chat(req: ChatRequest):
    user_id = req.userId
    msg = req.message.lower().strip()

    try:
        tx_res = requests.get(f"{SPRING_BASE_URL}/transactions/{user_id}", timeout=5)
        tx_res.raise_for_status()
        transactions = tx_res.json() or []

        dash_res = requests.get(f"{SPRING_BASE_URL}/dashboard/{user_id}", timeout=5)
        dash_res.raise_for_status()
        dashboard = dash_res.json() or {}

    except Exception as e:
        print("❌ Backend fetch error:", e)
        return {"reply": "⚠️ Unable to fetch your financial data."}

    income = (
        dashboard.get("totalIncome")
        or dashboard.get("income")
        or dashboard.get("salary")
        or 50000
    )

    clean_tx = [
        {
            "amount": float(t.get("amount", 0)),
            "category": (t.get("category") or "Other"),
            "type": (t.get("type") or "DEBIT").upper()
        }
        for t in transactions
    ]

    total_spent = sum(t["amount"] for t in clean_tx if t["type"] != "CREDIT")
    remaining = income - total_spent
    days = max(1, datetime.now().day)

    if "daily" in msg:
        return {"reply": f"📊 You spend ₹{total_spent/days:.0f}/day"}

    elif "prediction" in msg:
        predicted = (total_spent / days) * 30
        return {"reply": f"📈 Expected spend ₹{predicted:.0f}, balance ₹{income - predicted:.0f}"}

    elif "category" in msg:
        cats = {}
        for t in clean_tx:
            if t["type"] != "CREDIT":
                cats[t["category"]] = cats.get(t["category"], 0) + t["amount"]
        top = max(cats, key=cats.get) if cats else "None"
        return {"reply": f"🏆 Highest spending: {top}"}

    elif "goal" in msg:
        return {"reply": f"🎯 Save ₹{income*0.3:.0f}/month"}

    return {
        "reply": f"💰 Income ₹{income}, Spent ₹{total_spent}, Remaining ₹{remaining}"
    }