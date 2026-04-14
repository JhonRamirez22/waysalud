// historia.js
// Lógica de lectura/escritura de historias clínicas.

const rolesApi = window.MCRoles;

function getHistorias() {
  return rolesApi.loadJSON(rolesApi.STORAGE_KEYS.historias, []);
}

function saveHistorias(historias) {
  rolesApi.saveJSON(rolesApi.STORAGE_KEYS.historias, historias);
}

function getHistoriaByPacienteId(pacienteId) {
  return getHistorias().find((h) => h.pacienteId === Number(pacienteId));
}

function formatDateTime(value) {
  return new Date(value).toLocaleString();
}

function pushBitacora(historia, by, what) {
  if (!Array.isArray(historia.bitacora)) historia.bitacora = [];
  historia.bitacora.unshift({ at: new Date().toISOString(), by, what });
  historia.ultimaActualizacion = new Date().toISOString().slice(0, 10);
  historia.actualizadoPor = by;
}

function getLatestDiagnosis(historia) {
  if (!historia?.consultas?.length) return "Sin diagnóstico registrado";
  return historia.consultas[0]?.diagnostico || "Sin diagnóstico registrado";
}

function buildTabs(prefix, editable) {
  return `
    <div class="inline-actions" style="margin:0.5rem 0 1rem;">
      <button class="btn-outline" data-${prefix}-tab="personales">Datos personales</button>
      <button class="btn-outline" data-${prefix}-tab="antecedentes">Antecedentes</button>
      <button class="btn-outline" data-${prefix}-tab="medicamentos">Medicamentos</button>
      <button class="btn-outline" data-${prefix}-tab="consultas">Consultas</button>
      <button class="btn-outline" data-${prefix}-tab="documentos">Documentos</button>
      ${editable ? `<button class="btn-primary" id="btn-editar-datos">Editar datos</button>` : ""}
    </div>
  `;
}

function getAdjuntos(historia) {
  const out = [];
  (historia.consultas || []).forEach((c) => {
    (c.adjuntos || []).forEach((a) => out.push({ consultaId: c.id, nombre: a }));
  });
  return out;
}

function renderConsultasCards(consultas, editable) {
  return (consultas || [])
    .map(
      (c) => `
      <details class="card" style="margin-bottom:0.7rem;">
        <summary style="cursor:pointer; display:flex; justify-content:space-between; gap:0.5rem; align-items:center;">
          <span><strong>${c.fecha}</strong> · ${c.especialidad} · ${c.motivo}</span>
          ${editable ? `<button class="btn-outline" data-edit-consulta="${c.id}" type="button">✏️ Editar</button>` : ""}
        </summary>
        <div style="margin-top:0.6rem;">
          <p><strong>Diagnóstico:</strong> ${c.diagnostico || "-"}</p>
          <p><strong>Tratamiento:</strong> ${c.tratamiento || "-"}</p>
          <p><strong>Notas evolución:</strong> ${c.notasEvolucion || "-"}</p>
          <p><strong>Médico:</strong> ${c.medico}</p>
          ${c.adjuntos?.length ? `<p><strong>Adjuntos:</strong> ${c.adjuntos.join(", ")}</p>` : ""}
        </div>
      </details>
    `
    )
    .join("");
}

function wireTabs(container, prefix, historia, editable) {
  const tabContent = container.querySelector(`#${prefix}-tab-content`);
  const draw = (tab) => {
    if (tab === "personales") {
      tabContent.innerHTML = `
        <div class="grid grid-2">
          <div class="card"><strong>Nombre:</strong> ${historia.pacienteNombre}</div>
          <div class="card"><strong>Fecha de nacimiento:</strong> ${historia.fechaNacimiento}</div>
          <div class="card"><strong>Sexo:</strong> ${historia.sexo}</div>
          <div class="card"><strong>Tipo de sangre:</strong> ${historia.tipoSangre}</div>
          <div class="card"><strong>Alergias:</strong> ${(historia.alergias || []).join(", ")}</div>
        </div>
      `;
      return;
    }

    if (tab === "antecedentes") {
      tabContent.innerHTML = `
        <div class="card"><strong>Enfermedades base:</strong> ${(historia.enfermedadesBase || []).join(", ") || "N/A"}</div>
        <div class="card" style="margin-top:0.6rem;"><strong>Antecedentes quirúrgicos:</strong> ${(historia.antecedentesQuirurgicos || []).join(", ") || "N/A"}</div>
        <div class="card" style="margin-top:0.6rem;"><strong>Antecedentes familiares:</strong> ${historia.antecedentesFamiliares || "N/A"}</div>
      `;
      return;
    }

    if (tab === "medicamentos") {
      tabContent.innerHTML = `
        ${(historia.medicamentosActuales || [])
          .map((m) => `<div class="card" style="margin-bottom:0.5rem;"><strong>${m.nombre}</strong> · ${m.dosis} · desde ${m.desde}</div>`)
          .join("") || `<div class="card">Sin medicamentos registrados</div>`}
      `;
      return;
    }

    if (tab === "consultas") {
      tabContent.innerHTML = renderConsultasCards([...(historia.consultas || [])].sort((a, b) => (a.fecha < b.fecha ? 1 : -1)), editable) || `<div class="card">Sin consultas registradas</div>`;
      return;
    }

    const docs = getAdjuntos(historia);
    tabContent.innerHTML = docs.length
      ? docs.map((d) => `<div class="card" style="margin-bottom:0.5rem;"><i class="fa-solid fa-download"></i> ${d.nombre} <small>(consulta ${d.consultaId})</small></div>`).join("")
      : `<div class="card">No hay documentos adjuntos</div>`;
  };

  container.querySelectorAll(`[data-${prefix}-tab]`).forEach((btn) => {
    btn.addEventListener("click", () => draw(btn.dataset[`${prefix}Tab`]));
  });

  draw("personales");
}

function renderMiHistoria(container, user) {
  const historia = getHistoriaByPacienteId(user.id);
  if (!historia) {
    container.innerHTML = `<section class="card"><h2>Mi historia clínica</h2><p>No existe historia disponible para este usuario.</p></section>`;
    return;
  }

  container.innerHTML = `
    <section class="card">
      <h2 class="section-title">Mi historia clínica digital</h2>
      <div class="badge warning">Solo lectura — Contacta a tu médico para modificaciones</div>
      <p style="margin-top:0.7rem;"><strong>${historia.pacienteNombre}</strong> · ${historia.tipoSangre} · Alergias: ${(historia.alergias || []).join(", ")}</p>
      ${buildTabs("patient", false)}
      <div id="patient-tab-content"></div>
    </section>
  `;

  wireTabs(container, "patient", historia, false);
}

function renderHistoriaDetalle(container, { viewer, pacienteId, toast }) {
  const historia = getHistoriaByPacienteId(pacienteId);

  if (!historia) {
    container.innerHTML = `<section class="card"><h2>Historia clínica</h2><p>La historia no existe.</p></section>`;
    return;
  }

  const canView = rolesApi.canViewHistoria(viewer, pacienteId);
  if (!canView) {
    container.innerHTML = `<section class="card"><h2>Acceso denegado</h2><p>No tienes permisos para ver esta historia clínica.</p></section>`;
    return;
  }

  const canEdit = rolesApi.canEditHistoria(viewer, pacienteId);

  container.innerHTML = `
    <section class="card">
      <h2 class="section-title">Historia clínica · ${historia.pacienteNombre}</h2>
      <p><strong>Última actualización:</strong> ${historia.ultimaActualizacion} por ${historia.actualizadoPor}</p>
      ${buildTabs("doctor", canEdit)}
      <div id="doctor-tab-content"></div>
    </section>

    ${canEdit ? `
    <section class="card" style="margin-top:1rem; display:none;" id="edit-general-box">
      <h3>Editar datos generales</h3>
      <label>Alergias (separadas por coma)</label>
      <input id="edit-alergias" value="${(historia.alergias || []).join(", ")}" />
      <label style="margin-top:0.5rem;">Enfermedades base</label>
      <input id="edit-enfermedades" value="${(historia.enfermedadesBase || []).join(", ")}" />
      <label style="margin-top:0.5rem;">Antecedentes quirúrgicos</label>
      <input id="edit-quirurgicos" value="${(historia.antecedentesQuirurgicos || []).join(", ")}" />
      <label style="margin-top:0.5rem;">Antecedentes familiares</label>
      <textarea id="edit-familiares" rows="2">${historia.antecedentesFamiliares || ""}</textarea>
      <label style="margin-top:0.5rem;">Medicamentos (uno por línea: nombre|dosis|desde)</label>
      <textarea id="edit-meds" rows="4">${(historia.medicamentosActuales || []).map((m) => `${m.nombre}|${m.dosis}|${m.desde}`).join("\n")}</textarea>
      <div class="inline-actions" style="margin-top:0.6rem;">
        <button class="btn-primary" id="save-general">Guardar cambios</button>
      </div>
    </section>

    <section class="card" style="margin-top:1rem;" id="consulta-form-box">
      <h3 id="consulta-form-title">Nueva consulta</h3>
      <div class="grid grid-2">
        <input type="date" id="c-fecha" />
        <input id="c-motivo" placeholder="Motivo de consulta" />
      </div>
      <textarea id="c-diagnostico" rows="2" placeholder="Diagnóstico"></textarea>
      <textarea id="c-tratamiento" rows="2" placeholder="Tratamiento indicado"></textarea>
      <textarea id="c-notas" rows="2" placeholder="Notas de evolución"></textarea>
      <label>Adjuntos (nombres simulados)</label>
      <input id="c-adjuntos" type="file" multiple />
      <div class="inline-actions" style="margin-top:0.6rem;">
        <button class="btn-primary" id="save-consulta">Guardar consulta</button>
        <button class="btn-outline" id="cancel-edit-consulta" style="display:none;">Cancelar edición</button>
      </div>
    </section>
    ` : ""}

    <section class="card" style="margin-top:1rem;">
      <h3>Historial de cambios</h3>
      <div id="bitacora-list">
        ${(historia.bitacora || []).map((b) => `<p>Actualizado por ${b.by} — ${formatDateTime(b.at)} · ${b.what}</p>`).join("") || "<p>Sin cambios registrados.</p>"}
      </div>
    </section>
  `;

  wireTabs(container, "doctor", historia, canEdit);

  if (!canEdit) return;

  let editingConsultaId = null;

  const persist = (what) => {
    const list = getHistorias();
    const idx = list.findIndex((h) => h.pacienteId === Number(pacienteId));
    if (idx < 0) return;
    pushBitacora(historia, viewer.nombre, what);
    list[idx] = historia;
    saveHistorias(list);
    toast("Historia actualizada");
    renderHistoriaDetalle(container, { viewer, pacienteId, toast });
  };

  const editGeneralBox = container.querySelector("#edit-general-box");
  container.querySelector("#btn-editar-datos")?.addEventListener("click", () => {
    editGeneralBox.style.display = editGeneralBox.style.display === "none" ? "block" : "none";
  });

  container.querySelector("#save-general")?.addEventListener("click", () => {
    historia.alergias = container.querySelector("#edit-alergias").value.split(",").map((x) => x.trim()).filter(Boolean);
    historia.enfermedadesBase = container.querySelector("#edit-enfermedades").value.split(",").map((x) => x.trim()).filter(Boolean);
    historia.antecedentesQuirurgicos = container.querySelector("#edit-quirurgicos").value.split(",").map((x) => x.trim()).filter(Boolean);
    historia.antecedentesFamiliares = container.querySelector("#edit-familiares").value.trim();
    historia.medicamentosActuales = container
      .querySelector("#edit-meds")
      .value.split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [nombre, dosis, desde] = line.split("|");
        return { nombre: nombre?.trim() || "", dosis: dosis?.trim() || "", desde: desde?.trim() || "" };
      });

    persist("Edición de datos generales");
  });

  container.querySelectorAll("[data-edit-consulta]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const consulta = (historia.consultas || []).find((c) => c.id === btn.dataset.editConsulta);
      if (!consulta) return;

      editingConsultaId = consulta.id;
      container.querySelector("#consulta-form-title").textContent = `Editar consulta ${consulta.id}`;
      container.querySelector("#c-fecha").value = consulta.fecha;
      container.querySelector("#c-motivo").value = consulta.motivo;
      container.querySelector("#c-diagnostico").value = consulta.diagnostico;
      container.querySelector("#c-tratamiento").value = consulta.tratamiento;
      container.querySelector("#c-notas").value = consulta.notasEvolucion;
      container.querySelector("#cancel-edit-consulta").style.display = "inline-flex";
      container.querySelector("#consulta-form-box").scrollIntoView({ behavior: "smooth" });
    });
  });

  container.querySelector("#cancel-edit-consulta")?.addEventListener("click", () => {
    editingConsultaId = null;
    container.querySelector("#consulta-form-title").textContent = "Nueva consulta";
    container.querySelector("#cancel-edit-consulta").style.display = "none";
    ["#c-fecha", "#c-motivo", "#c-diagnostico", "#c-tratamiento", "#c-notas"].forEach((id) => {
      container.querySelector(id).value = "";
    });
  });

  container.querySelector("#save-consulta")?.addEventListener("click", () => {
    const fecha = container.querySelector("#c-fecha").value;
    const motivo = container.querySelector("#c-motivo").value.trim();
    const diagnostico = container.querySelector("#c-diagnostico").value.trim();
    const tratamiento = container.querySelector("#c-tratamiento").value.trim();
    const notas = container.querySelector("#c-notas").value.trim();

    if (!fecha || !motivo || !diagnostico) {
      toast("Completa fecha, motivo y diagnóstico");
      return;
    }

    const fileInput = container.querySelector("#c-adjuntos");
    const adjuntos = Array.from(fileInput.files || []).map((f) => f.name);

    if (editingConsultaId) {
      const c = historia.consultas.find((x) => x.id === editingConsultaId);
      if (!c) return;
      c.fecha = fecha;
      c.motivo = motivo;
      c.diagnostico = diagnostico;
      c.tratamiento = tratamiento;
      c.notasEvolucion = notas;
      c.adjuntos = adjuntos.length ? adjuntos : c.adjuntos;
      persist(`Edición de consulta ${c.id}`);
      return;
    }

    const newId = `c${String(Date.now()).slice(-5)}`;
    historia.consultas.unshift({
      id: newId,
      fecha,
      medico: viewer.nombre,
      especialidad: viewer.especialidad || "Medicina general",
      motivo,
      diagnostico,
      tratamiento,
      notasEvolucion: notas,
      adjuntos
    });

    persist(`Nueva consulta ${newId}`);
  });
}

const api = {
  getHistorias,
  saveHistorias,
  getHistoriaByPacienteId,
  renderMiHistoria,
  renderHistoriaDetalle,
  getLatestDiagnosis
};

window.MCHistoria = api;

export default api;
