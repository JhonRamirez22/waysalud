// admin.js
// Dashboard y gestión de usuarios/especialidades para rol admin.

const rolesApi = window.MCRoles;
const historiaApi = window.MCHistoria;
const agendaApi = window.MCAgenda;

function getEspecialidades() {
  return rolesApi.loadJSON(rolesApi.STORAGE_KEYS.especialidades, []);
}

function saveEspecialidades(list) {
  rolesApi.saveJSON(rolesApi.STORAGE_KEYS.especialidades, list);
}

function countByRole(users) {
  return {
    pacientes: users.filter((u) => u.rol === "paciente").length,
    medicos: users.filter((u) => u.rol === "medico").length,
    admins: users.filter((u) => u.rol === "admin").length
  };
}

function consultasPorEspecialidad() {
  const historias = historiaApi.getHistorias();
  const out = {};
  historias.forEach((h) => {
    (h.consultas || []).forEach((c) => {
      out[c.especialidad] = (out[c.especialidad] || 0) + 1;
    });
  });
  return out;
}

function renderAdminDashboard(container) {
  const users = rolesApi.getUsuarios();
  const roles = countByRole(users);
  const citas = agendaApi.getCitas();
  const especialidades = getEspecialidades().filter((e) => e.activa).length;
  const porEsp = consultasPorEspecialidad();

  container.innerHTML = `
    <section class="card">
      <h2 class="section-title">Panel de administración</h2>
      <div class="grid grid-3">
        <article class="stat-box"><strong>${roles.pacientes}</strong><div>Pacientes</div></article>
        <article class="stat-box"><strong>${roles.medicos}</strong><div>Médicos</div></article>
        <article class="stat-box"><strong>${roles.admins}</strong><div>Admins</div></article>
        <article class="stat-box"><strong>${citas.length}</strong><div>Consultas del mes</div></article>
        <article class="stat-box"><strong>${especialidades}</strong><div>Especialidades activas</div></article>
      </div>
    </section>

    <section class="card" style="margin-top:1rem;">
      <h3>Consultas por especialidad</h3>
      <canvas id="admin-especialidades-chart"></canvas>
    </section>
  `;

  new Chart(container.querySelector("#admin-especialidades-chart"), {
    type: "bar",
    data: {
      labels: Object.keys(porEsp),
      datasets: [{ label: "Consultas", data: Object.values(porEsp), backgroundColor: "#1a73e8" }]
    }
  });
}

function renderAdminUsuarios(container, { toast, navigate }) {
  const users = rolesApi.getUsuarios();

  container.innerHTML = `
    <section class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:0.7rem; flex-wrap:wrap;">
        <h2 class="section-title">Gestión de usuarios</h2>
        <button class="btn-primary" id="btn-nuevo-usuario">Nuevo usuario</button>
      </div>

      <div id="new-user-box" class="card" style="display:none; margin:0.7rem 0;">
        <h3>Crear nuevo usuario</h3>
        <div class="grid grid-2">
          <input id="nu-nombre" placeholder="Nombre" />
          <input id="nu-email" placeholder="Email" />
          <input id="nu-pass" placeholder="Contraseña temporal" />
          <select id="nu-rol">
            <option value="paciente">Paciente</option>
            <option value="medico">Médico</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button class="btn-primary" id="save-new-user" style="margin-top:0.6rem;">Guardar</button>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Nombre</th><th>Email</th><th>Rol actual</th><th>Estado</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            ${users
              .map(
                (u) => `
              <tr>
                <td>${u.nombre}</td>
                <td>${u.email}</td>
                <td>
                  <select data-role-user="${u.id}">
                    <option value="paciente" ${u.rol === "paciente" ? "selected" : ""}>Paciente</option>
                    <option value="medico" ${u.rol === "medico" ? "selected" : ""}>Médico</option>
                    <option value="admin" ${u.rol === "admin" ? "selected" : ""}>Admin</option>
                  </select>
                </td>
                <td><span class="badge ${u.activo === false ? "warning" : "success"}">${u.activo === false ? "Inactivo" : "Activo"}</span></td>
                <td>
                  <div class="inline-actions">
                    <button class="btn-outline" data-toggle-user="${u.id}">${u.activo === false ? "Activar" : "Desactivar"}</button>
                    <button class="btn-outline" data-view-history="${u.id}">Ver historia clínica</button>
                    <button class="btn-outline" data-view-agenda="${u.id}">Ver agenda</button>
                  </div>
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;

  container.querySelector("#btn-nuevo-usuario").addEventListener("click", () => {
    const box = container.querySelector("#new-user-box");
    box.style.display = box.style.display === "none" ? "block" : "none";
  });

  container.querySelector("#save-new-user").addEventListener("click", () => {
    const nombre = container.querySelector("#nu-nombre").value.trim();
    const email = container.querySelector("#nu-email").value.trim();
    const password = container.querySelector("#nu-pass").value.trim();
    const rol = container.querySelector("#nu-rol").value;

    if (!nombre || !email || !password) {
      toast("Completa nombre, email y contraseña");
      return;
    }

    const list = rolesApi.getUsuarios();
    const id = Math.max(...list.map((u) => u.id), 0) + 1;
    const newUser = { id, nombre, email, password, rol, activo: true };
    if (rol === "paciente") {
      const historias = historiaApi.getHistorias();
      const newHistoriaId = Math.max(...historias.map((h) => h.id), 100) + 1;
      newUser.historiaId = newHistoriaId;
      historias.push({
        id: newHistoriaId,
        pacienteId: id,
        pacienteNombre: nombre,
        fechaNacimiento: "",
        sexo: "",
        tipoSangre: "",
        alergias: [],
        enfermedadesBase: [],
        antecedentesQuirurgicos: [],
        antecedentesFamiliares: "",
        medicamentosActuales: [],
        consultas: [],
        bitacora: [],
        ultimaActualizacion: new Date().toISOString().slice(0, 10),
        actualizadoPor: "Admin Sistema"
      });
      historiaApi.saveHistorias(historias);
    }

    list.push(newUser);
    rolesApi.saveUsuarios(list);
    toast("Usuario creado");
    renderAdminUsuarios(container, { toast, navigate });
  });

  container.querySelectorAll("[data-role-user]").forEach((sel) => {
    sel.addEventListener("change", () => {
      const uid = Number(sel.dataset.roleUser);
      const user = users.find((u) => u.id === uid);
      const rol = sel.value;

      const ok = confirm(`¿Estás seguro de cambiar el rol de ${user.nombre} a ${rol}?`);
      if (!ok) {
        sel.value = user.rol;
        return;
      }

      rolesApi.updateUserRole(uid, rol);
      toast("Rol actualizado");
      renderAdminUsuarios(container, { toast, navigate });
    });
  });

  container.querySelectorAll("[data-toggle-user]").forEach((btn) => {
    btn.addEventListener("click", () => {
      rolesApi.toggleUserActive(Number(btn.dataset.toggleUser));
      toast("Estado de cuenta actualizado");
      renderAdminUsuarios(container, { toast, navigate });
    });
  });

  container.querySelectorAll("[data-view-history]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const u = rolesApi.getUsuarios().find((x) => x.id === Number(btn.dataset.viewHistory));
      if (!u) return;
      if (u.rol !== "paciente") {
        toast("Este usuario no tiene historia clínica de paciente");
        return;
      }
      navigate(`#/historia/${u.id}`);
    });
  });

  container.querySelectorAll("[data-view-agenda]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const u = rolesApi.getUsuarios().find((x) => x.id === Number(btn.dataset.viewAgenda));
      if (!u || u.rol !== "medico") {
        toast("Este usuario no tiene agenda médica");
        return;
      }
      localStorage.setItem("mc_admin_agenda_medico", String(u.id));
      navigate("#/mi-agenda");
    });
  });
}

function renderAdminEspecialidades(container, { toast }) {
  const list = getEspecialidades();

  container.innerHTML = `
    <section class="card">
      <h2 class="section-title">Gestión de especialidades</h2>

      <div class="grid" style="margin-bottom:1rem;">
        ${list
          .map(
            (e) => `
          <div class="card" style="display:flex; justify-content:space-between; align-items:center; gap:0.6rem;">
            <div>
              <strong>${e.nombre}</strong>
              <div><small>Icono: ${e.icono}</small></div>
            </div>
            <label>
              <input type="checkbox" data-toggle-especialidad="${e.id}" ${e.activa ? "checked" : ""}/>
              ${e.activa ? "Activa" : "Inactiva"}
            </label>
          </div>
        `
          )
          .join("")}
      </div>

      <div class="card">
        <h3>Agregar especialidad</h3>
        <div class="grid grid-2">
          <input id="esp-name" placeholder="Nombre de especialidad" />
          <input id="esp-icon" placeholder="Icono Lucide (ej. stethoscope)" />
        </div>
        <button class="btn-primary" id="save-especialidad" style="margin-top:0.6rem;">Agregar</button>
      </div>
    </section>
  `;

  container.querySelectorAll("[data-toggle-especialidad]").forEach((input) => {
    input.addEventListener("change", () => {
      const current = getEspecialidades();
      const idx = current.findIndex((e) => e.id === input.dataset.toggleEspecialidad);
      if (idx < 0) return;
      current[idx].activa = input.checked;
      saveEspecialidades(current);
      toast("Especialidad actualizada");
      renderAdminEspecialidades(container, { toast });
    });
  });

  container.querySelector("#save-especialidad").addEventListener("click", () => {
    const nombre = container.querySelector("#esp-name").value.trim();
    const icono = container.querySelector("#esp-icon").value.trim() || "stethoscope";
    if (!nombre) {
      toast("Ingresa un nombre de especialidad");
      return;
    }

    const current = getEspecialidades();
    current.push({ id: `esp_${Date.now()}`, nombre, icono, activa: true });
    saveEspecialidades(current);
    toast("Especialidad agregada");
    renderAdminEspecialidades(container, { toast });
  });
}

const api = {
  renderAdminDashboard,
  renderAdminUsuarios,
  renderAdminEspecialidades
};

window.MCAdmin = api;

export default api;
