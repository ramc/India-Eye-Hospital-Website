import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreateAppointment } from '@workspace/api-client-react';
import { ArrowLeft, ArrowRight, Check, Clock3, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import { Form } from '@/components/ui/form';
import type { Language } from '@/components/SiteLayout';

const appointmentSchema = z.object({
  patientName: z.string().trim().min(2, 'Please enter at least 2 characters.').max(120, 'Please keep the name under 120 characters.'),
  phoneNumber: z.string().trim().min(10, 'Enter a phone number with at least 10 characters.').max(18, 'Please check the phone number.').regex(/^[+0-9][0-9\s()-]{8,17}$/, 'Please enter a valid phone number.'),
  preferredDate: z.string(),
  paymentType: z.enum(['self_pay', 'insurance']),
  insuranceProvider: z.string().max(120, 'Please keep this under 120 characters.'),
  consent: z.boolean().refine(Boolean, 'Please agree before sending your request.'),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;
type AppointmentProps = { language: Language };

export default function Appointment({ language }: AppointmentProps) {
  const hi = language === 'hi';
  const createAppointment = useCreateAppointment();
  const [requestId, setRequestId] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [submissionError, setSubmissionError] = useState('');

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientName: '',
      phoneNumber: '',
      preferredDate: '',
      paymentType: 'self_pay',
      insuranceProvider: '',
      consent: false,
    },
  });
  const paymentType = form.watch('paymentType');
  const preferredDate = form.watch('preferredDate');
  const errorText = (field: keyof AppointmentFormValues) => {
    const message = form.formState.errors[field]?.message;
    return message ? (hi ? translatedError(field) : message) : '';
  };

  function translatedError(field: keyof AppointmentFormValues) {
    const errors: Partial<Record<keyof AppointmentFormValues, string>> = {
      patientName: 'कृपया कम से कम 2 अक्षर दर्ज करें।',
      phoneNumber: 'कृपया सही फ़ोन नंबर दर्ज करें।',
      consent: 'अनुरोध भेजने से पहले सहमति दें।',
    };
    return errors[field] ?? 'कृपया इस जानकारी की जाँच करें।';
  }

  function todayLocal() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  }

  async function onSubmit(values: AppointmentFormValues) {
    setSubmissionError('');
    try {
      const response = await createAppointment.mutateAsync({
        data: {
          patientName: values.patientName.trim(),
          phoneNumber: values.phoneNumber.trim(),
          language,
          preferredDate: values.preferredDate || null,
          paymentType: values.paymentType,
          insuranceProvider: values.paymentType === 'insurance' && values.insuranceProvider.trim()
            ? values.insuranceProvider.trim()
            : null,
          consent: true,
        },
      });
      setRequestId(response.requestId);
      setSubmittedMessage(response.message);
    } catch {
      setSubmissionError(hi
        ? 'आपका अनुरोध अभी भेजा नहीं जा सका। कृपया फिर कोशिश करें या हमें कॉल करें।'
        : 'Your request could not be sent just now. Please try again or call us.');
    }
  }

  return (
    <div className="appointment-page">
      <section className="appointment-hero">
        <div className="container appointment-hero-inner">
          <Link href="/" className="back-link" data-testid="link-back-home"><ArrowLeft size={16} /> {hi ? 'मुख्य पृष्ठ' : 'Back to home'}</Link>
          <div className="appointment-title-grid">
            <div>
              <div className="eyebrow"><span className="eyebrow-dot" /> {hi ? 'मोतियाबिंद सर्जरी' : 'Cataract surgery'}</div>
              <h1 className="display-font">{hi ? <>अपॉइंटमेंट का<br /><em>अनुरोध करें।</em></> : <>Request an<br /><em>appointment.</em></>}</h1>
            </div>
            <p>{hi
              ? 'मोतियाबिंद सर्जरी के लिए अपनी जानकारी भेजें। हमारी टीम आपको कॉल करके आगे की जानकारी और समय की पुष्टि करेगी।'
              : 'Share a few details for cataract surgery. Our team will call you to discuss the next steps and confirm an appointment time.'}</p>
          </div>
          <div className="appointment-important"><span><Clock3 size={17} /></span><p>{hi
            ? 'यह फ़ॉर्म केवल मोतियाबिंद सर्जरी के अपॉइंटमेंट अनुरोध के लिए है। फ़ॉर्म भेजने से समय की पुष्टि नहीं होती।'
            : 'This form is only for cataract surgery appointment requests. Submitting it does not confirm an appointment time.'}</p></div>
        </div>
      </section>

      <section className="appointment-content section-pad">
        <div className="container appointment-layout">
          <aside className="appointment-sidebar">
            <div className="side-card side-card-blue">
              <span className="side-card-label">{hi ? 'आने की जानकारी' : 'For a walk-in visit'}</span>
              <div className="side-hours"><Clock3 size={19} /><strong>{hi ? 'सुबह 8 से शाम 6' : '8 AM–6 PM'}</strong></div>
              <p>{hi ? 'आँखों की देखभाल के लिए वॉक-इन करें।' : 'Walk in for eye care.'}</p>
            </div>
            <div className="side-card side-address">
              <span className="side-card-label">{hi ? 'हमें यहाँ पाएँ' : 'Find us'}</span>
              <p>17/2 Knowledge Park 3,<br />LG Chowk, Greater Noida,<br />UP 201306</p>
              <span className="side-hint">{hi ? 'प्रवेश IIMT College Gate 2 के पास है।' : 'Entrance near IIMT College Gate 2.'}</span>
            </div>
            <div className="side-card side-contact">
              <span className="side-card-label">{hi ? 'सवाल हैं?' : 'Questions?'}</span>
              <p>{hi ? 'हमारी टीम से सीधे बात करें।' : 'Speak with our team.'}</p>
              <a href="tel:8448964466" data-testid="link-form-phone"><Phone size={16} /> 84489 64466</a>
              <a href="tel:8448974466" data-testid="link-form-phone-alt"><Phone size={16} /> 84489 74466</a>
              <a href="mailto:care@indiaeye.in" data-testid="link-form-email">care@indiaeye.in</a>
            </div>
          </aside>

          <div className="form-card">
            {requestId ? (
              <div className="success-panel" role="status" data-testid="status-request-received">
                <span className="success-icon"><Check size={28} aria-hidden="true" /></span>
                <div className="eyebrow"><span className="eyebrow-dot green-dot" /> {hi ? 'अनुरोध प्राप्त हुआ' : 'Request received'}</div>
                <h2 className="display-font">{hi ? <>धन्यवाद।<br /><em>हम आपको कॉल करेंगे।</em></> : <>Thank you.<br /><em>We’ll call you.</em></>}</h2>
                <p>{submittedMessage || (hi ? 'आपका अनुरोध हमारी टीम तक पहुँच गया है। अपॉइंटमेंट की पुष्टि के लिए हम आपसे फ़ोन पर संपर्क करेंगे।' : 'Your request has reached our team. We’ll contact you by phone to confirm your appointment.')}</p>
                <div className="request-ref"><span>{hi ? 'अनुरोध आईडी' : 'Request ID'}</span><strong>{requestId}</strong></div>
                <p className="success-reminder">{hi ? 'यह अभी अनुरोध है, पुष्टि किया हुआ अपॉइंटमेंट नहीं।' : 'This is a request, not a confirmed appointment.'}</p>
                <Link href="/" className="button button-primary success-home" data-testid="link-success-home">{hi ? 'मुख्य पृष्ठ पर जाएँ' : 'Return to home'} <ArrowRight size={17} /></Link>
              </div>
            ) : (
              <>
                <div className="form-card-heading">
                  <div><span className="form-kicker">{hi ? 'मरीज का पंजीकरण' : 'Patient registration'}</span><h2>{hi ? 'अपनी जानकारी दें' : 'Tell us a little about you'}</h2></div>
                  <span className="form-language">{hi ? 'हिंदी में' : 'English'}</span>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                    <div className="form-grid">
                      <div className="field-wrap field-full">
                        <label htmlFor="patientName">{hi ? 'मरीज का नाम' : 'Patient name'} <span className="required-star">*</span></label>
                        <input id="patientName" autoComplete="name" maxLength={120} placeholder={hi ? 'पूरा नाम लिखें' : 'Enter full name'} aria-invalid={Boolean(form.formState.errors.patientName)} aria-describedby={form.formState.errors.patientName ? 'error-patientName' : undefined} data-testid="input-patient-name" {...form.register('patientName')} />
                        {errorText('patientName') && <span id="error-patientName" className="field-error">{errorText('patientName')}</span>}
                      </div>
                      <div className="field-wrap field-full">
                        <label htmlFor="phoneNumber">{hi ? 'फ़ोन नंबर' : 'Phone number'} <span className="required-star">*</span></label>
                        <input id="phoneNumber" type="tel" inputMode="tel" autoComplete="tel" maxLength={18} placeholder={hi ? 'वह नंबर जिस पर हम कॉल कर सकें' : 'A number where we can reach you'} aria-invalid={Boolean(form.formState.errors.phoneNumber)} aria-describedby={form.formState.errors.phoneNumber ? 'error-phoneNumber' : 'hint-phoneNumber'} data-testid="input-phone-number" {...form.register('phoneNumber')} />
                        {form.formState.errors.phoneNumber ? <span id="error-phoneNumber" className="field-error">{errorText('phoneNumber')}</span> : <span id="hint-phoneNumber" className="field-hint">{hi ? 'हम इस नंबर पर आपको कॉल करेंगे।' : 'Our team will call you on this number.'}</span>}
                      </div>
                      <div className="field-wrap field-full">
                        <label htmlFor="preferredDate">{hi ? 'आप किस तारीख़ को आना चाहेंगे?' : 'When would you prefer to visit?'}</label>
                        <input id="preferredDate" type="date" min={todayLocal()} aria-describedby="hint-preferredDate" data-testid="input-preferred-date" {...form.register('preferredDate')} />
                        <span id="hint-preferredDate" className="field-hint">{hi ? 'वैकल्पिक · यह समय की पुष्टि नहीं है।' : 'Optional · this does not confirm a time.'}</span>
                      </div>
                      <fieldset className="field-wrap field-full payment-fieldset">
                        <legend>{hi ? 'भुगतान का तरीका' : 'How will you pay?'}</legend>
                        <div className="payment-options">
                          <label className={`payment-option ${paymentType === 'self_pay' ? 'selected' : ''}`}>
                            <input type="radio" value="self_pay" data-testid="radio-payment-self" {...form.register('paymentType')} />
                            <span className="radio-indicator" aria-hidden="true" />
                            <span><strong>{hi ? 'स्वयं भुगतान' : 'Paying myself'}</strong><small>{hi ? 'सीधे अस्पताल में' : 'Direct payment at the hospital'}</small></span>
                          </label>
                          <label className={`payment-option ${paymentType === 'insurance' ? 'selected' : ''}`}>
                            <input type="radio" value="insurance" data-testid="radio-payment-insurance" {...form.register('paymentType')} />
                            <span className="radio-indicator" aria-hidden="true" />
                            <span><strong>{hi ? 'बीमा' : 'Insurance'}</strong><small>{hi ? 'पात्रता की पुष्टि आवश्यक' : 'Subject to eligibility'}</small></span>
                          </label>
                        </div>
                      </fieldset>
                      {paymentType === 'insurance' && (
                        <div className="field-wrap field-full insurance-field reveal">
                          <label htmlFor="insuranceProvider">{hi ? 'बीमा प्रदाता' : 'Insurance provider'} <span className="optional-label">{hi ? 'वैकल्पिक' : 'Optional'}</span></label>
                          <input id="insuranceProvider" maxLength={120} placeholder={hi ? 'बीमा कंपनी का नाम' : 'Name of insurance provider'} data-testid="input-insurance-provider" {...form.register('insuranceProvider')} />
                          <span className="field-hint">{hi ? 'बीमा सुविधा पात्रता और अस्पताल की पुष्टि पर निर्भर है।' : 'Insurance is subject to eligibility and hospital confirmation.'}</span>
                        </div>
                      )}
                      <div className="field-wrap field-full consent-wrap">
                        <label className="consent-label">
                          <input type="checkbox" data-testid="checkbox-consent" {...form.register('consent')} />
                          <span className="checkmark" aria-hidden="true"><Check size={13} /></span>
                          <span>{hi ? 'मैं सहमत हूँ कि अस्पताल की टीम मेरे अनुरोध के बारे में मुझे कॉल कर सकती है।' : 'I agree that the hospital team may call me about this request.'} <span className="required-star">*</span></span>
                        </label>
                        {form.formState.errors.consent && <span className="field-error">{errorText('consent')}</span>}
                      </div>
                    </div>
                    {submissionError && <div className="submit-error" role="alert" data-testid="error-appointment-submit">{submissionError}</div>}
                    <button type="submit" className="button button-primary submit-button" disabled={createAppointment.isPending} data-testid="button-submit-appointment">
                      {createAppointment.isPending
                        ? (hi ? 'अनुरोध भेजा जा रहा है…' : 'Sending your request…')
                        : (hi ? 'अपॉइंटमेंट अनुरोध भेजें' : 'Send appointment request')}
                      {!createAppointment.isPending && <ArrowRight size={17} aria-hidden="true" />}
                    </button>
                    <div className="submit-note"><ShieldCheck size={15} aria-hidden="true" /> <span>{hi
                      ? 'आपकी जानकारी का उपयोग इस अनुरोध पर आपसे संपर्क करने के लिए किया जाएगा।'
                      : 'Your details will be used to contact you about this request.'}</span></div>
                    {preferredDate && <span className="sr-only" aria-live="polite">{hi ? `पसंदीदा तारीख़: ${preferredDate}` : `Preferred date: ${preferredDate}`}</span>}
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}