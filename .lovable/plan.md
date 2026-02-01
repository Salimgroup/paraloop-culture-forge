
# Comprehensive Security Review and Remediation Plan

## Executive Summary

This security review identified **4 warning-level issues** and **1 info-level issue** that need to be addressed to protect your editorial workflow, competitive strategy, and user data.

---

## Current Security Status

### What's Working Well
- Edge functions have proper authentication (HMAC for automation, JWT for user actions)
- Input validation using Zod schemas is implemented across all functions
- Request body size limits prevent payload attacks
- Social share buttons properly encode URLs to prevent injection

### Critical Issues Found

| Priority | Issue | Risk Level | Impact |
|----------|-------|------------|--------|
| 1 | Unpublished editorial content exposed | WARN | Competitors can steal drafts before publication |
| 2 | Content source strategy visible | WARN | Reveals your RSS feeds, weights, and curation notes |
| 3 | Social media strategy exposed | WARN | Scheduled posts visible before going live |
| 4 | Articles table has RLS but no policies | WARN | Table is inaccessible (blocks functionality) |
| 5 | Twitter posting lacks authorization | WARN | Any authenticated user can post to your brand account |

---

## Detailed Findings

### 1. Unpublished Editorial Content Leak

**Current State:** The `curated_articles` table has a public SELECT policy with `USING (true)`, exposing ALL content including:
- Draft headlines and summaries before publication
- Full extracted text from sources
- SEO slugs and social captions in development

**Risk:** Competitors or scrapers can monitor your content pipeline and front-run your stories.

**Fix:** Restrict public access to only published articles:
```sql
DROP POLICY IF EXISTS "Public read access for curated_articles" ON curated_articles;
CREATE POLICY "Public read only published articles" ON curated_articles
  FOR SELECT USING (published = true);
```

### 2. Content Source Strategy Exposed

**Current State:** The `sources` table is fully readable, revealing:
- All 10 RSS feeds you monitor (IMF, World Bank, TechCabal, etc.)
- Source weights (1.3 to 1.6) showing editorial prioritization
- Bias labels and internal notes like "Macro trends, globalization"

**Risk:** Competitors can clone your content strategy or sources may change behavior.

**Fix:** Make sources private (service-role only):
```sql
DROP POLICY IF EXISTS "Public read access for sources" ON sources;
-- No public policy = only service role can access
```

### 3. Social Media Strategy Leak

**Current State:** The `social_posts` table exposes:
- Scheduled but unposted content (posted=false)
- Platform targeting decisions
- Captions and hashtags before they go live

**Risk:** Competitors can front-run your social campaigns.

**Fix:** Only show posted content publicly:
```sql
DROP POLICY IF EXISTS "Public read access for social_posts" ON social_posts;
CREATE POLICY "Public read only posted content" ON social_posts
  FOR SELECT USING (posted = true);
```

### 4. Articles Table Inaccessible

**Current State:** RLS is enabled but no policies exist, making the table completely inaccessible.

**Fix:** This is actually intentional based on your architecture memory noting "internal editorial workflow data is private." No change needed, but document this decision.

### 5. Twitter Posting Authorization Gap

**Current State:** The `post-to-twitter` function verifies the user is authenticated but does NOT check if they're authorized to post on behalf of your brand. Any logged-in user could post to your Twitter account.

**Risk:** Unauthorized brand messaging or abuse.

**Fix:** Add role-based authorization:
1. Create a `user_roles` table with an `app_role` enum
2. Add a `has_role()` security definer function
3. Check for 'admin' or 'editor' role before allowing posts

---

## Implementation Plan

### Phase 1: Database Security (Immediate)

1. **Update RLS policies** for `curated_articles`, `sources`, and `social_posts`
2. **Create user roles system** with proper security definer function
3. **Add service-role INSERT/UPDATE policies** for edge functions to write data

### Phase 2: Edge Function Authorization

1. **Update `post-to-twitter`** to verify user has 'admin' or 'editor' role
2. **Add audit logging** for sensitive operations (Twitter posts)

### Phase 3: Frontend Protection

1. **Hide admin actions** (Post to Twitter, Refresh Feed) from non-admin users
2. **Add authentication flow** with login/signup pages
3. **Implement protected routes** for admin functionality

---

## Technical Implementation Details

### Database Migration

```sql
-- 1. Create role system
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 2. Fix RLS policies
DROP POLICY IF EXISTS "Public read access for curated_articles" ON curated_articles;
CREATE POLICY "Public read published only" ON curated_articles
  FOR SELECT USING (published = true);

DROP POLICY IF EXISTS "Public read access for sources" ON sources;
-- Sources now service-role only

DROP POLICY IF EXISTS "Public read access for social_posts" ON social_posts;
CREATE POLICY "Public read posted only" ON social_posts
  FOR SELECT USING (posted = true);

-- 3. Admin policies
CREATE POLICY "Admins can manage curated_articles" ON curated_articles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Editors can manage curated_articles" ON curated_articles
  FOR ALL USING (public.has_role(auth.uid(), 'editor'));
```

### Edge Function Update

```typescript
// In post-to-twitter/index.ts - add after verifyUserAuth:
const { data: hasPermission } = await supabase.rpc('has_role', {
  _user_id: user.userId,
  _role: 'admin'
});

if (!hasPermission) {
  const { data: isEditor } = await supabase.rpc('has_role', {
    _user_id: user.userId,
    _role: 'editor'
  });
  if (!isEditor) {
    return unauthorizedResponse('Admin or Editor role required');
  }
}
```

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| New migration SQL | Create | Set up user_roles table and fix RLS policies |
| `supabase/functions/post-to-twitter/index.ts` | Modify | Add role-based authorization |
| `src/components/CultureFeed.tsx` | Modify | Hide admin actions from non-admins |
| `src/pages/Login.tsx` | Create | Authentication page |
| `src/hooks/useAuth.ts` | Create | Auth state management |
| `src/hooks/useUserRole.ts` | Create | Role checking hook |

---

## Verification Steps

After implementation:
1. Run security scan to confirm findings are resolved
2. Test that anonymous users can only see published content
3. Verify non-admin users cannot access admin functions
4. Confirm edge functions reject unauthorized requests
