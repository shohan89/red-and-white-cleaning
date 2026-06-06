"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Send, Loader2, AlertCircle } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "First & Last Name is required"),
  companyName: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service type"),
  location: z.string().min(2, "Location/City is required"),
  message: z.string().min(10, "Please provide some project details"),
  howDidYouHear: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      phone: "",
      serviceType: "",
      location: "",
      message: "",
      howDidYouHear: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to send');
      router.push("/thank-you");
    } catch {
      alert('Something went wrong sending your message. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border shadow-lg rounded-3xl p-6 sm:p-8 relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-red via-brand-red/80 to-brand-red/40" />

      <h3 className="text-2xl font-bold text-foreground mb-6">Request a Quote</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex-1 flex flex-col">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-semibold text-foreground">
              First & Last Name <span className="text-brand-red">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all ${
                errors.name ? "border-brand-red focus:border-brand-red" : "border-border focus:border-brand-red"
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-brand-red flex items-center gap-1.5 mt-1">
                <AlertCircle className="h-4 w-4" /> {errors.name.message}
              </p>
            )}
          </div>

          {/* Company Name Field */}
          <div className="space-y-1.5">
            <label htmlFor="companyName" className="text-sm font-semibold text-foreground">
              Company Name <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <input
              id="companyName"
              type="text"
              placeholder="ABC Construction Ltd."
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
              {...register("companyName")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-foreground">
              Email Address <span className="text-brand-red">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all ${
                errors.email ? "border-brand-red focus:border-brand-red" : "border-border focus:border-brand-red"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-brand-red flex items-center gap-1.5 mt-1">
                <AlertCircle className="h-4 w-4" /> {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-semibold text-foreground">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="(519) 555-0123"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
              {...register("phone")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Service Type Dropdown */}
          <div className="space-y-1.5">
            <label htmlFor="serviceType" className="text-sm font-semibold text-foreground">
              Service Needed <span className="text-brand-red">*</span>
            </label>
            <select
              id="serviceType"
              className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all appearance-none cursor-pointer ${
                errors.serviceType ? "border-brand-red focus:border-brand-red" : "border-border focus:border-brand-red"
              }`}
              {...register("serviceType")}
            >
              <option value="" disabled>Select a service...</option>
              <option value="Post-Construction Cleaning">Post-Construction Cleaning</option>
              <option value="Commercial Cleaning">Commercial Cleaning</option>
              <option value="Deep Clean">Deep Clean</option>
              <option value="Ongoing Contract">Ongoing Contract</option>
              <option value="Other">Other</option>
            </select>
            {errors.serviceType && (
              <p className="text-sm text-brand-red flex items-center gap-1.5 mt-1">
                <AlertCircle className="h-4 w-4" /> {errors.serviceType.message}
              </p>
            )}
          </div>

          {/* Location / City Field */}
          <div className="space-y-1.5">
            <label htmlFor="location" className="text-sm font-semibold text-foreground">
              Location / City <span className="text-brand-red">*</span>
            </label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Kitchener, ON"
              className={`w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all ${
                errors.location ? "border-brand-red focus:border-brand-red" : "border-border focus:border-brand-red"
              }`}
              {...register("location")}
            />
            {errors.location && (
              <p className="text-sm text-brand-red flex items-center gap-1.5 mt-1">
                <AlertCircle className="h-4 w-4" /> {errors.location.message}
              </p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-1.5 flex-1 flex flex-col">
          <label htmlFor="message" className="text-sm font-semibold text-foreground">
            Project Details / Message <span className="text-brand-red">*</span>
          </label>
          <textarea
            id="message"
            placeholder="Tell us about the property size, scope of work, timeline, etc."
            rows={4}
            className={`w-full flex-1 px-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-red/20 transition-all resize-none ${
              errors.message ? "border-brand-red focus:border-brand-red" : "border-border focus:border-brand-red"
            }`}
            {...register("message")}
          />
          {errors.message && (
            <p className="text-sm text-brand-red flex items-center gap-1.5 mt-1">
              <AlertCircle className="h-4 w-4" /> {errors.message.message}
            </p>
          )}
        </div>

        {/* How did you hear about us Dropdown */}
        <div className="space-y-1.5">
          <label htmlFor="howDidYouHear" className="text-sm font-semibold text-foreground">
            How did you hear about us? <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <select
            id="howDidYouHear"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all appearance-none cursor-pointer"
            {...register("howDidYouHear")}
          >
            <option value="" disabled>Select an option...</option>
            <option value="Google Search">Google Search</option>
            <option value="Social Media">Social Media</option>
            <option value="Referral">Referral / Word of Mouth</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group w-full flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red/90 text-brand-white font-bold py-4 px-8 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Submit & Get a Free Quote
              <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
