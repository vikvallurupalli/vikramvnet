import Modal from './Modal.jsx';
import PasswordGate from './PasswordGate.jsx';
import { RESUME } from '../data/resume.js';

export default function WorkModal({ open, onClose }) {
  return (
    <Modal id="modal-work" open={open} onClose={onClose} eyebrow="02 — My Work" title="Experience, Leadership & Research">
      <PasswordGate word="vikramv" offsetMinutes={60}>
        <h3 className="modal__section-title">Timeline</h3>
        <div className="timeline">
          {RESUME.timeline.map((item) => (
            <div className="timeline-item" key={item.role + item.date}>
              <div className="timeline-item__head">
                <span className="timeline-item__role">{item.role}</span>
                <span className="timeline-item__org">{item.org}</span>
                <span className="timeline-item__date">{item.date}</span>
              </div>
              <ul className="timeline-item__bullets">
                {item.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="modal__section-title">Featured Projects</h3>
        <div className="project-grid">
          {RESUME.projects.map((p) => (
            <div className="project-card" key={p.title}>
              <div className="project-card__title">{p.title}</div>
              <div className="project-card__desc">{p.desc}</div>
              <div className="tag-row">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="modal__section-title">Skills Summary</h3>
        <div className="tag-row">
          {RESUME.skillTags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      </PasswordGate>
    </Modal>
  );
}
