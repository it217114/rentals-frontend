import { useState } from "react";
import api from "../api/client";

export default function OwnerNew() {
  const [form, setForm] = useState({
    title:"", type:"APARTMENT", city:"", address:"",
    price: 0, bedrooms: 1, bathrooms: 1, area: 50, description:"", amenities:""
  });
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/properties", { ...form, imageUrls: [] });
    setMsg("Η καταχώριση δημιουργήθηκε και περιμένει έγκριση από Admin.");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Νέα καταχώριση</h1>
      <form onSubmit={submit} className="space-y-2">
        <input className="w-full border p-2 rounded" placeholder="Τίτλος" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
        <input className="w-full border p-2 rounded" placeholder="Τύπος (π.χ. APARTMENT)" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}/>
        <input className="w-full border p-2 rounded" placeholder="Πόλη" value={form.city} onChange={e=>setForm({...form, city:e.target.value})}/>
        <input className="w-full border p-2 rounded" placeholder="Διεύθυνση" value={form.address} onChange={e=>setForm({...form, address:e.target.value})}/>
        <div className="grid grid-cols-3 gap-2">
          <input className="border p-2 rounded" type="number" placeholder="Τιμή" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})}/>
          <input className="border p-2 rounded" type="number" placeholder="Υ/Δ" value={form.bedrooms} onChange={e=>setForm({...form, bedrooms:Number(e.target.value)})}/>
          <input className="border p-2 rounded" type="number" placeholder="Μπάνια" value={form.bathrooms} onChange={e=>setForm({...form, bathrooms:Number(e.target.value)})}/>
        </div>
        <input className="w-full border p-2 rounded" type="number" placeholder="Τ.μ." value={form.area} onChange={e=>setForm({...form, area:Number(e.target.value)})}/>
        <textarea className="w-full border p-2 rounded" placeholder="Περιγραφή" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
        <textarea className="w-full border p-2 rounded" placeholder="Παροχές" value={form.amenities} onChange={e=>setForm({...form, amenities:e.target.value})}/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Αποθήκευση</button>
      </form>
      {msg && <p className="text-green-700 mt-2">{msg}</p>}
    </div>
  );
}
