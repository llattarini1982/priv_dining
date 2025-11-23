/*
  # Optimize RLS Policies for Auth Initialization

  1. Performance Improvements
    - Replace auth.uid() with (select auth.uid()) in RLS policies
    - This caches the auth function result per statement instead of per row
    - Significantly improves query performance at scale
  
  2. Tables Affected
    - `strava_sync_logs` - Users can view own sync logs
    - `strava_weekly_analytics` - Users can view own analytics
    - `hyrox_prs` - Users can view own PRs
    - `training_sessions` - Users can view own training
    - `station_benchmarks` - Users can view own benchmarks
    - `training_plans` - Users can view own plans
    - `ai_conversations` - Users can view own conversations
    - `nutrition_logs` - Users can view own nutrition
    - `recovery_metrics` - Users can view own recovery
    - `users` - Users can view/update own profile
    - `strava_activities` - Users can view own Strava activities
  
  3. Important Notes
    - Drops existing policies and recreates with optimized pattern
    - Uses IF EXISTS to prevent errors on re-run
*/

-- strava_sync_logs
DROP POLICY IF EXISTS "Users can view own sync logs" ON public.strava_sync_logs;
CREATE POLICY "Users can view own sync logs"
  ON public.strava_sync_logs
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- strava_weekly_analytics
DROP POLICY IF EXISTS "Users can view own analytics" ON public.strava_weekly_analytics;
CREATE POLICY "Users can view own analytics"
  ON public.strava_weekly_analytics
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- hyrox_prs
DROP POLICY IF EXISTS "Users can view own PRs" ON public.hyrox_prs;
CREATE POLICY "Users can view own PRs"
  ON public.hyrox_prs
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- training_sessions
DROP POLICY IF EXISTS "Users can view own training" ON public.training_sessions;
CREATE POLICY "Users can view own training"
  ON public.training_sessions
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- station_benchmarks
DROP POLICY IF EXISTS "Users can view own benchmarks" ON public.station_benchmarks;
CREATE POLICY "Users can view own benchmarks"
  ON public.station_benchmarks
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- training_plans
DROP POLICY IF EXISTS "Users can view own plans" ON public.training_plans;
CREATE POLICY "Users can view own plans"
  ON public.training_plans
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- ai_conversations
DROP POLICY IF EXISTS "Users can view own conversations" ON public.ai_conversations;
CREATE POLICY "Users can view own conversations"
  ON public.ai_conversations
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- nutrition_logs
DROP POLICY IF EXISTS "Users can view own nutrition" ON public.nutrition_logs;
CREATE POLICY "Users can view own nutrition"
  ON public.nutrition_logs
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- recovery_metrics
DROP POLICY IF EXISTS "Users can view own recovery" ON public.recovery_metrics;
CREATE POLICY "Users can view own recovery"
  ON public.recovery_metrics
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- users (view)
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()));

-- users (update)
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

-- strava_activities
DROP POLICY IF EXISTS "Users can view own Strava activities" ON public.strava_activities;
CREATE POLICY "Users can view own Strava activities"
  ON public.strava_activities
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));
