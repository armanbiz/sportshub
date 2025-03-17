import React from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import FeaturedGyms from '../components/FeaturedGyms';
import LocalGyms from '../components/LocalGyms';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturedGyms />
      <LocalGyms />
      <Testimonials />
      <Newsletter />
    </>
  );
}