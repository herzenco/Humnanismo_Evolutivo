import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

// Client-side Supabase client for use in "use client" components
// This maintains the same import path as the original Lovable project
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
