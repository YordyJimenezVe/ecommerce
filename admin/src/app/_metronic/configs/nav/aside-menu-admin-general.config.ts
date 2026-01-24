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