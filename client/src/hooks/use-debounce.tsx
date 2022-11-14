import { useState } from 'react';

const useDebounce = ({ ms = 200 }: { ms?: number }) => {
  const [timerId, setTimerId] = useState<number | null>(null);

  return ({ fn }: { fn: () => void }) => {
    if (timerId) window.clearTimeout(timerId);

    const id = window.setTimeout(fn, ms);
    setTimerId(id);

  };
};

export { useDebounce };
