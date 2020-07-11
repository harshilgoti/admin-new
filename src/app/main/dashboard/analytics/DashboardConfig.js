import React from "react";
import authRoles from "consts/authRoles";

const DashboardConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "/dashboard",
      component: React.lazy(() => import("./Dashboard")),
      isAuth: true
    }
  ]
};

export default DashboardConfig;
