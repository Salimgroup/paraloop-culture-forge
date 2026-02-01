-- Add explicit deny policies for anonymous users on sensitive tables
CREATE POLICY "Deny anonymous access to sources" ON sources
  FOR SELECT TO anon
  USING (false);

CREATE POLICY "Deny anonymous access to articles" ON articles
  FOR SELECT TO anon
  USING (false);