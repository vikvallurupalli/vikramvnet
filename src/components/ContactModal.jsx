import Modal from './Modal.jsx';

export default function ContactModal({ open, onClose }) {
  return (
    <Modal id="modal-contact" open={open} onClose={onClose} narrow eyebrow="04 — Get in Touch" title="Let's Connect">
      <p className="modal__lede">
        Have a question, an opportunity, or just want to talk research? Reach out below.
      </p>

      <div className="contact-direct">
        <a className="btn btn--primary" href="mailto:vvpallied@gmail.com">Email vvpallied@gmail.com</a>
        <a className="btn btn--ghost" href="tel:+19134852788">Call (913) 485-2788</a>
      </div>
    </Modal>
  );
}
