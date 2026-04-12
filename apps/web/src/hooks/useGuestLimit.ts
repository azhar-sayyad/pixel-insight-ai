import { useCallback } from "react";
import { useAuthStore } from "../store/authStore";

const STORAGE_KEY = "guest_usage_count";
export const GUEST_LIMIT = 3;

export function useGuestLimit() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const getCount = useCallback((): number => {
    return parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
  }, []);

  const increment = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, String(getCount() + 1));
  }, [getCount]);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const count = getCount();
  const isLimitReached = !isAuthenticated && count >= GUEST_LIMIT;

  return { count, isLimitReached, increment, reset, limit: GUEST_LIMIT };
}
