
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import InvestorSection from './components/InvestorSection';
import FarmerSection from './components/FarmerSection';
import PartnerSection from './components/PartnerSection';
import TechSection from './components/TechSection';
import MetricsSection from './components/MetricsSection';
import TestimonialsSection from './components/TestimonialsSection';
import LeadFormSection from './components/LeadFormSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans selection:bg-green-500 selection:text-white">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      {/* <ProblemSection /> */}
      <SolutionSection />
      <InvestorSection />
      <FarmerSection />
      <PartnerSection />
      <TechSection />
      <MetricsSection />
      <TestimonialsSection />
      <LeadFormSection />
      <Footer />
    </div>
  );
}

export default App;
