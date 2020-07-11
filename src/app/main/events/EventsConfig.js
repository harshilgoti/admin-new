import React from "react";
import authRoles from "consts/authRoles";

const EventsConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "/events",
      component: React.lazy(() => import("./Events")),
      isAuth: true
    }
  ]
};

export default EventsConfig;
