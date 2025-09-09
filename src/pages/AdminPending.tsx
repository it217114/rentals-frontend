import { useEffect, useState } from "react";
import api from "../api/client";
import type { Property } from "../types";

export default function AdminPending() {
  const [items, setItems] = useState<Property[]>([]);
  const load = async () => {
    const res = await api.get("/admin/properties/pending");
    setItems(res.data.content || []);
  };
  useEffect(() => { load(); }, []);

  const approve = async (id:number) => { await api.post(`/admin/properties/${id}/approve`); load(); };
  const reject  = async (id:number) => { await api.post(`/admin/properties/${id}/reject`);  load(); };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-3">Εκκρεμείς προς έγκριση</h1>
      {items.length===0 && <p className="text-gray-500">Καμία εκκρεμότητα</p>}
      <div className="space-y-2">
        {items.map(p => (
          <div key={p.id} className="border rounded p-3 flex justify-between items-center">
            <div>
              <div className="font-semibold">{p.title} — {p.city}</div>
              <div className="text-sm text-gray-500">{p.type} • {p.price} €</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>approve(p.id)} className="px-3 py-1 rounded bg-emerald-600 text-white">Approve</button>
              <button onClick={()=>reject(p.id)}  className="px-3 py-1 rounded bg-red-600 text-white">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
