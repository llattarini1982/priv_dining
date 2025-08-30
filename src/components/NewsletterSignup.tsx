import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { subscribeToNewsletter } from '../lib/newsletterService';

export default function NewsletterSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await subscribeToNewsletter(formData.name, formData.email);

      if (result.success) {
        setIsSubscribed(true);
        setFormData({ name: '', email: '' });
        toast.success(result.message || 'Successfully subscribed to newsletter!');
      } else {
        toast.error(result.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-wine-dark rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <CheckCircle2 className="w-12 h-12 text-terracotta mx-auto mb-4" />
          <h3 className="text-xl font-serif text-cream mb-2">Welcome to Our Newsletter!</h3>
          <p className="text-cream/90 font-serif italic">
            Thank you for subscribing. You'll receive updates about new recipes, special offers, and exclusive events.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-wine-dark rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-6 h-6 text-terracotta" />
        <h3 className="text-xl font-serif text-cream">Stay Updated</h3>
      </div>
      
      <p className="text-cream/90 font-serif italic mb-6">
        Subscribe to our newsletter for exclusive recipes, cooking tips, and special offers from Chef Luca.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-lg border border-cream/20 bg-wine text-cream placeholder-cream/60 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-colors"
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-lg border border-cream/20 bg-wine text-cream placeholder-cream/60 focus:border-terracotta focus:ring-1 focus:ring-terracotta outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-terracotta text-cream px-6 py-3 rounded-lg hover:bg-terracotta-dark transition-all shadow-md hover:shadow-lg font-serif flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full animate-spin"></div>
              <span>Subscribing...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Subscribe to Newsletter</span>
            </>
          )}
        </button>
      </form>

      <p className="text-cream/60 text-sm font-serif italic mt-4 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}