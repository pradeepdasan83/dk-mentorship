'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ServicesBento, { ServiceItem } from '@/components/ServicesBento';
import ApproachSection from '@/components/ApproachSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import DiscoveryCallModal from '@/components/DiscoveryCallModal';
import ServiceBookingModal from '@/components/ServiceBookingModal';
import ContactModal from '@/components/ContactModal';
import BookingSuccessModal from '@/components/BookingSuccessModal';

export default function HomePage() {
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [successDetails, setSuccessDetails] = useState<any>(null);

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Header */}
      <Header
        onOpenDiscoveryModal={() => setIsDiscoveryOpen(true)}
        onOpenContactModal={() => setIsContactOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenDiscoveryModal={() => setIsDiscoveryOpen(true)}
          onScrollToServices={handleScrollToServices}
        />

        {/* Key Performance Stats */}
        <Stats />

        {/* Bento Grid Services & GPay Pricing */}
        <ServicesBento
          onSelectService={(service) => setSelectedService(service)}
        />

        {/* DKS Advantage & Approach */}
        <ApproachSection />

        {/* Call To Action Banner */}
        <CTASection
          onOpenDiscoveryModal={() => setIsDiscoveryOpen(true)}
          onScrollToServices={handleScrollToServices}
        />
      </main>

      {/* Footer */}
      <Footer onOpenContactModal={() => setIsContactOpen(true)} />

      {/* Discovery Call Form Modal */}
      <DiscoveryCallModal
        isOpen={isDiscoveryOpen}
        onClose={() => setIsDiscoveryOpen(false)}
        onSuccess={(booking) => setSuccessDetails(booking)}
      />

      {/* Service Application & GPay Checkout Modal */}
      <ServiceBookingModal
        isOpen={Boolean(selectedService)}
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSuccess={(confirmation) => setSuccessDetails(confirmation)}
      />

      {/* General Contact Form Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Payment & Booking Receipt Modal */}
      <BookingSuccessModal
        isOpen={Boolean(successDetails)}
        details={successDetails}
        onClose={() => setSuccessDetails(null)}
      />
    </div>
  );
}
