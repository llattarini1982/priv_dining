import { supabase } from './supabase';

export interface NewsletterSubscriber {
  id?: string;
  name: string;
  email: string;
  subscribed_at?: string;
  is_active?: boolean;
}

export async function subscribeToNewsletter(name: string, email: string) {
  try {
    // Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('id, is_active')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected for new subscribers
      throw checkError;
    }

    if (existingSubscriber) {
      if (existingSubscriber.is_active) {
        return {
          success: false,
          error: 'This email is already subscribed to our newsletter.'
        };
      } else {
        // Reactivate existing subscriber
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .update({ 
            is_active: true, 
            name: name,
            subscribed_at: new Date().toISOString()
          })
          .eq('id', existingSubscriber.id)
          .select()
          .single();

        if (error) throw error;

        return {
          success: true,
          message: 'Welcome back! Your newsletter subscription has been reactivated.',
          subscriber: data
        };
      }
    }

    // Create new subscriber
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        name: name.trim(),
        email: email.toLowerCase().trim()
      })
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'Thank you for subscribing to our newsletter!',
      subscriber: data
    };

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error.code === '23505') {
      // Unique constraint violation
      return {
        success: false,
        error: 'This email is already subscribed to our newsletter.'
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to subscribe to newsletter'
    };
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ is_active: false })
      .eq('email', email.toLowerCase().trim())
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'You have been unsubscribed from our newsletter.',
      subscriber: data
    };

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to unsubscribe from newsletter'
    };
  }
}

export async function getNewsletterSubscribers() {
  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .eq('is_active', true)
      .order('subscribed_at', { ascending: false });

    if (error) throw error;

    return {
      success: true,
      subscribers: data
    };

  } catch (error) {
    console.error('Get newsletter subscribers error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch subscribers'
    };
  }
}