import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xznfdcidifznijmfpnjx.supabase.co';
// Pega entre las comillas la clave anon copiada de Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6bmZkY2lkaWZ6bmlqbWZwbmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxNzM1MTksImV4cCI6MjEwNzc0OTUxOX0.evzQgB9CSQZ3jiEY4RXSLyQ-d9r4vbQ32HgelUGSyyY'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);