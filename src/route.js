const database = [
  {
    id: '1',
    name: 'Services',
    icon: 'user',
    route: '/services',
  },
  {
    id: '11',
    name: 'Create Services',
    menuParentId: '-1',
    breadcrumbParentId: '1',
    icon: 'user',
    route: '/services/create',
  },
  {
    id: '12',
    name: 'Update Service',
    menuParentId: '-1',
    breadcrumbParentId: '1',
    icon: 'user',
    route: '/services/update',
  },
  {
    id: '2',
    name: 'Departments',
    icon: 'user',
    route: '/departments',
  },
  {
    id: '21',
    name: 'Create Department',
    menuParentId: '-1',
    breadcrumbParentId: '2',
    icon: 'user',
    route: '/departments/create',
  },
  {
    id: '3',
    name: 'Categories',
    icon: 'user',
    route: '/categories',
  },
  {
    id: '4',
    name: 'Users',
    icon: 'user',
    route: '/user',
  },
]

export default database
