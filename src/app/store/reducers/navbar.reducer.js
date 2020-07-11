import {
  OPEN_FOLDED_NAVBAR,
  CLOSE_FOLDED_NAVBAR,
  TOGGLE_FOLDED_NAVBAR,
  TOGGLE_MOBILE_NAVBAR,
  OPEN_MOBILE_NAVBAR,
  CLOSE_MOBILE_NAVBAR
} from "../actions/actionTypes";

const initialState = {
  foldedOpen: false,
  mobileOpen: false
};

const navbar = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FOLDED_NAVBAR: {
      return {
        ...state,
        foldedOpen: !state.foldedOpen
      };
    }
    case OPEN_FOLDED_NAVBAR: {
      return {
        ...state,
        foldedOpen: true
      };
    }
    case CLOSE_FOLDED_NAVBAR: {
      return {
        ...state,
        foldedOpen: false
      };
    }
    case TOGGLE_MOBILE_NAVBAR: {
      return {
        ...state,
        mobileOpen: !state.mobileOpen
      };
    }
    case OPEN_MOBILE_NAVBAR: {
      return {
        ...state,
        mobileOpen: true
      };
    }
    case CLOSE_MOBILE_NAVBAR: {
      return {
        ...state,
        mobileOpen: false
      };
    }
    default: {
      return state;
    }
  }
};

export default navbar;
