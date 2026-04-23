// Configuración global de i18next con traducciones ES / EN / PT.
(function setupI18nModule() {
  const resources = {
    es: {
      translation: {
        appName: "WaySalud",
        nav: {
          home: "Inicio",
          search: "Buscar",
          profile: "Perfil",
          schedule: "Agendar",
          consult: "Consulta",
          chat: "Chat",
          urgent: "Urgencias",
          plans: "Planes",
          patientPanel: "Panel paciente",
          doctorPanel: "Panel médico"
        },
        langLabel: "Idioma",
        common: {
          specialty: "Especialidad",
          consultationType: "Tipo de consulta",
          dateTime: "Fecha y hora",
          search: "Buscar",
          select: "Seleccionar",
          continue: "Continuar",
          scheduleNow: "Agendar ahora",
          startNow: "Iniciar ahora",
          send: "Enviar",
          stars: "estrellas",
          and: "y",
          month: "mes"
        },
        consultationTypes: {
          video: "Videoconsulta",
          chat: "Chat",
          onsite: "Presencial"
        },
        specialties: {
          general: "Medicina general",
          cardiology: "Cardiología",
          dermatology: "Dermatología",
          pediatrics: "Pediatría",
          psychology: "Psicología",
          gynecology: "Ginecología",
          neurology: "Neurología",
          nutrition: "Nutrición"
        },
        home: {
          title: "Teleconsulta segura en minutos",
          subtitle: "Conecta con especialistas certificados por videollamada, chat o consulta presencial.",
          cta: "Encontrar especialista",
          urgentCta: "Consulta urgente ahora",
          whyTitle: "¿Por qué WaySalud?",
          why1: "Atención remota 24/7",
          why2: "Profesionales verificados",
          why3: "Historia clínica digital",
          why4: "Agenda flexible",
          why5: "Pagos y planes simples",
          why6: "Cumplimiento RGPD e ISO 27001",
          statsTitle: "Plataforma en números",
          statDoctors: "Especialistas activos",
          statConsults: "Consultas del último mes",
          statCountries: "Países operativos",
          statResponse: "Tiempo promedio de respuesta"
        },
        searchPage: {
          title: "Búsqueda de especialistas",
          subtitle: "Filtra por especialidad, fecha y modalidad para agendar en 3 pasos.",
          minPrice: "Precio desde",
          profile: "Ver perfil",
          noResults: "No hay resultados con los filtros actuales."
        },
        profilePage: {
          about: "Acerca del especialista",
          availability: "Disponibilidad semanal",
          chooseSlot: "Selecciona un horario en el calendario"
        },
        schedulePage: {
          title: "Agendamiento de cita",
          step1: "Paso 1: Modalidad",
          step2: "Paso 2: Datos del paciente",
          step3: "Paso 3: Confirmación y pago simulado",
          patientName: "Nombre completo",
          patientEmail: "Correo electrónico",
          patientPhone: "Teléfono",
          reason: "Motivo de consulta",
          summary: "Resumen de la cita",
          payment: "Método de pago (simulado)",
          card: "Tarjeta",
          pse: "PSE",
          cash: "Efectivo en clínica",
          confirm: "Confirmar cita",
          confirmedToast: "Cita confirmada con éxito"
        },
        consultPage: {
          title: "Sala de videoconsulta",
          waiting: "Sala de espera",
          startsIn: "La consulta inicia en",
          roomReady: "La sala está lista para ingresar",
          startVideo: "Entrar a la videollamada"
        },
        chatPage: {
          title: "Chat médico",
          subtitle: "Conserva conversaciones y comparte archivos adjuntos sin salir de la plataforma.",
          placeholder: "Escribe tu mensaje...",
          attach: "Adjuntar",
          autoReply: "Mensaje recibido. Te respondo en breve con indicaciones."
        },
        urgentPage: {
          title: "Urgencias médicas",
          subtitle: "Te conectamos con médico de guardia en la menor espera posible.",
          queue: "Tiempo estimado en cola",
          launch: "Lanzar consulta urgente",
          onCallDoctor: "Médico de guardia",
          highPriority: "Prioridad alta"
        },
        plansPage: {
          title: "Membresías",
          subtitle: "Escoge el plan que mejor se adapta a tu perfil.",
          freePatient: "Gratuito paciente",
          basicDoctor: "Básico médico",
          premiumDoctor: "Premium médico",
          clinic: "Clínica / Hospital",
          monthPrice: "mes",
          customPrice: "Precio personalizado",
          requestDemo: "Solicitar demo",
          highlighted: "Más elegido",
          compare: "Tabla comparativa",
          usersByPlan: "Distribución de usuarios por plan",
          featureHeader: "Característica",
          featureVideo: "Videoconsulta",
          featureChat: "Chat médico",
          featureDashboard: "Panel estadístico",
          featureWhiteLabel: "Integración marca blanca"
        },
        panelPage: {
          title: "Panel del paciente",
          consultsMonth: "Consultas por mes",
          consultType: "Distribución por tipo",
          topSpecialties: "Especialidades más consultadas",
          hce: "Expediente clínico digital",
          map: "Clínicas presenciales en Bogotá",
          tableDate: "Fecha",
          tableSpecialty: "Especialidad",
          tableDiagnosis: "Diagnóstico",
          tableTreatment: "Tratamiento"
        },
        doctorPanelPage: {
          title: "Panel del médico",
          agenda: "Agenda semanal",
          monthlyConsults: "Consultas realizadas",
          channelMix: "Mix por canal"
        },
        footer: {
          security: "Seguridad",
          countries: "Países operativos",
          rights: "Todos los derechos reservados"
        },
        messages: {
          requiredFields: "Completa los campos requeridos",
          demoRequested: "Demo solicitada. Te contactaremos pronto.",
          roomActive: "Sala activa: {{roomName}}"
        }
      }
    },
    en: {
      translation: {
        appName: "WaySalud",
        nav: {
          home: "Home",
          search: "Search",
          profile: "Profile",
          schedule: "Schedule",
          consult: "Consultation",
          chat: "Chat",
          urgent: "Urgent care",
          plans: "Plans",
          patientPanel: "Patient panel",
          doctorPanel: "Doctor panel"
        },
        langLabel: "Language",
        common: {
          specialty: "Specialty",
          consultationType: "Consultation type",
          dateTime: "Date and time",
          search: "Search",
          select: "Select",
          continue: "Continue",
          scheduleNow: "Book now",
          startNow: "Start now",
          send: "Send",
          stars: "stars",
          and: "and",
          month: "month"
        },
        consultationTypes: {
          video: "Video consultation",
          chat: "Chat",
          onsite: "In-person"
        },
        specialties: {
          general: "General medicine",
          cardiology: "Cardiology",
          dermatology: "Dermatology",
          pediatrics: "Pediatrics",
          psychology: "Psychology",
          gynecology: "Gynecology",
          neurology: "Neurology",
          nutrition: "Nutrition"
        },
        home: {
          title: "Secure teleconsultation in minutes",
          subtitle: "Connect with certified specialists via video call, chat, or in-person care.",
          cta: "Find specialist",
          urgentCta: "Urgent consultation now",
          whyTitle: "Why WaySalud?",
          why1: "24/7 remote care",
          why2: "Verified professionals",
          why3: "Digital medical record",
          why4: "Flexible scheduling",
          why5: "Simple payments and plans",
          why6: "GDPR and ISO 27001 compliance",
          statsTitle: "Platform in numbers",
          statDoctors: "Active specialists",
          statConsults: "Consultations last month",
          statCountries: "Operating countries",
          statResponse: "Average response time"
        },
        searchPage: {
          title: "Specialist search",
          subtitle: "Filter by specialty, date, and modality to book in 3 steps.",
          minPrice: "Starting at",
          profile: "View profile",
          noResults: "No results match your current filters."
        },
        profilePage: {
          about: "About the specialist",
          availability: "Weekly availability",
          chooseSlot: "Pick a timeslot in the calendar"
        },
        schedulePage: {
          title: "Appointment booking",
          step1: "Step 1: Modality",
          step2: "Step 2: Patient details",
          step3: "Step 3: Confirmation and simulated payment",
          patientName: "Full name",
          patientEmail: "Email",
          patientPhone: "Phone",
          reason: "Reason for consultation",
          summary: "Appointment summary",
          payment: "Payment method (simulated)",
          card: "Card",
          pse: "Bank transfer",
          cash: "Cash at clinic",
          confirm: "Confirm appointment",
          confirmedToast: "Appointment confirmed successfully"
        },
        consultPage: {
          title: "Video consultation room",
          waiting: "Waiting room",
          startsIn: "The consultation starts in",
          roomReady: "Room is ready to join",
          startVideo: "Join video call"
        },
        chatPage: {
          title: "Medical chat",
          subtitle: "Keep conversations and attach files without leaving the platform.",
          placeholder: "Write your message...",
          attach: "Attach",
          autoReply: "Message received. I will reply shortly with guidance."
        },
        urgentPage: {
          title: "Medical urgent care",
          subtitle: "We connect you with an on-call doctor with minimum waiting time.",
          queue: "Estimated queue time",
          launch: "Launch urgent consultation",
          onCallDoctor: "On-call doctor",
          highPriority: "High priority"
        },
        plansPage: {
          title: "Membership plans",
          subtitle: "Choose the plan that best fits your profile.",
          freePatient: "Free patient",
          basicDoctor: "Basic doctor",
          premiumDoctor: "Premium doctor",
          clinic: "Clinic / Hospital",
          monthPrice: "month",
          customPrice: "Custom pricing",
          requestDemo: "Request demo",
          highlighted: "Most popular",
          compare: "Comparison table",
          usersByPlan: "Users distribution by plan",
          featureHeader: "Feature",
          featureVideo: "Video consultation",
          featureChat: "Medical chat",
          featureDashboard: "Analytics dashboard",
          featureWhiteLabel: "White-label integration"
        },
        panelPage: {
          title: "Patient dashboard",
          consultsMonth: "Consultations per month",
          consultType: "Consultation type split",
          topSpecialties: "Most consulted specialties",
          hce: "Digital health record",
          map: "In-person clinics in Bogotá",
          tableDate: "Date",
          tableSpecialty: "Specialty",
          tableDiagnosis: "Diagnosis",
          tableTreatment: "Treatment"
        },
        doctorPanelPage: {
          title: "Doctor dashboard",
          agenda: "Weekly agenda",
          monthlyConsults: "Consultations completed",
          channelMix: "Channel mix"
        },
        footer: {
          security: "Security",
          countries: "Operating countries",
          rights: "All rights reserved"
        },
        messages: {
          requiredFields: "Please complete the required fields",
          demoRequested: "Demo requested. We will contact you soon.",
          roomActive: "Active room: {{roomName}}"
        }
      }
    },
    pt: {
      translation: {
        appName: "WaySalud",
        nav: {
          home: "Início",
          search: "Buscar",
          profile: "Perfil",
          schedule: "Agendar",
          consult: "Consulta",
          chat: "Chat",
          urgent: "Urgências",
          plans: "Planos",
          patientPanel: "Painel paciente",
          doctorPanel: "Painel médico"
        },
        langLabel: "Idioma",
        common: {
          specialty: "Especialidade",
          consultationType: "Tipo de consulta",
          dateTime: "Data e hora",
          search: "Buscar",
          select: "Selecionar",
          continue: "Continuar",
          scheduleNow: "Agendar agora",
          startNow: "Iniciar agora",
          send: "Enviar",
          stars: "estrelas",
          and: "e",
          month: "mês"
        },
        consultationTypes: {
          video: "Video consulta",
          chat: "Chat",
          onsite: "Presencial"
        },
        specialties: {
          general: "Clínica geral",
          cardiology: "Cardiologia",
          dermatology: "Dermatologia",
          pediatrics: "Pediatria",
          psychology: "Psicologia",
          gynecology: "Ginecologia",
          neurology: "Neurologia",
          nutrition: "Nutrição"
        },
        home: {
          title: "Teleconsulta segura em minutos",
          subtitle: "Conecte-se com especialistas certificados por vídeo, chat ou consulta presencial.",
          cta: "Encontrar especialista",
          urgentCta: "Consulta urgente agora",
          whyTitle: "Por que WaySalud?",
          why1: "Atendimento remoto 24/7",
          why2: "Profissionais verificados",
          why3: "Prontuário digital",
          why4: "Agenda flexível",
          why5: "Pagamentos e planos simples",
          why6: "Conformidade RGPD e ISO 27001",
          statsTitle: "Plataforma em números",
          statDoctors: "Especialistas ativos",
          statConsults: "Consultas no último mês",
          statCountries: "Países operacionais",
          statResponse: "Tempo médio de resposta"
        },
        searchPage: {
          title: "Busca de especialistas",
          subtitle: "Filtre por especialidade, data e modalidade para agendar em 3 passos.",
          minPrice: "A partir de",
          profile: "Ver perfil",
          noResults: "Não há resultados para os filtros atuais."
        },
        profilePage: {
          about: "Sobre o especialista",
          availability: "Disponibilidade semanal",
          chooseSlot: "Selecione um horário no calendário"
        },
        schedulePage: {
          title: "Agendamento de consulta",
          step1: "Passo 1: Modalidade",
          step2: "Passo 2: Dados do paciente",
          step3: "Passo 3: Confirmação e pagamento simulado",
          patientName: "Nome completo",
          patientEmail: "E-mail",
          patientPhone: "Telefone",
          reason: "Motivo da consulta",
          summary: "Resumo da consulta",
          payment: "Método de pagamento (simulado)",
          card: "Cartão",
          pse: "Transferência",
          cash: "Dinheiro na clínica",
          confirm: "Confirmar consulta",
          confirmedToast: "Consulta confirmada com sucesso"
        },
        consultPage: {
          title: "Sala de videoconsulta",
          waiting: "Sala de espera",
          startsIn: "A consulta começa em",
          roomReady: "A sala está pronta para entrar",
          startVideo: "Entrar na chamada"
        },
        chatPage: {
          title: "Chat médico",
          subtitle: "Mantenha conversas e compartilhe anexos sem sair da plataforma.",
          placeholder: "Digite sua mensagem...",
          attach: "Anexar",
          autoReply: "Mensagem recebida. Responderei em breve com orientações."
        },
        urgentPage: {
          title: "Urgências médicas",
          subtitle: "Conectamos você ao médico de plantão com mínima espera.",
          queue: "Tempo estimado de fila",
          launch: "Iniciar consulta urgente",
          onCallDoctor: "Médico de plantão",
          highPriority: "Alta prioridade"
        },
        plansPage: {
          title: "Planos de assinatura",
          subtitle: "Escolha o plano ideal para seu perfil.",
          freePatient: "Paciente gratuito",
          basicDoctor: "Médico básico",
          premiumDoctor: "Médico premium",
          clinic: "Clínica / Hospital",
          monthPrice: "mês",
          customPrice: "Preço personalizado",
          requestDemo: "Solicitar demo",
          highlighted: "Mais escolhido",
          compare: "Tabela comparativa",
          usersByPlan: "Distribuição de usuários por plano",
          featureHeader: "Recurso",
          featureVideo: "Video consulta",
          featureChat: "Chat médico",
          featureDashboard: "Painel analítico",
          featureWhiteLabel: "Integração white-label"
        },
        panelPage: {
          title: "Painel do paciente",
          consultsMonth: "Consultas por mês",
          consultType: "Distribuição por tipo",
          topSpecialties: "Especialidades mais consultadas",
          hce: "Prontuário digital",
          map: "Clínicas presenciais em Bogotá",
          tableDate: "Data",
          tableSpecialty: "Especialidade",
          tableDiagnosis: "Diagnóstico",
          tableTreatment: "Tratamento"
        },
        doctorPanelPage: {
          title: "Painel do médico",
          agenda: "Agenda semanal",
          monthlyConsults: "Consultas realizadas",
          channelMix: "Mix por canal"
        },
        footer: {
          security: "Segurança",
          countries: "Países operacionais",
          rights: "Todos os direitos reservados"
        },
        messages: {
          requiredFields: "Preencha os campos obrigatórios",
          demoRequested: "Demo solicitada. Entraremos em contato em breve.",
          roomActive: "Sala ativa: {{roomName}}"
        }
      }
    }
  };

  window.i18nSetup = async (lng) => {
    await i18next.init({
      lng,
      fallbackLng: "es",
      resources,
      interpolation: { escapeValue: false }
    });
    return i18next;
  };
})();
