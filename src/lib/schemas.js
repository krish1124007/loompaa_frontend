import { z } from 'zod';

export const REVENUE_OPTIONS = [
  { value: 'pre-revenue', label: 'Pre-revenue' },
  { value: '0-5L', label: '₹0–5L / month' },
  { value: '5L-25L', label: '₹5L–25L / month' },
  { value: '25L-1Cr', label: '₹25L–1Cr / month' },
  { value: '1Cr+', label: '₹1Cr+ / month' },
];

export const SERVICE_OPTIONS = [
  { value: 'brand-building', label: 'Brand Building' },
  { value: 'performance-marketing', label: 'Performance Marketing' },
  { value: 'website-development', label: 'Website Development' },
  { value: 'marketing-ai-automation', label: 'Marketing AI & Automation' },
  { value: 'sales-automation', label: 'Sales Automation' },
  { value: 'ecommerce-marketplace', label: 'E-Commerce Marketplace' },
  { value: 'logistics-operations', label: 'Logistics & Operations' },
  { value: 'd2c-consultancy', label: 'D2C Consultancy' },
];

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Tell us your name').max(100),
  email: z.string().trim().email('That email looks off'),
  brandName: z.string().trim().min(2, 'Brand name?').max(120),
  monthlyRevenue: z.enum(['pre-revenue', '0-5L', '5L-25L', '25L-1Cr', '1Cr+'], {
    errorMap: () => ({ message: 'Pick a revenue band' }),
  }),
  services: z.array(z.string()).min(1, 'Pick at least one service'),
  message: z
    .string()
    .trim()
    .min(20, 'Give us at least 20 characters')
    .max(2000, 'Keep it under 2000 characters'),
  context: z.string().trim().max(1000).optional().or(z.literal('')),
  website: z.string().max(0, 'Bot detected').optional().or(z.literal('')),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email('That email looks off'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
