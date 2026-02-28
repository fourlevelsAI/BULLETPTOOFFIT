export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      app_counters: {
        Row: {
          count: number
          id: string
          max_count: number
          updated_at: string
        }
        Insert: {
          count?: number
          id: string
          max_count?: number
          updated_at?: string
        }
        Update: {
          count?: number
          id?: string
          max_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      body_measurements: {
        Row: {
          arms: number | null
          body_fat_percent: number | null
          chest: number | null
          created_at: string
          hips: number | null
          id: string
          measured_at: string
          thighs: number | null
          user_id: string
          waist: number | null
          weight: number | null
        }
        Insert: {
          arms?: number | null
          body_fat_percent?: number | null
          chest?: number | null
          created_at?: string
          hips?: number | null
          id?: string
          measured_at?: string
          thighs?: number | null
          user_id: string
          waist?: number | null
          weight?: number | null
        }
        Update: {
          arms?: number | null
          body_fat_percent?: number | null
          chest?: number | null
          created_at?: string
          hips?: number | null
          id?: string
          measured_at?: string
          thighs?: number | null
          user_id?: string
          waist?: number | null
          weight?: number | null
        }
        Relationships: []
      }
      food_logs: {
        Row: {
          calories: number | null
          carbs: number | null
          created_at: string
          fat: number | null
          fiber: number | null
          food_name: string
          id: string
          logged_at: string
          meal_type: string
          protein: number | null
          serving_size: string | null
          user_id: string
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          created_at?: string
          fat?: number | null
          fiber?: number | null
          food_name: string
          id?: string
          logged_at?: string
          meal_type: string
          protein?: number | null
          serving_size?: string | null
          user_id: string
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          created_at?: string
          fat?: number | null
          fiber?: number | null
          food_name?: string
          id?: string
          logged_at?: string
          meal_type?: string
          protein?: number | null
          serving_size?: string | null
          user_id?: string
        }
        Relationships: []
      }
      meal_templates: {
        Row: {
          created_at: string
          foods: Json
          id: string
          meal_type: string | null
          name: string
          total_calories: number | null
          total_carbs: number | null
          total_fat: number | null
          total_protein: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          foods?: Json
          id?: string
          meal_type?: string | null
          name: string
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_protein?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          foods?: Json
          id?: string
          meal_type?: string | null
          name?: string
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_protein?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          active_minutes_goal: number | null
          activity_level: string | null
          age: number | null
          avatar_url: string | null
          calorie_goal: number | null
          carbs_goal: number | null
          created_at: string
          dietary_preferences: string[] | null
          display_name: string | null
          fat_goal: number | null
          free_months_earned: number | null
          goal: string | null
          height: number | null
          id: string
          is_founding_member: boolean | null
          is_lifetime: boolean | null
          is_pro: boolean | null
          long_term_goal: string | null
          monthly_prs_goal: number | null
          monthly_workouts_goal: number | null
          onboarding_completed: boolean | null
          protein_goal: number | null
          referral_code: string | null
          referral_count: number | null
          referred_by: string | null
          sex: string | null
          steps_goal: number | null
          stripe_customer_id: string | null
          subscription_end: string | null
          subscription_tier: string | null
          target_body_fat: number | null
          target_weight: number | null
          unit_system: string | null
          updated_at: string
          user_id: string
          water_goal: number | null
          weekly_calorie_deficit: number | null
          weekly_cardio_goal: number | null
          weekly_weight_change: number | null
          weekly_workouts_goal: number | null
          weight: number | null
        }
        Insert: {
          active_minutes_goal?: number | null
          activity_level?: string | null
          age?: number | null
          avatar_url?: string | null
          calorie_goal?: number | null
          carbs_goal?: number | null
          created_at?: string
          dietary_preferences?: string[] | null
          display_name?: string | null
          fat_goal?: number | null
          free_months_earned?: number | null
          goal?: string | null
          height?: number | null
          id?: string
          is_founding_member?: boolean | null
          is_lifetime?: boolean | null
          is_pro?: boolean | null
          long_term_goal?: string | null
          monthly_prs_goal?: number | null
          monthly_workouts_goal?: number | null
          onboarding_completed?: boolean | null
          protein_goal?: number | null
          referral_code?: string | null
          referral_count?: number | null
          referred_by?: string | null
          sex?: string | null
          steps_goal?: number | null
          stripe_customer_id?: string | null
          subscription_end?: string | null
          subscription_tier?: string | null
          target_body_fat?: number | null
          target_weight?: number | null
          unit_system?: string | null
          updated_at?: string
          user_id: string
          water_goal?: number | null
          weekly_calorie_deficit?: number | null
          weekly_cardio_goal?: number | null
          weekly_weight_change?: number | null
          weekly_workouts_goal?: number | null
          weight?: number | null
        }
        Update: {
          active_minutes_goal?: number | null
          activity_level?: string | null
          age?: number | null
          avatar_url?: string | null
          calorie_goal?: number | null
          carbs_goal?: number | null
          created_at?: string
          dietary_preferences?: string[] | null
          display_name?: string | null
          fat_goal?: number | null
          free_months_earned?: number | null
          goal?: string | null
          height?: number | null
          id?: string
          is_founding_member?: boolean | null
          is_lifetime?: boolean | null
          is_pro?: boolean | null
          long_term_goal?: string | null
          monthly_prs_goal?: number | null
          monthly_workouts_goal?: number | null
          onboarding_completed?: boolean | null
          protein_goal?: number | null
          referral_code?: string | null
          referral_count?: number | null
          referred_by?: string | null
          sex?: string | null
          steps_goal?: number | null
          stripe_customer_id?: string | null
          subscription_end?: string | null
          subscription_tier?: string | null
          target_body_fat?: number | null
          target_weight?: number | null
          unit_system?: string | null
          updated_at?: string
          user_id?: string
          water_goal?: number | null
          weekly_calorie_deficit?: number | null
          weekly_cardio_goal?: number | null
          weekly_weight_change?: number | null
          weekly_workouts_goal?: number | null
          weight?: number | null
        }
        Relationships: []
      }
      water_logs: {
        Row: {
          amount_ml: number
          created_at: string
          id: string
          logged_at: string
          user_id: string
        }
        Insert: {
          amount_ml: number
          created_at?: string
          id?: string
          logged_at?: string
          user_id: string
        }
        Update: {
          amount_ml?: number
          created_at?: string
          id?: string
          logged_at?: string
          user_id?: string
        }
        Relationships: []
      }
      weekly_plans: {
        Row: {
          created_at: string
          id: string
          plan_data: Json
          updated_at: string
          user_id: string
          week_start: string
        }
        Insert: {
          created_at?: string
          id?: string
          plan_data?: Json
          updated_at?: string
          user_id: string
          week_start: string
        }
        Update: {
          created_at?: string
          id?: string
          plan_data?: Json
          updated_at?: string
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
      workout_exercises: {
        Row: {
          created_at: string
          distance: number | null
          duration_seconds: number | null
          exercise_name: string
          id: string
          reps: number | null
          session_id: string
          sets: number | null
          sort_order: number | null
          weight: number | null
        }
        Insert: {
          created_at?: string
          distance?: number | null
          duration_seconds?: number | null
          exercise_name: string
          id?: string
          reps?: number | null
          session_id: string
          sets?: number | null
          sort_order?: number | null
          weight?: number | null
        }
        Update: {
          created_at?: string
          distance?: number | null
          duration_seconds?: number | null
          exercise_name?: string
          id?: string
          reps?: number | null
          session_id?: string
          sets?: number | null
          sort_order?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "workout_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_sessions: {
        Row: {
          calories_burned: number | null
          created_at: string
          duration_minutes: number | null
          id: string
          logged_at: string
          name: string
          notes: string | null
          user_id: string
          workout_type: string
        }
        Insert: {
          calories_burned?: number | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          logged_at?: string
          name: string
          notes?: string | null
          user_id: string
          workout_type: string
        }
        Update: {
          calories_burned?: number | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          logged_at?: string
          name?: string
          notes?: string | null
          user_id?: string
          workout_type?: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
