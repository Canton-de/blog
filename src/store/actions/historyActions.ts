import SAVE_PATHNAME from '../types/historyTypes';

const savePathname = (pathname: string) => ({
  type: SAVE_PATHNAME,
  pathname,
});

export default savePathname;
