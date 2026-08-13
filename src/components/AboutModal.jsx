import { useEffect, useState } from 'react';
import Modal from './Modal.jsx';
import PasswordGate from './PasswordGate.jsx';
import { RESUME } from '../data/resume.js';

export default function AboutModal({ open, onClose }) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (!open || !unlocked) return;
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll('#modal-about .skill-bar__fill').forEach((bar) => {
        bar.style.width = bar.dataset.level + '%';
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [open, unlocked]);

  return (
    <Modal id="modal-about" open={open} onClose={onClose} eyebrow="01 — About Myself" title="Background & Philosophy">
      <div id="modal-about">
        <PasswordGate word="vikramv" offsetMinutes={60} onUnlock={() => setUnlocked(true)}>
          <p className="modal__lede">
            Resourceful, enthusiastic, and highly motivated high school student with excellent
            analytical skills and a demonstrated commitment to a strong work ethic. National
            qualifier in Science Olympiad across grades 6–10 and a national silver medalist in a
            chemistry lab event. Deep interest in STEM, business, leadership, and independent
            research — and a firm believer in learning by doing.
          </p>

          <h3 className="modal__section-title">Education</h3>
          <div className="edu-card">
            <div className="edu-card__head">
              <strong>Blue Valley West High School</strong>
              <span className="edu-card__date">Aug 2024 – Present</span>
            </div>
            <p className="edu-card__sub">Sophomore &middot; Overland Park, KS</p>
            <ul className="edu-card__facts">
              <li>GPA: <strong>5.0000</strong> weighted / <strong>4.0000</strong> unweighted</li>
              <li>Principal's Honor Roll</li>
              <li>PSAT 10: 1460/1520 &middot; ACT: 33 (Sept 2025)</li>
              <li>AP Computer Science A — Score 5 &middot; AP Human Geography — Score 5</li>
            </ul>
            <p className="edu-card__sub" style={{ marginTop: '.6rem' }}>
              <strong>AP Coursework:</strong> Computer Science A, Human Geography, Chemistry, Physics 1, World History: Modern
            </p>
          </div>

          <h3 className="modal__section-title">Skill Matrix</h3>
          <div className="skill-matrix">
            {RESUME.skills.map((group) => (
              <div className="skill-group" key={group.group}>
                <div className="skill-group__label">{group.group}</div>
                {group.items.map((s) => (
                  <div className="skill-bar" key={s.label}>
                    <div className="skill-bar__label">
                      <span>{s.label}</span>
                    </div>
                    <div className="skill-bar__track">
                      <div className="skill-bar__fill" data-level={s.level} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </PasswordGate>
      </div>
    </Modal>
  );
}
