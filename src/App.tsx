import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OwnerNew from "./pages/OwnerNew";
import OwnerMine from "./pages/OwnerMine";
import AdminPending from "./pages/AdminPending";
import TenantApps from "./pages/TenantApps";
import { RequireAuth, RequireRole } from "./components/Guards";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route path="/owner/new" element={
            <RequireRole roles={["OWNER"]}><OwnerNew/></RequireRole>
          } />
          <Route path="/owner/mine" element={
            <RequireRole roles={["OWNER"]}><OwnerMine/></RequireRole>
          } />

          <Route path="/admin/pending" element={
            <RequireRole roles={["ADMIN"]}><AdminPending/></RequireRole>
          } />

          <Route path="/tenant/apps" element={
            <RequireRole roles={["TENANT"]}><TenantApps/></RequireRole>
          } />

          <Route path="*" element={<div className="p-6">Not found</div>} />
        </Routes>
      </main>
      <footer className="border-t p-4 text-center text-sm text-gray-500">© Rentals</footer>
    </div>
  );
}
