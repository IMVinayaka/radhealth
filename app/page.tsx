'use client';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Approach from './components/Approach';
import NursingOpportunities from './components/NursingOpportunities';
import Contact from './contact/page';
import AutoScrollSections from './components/AutoScrollSections';

export default function Home() {
  // Define the section IDs in the order you want to auto-scroll through
  const sectionIds = ['approach'];

  return (
    <main className="min-h-screen">
      <Navigation />
      <AutoScrollSections 
        sectionIds={sectionIds} 
        delay={5000} 
        scrollOffset={80} 
      />
      
      <div className="pt-16">
        <section id="hero" className="">
          <Hero />
        </section>
        <section id="approach" className="">
          <Approach />
        </section>
        <section id="nursing-opportunities" className="">
          <NursingOpportunities />
        </section>
        <section id="contact" className="">
          <Contact />
        </section>
      </div>
      
    </main>
  );
}
