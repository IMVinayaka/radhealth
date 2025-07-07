import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'RadHealth+ – Healthcare Staffing Excellence',
  description: 'Bridging talent and opportunities in healthcare staffing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-primary-light to-primary-extraLight bg-fixed">
        <div className="min-h-screen snap-y snap-mandatory overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
