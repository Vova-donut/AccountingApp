import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import EmailVerification from "./EmailVerification";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ForgotPassword />} />
        <Route path="/verify" element={<EmailVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
