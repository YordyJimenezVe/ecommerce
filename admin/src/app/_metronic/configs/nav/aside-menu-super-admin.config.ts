export const AsideMenuSuperAdmin = {
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
            title: 'Sliders',
            root: true,
            name: "sliders",
            bullet: 'dot',
            icon: 'flaticon2-user-outline-symbol',
            svg: './assets/media/svg/icons/Design/Image.svg',
            page: '/sliders',
            submenu: [
                {
                    title: 'Listar Sliders',
                    page: '/sliders/lista'
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
                },
                {
                    title: 'Enviar Notificaciones',
                    page: '/notifications/send'
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
};
