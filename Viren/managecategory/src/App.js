import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { RequireActive, RequireAdmin } from "./auth/RouteGuards";
import AuthProvider from "./auth/AuthProvider";
import LoginPage from "./auth/LoginPage";
import BlockedPage from "./auth/BlockedPage";
import NotAuthorizedPage from "./auth/NotAuthorizedPage";
import AdminUsersPage from "./users/AdminUsersPage";
import AdminPanel from "./components/AdminPanel";  // from Sprint 1

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <header style={{display:"flex",gap:12,alignItems:"center",padding:"14px 20px",background:"var(--primary)",color:"#fff"}}>
          <strong>Accounting App</strong>
          <nav style={{display:"flex",gap:10,marginLeft:"auto"}}>
            <Link to="/" style={{color:"#fff"}}>Home</Link>
            <Link to="/categories" style={{color:"#fff"}}>Categories</Link>
            <Link to="/admin/users" style={{color:"#fff"}}>Users</Link>
            <Link to="/login" style={{color:"#fff"}}>Login</Link>
          </nav>
        </header>

        <div className="app">
          <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/blocked" element={<BlockedPage/>}/>
            <Route path="/not-authorized" element={<NotAuthorizedPage/>}/>

            <Route path="/" element={
              <RequireActive>
                <div className="card"><h2 className="title">Home</h2><p>Welcome!</p></div>
              </RequireActive>
            }/>

            <Route path="/categories" element={
              <RequireActive><AdminPanel/></RequireActive>
            }/>

            <Route path="/admin/users" element={
              <RequireAdmin><AdminUsersPage/></RequireAdmin>
            }/>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
