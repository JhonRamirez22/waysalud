// admin.js
// Dashboard y gestión de usuarios/especialidades para rol admin.

const rolesApi = window.MCRoles;
const historiaApi = window.MCHistoria;
const agendaApi = window.MCAgenda;

function currentLang() {
  return localStorage.getItem("mediconnect_lang") || "es";
}

const ADMIN_I18N = {
  es: {
    adminPanel: "Panel de administración",
    patients: "Pacientes",
    doctors: "Médicos",
    admins: "Admins",
    monthConsults: "Consultas del mes",
    activeSpecialties: "Especialidades activas",
    consultsBySpecialty: "Consultas por especialidad",
    consults: "Consultas",
    userManagement: "Gestión de usuarios",
    newUser: "Nuevo usuario",
    createUser: "Crear nuevo usuario",
    name: "Nombre",
    email: "Email",
    tempPassword: "Contraseña temporal",
    patient: "Paciente",
    doctor: "Médico",
    save: "Guardar",
    currentRole: "Rol actual",
    status: "Estado",
    actions: "Acciones",
    inactive: "Inactivo",
    active: "Activo",
    enable: "Activar",
    disable: "Desactivar",
    viewClinicalRecord: "Ver historia clínica",
    viewAgenda: "Ver agenda",
    fillRequired: "Completa nombre, email y contraseña",
    userCreated: "Usuario creado",
    confirmRoleChange: "¿Estás seguro de cambiar el rol de {{name}} a {{role}}?",
    roleUpdated: "Rol actualizado",
    accountUpdated: "Estado de cuenta actualizado",
    noPatientRecord: "Este usuario no tiene historia clínica de paciente",
    noDoctorAgenda: "Este usuario no tiene agenda médica",
    specialtyManagement: "Gestión de especialidades",
    icon: "Icono",
    activeF: "Activa",
    inactiveF: "Inactiva",
    addSpecialty: "Agregar especialidad",
    specialtyName: "Nombre de especialidad",
    specialtyIcon: "Icono Lucide (ej. stethoscope)",
    add: "Agregar",
    specialtyUpdated: "Especialidad actualizada",
    specialtyNameRequired: "Ingresa un nombre de especialidad",
    specialtyAdded: "Especialidad agregada"
  },
  en: {
    adminPanel: "Administration panel",
    patients: "Patients",
    doctors: "Doctors",
    admins: "Admins",
    monthConsults: "Consultations this month",
    activeSpecialties: "Active specialties",
    consultsBySpecialty: "Consultations by specialty",
    consults: "Consultations",
    userManagement: "User management",
    newUser: "New user",
    createUser: "Create new user",
    name: "Name",
    email: "Email",
    tempPassword: "Temporary password",
    patient: "Patient",
    doctor: "Doctor",
    save: "Save",
    currentRole: "Current role",
    status: "Status",
    actions: "Actions",
    inactive: "Inactive",
    active: "Active",
    enable: "Enable",
    disable: "Disable",
    viewClinicalRecord: "View clinical record",
    viewAgenda: "View agenda",
    fillRequired: "Complete name, email and password",
    userCreated: "User created",
    confirmRoleChange: "Are you sure you want to change {{name}}'s role to {{role}}?",
    roleUpdated: "Role updated",
    accountUpdated: "Account status updated",
    noPatientRecord: "This user has no patient clinical record",
    noDoctorAgenda: "This user has no medical agenda",
    specialtyManagement: "Specialty management",
    icon: "Icon",
    activeF: "Active",
    inactiveF: "Inactive",
    addSpecialty: "Add specialty",
    specialtyName: "Specialty name",
    specialtyIcon: "Lucide icon (e.g. stethoscope)",
    add: "Add",
    specialtyUpdated: "Specialty updated",
    specialtyNameRequired: "Enter a specialty name",
    specialtyAdded: "Specialty added"
  },
  pt: {
    adminPanel: "Painel de administração",
    patients: "Pacientes",
    doctors: "Médicos",
    admins: "Admins",
    monthConsults: "Consultas do mês",
    activeSpecialties: "Especialidades ativas",
    consultsBySpecialty: "Consultas por especialidade",
    consults: "Consultas",
    userManagement: "Gestão de usuários",
    newUser: "Novo usuário",
    createUser: "Criar novo usuário",
    name: "Nome",
    email: "E-mail",
    tempPassword: "Senha temporária",
    patient: "Paciente",
    doctor: "Médico",
    save: "Salvar",
    currentRole: "Função atual",
    status: "Status",
    actions: "Ações",
    inactive: "Inativo",
    active: "Ativo",
    enable: "Ativar",
    disable: "Desativar",
    viewClinicalRecord: "Ver prontuário",
    viewAgenda: "Ver agenda",
    fillRequired: "Preencha nome, e-mail e senha",
    userCreated: "Usuário criado",
    confirmRoleChange: "Tem certeza que deseja alterar a função de {{name}} para {{role}}?",
    roleUpdated: "Função atualizada",
    accountUpdated: "Status da conta atualizado",
    noPatientRecord: "Este usuário não possui prontuário de paciente",
    noDoctorAgenda: "Este usuário não possui agenda médica",
    specialtyManagement: "Gestão de especialidades",
    icon: "Ícone",
    activeF: "Ativa",
    inactiveF: "Inativa",
    addSpecialty: "Adicionar especialidade",
    specialtyName: "Nome da especialidade",
    specialtyIcon: "Ícone Lucide (ex. stethoscope)",
    add: "Adicionar",
    specialtyUpdated: "Especialidade atualizada",
    specialtyNameRequired: "Informe o nome da especialidade",
    specialtyAdded: "Especialidade adicionada"
  }
};

ADMIN_I18N.de = { ...ADMIN_I18N.en };
ADMIN_I18N.it = { ...ADMIN_I18N.en };
ADMIN_I18N.pl = { ...ADMIN_I18N.en };
ADMIN_I18N.tr = {
  adminPanel: "Yönetim paneli",
  patients: "Hastalar",
  doctors: "Doktorlar",
  admins: "Yöneticiler",
  monthConsults: "Bu ayki konsültasyonlar",
  activeSpecialties: "Aktif uzmanlıklar",
  consultsBySpecialty: "Uzmanlığa göre konsültasyonlar",
  consults: "Konsültasyonlar",
  userManagement: "Kullanıcı yönetimi",
  newUser: "Yeni kullanıcı",
  createUser: "Yeni kullanıcı oluştur",
  name: "Ad",
  email: "E-posta",
  tempPassword: "Geçici şifre",
  patient: "Hasta",
  doctor: "Doktor",
  save: "Kaydet",
  currentRole: "Mevcut rol",
  status: "Durum",
  actions: "İşlemler",
  inactive: "Pasif",
  active: "Aktif",
  enable: "Etkinleştir",
  disable: "Devre dışı bırak",
  viewClinicalRecord: "Klinik geçmişi görüntüle",
  viewAgenda: "Ajandayı görüntüle",
  fillRequired: "Ad, e-posta ve şifre alanlarını doldurun",
  userCreated: "Kullanıcı oluşturuldu",
  confirmRoleChange: "{{name}} kullanıcısının rolünü {{role}} olarak değiştirmek istediğinize emin misiniz?",
  roleUpdated: "Rol güncellendi",
  accountUpdated: "Hesap durumu güncellendi",
  noPatientRecord: "Bu kullanıcının hasta klinik geçmişi yok",
  noDoctorAgenda: "Bu kullanıcının doktor ajandası yok",
  specialtyManagement: "Uzmanlık yönetimi",
  icon: "İkon",
  activeF: "Aktif",
  inactiveF: "Pasif",
  addSpecialty: "Uzmanlık ekle",
  specialtyName: "Uzmanlık adı",
  specialtyIcon: "Lucide ikonu (örn. stethoscope)",
  add: "Ekle",
  specialtyUpdated: "Uzmanlık güncellendi",
  specialtyNameRequired: "Uzmanlık adı girin",
  specialtyAdded: "Uzmanlık eklendi"
};

function ta(key, vars = {}) {
  const lang = currentLang();
  const base = ADMIN_I18N[lang]?.[key] || ADMIN_I18N.es[key] || key;
  return Object.entries(vars).reduce((acc, [k, v]) => acc.replace(`{{${k}}}`, String(v)), base);
}

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
      <h2 class="section-title">${ta("adminPanel")}</h2>
      <div class="grid grid-3">
        <article class="stat-card"><span class="stat-label">${ta("patients")}</span><strong class="stat-value">${roles.pacientes}</strong><span class="stat-delta">+6% mensual</span></article>
        <article class="stat-card"><span class="stat-label">${ta("doctors")}</span><strong class="stat-value">${roles.medicos}</strong><span class="stat-delta">Capacidad activa</span></article>
        <article class="stat-card"><span class="stat-label">${ta("admins")}</span><strong class="stat-value">${roles.admins}</strong><span class="stat-delta">Control operativo</span></article>
        <article class="stat-card"><span class="stat-label">${ta("monthConsults")}</span><strong class="stat-value">${citas.length}</strong><span class="stat-delta">Flujo estable</span></article>
        <article class="stat-card"><span class="stat-label">${ta("activeSpecialties")}</span><strong class="stat-value">${especialidades}</strong><span class="stat-delta">Cobertura clínica</span></article>
      </div>
    </section>

    <section class="card" style="margin-top:1rem;">
      <h3>${ta("consultsBySpecialty")}</h3>
      <canvas id="admin-especialidades-chart"></canvas>
    </section>
  `;

  new Chart(container.querySelector("#admin-especialidades-chart"), {
    type: "bar",
    data: {
      labels: Object.keys(porEsp),
      datasets: [{ label: ta("consults"), data: Object.values(porEsp), backgroundColor: "#1a73e8" }]
    }
  });
}

function renderAdminUsuarios(container, { toast, navigate }) {
  const users = rolesApi.getUsuarios();

  container.innerHTML = `
    <section class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:0.7rem; flex-wrap:wrap;">
        <h2 class="section-title">${ta("userManagement")}</h2>
        <button class="btn-primary" id="btn-nuevo-usuario">${ta("newUser")}</button>
      </div>

      <div id="new-user-box" class="card" style="display:none; margin:0.7rem 0;">
        <h3>${ta("createUser")}</h3>
        <div class="grid grid-2">
          <input id="nu-nombre" placeholder="${ta("name")}" />
          <input id="nu-email" placeholder="${ta("email")}" />
          <input id="nu-pass" placeholder="${ta("tempPassword")}" />
          <select id="nu-rol">
            <option value="paciente">${ta("patient")}</option>
            <option value="medico">${ta("doctor")}</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button class="btn-primary" id="save-new-user" style="margin-top:0.6rem;">${ta("save")}</button>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>${ta("name")}</th><th>${ta("email")}</th><th>${ta("currentRole")}</th><th>${ta("status")}</th><th>${ta("actions")}</th></tr>
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
                    <option value="paciente" ${u.rol === "paciente" ? "selected" : ""}>${ta("patient")}</option>
                    <option value="medico" ${u.rol === "medico" ? "selected" : ""}>${ta("doctor")}</option>
                    <option value="admin" ${u.rol === "admin" ? "selected" : ""}>Admin</option>
                  </select>
                </td>
                <td><span class="badge ${u.activo === false ? "warning" : "success"}">${u.activo === false ? ta("inactive") : ta("active")}</span></td>
                <td>
                  <div class="inline-actions">
                    <button class="btn-outline" data-toggle-user="${u.id}">${u.activo === false ? ta("enable") : ta("disable")}</button>
                    <button class="btn-outline" data-view-history="${u.id}">${ta("viewClinicalRecord")}</button>
                    <button class="btn-outline" data-view-agenda="${u.id}">${ta("viewAgenda")}</button>
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
      toast(ta("fillRequired"));
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
    toast(ta("userCreated"));
    renderAdminUsuarios(container, { toast, navigate });
  });

  container.querySelectorAll("[data-role-user]").forEach((sel) => {
    sel.addEventListener("change", () => {
      const uid = Number(sel.dataset.roleUser);
      const user = users.find((u) => u.id === uid);
      const rol = sel.value;

      const ok = confirm(ta("confirmRoleChange", { name: user.nombre, role: rol }));
      if (!ok) {
        sel.value = user.rol;
        return;
      }

      rolesApi.updateUserRole(uid, rol);
      toast(ta("roleUpdated"));
      renderAdminUsuarios(container, { toast, navigate });
    });
  });

  container.querySelectorAll("[data-toggle-user]").forEach((btn) => {
    btn.addEventListener("click", () => {
      rolesApi.toggleUserActive(Number(btn.dataset.toggleUser));
      toast(ta("accountUpdated"));
      renderAdminUsuarios(container, { toast, navigate });
    });
  });

  container.querySelectorAll("[data-view-history]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const u = rolesApi.getUsuarios().find((x) => x.id === Number(btn.dataset.viewHistory));
      if (!u) return;
      if (u.rol !== "paciente") {
        toast(ta("noPatientRecord"));
        return;
      }
      navigate(`#/historia/${u.id}`);
    });
  });

  container.querySelectorAll("[data-view-agenda]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const u = rolesApi.getUsuarios().find((x) => x.id === Number(btn.dataset.viewAgenda));
      if (!u || u.rol !== "medico") {
        toast(ta("noDoctorAgenda"));
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
      <h2 class="section-title">${ta("specialtyManagement")}</h2>

      <div class="grid" style="margin-bottom:1rem;">
        ${list
          .map(
            (e) => `
          <div class="card" style="display:flex; justify-content:space-between; align-items:center; gap:0.6rem;">
            <div>
              <strong>${e.nombre}</strong>
              <div><small>${ta("icon")}: ${e.icono}</small></div>
            </div>
            <label>
              <input type="checkbox" data-toggle-especialidad="${e.id}" ${e.activa ? "checked" : ""}/>
              ${e.activa ? ta("activeF") : ta("inactiveF")}
            </label>
          </div>
        `
          )
          .join("")}
      </div>

      <div class="card">
        <h3>${ta("addSpecialty")}</h3>
        <div class="grid grid-2">
          <input id="esp-name" placeholder="${ta("specialtyName")}" />
          <input id="esp-icon" placeholder="${ta("specialtyIcon")}" />
        </div>
        <button class="btn-primary" id="save-especialidad" style="margin-top:0.6rem;">${ta("add")}</button>
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
      toast(ta("specialtyUpdated"));
      renderAdminEspecialidades(container, { toast });
    });
  });

  container.querySelector("#save-especialidad").addEventListener("click", () => {
    const nombre = container.querySelector("#esp-name").value.trim();
    const icono = container.querySelector("#esp-icon").value.trim() || "stethoscope";
    if (!nombre) {
      toast(ta("specialtyNameRequired"));
      return;
    }

    const current = getEspecialidades();
    current.push({ id: `esp_${Date.now()}`, nombre, icono, activa: true });
    saveEspecialidades(current);
    toast(ta("specialtyAdded"));
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
