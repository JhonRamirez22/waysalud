// ==============================
// WaySalud SPA (Vanilla JS)
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
      loginTitle: "Ingreso a WaySalud",
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
      loginTitle: "WaySalud login",
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
      loginTitle: "Acesso ao WaySalud",
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
    },
    de: {
      login: "Anmelden",
      searchDoctors: "Ärzte suchen",
      myAppointments: "Meine Termine",
      myHistory: "Meine Akte",
      urgent: "Notfall",
      myProfile: "Mein Profil",
      logout: "Abmelden",
      myAgenda: "Meine Agenda",
      myPatients: "Meine Patienten",
      newConsultation: "Neue Konsultation",
      dashboard: "Dashboard",
      users: "Benutzer",
      specialties: "Fachrichtungen",
      allRecords: "Alle Akten",
      loginTitle: "WaySalud Anmeldung",
      loginSubtitle: "Rollenbasierter Zugang mit simulierter Sitzung in localStorage",
      email: "E-Mail",
      password: "Passwort",
      enterAsPatient: "Als Patient anmelden",
      enterAsDoctor: "Als Arzt anmelden",
      enterAsAdmin: "Als Admin anmelden",
      accessDenied: "Zugriff verweigert",
      backToPanel: "Zurück zu meinem Bereich",
      homeTitle: "Sichere Telekonsultation in Minuten",
      homeSubtitle: "Verbinde dich mit Spezialisten per Video, Chat oder Präsenztermin.",
      findSpecialist: "Spezialisten finden",
      urgentNow: "Jetzt Notfallkonsultation",
      searchTitle: "Spezialistensuche",
      searchByName: "Nach Name suchen",
      allSpecialties: "Alle Fachrichtungen",
      videoConsultation: "Videokonsultation",
      onsite: "Präsenz",
      search: "Suchen",
      viewProfile: "Profil anzeigen",
      bookNow: "Jetzt buchen",
      book: "Buchen",
      availability: "Verfügbarkeit",
      available: "Verfügbar",
      booking3steps: "Buchung in 3 Schritten",
      step1: "Schritt 1",
      step2: "Schritt 2",
      step3: "Schritt 3",
      name: "Name",
      reason: "Grund",
      confirmAppointment: "Termin bestätigen",
      selectDateTime: "Datum und Uhrzeit auswählen",
      generalConsultation: "Allgemeine Konsultation",
      appointmentConfirmed: "Termin bestätigt",
      consultationRoom: "Videokonsultationsraum",
      enter: "Betreten",
      patient: "Patient",
      medicalChat: "Medizinischer Chat",
      chatGreeting: "Hallo, wie fühlen Sie sich heute?",
      writeMessage: "Nachricht schreiben...",
      attach: "Anhängen",
      send: "Senden",
      memberships: "Mitgliedschaften",
      freePatient: "Kostenloser Patient",
      basicDoctor: "Basis-Arzt",
      premiumDoctor: "Premium-Arzt",
      featured: "Hervorgehoben",
      clinicHospital: "Klinik / Krankenhaus",
      customPricing: "Individuelle Preise",
      requestDemo: "Demo anfordern",
      patientPanel: "Patientenbereich",
      upcomingAppointments: "Bevorstehende Termine",
      viewMyHistory: "Meine Akte anzeigen",
      scheduleNewAppointment: "Neuen Termin vereinbaren",
      myUpcomingAppointments: "Meine bevorstehenden Termine",
      cancel: "Stornieren",
      reschedule: "Neu planen",
      noAppointments: "Keine Termine",
      newDatePrompt: "Neues Datum/Uhrzeit (YYYY-MM-DDTHH:mm)",
      monthlyConsults: "Konsultationen pro Monat",
      doctorPanel: "Arztbereich",
      activeAppointments: "Aktive Termine",
      manageAgenda: "Agenda verwalten",
      viewAssignedPatients: "Zugewiesene Patienten anzeigen",
      consults: "Konsultationen",
      patientsTitle: "Meine Patienten",
      searchPatientByName: "Patient nach Name suchen",
      record: "Akte",
      lastDiagnosis: "Letzte Diagnose",
      lastUpdate: "Letzte Aktualisierung",
      viewHistory: "Akte anzeigen",
      noData: "k. A."
    },
    it: {
      login: "Accedi",
      searchDoctors: "Cerca medici",
      myAppointments: "I miei appuntamenti",
      myHistory: "La mia cartella",
      urgent: "Urgenze",
      myProfile: "Il mio profilo",
      logout: "Disconnetti",
      myAgenda: "La mia agenda",
      myPatients: "I miei pazienti",
      newConsultation: "Nuova consultazione",
      dashboard: "Dashboard",
      users: "Utenti",
      specialties: "Specialità",
      allRecords: "Tutte le cartelle",
      loginTitle: "Accesso a WaySalud",
      loginSubtitle: "Accesso per ruolo con sessione simulata in localStorage",
      email: "Email",
      password: "Password",
      enterAsPatient: "Entra come Paziente",
      enterAsDoctor: "Entra come Medico",
      enterAsAdmin: "Entra come Admin",
      accessDenied: "Accesso negato",
      backToPanel: "Torna al mio pannello",
      homeTitle: "Teleconsulto sicuro in pochi minuti",
      homeSubtitle: "Connettiti con specialisti via video, chat o visita in presenza.",
      findSpecialist: "Trova specialista",
      urgentNow: "Consulto urgente ora",
      searchTitle: "Ricerca specialisti",
      searchByName: "Cerca per nome",
      allSpecialties: "Tutte le specialità",
      videoConsultation: "Videoconsulto",
      onsite: "In presenza",
      search: "Cerca",
      viewProfile: "Vedi profilo",
      bookNow: "Prenota ora",
      book: "Prenota",
      availability: "Disponibilità",
      available: "Disponibile",
      booking3steps: "Prenotazione in 3 passi",
      step1: "Passo 1",
      step2: "Passo 2",
      step3: "Passo 3",
      name: "Nome",
      reason: "Motivo",
      confirmAppointment: "Conferma appuntamento",
      selectDateTime: "Seleziona data e ora",
      generalConsultation: "Consulto generale",
      appointmentConfirmed: "Appuntamento confermato",
      consultationRoom: "Sala videoconsulto",
      enter: "Entra",
      patient: "Paziente",
      medicalChat: "Chat medica",
      chatGreeting: "Ciao, come ti senti oggi?",
      writeMessage: "Scrivi il tuo messaggio...",
      attach: "Allega",
      send: "Invia",
      memberships: "Abbonamenti",
      freePatient: "Paziente gratuito",
      basicDoctor: "Medico base",
      premiumDoctor: "Medico premium",
      featured: "In evidenza",
      clinicHospital: "Clinica / Ospedale",
      customPricing: "Prezzo personalizzato",
      requestDemo: "Richiedi demo",
      patientPanel: "Pannello paziente",
      upcomingAppointments: "Prossimi appuntamenti",
      viewMyHistory: "Vedi la mia cartella",
      scheduleNewAppointment: "Prenota nuovo appuntamento",
      myUpcomingAppointments: "I miei prossimi appuntamenti",
      cancel: "Annulla",
      reschedule: "Riprogramma",
      noAppointments: "Nessun appuntamento",
      newDatePrompt: "Nuova data/ora (YYYY-MM-DDTHH:mm)",
      monthlyConsults: "Consulti al mese",
      doctorPanel: "Pannello medico",
      activeAppointments: "Appuntamenti attivi",
      manageAgenda: "Gestisci agenda",
      viewAssignedPatients: "Vedi pazienti assegnati",
      consults: "Consulti",
      patientsTitle: "I miei pazienti",
      searchPatientByName: "Cerca paziente per nome",
      record: "Cartella",
      lastDiagnosis: "Ultima diagnosi",
      lastUpdate: "Ultimo aggiornamento",
      viewHistory: "Vedi cartella",
      noData: "N/D"
    },
    pl: {
      login: "Zaloguj",
      searchDoctors: "Szukaj lekarzy",
      myAppointments: "Moje wizyty",
      myHistory: "Moja historia",
      urgent: "Pilne",
      myProfile: "Mój profil",
      logout: "Wyloguj",
      myAgenda: "Mój harmonogram",
      myPatients: "Moi pacjenci",
      newConsultation: "Nowa konsultacja",
      dashboard: "Panel",
      users: "Użytkownicy",
      specialties: "Specjalizacje",
      allRecords: "Wszystkie historie",
      loginTitle: "Logowanie do WaySalud",
      loginSubtitle: "Dostęp wg roli z symulowaną sesją w localStorage",
      email: "Email",
      password: "Hasło",
      enterAsPatient: "Wejdź jako Pacjent",
      enterAsDoctor: "Wejdź jako Lekarz",
      enterAsAdmin: "Wejdź jako Admin",
      accessDenied: "Brak dostępu",
      backToPanel: "Wróć do mojego panelu",
      homeTitle: "Bezpieczna telekonsultacja w kilka minut",
      homeSubtitle: "Połącz się ze specjalistami przez wideo, czat lub wizytę stacjonarną.",
      findSpecialist: "Znajdź specjalistę",
      urgentNow: "Pilna konsultacja teraz",
      searchTitle: "Wyszukiwanie specjalistów",
      searchByName: "Szukaj po nazwie",
      allSpecialties: "Wszystkie specjalizacje",
      videoConsultation: "Wideokonsultacja",
      onsite: "Stacjonarnie",
      search: "Szukaj",
      viewProfile: "Zobacz profil",
      bookNow: "Umów teraz",
      book: "Umów",
      availability: "Dostępność",
      available: "Dostępny",
      booking3steps: "Rezerwacja w 3 krokach",
      step1: "Krok 1",
      step2: "Krok 2",
      step3: "Krok 3",
      name: "Imię i nazwisko",
      reason: "Powód",
      confirmAppointment: "Potwierdź wizytę",
      selectDateTime: "Wybierz datę i godzinę",
      generalConsultation: "Konsultacja ogólna",
      appointmentConfirmed: "Wizyta potwierdzona",
      consultationRoom: "Pokój wideokonsultacji",
      enter: "Wejdź",
      patient: "Pacjent",
      medicalChat: "Czat medyczny",
      chatGreeting: "Cześć, jak się dziś czujesz?",
      writeMessage: "Napisz wiadomość...",
      attach: "Załącz",
      send: "Wyślij",
      memberships: "Plany",
      freePatient: "Darmowy pacjent",
      basicDoctor: "Lekarz podstawowy",
      premiumDoctor: "Lekarz premium",
      featured: "Polecany",
      clinicHospital: "Klinika / Szpital",
      customPricing: "Cena indywidualna",
      requestDemo: "Poproś o demo",
      patientPanel: "Panel pacjenta",
      upcomingAppointments: "Nadchodzące wizyty",
      viewMyHistory: "Zobacz moją historię",
      scheduleNewAppointment: "Umów nową wizytę",
      myUpcomingAppointments: "Moje nadchodzące wizyty",
      cancel: "Anuluj",
      reschedule: "Przełóż",
      noAppointments: "Brak wizyt",
      newDatePrompt: "Nowa data/godzina (YYYY-MM-DDTHH:mm)",
      monthlyConsults: "Konsultacje miesięcznie",
      doctorPanel: "Panel lekarza",
      activeAppointments: "Aktywne wizyty",
      manageAgenda: "Zarządzaj harmonogramem",
      viewAssignedPatients: "Zobacz przypisanych pacjentów",
      consults: "Konsultacje",
      patientsTitle: "Moi pacjenci",
      searchPatientByName: "Szukaj pacjenta po nazwie",
      record: "Historia",
      lastDiagnosis: "Ostatnia diagnoza",
      lastUpdate: "Ostatnia aktualizacja",
      viewHistory: "Zobacz historię",
      noData: "Brak danych"
    },
    tr: {
      login: "Giriş",
      searchDoctors: "Doktor ara",
      myAppointments: "Randevularım",
      myHistory: "Tıbbi geçmişim",
      urgent: "Acil",
      myProfile: "Profilim",
      logout: "Çıkış yap",
      myAgenda: "Ajandam",
      myPatients: "Hastalarım",
      newConsultation: "Yeni konsültasyon",
      dashboard: "Panel",
      users: "Kullanıcılar",
      specialties: "Uzmanlıklar",
      allRecords: "Tüm kayıtlar",
      loginTitle: "WaySalud girişi",
      loginSubtitle: "Rol bazlı erişim ve localStorage üzerinde simüle oturum",
      email: "E-posta",
      password: "Şifre",
      enterAsPatient: "Hasta olarak gir",
      enterAsDoctor: "Doktor olarak gir",
      enterAsAdmin: "Yönetici olarak gir",
      accessDenied: "Erişim reddedildi",
      backToPanel: "Panelime dön",
      homeTitle: "Dakikalar içinde güvenli telekonsültasyon",
      homeSubtitle: "Uzmanlarla video, sohbet veya yüz yüze görüşme ile bağlanın.",
      findSpecialist: "Uzman bul",
      urgentNow: "Şimdi acil konsültasyon",
      searchTitle: "Uzman arama",
      searchByName: "İsme göre ara",
      allSpecialties: "Tüm uzmanlıklar",
      videoConsultation: "Video konsültasyon",
      onsite: "Yüz yüze",
      search: "Ara",
      viewProfile: "Profili görüntüle",
      bookNow: "Hemen randevu al",
      book: "Randevu al",
      availability: "Uygunluk",
      available: "Uygun",
      booking3steps: "3 adımda randevu",
      step1: "Adım 1",
      step2: "Adım 2",
      step3: "Adım 3",
      name: "Ad Soyad",
      reason: "Neden",
      confirmAppointment: "Randevuyu onayla",
      selectDateTime: "Tarih ve saat seç",
      generalConsultation: "Genel konsültasyon",
      appointmentConfirmed: "Randevu onaylandı",
      consultationRoom: "Video konsültasyon odası",
      enter: "Gir",
      patient: "Hasta",
      medicalChat: "Tıbbi sohbet",
      chatGreeting: "Merhaba, bugün nasıl hissediyorsunuz?",
      writeMessage: "Mesajınızı yazın...",
      attach: "Ekle",
      send: "Gönder",
      memberships: "Üyelikler",
      freePatient: "Ücretsiz hasta",
      basicDoctor: "Temel doktor",
      premiumDoctor: "Premium doktor",
      featured: "Öne çıkan",
      clinicHospital: "Klinik / Hastane",
      customPricing: "Özel fiyatlandırma",
      requestDemo: "Demo iste",
      patientPanel: "Hasta paneli",
      upcomingAppointments: "Yaklaşan randevular",
      viewMyHistory: "Geçmişimi görüntüle",
      scheduleNewAppointment: "Yeni randevu planla",
      myUpcomingAppointments: "Yaklaşan randevularım",
      cancel: "İptal et",
      reschedule: "Yeniden planla",
      noAppointments: "Randevu yok",
      newDatePrompt: "Yeni tarih/saat (YYYY-MM-DDTHH:mm)",
      monthlyConsults: "Aylık konsültasyon",
      doctorPanel: "Doktor paneli",
      activeAppointments: "Aktif randevular",
      manageAgenda: "Ajandayı yönet",
      viewAssignedPatients: "Atanan hastaları görüntüle",
      consults: "Konsültasyonlar",
      patientsTitle: "Hastalarım",
      searchPatientByName: "İsme göre hasta ara",
      record: "Kayıt",
      lastDiagnosis: "Son teşhis",
      lastUpdate: "Son güncelleme",
      viewHistory: "Kaydı görüntüle",
      noData: "Yok"
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

  function roleClass(role) {
    if (role === "admin") return "badge-admin";
    if (role === "medico") return "badge-medico";
    return "badge-paciente";
  }

  function navLink(path, label, currentPath) {
    return `<a class="nav-link ${path === currentPath ? "active" : ""}" href="#${path}">${label}</a>`;
  }

  function navItem(path, label, currentPath, icon) {
    return `<a class="nav-item ${path === currentPath ? "active" : ""}" href="#${path}"><i class="nav-icon" data-lucide="${icon}"></i><span>${label}</span></a>`;
  }

  function renderShell() {
    const root = document.getElementById("root");
    const user = getSession();
    const path = getPath();

    const languageMarkup = `
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
    `;

    if (user) {
      root.innerHTML = `
        <div class="app-shell sidebar-shell">
          <aside class="sidebar" id="app-sidebar">
            <div class="sidebar-logo">
              <a class="logo" href="#/${user ? "" : "login"}">
                <i data-lucide="cross"></i>
                <span>WaySalud</span>
              </a>
            </div>
            <nav class="sidebar-nav">${buildRoleNav(path, user, true)}</nav>
          </aside>

          <div class="main-with-sidebar">
            <header class="topbar">
              <button id="sidebar-toggle" class="hamburger-btn" type="button" aria-label="Abrir menú">
                <i data-lucide="menu"></i>
              </button>
              <div class="topbar-right">
                ${languageMarkup}
                <span class="rol-badge ${roleClass(user.rol)}">${user.rol.toUpperCase()}</span>
                <span class="badge" style="padding:0.35rem 0.55rem;">
                  <img class="avatar" src="${getAvatar(user.nombre)}" alt="${user.nombre}" style="width:24px; height:24px;" />
                  <span>${user.nombre}</span>
                </span>
              </div>
            </header>

            <main><div class="container" id="view"></div></main>
          </div>

          <div id="mobile-overlay" class="mobile-overlay"></div>
        </div>
        <div id="toast" class="toast"></div>
      `;
    } else {
      const publicNav = `
        ${navLink("/login", "Home", path)}
        ${navLink("/login", "Quiénes Somos", path)}
        ${navLink("/login", "Portafolio", path)}
        ${navLink("/login", "Blog", path)}
        ${navLink("/login", "Contáctanos", path)}
        <a class="nav-link login-link" href="#/login">${tr("login")}</a>
      `;

      root.innerHTML = `
        <div class="app-shell">
          <header class="navbar" id="public-navbar">
            <div class="container navbar-inner">
              <a class="logo" href="#/login">
                <i data-lucide="cross"></i>
                <span>WaySalud</span>
              </a>

              <nav class="nav-links desktop-nav">${publicNav}</nav>

              <div class="navbar-actions">
                ${languageMarkup}
                <button class="hamburger-btn" id="drawer-open" type="button" aria-label="Abrir menú">
                  <i data-lucide="menu"></i>
                </button>
              </div>
            </div>
          </header>

          <aside class="mobile-drawer" id="mobile-drawer">
            <nav class="grid" style="gap:0.4rem;">${publicNav}</nav>
          </aside>
          <div id="mobile-overlay" class="mobile-overlay"></div>

          <main><div class="container" id="view"></div></main>

          <footer class="footer">
            <div class="container footer-grid">
              <div>
                <strong>WaySalud</strong>
                <p>Plataforma integral de telemedicina y gestión clínica.</p>
                <div class="badges">
                  <span class="badge">SSL</span>
                  <span class="badge">RGPD</span>
                  <span class="badge">ISO 27001</span>
                </div>
              </div>
              <div>
                <h4>Navegación</h4>
                <a class="footer-link" href="#/login">Home</a>
                <a class="footer-link" href="#/login">Quiénes somos</a>
                <a class="footer-link" href="#/login">Portafolio</a>
                <a class="footer-link" href="#/login">Blog</a>
              </div>
              <div>
                <h4>Legal</h4>
                <span class="footer-link">Política de privacidad</span>
                <span class="footer-link">Ley 1581/2012</span>
                <span class="footer-link">Ley 2015/2020</span>
              </div>
              <div>
                <h4>Contacto</h4>
                <span class="footer-link">comercial@waysalud.com</span>
                <div class="countries">
                  <img class="flag" src="https://flagcdn.com/24x18/co.png" alt="CO" />
                  <img class="flag" src="https://flagcdn.com/24x18/us.png" alt="US" />
                  <img class="flag" src="https://flagcdn.com/24x18/br.png" alt="BR" />
                </div>
              </div>
            </div>
            <div class="container footer-bottom">© 2024 WaySalud · Autoría: WaySalud · Todos los derechos reservados</div>
          </footer>
        </div>
        <div id="toast" class="toast"></div>
      `;
    }

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

    const sidebar = document.getElementById("app-sidebar");
    const overlay = document.getElementById("mobile-overlay");
    const sidebarToggle = document.getElementById("sidebar-toggle");

    sidebarToggle?.addEventListener("click", () => {
      sidebar?.classList.toggle("open");
      overlay?.classList.toggle("show");
    });

    const drawer = document.getElementById("mobile-drawer");
    const drawerOpen = document.getElementById("drawer-open");
    drawerOpen?.addEventListener("click", () => {
      drawer?.classList.add("open");
      overlay?.classList.add("show");
    });

    overlay?.addEventListener("click", () => {
      drawer?.classList.remove("open");
      sidebar?.classList.remove("open");
      overlay.classList.remove("show");
    });

    if (!user) {
      const navbar = document.getElementById("public-navbar");
      const onScroll = () => {
        navbar?.classList.toggle("scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    initIcons();
  }

  function buildRoleNav(currentPath, user, sidebarMode = false) {
    if (!user) return navLink("/login", tr("login"), currentPath);

    if (sidebarMode && user.rol === "paciente") {
      return [
        navItem("/buscar", tr("searchDoctors"), currentPath, "search"),
        navItem("/panel", tr("myAppointments"), currentPath, "calendar-days"),
        navItem("/mi-historia", tr("myHistory"), currentPath, "file-heart"),
        navItem("/urgencias", tr("urgent"), currentPath, "siren"),
        navItem("/panel", tr("myProfile"), currentPath, "user"),
        `<a href="#" class="nav-item" data-logout="1"><i class="nav-icon" data-lucide="log-out"></i><span>${tr("logout")}</span></a>`
      ].join("");
    }

    if (sidebarMode && user.rol === "medico") {
      return [
        navItem("/mi-agenda", tr("myAgenda"), currentPath, "calendar-check"),
        navItem("/mis-pacientes", tr("myPatients"), currentPath, "users"),
        navItem("/panel-medico", tr("newConsultation"), currentPath, "stethoscope"),
        navItem("/panel-medico", tr("myProfile"), currentPath, "user"),
        `<a href="#" class="nav-item" data-logout="1"><i class="nav-icon" data-lucide="log-out"></i><span>${tr("logout")}</span></a>`
      ].join("");
    }

    if (sidebarMode) {
      return [
        navItem("/admin", tr("dashboard"), currentPath, "layout-dashboard"),
        navItem("/admin/usuarios", tr("users"), currentPath, "user-cog"),
        navItem("/admin/especialidades", tr("specialties"), currentPath, "heart-pulse"),
        navItem("/admin", tr("allRecords"), currentPath, "file-stack"),
        `<a href="#" class="nav-item" data-logout="1"><i class="nav-icon" data-lucide="log-out"></i><span>${tr("logout")}</span></a>`
      ].join("");
    }

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

    renderHome();
    view.insertAdjacentHTML(
      "afterbegin",
      `
      <section class="card" style="max-width:680px; margin:0 auto 1rem;">
        <h2 class="section-title">Ingreso a WaySalud</h2>
        <p class="section-subtitle">Acceso por rol con sesión simulada en localStorage</p>
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
    `
    );

    view.querySelector("#login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const result = rolesApi.login(view.querySelector("#login-email").value.trim(), view.querySelector("#login-pass").value.trim());
      if (!result.ok) return showToast(result.error);
      location.hash = rolesApi.getHomeRouteByRole(result.user.rol);
    });

    view.querySelectorAll("[data-demo-login]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const examples = {
          paciente: ["laura@waysalud.com", "paciente123"],
          medico: ["carlos@waysalud.com", "medico123"],
          admin: ["admin@waysalud.com", "admin123"]
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
            <span class="hero-badge">Software WaySalud</span>
            <h1>${tr("homeTitle")}</h1>
            <p>${tr("homeSubtitle")}</p>
            <div class="inline-actions">
              <a class="btn-primary" href="#/buscar">${tr("findSpecialist")}</a>
            </div>
          </div>
          <div class="hero-mockup">
            <img class="context-media" src="${CONTEXT_IMAGES.home}" alt="Telemedicina con especialista" />
            <span class="mockup-badge b1">Agenda en línea</span>
            <span class="mockup-badge b2">RIPS</span>
            <span class="mockup-badge b3">Docencia-Serv.</span>
          </div>
        </div>
      </section>

      <section class="aliados-wrap">
        <div class="aliados-track">
          <div class="aliado-item">Aliado Norte</div>
          <div class="aliado-item">Clínica Vital</div>
          <div class="aliado-item">Hospital Central</div>
          <div class="aliado-item">Salud Plus</div>
          <div class="aliado-item">Red Médica</div>
          <div class="aliado-item">Aliado Norte</div>
          <div class="aliado-item">Clínica Vital</div>
          <div class="aliado-item">Hospital Central</div>
          <div class="aliado-item">Salud Plus</div>
          <div class="aliado-item">Red Médica</div>
        </div>
      </section>

      <section class="why-section" style="margin-top:1rem;">
        <div class="center-head">
          <h2 class="section-title">¿Por qué WaySalud?</h2>
          <p class="section-subtitle">Diseñado para pacientes, médicos e instituciones con enfoque en experiencia y resultados.</p>
        </div>
        <div class="segment-grid">
          <article class="segmento-card">
            <i data-lucide="building-2" class="segmento-icon"></i>
            <h3>Instituciones</h3>
            <p>Gestión clínica unificada, reportes y trazabilidad completa.</p>
            <div class="segmento-media"><i data-lucide="bar-chart-3"></i></div>
          </article>
          <article class="segmento-card">
            <i data-lucide="stethoscope" class="segmento-icon"></i>
            <h3>Profesionales</h3>
            <p>Agenda inteligente, historia clínica y seguimiento continuo.</p>
            <div class="segmento-media"><i data-lucide="calendar-check-2"></i></div>
          </article>
          <article class="segmento-card">
            <i data-lucide="heart-pulse" class="segmento-icon"></i>
            <h3>Pacientes</h3>
            <p>Atención oportuna, teleconsulta y experiencia digital intuitiva.</p>
            <div class="segmento-media"><i data-lucide="shield-check"></i></div>
          </article>
        </div>
      </section>

      <section class="card" style="margin-top:1rem;">
        <h2 class="section-title">Características</h2>
        <div class="tab-nav" id="feature-tabs">
          <button class="tab-btn active" data-feature-tab="agendamiento">Agendamiento</button>
          <button class="tab-btn" data-feature-tab="historia">Historia Clínica</button>
          <button class="tab-btn" data-feature-tab="firma">Firma Digital</button>
          <button class="tab-btn" data-feature-tab="teleconsulta">Teleconsulta</button>
          <button class="tab-btn" data-feature-tab="reportes">Reportes</button>
          <button class="tab-btn" data-feature-tab="rips">RIPS</button>
          <button class="tab-btn" data-feature-tab="alcance">Alcance</button>
        </div>
        <div class="feature-pane" id="feature-pane"></div>
      </section>

      <section style="margin-top:1rem;">
        <div class="modalidades-grid">
          <article class="card modalidad-card">
            <h3>🏥 Intramural</h3>
            <p>Atención en sedes clínicas con trazabilidad completa.</p>
            <a class="learn-more" href="#/buscar">Aprende más →</a>
          </article>
          <article class="card modalidad-card">
            <h3>🏠 Salud en Casa</h3>
            <p>Visitas y seguimiento remoto con historia clínica integrada.</p>
            <a class="learn-more" href="#/buscar">Aprende más →</a>
          </article>
          <article class="card modalidad-card">
            <h3>📹 Teleconsulta</h3>
            <p>Consulta virtual segura y comunicación médico-paciente continua.</p>
            <a class="learn-more" href="#/consulta">Aprende más →</a>
          </article>
        </div>
      </section>

      <section class="cta-banner">
        <h2>¿Listo para transformar tu atención en salud?</h2>
        <a class="btn-outline" href="#/buscar">${tr("findSpecialist")}</a>
      </section>

      <section class="card" style="margin-top:1rem;">
        <div class="center-head">
          <h2 class="section-title">Cómo funciona</h2>
        </div>
        <div class="how-video"><i data-lucide="play-circle"></i></div>
        <div class="counter-grid" id="counter-grid">
          <div class="counter-item"><strong data-counter="1200">0</strong><div>Consultas/mes</div></div>
          <div class="counter-item"><strong data-counter="95">0</strong><div>Satisfacción (%)</div></div>
          <div class="counter-item"><strong data-counter="40">0</strong><div>Menos inasistencias (%)</div></div>
          <div class="counter-item"><strong data-counter="24">0</strong><div>Ciudades activas</div></div>
        </div>
      </section>

      <section class="card" style="margin-top:1rem;">
        <div class="contact-grid">
          <div>
            <div class="center-head" style="text-align:left; margin:0 0 1rem;">
              <h2 class="section-title">Contáctanos</h2>
            </div>
            <form id="home-contact-form" class="grid" style="gap:0.75rem;">
              <input class="form-input" placeholder="Nombre completo" required />
              <div class="form-row">
                <input class="form-input" type="tel" placeholder="Celular" required />
                <input class="form-input" type="email" placeholder="Email" required />
              </div>
              <div class="inline-actions" style="gap:1rem;">
                <label><input type="radio" name="perfil-contacto" value="estudiante" checked /> Estudiante</label>
                <label><input type="radio" name="perfil-contacto" value="profesional" /> Profesional</label>
                <label><input type="radio" name="perfil-contacto" value="empresa" /> Empresa</label>
              </div>
              <textarea class="form-input" rows="3" placeholder="Comentarios adicionales"></textarea>
              <label><input type="checkbox" required /> Autorizo tratamiento de datos (Ley 1581)</label>
              <button type="submit" class="btn-submit">Aceptar</button>
            </form>
          </div>
          <div class="card" style="display:grid; place-items:center; background:var(--ws-teal-bg);">
            <i data-lucide="headset" style="width:64px; height:64px; color:var(--ws-azul);"></i>
          </div>
        </div>
      </section>

      <section class="card" style="margin-top:1rem;">
        <h2 class="section-title">Explora WaySalud</h2>
        <div class="bento-grid">
          <a class="bento-cell" href="#/buscar"><span class="bento-arrow">↗</span><h3>Buscar especialistas</h3><p>Encuentra disponibilidad en segundos.</p></a>
          <a class="bento-cell" href="#/agendar"><span class="bento-arrow">↗</span><h3>Agendar</h3><p>Reserva en tres pasos.</p></a>
          <a class="bento-cell" href="#/mi-historia"><span class="bento-arrow">↗</span><h3>Historia clínica</h3><p>Consulta tu evolución médica.</p></a>
          <a class="bento-cell" href="#/planes"><span class="bento-arrow">↗</span><h3>Planes</h3><p>Opciones para profesionales e instituciones.</p></a>
          <a class="bento-cell" href="#/urgencias"><span class="bento-arrow">↗</span><h3>Urgencias</h3><p>Conexión inmediata con triage digital.</p></a>
        </div>
      </section>
    `;

    setupFeatureTabs();
    setupCounters();
    document.getElementById("home-contact-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Solicitud enviada correctamente");
    });
  }

  function setupFeatureTabs() {
    const pane = document.getElementById("feature-pane");
    const tabs = document.querySelectorAll("[data-feature-tab]");
    if (!pane || !tabs.length) return;

    const map = {
      agendamiento: {
        title: "Agendamiento inteligente",
        points: ["Disponibilidad en tiempo real", "Confirmación automática", "Recordatorios multicanal"],
        impact: "Reduce 40% las inasistencias"
      },
      historia: {
        title: "Historia clínica unificada",
        points: ["Evolución longitudinal", "Adjuntos clínicos", "Control por roles"],
        impact: "Mejora continuidad asistencial"
      },
      firma: {
        title: "Firma digital",
        points: ["Consentimientos en línea", "Recetas y órdenes", "Trazabilidad jurídica"],
        impact: "Agiliza cierres de consulta"
      },
      teleconsulta: {
        title: "Teleconsulta segura",
        points: ["Videollamada integrada", "Chat clínico", "Sala de espera virtual"],
        impact: "Cobertura remota ampliada"
      },
      reportes: {
        title: "Reportes ejecutivos",
        points: ["Indicadores clave", "Gráficas dinámicas", "Exportación operativa"],
        impact: "Decisiones con datos en tiempo real"
      },
      rips: {
        title: "RIPS",
        points: ["Estructuración estandarizada", "Validación de datos", "Integración administrativa"],
        impact: "Reduce reprocesos en facturación"
      },
      alcance: {
        title: "Alcance institucional",
        points: ["Intramural", "Salud en casa", "Telemedicina"],
        impact: "Modelo híbrido escalable"
      }
    };

    const render = (key) => {
      const cfg = map[key] || map.agendamiento;
      pane.innerHTML = `
        <div class="feature-visual"><i data-lucide="monitor-smartphone"></i></div>
        <div>
          <h3>${cfg.title}</h3>
          <ul class="feature-list">
            ${cfg.points.map((p) => `<li>✓ ${p}</li>`).join("")}
          </ul>
          <p><strong>${cfg.impact}</strong></p>
        </div>
      `;
      initIcons();
    };

    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabs.forEach((x) => x.classList.remove("active"));
        btn.classList.add("active");
        render(btn.dataset.featureTab);
      });
    });

    render("agendamiento");
  }

  function setupCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    const animateCounter = (el) => {
      const target = Number(el.dataset.counter || 0);
      const duration = 1100;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.round(target * progress);
        el.textContent = value.toString();
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    counters.forEach((el) => observer.observe(el));
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

      state.appointment = { specialist: sp, roomName: `WaySalud-${sp.fullName.replace(/\W+/g, "")}-${Date.now()}`, patientName: user.nombre };
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
    view.querySelector("#start-video").addEventListener("click", () => mountJitsi("jitsi-container", appointment?.roomName || `WaySalud-Demo-${Date.now()}`, appointment?.patientName || tr("patient")));
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
    document.getElementById("launch-urgent").addEventListener("click", () => mountJitsi("urgent-jitsi-container", `WaySalud-Guardia-${Date.now()}`, `${tr("patient")} ${tr("urgent")}`));
  }

  function renderPlanes() {
    document.getElementById("view").innerHTML = `<section class="card"><h2 class="section-title">${tr("memberships")}</h2><div class="grid grid-2"><article class="card"><h3>${tr("freePatient")}</h3><p><strong>${formatCOP(0)}</strong>/mes</p></article><article class="card"><h3>${tr("basicDoctor")}</h3><p><strong>${formatCOP(150000)}</strong>/mes</p></article><article class="card plan-premium"><h3>${tr("premiumDoctor")}</h3><p><strong>${formatCOP(280000)}</strong>/mes</p><span class="badge success">${tr("featured")}</span></article><article class="card"><h3>${tr("clinicHospital")}</h3><p><strong>${tr("customPricing")}</strong></p><button class="btn-outline">${tr("requestDemo")}</button></article></div></section><section class="card" style="margin-top:1rem;"><canvas id="plan-chart"></canvas></section>`;
    state.chartInstances.push(new Chart(document.getElementById("plan-chart"), { type: "doughnut", data: { labels: [tr("freePatient"), tr("basicDoctor"), tr("premiumDoctor"), tr("clinicHospital")], datasets: [{ data: [52, 22, 18, 8], backgroundColor: ["#bfdbfe", "#60a5fa", "#1a73e8", "#1e3a8a"] }] } }));
  }

  function renderPanelPaciente(user) {
  const citas = agendaApi.getCitas().filter((c) => c.pacienteId === user.id && c.estado !== "cancelada");
  document.getElementById("view").innerHTML = `<section class="grid grid-3"><article class="stat-card"><span class="stat-label">${tr("upcomingAppointments")}</span><strong class="stat-value">${citas.length}</strong><span class="stat-delta">+8% vs mes anterior</span></article><article class="stat-card"><span class="stat-label">Estado</span><strong class="stat-value">Activo</strong><span class="stat-delta">Cuenta operativa</span></article><article class="stat-card"><span class="stat-label">Canal</span><strong class="stat-value">Digital</strong><span class="stat-delta">Video + chat + presencial</span></article></section><section class="card" style="margin-top:1rem;"><img class="context-media" src="${CONTEXT_IMAGES.patientPanel}" alt="Paciente en consulta remota" style="margin-bottom:0.8rem;" /><h2 class="section-title">${tr("patientPanel")}</h2><p>${tr("upcomingAppointments")}: <strong>${citas.length}</strong></p><div class="inline-actions"><a class="btn-outline" href="#/mi-historia">${tr("viewMyHistory")}</a><a class="btn-outline" href="#/buscar">${tr("scheduleNewAppointment")}</a></div></section><section class="card" style="margin-top:1rem;"><h3>${tr("myUpcomingAppointments")}</h3>${citas.map((c) => `<div class="card" style="margin-bottom:0.5rem;"><strong>${new Date(c.fechaInicio).toLocaleString()}</strong> · ${c.medicoNombre} · ${c.tipo} · ${c.estado}<div class="inline-actions" style="margin-top:0.4rem;"><button class="btn-outline" data-cancel-cita="${c.id}">${tr("cancel")}</button><button class="btn-outline" data-reschedule-cita="${c.id}">${tr("reschedule")}</button></div></div>`).join("") || `<p>${tr("noAppointments")}</p>`}</section><section class="grid grid-2" style="margin-top:1rem;"><article class="card"><canvas id="patient-line"></canvas></article><article class="card"><div id="clinic-map" style="height:300px;"></div></article></section>`;

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
    document.getElementById("view").innerHTML = `<section class="grid grid-3"><article class="stat-card"><span class="stat-label">${tr("activeAppointments")}</span><strong class="stat-value">${citas.length}</strong><span class="stat-delta">+12% productividad</span></article><article class="stat-card"><span class="stat-label">Agenda</span><strong class="stat-value">Completa</strong><span class="stat-delta">Slots optimizados</span></article><article class="stat-card"><span class="stat-label">Satisfacción</span><strong class="stat-value">95%</strong><span class="stat-delta">Tendencia positiva</span></article></section><section class="card" style="margin-top:1rem;"><img class="context-media" src="${CONTEXT_IMAGES.doctorPanel}" alt="Médico revisando su panel" style="margin-bottom:0.8rem;" /><h2 class="section-title">${tr("doctorPanel")}</h2><p>${tr("activeAppointments")}: <strong>${citas.length}</strong></p><div class="inline-actions"><a class="btn-outline" href="#/mi-agenda">${tr("manageAgenda")}</a><a class="btn-outline" href="#/mis-pacientes">${tr("viewAssignedPatients")}</a></div></section><section class="grid grid-2" style="margin-top:1rem;"><article class="card"><canvas id="doctor-line"></canvas></article><article class="card"><canvas id="doctor-donut"></canvas></article></section>`;
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
