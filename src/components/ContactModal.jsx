import { useState } from 'react';
import Modal from './Modal.jsx';

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [note, setNote] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setNote('Please fill out every field before sending.');
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:vvpallied@gmail.com?subject=${subject}&body=${body}`;

    setNote('Opening your email client…');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <Modal id="modal-contact" open={open} onClose={onClose} narrow eyebrow="04 — Get in Touch" title="Let's Connect">
      <p className="modal__lede">
        Have a question, an opportunity, or just want to talk research? Reach out below.
      </p>

      <div className="contact-direct">
        <a className="btn btn--primary" href="mailto:vvpallied@gmail.com">Email vvpallied@gmail.com</a>
        <a className="btn btn--ghost" href="tel:+19134852788">Call (913) 485-2788</a>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input type="text" id="cf-name" name="name" required autoComplete="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Your Email</label>
          <input type="email" id="cf-email" name="email" required autoComplete="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="cf-message">Message</label>
          <textarea id="cf-message" name="message" rows="4" required value={form.message} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn--primary btn--block">Send Message</button>
        <p className="form-note" role="status" aria-live="polite">{note}</p>
      </form>
    </Modal>
  );
}
