import { useEffect, useState } from "react";
import CabaniaList from "./CabaniaList";

export default function CabaniasPage() {
  const [cabanias, setCabanias] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👇 Leemos la variable de entorno
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`https://cabaniasback-production.up.railway.app/api/cabanias`)
      .then((r) => r.json())
      .then((data) => setCabanias(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [baseUrl]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Cargando...</p>;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#d1d5db" }}>
      <h1 className="text-3xl font-bold text-center text-indigo-600 pt-10">
        Disponibilidad de Cabañas
      </h1>
      <CabaniaList cabanias={cabanias} />
    </div>
  );
}
