/*
  # Add Missing Foreign Key Indexes

  1. Performance Improvements
    - Add indexes for all foreign key columns that are missing covering indexes
    - This improves JOIN performance and referential integrity checks
  
  2. Tables Affected
    - `cart_items` - index on cart_id
    - `carts` - index on customer_id
    - `collaborations` - index on booking_id
    - `hyrox_prs` - index on strava_activity_id
    - `menu_selections` - index on booking_id
    - `order_items` - index on order_id
    - `orders` - index on customer_id
    - `station_benchmarks` - indexes on strava_activity_id and training_session_id
    - `strava_activities` - index on linked_training_session_id
  
  3. Important Notes
    - All indexes use IF NOT EXISTS to prevent errors on re-run
    - Indexes are named following convention: idx_tablename_columnname
*/

-- Index for cart_items.cart_id
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id 
ON public.cart_items(cart_id);

-- Index for carts.customer_id
CREATE INDEX IF NOT EXISTS idx_carts_customer_id 
ON public.carts(customer_id);

-- Index for collaborations.booking_id
CREATE INDEX IF NOT EXISTS idx_collaborations_booking_id 
ON public.collaborations(booking_id);

-- Index for hyrox_prs.strava_activity_id
CREATE INDEX IF NOT EXISTS idx_hyrox_prs_strava_activity_id 
ON public.hyrox_prs(strava_activity_id);

-- Index for menu_selections.booking_id
CREATE INDEX IF NOT EXISTS idx_menu_selections_booking_id 
ON public.menu_selections(booking_id);

-- Index for order_items.order_id
CREATE INDEX IF NOT EXISTS idx_order_items_order_id 
ON public.order_items(order_id);

-- Index for orders.customer_id
CREATE INDEX IF NOT EXISTS idx_orders_customer_id 
ON public.orders(customer_id);

-- Index for station_benchmarks.strava_activity_id
CREATE INDEX IF NOT EXISTS idx_station_benchmarks_strava_activity_id 
ON public.station_benchmarks(strava_activity_id);

-- Index for station_benchmarks.training_session_id
CREATE INDEX IF NOT EXISTS idx_station_benchmarks_training_session_id 
ON public.station_benchmarks(training_session_id);

-- Index for strava_activities.linked_training_session_id
CREATE INDEX IF NOT EXISTS idx_strava_activities_linked_training_session_id 
ON public.strava_activities(linked_training_session_id);
