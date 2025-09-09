import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import type { Role } from "../types";

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("TENANT");
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    await register({ email, fullName, password, roles: [role] });
    setMsg("Ο λογαριασμός δημιουργήθηκε! Μπορείς να κάνεις login.");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Εγγραφή</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Ονοματεπώνυμο" value={fullName} onChange={e=>setFullName(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Κωδικός" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select className="w-full border p-2 rounded" value={role} onChange={e=>setRole(e.target.value as any)}>
          <option value="TENANT">TENANT (Ενοικιαστής)</option>
          <option value="OWNER">OWNER (Ιδιοκτήτης)</option>
        </select>
        <button className="w-full bg-green-600 text-white p-2 rounded">Register</button>
      </form>
      {msg && <p className="text-green-700 mt-2">{msg}</p>}
    </div>
  );
}
