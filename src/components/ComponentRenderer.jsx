import React from 'react';

// Section imports
import NavStandard from './sections/NavStandard';
import NavMinimal from './sections/NavMinimal';
import HeroCentered from './sections/HeroCentered';
import HeroSplit from './sections/HeroSplit';
import HeroVideo from './sections/HeroVideo';
import HeroGradient from './sections/HeroGradient';
import FeaturesGrid from './sections/FeaturesGrid';
import FeaturesAlternating from './sections/FeaturesAlternating';
import FeaturesIcons from './sections/FeaturesIcons';
import TestimonialsCards from './sections/TestimonialsCards';
import TestimonialsSlider from './sections/TestimonialsSlider';
import PricingTable from './sections/PricingTable';
import PricingCards from './sections/PricingCards';
import ContactStandard from './sections/ContactStandard';
import ContactSplit from './sections/ContactSplit';
import FooterStandard from './sections/FooterStandard';
import FooterMinimal from './sections/FooterMinimal';
import FooterCta from './sections/FooterCta';

const componentMap = {
  'nav-standard': NavStandard,
  'nav-minimal': NavMinimal,
  'hero-centered': HeroCentered,
  'hero-split': HeroSplit,
  'hero-video': HeroVideo,
  'hero-gradient': HeroGradient,
  'features-grid': FeaturesGrid,
  'features-alternating': FeaturesAlternating,
  'features-icons': FeaturesIcons,
  'testimonials-cards': TestimonialsCards,
  'testimonials-slider': TestimonialsSlider,
  'pricing-table': PricingTable,
  'pricing-cards': PricingCards,
  'contact-standard': ContactStandard,
  'contact-split': ContactSplit,
  'footer-standard': FooterStandard,
  'footer-minimal': FooterMinimal,
  'footer-cta': FooterCta,
};

export default function ComponentRenderer({ component }) {
  const Component = componentMap[component.type];
  if (!Component) {
    return (
      <div className="p-8 text-center text-slate-500 border border-dashed border-slate-700 rounded-xl">
        Unknown component: <code className="text-purple-400">{component.type}</code>
      </div>
    );
  }
  return <Component props={component.props} />;
}

export { componentMap };
