import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CalendarioPage from "./pages/CalendarioPage";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <div className="bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-2xl font-bold text-indigo-400">
          🏡 Luluni Cabañas
        </h1>

        <nav className="space-x-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-indigo-400 font-medium transition"
          >
            Inicio
          </Link>

          <Link
            to="/calendario/1"
            className="text-gray-300 hover:text-indigo-400 font-medium transition"
          >
            Calendarios
          </Link>
        </nav>
      </div>

      {/* Fondo general */}
      <div className="bg-gray-900 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendario/:id" element={<CalendarioPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
