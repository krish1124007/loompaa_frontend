import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import api from '../../lib/api.js';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import { Input } from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useAuthStore } from '../../stores/authStore.js';

export default function Settings() {
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState('');

  async function onSubmit({ currentPassword, newPassword, confirmPassword }) {
    setError('');
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    try {
      await api.post('/auth/change-password', { currentPassword, newPassword });
      toast.success('Password updated.');
      reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password.');
    }
  }

  return (
    <>
      <Helmet>
        <title>Settings | Loompaa Admin</title>
      </Helmet>
      <div className="p-6 md:p-10 max-w-2xl">
        <AdminPageHeader
          title="Settings"
          breadcrumbs={[{ to: '/admin', label: 'Dashboard' }, { label: 'Settings' }]}
        />

        <fieldset className="rounded-card border border-subtle bg-elevated p-6 md:p-8 space-y-4 mb-6">
          <legend className="font-mono text-eyebrow uppercase tracking-[0.18em] text-tangerine px-2">
            Profile
          </legend>
          <p className="text-sm text-ink-sec">
            <span className="text-ink">Name:</span> {user?.name}
          </p>
          <p className="text-sm text-ink-sec">
            <span className="text-ink">Email:</span> {user?.email}
          </p>
          <p className="text-sm text-ink-sec">
            <span className="text-ink">Role:</span> {user?.role}
          </p>
        </fieldset>

        <fieldset className="rounded-card border border-subtle bg-elevated p-6 md:p-8 space-y-4">
          <legend className="font-mono text-eyebrow uppercase tracking-[0.18em] text-tangerine px-2">
            Change password
          </legend>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="currentPassword"
              type="password"
              label="Current password"
              required
              autoComplete="current-password"
              error={errors.currentPassword?.message}
              {...register('currentPassword', { required: 'Required' })}
            />
            <Input
              id="newPassword"
              type="password"
              label="New password"
              required
              autoComplete="new-password"
              error={errors.newPassword?.message}
              {...register('newPassword', { required: 'Required', minLength: { value: 8, message: 'At least 8 characters' } })}
            />
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm new password"
              required
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', { required: 'Required' })}
            />
            {error && <p className="text-sm text-error">{error}</p>}
            <Button type="submit" disabled={isSubmitting} arrow={false}>
              {isSubmitting ? 'Updating…' : 'Update password'}
            </Button>
          </form>
        </fieldset>
      </div>
    </>
  );
}
