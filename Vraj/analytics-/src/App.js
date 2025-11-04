import React, { useState, useMemo } from "react";
import "./App.css";
import Filters from "./components/Filters.js";
import IncomeExpenseChart from "./components/IncomeExpenseChart.js";
import CategoryBreakdownChart from "./components/CategoryBreakdownChart.js";
import { demoTransactions } from "./data/demoTransactions";
import { format } from "date-fns";

export default function App() {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [period, setPeriod] = useState("year");

  const filtered = useMemo(() => {
    return demoTransactions.filter((t) => {
      const matchType = !type || t.type === type;
      const matchCategory = !category || t.category.toLowerCase().includes(category.toLowerCase());
      return matchType && matchCategory;
    });
  }, [type, category]);

  // Monthly totals
  const monthlyData = useMemo(() => {
    const months = {};
    filtered.forEach((t) => {
      const m = format(new Date(t.date), "MMM");
      if (!months[m]) months[m] = { month: m, income: 0, expense: 0 };
      months[m][t.type] += t.amount;
    });
    return Object.values(months);
  }, [filtered]);

  // Category totals
  const categoryData = useMemo(() => {
    const cats = {};
    filtered.forEach((t) => {
      if (!cats[t.category]) cats[t.category] = 0;
      cats[t.category] += t.amount;
    });
    return Object.entries(cats).map(([category, amount]) => ({ category, amount }));
  }, [filtered]);

  return (
    <div className="App page">
      <h2>Transaction Insights</h2>
      <div className="card" style={{ marginBottom: 16 }}>
        <Filters
          type={type}
          setType={setType}
          category={category}
          setCategory={setCategory}
          period={period}
          setPeriod={setPeriod}
        />
      </div>

      {filtered.length === 0 ? (
        <p>No data available for this selection.</p>
      ) : (
        <>
          <IncomeExpenseChart data={monthlyData} />
          <CategoryBreakdownChart data={categoryData} />
        </>
      )}
    </div>
  );
}
