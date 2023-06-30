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
      booking: {
        Row: {
          cabin_id: number | null
          cabin_price: number | null
          comments: string | null
          created_at: string | null
          end_date: string | null
          extra_price: number | null
          guest_id: number | null
          has_breakfast: boolean | null
          id: number
          is_paid: boolean | null
          num_guests: number | null
          num_nights: number | null
          start_date: string | null
          status: string | null
          total_price: number | null
        }
        Insert: {
          cabin_id?: number | null
          cabin_price?: number | null
          comments?: string | null
          created_at?: string | null
          end_date?: string | null
          extra_price?: number | null
          guest_id?: number | null
          has_breakfast?: boolean | null
          id?: number
          is_paid?: boolean | null
          num_guests?: number | null
          num_nights?: number | null
          start_date?: string | null
          status?: string | null
          total_price?: number | null
        }
        Update: {
          cabin_id?: number | null
          cabin_price?: number | null
          comments?: string | null
          created_at?: string | null
          end_date?: string | null
          extra_price?: number | null
          guest_id?: number | null
          has_breakfast?: boolean | null
          id?: number
          is_paid?: boolean | null
          num_guests?: number | null
          num_nights?: number | null
          start_date?: string | null
          status?: string | null
          total_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_cabin_id_fkey"
            columns: ["cabin_id"]
            referencedRelation: "cabin"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_guest_id_fkey"
            columns: ["guest_id"]
            referencedRelation: "guest"
            referencedColumns: ["id"]
          }
        ]
      }
      cabin: {
        Row: {
          created_at: string | null
          description: string | null
          discount: number | null
          id: number
          image: string | null
          max_capacity: number | null
          name: string | null
          regular_price: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          discount?: number | null
          id?: number
          image?: string | null
          max_capacity?: number | null
          name?: string | null
          regular_price?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          discount?: number | null
          id?: number
          image?: string | null
          max_capacity?: number | null
          name?: string | null
          regular_price?: number | null
        }
        Relationships: []
      }
      guest: {
        Row: {
          country_flag: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: number
          national_id: string | null
          nationality: string | null
        }
        Insert: {
          country_flag?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          national_id?: string | null
          nationality?: string | null
        }
        Update: {
          country_flag?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          national_id?: string | null
          nationality?: string | null
        }
        Relationships: []
      }
      setting: {
        Row: {
          breakfast_price: number | null
          created_at: string | null
          id: number
          max_booking_length: number | null
          max_guest_per_booking: number | null
          min_booking_length: number | null
        }
        Insert: {
          breakfast_price?: number | null
          created_at?: string | null
          id?: number
          max_booking_length?: number | null
          max_guest_per_booking?: number | null
          min_booking_length?: number | null
        }
        Update: {
          breakfast_price?: number | null
          created_at?: string | null
          id?: number
          max_booking_length?: number | null
          max_guest_per_booking?: number | null
          min_booking_length?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
