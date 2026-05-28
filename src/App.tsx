import { useState, useRef } from 'react';
import { Scenario } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ScenariosSection from './components/ScenariosSection';
import CustomScenarioBuilder from './components/CustomScenarioBuilder';
import InteractiveSimulator from './components/InteractiveSimulator';
import ReferenceSection from './components/ReferenceSection';
import BenefitsSection from './components/BenefitsSection';
import FaqSection from './components/FaqSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  // Store user-generated scenarios dynamically from the Gemini AI endpoint
  const [customScenarios, setCustomScenarios] = useState<Scenario[]>([]);

  // Track currently selected scenario loaded into the simulator
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('');

  // DOM Refs for smooth scrolling
  const contactFormRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenContact = () => {
    scrollToSection('contacto');
  };

  const handleNavigateToSimulator = () => {
    scrollToSection('simulador');
  };

  const handleSelectAndPlay = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    scrollToSection('simulador');
  };

  const handleScenarioGeneratedByAI = (newScenario: Scenario) => {
    setCustomScenarios((prev) => [newScenario, ...prev]);
    setSelectedScenarioId(newScenario.id);
    scrollToSection('simulador');
  };

  return (
    <div id="landing-app" className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white antialiased">
      
      {/* 1. Header Navigation Bar */}
      <Header
        onOpenContact={handleOpenContact}
        onNavigateToSimulator={handleNavigateToSimulator}
      />

      {/* 2. Main Hero Landing Section */}
      <Hero
        onNavigateToSimulator={handleNavigateToSimulator}
        onOpenContact={handleOpenContact}
      />

      {/* 3. Real World Scenarios Bento List */}
      <ScenariosSection onSelectAndPlay={handleSelectAndPlay} />

      {/* 4. Custom AI Prompt Scenario Builder */}
      <CustomScenarioBuilder onScenarioGenerated={handleScenarioGeneratedByAI} />

      {/* 5. Playable 2D Virtual Fire Extinguisher Simulator */}
      <InteractiveSimulator
        customScenarios={customScenarios}
        selectedScenarioId={selectedScenarioId}
      />

      {/* 6. Extingushers & Fire class manual directory (DS594 / DS44) */}
      <ReferenceSection />

      {/* 7. Corporate Benefits & Training statistical board */}
      <BenefitsSection />

      {/* 8. Interactive Frequently Asked Questions */}
      <FaqSection />

      {/* 9. Support & Licensing Inquiry Form */}
      <ContactForm formRef={contactFormRef} />

      {/* 10. Legal Trademarks & Warning disclosures Footer */}
      <Footer />

    </div>
  );
}
