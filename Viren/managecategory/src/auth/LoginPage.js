import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../utils/userStore";

export default function LoginPage() {
  const nav = useNavigate();
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [err,setErr]=useState("");

  const login=async(e)=>{
    e.preventDefault(); setErr("");
    try{ await userStore.signIn(email.trim(),pass); nav("/"); }
    catch(e){ setErr(e.message||"Login failed"); }
  };

  return (
    <form onSubmit={login} className="card" style={{maxWidth:360,margin:"60px auto"}}>
      <h2 className="title">Login</h2>
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
      <button className="btn primary" type="submit">Sign in</button>
      {err && <p style={{color:"crimson"}}>{err}</p>}
      <p style={{fontSize:12,color:"#555"}}>
        Demo: admin@example.com / admin123<br/>
        manager@example.com / manager123<br/>
        customer@example.com / customer123
      </p>
    </form>
  );
}
