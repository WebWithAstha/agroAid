import { useState } from 'react';
import Intro from '../ivr/Intro';
import IVRCard from '../ivr/IVRCard';
import WhatToExpect from '../ivr/Expect';
import BenefitsSection from '../ivr/Benefits';
import HowItWorksSection from '../ivr/Working';
import FeaturesSection from '../ivr/Features';
import Header from '../partials/Header';

const IvrSystem = () => {
  const [expandedSection, setExpandedSection] = useState('');
  const toggleSection = (section) => setExpandedSection(prev => (prev === section ? null : section));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Farming IVR Assistant" />
      <div className="flex-1 container mx-auto py-6 px-4">
        <div className="md:max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-4">
            <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
              <Intro />
              <IVRCard />
              <WhatToExpect />
            </div>
          </div>

          <div className="expandable-sections">
            <BenefitsSection expanded={expandedSection} toggle={toggleSection} />
            <HowItWorksSection expanded={expandedSection} toggle={toggleSection} />
            <FeaturesSection expanded={expandedSection} toggle={toggleSection} />
          </div>
        </div>
      </div>

      <footer className="bg-green-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>Toll-free IVR number: 1800-XXX-XXXX</p>
          <p className="text-sm mt-2">Available 24/7 in 8 regional languages</p>
        </div>
      </footer>
    </div>
  );
};

export default IvrSystem;
