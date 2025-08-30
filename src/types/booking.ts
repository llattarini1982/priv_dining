export interface BookingFormData {
  bookingDate: string;
  bookingTimestamp?: string;
  guestCount?: number;
  bookingType: 'dining' | 'collaboration' | 'special_order';
  venueType?: 'home' | 'rental';
  venueAddress?: string;
  selectedAreas?: string[];
  selectedPackage?: string;
  notes?: string;
  dietaryRequirements?: string;
  selectedItems?: { name: string; quantity: number }[];
  selectedAddons?: string[];
  estimatedTotal?: number;
  totalAmount?: number;
  collaborationType?: string;
  projectDescription?: string;
  socialMedia?: string;
  timeline?: string;
  name: string;
  email: string;
  phone: string;
  pickupTime?: string;
  specialOrders?: Array<{
    itemType: 'pinsa_base' | 'lasagna' | 'pizzette' | 'sharing_platter';
    size: 'XS' | 'S' | 'M' | 'L';
    quantity: number;
    price: number;
    name: string;
  }>;
}

export interface SupabaseBooking {
  id: string;
  created_at: string;
  user_id?: string;
  booking_timestamp: string;
  venue_type: 'home' | 'rental' | null;
  venue_address: string | null;
  selected_items: Array<{ name: string; quantity: number }> | null;
  selected_addons: string[] | null;
  selected_package: string | null;
  booking_date: string;
  guest_count: number | null;
  booking_type: 'dining' | 'collaboration' | 'special_order';
  status: 'pending' | 'confirmed' | 'cancelled';
  notes: string | null;
  selected_areas: string[] | null;
  dietary_requirements: string | null;
  estimated_total: number | null;
  total_amount: number | null;
}