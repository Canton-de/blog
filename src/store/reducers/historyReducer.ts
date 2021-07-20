const SAVE_PATHNAME = 'SAVE_PATHNAME';

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

export const savePathname = (pathname: string) => ({
  type: SAVE_PATHNAME,
  pathname,
});

export default historyReducer;
