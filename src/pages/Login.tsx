import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("admin@rentals.local");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState<string | null>(null);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await login(email, password); nav("/"); }
    catch (e:any) { setErr(e.message); }
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Σύνδεση</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
      <p className="text-sm text-gray-500 mt-2">Tip: Δοκίμασε admin@rentals.local / admin123</p>
    </div>
  );
}
