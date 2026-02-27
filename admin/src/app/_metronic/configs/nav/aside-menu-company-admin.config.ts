export const AsideMenuCompanyAdmin = {
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
            title: 'Preguntas (Q&A)',
            root: true,
            name: "questions",
            bullet: 'dot',
            icon: 'flaticon2-architecture-and-city',
            svg: './assets/media/svg/icons/Communication/Chat6.svg',
            page: '/questions',
            submenu: [
                {
                    title: 'Preguntas Clientes',
                    page: '/questions/list'
                }
            ]
        },
        { section: 'Comercial' },
        {
            title: 'Ventas',
            root: true,
            name: "ventas",
            bullet: 'dot',
            icon: 'flaticon2-user-outline-symbol',
            svg: './assets/media/svg/icons/Communication/Clipboard-list.svg',
            page: '/ventas',
            submenu: [
                {
                    title: 'Ordenes',
                    page: '/ventas/lista-de-ordenes'
                }
            ]
        },
        { section: 'Productos' },
        {
            title: 'Categorias',
            root: true,
            name: "categorias",
            bullet: 'dot',
            icon: 'flaticon2-user-outline-symbol',
            svg: './assets/media/svg/icons/Electric/Gas-stove.svg',
            page: '/categorias',
            submenu: [
                {
                    title: 'Gestion Categorias',
                    page: '/categorias/lista'
                }
            ]
        },
        {
            title: 'Productos',
            root: true,
            name: "products",
            bullet: 'dot',
            icon: 'flaticon2-user-outline-symbol',
            svg: './assets/media/svg/icons/Home/Armchair.svg',
            page: '/products',
            submenu: [
                {
                    title: 'Crear Producto',
                    page: '/products/add-product'
                },
                {
                    title: 'Listar Productos',
                    page: '/products/list-product'
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
        {
            title: 'Cupones',
            root: true,
            name: "cupones",
            bullet: 'dot',
            icon: 'flaticon2-user-outline-symbol',
            svg: './assets/media/svg/icons/Home/Toilet.svg',
            page: '/cupones',
            submenu: [
                {
                    title: 'Regitrar Cupon',
                    page: '/cupones/registrar-cupon'
                },
                {
                    title: 'Listar Cupones',
                    page: '/cupones/lista-cupones'
                }
            ]
        },
        {
            title: 'Descuento',
            root: true,
            name: "descuento",
            bullet: 'dot',
            icon: 'flaticon2-user-outline-symbol',
            svg: './assets/media/svg/icons/Home/Cupboard.svg',
            page: '/descuento',
            submenu: [
                {
                    title: 'Registrar Descuento',
                    page: '/descuento/registrar-descuento'
                },
                {
                    title: 'Listar descuentos',
                    page: '/descuento/lista-descuentos'
                }
            ]
        },
        { section: 'Soporte' },
        {
            title: 'Mis Tickets',
            root: true,
            name: 'support',
            bullet: 'dot',
            icon: 'flaticon2-chat',
            svg: './assets/media/svg/icons/Communication/Chat-check.svg',
            page: '/support',
            submenu: [
                {
                    title: 'Ver mis Tickets',
                    page: '/support'
                },
                {
                    title: 'Enviar al Equipo',
                    page: '/notifications/send'
                },
            ]
        },
        { section: 'Configuración' },
        {
            title: 'Pagos',
            root: true,
            name: "pagos",
            bullet: 'dot',
            icon: 'flaticon2-settings',
            svg: './assets/media/svg/icons/General/Settings-1.svg',
            page: '/payment-config', // Adjust route in routing module later
            submenu: [
                {
                    title: 'Métodos de Pago',
                    page: '/companies/payment-configs'
                }
            ]
        },
        { section: 'Facturación' },
        {
            title: 'Revisión de Pagos',
            root: true,
            name: "billing",
            bullet: 'dot',
            icon: 'flaticon-price-tag',
            svg: './assets/media/svg/icons/Shopping/Credit-card.svg',
            page: '/billing',
            submenu: [
                {
                    title: 'Pagos Pendientes',
                    page: '/billing/review-payments'
                }
            ]
        }
    ]
};
