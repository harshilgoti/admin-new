import {
  COMMON_UPLOAD_IMAGE,
  COMMON_UPLOAD_IMAGE_SUCCESS,
  COMMON_UPLOAD_IMAGE_FAILURE,
  COMMON_UPLOAD_IMAGE_URL_HANDLING
} from "../actions/actionTypes";

const initialState = {
  uploadImageLoading: false,
  uploadImageUrl: "",
  uploadImageError: null
};

const common = (state = initialState, action) => {
  switch (action.type) {
    case COMMON_UPLOAD_IMAGE:
      return {
        ...state,
        uploadImageLoading: true
      };

    case COMMON_UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        uploadImageLoading: false,
        uploadImageUrl: action.payload
      };

    case COMMON_UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        uploadImageLoading: false,
        uploadImageError: action.payload.error
      };
    case COMMON_UPLOAD_IMAGE_URL_HANDLING:
      return {
        ...state,
        uploadImageUrl: ""
      };
    default:
      return state;
  }
};

export default common;
