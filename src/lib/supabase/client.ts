import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Uses environment variables if available, otherwise initialized with placeholders
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://stvnypndebvyikfvhdhx.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0dm55cG5kZWJ2eWlrZnZoZGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NDA2MjQsImV4cCI6MjA5MjAxNjYyNH0.itUX-3ABfzXhvOtfL2NNW7tjTKpD7JCAcnw-9M3Hfr0'
  )
}
