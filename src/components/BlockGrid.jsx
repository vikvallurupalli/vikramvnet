const BLOCKS = [
  {
    id: 'about',
    index: '01',
    title: 'About Myself',
    desc: 'Background, philosophy, education, and a snapshot of my skill set.',
    icon: (
      <svg className="block__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>
    ),
  },
  {
    id: 'work',
    index: '02',
    title: 'My Work',
    desc: 'Leadership roles, research projects, competitions, and technical skills.',
    icon: (
      <svg className="block__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
    ),
  },
  {
    id: 'like',
    index: '03',
    title: 'I Like To',
    desc: 'Music, cooking, video editing, golf, and other side interests.',
    icon: (
      <svg className="block__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
    ),
  },
  {
    id: 'contact',
    index: '04',
    title: 'Get in Touch',
    desc: 'Send a quick message or reach out directly by email or phone.',
    icon: (
      <svg className="block__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 6l-10 7L2 6" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
    ),
  },
];

export default function BlockGrid({ onOpen }) {
  return (
    <main className="grid" id="main">
      {BLOCKS.map((b) => (
        <button
          key={b.id}
          className={`block block--${b.id}`}
          onClick={() => onOpen(b.id)}
          aria-haspopup="dialog"
        >
          <div className="block__top">
            <span className="block__index">{b.index}</span>
            {b.icon}
          </div>
          <h2 className="block__title">{b.title}</h2>
          <p className="block__desc">{b.desc}</p>
          <span className="block__cta">View details →</span>
        </button>
      ))}
    </main>
  );
}
