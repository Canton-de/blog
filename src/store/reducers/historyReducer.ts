import { historyActionTypes } from '../actions/historyActions';
import SAVE_PATHNAME from '../types/historyTypes';

const initialState = {
  savedPathname: '/articles/page/1',
};

export type historyStateType = typeof initialState;

const historyReducer = (state = initialState, action: historyActionTypes): historyStateType => {
  switch (action.type) {
    case SAVE_PATHNAME:
      return { ...state, savedPathname: action.pathname };
    default:
      return state;
  }
};

export default historyReducer;
