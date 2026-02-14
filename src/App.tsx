import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import InvestorsPage from './pages/InvestorsPage';
import PartnersPage from './pages/PartnersPage';
import BuyersPage from './pages/BuyersPage';
import TechnologyPage from './pages/TechnologyPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-zinc-950 min-h-screen text-white font-sans selection:bg-green-500 selection:text-white">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inversionistas" element={<InvestorsPage />} />
          <Route path="/aliados" element={<PartnersPage />} />
          <Route path="/compradores" element={<BuyersPage />} />
          <Route path="/tecnologia" element={<TechnologyPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
