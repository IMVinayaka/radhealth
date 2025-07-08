'use client';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Approach from './components/Approach';
import NursingOpportunities from './components/NursingOpportunities';
import Contact from './contact/page';
import { useAutoScroll } from './hooks/useAutoScroll';

export default function Home() {
  // Define the section IDs in the order you want to auto-scroll through
  const sectionIds = ['approach'];
  
  // Initialize the auto-scroll hook
  useAutoScroll(sectionIds, 5000);

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <section id="hero">
          <Hero />
        </section>
        <section id="approach">
          <Approach />
        </section>
        <section id="nursing-opportunities">
          <NursingOpportunities />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
      
      <footer className="bg-text-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p> {new Date().getFullYear()} RadHealth+. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
