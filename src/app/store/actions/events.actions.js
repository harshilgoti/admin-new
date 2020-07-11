// import history from "@history";
import axios from "config/axios";
import {
  EVENTS_FETCH_ALL_EVENTS,
  EVENTS_FETCH_ALL_EVENTS_SUCCESS,
  EVENTS_FETCH_ALL_EVENTS_FAILURE,
  EVENTS_ADD_EVENTS,
  EVENTS_ADD_EVENTS_SUCCESS,
  EVENTS_ADD_EVENTS_FAILURE,
  EVENTS_EDIT_EVENTS,
  EVENTS_EDIT_EVENTS_SUCCESS,
  EVENTS_EDIT_EVENTS_FAILURE,
  EVENTS_DELETE_EVENTS,
  EVENTS_DELETE_EVENTS_SUCCESS,
  EVENTS_DELETE_EVENTS_FAILURE
} from "./actionTypes";
import { enqueueSnackbar } from "./notification.actions";

export const eventsFetchAllEvents = payload => {
  return {
    type: EVENTS_FETCH_ALL_EVENTS,
    payload
  };
};
export const eventsFetchAllEventsSuccess = payload => {
  return {
    type: EVENTS_FETCH_ALL_EVENTS_SUCCESS,
    payload
  };
};
export const eventsFetchAllEventsFailure = payload => {
  return {
    type: EVENTS_FETCH_ALL_EVENTS_FAILURE,
    payload
  };
};
export const getEventsList = () => async dispatch => {
  dispatch(eventsFetchAllEvents());

  axios
    .get(`/employers`)
    .then(res => {
      dispatch(eventsFetchAllEventsSuccess([{
        image_url:"asas",
        name:"asas",
        description :"asas",
        type:"inclusion",
        ticket_price:10,
        type_of_seats: "any",
        gallery: [],
        location: { lat: "", lon: "" },
        is_own_event:true
      }
      ]));
    })
    .catch(error => {
      dispatch(eventsFetchAllEventsFailure({ error: error.response.data.errors.message.toString() }));
    });
};

//addEvent

export const eventAddEvent = payload => {
  return {
    type: EVENTS_ADD_EVENTS,
    payload
  };
};
export const eventAddEventSuccess = payload => {
  return {
    type: EVENTS_ADD_EVENTS_SUCCESS,
    payload
  };
};
export const eventAddEventFailure = payload => {
  return {
    type: EVENTS_ADD_EVENTS_FAILURE,
    payload
  };
};
export const addEvent = (body, handleAddEventSuccess) => async dispatch => {
  dispatch(eventAddEvent());

  axios
    .post(`/employers`, body)
    .then(res => {
      dispatch(eventAddEventSuccess(res.data.data));
      handleAddEventSuccess && handleAddEventSuccess();
      dispatch(
        enqueueSnackbar({
          message: `Event has been added`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success"
          }
        })
      );
    })
    .catch(error => {
      dispatch(eventAddEventFailure({ error: error.response.data.errors.message.toString() }));
      dispatch(
        enqueueSnackbar({
          message: `${error.response.data.errors.message.toString()}`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "error"
          }
        })
      );
    });
};

//editEvent

export const eventEditEvent = payload => {
  return {
    type: EVENTS_EDIT_EVENTS,
    payload
  };
};
export const eventEditEventSuccess = payload => {
  return {
    type: EVENTS_EDIT_EVENTS_SUCCESS,
    payload
  };
};
export const eventEditEventFailure = payload => {
  return {
    type: EVENTS_EDIT_EVENTS_FAILURE,
    payload
  };
};
export const editEvent = (body, emp_id, handleEditEventSuccess) => async dispatch => {
  dispatch(eventEditEvent());

  axios
    .put(`/employers/${emp_id}`, body)
    .then(res => {
      dispatch(eventEditEventSuccess(res.data.data));
      handleEditEventSuccess && handleEditEventSuccess();
      dispatch(
        enqueueSnackbar({
          message: `Event has been updated`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success"
          }
        })
      );
    })
    .catch(error => {
      dispatch(eventEditEventFailure({ error: error.response.data.errors.message.toString() }));
      dispatch(
        enqueueSnackbar({
          message: `${error.response.data.errors.message.toString()}`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "error"
          }
        })
      );
    });
};

//delete Event

export const eventDeleteEvent = payload => {
  return {
    type: EVENTS_DELETE_EVENTS,
    payload
  };
};
export const eventDeleteEventSuccess = payload => {
  return {
    type: EVENTS_DELETE_EVENTS_SUCCESS,
    payload
  };
};
export const eventDeleteEventFailure = payload => {
  return {
    type: EVENTS_DELETE_EVENTS_FAILURE,
    payload
  };
};
export const deleteEvent = (emp_id, handleDeleteEventSuccess) => async dispatch => {
  dispatch(eventDeleteEvent());

  axios
    .delete(`/employers/${emp_id}`)
    .then(res => {
      dispatch(eventDeleteEventSuccess(emp_id));
      handleDeleteEventSuccess && handleDeleteEventSuccess();
      dispatch(
        enqueueSnackbar({
          message: `Event has been deleted`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success"
          }
        })
      );
    })
    .catch(error => {
      dispatch(eventDeleteEventFailure({ error: error.response.data.errors.message.toString() }));
      dispatch(
        enqueueSnackbar({
          message: `${error.response.data.errors.message.toString()}`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "error"
          }
        })
      );
    });
};
