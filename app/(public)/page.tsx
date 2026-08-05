import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ArticlesSection from '@/components/sections/ArticlesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import ContactSection from '@/components/sections/ContactSection';
import PageTransition from '@/components/layout/PageTransition';

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <PortfolioSection />
      <ArticlesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </PageTransition>
  );
}
