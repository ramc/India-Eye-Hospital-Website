import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Clock3, Eye, Menu, Phone, X } from 'lucide-react';

export type Language = 'en' | 'hi';

interface SiteLayoutProps {
  language: Language;
  setLanguage: (language: Language) => void;
  children: React.ReactNode;
}

export function SiteHeader({ language, setLanguage }: Omit<SiteLayoutProps, 'children'>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const hi = language === 'hi';
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="topline">
        <div className="container topline-inner">
          <span><Clock3 size={15} aria-hidden="true" /> {hi ? 'वॉक-इन देखभाल · सुबह 8 से शाम 6 बजे' : 'Walk-in care · 8 AM–6 PM'}</span>
          <a href="tel:8448964466" data-testid="link-top-phone"><Phone size={14} aria-hidden="true" /> 84489 64466</a>
        </div>
      </div>
      <header className="site-header">
        <div className="container nav-inner">
          <Link href="/" className="brand" onClick={closeMenu} aria-label={hi ? 'इंडिया आई हॉस्पिटल होम' : 'India Eye Hospital home'} data-testid="link-brand-home">
            <span className="brand-mark"><Eye size={23} strokeWidth={2.1} aria-hidden="true" /></span>
            <span className="brand-copy"><strong>INDIA EYE</strong><small>HOSPITAL · GREATER NOIDA</small></span>
          </Link>
          <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`} aria-label={hi ? 'मुख्य नेविगेशन' : 'Main navigation'}>
            <a href="/#care" onClick={closeMenu} data-testid="link-care-nav">{hi ? 'हमारी सेवाएँ' : 'Our care'}</a>
            <a href="/#visit" onClick={closeMenu} data-testid="link-visit-nav">{hi ? 'आने की जानकारी' : 'Plan a visit'}</a>
            <a href="/#contact" onClick={closeMenu} data-testid="link-contact-nav">{hi ? 'संपर्क' : 'Contact'}</a>
            <Link href="/request-appointment" className="nav-appointment" onClick={closeMenu} data-testid="link-appointment-nav">
              {hi ? 'मोतियाबिंद अनुरोध' : 'Cataract request'} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </nav>
          <div className="nav-actions">
            <button
              className="language-toggle"
              type="button"
              onClick={() => setLanguage(hi ? 'en' : 'hi')}
              aria-label={hi ? 'Switch language to English' : 'भाषा हिंदी में बदलें'}
              data-testid="button-language"
            >
              {hi ? 'EN' : 'हिंदी'}
            </button>
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? (hi ? 'मेन्यू बंद करें' : 'Close menu') : (hi ? 'मेन्यू खोलें' : 'Open menu')}
              aria-expanded={menuOpen}
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter({ language }: { language: Language }) {
  const hi = language === 'hi';
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-main">
        <div className="footer-intro">
          <Link href="/" className="brand footer-brand" data-testid="link-footer-home">
            <span className="brand-mark"><Eye size={22} aria-hidden="true" /></span>
            <span className="brand-copy"><strong>INDIA EYE</strong><small>HOSPITAL · GREATER NOIDA</small></span>
          </Link>
          <p>{hi ? 'ग्रेटर नोएडा में आपके परिवार के लिए आँखों की देखभाल।' : 'Eye care for your family, here in Greater Noida.'}</p>
        </div>
        <div className="footer-detail">
          <span className="footer-label">{hi ? 'हमसे मिलें' : 'Find us'}</span>
          <p>17/2 Knowledge Park 3, LG Chowk<br />Greater Noida, UP 201306</p>
          <p className="footer-hint">{hi ? 'प्रवेश IIMT College Gate 2 के पास है।' : 'Entrance near IIMT College Gate 2.'}</p>
        </div>
        <div className="footer-detail">
          <span className="footer-label">{hi ? 'संपर्क करें' : 'Get in touch'}</span>
          <a href="tel:8448964466" data-testid="link-footer-phone-one">84489 64466</a>
          <a href="tel:8448974466" data-testid="link-footer-phone-two">84489 74466</a>
          <a href="mailto:care@indiaeye.in" data-testid="link-footer-email">care@indiaeye.in</a>
        </div>
        <div className="footer-detail">
          <span className="footer-label">{hi ? 'आने का समय' : 'Walk in'}</span>
          <p>{hi ? 'सुबह 8 बजे से शाम 6 बजे तक' : '8 AM to 6 PM'}</p>
          <p className="footer-hint">{hi ? 'मोतियाबिंद सर्जरी के अपॉइंटमेंट केवल अनुरोध पर।' : 'Cataract surgery appointments by request only.'}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© India Eye Hospital</span>
        <span>{hi ? 'स्पष्ट जानकारी। देखभाल के साथ।' : 'Clear information. Care that feels close.'}</span>
      </div>
    </footer>
  );
}

export function SiteLayout({ language, setLanguage, children }: SiteLayoutProps) {
  return (
    <div className="site-shell">
      <SiteHeader language={language} setLanguage={setLanguage} />
      <main>{children}</main>
      <SiteFooter language={language} />
    </div>
  );
}