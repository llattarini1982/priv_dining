import { supabase } from './supabase';
import type { BookingFormData, SupabaseBooking } from '../types/booking';

export async function createBooking(formData: BookingFormData) {
  try {
    const isSpecialOrder = formData.package === 'special-orders';
    const totalAmount = isSpecialOrder 
      ? formData.specialOrders?.reduce((total, order) => total + (order.price * order.quantity), 0) 
      : null;

    // Determine the final booking date
    let finalBookingDate: string | null = null;
    if (isSpecialOrder && formData.pickupTime) {
      // For special orders, extract date from pickupTime
      finalBookingDate = formData.pickupTime.split('T')[0];
    } else if (formData.bookingDate && formData.bookingDate.trim() !== '') {
      // For regular bookings, use bookingDate if it's not empty
      finalBookingDate = formData.bookingDate;
    }

    // Ensure venue_type is valid for database constraint
    const validVenueType = formData.venueType && 
      ['home', 'rental'].includes(formData.venueType) 
      ? formData.venueType : null;

    // Properly format selected_items for database
    const formattedSelectedItems = formData.selectedItems?.map(item => {
      if (typeof item === 'string') {
        return { name: item, quantity: 1 };
      }
      return {
        name: item.name,
        quantity: item.quantity || 1
      };
    }) || [];
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        booking_timestamp: new Date().toISOString(),
        email: formData.email,
        phone_number: formData.phone,
        booking_date: finalBookingDate,
        guest_count: formData.guestCount,
        venue_type: validVenueType,
        venue_address: formData.venueAddress,
        selected_areas: formData.selectedAreas,
        booking_type: isSpecialOrder ? 'special_order' : formData.bookingType,
        notes: formData.notes,
        estimated_total: formData.estimatedTotal,
        total_amount: totalAmount || null,
        dietary_requirements: formData.dietaryRequirements,
        selected_items: formattedSelectedItems.length > 0 ? formattedSelectedItems : null,
        selected_addons: formData.selectedAddons,
        selected_package: formData.package,
        order_type: isSpecialOrder ? 'special_order' : 'dining'
      })
      .select()
      .single();

    if (bookingError) throw bookingError;
    if (!booking) throw new Error('No booking created');

    // Insert special orders if any
    if (formData.specialOrders && formData.specialOrders.length > 0) {
      const { error: specialOrdersError } = await supabase
        .from('special_orders')
        .insert(
          formData.specialOrders.map(order => ({
            booking_id: booking.id,
            item_type: order.itemType,
            size: order.size,
            quantity: order.quantity || 1,
            price: order.price,
            name: order.name
          }))
        );

      if (specialOrdersError) throw specialOrdersError;
    }

    // Insert order choices
    if (formData.selectedItems && formData.selectedItems.length > 0) {
      const { error: orderChoicesError } = await supabase
        .from('order_choices')
        .insert(
          formData.selectedItems.map(item => ({
            booking_id: booking.id,
            name: typeof item === 'string' ? item : item.name,
            quantity: typeof item === 'string' ? 1 : (item.quantity || 1)
          }))
        );

      if (orderChoicesError) throw orderChoicesError;
    }

    // Add collaboration details
    if (formData.bookingType === 'collaboration') {
      const { error: collabError } = await supabase
        .from('collaborations')
        .insert({
          booking_id: booking.id,
          collaboration_type: formData.collaborationType,
          project_description: formData.projectDescription,
          social_media: formData.socialMedia,
          timeline: formData.timeline
        });

      if (collabError) throw collabError;
    }

    return { success: true, booking };
  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      success: false, 
      error: error instanceof Error ? error.message : 'An error occurred'
    };
  }
}

// READ: Get all bookings for the current user
export async function getUserBookings() {
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        *,
        menu_selections (
          item_name
        ),
        collaborations (
          collaboration_type,
          project_description,
          social_media,
          timeline
        )
      `)
      .order('booking_date', { ascending: false });

    if (error) throw error;
    return { success: true, bookings };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch bookings'
    };
  }
}

// READ: Get a single booking by ID
export async function getBookingById(bookingId: string) {
  try {
    const { data: booking, error } = await supabase
      .from('bookings')
      .select(`
        *,
        menu_selections (
          item_name
        ),
        collaborations (
          collaboration_type,
          project_description,
          social_media,
          timeline
        )
      `)
      .eq('id', bookingId)
      .single();

    if (error) throw error;
    return { success: true, booking };
  } catch (error) {
    console.error('Error fetching booking:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch booking'
    };
  }
}

// UPDATE: Update an existing booking
export async function updateBooking(bookingId: string, updates: Partial<BookingFormData>) {
  try {
    // Update the main booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .update({
        booking_date: updates.bookingDate,
        guest_count: updates.guestCount,
        venue_type: updates.venueType,
        venue_address: updates.venueAddress,
        notes: updates.notes,
        dietary_requirements: updates.dietaryRequirements
      })
      .eq('id', bookingId)
      .select()
      .single();

    if (bookingError) throw bookingError;

    // Update menu selections if it's a dining booking
    if (updates.bookingType === 'dining' && updates.selectedItems) {
      // First delete existing selections
      const { error: deleteError } = await supabase
        .from('menu_selections')
        .delete()
        .eq('booking_id', bookingId);

      if (deleteError) throw deleteError;

      // Then insert new selections
      const menuSelections = updates.selectedItems.map(item => ({
        booking_id: bookingId,
        item_name: typeof item === 'string' ? item : item.name
      }));

      const { error: menuError } = await supabase
        .from('menu_selections')
        .insert(menuSelections);

      if (menuError) throw menuError;
    }

    // Update collaboration details if applicable
    if (updates.bookingType === 'collaboration') {
      const { error: collabError } = await supabase
        .from('collaborations')
        .update({
          collaboration_type: updates.collaborationType,
          project_description: updates.projectDescription,
          social_media: updates.socialMedia,
          timeline: updates.timeline
        })
        .eq('booking_id', bookingId);

      if (collabError) throw collabError;
    }

    return { success: true, booking };
  } catch (error) {
    console.error('Error updating booking:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update booking'
    };
  }
}

// DELETE: Cancel a booking
export async function cancelBooking(bookingId: string) {
  try {
    const { data: booking, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, booking };
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to cancel booking'
    };
  }
}