"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { HeroHeader } from '@/components/header';
import Footer from '@/components/footer';
import { Download } from 'lucide-react';

export default function DownloadsPage() {
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
    fetch("https://hook.eu2.make.com/bct724zlem7g4p1vk51xxsa18v25h4yr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        type: "downloads-email-collection",
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
              Free HubSpot Resources & Templates
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access our collection of proven HubSpot templates, checklists, and guides to accelerate your business growth. Everything you need to get started with HubSpot.
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
                    <Download className="mr-2 h-5 w-5" />
                    Get Free Downloads
                  </Button>
                </div>
              </div>
            )}

            {/* Thank You Message */}
            {step === 1 && (
              <div className="bg-card rounded-3xl shadow-lg border p-6 md:p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Thank You!</h2>
                  <p className="text-base text-muted-foreground">
                    Your free HubSpot resources are on their way! Please check your email for download links and access instructions.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    If you don't see the email within a few minutes, please check your spam folder.
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
