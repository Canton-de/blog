import { SET_SERVER_ERRORS, USER_REGISTRATING } from '../types/registerTypes';

type serverErrorsType = {
  username?: string[];
  email?: string[];
  password?: string[];
};

const initialState = {
  isRegistating: false,
  serverErrors: null as null | serverErrorsType,
};

export type registerStateType = typeof initialState;

const registerReducer = (state = initialState, action: any): registerStateType => {
  switch (action.type) {
    case SET_SERVER_ERRORS:
      return { ...state, serverErrors: action.errors };
    case USER_REGISTRATING:
      return { ...state, isRegistating: action.isRegistating };
    default:
      return state;
  }
};

export default registerReducer;
