import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TransactionInsights from "./pages/TransactionInsights";
import ManageReviews from "./pages/ManageReviews";
import ManageTransactions from "./pages/ManageTransactions";
import Customers from "./pages/Customers";
import SelectCustomers from "./pages/SelectCustomers";

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content" role="main" aria-live="polite">
        <Routes>
          <Route path="/" element={<TransactionInsights />} />
          <Route path="/insights" element={<TransactionInsights />} />
          <Route path="/reviews" element={<ManageReviews />} />
          <Route path="/transactions" element={<ManageTransactions />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/select-customers" element={<SelectCustomers />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}