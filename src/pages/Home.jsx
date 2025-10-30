import { useEffect, useState } from "react";
import axios from "axios";
import CabaniaCard from "../components/CabaniaCard";

export default function Home() {
  const [cabanias, setCabanias] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cabanias")
      .then((res) => setCabanias(res.data))
      .catch((err) => console.log(err));
  }, []);

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
