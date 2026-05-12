import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  LayoutGrid,
  FileText,
  Inbox,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import { useAuthStore } from '../../stores/authStore.js';
import { cn } from '../../lib/cn.js';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/services', label: 'Services', icon: LayoutGrid },
  { to: '/admin/posts', label: 'Blog', icon: FileText },
  { to: '/admin/contacts', label: 'Contacts', icon: Inbox },
  { to: '/admin/subscribers', label: 'Subscribers', icon: Users },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  async function onLogout() {
    await logout();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-base text-ink flex">
      <aside className="hidden md:flex w-60 shrink-0 flex-col bg-elevated border-r border-subtle">
        <div className="px-6 py-6 border-b border-subtle">
          <Logo size="md" />
          <p className="text-xs text-ink-tri mt-1 font-mono uppercase tracking-wider">Admin</p>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors',
                  isActive
                    ? 'bg-base text-ink border border-subtle'
                    : 'text-ink-sec hover:text-ink hover:bg-base/50',
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-subtle space-y-1">
          {user && (
            <div className="px-3 py-2 text-xs text-ink-tri">
              <div className="text-ink truncate">{user.name}</div>
              <div className="truncate">{user.email}</div>
            </div>
          )}
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-ink-sec hover:text-error hover:bg-base/50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
