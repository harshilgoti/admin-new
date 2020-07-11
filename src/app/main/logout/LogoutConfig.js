import authRoles from "consts/authRoles";
import { logoutUser } from "app/store/actions";
import store from "app/store";

const LogoutConfig = {
  auth: authRoles.user,
  routes: [
    {
      path: "/logout",
      component: () => {
        store.dispatch(logoutUser());
        return "Logging out..";
      }
    }
  ]
};

export default LogoutConfig;
