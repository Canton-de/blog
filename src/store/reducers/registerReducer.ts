import { SET_SERVER_ERRORS, USER_REGISTRATING } from '../types/registerTypes';

export interface IRegiseterState {
  isRegistating: boolean;
  serverErrors: any;
}

const initialState: IRegiseterState = {
  isRegistating: false,
  serverErrors: {},
};

const registerReducer = (state = initialState, action: any): IRegiseterState => {
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
