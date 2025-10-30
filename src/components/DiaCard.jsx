import React from "react";

export default function DiaCard({ dia, onSelect, isSelected }) {
  const maniana = dia.ocupadoALaManiana;
  const tarde = dia.ocupadoALaTarde;

  const inquilinoManiana = dia.nombreInquilinoManiana || "";
  const contactoManiana = dia.numeroContactoManiana || "";
  const inquilinoTarde = dia.nombreInquilinoTarde || "";
  const contactoTarde = dia.numeroContactoTarde || "";

  const completo = maniana && tarde;
  const mismoInquilino =
    inquilinoManiana &&
    inquilinoTarde &&
    inquilinoManiana.trim().toLowerCase() ===
      inquilinoTarde.trim().toLowerCase();

  let background = "#bbf7d0";
  let estado = "Libre";

  if (completo && mismoInquilino) {
    background = "#ef4444";
    estado = "Ocupado";
  } else if (maniana && tarde) {
    background = "linear-gradient(135deg, #facc15 50%, #fb923c 50%)";
    estado = "Ocupado";
  } else if (maniana && !tarde) {
    background = "linear-gradient(135deg, #facc15 50%, #bbf7d0 50%)";
    estado = "Mañana";
  } else if (!maniana && tarde) {
    background = "linear-gradient(135deg, #bbf7d0 50%, #fb923c 50%)";
    estado = "Tarde";
  }

  const borderStyle = isSelected ? "4px solid #4f46e5" : "2px solid transparent";
  const scaleEffect = isSelected ? "scale-105" : "scale-100";

  return (
    <div
      onClick={() => onSelect(dia)}
      className={`relative w-36 h-36 rounded-xl shadow-md flex flex-col items-center justify-center text-center cursor-pointer transition ${scaleEffect}`}
      style={{
        background,
        border: borderStyle,
        boxShadow: isSelected
          ? "0 0 10px rgba(79, 70, 229, 0.7)"
          : "0 2px 4px rgba(0,0,0,0.2)",
        color: completo && mismoInquilino ? "white" : "#1f2937",
      }}
    >
      <p className="font-bold text-lg">{dia.numero}</p>

      {completo && mismoInquilino ? (
        <>
          <p className="text-sm font-medium mb-1">{estado}</p>
          <div className="text-center px-1">
            <p className="text-sm font-bold uppercase break-words leading-tight">
              {inquilinoManiana}
            </p>
            <p className="text-xs font-medium opacity-90 break-all">
              {contactoManiana || contactoTarde}
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-700 font-medium">{estado}</p>

          {maniana && (
            <div className="absolute left-1 top-1 text-[11px] text-gray-800 font-semibold w-[65%] leading-tight text-left bg-yellow-300/40 rounded-md px-1 py-[1px] break-words">
              <span className="block truncate">{inquilinoManiana}</span>
              <span className="block text-[10px] text-gray-700 break-all">
                {contactoManiana}
              </span>
            </div>
          )}

          {tarde && (
            <div className="absolute right-1 bottom-1 text-[11px] text-gray-800 font-semibold w-[65%] leading-tight text-right bg-orange-300/40 rounded-md px-1 py-[1px] break-words">
              <span className="block truncate">{inquilinoTarde}</span>
              <span className="block text-[10px] text-gray-700 break-all">
                {contactoTarde}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
