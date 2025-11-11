type Theme = "light" | "dark" | "system";
type ThemeChangeListener = (effective: "light" | "dark") => void;

const STORAGE_KEY = "theme";
const listeners = new Set<ThemeChangeListener>();

function detectSystem(): "light" | "dark" {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStored(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark" || v === "system") return v as Theme;
  } catch (_) {
    void _;
  }
  return null;
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", theme);
}

function applyEffectiveTheme() {
  const stored = getStored();
  const effective =
    stored === "light" || stored === "dark" ? stored : detectSystem();
  applyTheme(effective);
  notifyListeners(effective);
}

function notifyListeners(effective: "light" | "dark") {
  listeners.forEach((listener) => listener(effective));
}

export function setTheme(theme: Theme) {
  try {
    if (theme === "system") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  } catch (_) {
    void _;
  }
  applyEffectiveTheme();
}

export function subscribe(listener: ThemeChangeListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getTheme() {
  const stored = getStored();
  const effective =
    stored === "light" || stored === "dark" ? stored : detectSystem();
  return { stored, effective };
}

// Listen to system changes only when there's no explicit override
const mq =
  typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

function handleSystemChange() {
  if (getStored() == null) applyEffectiveTheme();
}

if (mq) {
  // modern
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", handleSystemChange);
  } else {
    // legacy typing fallback
    type LegacyMQ = { addListener?: (listener: (e: unknown) => void) => void };
    const legacy = mq as LegacyMQ;
    if (typeof legacy.addListener === "function")
      legacy.addListener(handleSystemChange);
  }
}

// Apply on load
if (typeof document !== "undefined") applyEffectiveTheme();

// Minimal global API for debugging / programmatic control
declare global {
  interface Window {
    __theme?: {
      set: (theme: Theme) => void;
      get: () => ReturnType<typeof getTheme>;
    };
  }
}

window.__theme = {
  set: setTheme,
  get: getTheme,
};

export default {
  setTheme,
  getTheme,
  subscribe,
};
