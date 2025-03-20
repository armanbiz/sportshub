import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';
import { Link } from 'react-router-dom';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  timestamp: string;
  companyName?: string;
}

export default function ContactPage() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    const formData: ContactFormData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      timestamp: new Date().toISOString()
    };
    
    try {
      const response = await fetch('https://hook.eu2.make.com/8peuhq2vtipdjzhq43qmkqv7chlbg87v', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Sorry, there was an error sending your message. Please try again later.');
    }
  };

  return (
    <div className="pt-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let's Get Moving Together!
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Whether you're searching for a gym, partnering with us, or just saying hello—we're here to help. 
            Reach out below, and our Prague-based team will respond within 24 hours.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <AnimatedSection className="bg-dark rounded-xl p-6 border border-neon-green/20">
            <h2 className="text-2xl font-bold text-white mb-6">General Inquiries</h2>
            <p className="text-gray-300 mb-6">
              Have a question about a gym listing, feature, or partnership? Fill out the form below, and we'll guide you.
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-3 text-neon-green" />
                <span>support@sportshub.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-3 text-neon-green" />
                <span>+420 123 456 789 (Mon-Fri, 9 AM - 6 PM)</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="bg-dark rounded-xl p-6 border border-neon-green/20">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-neon-green/40"
                />
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-neon-green/40"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  required
                  placeholder="How can we help you today?"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-neon-green/40"
                />
              </div>
              <Button type="submit" className="w-full bg-neon-green hover:bg-neon-green/90 text-white/90">
                Send Message
              </Button>
            </form>
          </AnimatedSection>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <AnimatedSection className="bg-dark rounded-xl p-6 border border-neon-green/20">
            <h2 className="text-2xl font-bold text-white mb-6">For Gyms & Partners</h2>
            <p className="text-gray-300 mb-6">
              Want to list your facility or collaborate? We'd love to hear from you!
            </p>
            <div className="space-y-4 text-gray-300">
              <h3 className="font-semibold text-white">✅ Benefits of Partnering:</h3>
              <ul className="space-y-2 ml-6">
                <li>• Get discovered by 10,000+ monthly users.</li>
                <li>• Highlight promotions, events, and discounts.</li>
                <li>• Access free marketing tools.</li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection className="bg-dark rounded-xl p-6 border border-neon-green/20">
            <h2 className="text-2xl font-bold text-white mb-6">Partner Contact Form</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              
              const formData: ContactFormData = {
                name: form.name.value,
                companyName: form.companyName.value,
                email: form.email.value,
                message: form.message.value,
                timestamp: new Date().toISOString()
              };
              
              try {
                const response = await fetch('https://hook.eu2.make.com/hl5esgk5w3xadfq5enwbgc59cfou3kxi', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData),
                });
                
                if (response.ok) {
                  alert('Thank you for your message! We will get back to you soon.');
                  form.reset();
                } else {
                  throw new Error('Failed to send message');
                }
              } catch (error) {
                alert('Sorry, there was an error sending your message. Please try again later.');
              }
            }} className="space-y-4">
              <div>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-neon-green/40"
                />
              </div>
              <div>
                <input
                  name="companyName"
                  type="text"
                  required
                  placeholder="Company Name"
                  className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-neon-green/40"
                />
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Business Email"
                  className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-neon-green/40"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  required
                  placeholder="Tell us about your facility and how we can help"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-neon-green/40"
                />
              </div>
              <Button type="submit" className="w-full bg-neon-green hover:bg-neon-green/90 text-white/90">
                Send Message
              </Button>
            </form>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mb-16">
          <div className="bg-dark rounded-xl p-8 border border-neon-green/20">
            <h2 className="text-2xl font-bold text-white mb-6">Need Answers Fast?</h2>
            <p className="text-gray-300 mb-6">
              Check out our <Link to="/faq" className="text-neon-green hover:underline" onClick={() => window.scrollTo(0, 0)}>FAQ Page</Link> for quick tips on:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>• How to claim a gym listing.</li>
              <li>• Troubleshooting search filters.</li>
              <li>• Subscription and pricing.</li>
            </ul>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-16">
          <div className="bg-dark rounded-xl p-8 border border-neon-green/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Follow Us</h2>
            <p className="text-gray-300 mb-6">
              Stay in the loop with new gyms, fitness events, and Prague wellness trends:
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-8 w-8" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-8 w-8" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-8 w-8" />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}