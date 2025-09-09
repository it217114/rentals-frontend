import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function NavBar() {
  const { email, roles, logout, hasRole } = useAuth();
  const link = (to:string, label:string) => (
    <NavLink to={to} className={({isActive}) => 
      `px-3 py-2 rounded hover:bg-gray-100 ${isActive?'font-semibold underline':''}`}>
      {label}
    </NavLink>
  );
  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-3">
        <Link to="/" className="text-xl font-bold">🏠 Rentals</Link>
        <nav className="flex gap-2">
          {link("/", "Αναζήτηση")}
          {hasRole("OWNER") && link("/owner/new", "Νέα Καταχώριση")}
          {hasRole("OWNER") && link("/owner/mine", "Τα ακίνητά μου")}
          {hasRole("TENANT") && link("/tenant/apps", "Οι αιτήσεις μου")}
          {hasRole("ADMIN") && link("/admin/pending", "Admin Pending")}
        </nav>
        <div className="flex items-center gap-2">
          {email ? (
            <>
              <span className="text-sm text-gray-600">{email} ({roles.join(",")})</span>
              <button onClick={logout} className="px-3 py-2 rounded bg-gray-800 text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 rounded bg-gray-800 text-white">Login</Link>
              <Link to="/register" className="px-3 py-2 rounded border">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
