import SAVE_PATHNAME from '../types/historyTypes';

type savePathnameActionType = {
  type: typeof SAVE_PATHNAME;
  pathname: string;
};

export type historyActionTypes = savePathnameActionType;

const savePathname = (pathname: string): savePathnameActionType => ({
  type: SAVE_PATHNAME,
  pathname,
});

export default savePathname;
