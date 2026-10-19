export const SITE_DATA = {
  brand: {
    name: 'WOAT',
    tagline: 'WEBSITES OF ALL TIME Creative and proffessional at a reasonable price for your Business.',
    subtitle: 'Websites of all time',
    creator: 'Aayush Karbhal',
    location: 'Mumbai, India',
    phone: '+91 9892409460',
    phoneRaw: '+919892409460',
    email: 'aayushkarbhal5@gmail.com',
    whatsappUrl: 'https://wa.me/919892409460'
  },

  services: [
    {
      number: '01',
      title: 'Website Design',
      pitch: 'Clean, responsive websites that make your business look its best.',
      highlights: [
        'Custom typographic hierarchy & aesthetic',
        'Mobile-first responsive layouts',
        'Conversion-focused structure',
        'High visual polish with zero clutter'
      ]
    },
    {
      number: '02',
      title: 'Website Development',
      pitch: 'Your ideas turned into fast, functional websites.',
      highlights: [
        'Clean modern code with zero bloat',
        'Lightning-fast page load times',
        'Built-in search engine optimization basics',
        'Fluid micro-interactions & smooth transitions'
      ]
    },
    {
      number: '03',
      title: 'Website Care',
      pitch: 'Updates, fixes and ongoing support when you need them.',
      highlights: [
        'Content, menu & imagery updates',
        'Quick turnaround bug repairs',
        'Periodic health & performance checks',
        'Direct personal support via WhatsApp'
      ]
    }
  ],

  about: {
    heading: 'Small team energy. One-person attention.',
    bio: "I'm Aayush — a developer who builds and manages websites for businesses that want a professional online presence without the agency-sized price tag. You work directly with me, from the first idea to launch and beyond.",
    proofPoints: [
      {
        title: 'Direct one-to-one communication',
        description: 'No account managers, no ticket queues. You talk directly with the developer writing your code.'
      },
      {
        title: 'Responsive, modern websites',
        description: 'Crafted with precision to look sharp and function effortlessly on every screen from mobile to desktop.'
      },
      {
        title: 'Support after launch',
        description: 'Peace of mind with dedicated post-launch bug fixing included with every single project.'
      }
    ]
  },

  packages: [
    {
      id: 'starter',
      number: 'PACKAGE 01',
      name: 'Starter',
      price: '₹999',
      popular: false,
      cta: 'Choose Starter',
      description: 'Ideal for small businesses needing a clean, fast and professional online presence.',
      features: [
        'One-page website',
        'Mobile-friendly layout',
        'Business information and services',
        'WhatsApp/contact links',
        'One revision round',
        '7 days of post-launch bug fixes'
      ]
    },
    {
      id: 'business',
      number: 'PACKAGE 02',
      name: 'Business',
      price: '₹1,499',
      popular: true,
      badge: 'POPULAR',
      cta: 'Choose Business',
      description: 'The sweet spot for growing brands wanting dedicated pages and search-ready setup.',
      features: [
        'Up to 3 simple pages',
        'Services, about and gallery sections',
        'Mobile-friendly design',
        'WhatsApp, phone and location links',
        'Basic SEO title and description',
        'Two revision rounds',
        '14 days of post-launch bug fixes'
      ]
    },
    {
      id: 'business-plus',
      number: 'PACKAGE 03',
      name: 'Business Plus',
      price: '₹2,999',
      popular: false,
      cta: 'Choose Business Plus',
      description: 'Expanded multi-page website with customized layouts and extended post-launch support.',
      features: [
        'Up to 5 simple pages',
        'More customized design',
        'Services, gallery, FAQ or testimonials using client-provided content',
        'Basic enquiry form (if supported service configured)',
        'Basic SEO setup',
        'Three revision rounds',
        '30 days of post-launch bug fixes'
      ]
    }
  ],

  disclaimer: 'Domain, paid hosting and third-party service charges are separate where applicable. Custom functionality is quoted separately.'
};
