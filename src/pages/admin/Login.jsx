import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import Logo from '../../components/ui/Logo.jsx';
import { Input } from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useAuthStore } from '../../stores/authStore.js';

export default function Login() {
  const { login, token, loading, error } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.title = 'Admin Login | Loompaa';
  }, []);

  if (token) return <Navigate to={from} replace />;

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Login failed');
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Login | Loompaa</title>
      </Helmet>
      <div className="min-h-screen bg-base text-ink flex items-center justify-center px-6">
        <form onSubmit={onSubmit} className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-3">
            <Logo />
            <p className="font-mono text-eyebrow uppercase text-ink-tri">Admin</p>
          </div>
          <div className="space-y-4">
            <Input
              id="email"
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              id="password"
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <Button type="submit" size="lg" className="w-full" disabled={loading} arrow={false}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </>
  );
}
