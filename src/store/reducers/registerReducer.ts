import { reginsterActionTypes, serverErrorsType } from '../actions/registerActions';
import { SET_SERVER_ERRORS, USER_REGISTRATING } from '../types/registerTypes';

const initialState = {
  isRegistrating: false,
  serverErrors: null as null | serverErrorsType,
};

export type registerStateType = typeof initialState;

const registerReducer = (state = initialState, action: reginsterActionTypes): registerStateType => {
  switch (action.type) {
    case SET_SERVER_ERRORS:
      return { ...state, serverErrors: action.errors };
    case USER_REGISTRATING:
      return { ...state, isRegistrating: action.isRegistrating };
    default:
      return state;
  }
};

export default registerReducer;
