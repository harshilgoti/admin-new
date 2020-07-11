import {
  OPEN_FOLDED_NAVBAR,
  CLOSE_FOLDED_NAVBAR,
  TOGGLE_FOLDED_NAVBAR,
  TOGGLE_MOBILE_NAVBAR,
  OPEN_MOBILE_NAVBAR,
  CLOSE_MOBILE_NAVBAR
} from "./actionTypes";

export function navbarToggleFolded() {
  return {
    type: TOGGLE_FOLDED_NAVBAR
  };
}

export function navbarOpenFolded() {
  return {
    type: OPEN_FOLDED_NAVBAR
  };
}

export function navbarCloseFolded() {
  return {
    type: CLOSE_FOLDED_NAVBAR
  };
}

export function navbarToggleMobile() {
  return {
    type: TOGGLE_MOBILE_NAVBAR
  };
}

export function navbarOpenMobile() {
  return {
    type: OPEN_MOBILE_NAVBAR
  };
}

export function navbarCloseMobile() {
  return {
    type: CLOSE_MOBILE_NAVBAR
  };
}
