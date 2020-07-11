import { OPEN_DIALOG, CLOSE_DIALOG } from "../actions/actionTypes";

const initialState = {
  state: false,
  options: {
    children: "Hi"
  }
};

const dialog = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DIALOG: {
      return {
        ...state,
        state: true,
        options: {
          ...state.options,
          ...action.options
        }
      };
    }
    case CLOSE_DIALOG: {
      return {
        ...state,
        state: false
      };
    }
    default: {
      return state;
    }
  }
};

export default dialog;
