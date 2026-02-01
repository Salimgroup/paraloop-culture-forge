-- 1. Create role system enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 3. Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 5. RLS policies for user_roles table - users can only see their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- 6. Fix curated_articles RLS - only published content publicly visible
DROP POLICY IF EXISTS "Public read access for curated_articles" ON curated_articles;
CREATE POLICY "Public read published only" ON curated_articles
  FOR SELECT USING (published = true);

-- Admin/Editor management policies for curated_articles
CREATE POLICY "Admins can manage curated_articles" ON curated_articles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can manage curated_articles" ON curated_articles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'editor'))
  WITH CHECK (public.has_role(auth.uid(), 'editor'));

-- 7. Fix sources RLS - remove public access, service-role only
DROP POLICY IF EXISTS "Public read access for sources" ON sources;

-- Admin access to sources
CREATE POLICY "Admins can view sources" ON sources
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage sources" ON sources
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 8. Fix social_posts RLS - only posted content publicly visible
DROP POLICY IF EXISTS "Public read access for social_posts" ON social_posts;
CREATE POLICY "Public read posted only" ON social_posts
  FOR SELECT USING (posted = true);

-- Admin/Editor management policies for social_posts
CREATE POLICY "Admins can manage social_posts" ON social_posts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can manage social_posts" ON social_posts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'editor'))
  WITH CHECK (public.has_role(auth.uid(), 'editor'));