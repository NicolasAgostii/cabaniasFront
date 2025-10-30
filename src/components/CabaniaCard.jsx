import { useNavigate } from "react-router-dom";

export default function CabaniaCard({ cabania }) {
  const navigate = useNavigate();
  const img = cabania?.fotoUrls?.[0] ?? "";

  const handleClick = () => {
    navigate(`/calendario/${cabania.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-xl p-6 w-72 hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <img
        src={img}
        alt="foto"
        className="w-full h-48 object-cover rounded-lg bg-gray-100"
      />
      <h3 className="font-semibold text-gray-800 mt-3 text-lg">
        {cabania.descripcion}
      </h3>
      <p className="text-sm text-gray-600">
        Capacidad: {cabania.capacidad} personas
      </p>
      <p className="text-indigo-700 font-bold mt-2 text-lg">
        ${cabania.precio}
      </p>
    </div>
  );
}
