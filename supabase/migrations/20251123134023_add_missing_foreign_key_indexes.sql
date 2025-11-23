/*
  # Add Missing Foreign Key Indexes for Performance

  1. Performance Improvements
    - Add indexes on all foreign key columns that lack covering indexes
    - Improves JOIN performance and referential integrity checks
  
  2. Tables Affected
    - `cart_items`: Add index on `cart_id`
    - `carts`: Add index on `customer_id`
    - `collaborations`: Add index on `booking_id`
    - `hyrox_prs`: Add index on `strava_activity_id`
    - `menu_selections`: Add index on `booking_id`
    - `order_items`: Add index on `order_id`
    - `orders`: Add index on `customer_id`
    - `station_benchmarks`: Add indexes on `strava_activity_id` and `training_session_id`
    - `strava_activities`: Add index on `linked_training_session_id`
*/

-- Add index for cart_items.cart_id foreign key
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON public.cart_items(cart_id);

-- Add index for carts.customer_id foreign key
CREATE INDEX IF NOT EXISTS idx_carts_customer_id ON public.carts(customer_id);

-- Add index for collaborations.booking_id foreign key
CREATE INDEX IF NOT EXISTS idx_collaborations_booking_id ON public.collaborations(booking_id);

-- Add index for hyrox_prs.strava_activity_id foreign key
CREATE INDEX IF NOT EXISTS idx_hyrox_prs_strava_activity_id ON public.hyrox_prs(strava_activity_id);

-- Add index for menu_selections.booking_id foreign key
CREATE INDEX IF NOT EXISTS idx_menu_selections_booking_id ON public.menu_selections(booking_id);

-- Add index for order_items.order_id foreign key
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

-- Add index for orders.customer_id foreign key
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON public.orders(customer_id);

-- Add indexes for station_benchmarks foreign keys
CREATE INDEX IF NOT EXISTS idx_station_benchmarks_strava_activity_id ON public.station_benchmarks(strava_activity_id);
CREATE INDEX IF NOT EXISTS idx_station_benchmarks_training_session_id ON public.station_benchmarks(training_session_id);

-- Add index for strava_activities.linked_training_session_id foreign key
CREATE INDEX IF NOT EXISTS idx_strava_activities_linked_training_session_id ON public.strava_activities(linked_training_session_id);