export default function Hero({ theme, onToggleTheme }) {
  return (
    <header className="hero">
      <div className="hero__bar">
        <span className="hero__mark">VV</span>
        <button
          id="themeToggle"
          className="theme-toggle"
          type="button"
          aria-label="Toggle dark and light theme"
          onClick={onToggleTheme}
        >
          <svg className="icon icon-sun" style={{ display: theme === 'dark' ? 'none' : 'block' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
          <svg className="icon icon-moon" style={{ display: theme === 'dark' ? 'block' : 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
        </button>
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">Portfolio</p>
        <h1 className="hero__name">Vikram Vallurupalli</h1>
        <p className="hero__title">STEM Researcher &amp; Student Leader — Blue Valley West High School</p>
        <p className="hero__blurb">
          National Science Olympiad qualifier, DECA state champion, and self-directed researcher
          exploring machine learning, data science, and biology.
        </p>

        <div className="hero__links">
          <a className="hero__link" href="mailto:vvpallied@gmail.com">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 6l-10 7L2 6" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
            vvpallied@gmail.com
          </a>
          <a className="hero__link" href="tel:+19134852788">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            (913) 485-2788
          </a>
          <a className="hero__link" href="/op/OP_Simulation_Dashboard_corrected.html" target="_blank" rel="noopener noreferrer">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            Overland Park, KS
          </a>
        </div>
      </div>
    </header>
  );
}
