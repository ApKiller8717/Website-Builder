import {
  Layout, Layers, Star, MessageSquare, DollarSign,
  Navigation, Footprints, Sparkles, Zap, Shield,
  Globe, ArrowRight, Users, Heart
} from 'lucide-react';

const componentTemplates = [
  // ========== NAVIGATION ==========
  {
    category: 'Navigation',
    icon: Navigation,
    items: [
      {
        type: 'nav-standard',
        label: 'Standard Navbar',
        description: 'Logo + links + CTA button',
        thumbnail: 'nav',
        defaultProps: {
          brand: 'PageCraft',
          links: ['Features', 'Pricing', 'About', 'Contact'],
          ctaText: 'Get Started',
          paddingY: 4,
          paddingX: 6,
          maxWidth: '7xl',
          bgColor: 'transparent',
        },
      },
      {
        type: 'nav-minimal',
        label: 'Minimal Navbar',
        description: 'Clean centered navigation',
        thumbnail: 'nav',
        defaultProps: {
          brand: 'Brand',
          links: ['Home', 'Work', 'Blog', 'Contact'],
          paddingY: 5,
          paddingX: 6,
          maxWidth: '7xl',
          bgColor: 'transparent',
        },
      },
    ],
  },

  // ========== HERO SECTIONS ==========
  {
    category: 'Hero Sections',
    icon: Layout,
    items: [
      {
        type: 'hero-centered',
        label: 'Centered Hero',
        description: 'Gradient background with badge, dual CTAs',
        thumbnail: 'hero',
        defaultProps: {
          badge: '🚀 Launching Soon',
          headline: 'Build Beautiful Websites Without Code',
          subtitle: 'The most intuitive drag-and-drop builder for modern teams. Create, customize, and ship stunning pages in minutes.',
          ctaPrimary: 'Start Building Free',
          ctaSecondary: 'Watch Demo',
          paddingY: 24,
          paddingX: 6,
          maxWidth: '4xl',
          bgColor: 'gradient-purple',
        },
      },
      {
        type: 'hero-split',
        label: 'Split Hero',
        description: 'Text on left, visual on right',
        thumbnail: 'hero',
        defaultProps: {
          headline: 'The Future of Web Development is Here',
          subtitle: 'Powerful tools that help you build faster, ship sooner, and delight your users with exceptional experiences.',
          ctaPrimary: 'Get Started',
          ctaSecondary: 'Learn More',
          paddingY: 20,
          paddingX: 6,
          maxWidth: '7xl',
          bgColor: 'transparent',
        },
      },
      {
        type: 'hero-video',
        label: 'Video Hero',
        description: 'Full-width with particles & play button',
        thumbnail: 'hero',
        defaultProps: {
          headline: 'Experience the Next Generation',
          subtitle: 'Immersive design meets cutting-edge technology. See what\'s possible.',
          ctaPrimary: 'Explore Now',
          paddingY: 28,
          paddingX: 6,
          maxWidth: '5xl',
          bgColor: 'dark',
        },
      },
      {
        type: 'hero-gradient',
        label: 'Gradient Hero',
        description: 'Multi-layer gradient with stats row',
        thumbnail: 'hero',
        defaultProps: {
          headline: 'Supercharge Your Workflow',
          subtitle: 'Join thousands of teams already building with our platform.',
          ctaPrimary: 'Start Free Trial',
          stats: [
            { value: '10K+', label: 'Active Users' },
            { value: '99.9%', label: 'Uptime' },
            { value: '150+', label: 'Integrations' },
          ],
          paddingY: 24,
          paddingX: 6,
          maxWidth: '6xl',
          bgColor: 'gradient-mesh',
        },
      },
    ],
  },

  // ========== FEATURES ==========
  {
    category: 'Features',
    icon: Layers,
    items: [
      {
        type: 'features-grid',
        label: 'Feature Grid',
        description: 'Configurable 1-4 column grid with icons',
        thumbnail: 'features',
        defaultProps: {
          headline: 'Everything You Need',
          subtitle: 'Powerful features to help you manage your business from anywhere.',
          columns: 3,
          features: [
            { icon: 'Zap', title: 'Lightning Fast', desc: 'Built for speed with optimized performance across all devices.' },
            { icon: 'Shield', title: 'Enterprise Security', desc: 'Bank-grade encryption and security protocols to protect your data.' },
            { icon: 'Globe', title: 'Global CDN', desc: 'Deploy to 200+ edge locations for blazing fast load times worldwide.' },
            { icon: 'Users', title: 'Team Collaboration', desc: 'Real-time collaboration tools for teams of any size.' },
            { icon: 'Sparkles', title: 'AI Powered', desc: 'Smart suggestions and automation powered by machine learning.' },
            { icon: 'Heart', title: 'Developer Love', desc: 'Beautiful APIs, great docs, and a passionate community.' },
          ],
          paddingY: 20,
          paddingX: 6,
          maxWidth: '7xl',
          bgColor: 'transparent',
        },
      },
      {
        type: 'features-alternating',
        label: 'Alternating Features',
        description: 'Text + visual rows, alternating layout',
        thumbnail: 'features',
        defaultProps: {
          features: [
            { title: 'Design with Ease', desc: 'Intuitive drag-and-drop interface that anyone can use. No coding required.', visual: 'design' },
            { title: 'Real-time Preview', desc: 'See changes instantly as you build. What you see is what you get.', visual: 'preview' },
            { title: 'One-Click Publish', desc: 'Deploy your site to a global CDN with a single click. It\'s that simple.', visual: 'publish' },
          ],
          paddingY: 20,
          paddingX: 6,
          maxWidth: '7xl',
          bgColor: 'transparent',
        },
      },
      {
        type: 'features-icons',
        label: 'Icon Features',
        description: 'Dark themed with icon + text pairs',
        thumbnail: 'features',
        defaultProps: {
          headline: 'Why Choose Us',
          subtitle: 'We\'ve thought of everything so you don\'t have to.',
          features: [
            { icon: 'Zap', title: 'Blazing Speed', desc: 'Sub-100ms response times globally.' },
            { icon: 'Shield', title: 'Secure by Default', desc: 'SOC 2 compliant with E2E encryption.' },
            { icon: 'Globe', title: 'Scale Infinitely', desc: 'Auto-scaling infrastructure that grows with you.' },
            { icon: 'Sparkles', title: 'Smart Analytics', desc: 'Actionable insights powered by AI.' },
          ],
          columns: 2,
          paddingY: 20,
          paddingX: 6,
          maxWidth: '6xl',
          bgColor: 'dark',
        },
      },
    ],
  },

  // ========== TESTIMONIALS ==========
  {
    category: 'Testimonials',
    icon: MessageSquare,
    items: [
      {
        type: 'testimonials-cards',
        label: 'Testimonial Cards',
        description: '3-column cards with stars & avatars',
        thumbnail: 'testimonials',
        defaultProps: {
          headline: 'Loved by Teams Worldwide',
          subtitle: 'See what our customers have to say about their experience.',
          testimonials: [
            { name: 'Sarah Chen', role: 'CEO at TechFlow', quote: 'This tool completely transformed how we build landing pages. We shipped 3x faster.', rating: 5 },
            { name: 'Marcus Johnson', role: 'Lead Developer at Nexus', quote: 'The best page builder I\'ve ever used. The code export feature is a game-changer.', rating: 5 },
            { name: 'Emily Parker', role: 'Designer at Pixel Labs', quote: 'Beautiful, intuitive, and incredibly powerful. I can\'t imagine working without it.', rating: 5 },
          ],
          paddingY: 20,
          paddingX: 6,
          maxWidth: '7xl',
          bgColor: 'transparent',
        },
      },
      {
        type: 'testimonials-slider',
        label: 'Testimonial Slider',
        description: 'Large showcase with dot navigation',
        thumbnail: 'testimonials',
        defaultProps: {
          testimonials: [
            { name: 'Alex Rivera', role: 'Founder at CreativeStack', quote: 'PageCraft Pro is the missing piece in our design workflow. We\'ve cut our development time by 60% and the quality of our output has never been higher.', rating: 5 },
            { name: 'Jordan Lee', role: 'CTO at DataPulse', quote: 'The AI code conversion is mind-blowing. Upload any HTML and get production-ready Flutter code in seconds. Revolutionary.', rating: 5 },
          ],
          paddingY: 24,
          paddingX: 6,
          maxWidth: '4xl',
          bgColor: 'gradient-subtle',
        },
      },
    ],
  },

  // ========== PRICING ==========
  {
    category: 'Pricing',
    icon: DollarSign,
    items: [
      {
        type: 'pricing-table',
        label: 'Pricing Table',
        description: 'Tiered pricing cards with feature lists',
        thumbnail: 'pricing',
        defaultProps: {
          headline: 'Simple, Transparent Pricing',
          subtitle: 'Choose the plan that fits your needs. Upgrade anytime.',
          plans: [
            { name: 'Starter', price: '0', period: '/mo', desc: 'Perfect for side projects', features: ['5 Pages', '1 GB Storage', 'Community Support', 'Basic Analytics'], cta: 'Get Started', highlighted: false },
            { name: 'Pro', price: '29', period: '/mo', desc: 'For growing businesses', features: ['Unlimited Pages', '50 GB Storage', 'Priority Support', 'Advanced Analytics', 'Custom Domain', 'Team Collaboration'], cta: 'Start Free Trial', highlighted: true },
            { name: 'Enterprise', price: '99', period: '/mo', desc: 'For large organizations', features: ['Everything in Pro', '500 GB Storage', 'Dedicated Support', 'SLA Guarantee', 'SSO / SAML', 'Custom Integrations'], cta: 'Contact Sales', highlighted: false },
          ],
          paddingY: 20,
          paddingX: 6,
          maxWidth: '7xl',
          bgColor: 'transparent',
        },
      },
      {
        type: 'pricing-cards',
        label: 'Pricing Cards',
        description: 'Minimal card style pricing',
        thumbnail: 'pricing',
        defaultProps: {
          headline: 'Choose Your Plan',
          plans: [
            { name: 'Basic', price: '9', desc: 'For individuals', features: ['10 Pages', '5 GB Storage', 'Email Support'], cta: 'Get Basic', highlighted: false },
            { name: 'Growth', price: '49', desc: 'For teams', features: ['Unlimited Pages', '100 GB Storage', 'Priority Support', 'API Access'], cta: 'Get Growth', highlighted: true },
          ],
          paddingY: 20,
          paddingX: 6,
          maxWidth: '5xl',
          bgColor: 'dark',
        },
      },
    ],
  },

  // ========== FOOTERS ==========
  {
    category: 'Footers',
    icon: Footprints,
    items: [
      {
        type: 'footer-standard',
        label: 'Standard Footer',
        description: 'Multi-column with brand & links',
        thumbnail: 'footer',
        defaultProps: {
          brand: 'PageCraft',
          tagline: 'Building the future of web design.',
          columns: [
            { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Docs'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
            { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
          ],
          paddingY: 16,
          paddingX: 6,
          maxWidth: '7xl',
          bgColor: 'dark',
        },
      },
      {
        type: 'footer-minimal',
        label: 'Minimal Footer',
        description: 'Single-row with brand + links',
        thumbnail: 'footer',
        defaultProps: {
          brand: 'PageCraft',
          links: ['Privacy', 'Terms', 'Contact'],
          copyright: '© 2026 PageCraft. All rights reserved.',
          paddingY: 8,
          paddingX: 6,
          maxWidth: '7xl',
          bgColor: 'transparent',
        },
      },
      {
        type: 'footer-cta',
        label: 'CTA Footer',
        description: 'CTA section + newsletter + links',
        thumbnail: 'footer',
        defaultProps: {
          headline: 'Ready to Get Started?',
          subtitle: 'Join thousands of satisfied users today.',
          ctaText: 'Start Building Free',
          brand: 'PageCraft',
          paddingY: 16,
          paddingX: 6,
          maxWidth: '7xl',
          bgColor: 'gradient-purple',
        },
      },
    ],
  },
];

export default componentTemplates;
