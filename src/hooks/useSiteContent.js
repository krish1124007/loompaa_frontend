import { useEffect } from 'react';
import { useSiteStore } from '../stores/siteStore.js';

export function useSiteContent() {
  const store = useSiteStore();
  useEffect(() => {
    store.hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return store;
}
