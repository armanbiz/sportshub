import React from 'react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const handleSearchClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Discover Prague's Best Gyms & Sports Facilities with SportsHub
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            At SportsHub, we're on a mission to make fitness accessible, transparent, and effortless for everyone in Prague.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <div className="h-1 w-24 bg-neon-green mb-8" />
          <p className="text-2xl text-gray-300 font-light mb-8">
            Your Time is Better Spent Working Out, Not Searching.
          </p>
          <p className="text-gray-400 mb-4">
            Finding a gym in Prague shouldn't feel like a marathon. We simplify your fitness journey with:
          </p>
          <div className="text-gray-300 space-y-2">
            <p>✅ Real-Time Comparisons</p>
            <p>✅ Verified Reviews</p>
            <p>✅ Local Expertise</p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Why Choose SportsHub?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-dark rounded-xl p-6 border border-neon-green/20">
              <h3 className="text-xl font-semibold text-white mb-4">For Fitness Enthusiasts</h3>
              <ul className="space-y-4 text-gray-300">
                <li>• 100+ Listings: Explore gyms, pools, CrossFit boxes, and yoga studios across Prague.</li>
                <li>• Honest Reviews: Read ratings from real users—no sponsored bias.</li>
                <li>• Smart Filters: Search by price, location, or amenity (24/7 access, parking, childcare).</li>
              </ul>
            </div>
            <div className="bg-dark rounded-xl p-6 border border-neon-green/20">
              <h3 className="text-xl font-semibold text-white mb-4">For Prague's Fitness Community</h3>
              <ul className="space-y-4 text-gray-300">
                <li>• Boost Visibility: Partner with us to showcase your facility to thousands of active locals.</li>
                <li>• Fair & Transparent: No hidden fees. We succeed when you succeed.</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-16 bg-dark rounded-xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-6">Join the Movement</h2>
          <p className="text-xl text-neon-green mb-6">
            SportsHub isn't just a directory—we're redefining fitness in Prague.
          </p>
          <div className="space-y-4 text-gray-300 mb-8">
            <p>🏋️♂️ Empower your choices with data-driven insights.</p>
            <p>🤝 Support local businesses and trainers.</p>
            <p>🌍 Stay Tuned: While we're Prague-focused today, we're gearing up to go global.</p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Find Your Gym?</h2>
          <Link to="/search">
            <Button 
              className="bg-neon-green hover:bg-neon-green/90 text-white/90 text-lg px-8 py-6"
              onClick={handleSearchClick}
            >
              Search Gyms Now
            </Button>
          </Link>
        </AnimatedSection>

        <AnimatedSection className="mb-16">
          <div className="bg-dark rounded-xl p-8 border border-neon-green/20">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Stay Updated</h2>
            <p className="text-gray-300 mb-6 text-center">
              Subscribe to our newsletter for exclusive deals, new gym listings, and expert fitness tips.
            </p>
            <form 
              className="max-w-md mx-auto"
              onSubmit={async (e) => {
                e.preventDefault();
                const email = (e.target as HTMLFormElement).email.value;
                const timestamp = new Date().toISOString();
                
                try {
                  const response = await fetch('https://hook.eu2.make.com/ek6thb6m50uqodzgx8fp0holw7s79ahi', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, timestamp }),
                  });
                  
                  if (response.ok) {
                    alert('Thank you for subscribing!');
                    (e.target as HTMLFormElement).reset();
                  } else {
                    throw new Error('Subscription failed');
                  }
                } catch (error) {
                  alert('Sorry, there was an error. Please try again later.');
                }
              }}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-neon-green/40"
                />
                <Button className="bg-neon-green hover:bg-neon-green/90 text-white/90">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}