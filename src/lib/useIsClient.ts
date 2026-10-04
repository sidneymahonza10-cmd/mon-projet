import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** true après hydratation (sans setState dans un effet). */
export function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}
