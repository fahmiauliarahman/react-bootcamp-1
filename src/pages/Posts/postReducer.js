import { ACTION_TYPES } from "./postActionTypes";

export const INITIAL_STATE = {
  loading: false,
  error: false,
  post: [],
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START:
      return {
        loading: true,
        error: false,
        post: {},
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
      };

    case ACTION_TYPES.DELETE_POST:
      return {
        ...state,
        loading: false,
        post: INITIAL_STATE.post.filter((item) => item.id !== action.id),
      };

    default:
      return state;
  }
};
