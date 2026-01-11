import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // We use setTimeout to push this to the end of the execution queue,
    // ensuring the new page DOM is ready before we scroll.
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Forces instant jump, ignoring CSS smooth scroll
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}