const API_URL = "https://cabaniasback-production.up.railway.app/api/dias";

export async function reservarDiaCompleto(id, nombre, contacto) {
  const res = await fetch(`${API_URL}/${id}/reservar`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombreInquilinoManiana: nombre,
      numeroContactoManiana: contacto,
    }),
  });
  return res.json();
}

export async function reservarManiana(id, nombre, contacto) {
  const res = await fetch(`${API_URL}/${id}/reservar-maniana`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombreInquilinoManiana: nombre,
      numeroContactoManiana: contacto,
    }),
  });
  return res.json();
}

export async function reservarTarde(id, nombre, contacto) {
  const res = await fetch(`${API_URL}/${id}/reservar-tarde`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombreInquilinoTarde: nombre,
      numeroContactoTarde: contacto,
    }),
  });
  return res.json();
}
