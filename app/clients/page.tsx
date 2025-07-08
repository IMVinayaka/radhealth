import Navigation from '../components/Navigation';

export default function ClientsPage() {
  const clients = [
    "AHSA - Trio",
    "ARMC - Arrowhead Regional Medical Center",
    "Atrium Health",
    "BrightSpring Health Services",
    "Care New England Health System",
    "Carpenter Technology",
    "Cedars-Sinai Medical Center",
    "Cross Country Healthcare",
    "Evangelical Lutheran Good Samaritan Society",
    "Genesis HealthCare",
    "John Muir Health",
    "KPC Health",
    "Lehigh Valley Health Network",
    "Medefis",
    "Novant Health",
    "Ohio State University",
    "Parkview Health",
    "PIH Health",
    "Providence Medical Center",
    "Sanford Health",
    "Summa Health",
    "Valleywise Health Medical Center",
    "Wake Forest University Baptist Medical Center"
  ];

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero/Banner Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Current Clients</h1>
          <p className="text-xl opacity-90">Trusted by leading healthcare institutions nationwide</p>
        </div>
      </section>

      {/* Clients Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-700 mb-8">
              Having efficiently performed in and completed over 150 successful projects over the years and holding over 50 ongoing projects, RADgov has demonstrated its efficiency in catering to the intellectual capital and technological needs of not just commercial, but Federal and Government clients as well. We, at RADgov, believe and strive towards providing customized and customer-oriented solutions to clients, which makes us more approachable, trustworthy and resourceful in fulfilling the client requirements to the best extent.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-text-dark">Our Clients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients.map((client, index) => (
                <div 
                  key={client}
                  className={`p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <p className="text-lg font-medium text-text-dark">{client}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-text-dark text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>© {new Date().getFullYear()} RadHealth+. All rights reserved.</p>
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
