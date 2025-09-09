import { useEffect, useState } from "react";
import api from "../api/client";
import type { Property } from "../types";

export default function OwnerMine() {
  const [items, setItems] = useState<Property[]>([]);
  const load = async () => {
    const res = await api.get("/properties/mine");
    setItems(res.data.content || res.data || []);
  };
  useEffect(() => { load(); }, []);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-3">Τα ακίνητά μου</h1>
      <div className="space-y-2">
        {items.map(p => (
          <div key={p.id} className="border rounded p-3 flex justify-between">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-500">{p.city} • {p.type}</div>
              <div className="text-xs mt-1">Status: {p.status}</div>
            </div>
            <div className="font-bold">{p.price} €</div>
          </div>
        ))}
      </div>
    </div>
  );
}
