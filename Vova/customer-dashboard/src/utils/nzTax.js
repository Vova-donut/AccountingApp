// nzTax.js — период NZ tax year + расчёты для карточек

export function nzTaxYearRange(today = new Date()) {
    // NZ tax year: 1 Apr (month=3) → 31 Mar (month=2 следующего года)
    const y = today.getFullYear();
    const april1 = new Date(y, 3, 1);
    if (today >= april1) {
        return { start: new Date(y, 3, 1), end: new Date(y + 1, 2, 31, 23, 59, 59) };
    }
    return { start: new Date(y - 1, 3, 1), end: new Date(y, 2, 31, 23, 59, 59) };
}

export function inRange(date, { start, end }) {
    const d = typeof date === "string" ? new Date(date) : date;
    return d >= start && d <= end;
}

export function calcTotals(transactions = [], period) {
    let income = 0, expense = 0;
    for (const t of transactions) {
        if (!t?.date) continue;
        if (!inRange(t.date, period)) continue;
        const amt = Number(t.amount) || 0;
        if (t.type === "income") income += amt;
        else if (t.type === "expense") expense += amt;
    }
    const net = income - expense;
    return { income, expense, net };
}

export function estimateTax(net, rate) {
    return net > 0 ? net * rate : 0; // если минус — налог 0
}