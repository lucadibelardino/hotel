import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jxboxrnwslttzqafdooa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4Ym94cm53c2x0dHpxYWZkb29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMTYzMjMsImV4cCI6MjA4MDg5MjMyM30.K5lmwfTQ2xgfoL3aW8I2JUBxh8XRjpBgHPhq4Pj6RyE'

export const supabase = createClient(supabaseUrl, supabaseKey)
