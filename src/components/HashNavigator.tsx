import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * HashNavigator component
 * Handles hash navigation (#sobre, #projetos, #contato)
 * Scrolls to the corresponding section when hash changes
 */
export default function HashNavigator() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.slice(1); // remove #

    if (!hash) {
      // No hash, scroll to top
      window.scrollTo(0, 0);
      return;
    }

    // Small delay to ensure layout is ready
    const scrollToElement = () => {
      const el = document.getElementById(hash);
      if (!el) return;

      const navbarOffset = 64; // navbar height
      const top =
        el.getBoundingClientRect().top + window.scrollY - navbarOffset;
      window.scrollTo(0, top);
    };

    // Try immediately
    scrollToElement();

    // Also try after layout is settled (shorter delay)
    const timeoutId = window.setTimeout(scrollToElement, 50);

    return () => window.clearTimeout(timeoutId);
  }, [location.hash]);

  return null;
}
