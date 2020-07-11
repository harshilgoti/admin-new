import { NOTIFICATIONS_ENQUEUE_SNACKBAR, NOTIFICATIONS_CLOSE_SNACKBAR, NOTIFICATIONS_REMOVE_SNACKBAR } from "../actions/actionTypes";

const defaultState = {
  notifications: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification
          }
        ]
      };

    case NOTIFICATIONS_CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          action.dismissAll || notification.key === action.key ? { ...notification, dismissed: true } : { ...notification }
        )
      };
    case NOTIFICATIONS_REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.key !== action.key)
      };
    default:
      return state;
  }
};
