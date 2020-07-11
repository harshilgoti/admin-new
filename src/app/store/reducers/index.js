import { combineReducers } from "redux";

import user from "./user.reducer";
import auth from "./auth.reducer";

import dialog from "./dialog.reducer";
import navbar from "./navbar.reducer";
import navigation from "./navigation.reducer";
import routes from "./routes.reducer";
import settings from "./settings.reducer";
import notification from "./notification.reducer";
import events from "./events.reducer";
import common from "./common.reducer";

const authReducer = combineReducers({
  user,
  auth
});

const fuse = combineReducers({
  navigation,
  settings,
  navbar,
  dialog,
  routes,
  notification,
  events,
  common,
});

const createReducer = asyncReducers =>
  combineReducers({
    auth: authReducer,
    fuse,
    ...asyncReducers
  });

export default createReducer;
