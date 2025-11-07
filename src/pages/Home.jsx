import { useEffect, useState } from "react";
import axios from "axios";
import CabaniaCard from "../components/CabaniaCard";

export default function Home() {
  const [cabanias, setCabanias] = useState([]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/cabanias`)
      .then((res) => {
        console.log("Respuesta del backend:", res.data);
        // ✅ Manejar ambos casos (lista directa o dentro de un objeto 'content')
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.content || [];
        setCabanias(data);
      })
      .catch((err) => console.error("Error al cargar las cabañas:", err));
  }, [baseUrl]);

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col items-center py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
        {cabanias.map((c) => (
          <CabaniaCard key={c.id} cabania={c} />
        ))}
      </div>
    </div>
  );
}
