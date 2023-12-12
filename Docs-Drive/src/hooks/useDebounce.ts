import { DependencyList, EffectCallback, useEffect } from "react";

function useDebounce(
  callback: EffectCallback,
  delay: number,
  dependencies: DependencyList
) {
  useEffect(() => {
    const timeout = setTimeout(callback, delay);

    return () => clearTimeout(timeout);
  }, [callback, delay, dependencies]);
}

export default useDebounce;
