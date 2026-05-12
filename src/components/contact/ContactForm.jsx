import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import api from '../../lib/api.js';
import { contactSchema, REVENUE_OPTIONS, SERVICE_OPTIONS } from '../../lib/schemas.js';
import { Input, Textarea, Select } from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';

export default function ContactForm() {
  const [search] = useSearchParams();
  const preselectService = search.get('service');
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      brandName: '',
      monthlyRevenue: '',
      services: preselectService ? [preselectService] : [],
      message: '',
      context: '',
      website: '',
    },
  });

  const services = watch('services');

  function toggleService(slug) {
    const next = services.includes(slug)
      ? services.filter((s) => s !== slug)
      : [...services, slug];
    setValue('services', next, { shouldValidate: true });
  }

  async function onSubmit(values) {
    try {
      await api.post('/contact', values);
      setSubmitted(true);
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      if (apiErrors) {
        apiErrors.forEach((e) => setError(e.field, { message: e.message }));
      } else {
        setError('root', { message: err.response?.data?.message || 'Submission failed' });
      }
    }
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-success/30 bg-success/5 p-8 md:p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-ink">Got it.</h3>
        <p className="mt-3 text-ink-sec text-base md:text-lg leading-relaxed">
          We'll come back within 4 working hours with observations — not a calendar invite.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="name"
          label="Your name"
          placeholder="What do we call you?"
          required
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="you@yourbrand.com"
          required
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="brandName"
          label="Brand name"
          placeholder="The brand we'll be building for"
          required
          error={errors.brandName?.message}
          {...register('brandName')}
        />
        <Select
          id="monthlyRevenue"
          label="Monthly revenue"
          required
          options={REVENUE_OPTIONS}
          placeholder="Give us a ballpark — we won't judge"
          error={errors.monthlyRevenue?.message}
          {...register('monthlyRevenue')}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-ink-sec">
          What you need help with <span className="text-tangerine">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SERVICE_OPTIONS.map((s) => {
            const active = services.includes(s.value);
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => toggleService(s.value)}
                className={`text-left rounded-xl border px-4 py-3 text-sm transition-all duration-300 ${
                  active
                    ? 'border-ink bg-ink text-ink-inverse'
                    : 'border-subtle bg-elevated text-ink-sec hover:border-strong'
                }`}
              >
                <span
                  className={`inline-flex h-4 w-4 items-center justify-center rounded mr-2 align-middle border transition-colors ${
                    active ? 'border-ink-inverse bg-ink-inverse text-ink' : 'border-strong'
                  }`}
                >
                  {active && (
                    <svg viewBox="0 0 16 16" className="h-3 w-3">
                      <path
                        fill="currentColor"
                        d="M6.667 11.333L3.333 8l-.94.94 4.274 4.274 8.94-8.94-.94-.94z"
                      />
                    </svg>
                  )}
                </span>
                {s.label}
              </button>
            );
          })}
        </div>
        {errors.services?.message && (
          <p className="text-xs text-error" role="alert">
            {errors.services.message}
          </p>
        )}
      </div>

      <Textarea
        id="message"
        label="What's broken?"
        placeholder="What's the one thing you'd fix tomorrow?"
        required
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />

      <Textarea
        id="context"
        label="Anything else we should know"
        placeholder="Context that helps us skip the small talk on the first call"
        rows={3}
        error={errors.context?.message}
        {...register('context')}
      />

      {/* Honeypot — hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      {errors.root?.message && (
        <p className="text-sm text-error" role="alert">
          {errors.root.message}
        </p>
      )}

      <div className="pt-2">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting ? 'Sending…' : "Send It In. We'll Come Prepared."}
        </Button>
      </div>
    </form>
  );
}
