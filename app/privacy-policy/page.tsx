'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '../utils/animations';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-20 mt-12 text-justify px-4 section bg-white/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="prose max-w-none"
        >
          <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>
          
          <p className="mb-6">
            This Privacy Statement ('Statement') is an elaborative description of how RadHealth+ collects, shares, and processes the personal data that is shared by individuals or organizations and also serves as an explainer on the privacy-related rights pertaining to personal data.
          </p>

          <p className="mb-6">
            RadHealth+, its affiliates, and subsidiaries (hereinafter collectively referred to as 'RadHealth+') understand and value the importance of protecting the personal data that the User shares with RadHealth+.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">The personal data that RadHealth+ collects about the User:</h2>
          <p className="mb-6">
            RadHealth+ does not and will not collect any personal data about the User unless such User provides it to RadHealth+ voluntarily. RadHealth+ collects information during User's interactions with RadHealth+, whether through business-related interactions or online, including through RadHealth+'s websites, that is necessary to conduct its business, to provide services to the customers, as part of business operations, and the optimization of its service offerings.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How is the User's personal data collected?</h2>
          <p className="mb-6">
            Generally, RadHealth+ collects personal information related to employees, customers, and representatives when they decide to interact with us, avail services, or express an interest or apply for a position. The kind of data that RadHealth+ collects and/or has visibility/access to depends solely on the context and the nature of User's interaction with RadHealth+ and, in the case of RadHealth+'s customers, the nature of the service offering that such customer avails from RadHealth+.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Purposes for which RadHealth+ may use the personal data belonging to the User:</h2>
          <p className="mb-6">
            RadHealth+ may use personal information for the following purposes only:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>To engage in activity in relation to RadHealth+'s member services.</li>
            <li>To review and process job applications.</li>
            <li>To comply with legal or regulatory obligations that RadHealth+ is obliged to discharge.</li>
            <li>To verify identity and entitlements to RadHealth+'s products and services.</li>
            <li>To supply services and manage payments.</li>
            <li>To send statements and invoices, and collect payments.</li>
            <li>To provide technical and customer support.</li>
            <li>To obtain feedback on RadHealth+'s services.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">How RadHealth+ protects personal data belonging to the User:</h2>
          <p className="mb-6">
            RadHealth+ is committed to protecting its User's personal data. RadHealth+ has put in place safeguards including appropriate technologies, policies, and contractual arrangements, so that the data that RadHealth+ possesses about the Users is protected from unauthorized access and improper use.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">SMS Data Policy</h2>
          <h3 className="text-xl font-semibold mt-6 mb-2">Collection of Information</h3>
          <p className="mb-4">
            When you submit your phone number through our web form, we collect and store this information for the purpose of sending you SMS messages related to job-related offers. By providing your phone number, you consent to receive SMS messages from us for this purpose. Message and data rates may apply.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Opt-Out</h3>
          <p className="mb-6">
            You have the right to opt-out of receiving SMS messages from us at any time. You can opt-out by replying STOP to unsubscribe or texting 'UNSUBSCRIBE' to 954-938-2800. Once you opt-out, we will not send you any further SMS messages unless you opt-in again. For more help, you can text HELP to the same number.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Information</h2>
          <p className="mb-6">
            For any questions or complaints regarding this Privacy Statement, the User may contact RadHealth+ using the following details:
          </p>
          <address className="not-italic mb-8">
            RadHealth+<br />
            6750 N. Andrews Ave., Suite 200<br />
            Fort Lauderdale, FL 33309<br />
            Phone: 954.938.2800
          </address>

          <p className="text-sm text-gray-600 mt-12">
            Last updated: July 10, 2025
          </p>
        </motion.div>
      </div>
    </div>
  );
}
