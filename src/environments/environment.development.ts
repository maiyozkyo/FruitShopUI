export const environment = {
  domain: 'https://localhost',
  gatewayPort: '8000',
  //#region Auth
  authPort: '8001',
  authService: 'Auth',
  authAssembly: 'AuthBusiness',
  //#endregion

  //#region User
  userPort: '8002',
  userService: 'User',
  userAssembly: 'UserBusiness',
  //#endregion

  //#region Tenant
  tenantPort: '8003',
  tenantService: 'Tenant',
  tenantAssembly: 'TenantBusiness',
  //#endregion

  //#region Order
  orderPort: '8004',
  orderService: 'Order',
  orderAssembly: 'OrderBusiness',
  orderDetailAssembly: 'OrderDetailBusiness',
  //#endregion

  //#region Customer
  customerPort: '8005',
  customerService: 'Customer',
  customerAssembly: 'CustomerBusiness',
  //#endregion

  //#region Product
  productPort: '8006',
  productService: 'Product',
  productAssembly: 'ProductBusiness',
  //#endregion

  //#region Background
  backgroundPort: '8006',
  backgroundService: 'Background',
  backgroundAssembly: 'BackgroundBusiness',
  //#endregion
};
