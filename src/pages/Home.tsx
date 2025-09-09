import { useEffect, useState } from "react";
import api from "../api/client";
import type { Property } from "../types";
import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const [items, setItems] = useState<Property[]>([]);
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const { hasRole } = useAuth();

  const fetchProps = async () => {
    const params: any = {};
    if (city) params.city = city;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (bedrooms) params.bedrooms = bedrooms;
    const res = await api.get("/properties", { params });
    setItems(res.data.content || []);
  };

  useEffect(() => { fetchProps(); }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Αναζήτηση ακινήτων</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
        <input className="border p-2 rounded" placeholder="Πόλη" value={city} onChange={e=>setCity(e.target.value)} />
        <input className="border p-2 rounded" placeholder="min €" value={minPrice} onChange={e=>setMinPrice(e.target.value)} />
        <input className="border p-2 rounded" placeholder="max €" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />
        <input className="border p-2 rounded" placeholder="rooms ≥" value={bedrooms} onChange={e=>setBedrooms(e.target.value)} />
        <button onClick={fetchProps} className="bg-blue-600 text-white rounded p-2">Αναζήτηση</button>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {items.map(p => (
          <div key={p.id} className="border rounded p-3">
            <div className="text-lg font-semibold">{p.title}</div>
            <div className="text-sm text-gray-500">{p.city} • {p.type}</div>
            <div className="mt-1 font-bold">{p.price} €</div>
            <div className="text-sm">BR: {p.bedrooms ?? "-"} • BA: {p.bathrooms ?? "-"} • {p.area ?? "-"} ㎡</div>
            <div className="text-xs mt-1">Status: {p.status}</div>
            {hasRole("TENANT") && <ApplyButton propertyId={p.id} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ApplyButton({ propertyId }: { propertyId: number }) {
  const [done, setDone] = useState(false);
  const { token } = useAuth();
  const apply = async () => {
    if (!token) return alert("Login as TENANT first");
    await api.post("/applications", { propertyId, message: "Interested!" });
    setDone(true);
  };
  return (
    <button onClick={apply} disabled={done} className="mt-2 px-3 py-1 rounded bg-emerald-600 text-white disabled:opacity-60">
      {done ? "Υποβλήθηκε" : "Κάνε αίτηση"}
    </button>
  );
}
