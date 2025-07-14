'use client';
import Hero from './components/Hero';
import AutoScrollSections from './components/AutoScrollSections';

export default function Home() {
  // Define the section IDs in the order you want to auto-scroll through
  const sectionIds = ['approach'];

  return (
    <main className="min-h-screen">
      <AutoScrollSections 
        sectionIds={sectionIds} 
        delay={7000} 
        scrollOffset={80} 
      />
      <div className="pt-16">
        <section id="hero" className="">
          <Hero />
        </section>
        {/* <section id="approach" className="">
          <Approach />
        </section>
        <section id="nursing-opportunities" className="">
          <NursingOpportunities />
        </section> */}
        {/* <section id="contact" className="">
          <Contact />
        </section> */}
      </div>
    </main>
  );
}
