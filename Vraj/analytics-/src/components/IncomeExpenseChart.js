import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function IncomeExpenseChart({ data }) {
  return (
    <div className="card">
      <h3>Monthly Income vs Expense</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#27AE60" />
          <Bar dataKey="expense" fill="#C0392B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
