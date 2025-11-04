import React, { useEffect, useState } from "react";
import { bootstrapTransactions, listTransactionsByCustomer } from "../services/commentsService";
import { sampleTransactions } from "../data/sampleTransactions";

const CURRENT_CUSTOMER_ID = "cust_001";

export default function CustomerDashboard() {
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    bootstrapTransactions(sampleTransactions);
    listTransactionsByCustomer(CURRENT_CUSTOMER_ID).then(setTxns);
  }, []);

  return (
    <div className="page">
      <h2>Your Transactions & Manager Comments</h2>
      {txns.length === 0 ? <p>No transactions yet.</p> : (
        <table className="data-table">
          <thead>
            <tr><th>Date</th><th>Category</th><th>Amount</th><th>Comments</th></tr>
          </thead>
          <tbody>
            {txns.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.category}</td>
                <td>${Number(t.amount).toFixed(2)}</td>
                <td>
                  {t.comments?.length ? (
                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                      {t.comments.map(c => (
                        <li key={c.id}>
                          <strong>{c.authorRole}</strong>: {String(c.text)}{" "}
                          <small>({new Date(c.ts).toLocaleString()})</small>
                        </li>
                      ))}
                    </ul>
                  ) : <em>No manager comments (yet)</em>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
