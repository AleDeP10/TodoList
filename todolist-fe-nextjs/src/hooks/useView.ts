'use client';

import { useContext } from 'react';
import { ViewContext } from '@/lib/view';

/**
 * Hook to access current view context.
 * Throws if used outside of ViewProvider.
 */
export function useView() {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error('useView must be used within ViewProvider');
  return ctx;
}