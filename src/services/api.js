export default {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /userLogin',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',

  servicesList: 'GET /getAllServicesAdmin',
  createServices: 'POST /postNewService',
  updateServices: 'PUT /updateService ',

  departmentsList: 'GET /getAllDepartments',
  createDepartment: 'POST /postNewDepartment',
  updateDepartment: 'PUT /updateDepartment ',

  categoriesList: 'GET /getAllCategories',
  createCategory: 'POST /postNewCategory',
  updateCategory: 'PUT /updateCategory ',

  subCategoriesList: 'GET /getAllSubCategories',
  createSubCategory: 'POST /postNewSubCategory',
  updateSubCategory: 'PUT /updateSubCategory ',

  partsList: 'GET /getAllParts',
  createPart: 'POST /postNewPart',
  updatePart: 'PUT /updatePart ',

  offersList: 'GET /getAllOffersAdmin',
  createOffer: 'POST /postNewOffer',
  updateOffer: 'PUT /updateOffer',

  packagesList: 'GET /getAllPackagesAdmin',
  createPackage: 'POST /postNewPackage',
  updatePackage: 'PUT /updatePackage',
}
