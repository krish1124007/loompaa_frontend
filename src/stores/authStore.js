import { create } from 'zustand';
import api, { unwrap } from '../lib/api.js';
import { getToken, setToken, clearToken, getStoredUser, setStoredUser } from '../lib/auth.js';

export const useAuthStore = create((set, get) => ({
  user: getStoredUser(),
  token: getToken(),
  loading: false,
  error: null,

  isAuthenticated: () => Boolean(get().token),

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await unwrap(api.post('/auth/login', { email, password }));
      setToken(data.token);
      setStoredUser(data.user);
      set({ token: data.token, user: data.user, loading: false });
      return data.user;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      set({ loading: false, error: msg });
      throw new Error(msg);
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      /* ignore — clear locally anyway */
    }
    clearToken();
    set({ token: null, user: null });
  },

  hydrateFromServer: async () => {
    if (!get().token) return null;
    try {
      const data = await unwrap(api.get('/auth/me'));
      setStoredUser(data);
      set({ user: data });
      return data;
    } catch {
      clearToken();
      set({ token: null, user: null });
      return null;
    }
  },
}));
