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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          created_at: string
          id: string
          name_en: string | null
          name_fr: string
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          name_en?: string | null
          name_fr: string
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          name_en?: string | null
          name_fr?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          category_id: string | null
          content: string | null
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      client_references: {
        Row: {
          created_at: string
          dark_logo: boolean
          id: string
          logo_url: string | null
          name: string
          sort_order: number
          updated_at: string
          visible: boolean
          website: string | null
        }
        Insert: {
          created_at?: string
          dark_logo?: boolean
          id?: string
          logo_url?: string | null
          name: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
          website?: string | null
        }
        Update: {
          created_at?: string
          dark_logo?: boolean
          id?: string
          logo_url?: string | null
          name?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
          website?: string | null
        }
        Relationships: []
      }
      formations: {
        Row: {
          attestation: string | null
          audience: string | null
          created_at: string
          description_en: string | null
          description_fr: string | null
          duree: string | null
          evaluation: string | null
          extra_sections: Json
          id: string
          image_url: string | null
          methodes: string | null
          objectif: string | null
          pdf_url: string | null
          prerequis: string | null
          programme: Json
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          status: string
          title_en: string | null
          title_fr: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          attestation?: string | null
          audience?: string | null
          created_at?: string
          description_en?: string | null
          description_fr?: string | null
          duree?: string | null
          evaluation?: string | null
          extra_sections?: Json
          id?: string
          image_url?: string | null
          methodes?: string | null
          objectif?: string | null
          pdf_url?: string | null
          prerequis?: string | null
          programme?: Json
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          status?: string
          title_en?: string | null
          title_fr: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          attestation?: string | null
          audience?: string | null
          created_at?: string
          description_en?: string | null
          description_fr?: string | null
          duree?: string | null
          evaluation?: string | null
          extra_sections?: Json
          id?: string
          image_url?: string | null
          methodes?: string | null
          objectif?: string | null
          pdf_url?: string | null
          prerequis?: string | null
          programme?: Json
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          status?: string
          title_en?: string | null
          title_fr?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      leads: {
        Row: {
          company: string | null
          created_at: string
          email: string | null
          form_type: string
          id: string
          message: string | null
          name: string
          notes: string | null
          phone: string | null
          status: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email?: string | null
          form_type?: string
          id?: string
          message?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string | null
          form_type?: string
          id?: string
          message?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          created_at: string
          folder: string
          id: string
          mime_type: string | null
          name: string
          path: string
          size_bytes: number | null
          url: string
        }
        Insert: {
          created_at?: string
          folder?: string
          id?: string
          mime_type?: string | null
          name: string
          path: string
          size_bytes?: number | null
          url: string
        }
        Update: {
          created_at?: string
          folder?: string
          id?: string
          mime_type?: string | null
          name?: string
          path?: string
          size_bytes?: number | null
          url?: string
        }
        Relationships: []
      }
      nav_items: {
        Row: {
          created_at: string
          group_key: string | null
          href: string
          id: string
          label_en: string
          label_fr: string
          location: string
          sort_order: number
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          group_key?: string | null
          href: string
          id?: string
          label_en: string
          label_fr: string
          location?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          group_key?: string | null
          href?: string
          id?: string
          label_en?: string
          label_fr?: string
          location?: string
          sort_order?: number
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      sections: {
        Row: {
          block_key: string
          body_en: string | null
          body_fr: string | null
          component: string
          created_at: string
          cta_href: string | null
          cta_label_en: string | null
          cta_label_fr: string | null
          data: Json
          eyebrow: string | null
          id: string
          image_url: string | null
          page: string
          sort_order: number
          status: string
          subtitle_en: string | null
          subtitle_fr: string | null
          title_en: string | null
          title_fr: string | null
          updated_at: string
          visible: boolean
        }
        Insert: {
          block_key: string
          body_en?: string | null
          body_fr?: string | null
          component?: string
          created_at?: string
          cta_href?: string | null
          cta_label_en?: string | null
          cta_label_fr?: string | null
          data?: Json
          eyebrow?: string | null
          id?: string
          image_url?: string | null
          page?: string
          sort_order?: number
          status?: string
          subtitle_en?: string | null
          subtitle_fr?: string | null
          title_en?: string | null
          title_fr?: string | null
          updated_at?: string
          visible?: boolean
        }
        Update: {
          block_key?: string
          body_en?: string | null
          body_fr?: string | null
          component?: string
          created_at?: string
          cta_href?: string | null
          cta_label_en?: string | null
          cta_label_fr?: string | null
          data?: Json
          eyebrow?: string | null
          id?: string
          image_url?: string | null
          page?: string
          sort_order?: number
          status?: string
          subtitle_en?: string | null
          subtitle_fr?: string | null
          title_en?: string | null
          title_fr?: string | null
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      sectors: {
        Row: {
          created_at: string
          description_en: string | null
          description_fr: string | null
          icon: string | null
          id: string
          image_url: string | null
          sort_order: number
          title_en: string | null
          title_fr: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          description_en?: string | null
          description_fr?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number
          title_en?: string | null
          title_fr: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          description_en?: string | null
          description_fr?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number
          title_en?: string | null
          title_fr?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      seo_pages: {
        Row: {
          canonical: string | null
          created_at: string
          description: string | null
          id: string
          noindex: boolean
          og_description: string | null
          og_image: string | null
          og_title: string | null
          path: string
          title: string | null
          updated_at: string
        }
        Insert: {
          canonical?: string | null
          created_at?: string
          description?: string | null
          id?: string
          noindex?: boolean
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          path: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          canonical?: string | null
          created_at?: string
          description?: string | null
          id?: string
          noindex?: boolean
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          path?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          bullets: Json
          created_at: string
          description_en: string | null
          description_fr: string | null
          icon: string | null
          id: string
          image_url: string | null
          sort_order: number
          status: string
          title_en: string | null
          title_fr: string
          updated_at: string
          visible: boolean
        }
        Insert: {
          bullets?: Json
          created_at?: string
          description_en?: string | null
          description_fr?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number
          status?: string
          title_en?: string | null
          title_fr: string
          updated_at?: string
          visible?: boolean
        }
        Update: {
          bullets?: Json
          created_at?: string
          description_en?: string | null
          description_fr?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number
          status?: string
          title_en?: string | null
          title_fr?: string
          updated_at?: string
          visible?: boolean
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
    },
  },
} as const
