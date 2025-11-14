{
  "period": { "from": "...", "to": "..." },
  "members": [
    {
      "memberId": "m1",
      "name": "Alice",
      "energyKcalAvgPerDay": 2100,
      "macroBalance": { "proteinPct": 20, "fatPct": 30, "carbPct": 50 },
      "keyNutrients": [
        { "name": "Fiber", "status": "low", "score": 0.4 },
        { "name": "Sugar", "status": "high", "score": 0.8 }
      ],
      "riskFlags": [
        { "code": "HIGH_SUGAR", "severity": "medium", "message": "Sugar intake high 20 of 30 days" }
      ]
    }
  ],
  "householdTotals": { /* aggregated nutrient stats */ }
}
