import { create } from 'zustand';
import api, { unwrap } from '../lib/api.js';

export const useSiteStore = create((set, get) => ({
  services: [],
  categories: [],
  loaded: false,
  loading: false,

  hydrate: async () => {
    if (get().loaded || get().loading) return;
    set({ loading: true });
    try {
      const [services, categories] = await Promise.all([
        unwrap(api.get('/services')),
        unwrap(api.get('/categories')),
      ]);
      set({ services, categories, loaded: true, loading: false });
    } catch (err) {
      console.error('[site] hydrate failed:', err.message);
      set({ loading: false });
    }
  },

  refresh: async () => {
    set({ loaded: false });
    return get().hydrate();
  },
}));
