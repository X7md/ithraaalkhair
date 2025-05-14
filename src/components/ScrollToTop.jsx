import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'PUSH') {
      window.scrollTo(0, 0);
    } else if (navigationType === 'POP') {
      const savedPosition = sessionStorage.getItem(`scroll_${pathname}`);
      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
      }
    }

    const handleScroll = () => {
      sessionStorage.setItem(`scroll_${pathname}`, window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, navigationType]);

  return null;
}
