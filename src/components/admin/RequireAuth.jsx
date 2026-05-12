import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore.js';

export default function RequireAuth({ children }) {
  const location = useLocation();
  const { token, hydrateFromServer } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!token) {
      setHydrated(true);
      return;
    }
    hydrateFromServer().finally(() => setHydrated(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center text-ink-sec">
        Loading…
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
