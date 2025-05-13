import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Save current scroll position before navigation
    if (window.history.state && window.history.state.scroll) {
      const { scroll } = window.history.state;
      setTimeout(() => window.scrollTo(...scroll), 0);
    } else {
      // Scroll to top if it's a new navigation
      window.scrollTo(0, 0);
    }

    // Save scroll position before unmounting
    return () => {
      window.history.replaceState(
        { ...window.history.state, scroll: [window.scrollX, window.scrollY] },
        ""
      );
    };
  }, [pathname]);

  return null;
}
