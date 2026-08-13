import { useState } from 'react';
import { useTheme } from './useTheme.js';
import Hero from './components/Hero.jsx';
import BlockGrid from './components/BlockGrid.jsx';
import Footer from './components/Footer.jsx';
import AboutModal from './components/AboutModal.jsx';
import WorkModal from './components/WorkModal.jsx';
import LikeModal from './components/LikeModal.jsx';
import ContactModal from './components/ContactModal.jsx';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [openModal, setOpenModal] = useState(null);

  const close = () => setOpenModal(null);

  return (
    <>
      <Hero theme={theme} onToggleTheme={toggleTheme} />
      <BlockGrid onOpen={setOpenModal} />
      <Footer />

      <AboutModal open={openModal === 'about'} onClose={close} />
      <WorkModal open={openModal === 'work'} onClose={close} />
      <LikeModal open={openModal === 'like'} onClose={close} />
      <ContactModal open={openModal === 'contact'} onClose={close} />
    </>
  );
}
