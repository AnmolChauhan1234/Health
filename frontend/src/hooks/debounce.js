// to debounce the api call.
const debounce = (func, delay) => {
  let timeoutId;
  const debouncedFunction =  (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

  //Adding cancel method.
  debouncedFunction.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debouncedFunction;
};

export default debounce;