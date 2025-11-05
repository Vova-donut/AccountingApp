import { useMemo, useState } from "react";
import { nzTaxYearRange, calcTotals, estimateTax } from "../utils/nzTax";

/**
 * TaxSummaryPanel
 * props:
 *  - transactions: массив транзакций пользователя (пока можно передать mock)
 *  - initialRate: стартовая ставка налога (потом возьмём из Firestore userSettings)
 */
export function TaxSummaryPanel({ transactions = [], initialRate = 0.175 }) {
    const safeTx = Array.isArray(transactions) ? transactions : []; // ← защита
    console.log("[TaxSummaryPanel] transactions:", { len: safeTx.length });
    const [mode, setMode] = useState("nz"); // "nz" | "custom"
    const [taxRate, setTaxRate] = useState(initialRate);

    // Диапазон по умолчанию — текущий NZ tax year
    const nzDefault = useMemo(() => nzTaxYearRange(), []);
    const [customStart, setCustomStart] = useState(nzDefault.start.toISOString().slice(0, 10));
    const [customEnd, setCustomEnd] = useState(nzDefault.end.toISOString().slice(0, 10));

    const period = useMemo(() => {
        if (mode === "nz") return nzDefault;
        // из YYYY-MM-DD в Date; включаем конец дня
        const s = new Date(customStart + "T00:00:00");
        const e = new Date(customEnd + "T23:59:59");
        return { start: s, end: e };
    }, [mode, customStart, customEnd, nzDefault]);

    const totals = useMemo(() => calcTotals(transactions, period), [transactions, period]);
    const estTax = useMemo(() => estimateTax(totals.net, taxRate), [totals.net, taxRate]);

    return (
        <section className="card" style={{ marginBottom: 16 }}>
            <div className="summary">
                <h3>NZ Tax-Year Summary</h3>

                {/* Переключатель периода */}
                <div className="controls">
                    <button
                        type="button"
                        className={(mode === "nz" ? "btn-primary" : "btn-outline") + " btn-pill"}
                        onClick={() => setMode("nz")}
                    >
                        NZ Tax Year (1 Apr - 31 Mar)
                    </button>
                    <button
                        type="button"
                        className={(mode === "nz" ? "btn-primary" : "btn-outline") + " btn-pill"}
                        onClick={() => setMode("custom")}
                    >
                        Custom Range
                    </button>
                </div>
            </div>

            {mode === "custom" && (
                <div className="summary" style={{ marginTop: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <label className="muted">From</label>
                        <input
                            type="date"
                            className="input"
                            value={customStart}
                            onChange={(e) => setCustomStart(e.target.value)}
                        />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <label className="muted">To</label>
                        <input
                            type="date"
                            className="input"
                            value={customEnd}
                            onChange={(e) => setCustomEnd(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {/* Три карточки: Income / Expenses / Net */}
            <div className="summary" style={{ marginTop: 12 }}>
                <div className="card">
                    <div className="muted">Total Income</div>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>${totals.income.toFixed(2)}</div>
                </div>
                <div className="card">
                    <div className="muted">Total Expenses</div>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>${totals.expense.toFixed(2)}</div>
                </div>
                <div className="card">
                    <div className="muted">Net</div>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>${totals.net.toFixed(2)}</div>
                </div>
            </div>

            {/* Estimated Tax + ставка */}
            <div className="summary" style={{ marginTop: 12 }}>
                <div className="card">
                    <div className="muted">Estimated Tax</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "var(--c-primary)" }}>
                        ${estTax.toFixed(2)}
                    </div>
                </div>
                <div className="card">
                    <label className="muted">Tax Rate</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                            type="number"
                            className="input"
                            step="0.005"
                            min="0"
                            max="0.6"
                            value={taxRate}
                            onChange={(e) => setTaxRate(Number(e.target.value))}
                            style={{ width: "80px", textAlign: "right", borderRadius: "8px" }}
                        />
                        <span className="muted">e.g., 0.175</span>
                    </div>
                </div>
                <div className="card" style={{ background: "#F9FBFF" }}>
                    <div className="muted">
                        <strong>Disclaimer:</strong> This is an estimate for guidance only, not official tax advice.
                        NZ tax year is 1 Apr - 31 Mar.
                    </div>
                </div>
            </div>
        </section>
    );
}