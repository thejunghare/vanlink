import AsyncStorage from '@react-native-async-storage/async-storage'
import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://lgttcqztvwpzogawguvv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndHRjcXp0dndwem9nYXdndXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4OTgxMDAsImV4cCI6MjAzNDQ3NDEwMH0.JBWHvWWZ8WOjBLiLvTQ8vFMvQY6sm6anwPpJysueMKg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})