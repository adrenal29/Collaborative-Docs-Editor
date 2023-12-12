import * as actions from "../actionTypes";

const initialState = {
  loading: true,
  loggedIn: false,
  user: null,
};

function authReducer(state = initialState, { type, payload }: any) {
  switch (type) {
    case actions.SIGN_IN:
      return {
        ...state,
        loggedIn: true,
        user: payload.user,
      };
    case actions.SIGN_OUT:
      return { ...state, loggedIn: false };
    case actions.FINISH_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
}

export default authReducer;
