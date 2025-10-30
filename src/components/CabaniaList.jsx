import CabaniaCard from "./CabaniaCard";

export default function CabaniaList({ cabanias }) {
  if (!Array.isArray(cabanias) || cabanias.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-8 text-lg">
        No hay cabañas disponibles.
      </p>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-10 py-10 justify-items-center">
        {cabanias.map((c) => (
          <CabaniaCard key={c.id} cabania={c} />
        ))}
      </div>
    </div>
  );
}
