import { useEffect, useState } from "react";
import api from "../api/client";

type AppRow = { id:number; propertyId:number; tenantEmail:string; status:string; message:string };

export default function TenantApps() {
  const [items, setItems] = useState<AppRow[]>([]);
  const load = async () => {
    const res = await api.get("/applications/mine");
    setItems(res.data);
  };
  useEffect(() => { load(); }, []);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-3">Οι αιτήσεις μου</h1>
      <div className="space-y-2">
        {items.map(a => (
          <div key={a.id} className="border rounded p-3">
            <div className="font-semibold">Property #{a.propertyId}</div>
            <div className="text-sm">Status: {a.status}</div>
            {a.message && <div className="text-sm text-gray-600 mt-1">“{a.message}”</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
