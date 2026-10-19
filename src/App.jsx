import { useState, useEffect, useRef } from 'react';
import ShapeWaves from './ShapeWaves';
import { SITE_DATA } from './data/siteData';
import {
  ArrowUpRight,
  MessageSquare,
  Phone,
  Mail,
  Check,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ArrowUp
} from 'lucide-react';
import './App.css';

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('business');

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    packageId: 'business',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  // Sync selected package from package card clicks
  const contactSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // Section tracker
      const sections = ['home', 'services', 'about', 'packages', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectPackage = (packageId) => {
    setSelectedPackage(packageId);
    setFormData(prev => ({ ...prev, packageId }));

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name.';
    if (!formData.message.trim()) errors.message = 'Please provide a brief project description.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const pkg = SITE_DATA.packages.find(p => p.id === formData.packageId) || SITE_DATA.packages[1];
    const textLines = [
      `Hi Aayush, I'm reaching out from the WOAT website.`,
      ``,
      `*Name:* ${formData.name.trim()}`,
      formData.businessName.trim() ? `*Business:* ${formData.businessName.trim()}` : null,
      `*Selected Package:* ${pkg.name} (${pkg.price})`,
      ``,
      `*Project Details:*`,
      `${formData.message.trim()}`
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/919892409460?text=${encodeURIComponent(textLines)}`;
    setGeneratedWhatsAppUrl(url);
    setFormSubmitted(true);

    // Open WhatsApp in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const pkg = SITE_DATA.packages.find(p => p.id === formData.packageId) || SITE_DATA.packages[1];
    const subject = encodeURIComponent(`Website Enquiry - ${formData.businessName || formData.name} [${pkg.name}]`);
    const body = encodeURIComponent(
      `Hi Aayush,\n\nName: ${formData.name}\nBusiness: ${formData.businessName || 'N/A'}\nPackage: ${pkg.name} (${pkg.price})\n\nProject Details:\n${formData.message}\n`
    );

    window.location.href = `mailto:${SITE_DATA.brand.email}?subject=${subject}&body=${body}`;
  };

  // Scroll hero reactive transform
  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = Math.max(0.85, 1 - (scrollY / 1800));
  const heroTranslateY = scrollY * 0.25;

  return (
    <div className="woat-app">
      {/* 1. PRESERVED Geometric Patterned Background with subtle Sage/Mint Glow */}
      <div className="fixed-waves-backdrop" aria-hidden="true">
        <ShapeWaves
          text=""
          fontFamily='Geist, "Geist Sans", system-ui, sans-serif'
          fontWeight={500}
          textSize={0.6}
          shapes="mixed"
          cellSize={10}
          dotSize={0.7}
          color="#4E564F"
          hoverColor="#94D1BE"
          backgroundColor="#3B413C"
          speed={0.7}
          scale={1}
          contrast={1}
          brightness={0.34}
          flow={0}
          direction={0}
          fade={0.32}
          interactive={true}
          splashRadius={45}
          splashStrength={0.35}
          glow={0.14}
          intro={true}
          introDuration={1.6}
          paused={false}
        />
        {/* Restrained diffused sage/mint edge glow accent */}
        <div className="ambient-sage-vignette" />
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className={`woat-navbar ${scrollY > 60 ? 'scrolled' : 'at-top'}`}>
        <div className="nav-container">
          <a
            href="#home"
            className="nav-brand"
            onClick={(e) => handleNavClick(e, 'home')}
            aria-label="WOAT Home"
          >
            <span className="brand-wordmark">WOAT</span>
            <span className="brand-dot" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop" aria-label="Main navigation">
            {[
              { id: 'home', label: 'Home' },
              { id: 'services', label: 'Services' },
              { id: 'about', label: 'About' },
              { id: 'packages', label: 'Packages' },
              { id: 'contact', label: 'Contact' }
            ].map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a
              href="#contact"
              className="cta-button nav-cta"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={15} />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-drawer-content">
            {[
              { id: 'home', label: 'Home' },
              { id: 'services', label: 'Services' },
              { id: 'about', label: 'About' },
              { id: 'packages', label: 'Packages' },
              { id: 'contact', label: 'Contact' }
            ].map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`mobile-nav-item ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={16} />
              </a>
            ))}
            <div className="mobile-drawer-cta">
              <a
                href="#contact"
                className="cta-button primary full-width"
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                <span>Let's Talk ↗</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 3. HOME / HERO SECTION (PRESERVED WOAT ANCHOR SCREEN) */}
      <section id="home" className="hero-section">
        {/* Subtle Ambient Vertical Service Strips */}
        <div className="hero-decor-layer" style={{ opacity: heroOpacity }} aria-hidden="true">
          {/* Left Strip 1: Web Design */}
          <div className="hero-strip strip-left-outer">
            <div className="strip-line">
              <span className="strip-traveling-pulse pulse-delay-0" />
            </div>
            <div className="strip-label-wrap">
              <span className="strip-dot" />
              <span className="strip-label">WEB DESIGN</span>
            </div>
          </div>

          {/* Left Strip 2: Development */}
          <div className="hero-strip strip-left-inner">
            <div className="strip-line">
              <span className="strip-traveling-pulse pulse-delay-1" />
            </div>
            <div className="strip-label-wrap">
              <span className="strip-dot" />
              <span className="strip-label">DEVELOPMENT</span>
            </div>
          </div>

          {/* Right Strip 1: Responsive Websites */}
          <div className="hero-strip strip-right-inner">
            <div className="strip-line">
              <span className="strip-traveling-pulse pulse-delay-2" />
            </div>
            <div className="strip-label-wrap">
              <span className="strip-dot" />
              <span className="strip-label">RESPONSIVE WEBSITES</span>
            </div>
          </div>

          {/* Right Strip 2: Website Maintenance */}
          <div className="hero-strip strip-right-outer">
            <div className="strip-line">
              <span className="strip-traveling-pulse pulse-delay-3" />
            </div>
            <div className="strip-label-wrap">
              <span className="strip-dot" />
              <span className="strip-label">WEBSITE MAINTENANCE</span>
            </div>
          </div>
        </div>

        {/* Central Anchor Lockup */}
        <div
          className="hero-anchor-content"
          style={{
            opacity: heroOpacity,
            transform: `translateY(${heroTranslateY}px) scale(${heroScale})`
          }}
        >
          <div className="hero-brand-lockup">
            <h1 className="hero-woat-title">WOAT</h1>
            <p className="hero-woat-tagline">WEBSITES OF ALL TIME.<br></br>CREATIVE & PROFESSIONAL WEBITES<br></br> AT A REASONABLE PRICE.</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator" style={{ opacity: heroOpacity }}>
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, 'services')}
            className="scroll-indicator-link"
            aria-label="Scroll to services"
          >
            <span className="scroll-label">SCROLL TO EXPLORE</span>
            <div className="scroll-chevron-box">
              <ChevronDown size={18} className="scroll-arrow" />
            </div>
          </a>
        </div>

        {/* Continuous Seamless Infinite Ticker Strip */}
        <div className="hero-ticker-wrap" style={{ opacity: heroOpacity }} aria-hidden="true">
          <div className="hero-ticker-track">
            {/* Primary Track Set */}
            <div className="ticker-group">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div key={idx} className="ticker-phrase-set">
                  <span>DESIGN THAT CONNECTS</span>
                  <span className="ticker-bullet">·</span>
                  <span>WEBSITES THAT WORK</span>
                  <span className="ticker-bullet">·</span>
                  <span>BUILT FOR YOUR BUSINESS</span>
                  <span className="ticker-bullet">·</span>
                  <span>WEBSITE CARE THAT CONTINUES</span>
                  <span className="ticker-bullet">·</span>
                </div>
              ))}
            </div>
            {/* Duplicate Clone Set for Unbroken 100% Seamless Infinite Loop */}
            <div className="ticker-group" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div key={idx} className="ticker-phrase-set">
                  <span>DESIGN THAT CONNECTS</span>
                  <span className="ticker-bullet">·</span>
                  <span>WEBSITES THAT WORK</span>
                  <span className="ticker-bullet">·</span>
                  <span>BUILT FOR YOUR BUSINESS</span>
                  <span className="ticker-bullet">·</span>
                  <span>WEBSITE CARE THAT CONTINUES</span>
                  <span className="ticker-bullet">·</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT I OFFER — SERVICES SECTION */}
      <section id="services" className="page-section services-section">
        <div className="section-container">
          <header className="section-header-block">
            <span className="section-eyebrow">01 / WHAT I OFFER</span>
            <h2 className="section-title">Small business. Big online presence.</h2>
            <p className="section-subtitle">
              Websites built to look sharp, work smoothly and grow with your business.
            </p>
          </header>

          <div className="services-list">
            {SITE_DATA.services.map((service, index) => (
              <article key={service.number} className="service-row-card">
                <div className="service-number-col">
                  <span className="service-number">{service.number}</span>
                </div>

                <div className="service-main-col">
                  <div className="service-title-wrap">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-pitch">{service.pitch}</p>
                  </div>

                  <ul className="service-highlights-list">
                    {service.highlights.map((item, idx) => (
                      <li key={idx} className="highlight-tag">
                        <Check size={12} className="highlight-check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-action-col">
                  <a
                    href="#packages"
                    className="service-link-btn"
                    onClick={(e) => handleNavClick(e, 'packages')}
                  >
                    <span>View Packages</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT — WHO AM I? */}
      <section id="about" className="page-section about-section">
        <div className="section-container">
          <header className="section-header-block">
            <span className="section-eyebrow">02 / ABOUT ME</span>
            <h2 className="section-title">{SITE_DATA.about.heading}</h2>
          </header>

          <div className="about-editorial-grid">
            <div className="about-statement-card">
              <div className="creator-profile-badge">
                <span className="creator-status-dot" />
                <span>Aayush Karbhal · Mumbai, India</span>
              </div>
              <p className="about-bio-text">
                {SITE_DATA.about.bio}
              </p>
              <div className="about-cta-wrap">
                <a
                  href="#contact"
                  className="cta-button primary"
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  <span>Have a project in mind? Let's talk ↗</span>
                </a>
              </div>
            </div>

            <div className="about-proof-list">
              {SITE_DATA.about.proofPoints.map((point, index) => (
                <div key={index} className="proof-card">
                  <div className="proof-index">0{index + 1}</div>
                  <div className="proof-body">
                    <h3 className="proof-title">{point.title}</h3>
                    <p className="proof-desc">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PACKAGES — CLEAR AND TRANSPARENT PRICING */}
      <section id="packages" className="page-section packages-section">
        <div className="section-container">
          <header className="section-header-block">
            <span className="section-eyebrow">03 / PACKAGES</span>
            <h2 className="section-title">Good websites. Honest prices.</h2>
            <p className="section-subtitle">
              Pick what you need. No unnecessary extras.
            </p>
          </header>

          <div className="packages-grid">
            {SITE_DATA.packages.map(pkg => (
              <div
                key={pkg.id}
                className={`package-card ${pkg.popular ? 'popular-card' : ''} ${selectedPackage === pkg.id ? 'is-selected' : ''}`}
              >
                {pkg.popular && (
                  <div className="popular-badge">
                    <Sparkles size={11} />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                <div className="package-top">
                  <span className="package-number-label">{pkg.number}</span>
                  <h3 className="package-name">{pkg.name}</h3>
                  <div className="package-price-wrap">
                    <span className="package-price">{pkg.price}</span>
                    <span className="package-term">/ flat</span>
                  </div>
                  <p className="package-desc">{pkg.description}</p>
                </div>

                <div className="package-divider" />

                <ul className="package-features-list">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="package-feature-item">
                      <Check size={14} className="feature-check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="package-action-wrap">
                  <button
                    type="button"
                    className={`cta-button ${pkg.popular ? 'primary full-width' : 'secondary full-width'}`}
                    onClick={() => handleSelectPackage(pkg.id)}
                  >
                    <span>{pkg.cta}</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="packages-disclaimer-box">
            <p>{SITE_DATA.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* 7. CONTACT — MAKE IT EASY TO REACH ME */}
      <section id="contact" ref={contactSectionRef} className="page-section contact-section">
        <div className="section-container">
          <header className="section-header-block">
            <span className="section-eyebrow">04 / GET IN TOUCH</span>
            <h2 className="section-title">Got a business? Let's build its website.</h2>
            <p className="section-subtitle">
              Tell me what you need. We'll take it from there.
            </p>
          </header>

          <div className="contact-layout-grid">
            {/* Direct Contact Channels Card */}
            <div className="contact-channels-card">
              <div className="channels-header">
                <h3 className="channels-title">Direct Contact</h3>
                <p className="channels-subtitle">
                  Reach out directly on WhatsApp or phone for immediate response.
                </p>
              </div>

              <div className="channels-list">
                <a
                  href={SITE_DATA.brand.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-item whatsapp-channel"
                >
                  <div className="channel-icon-box">
                    <MessageSquare size={18} />
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">WhatsApp (Fastest)</span>
                    <span className="channel-value">{SITE_DATA.brand.phone}</span>
                  </div>
                  <ArrowUpRight size={16} className="channel-arrow" />
                </a>

                <a
                  href={`tel:${SITE_DATA.brand.phoneRaw}`}
                  className="channel-item"
                >
                  <div className="channel-icon-box">
                    <Phone size={18} />
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">Direct Call</span>
                    <span className="channel-value">{SITE_DATA.brand.phone}</span>
                  </div>
                  <ArrowUpRight size={16} className="channel-arrow" />
                </a>

                <a
                  href={`mailto:${SITE_DATA.brand.email}`}
                  className="channel-item"
                >
                  <div className="channel-icon-box">
                    <Mail size={18} />
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">Email</span>
                    <span className="channel-value">{SITE_DATA.brand.email}</span>
                  </div>
                  <ArrowUpRight size={16} className="channel-arrow" />
                </a>
              </div>

              <div className="location-pill-card">
                <span className="pulse-indicator" />
                <span>Available for new projects · Working directly with clients worldwide</span>
              </div>
            </div>

            {/* Interactive Enquiry Form */}
            <div className="enquiry-form-card">
              <form onSubmit={handleWhatsAppSubmit} className="enquiry-form" noValidate>
                <div className="form-header">
                  <h3 className="form-title">Send Project Enquiry</h3>
                  <p className="form-subtitle">
                    Select your package and describe your requirements.
                  </p>
                </div>

                {/* Package Selection Pills */}
                <div className="form-field">
                  <label className="field-label">Selected Package</label>
                  <div className="package-pill-selector">
                    {SITE_DATA.packages.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        className={`selector-pill ${formData.packageId === p.id ? 'active' : ''}`}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, packageId: p.id }));
                          setSelectedPackage(p.id);
                        }}
                      >
                        <span className="pill-name">{p.name}</span>
                        <span className="pill-price">{p.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name Field */}
                <div className="form-field">
                  <label htmlFor="client-name" className="field-label">
                    Your Name <span className="required-star">*</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    className={`form-input ${formErrors.name ? 'input-error' : ''}`}
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      if (formErrors.name) setFormErrors(prev => ({ ...prev, name: null }));
                    }}
                  />
                  {formErrors.name && <span className="field-error-text">{formErrors.name}</span>}
                </div>

                {/* Business Name Field */}
                <div className="form-field">
                  <label htmlFor="business-name" className="field-label">
                    Business / Brand Name (Optional)
                  </label>
                  <input
                    id="business-name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Artisan Cafe, Mumbai"
                    value={formData.businessName}
                    onChange={e => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  />
                </div>

                {/* Project Description Field */}
                <div className="form-field">
                  <label htmlFor="project-desc" className="field-label">
                    What does your business need? <span className="required-star">*</span>
                  </label>
                  <textarea
                    id="project-desc"
                    className={`form-textarea ${formErrors.message ? 'input-error' : ''}`}
                    rows={4}
                    placeholder="Briefly describe what kind of website you're looking for, sections you need, and any launch timelines..."
                    value={formData.message}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, message: e.target.value }));
                      if (formErrors.message) setFormErrors(prev => ({ ...prev, message: null }));
                    }}
                  />
                  {formErrors.message && <span className="field-error-text">{formErrors.message}</span>}
                </div>

                {/* Action Buttons */}
                <div className="form-actions-group">
                  <button type="submit" className="cta-button primary submit-btn">
                    <MessageSquare size={16} />
                    <span>Chat on WhatsApp ↗</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailClick}
                    className="cta-button secondary email-alt-btn"
                  >
                    <Mail size={16} />
                    <span>Send via Email</span>
                  </button>
                </div>

                {/* Positive confirmation state when WhatsApp path is initiated */}
                {formSubmitted && (
                  <div className="form-success-banner">
                    <Check size={16} className="success-icon" />
                    <div>
                      <strong>Opening WhatsApp with your prefilled enquiry...</strong>
                      <p>
                        If WhatsApp didn't open automatically,{' '}
                        <a href={generatedWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                          click here to proceed ↗
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="woat-footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-brand">
              <span className="brand-wordmark">WOAT</span>
              <span className="brand-tagline-footer">WEBSITES OF ALL TIME</span>
            </div>
            <p className="footer-copy">
              Designed &amp; engineered by <strong>Aayush Karbhal</strong> · Mumbai, India.
            </p>
            <p className="footer-subcopy">
              Clean code, transparent pricing, and direct communication.
            </p>
          </div>

          <div className="footer-links-group">
            <span className="footer-col-title">Navigation</span>
            <div className="footer-links-list">
              <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
              <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
              <a href="#packages" onClick={(e) => handleNavClick(e, 'packages')}>Packages</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
            </div>
          </div>

          <div className="footer-contact-group">
            <span className="footer-col-title">Connect</span>
            <div className="footer-links-list">
              <a href={SITE_DATA.brand.whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp: {SITE_DATA.brand.phone} ↗
              </a>
              <a href={`tel:${SITE_DATA.brand.phoneRaw}`}>
                Call: {SITE_DATA.brand.phone}
              </a>
              <a href={`mailto:${SITE_DATA.brand.email}`}>
                {SITE_DATA.brand.email}
              </a>
              <button
                type="button"
                onClick={(e) => handleNavClick(e, 'home')}
                className="back-to-top-btn"
              >
                <span>Back to Top</span>
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} WOAT (Websites Of All Time). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
