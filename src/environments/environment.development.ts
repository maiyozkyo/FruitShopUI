export const environment = {
  domain: 'https://localhost',
  gatewayPort: '8000',
  //#region Auth
  authPort: '8001',
  authService: 'Auth',
  //#endregion

  //#region User
  userPort: '8002',
  userService: 'User',
  //#endregion

  //#region Tenant
  tenantPort: '8003',
  tenantService: 'Tenant',
  //#endregion

  //#region Order
  orderPort: '8004',
  orderService: 'Order',
  //#endregion

  //#region Customer
  customerPort: '8005',
  customerService: 'Customer',
  //#endregion

  //#region Product
  productPort: '8006',
  productService: 'Product',
  //#endregion
};
