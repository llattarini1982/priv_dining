/*
  # Enable RLS on Public Tables

  1. Security Improvements
    - Enable Row Level Security on all public tables missing RLS
    - Add appropriate policies for each table based on use case
  
  2. Tables Affected
    - `admins` - Admin management table (telegram_id based)
    - `agents` - Agent workflow table (userId based)
    - `messages` - Messaging system table (userId based)
    - `menu_items` - Menu items (public read, admin write)
    - `agent_contexts` - Agent context storage (userId based)
    - `documents` - Document storage
    - `athletes` - Athlete profiles (telegram_id based)
    - `coaches` - Coach profiles (telegram_id based)
  
  3. Important Notes
    - Each table gets restrictive policies based on its purpose
    - Public read access for menu_items only
    - All other tables restricted to authenticated users or service role
    - Uses IF NOT EXISTS and DROP IF EXISTS to prevent errors
*/

-- Enable RLS on admins table
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Admin policies: Only service role can access
DROP POLICY IF EXISTS "Service role can manage admins" ON public.admins;
CREATE POLICY "Service role can manage admins"
  ON public.admins
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on agents table
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

-- Agent policies: Only service role can access
DROP POLICY IF EXISTS "Service role can manage agents" ON public.agents;
CREATE POLICY "Service role can manage agents"
  ON public.agents
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on messages table
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Messages policies: Only service role can access
DROP POLICY IF EXISTS "Service role can manage messages" ON public.messages;
CREATE POLICY "Service role can manage messages"
  ON public.messages
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on menu_items table
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Menu items policies: Public can read
DROP POLICY IF EXISTS "Public can view menu items" ON public.menu_items;
CREATE POLICY "Public can view menu items"
  ON public.menu_items
  FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Service role can manage menu items" ON public.menu_items;
CREATE POLICY "Service role can manage menu items"
  ON public.menu_items
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on agent_contexts table
ALTER TABLE public.agent_contexts ENABLE ROW LEVEL SECURITY;

-- Agent contexts policies: Only service role can access
DROP POLICY IF EXISTS "Service role can manage agent contexts" ON public.agent_contexts;
CREATE POLICY "Service role can manage agent contexts"
  ON public.agent_contexts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on documents table
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Documents policies: Only service role can access
DROP POLICY IF EXISTS "Service role can manage documents" ON public.documents;
CREATE POLICY "Service role can manage documents"
  ON public.documents
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on athletes table
ALTER TABLE public.athletes ENABLE ROW LEVEL SECURITY;

-- Athletes policies: Service role can access all
DROP POLICY IF EXISTS "Service role can manage athletes" ON public.athletes;
CREATE POLICY "Service role can manage athletes"
  ON public.athletes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on coaches table
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;

-- Coaches policies: Service role can access all
DROP POLICY IF EXISTS "Service role can manage coaches" ON public.coaches;
CREATE POLICY "Service role can manage coaches"
  ON public.coaches
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
