export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          created_at: string | null
          user_id: string | null
          booking_date: string | null
          guest_count: number | null
          booking_type: 'dining' | 'collaboration' | 'special_order'
          status: 'pending' | 'confirmed' | 'cancelled'
          notes: string | null
          dietary_requirements: string | null
          venue_type: 'home' | 'rental' | null
          venue_address: string | null
          phone_number: string
          email: string | null
          selected_areas: string[] | null
          booking_timestamp: string
          estimated_total: number | null
          selected_items: Json[] | null
          selected_addons: string[] | null
          selected_package: string | null
          order_type: 'dining' | 'special_order'
          total_amount: number | null
          order_details: Json | null
          paylah_ref: Json | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          user_id?: string | null
          booking_date?: string | null
          guest_count?: number | null
          booking_type: 'dining' | 'collaboration' | 'special_order'
          status?: 'pending' | 'confirmed' | 'cancelled'
          notes?: string | null
          dietary_requirements?: string | null
          venue_type?: 'home' | 'rental' | null
          venue_address?: string | null
          phone_number: string
          email?: string | null
          selected_areas?: string[] | null
          booking_timestamp?: string
          estimated_total?: number | null
          selected_items?: Json[] | null
          selected_addons?: string[] | null
          selected_package?: string | null
          order_type?: 'dining' | 'special_order'
          total_amount?: number | null
          order_details?: Json | null
          paylah_ref?: Json | null
        }
        Update: {
          id?: string
          created_at?: string | null
          user_id?: string | null
          booking_date?: string | null
          guest_count?: number | null
          booking_type?: 'dining' | 'collaboration' | 'special_order'
          status?: 'pending' | 'confirmed' | 'cancelled'
          notes?: string | null
          dietary_requirements?: string | null
          venue_type?: 'home' | 'rental' | null
          venue_address?: string | null
          phone_number?: string
          email?: string | null
          selected_areas?: string[] | null
          booking_timestamp?: string
          estimated_total?: number | null
          selected_items?: Json[] | null
          selected_addons?: string[] | null
          selected_package?: string | null
          order_type?: 'dining' | 'special_order'
          total_amount?: number | null
          order_details?: Json | null
          paylah_ref?: Json | null
        }
      }
      pending_booking_logs: {
        Row: {
          id: string
          booking_id: string
          created_at: string | null
          payload: Json | null
        }
        Insert: {
          id?: string
          booking_id: string
          created_at?: string | null
          payload?: Json | null
        }
        Update: {
          id?: string
          booking_id?: string
          created_at?: string | null
          payload?: Json | null
        }
      }
      menu_selections: {
        Row: {
          id: string
          booking_id: string
          item_name: string
          created_at: string | null
          quantity: number
        }
        Insert: {
          id?: string
          booking_id: string
          item_name: string
          created_at?: string | null
          quantity?: number
        }
        Update: {
          id?: string
          booking_id?: string
          item_name?: string
          created_at?: string | null
          quantity?: number
        }
      }
      collaborations: {
        Row: {
          id: string
          booking_id: string
          collaboration_type: string
          project_description: string | null
          social_media: string | null
          timeline: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          booking_id: string
          collaboration_type: string
          project_description?: string | null
          social_media?: string | null
          timeline?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          booking_id?: string
          collaboration_type?: string
          project_description?: string | null
          social_media?: string | null
          timeline?: string | null
          created_at?: string | null
        }
      }
      order_choices: {
        Row: {
          id: string
          booking_id: string
          name: string
          quantity: number
          created_at: string | null
        }
        Insert: {
          id?: string
          booking_id: string
          name: string
          quantity?: number
          created_at?: string | null
        }
        Update: {
          id?: string
          booking_id?: string
          name?: string
          quantity?: number
          created_at?: string | null
        }
      }
      special_orders: {
        Row: {
          id: string
          booking_id: string
          item_type: 'pinsa_base' | 'lasagna' | 'pizzette' | 'sharing_platter'
          size: 'XS' | 'S' | 'M' | 'L'
          quantity: number
          created_at: string | null
          price: number
          name: string
        }
        Insert: {
          id?: string
          booking_id: string
          item_type: 'pinsa_base' | 'lasagna' | 'pizzette' | 'sharing_platter'
          size: 'XS' | 'S' | 'M' | 'L'
          quantity?: number
          created_at?: string | null
          price: number
          name: string
        }
        Update: {
          id?: string
          booking_id?: string
          item_type?: 'pinsa_base' | 'lasagna' | 'pizzette' | 'sharing_platter'
          size?: 'XS' | 'S' | 'M' | 'L'
          quantity?: number
          created_at?: string | null
          price?: number
          name?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          name: string
          email: string
          subscribed_at: string | null
          is_active: boolean
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          subscribed_at?: string | null
          is_active?: boolean
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subscribed_at?: string | null
          is_active?: boolean
          created_at?: string | null
        }
      }
    }
  }
}