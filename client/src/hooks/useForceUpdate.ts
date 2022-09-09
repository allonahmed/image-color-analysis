import { useState } from 'react';

//hook for forcing rerender
export const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
};