import { ArrowDownRight, ArrowRight, Baby, Clock3, Eye, Glasses, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import type { Language } from '@/components/SiteLayout';

interface HomeProps {
  language: Language;
}

const services = [
  { en: 'Cataract', hi: 'मोतियाबिंद', icon: Eye },
  { en: 'Glaucoma', hi: 'ग्लूकोमा', icon: Eye },
  { en: 'Amblyopia', hi: 'एम्ब्लायोपिया', icon: Eye },
  { en: 'Retina', hi: 'रेटिना', icon: Sparkles },
  { en: 'Cornea', hi: 'कॉर्निया', icon: Eye },
  { en: 'Pterygium', hi: 'प्टेरिजियम', icon: Eye },
  { en: 'Squint', hi: 'भेंगापन', icon: Eye },
  { en: 'Child eye care', hi: 'बच्चों की आँखों की देखभाल', icon: Baby },
  { en: 'Spectacles', hi: 'चश्मा', icon: Glasses },
];

export default function Home({ language }: HomeProps) {
  const hi = language === 'hi';

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow reveal"><span className="eyebrow-dot" /> {hi ? 'ग्रेटर नोएडा में आपकी आँखों की देखभाल' : 'Eye care in Greater Noida'}</div>
            <h1 className="display-font reveal delay-1">{hi ? <>आँखों की देखभाल,<br /><em>आपके पास।</em></> : <>Clear care,<br /><em>close to home.</em></>}</h1>
            <p className="hero-lede reveal delay-2">{hi
              ? 'इंडिया आई हॉस्पिटल में अपने परिवार की आँखों की जाँच और देखभाल के लिए सीधे आएँ। जानकारी साफ़ है, रास्ता आसान।'
              : 'For your family’s eye care, come straight to India Eye Hospital. Clear information, an easy-to-find entrance, and walk-in care.'}</p>
            <div className="hero-actions reveal delay-3">
              <a href="#visit" className="button button-primary" data-testid="button-find-us">{hi ? 'आने की जानकारी' : 'Plan your visit'} <ArrowRight size={17} aria-hidden="true" /></a>
              <a href="tel:8448964466" className="button button-quiet" data-testid="button-call-hero"><Phone size={17} aria-hidden="true" /> {hi ? 'हमें कॉल करें' : 'Call us'}</a>
            </div>
            <div className="hero-hours reveal delay-3"><span className="hours-icon"><Clock3 size={16} /></span><span>{hi ? 'वॉक-इन देखभाल' : 'Walk-in care'} <strong>{hi ? 'सुबह 8 से शाम 6 बजे' : '8 AM–6 PM'}</strong></span></div>
          </div>
          <div className="hero-art reveal delay-2">
            <div className="hero-image-wrap"><img src="/family-vision-illustration.png" alt={hi ? 'एक माँ और बच्चा साथ बैठकर चित्रों वाली किताब देख रहे हैं' : 'A mother and child looking at a picture book together'} /></div>
            <div className="art-stamp"><span className="stamp-circle"><Eye size={22} /></span><span>{hi ? <>परिवार के लिए<br />आँखों की देखभाल</> : <>Eye care for<br />the whole family</>}</span></div>
            <div className="art-caption">{hi ? 'हर उम्र के लिए देखभाल' : 'Care for every age'}</div>
          </div>
        </div>
        <div className="hero-bottom-rule"><div className="container hero-bottom-inner"><span>{hi ? 'स्पष्ट जानकारी, बिना किसी परेशानी के' : 'Good information makes a first visit easier'}</span><a href="#care">{hi ? 'सेवाएँ देखें' : 'Explore care'} <ArrowDownRight size={15} /></a></div></div>
      </section>

      <section className="care-section section-pad" id="care">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-dot green-dot" /> {hi ? 'आँखों की देखभाल' : 'Eye care'}</div>
              <h2 className="display-font">{hi ? <>ज़रूरत के अनुसार<br /><em>देखभाल।</em></> : <>Care for the things<br /><em>you see.</em></>}</h2>
            </div>
            <p>{hi
              ? 'आँखों से जुड़ी जाँच और देखभाल के लिए आप वॉक-इन कर सकते हैं। मोतियाबिंद सर्जरी के अपॉइंटमेंट फिलहाल अनुरोध के आधार पर हैं।'
              : 'Walk in for eye care and assessment. Appointments are currently only for cataract surgeries, and are confirmed by our team after your request.'}</p>
          </div>
          <div className="services-list" role="list" aria-label={hi ? 'उपलब्ध सेवाएँ' : 'Services'}>
            {services.map(({ en, hi: hindi, icon: Icon }, index) => (
              <div className="service-row" role="listitem" key={en} data-testid={`service-${index}`}>
                <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
                <Icon className="service-icon" size={20} strokeWidth={1.7} aria-hidden="true" />
                <span>{hi ? hindi : en}</span>
                <span className="service-mark" aria-hidden="true" />
              </div>
            ))}
          </div>
          <p className="service-note">{hi ? 'किसी विशेष सेवा के बारे में जानना है? आने से पहले हमें कॉल करें।' : 'Looking for a particular service? Call us before you visit.'} <a href="tel:8448964466" data-testid="link-services-phone">84489 64466</a></p>
        </div>
      </section>

      <section className="visit-section" id="visit">
        <div className="container visit-grid">
          <div className="visit-panel">
            <div className="visit-panel-top"><span className="eyebrow eyebrow-light"><span className="eyebrow-dot orange-dot" /> {hi ? 'हमें ढूँढें' : 'Find your way here'}</span><MapPin size={23} aria-hidden="true" /></div>
            <h2 className="display-font">{hi ? <>आसानी से<br />पहुँचें।</> : <>An easy<br />entrance to find.</>}</h2>
            <p className="visit-address">17/2 Knowledge Park 3,<br />LG Chowk, Greater Noida,<br />UP 201306</p>
            <div className="entrance-note"><span className="entrance-arrow"><ArrowDownRight size={20} /></span><span>{hi ? 'प्रवेश IIMT College Gate 2 के पास है।' : 'The entrance is near IIMT College Gate 2.'}</span></div>
            <a className="map-link" href="https://maps.google.com/?q=17%2F2+Knowledge+Park+3+LG+Chowk+Greater+Noida+UP+201306" target="_blank" rel="noreferrer" data-testid="link-map">
              {hi ? 'मैप में पता देखें' : 'Look up the address on a map'} <ArrowRight size={16} />
            </a>
          </div>
          <div className="visit-details">
            <div className="eyebrow"><span className="eyebrow-dot" /> {hi ? 'आने से पहले जान लें' : 'Before you arrive'}</div>
            <h2 className="display-font">{hi ? 'पहली बार आ रहे हैं?' : 'A little clarity goes a long way.'}</h2>
            <div className="visit-step">
              <span className="step-index">01</span>
              <div><h3>{hi ? 'सीधे वॉक-इन करें' : 'Walk in for eye care'}</h3><p>{hi ? 'वॉक-इन देखभाल सुबह 8 बजे से शाम 6 बजे तक उपलब्ध है।' : 'Walk-in care is available from 8 AM to 6 PM.'}</p></div>
            </div>
            <div className="visit-step">
              <span className="step-index">02</span>
              <div><h3>{hi ? 'मोतियाबिंद सर्जरी?' : 'Request a cataract appointment'}</h3><p>{hi ? 'यहाँ ऑनलाइन अनुरोध भेजें। हमारी टीम आपको कॉल करके पुष्टि करेगी।' : 'Send a request online. Our team will call to confirm; a form submission is not a confirmed appointment.'}</p></div>
            </div>
            <a href="/request-appointment" className="button button-primary visit-cta" data-testid="button-appointment-home">{hi ? 'अनुरोध फ़ॉर्म भरें' : 'Request an appointment'} <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="reassurance-section section-pad">
        <div className="container reassurance-grid">
          <div className="reassurance-heading">
            <div className="eyebrow"><span className="eyebrow-dot green-dot" /> {hi ? 'सीधी बात' : 'Straight answers'}</div>
            <h2 className="display-font">{hi ? <>आपको पता होना चाहिए<br /><em>कि आगे क्या होगा।</em></> : <>Know what happens<br /><em>after you reach out.</em></>}</h2>
          </div>
          <div className="reassurance-note">
            <span className="reassure-icon"><ShieldCheck size={23} aria-hidden="true" /></span>
            <div><h3>{hi ? 'अनुरोध, पुष्टि नहीं' : 'A request, not a confirmed slot'}</h3><p>{hi ? 'फ़ॉर्म भेजने के बाद हमारी टीम आपको कॉल करेगी। समय की पुष्टि अस्पताल की टीम ही करती है।' : 'After you submit the form, our staff will call you. Your appointment time is confirmed by the hospital team.'}</p></div>
          </div>
          <div className="reassurance-note">
            <span className="reassure-icon reassure-orange"><Phone size={22} aria-hidden="true" /></span>
            <div><h3>{hi ? 'बात करना चाहेंगे?' : 'Prefer to speak to someone?'}</h3><p>{hi ? 'हमसे 84489 64466 या 84489 74466 पर कॉल करें।' : 'Call us on 84489 64466 or 84489 74466.'}</p><a href="tel:8448974466" data-testid="link-reassurance-phone">84489 74466 <ArrowRight size={14} /></a></div>
          </div>
        </div>
      </section>

      <section className="closing-section">
        <div className="container closing-inner">
          <div><span className="eyebrow eyebrow-light"><span className="eyebrow-dot orange-dot" /> {hi ? 'आपके पास, ग्रेटर नोएडा में' : 'Here for Greater Noida'}</span><h2 className="display-font">{hi ? 'आँखों की देखभाल के लिए आइए।' : 'When your eyes need care, start here.'}</h2></div>
          <div className="closing-actions"><a href="tel:8448964466" className="button button-light" data-testid="button-call-closing"><Phone size={17} /> 84489 64466</a><a href="/request-appointment" className="closing-text-link" data-testid="link-appointment-closing">{hi ? 'मोतियाबिंद का अनुरोध' : 'Cataract appointment request'} <ArrowRight size={16} /></a></div>
        </div>
      </section>
      <div className="sr-only" aria-live="polite">{hi ? 'हिंदी सामग्री' : 'English content'}</div>
    </>
  );
}