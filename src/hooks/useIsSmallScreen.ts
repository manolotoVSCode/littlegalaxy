import { useState, useEffect } from "react";

const TABLET_BREAKPOINT = 1024;

export function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < TABLET_BREAKPOINT);
    check();
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
    mql.addEventListener("change", check);
    return () => mql.removeEventListener("change", check);
  }, []);

  return isSmall;
}
