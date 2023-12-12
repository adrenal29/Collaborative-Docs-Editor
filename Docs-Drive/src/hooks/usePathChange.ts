import { EffectCallback, useEffect } from "react";
import { useLocation } from "react-router";

function usePathChange(callback: EffectCallback) {
  const location = useLocation();

  useEffect(callback, [callback, location]);
}

export default usePathChange;
