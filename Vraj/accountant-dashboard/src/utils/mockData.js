export const transactions = [
  { id: 'T001', date: '2025-10-06', customer: 'Alice Smith', category: 'Fuel', amount: -58.20, notes: 'BP' },
  { id: 'T002', date: '2025-10-08', customer: 'Alice Smith', category: 'Groceries', amount: -120.00, notes: 'Countdown' },
  { id: 'T003', date: '2025-10-10', customer: 'Bob Lee', category: 'Salary', amount: 2200.00, notes: 'October' },
  { id: 'T004', date: '2025-10-18', customer: 'Bob Lee', category: 'Dining', amount: -42.50, notes: 'Lunch' },
  { id: 'T005', date: '2025-11-02', customer: 'Alice Smith', category: 'Transport', amount: -18.00, notes: 'AT HOP' },
]

export const customers = [
  { id: 'C001', name: 'Alice Smith', email: 'alice@example.com', totalTx: 12, totalAmount: 1450.75, lastActive: '2025-11-06' },
  { id: 'C002', name: 'Bob Lee', email: 'bob@example.com', totalTx: 8, totalAmount: 980.10, lastActive: '2025-11-05' },
  { id: 'C003', name: 'Chandra Patel', email: 'chandra@example.com', totalTx: 5, totalAmount: 320.00, lastActive: '2025-11-01' },
]

export const categories = ['Fuel','Groceries','Dining','Transport','Salary']
export const reviews = [
  { id: 'R1001', customer: 'Alice Smith', note: 'Mismatch in category', status: 'Open' },
  { id: 'R1002', customer: 'Bob Lee', note: 'Duplicate transaction', status: 'Flagged' },
  { id: 'R1003', customer: 'Chandra Patel', note: 'Incorrect amount', status: 'Resolved' },
]
