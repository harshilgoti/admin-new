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
} from "../actions/actionTypes";

const initialState = {
  fetchEventsListLoading: false,
  fetchEventsList: [],
  fetchEventsListError: null,
  addEventsLoading: false,
  addEventsError: null,
  editEventsLoading: false,
  editEventsError: null,
  deleteEventsLoading: false,
  deleteEventsError: null
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case EVENTS_FETCH_ALL_EVENTS:
      return {
        ...state,
        fetchEventsListLoading: true
      };

    case EVENTS_FETCH_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        fetchEventsListLoading: false,
        fetchEventsList: action.payload
      };

    case EVENTS_FETCH_ALL_EVENTS_FAILURE:
      return {
        ...state,
        fetchEventsListLoading: false,
        fetchEventsListError: action.payload.error
      };
    case EVENTS_ADD_EVENTS:
      return {
        ...state,
        addEventsLoading: true
      };

    case EVENTS_ADD_EVENTS_SUCCESS:
      return {
        ...state,
        addEventsLoading: false,
        fetchEventsList: [action.payload, ...state.fetchEventsList]
      };

    case EVENTS_ADD_EVENTS_FAILURE:
      return {
        ...state,
        addEventsLoading: false,
        addEventsError: action.payload.error
      };
    case EVENTS_EDIT_EVENTS:
      return {
        ...state,
        editEventsLoading: true
      };

    case EVENTS_EDIT_EVENTS_SUCCESS:
      return {
        ...state,
        editEventsLoading: false,
        fetchEventsList: state.fetchEventsList.map(emp => {
          if (emp._id === action.payload._id) {
            return action.payload;
          }
          return emp;
        })
      };

    case EVENTS_EDIT_EVENTS_FAILURE:
      return {
        ...state,
        editEventsLoading: false,
        editEventsError: action.payload.error
      };
    case EVENTS_DELETE_EVENTS:
      return {
        ...state,
        deleteEventsLoading: true
      };

    case EVENTS_DELETE_EVENTS_SUCCESS:
      return {
        ...state,
        deleteEventsLoading: false,
        fetchEventsList: state.fetchEventsList.filter(emp => {
          return emp._id !== action.payload;
        })
      };

    case EVENTS_DELETE_EVENTS_FAILURE:
      return {
        ...state,
        deleteEventsLoading: false,
        deleteEventsError: action.payload.error
      };
    default:
      return state;
  }
};

export default events;
