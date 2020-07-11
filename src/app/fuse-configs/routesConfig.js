import FuseUtils from "@fuse/utils";
// import DashboardConfig from "app/main/dashboard/analytics/DashboardConfig";
import EventsConfig from "app/main/events/EventsConfig";
import LoginConfig from "app/main/login/LoginConfig";
import LogoutConfig from "app/main/logout/LogoutConfig";
import pagesConfigs from "app/main/pages/pagesConfigs";
import RegisterConfig from "app/main/register/RegisterConfig";
import React from "react";
import { Redirect } from "react-router-dom";

const routeConfigs = [
 // DashboardConfig,
 EventsConfig,
  ...pagesConfigs,
  LoginConfig,
  RegisterConfig,
  LogoutConfig
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/login" />
  },
  {
    component: () => <Redirect to="/error-404" />
  }
];

export default routes;
