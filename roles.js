// roles.js
// Gestión de sesión, permisos y datos semilla en localStorage.

const STORAGE_KEYS = {
  usuarios: "mc_usuarios",
  historias: "mc_historias",
  citas: "mc_citas",
  sesion: "mc_sesion",
  especialidades: "mc_especialidades"
};

const USUARIOS_BASE = [
  { id: 1, nombre: "Dr. Carlos Ruiz", email: "carlos@waysalud.com", password: "medico123", rol: "medico", especialidad: "Cardiología", pacientesIds: [3, 4, 6] },
  { id: 2, nombre: "Dra. Ana Gómez", email: "ana@waysalud.com", password: "medico123", rol: "medico", especialidad: "Dermatología", pacientesIds: [7, 8] },
  { id: 3, nombre: "Laura Martínez", email: "laura@waysalud.com", password: "paciente123", rol: "paciente", historiaId: 101 },
  { id: 4, nombre: "Pedro Salcedo", email: "pedro@waysalud.com", password: "paciente123", rol: "paciente", historiaId: 102 },
  { id: 5, nombre: "Admin Sistema", email: "admin@waysalud.com", password: "admin123", rol: "admin" },
  { id: 6, nombre: "Diana Torres", email: "diana@waysalud.com", password: "paciente123", rol: "paciente", historiaId: 103 },
  { id: 7, nombre: "Miguel Peña", email: "miguel@waysalud.com", password: "paciente123", rol: "paciente", historiaId: 104 },
  { id: 8, nombre: "Sofía Rincón", email: "sofia@waysalud.com", password: "paciente123", rol: "paciente", historiaId: 105 }
].map((u) => ({ ...u, activo: true }));

const HISTORIAS_BASE = [
  {
    id: 101,
    pacienteId: 3,
    pacienteNombre: "Laura Martínez",
    fechaNacimiento: "1990-05-14",
    sexo: "Femenino",
    tipoSangre: "O+",
    alergias: ["Penicilina", "Ibuprofeno"],
    enfermedadesBase: ["Hipertensión arterial"],
    antecedentesQuirurgicos: ["Apendicectomía 2015"],
    antecedentesFamiliares: "Padre con diabetes tipo 2",
    medicamentosActuales: [{ nombre: "Losartán 50mg", dosis: "1 tableta diaria", desde: "2022-03-01" }],
    consultas: [
      {
        id: "c001",
        fecha: "2024-11-20",
        medico: "Dr. Carlos Ruiz",
        especialidad: "Cardiología",
        motivo: "Control tensión arterial",
        diagnostico: "HTA controlada",
        tratamiento: "Continuar Losartán. Dieta baja en sodio.",
        notasEvolucion: "Paciente refiere cefaleas ocasionales.",
        adjuntos: []
      }
    ],
    bitacora: [{ at: "2024-11-20T10:32:00", by: "Dr. Carlos Ruiz", what: "Creación de consulta c001" }],
    ultimaActualizacion: "2024-11-20",
    actualizadoPor: "Dr. Carlos Ruiz"
  },
  {
    id: 102,
    pacienteId: 4,
    pacienteNombre: "Pedro Salcedo",
    fechaNacimiento: "1985-08-11",
    sexo: "Masculino",
    tipoSangre: "A+",
    alergias: ["Ninguna"],
    enfermedadesBase: ["Asma"],
    antecedentesQuirurgicos: ["Ninguno"],
    antecedentesFamiliares: "Madre con hipertensión",
    medicamentosActuales: [{ nombre: "Salbutamol", dosis: "A necesidad", desde: "2021-01-10" }],
    consultas: [],
    bitacora: [{ at: "2025-01-12T09:20:00", by: "Dr. Carlos Ruiz", what: "Actualización de antecedentes" }],
    ultimaActualizacion: "2025-01-12",
    actualizadoPor: "Dr. Carlos Ruiz"
  },
  {
    id: 103,
    pacienteId: 6,
    pacienteNombre: "Diana Torres",
    fechaNacimiento: "1997-02-28",
    sexo: "Femenino",
    tipoSangre: "B+",
    alergias: ["Ninguna"],
    enfermedadesBase: ["Migraña"],
    antecedentesQuirurgicos: ["Ninguno"],
    antecedentesFamiliares: "Sin antecedentes relevantes",
    medicamentosActuales: [],
    consultas: [],
    bitacora: [],
    ultimaActualizacion: "2025-02-01",
    actualizadoPor: "Dr. Carlos Ruiz"
  },
  {
    id: 104,
    pacienteId: 7,
    pacienteNombre: "Miguel Peña",
    fechaNacimiento: "1992-10-06",
    sexo: "Masculino",
    tipoSangre: "O-",
    alergias: ["Polen"],
    enfermedadesBase: ["Dermatitis atópica"],
    antecedentesQuirurgicos: ["Ninguno"],
    antecedentesFamiliares: "Hermana con asma",
    medicamentosActuales: [],
    consultas: [],
    bitacora: [],
    ultimaActualizacion: "2025-03-03",
    actualizadoPor: "Dra. Ana Gómez"
  },
  {
    id: 105,
    pacienteId: 8,
    pacienteNombre: "Sofía Rincón",
    fechaNacimiento: "2000-12-18",
    sexo: "Femenino",
    tipoSangre: "AB+",
    alergias: ["Ninguna"],
    enfermedadesBase: [],
    antecedentesQuirurgicos: ["Ninguno"],
    antecedentesFamiliares: "Padre con dislipidemia",
    medicamentosActuales: [],
    consultas: [],
    bitacora: [],
    ultimaActualizacion: "2025-03-10",
    actualizadoPor: "Dra. Ana Gómez"
  }
];

const CITAS_BASE = [
  {
    id: "a1",
    pacienteId: 3,
    pacienteNombre: "Laura Martínez",
    medicoId: 1,
    medicoNombre: "Dr. Carlos Ruiz",
    fechaInicio: "2026-04-15T10:00:00",
    fechaFin: "2026-04-15T10:30:00",
    tipo: "video",
    motivo: "Control de presión arterial",
    estado: "confirmada"
  },
  {
    id: "a2",
    pacienteId: 7,
    pacienteNombre: "Miguel Peña",
    medicoId: 2,
    medicoNombre: "Dra. Ana Gómez",
    fechaInicio: "2026-04-16T15:00:00",
    fechaFin: "2026-04-16T15:30:00",
    tipo: "chat",
    motivo: "Seguimiento dermatológico",
    estado: "pendiente"
  }
];

const ESPECIALIDADES_BASE = [
  { id: "esp1", nombre: "Medicina general", icono: "stethoscope", activa: true },
  { id: "esp2", nombre: "Cardiología", icono: "heart-pulse", activa: true },
  { id: "esp3", nombre: "Dermatología", icono: "sparkles", activa: true },
  { id: "esp4", nombre: "Pediatría", icono: "baby", activa: true },
  { id: "esp5", nombre: "Psicología", icono: "brain", activa: true }
];

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function initData() {
  if (!localStorage.getItem(STORAGE_KEYS.usuarios)) saveJSON(STORAGE_KEYS.usuarios, USUARIOS_BASE);
  if (!localStorage.getItem(STORAGE_KEYS.historias)) saveJSON(STORAGE_KEYS.historias, HISTORIAS_BASE);
  if (!localStorage.getItem(STORAGE_KEYS.citas)) saveJSON(STORAGE_KEYS.citas, CITAS_BASE);
  if (!localStorage.getItem(STORAGE_KEYS.especialidades)) saveJSON(STORAGE_KEYS.especialidades, ESPECIALIDADES_BASE);

  // Configuración de agenda por médico.
  const users = getUsuarios();
  users.filter((u) => u.rol === "medico").forEach((medico) => {
    const agendaKey = `mc_agenda_${medico.id}`;
    if (!localStorage.getItem(agendaKey)) {
      saveJSON(agendaKey, {
        doctorId: medico.id,
        duracion: 30,
        diasLaborales: [1, 2, 3, 4, 5],
        horaInicio: "08:00",
        horaFin: "17:00",
        descanso: 5,
        slots: []
      });
    }
  });
}

function getUsuarios() {
  return loadJSON(STORAGE_KEYS.usuarios, []);
}

function saveUsuarios(list) {
  saveJSON(STORAGE_KEYS.usuarios, list);
}

function findUserByEmail(email) {
  return getUsuarios().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

function login(email, password) {
  const user = findUserByEmail(email);
  if (!user || user.password !== password || user.activo === false) {
    return { ok: false, error: "Credenciales inválidas o cuenta inactiva" };
  }

  saveJSON(STORAGE_KEYS.sesion, user);
  sessionStorage.setItem("usuario", JSON.stringify(user));
  return { ok: true, user };
}

function setSession(user) {
  saveJSON(STORAGE_KEYS.sesion, user);
  sessionStorage.setItem("usuario", JSON.stringify(user));
}

function getSession() {
  return loadJSON(STORAGE_KEYS.sesion, null);
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.sesion);
  sessionStorage.removeItem("usuario");
}

function getHomeRouteByRole(role) {
  if (role === "admin") return "#/admin";
  if (role === "medico") return "#/panel-medico";
  return "#/panel";
}

function roleBadgeClass(role) {
  if (role === "paciente") return "success";
  if (role === "medico") return "";
  return "warning";
}

function isAssignedDoctor(doctorUser, pacienteId) {
  return Array.isArray(doctorUser?.pacientesIds) && doctorUser.pacientesIds.includes(Number(pacienteId));
}

function canViewHistoria(user, pacienteId) {
  if (!user) return false;
  if (user.rol === "admin") return true;
  if (user.rol === "paciente") return user.id === Number(pacienteId);
  if (user.rol === "medico") return isAssignedDoctor(user, Number(pacienteId));
  return false;
}

function canEditHistoria(user, pacienteId) {
  if (!user) return false;
  if (user.rol === "admin") return true;
  return user.rol === "medico" && isAssignedDoctor(user, Number(pacienteId));
}

function canAccessRoute(path, user) {
  const protectedAny = ["/", "/buscar", "/perfil", "/agendar", "/consulta", "/chat", "/urgencias", "/planes", "/panel", "/panel-medico", "/mi-historia", "/mis-pacientes", "/mi-agenda", "/admin", "/admin/usuarios", "/admin/especialidades"];

  if (!user && protectedAny.includes(path)) {
    return { allowed: false, reason: "Debes iniciar sesión para continuar.", noSession: true };
  }

  if (path === "/panel" && !(user?.rol === "paciente" || user?.rol === "admin")) {
    return { allowed: false, reason: "Este panel es exclusivo para pacientes y administradores." };
  }

  if (path === "/panel-medico" && !(user?.rol === "medico" || user?.rol === "admin")) {
    return { allowed: false, reason: "Este panel es exclusivo para médicos y administradores." };
  }

  if ((path === "/admin" || path.startsWith("/admin/")) && user?.rol !== "admin") {
    return { allowed: false, reason: "Solo el administrador puede acceder a esta sección." };
  }

  if (path === "/mi-historia" && !(user?.rol === "paciente" || user?.rol === "admin")) {
    return { allowed: false, reason: "Solo pacientes y administradores pueden ver esta sección." };
  }

  if ((path === "/mis-pacientes" || path === "/mi-agenda") && !(user?.rol === "medico" || user?.rol === "admin")) {
    return { allowed: false, reason: "Solo médicos y administradores pueden acceder a esta sección." };
  }

  return { allowed: true };
}

function updateUserRole(userId, newRole) {
  const users = getUsuarios();
  const idx = users.findIndex((u) => u.id === Number(userId));
  if (idx === -1) return null;

  users[idx].rol = newRole;
  if (newRole !== "medico") delete users[idx].pacientesIds;
  saveUsuarios(users);

  const session = getSession();
  if (session?.id === Number(userId)) {
    setSession({ ...session, rol: newRole });
  }

  return users[idx];
}

function toggleUserActive(userId) {
  const users = getUsuarios();
  const idx = users.findIndex((u) => u.id === Number(userId));
  if (idx === -1) return null;

  users[idx].activo = users[idx].activo === false ? true : false;
  saveUsuarios(users);

  const session = getSession();
  if (session?.id === Number(userId)) {
    setSession({ ...session, activo: users[idx].activo });
  }

  return users[idx];
}

const api = {
  STORAGE_KEYS,
  USUARIOS_BASE,
  initData,
  getUsuarios,
  saveUsuarios,
  findUserByEmail,
  login,
  getSession,
  setSession,
  logout,
  getHomeRouteByRole,
  roleBadgeClass,
  canAccessRoute,
  canViewHistoria,
  canEditHistoria,
  isAssignedDoctor,
  updateUserRole,
  toggleUserActive,
  loadJSON,
  saveJSON
};

window.MCRoles = api;

export default api;
