// Web Development expanded page
const { ArrowRight: WdArrowRight, ArrowOut: WdArrowOut, ArrowLeft: WdArrowLeft, webdev: WD_ICONS } = window.PortfolioIcons;
const { thumbs: WdThumbs, WEBDEV_PALETTES: WD_PAL } = window.PortfolioShared;

const WD_SERVICES = [
  { num: "01", title: "Website Design", desc: "Marketing sites engineered for clarity and conversion.", Icon: WD_ICONS[0].Comp },
  { num: "02", title: "Web Development", desc: "Production builds with HTML, CSS and modern JS.", Icon: WD_ICONS[1].Comp },
  { num: "03", title: "Landing Pages", desc: "One-screen pitches optimized for paid traffic.", Icon: WD_ICONS[2].Comp },
  { num: "04", title: "Portfolio Sites", desc: "Quiet, fast portfolios that put work first.", Icon: WD_ICONS[3].Comp },
  { num: "05", title: "Business Websites", desc: "Multi-page sites with CMS and lead capture.", Icon: WD_ICONS[4].Comp },
  { num: "06", title: "E-commerce", desc: "Shopify, WooCommerce and custom checkout flows.", Icon: WD_ICONS[5].Comp },
  { num: "07", title: "App Development", desc: "React and React Native apps shipped to stores.", Icon: WD_ICONS[6].Comp },
  { num: "08", title: "UI / UX Design", desc: "Wireframes, prototypes and design systems.", Icon: WD_ICONS[7].Comp },
  { num: "09", title: "Frontend", desc: "React, Next.js, Tailwind, TypeScript.", Icon: WD_ICONS[8].Comp },
  { num: "10", title: "Backend", desc: "Node, PHP, MySQL, Postgres, REST and GraphQL.", Icon: WD_ICONS[9].Comp },
];

const WD_WORKS = [
  { id: "w1", title: "Halo Bank", cat: "Web App · Fintech", year: "2025", stack: "Next.js · TS · Postgres", thumb: "Dashboard", pal: 0, span: 6 },
  { id: "w2", title: "Pinecrest Realty", cat: "Marketing Site", year: "2025", stack: "Next.js · Sanity", thumb: "WebApp", pal: 1, span: 3 },
  { id: "w3", title: "Loom & Field", cat: "E-commerce", year: "2024", stack: "Shopify Hydrogen", thumb: "WebApp", pal: 2, span: 3 },
  { id: "w4", title: "Open Atlas API", cat: "Developer Tool", year: "2024", stack: "Node · GraphQL", thumb: "Code", pal: 3, span: 4 },
  { id: "w5", title: "Northwind Studio", cat: "Portfolio", year: "2024", stack: "Astro · MDX", thumb: "WebApp", pal: 4, span: 4 },
  { id: "w6", title: "Ledger.io", cat: "SaaS Dashboard", year: "2024", stack: "React · Tailwind", thumb: "Dashboard", pal: 5, span: 4 },
];

const TECH_STACK = ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "PHP", "MySQL", "Postgres", "WordPress", "Shopify", "Figma", "Vercel"];

function WebDevPage({ visible, onBack, onOpenCase }) {
  return (
    <div className={"page page-webdev" + (visible ? " visible" : "")}>
      <div className="page-scroll">
        <div className="page-topbar">
          <button className="back-btn" onClick={onBack}><WdArrowLeft size={18} sw={2} />Back to hero</button>
          <div className="crumb">Index / Studio B — Web Development</div>
        </div>

        {/* HERO */}
        <div className="page-hero">
          <div>
            <div className="page-eyebrow"><span className="dot"></span>Studio B · Web Development</div>
            <h1 className="page-title">
              Sites that <em>load</em><br/>
              and sites that sell.
            </h1>
          </div>
          <div>
            <p className="page-lede">
              From a one-screen landing page to a typed, indexed e-commerce platform —
              we ship production code with measurable performance and a tidy handoff.
            </p>
            <div className="page-stats">
              <div>
                <div className="stat-num">84<span className="accent">+</span></div>
                <div className="stat-label">Sites launched</div>
              </div>
              <div>
                <div className="stat-num">99<span className="accent">%</span></div>
                <div className="stat-label">Lighthouse avg.</div>
              </div>
              <div>
                <div className="stat-num">12<span className="accent">d</span></div>
                <div className="stat-label">Avg. time to launch</div>
              </div>
            </div>
          </div>
        </div>

        {/* TECH RAIL */}
        <div className="tech-rail">
          <div className="tech-rail-label">Stack —</div>
          <div className="tech-rail-stack">
            {TECH_STACK.map((t, i) => (
              <React.Fragment key={t}>
                <span>{t}</span>
                {i < TECH_STACK.length - 1 && <span className="dot"></span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* SERVICES */}
        <div className="section">
          <div className="section-head">
            <h2 style={{ color: "white" }}>Services <em style={{ fontFamily: "Fraunces, serif", fontWeight: 400, fontStyle: "italic", opacity: 0.5 }}>/ ten disciplines</em></h2>
            <div className="section-meta">Click a category to scope work</div>
          </div>
          <div className="service-grid">
            {WD_SERVICES.map(s => {
              const Ico = s.Icon;
              return (
                <div key={s.num} className="service-card">
                  <div>
                    <div className="svc-num">{s.num}</div>
                    <div className="svc-icon"><Ico size={36} sw={1.5} /></div>
                    <div className="svc-title">{s.title}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.45, opacity: 0.6, marginTop: 12, fontFamily: "var(--font-body)" }}>{s.desc}</div>
                  </div>
                  <div className="svc-arrow"><WdArrowOut size={20} sw={1.8} /></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SELECTED WORK */}
        <div className="portfolio-section">
          <div className="section-head">
            <h2>Selected builds</h2>
            <div className="section-meta" style={{ opacity: 0.55 }}>06 of 84 · Click for case</div>
          </div>
          <div className="portfolio-grid">
            {WD_WORKS.map(w => {
              const Thumb = WdThumbs[w.thumb];
              return (
                <div key={w.id} className="work-card" style={{ gridColumn: `span ${w.span}` }} onClick={() => onOpenCase({ ...w, side: "webdev" })}>
                  <div className="work-thumb">
                    <Thumb palette={WD_PAL[w.pal]} title={w.title.split(" ")[0]} />
                  </div>
                  <div className="work-meta">
                    <div>
                      <h3 className="work-title">{w.title}</h3>
                      <div className="work-cat">{w.cat}</div>
                      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, opacity: 0.5, marginTop: 4, letterSpacing: "0.04em" }}>{w.stack}</div>
                    </div>
                    <div className="work-year">{w.year}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="cta-foot">
          <h3>Need a site that <em>actually</em><br/>performs?</h3>
          <div>
            <p>Send us a brief or a Figma file. We scope, quote and start within a week — most marketing sites ship in 12 working days.</p>
            <button className="cta-foot-btn">Start a build brief <WdArrowRight size={18} sw={2} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.PortfolioWebdev = WebDevPage;
