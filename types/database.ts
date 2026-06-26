export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Database = {
  public: {
    Tables: {
      plans: {
        Row: {
          id: string
          name: string
          price_sar: number
          monthly_limit: number
          image_access: 'men' | 'women' | 'both'
          is_active: boolean
        }
        Insert: Omit<Database['public']['Tables']['plans']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['plans']['Insert']>
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'customer' | 'admin'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      api_keys: {
        Row: {
          id: string
          user_id: string
          key_hash: string
          key_prefix: string
          plan_id: string
          status: 'pending' | 'active' | 'suspended'
          monthly_limit: number
          calls_this_month: number
          calls_reset_at: string
          created_at: string
          expires_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['api_keys']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['api_keys']['Insert']>
      }
      payments: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          amount_sar: number
          status: 'pending' | 'approved' | 'rejected'
          streampay_transaction_id: string
          created_at: string
          approved_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['payments']['Insert']>
      }
      images: {
        Row: {
          id: string
          slug: string
          name_en: string
          gender: 'men' | 'women'
          muscle_group: string
          cdn_url: string
          is_active: boolean
          sort_order: number
        }
        Insert: Omit<Database['public']['Tables']['images']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['images']['Insert']>
      }
    }
  }
}
