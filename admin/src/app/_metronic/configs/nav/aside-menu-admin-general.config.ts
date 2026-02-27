export const AsideMenuAdminGeneral = {
  items: [
    {
      title: 'Dashboard',
      root: true,
      name: "dashboard",
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      page: '/dashboard',
      translate: 'MENU.DASHBOARD',
      bullet: 'dot',
    },
    { section: 'Usuario' },
    { section: 'SaaS Multi-Tenant' },
    {
      title: 'Empresas',
      root: true,
      name: "companies",
      bullet: 'dot',
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Home/Building.svg',
      page: '/companies',
      submenu: [
        {
          title: 'Listar Empresas',
          page: '/companies/list'
        },
        {
          title: 'Registrar Empresa',
          page: '/companies/create'
        }
      ]
    },
    {
      title: 'Eventos en Vivo',
      root: true,
      name: "live-events",
      bullet: 'dot',
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Media/Movie-Lane2.svg',
      page: '/live-events',
      submenu: [
        {
          title: 'Eventos en Vivo',
          page: '/live-events/list'
        },
        {
          title: 'Programar Evento',
          page: '/live-events/create'
        }
      ]
    },
    {
      title: 'Usuarios',
      root: true,
      name: "users",
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/General/User.svg',
      page: '/users',
      submenu: [
        {
          title: 'Gestion Usuarios',
          page: '/users/list'
        },
        {
          title: 'Roles y Permisos',
          page: '/user-management/roles'
        }
      ]
    },
    { section: 'Inteligencia Artificial' },
    {
      title: 'Estudio de IA',
      root: true,
      name: "ai-studio",
      bullet: 'dot',
      icon: 'flaticon2-soft-icons',
      svg: './assets/media/svg/icons/General/Thunder-move.svg',
      page: '/ai-studio',
      submenu: [
        {
          title: 'Alimentar IA',
          page: '/ai-studio/training'
        },
        {
          title: 'Base de Conocimiento',
          page: '/ai-studio/knowledge'
        }
      ]
    },
    { section: 'Comunicación' },
    {
      title: 'Mensajería',
      root: true,
      name: "messaging",
      bullet: 'dot',
      icon: 'flaticon2-chat',
      svg: './assets/media/svg/icons/Communication/Group-chat.svg',
      page: '/messaging',
      submenu: [
        {
          title: 'Bandeja de Entrada',
          page: '/messaging/inbox'
        }
      ]
    },
    { section: 'Soporte / CX' },
    {
      title: 'Tickets de Soporte',
      root: true,
      name: 'support-admin',
      bullet: 'dot',
      icon: 'flaticon2-chat',
      svg: './assets/media/svg/icons/Communication/Chat-check.svg',
      page: '/support/admin',
      submenu: [
        {
          title: 'Todos los Tickets',
          page: '/support/admin'
        },
        {
          title: 'Analytics de Soporte',
          page: '/support/analytics'
        }
      ]
    },
    { section: 'Sistema' },

    {
      title: 'Configuracion',
      root: true,
      name: "system",
      bullet: 'dot',
      icon: 'flaticon2-gear',
      svg: './assets/media/svg/icons/Code/Settings4.svg',
      page: '/system',
      submenu: [
        {
          title: 'Base de Datos',
          page: '/system/config'
        }
      ]
    },
  ]
}
