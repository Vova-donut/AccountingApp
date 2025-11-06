import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Filters from "./components/Filters.js";
import IncomeExpenseChart from "./components/IncomeExpenseChart.js";
import CategoryBreakdownChart from "./components/CategoryBreakdownChart.js";
import { listCustomers, listTransactionsByCustomer, resetDemoData } from "./services/reviewsData";
import { format } from "date-fns";

export default function App() {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [customerTxns, setCustomerTxns] = useState([]);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [period, setPeriod] = useState("year");

  useEffect(() => {
    (async () => {
      const cs = await listCustomers();
      setCustomers(cs);
      const initial = cs.find(c => c.id === "cust_001") || cs[0];
      if (initial) {
        setCustomerId(initial.id);
      }
    })();
  }, []);

  useEffect(() => {
    if (!customerId) { setCustomerTxns([]); return; }
    (async () => {
      const tx = await listTransactionsByCustomer(customerId);
      setCustomerTxns(tx);
    })();
  }, [customerId]);

  const filtered = useMemo(() => {
    return customerTxns.filter((t) => {
      const matchType = !type || t.type === type;
      const matchCategory = !category || t.category.toLowerCase().includes(category.toLowerCase());
      return matchType && matchCategory;
    });
  }, [type, category, customerTxns]);

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Filters
            customers={customers}
            customerId={customerId}
            setCustomerId={setCustomerId}
            type={type}
            setType={setType}
            category={category}
            setCategory={setCategory}
            period={period}
            setPeriod={setPeriod}
          />
          <button
            className="btn"
            onClick={async () => {
              await resetDemoData();
              const cs = await listCustomers();
              setCustomers(cs);
              const first = cs.find(c => c.id === "cust_001") || cs[0];
              const id = first ? first.id : "";
              setCustomerId(id);
              if (id) {
                const tx = await listTransactionsByCustomer(id);
                setCustomerTxns(tx);
              } else {
                setCustomerTxns([]);
              }
            }}
            title="Clear and reseed demo data"
          >
            Reset Demo Data
          </button>
        </div>
      </div>

      {customers.length === 0 ? (
        <p>No customers found. Open ACC-6 (Manage Reviews) to seed data, or add a transaction there first.</p>
      ) : filtered.length === 0 ? (
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
