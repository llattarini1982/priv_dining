/*
  # Enable RLS on Public Tables

  1. Security Enhancement
    - Enable Row Level Security on all public tables that currently lack it
    - Add appropriate restrictive policies for each table
  
  2. Tables Updated
    - `admins`: Enable RLS with restrictive policies
    - `agents`: Enable RLS with restrictive policies
    - `messages`: Enable RLS with restrictive policies
    - `menu_items`: Enable RLS with public read access
    - `agent_contexts`: Enable RLS with restrictive policies
    - `documents`: Enable RLS with restrictive policies
    - `athletes`: Enable RLS with restrictive policies (no user_id column, using telegram_id)
    - `coaches`: Enable RLS with restrictive policies
  
  3. Important Notes
    - Tables with sensitive data (admins, agents, messages) are fully locked down
    - Menu items are publicly readable for the restaurant website
    - Athletes table uses telegram_id for identification
*/

-- Enable RLS on admins table (fully restrictive)
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only service role can access admins"
  ON public.admins
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on agents table (restrictive)
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage agents"
  ON public.agents
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on messages table (restrictive)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage messages"
  ON public.messages
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on menu_items table (public read)
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view menu items"
  ON public.menu_items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Service role can manage menu items"
  ON public.menu_items
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on agent_contexts table (restrictive)
ALTER TABLE public.agent_contexts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage agent contexts"
  ON public.agent_contexts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on documents table (restrictive)
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage documents"
  ON public.documents
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on athletes table (restrictive - no user relationship)
ALTER TABLE public.athletes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage athletes"
  ON public.athletes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable RLS on coaches table (restrictive)
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view coaches"
  ON public.coaches
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Service role can manage coaches"
  ON public.coaches
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);