import navigationConfig from "app/fuse-configs/navigationConfig";
import { GET_NAVIGATION, SET_NAVIGATION, RESET_NAVIGATION } from "../actions/actionTypes";

const initialState = navigationConfig;

const navigation = (state = initialState, action) => {
  switch (action.type) {
    case GET_NAVIGATION: {
      return [...state];
    }
    case SET_NAVIGATION: {
      return [...action.navigation];
    }
    case RESET_NAVIGATION: {
      return [...initialState];
    }
    default: {
      return state;
    }
  }
};

export default navigation;
