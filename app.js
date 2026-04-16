// ==============================
// MediConnect SPA (Vanilla JS)
// ==============================

(() => {
  const rolesApi = window.MCRoles;
  const historiaApi = window.MCHistoria;
  const agendaApi = window.MCAgenda;
  const adminApi = window.MCAdmin;

  const state = {
    lang: localStorage.getItem("mediconnect_lang") || "es",
    selectedSpecialistId: null,
    selectedSlot: null,
    selectedType: "video",
    appointment: null,
    waitingTimer: null,
    jitsiApi: null,
    chartInstances: [],
    mapInstance: null,
    activeCalendar: null
  };

  const UI_TEXT = {
    es: {
      login: "Ingresar",
      searchDoctors: "Buscar médicos",
      myAppointments: "Mis citas",
      myHistory: "Mi historia",
      urgent: "Urgencias",
      myProfile: "Mi perfil",
      logout: "Cerrar sesión",
      myAgenda: "Mi agenda",
      myPatients: "Mis pacientes",
      newConsultation: "Nueva consulta",
      dashboard: "Dashboard",
      users: "Usuarios",
      specialties: "Especialidades",
      allRecords: "Todas las historias",
      loginTitle: "Ingreso a MediConnect",
      loginSubtitle: "Acceso por rol con sesión simulada en localStorage",
      email: "Email",
      password: "Contraseña",
      enterAsPatient: "Entrar como Paciente",
      enterAsDoctor: "Entrar como Médico",
      enterAsAdmin: "Entrar como Admin",
      accessDenied: "Acceso denegado",
      backToPanel: "Volver a mi panel",
      homeTitle: "Teleconsulta segura en minutos",
      homeSubtitle: "Conecta con especialistas por video, chat o consulta presencial.",
      findSpecialist: "Encontrar especialista",
      urgentNow: "Consulta urgente ahora",
      searchTitle: "Búsqueda de especialistas",
      searchByName: "Buscar por nombre",
      allSpecialties: "Todas las especialidades",
      videoConsultation: "Videoconsulta",
      onsite: "Presencial",
      search: "Buscar",
      viewProfile: "Ver perfil",
      bookNow: "Agendar ahora",
      book: "Agendar",
      availability: "Disponibilidad",
      available: "Disponible",
      booking3steps: "Agendamiento en 3 pasos",
      step1: "Paso 1",
      step2: "Paso 2",
      step3: "Paso 3",
      name: "Nombre",
      reason: "Motivo",
      confirmAppointment: "Confirmar cita",
      selectDateTime: "Selecciona fecha y hora",
      generalConsultation: "Consulta general",
      appointmentConfirmed: "Cita confirmada",
      consultationRoom: "Sala de videoconsulta",
      enter: "Entrar",
      patient: "Paciente",
      medicalChat: "Chat médico",
      chatGreeting: "Hola, ¿cómo te sientes hoy?",
      writeMessage: "Escribe tu mensaje...",
      attach: "Adjuntar",
      send: "Enviar",
      memberships: "Membresías",
      freePatient: "Gratuito paciente",
      basicDoctor: "Básico médico",
      premiumDoctor: "Premium médico",
      featured: "Destacado",
      clinicHospital: "Clínica / Hospital",
      customPricing: "Precio personalizado",
      requestDemo: "Solicitar demo",
      patientPanel: "Panel del paciente",
      upcomingAppointments: "Próximas citas",
      viewMyHistory: "Ver mi historia",
      scheduleNewAppointment: "Agendar nueva cita",
      myUpcomingAppointments: "Mis próximas citas",
      cancel: "Cancelar",
      reschedule: "Reprogramar",
      noAppointments: "Sin citas",
      newDatePrompt: "Nueva fecha/hora (YYYY-MM-DDTHH:mm)",
      monthlyConsults: "Consultas por mes",
      doctorPanel: "Panel del médico",
      activeAppointments: "Citas activas",
      manageAgenda: "Gestionar agenda",
      viewAssignedPatients: "Ver pacientes asignados",
      consults: "Consultas",
      patientsTitle: "Mis pacientes",
      searchPatientByName: "Buscar paciente por nombre",
      record: "Historia",
      lastDiagnosis: "Último diagnóstico",
      lastUpdate: "Última actualización",
      viewHistory: "Ver historia",
      noData: "N/A"
    },
    en: {
      login: "Login",
      searchDoctors: "Find doctors",
      myAppointments: "My appointments",
      myHistory: "My record",
      urgent: "Urgent care",
      myProfile: "My profile",
      logout: "Log out",
      myAgenda: "My agenda",
      myPatients: "My patients",
      newConsultation: "New consultation",
      dashboard: "Dashboard",
      users: "Users",
      specialties: "Specialties",
      allRecords: "All records",
      loginTitle: "MediConnect login",
      loginSubtitle: "Role-based access with simulated localStorage session",
      email: "Email",
      password: "Password",
      enterAsPatient: "Enter as Patient",
      enterAsDoctor: "Enter as Doctor",
      enterAsAdmin: "Enter as Admin",
      accessDenied: "Access denied",
      backToPanel: "Back to my panel",
      homeTitle: "Secure teleconsultation in minutes",
      homeSubtitle: "Connect with specialists by video, chat, or in-person consultation.",
      findSpecialist: "Find specialist",
      urgentNow: "Urgent consultation now",
      searchTitle: "Specialist search",
      searchByName: "Search by name",
      allSpecialties: "All specialties",
      videoConsultation: "Video consultation",
      onsite: "In-person",
      search: "Search",
      viewProfile: "View profile",
      bookNow: "Book now",
      book: "Book",
      availability: "Availability",
      available: "Available",
      booking3steps: "Booking in 3 steps",
      step1: "Step 1",
      step2: "Step 2",
      step3: "Step 3",
      name: "Name",
      reason: "Reason",
      confirmAppointment: "Confirm appointment",
      selectDateTime: "Select date and time",
      generalConsultation: "General consultation",
      appointmentConfirmed: "Appointment confirmed",
      consultationRoom: "Video consultation room",
      enter: "Enter",
      patient: "Patient",
      medicalChat: "Medical chat",
      chatGreeting: "Hello, how are you feeling today?",
      writeMessage: "Write your message...",
      attach: "Attach",
      send: "Send",
      memberships: "Memberships",
      freePatient: "Free patient",
      basicDoctor: "Basic doctor",
      premiumDoctor: "Premium doctor",
      featured: "Featured",
      clinicHospital: "Clinic / Hospital",
      customPricing: "Custom pricing",
      requestDemo: "Request demo",
      patientPanel: "Patient panel",
      upcomingAppointments: "Upcoming appointments",
      viewMyHistory: "View my record",
      scheduleNewAppointment: "Schedule new appointment",
      myUpcomingAppointments: "My upcoming appointments",
      cancel: "Cancel",
      reschedule: "Reschedule",
      noAppointments: "No appointments",
      newDatePrompt: "New date/time (YYYY-MM-DDTHH:mm)",
      monthlyConsults: "Consultations per month",
      doctorPanel: "Doctor panel",
      activeAppointments: "Active appointments",
      manageAgenda: "Manage agenda",
      viewAssignedPatients: "View assigned patients",
      consults: "Consultations",
      patientsTitle: "My patients",
      searchPatientByName: "Search patient by name",
      record: "Record",
      lastDiagnosis: "Last diagnosis",
      lastUpdate: "Last update",
      viewHistory: "View record",
      noData: "N/A"
    },
    pt: {
      login: "Entrar",
      searchDoctors: "Buscar médicos",
      myAppointments: "Minhas consultas",
      myHistory: "Meu histórico",
      urgent: "Urgências",
      myProfile: "Meu perfil",
      logout: "Sair",
      myAgenda: "Minha agenda",
      myPatients: "Meus pacientes",
      newConsultation: "Nova consulta",
      dashboard: "Painel",
      users: "Usuários",
      specialties: "Especialidades",
      allRecords: "Todos os prontuários",
      loginTitle: "Acesso ao MediConnect",
      loginSubtitle: "Acesso por função com sessão simulada em localStorage",
      email: "E-mail",
      password: "Senha",
      enterAsPatient: "Entrar como Paciente",
      enterAsDoctor: "Entrar como Médico",
      enterAsAdmin: "Entrar como Admin",
      accessDenied: "Acesso negado",
      backToPanel: "Voltar ao meu painel",
      homeTitle: "Teleconsulta segura em minutos",
      homeSubtitle: "Conecte-se com especialistas por vídeo, chat ou consulta presencial.",
      findSpecialist: "Encontrar especialista",
      urgentNow: "Consulta urgente agora",
      searchTitle: "Busca de especialistas",
      searchByName: "Buscar por nome",
      allSpecialties: "Todas as especialidades",
      videoConsultation: "Videoconsulta",
      onsite: "Presencial",
      search: "Buscar",
      viewProfile: "Ver perfil",
      bookNow: "Agendar agora",
      book: "Agendar",
      availability: "Disponibilidade",
      available: "Disponível",
      booking3steps: "Agendamento em 3 passos",
      step1: "Passo 1",
      step2: "Passo 2",
      step3: "Passo 3",
      name: "Nome",
      reason: "Motivo",
      confirmAppointment: "Confirmar consulta",
      selectDateTime: "Selecione data e hora",
      generalConsultation: "Consulta geral",
      appointmentConfirmed: "Consulta confirmada",
      consultationRoom: "Sala de videoconsulta",
      enter: "Entrar",
      patient: "Paciente",
      medicalChat: "Chat médico",
      chatGreeting: "Olá, como você está se sentindo hoje?",
      writeMessage: "Escreva sua mensagem...",
      attach: "Anexar",
      send: "Enviar",
      memberships: "Assinaturas",
      freePatient: "Paciente gratuito",
      basicDoctor: "Médico básico",
      premiumDoctor: "Médico premium",
      featured: "Destaque",
      clinicHospital: "Clínica / Hospital",
      customPricing: "Preço personalizado",
      requestDemo: "Solicitar demo",
      patientPanel: "Painel do paciente",
      upcomingAppointments: "Próximas consultas",
      viewMyHistory: "Ver meu histórico",
      scheduleNewAppointment: "Agendar nova consulta",
      myUpcomingAppointments: "Minhas próximas consultas",
      cancel: "Cancelar",
      reschedule: "Reagendar",
      noAppointments: "Sem consultas",
      newDatePrompt: "Nova data/hora (YYYY-MM-DDTHH:mm)",
      monthlyConsults: "Consultas por mês",
      doctorPanel: "Painel do médico",
      activeAppointments: "Consultas ativas",
      manageAgenda: "Gerenciar agenda",
      viewAssignedPatients: "Ver pacientes atribuídos",
      consults: "Consultas",
      patientsTitle: "Meus pacientes",
      searchPatientByName: "Buscar paciente por nome",
      record: "Histórico",
      lastDiagnosis: "Último diagnóstico",
      lastUpdate: "Última atualização",
      viewHistory: "Ver histórico",
      noData: "N/A"
    }
  };

  function tr(key) {
    return UI_TEXT[state.lang]?.[key] || UI_TEXT.es[key] || key;
  }

  const EXTRA_SPECIALISTS = [
    { id: 10, fullName: "Dra. Laura Méndez", specialty: "Medicina general", price: 85000, rating: 4.8, bio: "Seguimiento integral de salud familiar." },
    { id: 11, fullName: "Dr. Felipe Ruiz", specialty: "Neurología", price: 170000, rating: 4.5, bio: "Atención de cefaleas y trastornos neurológicos." },
    { id: 12, fullName: "Dra. Natalia Quintero", specialty: "Psicología", price: 110000, rating: 5, bio: "Terapia breve y manejo de ansiedad." },
    { id: 13, fullName: "Dra. Juliana Torres", specialty: "Ginecología", price: 130000, rating: 4.8, bio: "Salud sexual y reproductiva." },
    { id: 14, fullName: "Dra. Manuela Giraldo", specialty: "Nutrición", price: 90000, rating: 4.7, bio: "Nutrición clínica y metabolismo." },
    { id: 15, fullName: "Dr. Andrés Salazar", specialty: "Pediatría", price: 98000, rating: 4.6, bio: "Control de crecimiento y desarrollo infantil." }
  ];

  const CONTEXT_IMAGES = {
    home: "./assets/images/hero-telemedicina.jpg",
    search: "./assets/images/busqueda-especialistas.jpg",
    profile: "./assets/images/perfil-medico.jpg",
    urgent: "./assets/images/urgencias-telemedicina.jpg",
    patientPanel: "./assets/images/panel-paciente.jpg",
    doctorPanel: "./assets/images/panel-medico.jpg"
  };

  window.addEventListener("DOMContentLoaded", init);

  async function init() {
    rolesApi.initData();

    if (window.i18nSetup) {
      await window.i18nSetup(state.lang);
    }

    if (!location.hash) location.hash = "#/login";

    renderShell();
    window.addEventListener("hashchange", onRouteChange);
    onRouteChange();
  }

  function getSession() {
    return rolesApi.getSession();
  }

  function getPath() {
    return (location.hash.replace(/^#/, "") || "/login").split("?")[0];
  }

  function parseHistoriaPath(path) {
    const m = path.match(/^\/historia\/(\d+)$/);
    if (!m) return null;
    return Number(m[1]);
  }

  function getSpecialists() {
    const users = rolesApi.getUsuarios();
    const medicos = users
      .filter((u) => u.rol === "medico")
      .map((m, idx) => ({
        id: m.id,
        linkedUserId: m.id,
        fullName: m.nombre,
        specialty: m.especialidad || "Medicina general",
        price: 120000 + idx * 10000,
        rating: 4.7,
        bio: `Especialista en ${m.especialidad || "medicina"} con atención remota.`
      }));

    return [...medicos, ...EXTRA_SPECIALISTS];
  }

  function getAvatar(name) {
    return `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(name)}`;
  }

  function formatCOP(value) {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);
  }

  function navLink(path, label, currentPath) {
    return `<a class="nav-link ${path === currentPath ? "active" : ""}" href="#${path}">${label}</a>`;
  }

  function renderShell() {
    const root = document.getElementById("root");
    const user = getSession();
    const path = getPath();

    root.innerHTML = `
      <div class="app-shell">
        <header class="navbar">
          <div class="container navbar-inner">
            <a class="logo" href="#/${user ? "" : "login"}">
              <i data-lucide="cross"></i>
              <span>MediConnect</span>
            </a>

            <nav class="nav-links">${buildRoleNav(path, user)}</nav>

            <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap; justify-content:flex-end;">
              <div class="lang-select">
                <img class="flag" src="${flagByLang(state.lang)}" alt="lang" />
                <select id="language-selector">
                  <option value="es" ${state.lang === "es" ? "selected" : ""}>Español</option>
                  <option value="en" ${state.lang === "en" ? "selected" : ""}>Inglés</option>
                  <option value="de" ${state.lang === "de" ? "selected" : ""}>Alemán</option>
                  <option value="it" ${state.lang === "it" ? "selected" : ""}>Italiano</option>
                  <option value="pl" ${state.lang === "pl" ? "selected" : ""}>Polaco</option>
                  <option value="pt" ${state.lang === "pt" ? "selected" : ""}>Portugués</option>
                  <option value="tr" ${state.lang === "tr" ? "selected" : ""}>Turco</option>
                </select>
              </div>

              ${user ? `
              <div class="badge ${rolesApi.roleBadgeClass(user.rol)}" style="padding:0.35rem 0.55rem;">
                <img class="avatar" src="${getAvatar(user.nombre)}" alt="${user.nombre}" style="width:24px; height:24px;" />
                <span>${user.nombre}</span>
                <strong>${user.rol.toUpperCase()}</strong>
              </div>` : ""}
            </div>
          </div>
        </header>

        <main><div class="container" id="view"></div></main>

        <footer class="footer">
          <div class="container">
            <strong>MediConnect</strong>
            <div class="badges">
              <span class="badge">SSL</span>
              <span class="badge">RGPD</span>
              <span class="badge">ISO 27001</span>
            </div>
            <div class="countries">
              <img class="flag" src="https://flagcdn.com/24x18/co.png" alt="CO" />
              <img class="flag" src="https://flagcdn.com/24x18/us.png" alt="US" />
              <img class="flag" src="https://flagcdn.com/24x18/br.png" alt="BR" />
            </div>
          </div>
        </footer>
      </div>
      <div id="toast" class="toast"></div>
    `;

    document.getElementById("language-selector")?.addEventListener("change", async (e) => {
      state.lang = e.target.value;
      localStorage.setItem("mediconnect_lang", state.lang);
      if (window.i18next) {
        await window.i18next.changeLanguage(state.lang);
      }
      renderShell();
      onRouteChange();
    });

    document.querySelector("[data-logout]")?.addEventListener("click", () => {
      rolesApi.logout();
      location.hash = "#/login";
      renderShell();
      onRouteChange();
    });

    initIcons();
  }

  function buildRoleNav(currentPath, user) {
  if (!user) return navLink("/login", tr("login"), currentPath);

    if (user.rol === "paciente") {
      return [
        navLink("/buscar", tr("searchDoctors"), currentPath),
        navLink("/panel", tr("myAppointments"), currentPath),
        navLink("/mi-historia", tr("myHistory"), currentPath),
        navLink("/urgencias", tr("urgent"), currentPath),
        navLink("/panel", tr("myProfile"), currentPath),
        `<a href="#" class="nav-link" data-logout="1">${tr("logout")}</a>`
      ].join("");
    }

    if (user.rol === "medico") {
      return [
        navLink("/mi-agenda", tr("myAgenda"), currentPath),
        navLink("/mis-pacientes", tr("myPatients"), currentPath),
        navLink("/panel-medico", tr("newConsultation"), currentPath),
        navLink("/panel-medico", tr("myProfile"), currentPath),
        `<a href="#" class="nav-link" data-logout="1">${tr("logout")}</a>`
      ].join("");
    }

    return [
      navLink("/admin", tr("dashboard"), currentPath),
      navLink("/admin/usuarios", tr("users"), currentPath),
      navLink("/admin/especialidades", tr("specialties"), currentPath),
      navLink("/admin", tr("allRecords"), currentPath),
      `<a href="#" class="nav-link" data-logout="1">${tr("logout")}</a>`
    ].join("");
  }

  function flagByLang(lang) {
    const byLang = {
      es: "co",
      en: "us",
      de: "de",
      it: "it",
      pl: "pl",
      pt: "br",
      tr: "tr"
    };
    return `https://flagcdn.com/24x18/${byLang[lang] || "co"}.png`;
  }

  function onRouteChange() {
    cleanupDynamicInstances();

    const user = getSession();
    const path = getPath();

    if (!user && path !== "/login") {
      location.hash = "#/login";
      renderShell();
      renderLogin();
      return;
    }

    if (path === "/login") {
      renderShell();
      renderLogin();
      return;
    }

    const routeGuard = rolesApi.canAccessRoute(path, user);
    if (!routeGuard.allowed) {
      if (routeGuard.noSession) {
        location.hash = "#/login";
        renderShell();
        renderLogin();
        return;
      }
      renderShell();
      renderAccessDenied(routeGuard.reason, user);
      return;
    }

    renderShell();

    const historiaPacienteId = parseHistoriaPath(path);
    if (historiaPacienteId !== null) {
      renderHistoriaDetalle(historiaPacienteId, user);
      return;
    }

    const routes = {
      "/": renderHome,
      "/buscar": renderBuscar,
      "/perfil": renderPerfil,
      "/agendar": renderAgendar,
      "/consulta": renderConsulta,
      "/chat": renderChat,
      "/urgencias": renderUrgencias,
      "/planes": renderPlanes,
      "/panel": () => renderPanelPaciente(user),
      "/panel-medico": () => renderPanelMedico(user),
      "/mi-historia": () => historiaApi.renderMiHistoria(document.getElementById("view"), user),
      "/mis-pacientes": () => renderMisPacientes(user),
      "/mi-agenda": () => renderMiAgenda(user),
      "/admin": () => adminApi.renderAdminDashboard(document.getElementById("view")),
      "/admin/usuarios": () => adminApi.renderAdminUsuarios(document.getElementById("view"), { toast: showToast, navigate: (h) => (location.hash = h) }),
      "/admin/especialidades": () => adminApi.renderAdminEspecialidades(document.getElementById("view"), { toast: showToast })
    };

    (routes[path] || renderHome)();
    initIcons();
  }

  function renderLogin() {
    const view = document.getElementById("view");
    const session = getSession();
    if (session) {
      location.hash = rolesApi.getHomeRouteByRole(session.rol);
      return;
    }

    view.innerHTML = `
      <section class="card" style="max-width:560px; margin:0 auto;">
        <h2 class="section-title">${tr("loginTitle")}</h2>
        <p class="section-subtitle">${tr("loginSubtitle")}</p>
        <form id="login-form" class="grid" style="gap:0.6rem;">
          <input id="login-email" type="email" placeholder="${tr("email")}" required />
          <input id="login-pass" type="password" placeholder="${tr("password")}" required />
          <button class="btn-primary" type="submit">${tr("login")}</button>
        </form>
        <div class="inline-actions" style="margin-top:0.8rem;">
          <button class="btn-outline" data-demo-login="paciente">${tr("enterAsPatient")}</button>
          <button class="btn-outline" data-demo-login="medico">${tr("enterAsDoctor")}</button>
          <button class="btn-outline" data-demo-login="admin">${tr("enterAsAdmin")}</button>
        </div>
      </section>
    `;

    view.querySelector("#login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const result = rolesApi.login(view.querySelector("#login-email").value.trim(), view.querySelector("#login-pass").value.trim());
      if (!result.ok) return showToast(result.error);
      location.hash = rolesApi.getHomeRouteByRole(result.user.rol);
    });

    view.querySelectorAll("[data-demo-login]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const examples = {
          paciente: ["laura@mediconnect.co", "paciente123"],
          medico: ["carlos@mediconnect.co", "medico123"],
          admin: ["admin@mediconnect.co", "admin123"]
        };
        const [email, pass] = examples[btn.dataset.demoLogin];
        view.querySelector("#login-email").value = email;
        view.querySelector("#login-pass").value = pass;
      });
    });
  }

  function renderAccessDenied(reason, user) {
    document.getElementById("view").innerHTML = `
      <section class="card" style="max-width:760px; margin:0 auto; text-align:center;">
        <h2 class="section-title">${tr("accessDenied")}</h2>
        <p>${reason || "No cuentas con permisos para esta ruta."}</p>
        <button class="btn-primary" id="back-panel">${tr("backToPanel")}</button>
      </section>
    `;
    document.getElementById("back-panel").addEventListener("click", () => {
      location.hash = rolesApi.getHomeRouteByRole(user?.rol || "paciente");
    });
  }

  function renderHome() {
    document.getElementById("view").innerHTML = `
      <section class="hero">
        <div class="hero-split">
          <div>
            <h1>${tr("homeTitle")}</h1>
            <p>${tr("homeSubtitle")}</p>
            <div class="inline-actions" style="margin-top:0.8rem;">
              <a class="btn-primary" href="#/buscar">${tr("findSpecialist")}</a>
              <a class="btn-danger" href="#/urgencias">${tr("urgentNow")}</a>
            </div>
          </div>
          <img class="context-media" src="${CONTEXT_IMAGES.home}" alt="Telemedicina con especialista" />
        </div>
      </section>
    `;
  }

  function renderBuscar() {
    const view = document.getElementById("view");
    const list = getSpecialists();
    view.innerHTML = `
      <section class="card">
        <h2 class="section-title">${tr("searchTitle")}</h2>
        <img class="context-media" src="${CONTEXT_IMAGES.search}" alt="Búsqueda de especialistas médicos" style="margin:0.5rem 0 0.9rem;" />
        <div class="grid grid-3">
          <input id="f-nombre" placeholder="${tr("searchByName")}" />
          <select id="f-especialidad">
            <option value="all">${tr("allSpecialties")}</option>
            ${[...new Set(list.map((s) => s.specialty))].map((s) => `<option value="${s}">${s}</option>`).join("")}
          </select>
          <select id="f-tipo">
            <option value="video">${tr("videoConsultation")}</option>
            <option value="chat">${tr("chat")}</option>
            <option value="presencial">${tr("onsite")}</option>
          </select>
        </div>
        <button class="btn-primary" id="do-search" style="margin-top:0.7rem;">${tr("search")}</button>
      </section>
      <section id="search-results" class="grid grid-3" style="margin-top:1rem;"></section>
    `;

    const draw = () => {
      const txt = view.querySelector("#f-nombre").value.toLowerCase();
      const esp = view.querySelector("#f-especialidad").value;
      state.selectedType = view.querySelector("#f-tipo").value;

      let filtered = [...list];
      if (txt) filtered = filtered.filter((x) => x.fullName.toLowerCase().includes(txt));
      if (esp !== "all") filtered = filtered.filter((x) => x.specialty === esp);

      const container = view.querySelector("#search-results");
      container.innerHTML = filtered
        .map(
          (sp) => `
          <article class="card specialist-card">
            <div class="specialist-head">
              <img class="avatar" src="${getAvatar(sp.fullName)}" alt="${sp.fullName}" />
              <div>
                <strong>${sp.fullName}</strong>
                <div>${sp.specialty}</div>
                <div class="rating">${"<i data-lucide='star'></i>".repeat(Math.round(sp.rating))} ${sp.rating}</div>
              </div>
            </div>
            <p>${sp.bio}</p>
            <p><strong>${formatCOP(sp.price)}</strong></p>
            <div class="inline-actions">
              <button class="btn-outline" data-profile="${sp.id}">${tr("viewProfile")}</button>
              <button class="btn-primary" data-book="${sp.id}">${tr("bookNow")}</button>
            </div>
          </article>
        `
        )
        .join("");

      container.querySelectorAll("[data-profile]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.selectedSpecialistId = Number(btn.dataset.profile);
          location.hash = "#/perfil";
        });
      });

      container.querySelectorAll("[data-book]").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.selectedSpecialistId = Number(btn.dataset.book);
          location.hash = "#/agendar";
        });
      });
      initIcons();
    };

    view.querySelector("#do-search").addEventListener("click", draw);
    draw();
  }

  function findSelectedSpecialist() {
    const list = getSpecialists();
    if (!state.selectedSpecialistId) state.selectedSpecialistId = list[0].id;
    return list.find((s) => s.id === state.selectedSpecialistId) || list[0];
  }

  function renderPerfil() {
    const view = document.getElementById("view");
    const sp = findSelectedSpecialist();
    view.innerHTML = `
      <section class="grid grid-2">
        <article class="card">
          <img class="context-media" src="${CONTEXT_IMAGES.profile}" alt="Perfil médico profesional" style="margin-bottom:0.8rem;" />
          <div class="specialist-head">
            <img class="avatar" src="${getAvatar(sp.fullName)}" alt="${sp.fullName}" />
            <div><h2 class="section-title" style="margin:0;">${sp.fullName}</h2><p>${sp.specialty}</p></div>
          </div>
          <p>${sp.bio}</p>
          <button class="btn-primary" id="go-book">${tr("book")}</button>
        </article>
        <article class="card"><h3 class="section-title">${tr("availability")}</h3><div id="profile-calendar" style="min-height:420px;"></div></article>
      </section>
    `;

    view.querySelector("#go-book").addEventListener("click", () => (location.hash = "#/agendar"));
    const el = view.querySelector("#profile-calendar");

    if (sp.linkedUserId) {
      state.activeCalendar = agendaApi.renderAgendaReadOnly(el, sp.linkedUserId, (startStr) => {
        state.selectedSlot = startStr;
        location.hash = "#/agendar";
      });
      return;
    }

    const now = new Date();
    const events = [];
    for (let i = 1; i <= 10; i += 1) {
      const start = new Date(now.getTime() + i * 86400000);
      start.setHours(9, 0, 0, 0);
  events.push({ title: tr("available"), start: start.toISOString(), end: new Date(start.getTime() + 1800000).toISOString(), backgroundColor: "#16a34a" });
    }

    state.activeCalendar = new FullCalendar.Calendar(el, {
      initialView: "timeGridWeek",
  locale: state.lang,
      allDaySlot: false,
      events,
      eventClick: (info) => {
        state.selectedSlot = info.event.startStr;
        location.hash = "#/agendar";
      }
    });
    state.activeCalendar.render();
  }

  function renderAgendar() {
    const view = document.getElementById("view");
    const user = getSession();
    const sp = findSelectedSpecialist();
    view.innerHTML = `
      <section class="card">
        <h2 class="section-title">${tr("booking3steps")}</h2>
        <div class="grid grid-3">
          <article class="card">
            <strong>${tr("step1")}</strong>
            <select id="a-type" style="margin-top:0.5rem;"><option value="video">${tr("videoConsultation")}</option><option value="chat">${tr("chat")}</option><option value="presencial">${tr("onsite")}</option></select>
            <input id="a-date" type="datetime-local" value="${(state.selectedSlot || new Date(Date.now() + 86400000).toISOString()).slice(0, 16)}" style="margin-top:0.5rem;" />
          </article>
          <article class="card">
            <strong>${tr("step2")}</strong>
            <input id="a-name" value="${user?.nombre || ""}" placeholder="${tr("name")}" style="margin-top:0.5rem;" />
            <input id="a-email" value="${user?.email || ""}" placeholder="${tr("email")}" style="margin-top:0.5rem;" />
            <textarea id="a-reason" rows="3" placeholder="${tr("reason")}" style="margin-top:0.5rem;"></textarea>
          </article>
          <article class="card"><strong>${tr("step3")}</strong><p>${sp.fullName}</p><p>${formatCOP(sp.price)}</p><button class="btn-primary" id="confirm-book">${tr("confirmAppointment")}</button></article>
        </div>
      </section>
    `;

    view.querySelector("#confirm-book").addEventListener("click", () => {
      const dt = view.querySelector("#a-date").value;
  if (!dt) return showToast(tr("selectDateTime"));
      const type = view.querySelector("#a-type").value;
      const reason = view.querySelector("#a-reason").value.trim();
      const start = new Date(dt);

      const citas = agendaApi.getCitas();
      citas.push({
        id: `a_${Date.now()}`,
        pacienteId: user.id,
        pacienteNombre: user.nombre,
        medicoId: sp.linkedUserId || 1,
        medicoNombre: sp.fullName,
        fechaInicio: start.toISOString(),
        fechaFin: new Date(start.getTime() + 1800000).toISOString(),
        tipo: type,
        motivo: reason || tr("generalConsultation"),
        estado: "confirmada"
      });
      agendaApi.saveCitas(citas);

      state.appointment = { specialist: sp, roomName: `MediConnect-${sp.fullName.replace(/\W+/g, "")}-${Date.now()}`, patientName: user.nombre };
  showToast(tr("appointmentConfirmed"));
      location.hash = type === "video" ? "#/consulta" : type === "chat" ? "#/chat" : "#/panel";
    });
  }

  function renderConsulta() {
    const view = document.getElementById("view");
    const appointment = state.appointment;
    view.innerHTML = `
      <section class="card"><h2 class="section-title">${tr("consultationRoom")}</h2><div class="countdown" id="w-count">00:20</div><button class="btn-primary" id="start-video" disabled>${tr("enter")}</button></section>
      <section class="card" style="margin-top:1rem;"><div id="jitsi-container"></div></section>
    `;
    startCountdown(20, "w-count", () => (view.querySelector("#start-video").disabled = false));
    view.querySelector("#start-video").addEventListener("click", () => mountJitsi("jitsi-container", appointment?.roomName || `MediConnect-Demo-${Date.now()}`, appointment?.patientName || tr("patient")));
  }

  function renderChat() {
  document.getElementById("view").innerHTML = `<section class="card"><h2 class="section-title">${tr("medicalChat")}</h2><div class="messages" id="chat-msgs"><div class="message from-doctor">${tr("chatGreeting")}<small>09:00</small></div></div><div class="chat-compose"><input id="chat-input" placeholder="${tr("writeMessage")}"/><label class="btn-outline" style="display:inline-flex;align-items:center;justify-content:center;">${tr("attach")}<input type="file" hidden /></label><button class="btn-primary" id="chat-send">${tr("send")}</button></div></section>`;
    document.getElementById("chat-send").addEventListener("click", () => {
      const input = document.getElementById("chat-input");
      if (!input.value.trim()) return;
      document.getElementById("chat-msgs").innerHTML += `<div class="message from-user">${input.value}<small>${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small></div>`;
      input.value = "";
    });
  }

  function renderUrgencias() {
  document.getElementById("view").innerHTML = `<section class="card"><h2 class="section-title">${tr("urgent")}</h2><div class="grid grid-2" style="align-items:center;"><div><div class="countdown" id="urgent-count">04:00</div><button class="btn-danger" id="launch-urgent">${tr("urgentNow")}</button></div><img class="context-media" src="${CONTEXT_IMAGES.urgent}" alt="Atención médica de urgencia" /></div></section><section class="card" style="margin-top:1rem;"><div id="urgent-jitsi-container"></div></section>`;
    startCountdown(240, "urgent-count");
    document.getElementById("launch-urgent").addEventListener("click", () => mountJitsi("urgent-jitsi-container", `MediConnect-Guardia-${Date.now()}`, `${tr("patient")} ${tr("urgent")}`));
  }

  function renderPlanes() {
    document.getElementById("view").innerHTML = `<section class="card"><h2 class="section-title">${tr("memberships")}</h2><div class="grid grid-2"><article class="card"><h3>${tr("freePatient")}</h3><p><strong>${formatCOP(0)}</strong>/mes</p></article><article class="card"><h3>${tr("basicDoctor")}</h3><p><strong>${formatCOP(150000)}</strong>/mes</p></article><article class="card plan-premium"><h3>${tr("premiumDoctor")}</h3><p><strong>${formatCOP(280000)}</strong>/mes</p><span class="badge success">${tr("featured")}</span></article><article class="card"><h3>${tr("clinicHospital")}</h3><p><strong>${tr("customPricing")}</strong></p><button class="btn-outline">${tr("requestDemo")}</button></article></div></section><section class="card" style="margin-top:1rem;"><canvas id="plan-chart"></canvas></section>`;
    state.chartInstances.push(new Chart(document.getElementById("plan-chart"), { type: "doughnut", data: { labels: [tr("freePatient"), tr("basicDoctor"), tr("premiumDoctor"), tr("clinicHospital")], datasets: [{ data: [52, 22, 18, 8], backgroundColor: ["#bfdbfe", "#60a5fa", "#1a73e8", "#1e3a8a"] }] } }));
  }

  function renderPanelPaciente(user) {
  const citas = agendaApi.getCitas().filter((c) => c.pacienteId === user.id && c.estado !== "cancelada");
  document.getElementById("view").innerHTML = `<section class="card"><img class="context-media" src="${CONTEXT_IMAGES.patientPanel}" alt="Paciente en consulta remota" style="margin-bottom:0.8rem;" /><h2 class="section-title">${tr("patientPanel")}</h2><p>${tr("upcomingAppointments")}: <strong>${citas.length}</strong></p><div class="inline-actions"><a class="btn-outline" href="#/mi-historia">${tr("viewMyHistory")}</a><a class="btn-outline" href="#/buscar">${tr("scheduleNewAppointment")}</a></div></section><section class="card" style="margin-top:1rem;"><h3>${tr("myUpcomingAppointments")}</h3>${citas.map((c) => `<div class="card" style="margin-bottom:0.5rem;"><strong>${new Date(c.fechaInicio).toLocaleString()}</strong> · ${c.medicoNombre} · ${c.tipo} · ${c.estado}<div class="inline-actions" style="margin-top:0.4rem;"><button class="btn-outline" data-cancel-cita="${c.id}">${tr("cancel")}</button><button class="btn-outline" data-reschedule-cita="${c.id}">${tr("reschedule")}</button></div></div>`).join("") || `<p>${tr("noAppointments")}</p>`}</section><section class="grid grid-2" style="margin-top:1rem;"><article class="card"><canvas id="patient-line"></canvas></article><article class="card"><div id="clinic-map" style="height:300px;"></div></article></section>`;

    document.querySelectorAll("[data-cancel-cita]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const all = agendaApi.getCitas();
        const cita = all.find((x) => x.id === btn.dataset.cancelCita && x.pacienteId === user.id);
        if (!cita) return;
        cita.estado = "cancelada";
        agendaApi.saveCitas(all);
        renderPanelPaciente(user);
      });
    });

    document.querySelectorAll("[data-reschedule-cita]").forEach((btn) => {
      btn.addEventListener("click", () => {
  const newDate = prompt(tr("newDatePrompt"));
        if (!newDate) return;
        const all = agendaApi.getCitas();
        const cita = all.find((x) => x.id === btn.dataset.rescheduleCita && x.pacienteId === user.id);
        if (!cita) return;
        const start = new Date(newDate);
        cita.fechaInicio = start.toISOString();
        cita.fechaFin = new Date(start.getTime() + 1800000).toISOString();
        cita.estado = "reprogramada";
        agendaApi.saveCitas(all);
        renderPanelPaciente(user);
      });
    });

  state.chartInstances.push(new Chart(document.getElementById("patient-line"), { type: "line", data: { labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"], datasets: [{ label: tr("monthlyConsults"), data: [2, 3, 4, 3, 5, 6], borderColor: "#1a73e8" }] } }));
    state.mapInstance = L.map("clinic-map").setView([4.711, -74.0721], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap" }).addTo(state.mapInstance);
    [[4.741, -74.05, "Clínica Norte"], [4.648, -74.062, "Consultorio Chapinero"], [4.667, -74.11, "Centro Médico Salitre"]].forEach((c) => L.marker([c[0], c[1]]).addTo(state.mapInstance).bindPopup(c[2]));
  }

  function renderPanelMedico(user) {
    const citas = agendaApi.getCitas().filter((c) => c.medicoId === user.id && c.estado !== "cancelada");
    document.getElementById("view").innerHTML = `<section class="card"><img class="context-media" src="${CONTEXT_IMAGES.doctorPanel}" alt="Médico revisando su panel" style="margin-bottom:0.8rem;" /><h2 class="section-title">${tr("doctorPanel")}</h2><p>${tr("activeAppointments")}: <strong>${citas.length}</strong></p><div class="inline-actions"><a class="btn-outline" href="#/mi-agenda">${tr("manageAgenda")}</a><a class="btn-outline" href="#/mis-pacientes">${tr("viewAssignedPatients")}</a></div></section><section class="grid grid-2" style="margin-top:1rem;"><article class="card"><canvas id="doctor-line"></canvas></article><article class="card"><canvas id="doctor-donut"></canvas></article></section>`;
    state.chartInstances.push(new Chart(document.getElementById("doctor-line"), { type: "line", data: { labels: ["Ene", "Feb", "Mar", "Abr", "May"], datasets: [{ label: tr("consults"), data: [18, 22, 21, 28, 31], borderColor: "#1a73e8" }] } }));
    state.chartInstances.push(new Chart(document.getElementById("doctor-donut"), { type: "doughnut", data: { labels: [tr("videoConsultation"), tr("chat"), tr("onsite")], datasets: [{ data: [65, 20, 15], backgroundColor: ["#1a73e8", "#60a5fa", "#bfdbfe"] }] } }));
  }

  function renderMisPacientes(user) {
    const view = document.getElementById("view");
    const historias = historiaApi.getHistorias();
    const patients = (user.rol === "admin" ? historias : historias.filter((h) => rolesApi.isAssignedDoctor(user, h.pacienteId))).map((h) => ({ ...h, lastDx: historiaApi.getLatestDiagnosis(h) }));

  view.innerHTML = `<section class="card"><h2 class="section-title">${tr("patientsTitle")}</h2><input id="p-search" placeholder="${tr("searchPatientByName")}" /></section><section id="patients-grid" class="grid grid-3" style="margin-top:1rem;"></section>`;
    const draw = () => {
      const q = view.querySelector("#p-search").value.toLowerCase().trim();
      const list = q ? patients.filter((p) => p.pacienteNombre.toLowerCase().includes(q)) : patients;
      const grid = view.querySelector("#patients-grid");
  grid.innerHTML = list.map((p) => `<article class="card"><div class="specialist-head"><img class="avatar" src="${getAvatar(p.pacienteNombre)}" alt="${p.pacienteNombre}" /><div><strong>${p.pacienteNombre}</strong><div>${tr("record")} #${p.id}</div></div></div><p><strong>${tr("lastDiagnosis")}:</strong> ${p.lastDx}</p><p><strong>${tr("lastUpdate")}:</strong> ${p.ultimaActualizacion || tr("noData")}</p><button class="btn-primary" data-view-history="${p.pacienteId}">${tr("viewHistory")}</button></article>`).join("");
      grid.querySelectorAll("[data-view-history]").forEach((btn) => btn.addEventListener("click", () => (location.hash = `#/historia/${btn.dataset.viewHistory}`)));
    };
    view.querySelector("#p-search").addEventListener("input", draw);
    draw();
  }

  function renderHistoriaDetalle(pacienteId, viewer) {
    historiaApi.renderHistoriaDetalle(document.getElementById("view"), { viewer, pacienteId, toast: showToast });
  }

  function renderMiAgenda(user) {
    let medicoId = user.id;
    if (user.rol === "admin") medicoId = Number(localStorage.getItem("mc_admin_agenda_medico") || 1);
    agendaApi.renderMiAgenda(document.getElementById("view"), { medicoId, toast: showToast, onHistoria: (pid) => (location.hash = `#/historia/${pid}`) });
  }

  function cleanupDynamicInstances() {
    if (state.waitingTimer) clearInterval(state.waitingTimer);
    state.waitingTimer = null;
    if (state.jitsiApi) state.jitsiApi.dispose();
    state.jitsiApi = null;
    if (state.activeCalendar) state.activeCalendar.destroy();
    state.activeCalendar = null;
    state.chartInstances.forEach((c) => c.destroy());
    state.chartInstances = [];
    if (state.mapInstance) state.mapInstance.remove();
    state.mapInstance = null;
  }

  function startCountdown(seconds, elementId, onDone) {
    let left = seconds;
    const el = document.getElementById(elementId);
    if (!el) return;
    const draw = () => {
      const mm = String(Math.floor(left / 60)).padStart(2, "0");
      const ss = String(left % 60).padStart(2, "0");
      el.textContent = `${mm}:${ss}`;
    };
    draw();
    state.waitingTimer = setInterval(() => {
      left -= 1;
      draw();
      if (left <= 0) {
        clearInterval(state.waitingTimer);
        state.waitingTimer = null;
        onDone?.();
      }
    }, 1000);
  }

  function mountJitsi(containerId, roomName, userName) {
    const parent = document.getElementById(containerId);
    if (!parent) return;
    if (window.JitsiMeetExternalAPI) {
      state.jitsiApi = new window.JitsiMeetExternalAPI("meet.jit.si", {
        roomName,
        parentNode: parent,
        width: "100%",
        height: 560,
        userInfo: { displayName: userName }
      });
    } else {
      parent.innerHTML = `<iframe title="Jitsi" width="100%" height="560" allow="camera; microphone; fullscreen" src="https://meet.jit.si/${roomName}"></iframe>`;
    }
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function initIcons() {
    if (window.lucide?.createIcons) window.lucide.createIcons();
  }
})();
