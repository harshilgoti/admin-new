import { SET_SETTINGS, SET_DEFAULT_SETTINGS, SET_INITIAL_SETTINGS, RESET_DEFAULT_SETTINGS } from "./actionTypes";

export function setSettings(value) {
  return {
    type: SET_SETTINGS,
    value
  };
}

export function setDefaultSettings(value) {
  return {
    type: SET_DEFAULT_SETTINGS,
    value
  };
}

export function setInitialSettings() {
  return {
    type: SET_INITIAL_SETTINGS
  };
}

export function resetSettings(value) {
  return {
    type: RESET_DEFAULT_SETTINGS,
    value
  };
}
