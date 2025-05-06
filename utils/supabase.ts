import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://exvdjhstlcushbfkoomw.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dmRqaHN0bGN1c2hiZmtvb213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NzA2NjEsImV4cCI6MjA2MTQ0NjY2MX0.e2SrMGvbNWw-uk5Ie19-2HcSCk-f5jckm5nuLEVrV_E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
