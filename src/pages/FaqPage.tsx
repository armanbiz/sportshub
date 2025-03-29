import React from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import { Link } from 'react-router-dom';

const FAQ_ITEMS = [
  {
    question: "How do I claim a gym listing?",
    answer: "To claim your gym listing, click the 'Claim' button on your facility's page and follow the verification process. Our team will review and approve your claim within 48 hours."
  },
  {
    question: "How do the search filters work?",
    answer: "Our search filters help you find the perfect gym based on location, price range, amenities, and more. Simply select your preferences in the search bar, and we'll show you matching facilities."
  },
  {
    question: "What are your subscription and pricing options?",
    answer: "Using SportsHub to find gyms is completely free for users. Gym owners can choose from different subscription tiers to enhance their listing visibility and access premium features."
  },
  {
    question: "How do I update my gym's information?",
    answer: "Once you've claimed your listing, you can update your gym's information through your dashboard. Changes will be reviewed and published within 24 hours."
  },
  {
    question: "Can I book gym sessions through SportsHub?",
    answer: "Yes! Many of our partner gyms offer direct booking through our platform. Look for the 'Book Now' button on gym profiles to schedule your session."
  }
];

export default function FaqPage() {
  return (
    <div className="pt-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find quick answers to common questions about using SportsHub
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {FAQ_ITEMS.map((item, index) => (
            <AnimatedSection key={index} className="mb-8">
              <div className="bg-dark rounded-xl p-6 border border-neon-green/20">
                <h2 className="text-xl font-semibold text-white mb-4">{item.question}</h2>
                <p className="text-gray-300">{item.answer}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-16 mb-32">
          <p className="text-xl text-gray-300 mb-6">
            Still have questions? We're here to help!
          </p>
          <Link 
            to="/contact" 
            onClick={() => window.scrollTo(0, 0)} 
            className="inline-block bg-neon-green hover:bg-neon-green/90 text-white/90 px-8 py-3 rounded-xl transition-colors">
            Contact Us
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}