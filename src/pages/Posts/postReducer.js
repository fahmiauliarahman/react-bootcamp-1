import { ACTION_TYPES } from "./postActionTypes";

export const INITIAL_STATE = {
  loading: false,
  error: false,
  errorText: "",
  post: [],
  selectedPost: {
    userId: 1,
    id: 0,
    title: "",
    body: "",
  },
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case ACTION_TYPES.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };

    case ACTION_TYPES.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorText: action.payload,
      };

    case ACTION_TYPES.DELETE_POST:
      return {
        ...state,
        loading: false,
        post: action.payload,
        selectedPost: {
          userId: 1,
          id: 0,
          title: "",
          body: "",
        },
      };

    case ACTION_TYPES.SET_SELECTED_DATA:
      return {
        ...state,
        loading: false,
        selectedPost: action.payload,
      };

    case ACTION_TYPES.RESET_FORM:
      return {
        ...state,
        loading: false,
        selectedPost: {
          userId: 1,
          id: 0,
          title: "",
          body: "",
        },
      };

    case ACTION_TYPES.UPDATE_SELECTED_POST:
      return {
        ...state,
        selectedPost: {
          ...state.selectedPost,
          ...action.payload,
        },
      };

    case ACTION_TYPES.REMOVE_ERROR:
      return {
        ...state,
        error: false,
        errorText: "",
      };

    default:
      return state;
  }
};
