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
