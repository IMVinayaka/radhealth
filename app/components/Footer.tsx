'use client';

import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">RadHealth<sup>+</sup></h3>
            <p className="text-gray-400 mb-4">
              Bridging talent and opportunities in healthcare staffing with excellence and compassion.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/radhealth/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="https://x.com/RADHealth_" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.facebook.com/radhealth/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/radhealth_/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/solutions" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/clients" className="text-gray-400 hover:text-white transition-colors">Clients</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Open Jobs</Link></li>
              {/* <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li> */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-primary" />
                <div>
                  <p>6750 N. Andrews Ave., Suite 200</p>
                  <p>Fort Lauderdale, FL 33309</p>
                </div>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-primary" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">+1 (954)-938-2800 </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-primary" />
                <a href="mailto:info@radhealthplus.com" className="hover:text-primary transition-colors">info@radhealthplus.com</a>
              </li>
   
            </ul>
          </div>


        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} RadHealth<sup>+</sup>. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            {/* <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
