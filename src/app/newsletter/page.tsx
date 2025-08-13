"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HeroHeader } from '@/components/header';
import Footer from '@/components/footer';
import { Mail } from 'lucide-react';

export default function NewsletterPage() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailSubmit = () => {
    setError('');
    if (!email.trim()) {
      return setError("Please enter your email address");
    }
    if (!validateEmail(email)) {
      return setError("Please enter a valid email address");
    }

    // Send data to webhook
    fetch("https://hook.eu2.make.com/ptd9ofx157v7w5ym2x4eemxucynvkw42", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        type: "newsletter-email-collection",
        completedAt: new Date().toISOString(),
      }),
    }).catch(e => {
      // Fail silently
    });

    setStep(1);
  };



  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEmailSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroHeader />
      <main className="pt-24 md:pt-36">
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Weekly HubSpot Growth Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stay ahead of the curve with our weekly newsletter featuring HubSpot tips, growth strategies, and industry insights. Join thousands of B2B professionals.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-0 pb-20">
          <div className="max-w-2xl mx-auto px-6">
            {/* Step 1: Email Collection */}
            {step === 0 && (
              <div className="bg-card rounded-3xl shadow-lg border p-6 md:p-8">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium text-foreground mb-2 block">Email Address</Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="text-lg p-4 h-14 border-2 focus:ring-4 focus:ring-blue-400/20 focus:border-blue-400"
                    />
                  </div>
                  
                  {error && <p className="text-red-500 text-center font-medium">{error}</p>}
                  
                  <Button 
                    onClick={handleEmailSubmit}
                    className="w-full text-lg py-4 h-14 bg-blue-300 text-white hover:bg-blue-400 font-semibold"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Subscribe to Newsletter
                  </Button>
                </div>
              </div>
            )}

            {/* Thank You Message */}
            {step === 1 && (
              <div className="bg-card rounded-3xl shadow-lg border p-6 md:p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Welcome to Breeze!</h2>
                  <p className="text-base text-muted-foreground">
                    You've successfully subscribed to our weekly HubSpot growth insights newsletter.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Look out for our first email with valuable tips and strategies to help grow your business.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
