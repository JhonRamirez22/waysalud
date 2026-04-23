# MediConnect (Prototipo SPA)

Plataforma de telemedicina en **HTML + CSS + JavaScript vanilla** con enrutamiento por hash y datos simulados en `localStorage`.

## Módulos incluidos

- Autenticación y roles simulados (`paciente`, `medico`, `admin`)
- Historia clínica digital con permisos por rol
- Agenda flexible del médico con FullCalendar
- Panel de administración (usuarios y especialidades)
- Videoconsulta embebida con Jitsi
- Dashboard con Chart.js y mapa con Leaflet

## Archivos clave

- `index.html` → shell + carga de CDNs y módulos
- `styles.css` → estilos globales y responsive
- `i18n.js` → recursos de traducción base ES/EN/PT
- `app.js` → router SPA, navegación y páginas
- `roles.js` → sesión, guards, initData, permisos
- `historia.js` → lectura/edición de historias clínicas
- `agenda.js` → agenda médica, slots y citas
- `admin.js` → dashboards y administración de usuarios/especialidades
- `assets/images` → imágenes contextuales para hero, búsqueda, perfil, urgencias y paneles

## Persistencia en localStorage

- `mc_usuarios`
- `mc_historias`
- `mc_citas`
- `mc_sesion`
- `mc_agenda_{id}`
- `mc_especialidades`

## Cómo probar

1. Abrir `index.html` en navegador (o Live Server).
2. Entrar por `#/login`.
3. Usar accesos rápidos de demo:
   - Paciente: `laura@mediconnect.co / paciente123`
   - Médico: `carlos@mediconnect.co / medico123`
   - Admin: `admin@mediconnect.co / admin123`

## Notas

- No requiere backend ni instalación de dependencias.
- Los adjuntos se simulan guardando solo nombre de archivo.
- La videollamada usa Jitsi en modo embebido sin API key.
- Las imágenes se descargaron desde Unsplash y se almacenan localmente en `assets/images`.
# waysalud
# waysalud
