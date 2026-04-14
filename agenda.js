// agenda.js
// Gestión de agenda flexible del médico usando FullCalendar.

const rolesApi = window.MCRoles;

function agendaKey(medicoId) {
  return `mc_agenda_${medicoId}`;
}

function getAgenda(medicoId) {
  return rolesApi.loadJSON(agendaKey(medicoId), {
    doctorId: medicoId,
    duracion: 30,
    diasLaborales: [1, 2, 3, 4, 5],
    horaInicio: "08:00",
    horaFin: "17:00",
    descanso: 5,
    slots: []
  });
}

function saveAgenda(medicoId, data) {
  rolesApi.saveJSON(agendaKey(medicoId), data);
}

function getCitas() {
  return rolesApi.loadJSON(rolesApi.STORAGE_KEYS.citas, []);
}

function saveCitas(list) {
  rolesApi.saveJSON(rolesApi.STORAGE_KEYS.citas, list);
}

function eventColor(tipo) {
  if (tipo === "disponible") return "#16a34a";
  if (tipo === "bloqueado") return "#dc2626";
  if (tipo === "vacaciones") return "#f59e0b";
  if (tipo === "cita") return "#1a73e8";
  return "#6b7280";
}

function buildAgendaEvents(medicoId) {
  const agenda = getAgenda(medicoId);
  const citas = getCitas().filter((c) => c.medicoId === Number(medicoId) && c.estado !== "cancelada");

  const slotEvents = (agenda.slots || []).map((s) => ({
    id: s.id,
    title: s.tipo === "disponible" ? "Disponible" : s.tipo === "bloqueado" ? "Bloqueado" : "Vacaciones",
    start: s.start,
    end: s.end,
    backgroundColor: eventColor(s.tipo),
    borderColor: eventColor(s.tipo),
    extendedProps: { tipo: s.tipo }
  }));

  const citaEvents = citas.map((c) => ({
    id: c.id,
    title: `Cita · ${c.pacienteNombre}`,
    start: c.fechaInicio,
    end: c.fechaFin,
    backgroundColor: eventColor("cita"),
    borderColor: eventColor("cita"),
    extendedProps: { tipo: "cita", citaId: c.id, pacienteId: c.pacienteId }
  }));

  return [...slotEvents, ...citaEvents];
}

function createSlotFromSelection(selectionInfo, tipo) {
  const slot = {
    id: `slot_${Date.now()}`,
    tipo,
    start: selectionInfo.start.toISOString(),
    end: selectionInfo.end.toISOString()
  };

  if (tipo === "vacaciones") {
    const day = new Date(selectionInfo.start);
    day.setHours(0, 0, 0, 0);
    const end = new Date(day);
    end.setDate(day.getDate() + 1);
    slot.start = day.toISOString();
    slot.end = end.toISOString();
  }

  return slot;
}

function regenerateAvailableSlots(medicoId, cfg) {
  const agenda = getAgenda(medicoId);
  const keep = (agenda.slots || []).filter((s) => s.tipo !== "disponible");

  const [iniH, iniM] = cfg.horaInicio.split(":").map(Number);
  const [finH, finM] = cfg.horaFin.split(":").map(Number);

  const newSlots = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 0; d < 21; d += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    if (!cfg.diasLaborales.includes(date.getDay())) continue;

    let cur = new Date(date);
    cur.setHours(iniH, iniM, 0, 0);

    const limit = new Date(date);
    limit.setHours(finH, finM, 0, 0);

    while (cur < limit) {
      const next = new Date(cur.getTime() + cfg.duracion * 60000);
      if (next > limit) break;

      newSlots.push({
        id: `slot_auto_${date.toISOString().slice(0, 10)}_${cur.getHours()}${cur.getMinutes()}`,
        tipo: "disponible",
        start: cur.toISOString(),
        end: next.toISOString()
      });

      cur = new Date(next.getTime() + cfg.descanso * 60000);
    }
  }

  agenda.duracion = cfg.duracion;
  agenda.diasLaborales = cfg.diasLaborales;
  agenda.horaInicio = cfg.horaInicio;
  agenda.horaFin = cfg.horaFin;
  agenda.descanso = cfg.descanso;
  agenda.slots = [...keep, ...newSlots];
  saveAgenda(medicoId, agenda);
}

function renderMiAgenda(container, { medicoId, toast, onHistoria }) {
  const agenda = getAgenda(medicoId);

  container.innerHTML = `
    <section class="grid" style="grid-template-columns: 1fr 320px; gap: 1rem; align-items:start;">
      <article class="card">
        <h2 class="section-title">Mi agenda flexible</h2>
        <p>Haz clic sobre una franja vacía para crear un slot: Disponible, Bloqueado o Vacaciones.</p>
        <div id="mi-agenda-calendar" style="min-height:520px;"></div>
      </article>

      <aside class="card">
        <h3>Configuración de agenda</h3>
        <label>Duración por consulta</label>
        <select id="cfg-duracion">
          ${[20, 30, 45, 60].map((v) => `<option value="${v}" ${agenda.duracion === v ? "selected" : ""}>${v} min</option>`).join("")}
        </select>

        <label style="margin-top:0.6rem; display:block;">Días laborales</label>
        <div id="cfg-dias" class="grid" style="grid-template-columns: repeat(2,1fr); gap:0.3rem;">
          ${[[1, "Lun"], [2, "Mar"], [3, "Mié"], [4, "Jue"], [5, "Vie"], [6, "Sáb"], [0, "Dom"]]
            .map(([v, l]) => `<label><input type="checkbox" value="${v}" ${agenda.diasLaborales.includes(v) ? "checked" : ""}/> ${l}</label>`)
            .join("")}
        </div>

        <label style="margin-top:0.6rem;">Horario inicio</label>
        <input id="cfg-inicio" type="time" value="${agenda.horaInicio}" />
        <label style="margin-top:0.6rem;">Horario fin</label>
        <input id="cfg-fin" type="time" value="${agenda.horaFin}" />

        <label style="margin-top:0.6rem;">Descanso entre consultas</label>
        <select id="cfg-descanso">
          ${[0, 5, 10, 15].map((v) => `<option value="${v}" ${agenda.descanso === v ? "selected" : ""}>${v} min</option>`).join("")}
        </select>

        <button class="btn-primary" id="guardar-config" style="margin-top:0.8rem;">Guardar configuración</button>
      </aside>
    </section>
  `;

  const calendar = new FullCalendar.Calendar(container.querySelector("#mi-agenda-calendar"), {
    initialView: "timeGridWeek",
    locale: "es",
    allDaySlot: false,
    selectable: true,
    slotMinTime: "06:00:00",
    slotMaxTime: "21:00:00",
    events: buildAgendaEvents(medicoId),
    select: (info) => {
      const tipo = prompt("Tipo de slot: disponible | bloqueado | vacaciones", "disponible");
      if (!tipo || !["disponible", "bloqueado", "vacaciones"].includes(tipo)) return;

      const currentAgenda = getAgenda(medicoId);
      currentAgenda.slots.push(createSlotFromSelection(info, tipo));
      saveAgenda(medicoId, currentAgenda);
      toast("Slot guardado en agenda");
      calendar.refetchEvents();
    },
    eventClick: (click) => {
      const type = click.event.extendedProps.tipo;
      if (type !== "cita") {
        const shouldDelete = confirm("¿Eliminar este slot de agenda?");
        if (!shouldDelete) return;

        const currentAgenda = getAgenda(medicoId);
        currentAgenda.slots = (currentAgenda.slots || []).filter((s) => s.id !== click.event.id);
        saveAgenda(medicoId, currentAgenda);
        calendar.refetchEvents();
        return;
      }

      const citas = getCitas();
      const cita = citas.find((c) => c.id === click.event.extendedProps.citaId);
      if (!cita) return;

      const action = prompt(
        `Cita de ${cita.pacienteNombre}\n1 Confirmar\n2 Reprogramar\n3 Cancelar\n4 Ver historia`,
        "1"
      );

      if (action === "1") {
        cita.estado = "confirmada";
        saveCitas(citas);
        toast("Cita confirmada");
      }

      if (action === "2") {
        const newDate = prompt("Nueva fecha/hora inicio (YYYY-MM-DDTHH:mm)", cita.fechaInicio.slice(0, 16));
        if (newDate) {
          const start = new Date(newDate);
          const end = new Date(start.getTime() + 30 * 60000);
          cita.fechaInicio = start.toISOString();
          cita.fechaFin = end.toISOString();
          cita.estado = "reprogramada";
          saveCitas(citas);
          toast("Cita reprogramada");
        }
      }

      if (action === "3") {
        cita.estado = "cancelada";
        saveCitas(citas);
        toast("Cita cancelada");
      }

      if (action === "4") {
        onHistoria(cita.pacienteId);
      }

      calendar.refetchEvents();
    },
    eventSources: [
      {
        events(fetchInfo, success) {
          success(buildAgendaEvents(medicoId));
        }
      }
    ]
  });

  calendar.render();

  container.querySelector("#guardar-config").addEventListener("click", () => {
    const cfg = {
      duracion: Number(container.querySelector("#cfg-duracion").value),
      diasLaborales: Array.from(container.querySelectorAll("#cfg-dias input:checked")).map((x) => Number(x.value)),
      horaInicio: container.querySelector("#cfg-inicio").value,
      horaFin: container.querySelector("#cfg-fin").value,
      descanso: Number(container.querySelector("#cfg-descanso").value)
    };

    regenerateAvailableSlots(medicoId, cfg);
    toast("Configuración guardada y slots regenerados");
    calendar.refetchEvents();
  });
}

function renderAgendaReadOnly(containerEl, medicoId, onSelectDisponible) {
  const events = buildAgendaEvents(medicoId);

  const calendar = new FullCalendar.Calendar(containerEl, {
    initialView: "timeGridWeek",
    locale: "es",
    allDaySlot: false,
    events,
    eventClick: (info) => {
      if (info.event.extendedProps.tipo === "disponible") {
        onSelectDisponible(info.event.startStr, info.event.endStr);
      }
    }
  });

  calendar.render();
  return calendar;
}

const api = {
  getAgenda,
  saveAgenda,
  getCitas,
  saveCitas,
  renderMiAgenda,
  renderAgendaReadOnly,
  buildAgendaEvents
};

window.MCAgenda = api;

export default api;
