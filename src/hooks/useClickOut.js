import { useEffect } from 'react';

const useClickOut = (ref, fn) => {
  useEffect(() => {
    const handleClick = (event) => {
      if(ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    }
  });
}

export default useClickOut;