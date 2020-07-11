import axios from "config/axios";
import { COMMON_UPLOAD_IMAGE, COMMON_UPLOAD_IMAGE_SUCCESS, COMMON_UPLOAD_IMAGE_FAILURE, COMMON_UPLOAD_IMAGE_URL_HANDLING } from "./actionTypes";

export const imageUploadImage = payload => {
  return {
    type: COMMON_UPLOAD_IMAGE,
    payload
  };
};
export const imageUploadImageSuccess = payload => {
  return {
    type: COMMON_UPLOAD_IMAGE_SUCCESS,
    payload
  };
};
export const imageUploadImageFailure = payload => {
  return {
    type: COMMON_UPLOAD_IMAGE_FAILURE,
    payload
  };
};
export const uploadImage = file => async dispatch => {
  dispatch(imageUploadImage());

  var formData = new FormData();
  formData.append("file", file);
  formData.append("key", "employee");
  formData.append("type", "logo");

  axios
    .post(`/upload`, formData)
    .then(res => {
      dispatch(imageUploadImageSuccess(res.data.data.url));
    })
    .catch(error => {
      dispatch(imageUploadImageFailure({ error: error.response.data.errors.message.toString() }));
    });
};

export const imageUploadImageUrlHandling = payload => {
  return {
    type: COMMON_UPLOAD_IMAGE_URL_HANDLING,
    payload
  };
};

export const uploadImageUrlHandling = () => async dispatch => {
  dispatch(imageUploadImageUrlHandling());
};
