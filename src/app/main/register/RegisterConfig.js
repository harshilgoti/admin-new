import authRoles from "consts/authRoles";
import Register from "./Register";

const RegisterConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        },
        toolbar: {
          display: false
        },
        footer: {
          display: false
        },
        leftSidePanel: {
          display: false
        },
        rightSidePanel: {
          display: false
        }
      }
    }
  },
  auth: authRoles.admin,
  routes: [
    {
      path: "/register",
      component: Register,
      isAuth: false
    }
  ]
};

export default RegisterConfig;
