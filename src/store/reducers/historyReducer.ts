import SAVE_PATHNAME from '../types/historyTypes';

interface IHistoryState {
  savedPathname: string;
}

const initialState = {
  savedPathname: '/articles/page/1',
};

const historyReducer = (state = initialState, action: any): IHistoryState => {
  switch (action.type) {
    case SAVE_PATHNAME:
      return { ...state, savedPathname: action.pathname };
    default:
      return state;
  }
};

export default historyReducer;
