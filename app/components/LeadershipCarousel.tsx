'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Venu Myneni',
    position: 'CEO',
    image: 'https://admin.radiants.com/assets/images/team/5e5354e96ec94_23184.jpg',
    bio: 'Co-founded Radiant group and has been donning the hat of the CEO since its inception in 1995. His professional endeavor expands across 23 glorious years as an Engineer, Marketing Executive, Programmer and Manager with various organizations.',
    education: 'Masters in Engineering from City College of New York (CCNY), Bachelors in Engineering from Andhra University (India)'
  },
  {
    name: 'Vinod Koduru',
    position: 'COO',
    image: 'https://admin.radiants.com/assets/images/team/5e33bc81e3727_08956.jpg',
    bio: 'Co-founded Radiant group and has been in action as the COO since its inception in 1995. He had previously worked as a Designer, Programmer and Manager with various organizations for 18 impeccable years.',
    education: 'Masters in Computer Sciences from New York Institute of Technology, Bachelors in Engineering from Bangalore University'
  },
  {
    name: 'Rayn Kamesh',
    position: 'Director of Global Sales',
    image: 'https://admin.radiants.com/assets/images/team/5e33bc8da4458_81064.jpg',
    bio: 'With more than 15 years of experience in Strategic Sales, Contingent Labor and Business Development. Rayn brings his established track record to Radiant Sales Team, directly managing the team and overseeing all aspects of sales.',
    education: 'Bachelors in Engineering and MBA in Marketing from SRM University, India'
  }
];

export default function LeadershipCarousel() {
  return (
    <section id="leadership" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
            Our Leadership Team
          </h2>
          <div className="h-1.5 w-20 bg-highlight mx-auto mb-6"></div>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Meet the visionary leaders driving innovation and excellence at RadHealth+
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-80 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-text-dark mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.position}</p>
                <p className="text-text-muted mb-4">{member.bio}</p>
                <div className="text-sm text-gray-500">
                  <p className="font-medium mb-1">Education:</p>
                  <p>{member.education}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
