import { NOTIFICATIONS_ENQUEUE_SNACKBAR, NOTIFICATIONS_CLOSE_SNACKBAR, NOTIFICATIONS_REMOVE_SNACKBAR } from "./actionTypes";

export const enqueueSnackbar = notification => {
  const key = notification.options && notification.options.key;
  return {
    type: NOTIFICATIONS_ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random()
    }
  };
};

export const closeSnackbar = key => ({
  type: NOTIFICATIONS_CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key
});
export const removeSnackbar = key => ({
  type: NOTIFICATIONS_REMOVE_SNACKBAR,
  key
});
