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
