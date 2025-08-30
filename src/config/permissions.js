export const roles = {
  admin: "admin",
  manager: "manager",
  cashier: "cashier",
  stock_keeper: "stock_keeper",
};

export const permissions = {
  manage_users: "Manage Users",
  manage_products: "Manage Products",
  manage_categories: "Manage Categories",
  view_sales: "View Sales",
  record_sale: "Record Sale",
  adjust_inventory: "Adjust Inventory",
};

export const rolePermissions = {
  [roles.admin]: [
    permissions.manage_users,
    permissions.manage_products,
    permissions.manage_categories,
    permissions.view_sales,
    permissions.adjust_inventory,
    permissions.record_sale,
  ],
  [roles.manager]: [
    permissions.manage_products,
    permissions.manage_categories,
    permissions.view_sales,
    permissions.adjust_inventory,
    permissions.record_sale,
  ],
  [roles.cashier]: [
    permissions.record_sale,
    permissions.view_sales,
    permissions.adjust_inventory,
  ],
  [roles.stock_keeper]: [permissions.adjust_inventory],
};
