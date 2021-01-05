const database = [
  {
    id: '1',
    name: 'Users',
    icon: 'user',
    route: '/user',
  },
  {
    id: '2',
    name: 'Services',
    icon: 'user',
    route: '/services',
  },
  {
    id: '21',
    name: 'Create Services',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    icon: 'user',
    route: '/services/create',
  },
  {
    id: '22',
    name: 'Update Service',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    icon: 'user',
    route: '/services/update',
  },
  {
    id: '3',
    name: 'Departments',
    icon: 'user',
    route: '/departments',
  },
  {
    id: '4',
    name: 'Categories',
    icon: 'user',
    route: '/categories',
  },
]

export default database
