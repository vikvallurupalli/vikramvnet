import Modal from './Modal.jsx';
import { RESUME } from '../data/resume.js';

export default function LikeModal({ open, onClose }) {
  return (
    <Modal id="modal-like" open={open} onClose={onClose} eyebrow="03 — I Like To" title="Interests & Side Pursuits">
      <p className="modal__lede">
        Outside the lab and the classroom, here's what keeps me curious and recharged.
      </p>
      <div className="interest-grid">
        {RESUME.interests.map((i) => (
          <div className="interest-card" key={i.label}>
            <div className="interest-card__emoji">{i.emoji}</div>
            <div className="interest-card__label">{i.label}</div>
            <div className="interest-card__sub">{i.sub}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
