import SEO from '../components/SEO';
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
            <SEO
                title="Crédito Agrícola sin Hipotecas | Financiamiento para Arroz, Maíz, Soya | Chakra"
                description="Financia tu cultivo sin hipotecar tu tierra. Aprobación en 48 horas con monitoreo satelital. Crédito para arroz, maíz, soya y más cultivos. Tu experiencia es tu garantía."
                keywords="crédito agrícola, préstamo agrícola, financiamiento agrícola, crédito sin hipoteca, financiamiento arroz, financiamiento maíz, financiamiento soya, préstamo para agricultores, crédito para productores, financiamiento cultivos, capital de trabajo agrícola, crédito rápido agricultura, préstamo sin garantías, tecnología satelital agricultura, monitoreo satelital cultivos, agricultura de precisión, ingeniero agrónomo, asesoría agrícola, crédito campaña agrícola"
                themeColor="#00261B"
            />
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
