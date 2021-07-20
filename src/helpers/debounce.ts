function debounce(cb: any, ms: number) {
  let savedArguments: any;
  let isDebouncing = false;
  return function debounceWrapper(...args: any) {
    if (isDebouncing) {
      savedArguments = args;
      return;
    }
    cb(...args);
    isDebouncing = true;
    setTimeout(() => {
      isDebouncing = false;
      if (savedArguments) {
        debounceWrapper(...savedArguments);
        savedArguments = null;
      }
    }, ms);
  };
}

export default debounce;
