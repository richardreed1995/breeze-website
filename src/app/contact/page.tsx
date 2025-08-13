"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HeroHeader } from "@/components/header";
import Footer from "@/components/footer";
import { Mail, Phone, Building, User } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send data to webhook
      await fetch("https://hook.eu2.make.com/ulmuyii8m5lu6l3ulhu1ionc5gjpkp3p", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "contact-form",
          source: "breeze-website",
          completedAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
        }),
      });

      // Send email alert to richard@breezeb2b.com
      await fetch("https://hook.eu2.make.com/ulmuyii8m5lu6l3ulhu1ionc5gjpkp3p", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "richard@breezeb2b.com",
          subject: "New Contact Form Submission - Breeze Website",
          type: "email-alert",
          formData: formData,
          source: "breeze-website",
          completedAt: new Date().toISOString(),
          timestamp: Date.now(),
        }),
      });
      
      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <HeroHeader />
        <main className="pt-24 md:pt-36">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 md:p-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Thank you!</h1>
              <p className="text-lg text-gray-600 mb-6">
                We've received your message. Our team will get back to you within 24 hours.
              </p>
              <p className="text-sm text-gray-500">
                In the meantime, check out our <a href="/downloads" className="text-blue-600 hover:underline">free resources</a> to get started.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroHeader />
      <main className="pt-24 md:pt-36">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get Started
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="bg-card rounded-3xl shadow-lg border p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                    First Name *
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pl-10 h-12"
                      placeholder="John"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                    Last Name *
                  </Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pl-10 h-12"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address *
                </Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 h-12"
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone Number
                </Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 h-12"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 min-h-[120px]"
                  placeholder="How can we help you?"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-blue-300 text-white hover:bg-blue-400 font-semibold"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 