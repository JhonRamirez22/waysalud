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
      urgentNow: "Consulta urgente ahora"
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
      urgentNow: "Urgent consultation now"
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
      urgentNow: "Consulta urgente agora"
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
                  <option value="es" ${state.lang === "es" ? "selected" : ""}>ES</option>
                  <option value="en" ${state.lang === "en" ? "selected" : ""}>EN</option>
                  <option value="pt" ${state.lang === "pt" ? "selected" : ""}>PT</option>
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
    return `https://flagcdn.com/24x18/${lang === "en" ? "us" : lang === "pt" ? "br" : "co"}.png`;
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
        <h1>${tr("homeTitle")}</h1>
        <p>${tr("homeSubtitle")}</p>
        <div class="inline-actions">
          <a class="btn-primary" href="#/buscar">${tr("findSpecialist")}</a>
          <a class="btn-danger" href="#/urgencias">${tr("urgentNow")}</a>
        </div>
      </section>
    `;
  }

  function renderBuscar() {
    const view = document.getElementById("view");
    const list = getSpecialists();
    view.innerHTML = `
      <section class="card">
        <h2 class="section-title">Búsqueda de especialistas</h2>
        <div class="grid grid-3">
          <input id="f-nombre" placeholder="Buscar por nombre" />
          <select id="f-especialidad">
            <option value="all">Todas las especialidades</option>
            ${[...new Set(list.map((s) => s.specialty))].map((s) => `<option value="${s}">${s}</option>`).join("")}
          </select>
          <select id="f-tipo">
            <option value="video">Videoconsulta</option>
            <option value="chat">Chat</option>
            <option value="presencial">Presencial</option>
          </select>
        </div>
        <button class="btn-primary" id="do-search" style="margin-top:0.7rem;">Buscar</button>
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
              <button class="btn-outline" data-profile="${sp.id}">Ver perfil</button>
              <button class="btn-primary" data-book="${sp.id}">Agendar ahora</button>
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
          <div class="specialist-head">
            <img class="avatar" src="${getAvatar(sp.fullName)}" alt="${sp.fullName}" />
            <div><h2 class="section-title" style="margin:0;">${sp.fullName}</h2><p>${sp.specialty}</p></div>
          </div>
          <p>${sp.bio}</p>
          <button class="btn-primary" id="go-book">Agendar</button>
        </article>
        <article class="card"><h3 class="section-title">Disponibilidad</h3><div id="profile-calendar" style="min-height:420px;"></div></article>
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
      events.push({ title: "Disponible", start: start.toISOString(), end: new Date(start.getTime() + 1800000).toISOString(), backgroundColor: "#16a34a" });
    }

    state.activeCalendar = new FullCalendar.Calendar(el, {
      initialView: "timeGridWeek",
      locale: "es",
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
        <h2 class="section-title">Agendamiento en 3 pasos</h2>
        <div class="grid grid-3">
          <article class="card">
            <strong>Paso 1</strong>
            <select id="a-type" style="margin-top:0.5rem;"><option value="video">Videoconsulta</option><option value="chat">Chat</option><option value="presencial">Presencial</option></select>
            <input id="a-date" type="datetime-local" value="${(state.selectedSlot || new Date(Date.now() + 86400000).toISOString()).slice(0, 16)}" style="margin-top:0.5rem;" />
          </article>
          <article class="card">
            <strong>Paso 2</strong>
            <input id="a-name" value="${user?.nombre || ""}" placeholder="Nombre" style="margin-top:0.5rem;" />
            <input id="a-email" value="${user?.email || ""}" placeholder="Email" style="margin-top:0.5rem;" />
            <textarea id="a-reason" rows="3" placeholder="Motivo" style="margin-top:0.5rem;"></textarea>
          </article>
          <article class="card"><strong>Paso 3</strong><p>${sp.fullName}</p><p>${formatCOP(sp.price)}</p><button class="btn-primary" id="confirm-book">Confirmar cita</button></article>
        </div>
      </section>
    `;

    view.querySelector("#confirm-book").addEventListener("click", () => {
      const dt = view.querySelector("#a-date").value;
      if (!dt) return showToast("Selecciona fecha y hora");
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
        motivo: reason || "Consulta general",
        estado: "confirmada"
      });
      agendaApi.saveCitas(citas);

      state.appointment = { specialist: sp, roomName: `MediConnect-${sp.fullName.replace(/\W+/g, "")}-${Date.now()}`, patientName: user.nombre };
      showToast("Cita confirmada");
      location.hash = type === "video" ? "#/consulta" : type === "chat" ? "#/chat" : "#/panel";
    });
  }

  function renderConsulta() {
    const view = document.getElementById("view");
    const appointment = state.appointment;
    view.innerHTML = `
      <section class="card"><h2 class="section-title">Sala de videoconsulta</h2><div class="countdown" id="w-count">00:20</div><button class="btn-primary" id="start-video" disabled>Entrar</button></section>
      <section class="card" style="margin-top:1rem;"><div id="jitsi-container"></div></section>
    `;
    startCountdown(20, "w-count", () => (view.querySelector("#start-video").disabled = false));
    view.querySelector("#start-video").addEventListener("click", () => mountJitsi("jitsi-container", appointment?.roomName || `MediConnect-Demo-${Date.now()}`, appointment?.patientName || "Paciente"));
  }

  function renderChat() {
    document.getElementById("view").innerHTML = `<section class="card"><h2 class="section-title">Chat médico</h2><div class="messages" id="chat-msgs"><div class="message from-doctor">Hola, ¿cómo te sientes hoy?<small>09:00</small></div></div><div class="chat-compose"><input id="chat-input" placeholder="Escribe tu mensaje..."/><label class="btn-outline" style="display:inline-flex;align-items:center;justify-content:center;">Adjuntar<input type="file" hidden /></label><button class="btn-primary" id="chat-send">Enviar</button></div></section>`;
    document.getElementById("chat-send").addEventListener("click", () => {
      const input = document.getElementById("chat-input");
      if (!input.value.trim()) return;
      document.getElementById("chat-msgs").innerHTML += `<div class="message from-user">${input.value}<small>${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small></div>`;
      input.value = "";
    });
  }

  function renderUrgencias() {
    document.getElementById("view").innerHTML = `<section class="card"><h2 class="section-title">Urgencias</h2><div class="countdown" id="urgent-count">04:00</div><button class="btn-danger" id="launch-urgent">Lanzar consulta urgente</button></section><section class="card" style="margin-top:1rem;"><div id="urgent-jitsi-container"></div></section>`;
    startCountdown(240, "urgent-count");
    document.getElementById("launch-urgent").addEventListener("click", () => mountJitsi("urgent-jitsi-container", `MediConnect-Guardia-${Date.now()}`, "Paciente urgente"));
  }

  function renderPlanes() {
    document.getElementById("view").innerHTML = `<section class="card"><h2 class="section-title">Membresías</h2><div class="grid grid-2"><article class="card"><h3>Gratuito paciente</h3><p><strong>${formatCOP(0)}</strong>/mes</p></article><article class="card"><h3>Básico médico</h3><p><strong>${formatCOP(150000)}</strong>/mes</p></article><article class="card plan-premium"><h3>Premium médico</h3><p><strong>${formatCOP(280000)}</strong>/mes</p><span class="badge success">Destacado</span></article><article class="card"><h3>Clínica / Hospital</h3><p><strong>Precio personalizado</strong></p><button class="btn-outline">Solicitar demo</button></article></div></section><section class="card" style="margin-top:1rem;"><canvas id="plan-chart"></canvas></section>`;
    state.chartInstances.push(new Chart(document.getElementById("plan-chart"), { type: "doughnut", data: { labels: ["Paciente", "Básico", "Premium", "Clínica"], datasets: [{ data: [52, 22, 18, 8], backgroundColor: ["#bfdbfe", "#60a5fa", "#1a73e8", "#1e3a8a"] }] } }));
  }

  function renderPanelPaciente(user) {
    const citas = agendaApi.getCitas().filter((c) => c.pacienteId === user.id && c.estado !== "cancelada");
    document.getElementById("view").innerHTML = `<section class="card"><h2 class="section-title">Panel del paciente</h2><p>Próximas citas: <strong>${citas.length}</strong></p><div class="inline-actions"><a class="btn-outline" href="#/mi-historia">Ver mi historia</a><a class="btn-outline" href="#/buscar">Agendar nueva cita</a></div></section><section class="card" style="margin-top:1rem;"><h3>Mis próximas citas</h3>${citas.map((c) => `<div class="card" style="margin-bottom:0.5rem;"><strong>${new Date(c.fechaInicio).toLocaleString()}</strong> · ${c.medicoNombre} · ${c.tipo} · ${c.estado}<div class="inline-actions" style="margin-top:0.4rem;"><button class="btn-outline" data-cancel-cita="${c.id}">Cancelar</button><button class="btn-outline" data-reschedule-cita="${c.id}">Reprogramar</button></div></div>`).join("") || "<p>Sin citas</p>"}</section><section class="grid grid-2" style="margin-top:1rem;"><article class="card"><canvas id="patient-line"></canvas></article><article class="card"><div id="clinic-map" style="height:300px;"></div></article></section>`;

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
        const newDate = prompt("Nueva fecha/hora (YYYY-MM-DDTHH:mm)");
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

    state.chartInstances.push(new Chart(document.getElementById("patient-line"), { type: "line", data: { labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"], datasets: [{ label: "Consultas por mes", data: [2, 3, 4, 3, 5, 6], borderColor: "#1a73e8" }] } }));
    state.mapInstance = L.map("clinic-map").setView([4.711, -74.0721], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap" }).addTo(state.mapInstance);
    [[4.741, -74.05, "Clínica Norte"], [4.648, -74.062, "Consultorio Chapinero"], [4.667, -74.11, "Centro Médico Salitre"]].forEach((c) => L.marker([c[0], c[1]]).addTo(state.mapInstance).bindPopup(c[2]));
  }

  function renderPanelMedico(user) {
    const citas = agendaApi.getCitas().filter((c) => c.medicoId === user.id && c.estado !== "cancelada");
    document.getElementById("view").innerHTML = `<section class="card"><h2 class="section-title">Panel del médico</h2><p>Citas activas: <strong>${citas.length}</strong></p><div class="inline-actions"><a class="btn-outline" href="#/mi-agenda">Gestionar agenda</a><a class="btn-outline" href="#/mis-pacientes">Ver pacientes asignados</a></div></section><section class="grid grid-2" style="margin-top:1rem;"><article class="card"><canvas id="doctor-line"></canvas></article><article class="card"><canvas id="doctor-donut"></canvas></article></section>`;
    state.chartInstances.push(new Chart(document.getElementById("doctor-line"), { type: "line", data: { labels: ["Ene", "Feb", "Mar", "Abr", "May"], datasets: [{ label: "Consultas", data: [18, 22, 21, 28, 31], borderColor: "#1a73e8" }] } }));
    state.chartInstances.push(new Chart(document.getElementById("doctor-donut"), { type: "doughnut", data: { labels: ["Video", "Chat", "Presencial"], datasets: [{ data: [65, 20, 15], backgroundColor: ["#1a73e8", "#60a5fa", "#bfdbfe"] }] } }));
  }

  function renderMisPacientes(user) {
    const view = document.getElementById("view");
    const historias = historiaApi.getHistorias();
    const patients = (user.rol === "admin" ? historias : historias.filter((h) => rolesApi.isAssignedDoctor(user, h.pacienteId))).map((h) => ({ ...h, lastDx: historiaApi.getLatestDiagnosis(h) }));

    view.innerHTML = `<section class="card"><h2 class="section-title">Mis pacientes</h2><input id="p-search" placeholder="Buscar paciente por nombre" /></section><section id="patients-grid" class="grid grid-3" style="margin-top:1rem;"></section>`;
    const draw = () => {
      const q = view.querySelector("#p-search").value.toLowerCase().trim();
      const list = q ? patients.filter((p) => p.pacienteNombre.toLowerCase().includes(q)) : patients;
      const grid = view.querySelector("#patients-grid");
      grid.innerHTML = list.map((p) => `<article class="card"><div class="specialist-head"><img class="avatar" src="${getAvatar(p.pacienteNombre)}" alt="${p.pacienteNombre}" /><div><strong>${p.pacienteNombre}</strong><div>Historia #${p.id}</div></div></div><p><strong>Último diagnóstico:</strong> ${p.lastDx}</p><p><strong>Última actualización:</strong> ${p.ultimaActualizacion || "N/A"}</p><button class="btn-primary" data-view-history="${p.pacienteId}">Ver historia</button></article>`).join("");
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
