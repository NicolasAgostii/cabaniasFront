import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DiaCard from "../components/DiaCard";
import {
  reservarDiaCompleto,
  reservarManiana,
  reservarTarde,
} from "../services/ReservaService";

export default function CalendarioPage() {
  const { id } = useParams();
  const [anios, setAnios] = useState([]);
  const [selectedAnio, setSelectedAnio] = useState(null);
  const [meses, setMeses] = useState([]);
  const [selectedDias, setSelectedDias] = useState([]);
  const [turno, setTurno] = useState("mañana");
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    if (id) fetchAnios();
  }, [id]);

  useEffect(() => {
    if (selectedAnio) fetchMeses();
  }, [selectedAnio]);

  async function fetchAnios() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/calendarios/${id}/anios`);
    const data = await res.json();
    setAnios(data);
    if (data.length > 0) setSelectedAnio(data[0]);
  }

  async function fetchMeses() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/calendarios/${id}`);
    const data = await res.json();
    const anioActivo =
      data.anios?.find((a) => a.numero === selectedAnio) || data.anios?.[0];
    setMeses(anioActivo?.meses || []);
  }

  function toggleDiaSeleccionado(dia) {
    setSelectedDias((prev) => {
      const existe = prev.find((d) => d.id === dia.id);
      if (existe) return prev.filter((d) => d.id !== dia.id);
      else return [...prev, dia];
    });
  }

  async function handleReservaSubmit(e) {
    e.preventDefault();
    if (selectedDias.length === 0) return;

    const diasOrdenados = [...selectedDias].sort((a, b) => a.numero - b.numero);
    const todosLosDias = meses.flatMap((m) => m.dias);

    if (turno === "completo" && diasOrdenados.length === 1) {
      const diaActual = diasOrdenados[0];
      const siguienteDia = todosLosDias.find(
        (d) => d.numero === diaActual.numero + 1
      );

      if (!siguienteDia) {
        alert("⚠️ No existe un día siguiente para completar la reserva.");
        return;
      }

      if (diaActual.ocupadoALaTarde || siguienteDia.ocupadoALaManiana) {
        alert(
          `⚠️ No se puede reservar: el día ${diaActual.numero} (tarde) o el día ${siguienteDia.numero} (mañana) ya está ocupado.`
        );
        return;
      }

      await Promise.all([
        reservarTarde(diaActual.id, nombre, contacto),
        reservarManiana(siguienteDia.id, nombre, contacto),
      ]);

      setShowModal(false);
      setSelectedDias([]);
      setNombre("");
      setContacto("");
      await fetchMeses();
      alert("✅ Reserva registrada correctamente.");
      return;
    }

    const errorDia = diasOrdenados.find((dia, index) => {
      const maniana = dia.ocupadoALaManiana;
      const tarde = dia.ocupadoALaTarde;

      if (turno === "mañana" && maniana) return true;
      if (turno === "tarde" && tarde) return true;

      if (turno === "completo") {
        if (diasOrdenados.length > 1) {
          if (index === 0 && tarde) return true;
          if (index === diasOrdenados.length - 1 && maniana) return true;
          if (index > 0 && index < diasOrdenados.length - 1 && (maniana || tarde))
            return true;
        } else if (maniana || tarde) return true;
      }

      return false;
    });

    if (errorDia) {
      alert(`⚠️ El día ${errorDia.numero} ya está ocupado para el turno correspondiente.`);
      return;
    }

    const reservas = diasOrdenados.map((dia, index) => {
      if (turno === "completo") {
        if (diasOrdenados.length > 1) {
          if (index === 0) return reservarTarde(dia.id, nombre, contacto);
          if (index === diasOrdenados.length - 1)
            return reservarManiana(dia.id, nombre, contacto);
          return reservarDiaCompleto(dia.id, nombre, contacto);
        }
        return reservarDiaCompleto(dia.id, nombre, contacto);
      }

      if (turno === "mañana") return reservarManiana(dia.id, nombre, contacto);
      if (turno === "tarde") return reservarTarde(dia.id, nombre, contacto);
    });

    await Promise.all(reservas);

    setShowModal(false);
    setSelectedDias([]);
    setNombre("");
    setContacto("");
    await fetchMeses();
    alert("✅ Reservas confirmadas correctamente.");
  }

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-400">
          Calendario de Reservas (Cabaña {id})
        </h1>
        <button
          onClick={() => setShowModal(true)}
          disabled={selectedDias.length === 0}
          className={`px-5 py-3 rounded-lg font-semibold transition ${
            selectedDias.length > 0
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Reservar {selectedDias.length > 0 ? `(${selectedDias.length})` : ""}
        </button>
      </div>

      <div className="flex justify-center gap-6 mb-8 flex-wrap">
        {anios.map((anio) => (
          <button
            key={anio}
            onClick={() => setSelectedAnio(anio)}
            className={`px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition-all ${
              selectedAnio === anio
                ? "bg-indigo-600 text-white scale-110"
                : "bg-gray-800 text-gray-300 hover:bg-indigo-100 hover:text-gray-900"
            }`}
          >
            {anio}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-10">
        {meses.map((mes) => (
          <div
            key={mes.id}
            className="rounded-2xl shadow-lg p-6 border border-gray-700 bg-gray-800"
          >
            <h2 className="text-2xl font-semibold text-indigo-400 mb-4 border-b border-indigo-400 pb-2">
              {mes.nombre} ({selectedAnio})
            </h2>

            <div className="grid grid-cols-7 gap-3 justify-items-center">
              {mes.dias?.map((dia) => (
                <DiaCard
                  key={dia.id}
                  dia={dia}
                  onSelect={() => toggleDiaSeleccionado(dia)}
                  isSelected={selectedDias.some((d) => d.id === dia.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-96 text-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Reservar {selectedDias.length} día(s) ({selectedAnio})
            </h2>
            <p className="text-sm text-center mb-3 text-gray-600">
              Días seleccionados:{" "}
              {selectedDias.map((d) => d.numero).sort((a, b) => a - b).join(", ")}
            </p>

            <form onSubmit={handleReservaSubmit} className="flex flex-col gap-3">
              <label className="text-sm font-medium text-gray-700">Turno</label>
              <select
                value={turno}
                onChange={(e) => setTurno(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="completo">Completo</option>
              </select>

              <label className="text-sm font-medium text-gray-700">
                Nombre del inquilino
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                placeholder="Ej: Juan Pérez"
                className="border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500"
              />

              <label className="text-sm font-medium text-gray-700">
                Número de contacto
              </label>
              <input
                type="text"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
                required
                placeholder="Ej: 1122334455"
                className="border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                  Confirmar reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
