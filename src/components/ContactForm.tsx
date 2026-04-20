import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactFormProps {
  accessKey: string;
}

export default function ContactForm({ accessKey }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          botcheck: '',
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitError('Something went wrong. Please try again or email me directly.');
      }
    } catch {
      setSubmitError('Something went wrong. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ padding: '32px 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: '28px', lineHeight: 1, marginBottom: '12px' }}>
          Message <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>sent.</span>
        </p>
        <p style={{ fontSize: '13px', color: 'var(--ink-3)', marginBottom: '20px' }}>
          Thank you for reaching out. I'll get back to you soon.
        </p>
        <button className="btn" onClick={() => setIsSubmitted(false)}>send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

      <div className={`field${errors.name ? ' err' : ''}`}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
        {errors.name && <span className="ferr">{errors.name}</span>}
      </div>

      <div className={`field${errors.email ? ' err' : ''}`}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" />
        {errors.email && <span className="ferr">{errors.email}</span>}
      </div>

      <div className={`field${errors.subject ? ' err' : ''}`}>
        <label htmlFor="subject">Subject</label>
        <input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What's this about?" />
        {errors.subject && <span className="ferr">{errors.subject}</span>}
      </div>

      <div className={`field${errors.message ? ' err' : ''}`}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your message..." rows={5} />
        {errors.message && <span className="ferr">{errors.message}</span>}
      </div>

      <button type="submit" className="btn primary" style={{ width: '100%', justifyContent: 'center' }} disabled={isSubmitting}>
        {isSubmitting ? 'sending…' : 'send message'}
      </button>

      {submitError && (
        <p style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '10px', textAlign: 'center' }}>{submitError}</p>
      )}
    </form>
  );
}
