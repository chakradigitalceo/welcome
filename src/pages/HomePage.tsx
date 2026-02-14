import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import HowItWorksSection from '../components/HowItWorksSection';
import MetricsSection from '../components/MetricsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import LeadFormSection from '../components/LeadFormSection';

const HomePage = () => {
    return (
        <>
            {/* 1. Hero - ¿Esto es para mí? */}
            <HeroSection />

            {/* 2. Problema - ¿Me ayuda realmente? */}
            <ProblemSection />

            {/* 3. Solución Simple - Beneficios claros */}
            <SolutionSection />

            {/* 4. Cómo Funciona - ¿Es fácil empezar? */}
            <HowItWorksSection />

            {/* 5. Prueba Social - ¿Puedo confiar? */}
            <MetricsSection />
            <TestimonialsSection />

            {/* 6. FAQ - Objeciones */}
            <FAQSection />

            {/* 7. CTA Final - ¿Qué hago ahora? */}
            <LeadFormSection />
        </>
    );
};

export default HomePage;
