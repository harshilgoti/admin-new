import FuseUtils from "@fuse/utils";
import { GET_NAVIGATION, SET_NAVIGATION, RESET_NAVIGATION } from "./actionTypes";

export function getNavigation() {
  return {
    type: GET_NAVIGATION
  };
}

export function setNavigation(navigation) {
  return {
    type: SET_NAVIGATION,
    navigation
  };
}

export function resetNavigation() {
  return {
    type: RESET_NAVIGATION
  };
}

export function appendNavigationItem(item, parentId) {
  return (dispatch, getState) => {
    const { navigation } = getState().fuse;
    return dispatch({
      type: SET_NAVIGATION,
      navigation: FuseUtils.appendNavItem(navigation, item, parentId)
    });
  };
}

export function prependNavigationItem(item, parentId) {
  return (dispatch, getState) => {
    const { navigation } = getState().fuse;
    return dispatch({
      type: SET_NAVIGATION,
      navigation: FuseUtils.prependNavItem(navigation, item, parentId)
    });
  };
}

export function updateNavigationItem(id, item) {
  return (dispatch, getState) => {
    const { navigation } = getState().fuse;
    return dispatch({
      type: SET_NAVIGATION,
      navigation: FuseUtils.updateNavItem(navigation, id, item)
    });
  };
}

export function removeNavigationItem(id) {
  return (dispatch, getState) => {
    const { navigation } = getState().fuse;
    return dispatch({
      type: SET_NAVIGATION,
      navigation: FuseUtils.removeNavItem(navigation, id)
    });
  };
}
