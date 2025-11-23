/*
  # Optimize RLS Policies with Subqueries

  1. Performance Improvements
    - Replace direct auth.uid() calls with (SELECT auth.uid()) in RLS policies
    - Prevents re-evaluation of auth functions for each row
    - Significantly improves query performance at scale
  
  2. Tables Updated
    - `strava_sync_logs`: Update "Users can view own sync logs" policy
    - `strava_weekly_analytics`: Update "Users can view own analytics" policy
    - `hyrox_prs`: Update "Users can view own PRs" policy
    - `training_sessions`: Update "Users can view own training" policy
    - `station_benchmarks`: Update "Users can view own benchmarks" policy
    - `training_plans`: Update "Users can view own plans" policy
    - `ai_conversations`: Update "Users can view own conversations" policy
    - `nutrition_logs`: Update "Users can view own nutrition" policy
    - `recovery_metrics`: Update "Users can view own recovery" policy
    - `users`: Update "Users can view own profile" and "Users can update own profile" policies
    - `strava_activities`: Update "Users can view own Strava activities" policy
*/

-- strava_sync_logs: Optimize RLS policy
DROP POLICY IF EXISTS "Users can view own sync logs" ON public.strava_sync_logs;
CREATE POLICY "Users can view own sync logs"
  ON public.strava_sync_logs
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- strava_weekly_analytics: Optimize RLS policy
DROP POLICY IF EXISTS "Users can view own analytics" ON public.strava_weekly_analytics;
CREATE POLICY "Users can view own analytics"
  ON public.strava_weekly_analytics
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- hyrox_prs: Optimize RLS policy
DROP POLICY IF EXISTS "Users can view own PRs" ON public.hyrox_prs;
CREATE POLICY "Users can view own PRs"
  ON public.hyrox_prs
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- training_sessions: Optimize RLS policy
DROP POLICY IF EXISTS "Users can view own training" ON public.training_sessions;
CREATE POLICY "Users can view own training"
  ON public.training_sessions
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- station_benchmarks: Optimize RLS policy
DROP POLICY IF EXISTS "Users can view own benchmarks" ON public.station_benchmarks;
CREATE POLICY "Users can view own benchmarks"
  ON public.station_benchmarks
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- training_plans: Optimize RLS policy
DROP POLICY IF EXISTS "Users can view own plans" ON public.training_plans;
CREATE POLICY "Users can view own plans"
  ON public.training_plans
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- ai_conversations: Optimize RLS policy
DROP POLICY IF EXISTS "Users can view own conversations" ON public.ai_conversations;
CREATE POLICY "Users can view own conversations"
  ON public.ai_conversations
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- nutrition_logs: Optimize RLS policy
DROP POLICY IF EXISTS "Users can view own nutrition" ON public.nutrition_logs;
CREATE POLICY "Users can view own nutrition"
  ON public.nutrition_logs
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- recovery_metrics: Optimize RLS policy
DROP POLICY IF EXISTS "Users can view own recovery" ON public.recovery_metrics;
CREATE POLICY "Users can view own recovery"
  ON public.recovery_metrics
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- users: Optimize RLS policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (id = (SELECT auth.uid()))
  WITH CHECK (id = (SELECT auth.uid()));

-- strava_activities: Optimize RLS policy
DROP POLICY IF EXISTS "Users can view own Strava activities" ON public.strava_activities;
CREATE POLICY "Users can view own Strava activities"
  ON public.strava_activities
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));