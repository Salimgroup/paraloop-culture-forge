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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      articles: {
        Row: {
          category: string | null
          created_at: string
          domain: string
          duplicate_of: string | null
          excerpt: string | null
          flags: string[] | null
          id: string
          impact_level: string | null
          published_at: string | null
          reasons: string[] | null
          region_hint: string | null
          regions: string[] | null
          relevance_score: number | null
          reviewed_at: string | null
          scored_at: string | null
          source_id: string | null
          status: string
          tags: string[] | null
          title: string
          topics: string[] | null
          updated_at: string
          url: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          domain: string
          duplicate_of?: string | null
          excerpt?: string | null
          flags?: string[] | null
          id?: string
          impact_level?: string | null
          published_at?: string | null
          reasons?: string[] | null
          region_hint?: string | null
          regions?: string[] | null
          relevance_score?: number | null
          reviewed_at?: string | null
          scored_at?: string | null
          source_id?: string | null
          status?: string
          tags?: string[] | null
          title: string
          topics?: string[] | null
          updated_at?: string
          url: string
        }
        Update: {
          category?: string | null
          created_at?: string
          domain?: string
          duplicate_of?: string | null
          excerpt?: string | null
          flags?: string[] | null
          id?: string
          impact_level?: string | null
          published_at?: string | null
          reasons?: string[] | null
          region_hint?: string | null
          regions?: string[] | null
          relevance_score?: number | null
          reviewed_at?: string | null
          scored_at?: string | null
          source_id?: string | null
          status?: string
          tags?: string[] | null
          title?: string
          topics?: string[] | null
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "articles_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      culture_articles: {
        Row: {
          analyzed_at: string | null
          article_url: string
          category: string | null
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          paraloop_analysis: string | null
          paraloop_headline: string | null
          paraloop_vibe: string | null
          published: boolean
          published_at: string | null
          relevance_score: number | null
          scraped_at: string
          source_name: string
          source_url: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          analyzed_at?: string | null
          article_url: string
          category?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          paraloop_analysis?: string | null
          paraloop_headline?: string | null
          paraloop_vibe?: string | null
          published?: boolean
          published_at?: string | null
          relevance_score?: number | null
          scraped_at?: string
          source_name: string
          source_url: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          analyzed_at?: string | null
          article_url?: string
          category?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          paraloop_analysis?: string | null
          paraloop_headline?: string | null
          paraloop_vibe?: string | null
          published?: boolean
          published_at?: string | null
          relevance_score?: number | null
          scraped_at?: string
          source_name?: string
          source_url?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      curated_articles: {
        Row: {
          actions_next: string[]
          article_id: string
          author: string | null
          canonical_url: string
          created_at: string
          headline_paraloop: string
          id: string
          outlet: string
          published: boolean
          published_at: string | null
          pull_quote: Json
          seo_slug: string
          social_caption: string
          source_published_at: string | null
          source_region: string | null
          summary_paraloop: string
          text_extracted: string
          title_source: string
          tl_dr_bullets: string[]
          updated_at: string
          wellness_angle: string
        }
        Insert: {
          actions_next: string[]
          article_id: string
          author?: string | null
          canonical_url: string
          created_at?: string
          headline_paraloop: string
          id?: string
          outlet: string
          published?: boolean
          published_at?: string | null
          pull_quote: Json
          seo_slug: string
          social_caption: string
          source_published_at?: string | null
          source_region?: string | null
          summary_paraloop: string
          text_extracted: string
          title_source: string
          tl_dr_bullets: string[]
          updated_at?: string
          wellness_angle: string
        }
        Update: {
          actions_next?: string[]
          article_id?: string
          author?: string | null
          canonical_url?: string
          created_at?: string
          headline_paraloop?: string
          id?: string
          outlet?: string
          published?: boolean
          published_at?: string | null
          pull_quote?: Json
          seo_slug?: string
          social_caption?: string
          source_published_at?: string | null
          source_region?: string | null
          summary_paraloop?: string
          text_extracted?: string
          title_source?: string
          tl_dr_bullets?: string[]
          updated_at?: string
          wellness_angle?: string
        }
        Relationships: [
          {
            foreignKeyName: "curated_articles_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      social_posts: {
        Row: {
          caption: string
          created_at: string
          curated_article_id: string
          external_id: string | null
          hashtag: string
          id: string
          platform: string
          posted: boolean
          posted_at: string | null
        }
        Insert: {
          caption: string
          created_at?: string
          curated_article_id: string
          external_id?: string | null
          hashtag?: string
          id?: string
          platform: string
          posted?: boolean
          posted_at?: string | null
        }
        Update: {
          caption?: string
          created_at?: string
          curated_article_id?: string
          external_id?: string | null
          hashtag?: string
          id?: string
          platform?: string
          posted?: boolean
          posted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_posts_curated_article_id_fkey"
            columns: ["curated_article_id"]
            isOneToOne: false
            referencedRelation: "curated_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_posts_curated_article_id_fkey"
            columns: ["curated_article_id"]
            isOneToOne: false
            referencedRelation: "curated_articles_public"
            referencedColumns: ["id"]
          },
        ]
      }
      sources: {
        Row: {
          active: boolean
          bias_label: string | null
          created_at: string
          id: string
          last_fetched_at: string | null
          name: string
          notes: string | null
          regions: string[] | null
          type: string
          updated_at: string
          url: string
          weight: number
        }
        Insert: {
          active?: boolean
          bias_label?: string | null
          created_at?: string
          id?: string
          last_fetched_at?: string | null
          name: string
          notes?: string | null
          regions?: string[] | null
          type: string
          updated_at?: string
          url: string
          weight?: number
        }
        Update: {
          active?: boolean
          bias_label?: string | null
          created_at?: string
          id?: string
          last_fetched_at?: string | null
          name?: string
          notes?: string | null
          regions?: string[] | null
          type?: string
          updated_at?: string
          url?: string
          weight?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      curated_articles_public: {
        Row: {
          author: string | null
          canonical_url: string | null
          headline_paraloop: string | null
          id: string | null
          outlet: string | null
          published_at: string | null
          seo_slug: string | null
          source_published_at: string | null
          source_region: string | null
          summary_paraloop: string | null
        }
        Insert: {
          author?: string | null
          canonical_url?: string | null
          headline_paraloop?: string | null
          id?: string | null
          outlet?: string | null
          published_at?: string | null
          seo_slug?: string | null
          source_published_at?: string | null
          source_region?: string | null
          summary_paraloop?: string | null
        }
        Update: {
          author?: string | null
          canonical_url?: string | null
          headline_paraloop?: string | null
          id?: string | null
          outlet?: string | null
          published_at?: string | null
          seo_slug?: string | null
          source_published_at?: string | null
          source_region?: string | null
          summary_paraloop?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor" | "viewer"
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
    Enums: {
      app_role: ["admin", "editor", "viewer"],
    },
  },
} as const
