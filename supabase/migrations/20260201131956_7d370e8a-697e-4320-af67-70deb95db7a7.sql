-- Add explicit deny policy for anonymous access to user_roles
CREATE POLICY "Deny anonymous access" ON user_roles
  FOR SELECT TO anon
  USING (false);