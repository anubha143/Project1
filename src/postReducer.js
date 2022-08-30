export const INITIAL_STATE = {
  loading: false,
  error: false,
  post: {},
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
