import React from "react";
import authRoles from "consts/authRoles";

const ProfilePageConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "/profile",
      component: React.lazy(() => import("./ProfilePage")),
      isAuth: true
    }
  ]
};

export default ProfilePageConfig;
