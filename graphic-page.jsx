// Graphic Design expanded page
const { ArrowRight: GdArrowRight, ArrowOut: GdArrowOut, ArrowLeft: GdArrowLeft, graphic: GD_ICONS } = window.PortfolioIcons;
const { thumbs: GdThumbs, GRAPHIC_PALETTES: GD_PAL } = window.PortfolioShared;

const GD_SERVICES = [
  { num: "01", title: "Packaging Design", desc: "Boxes, labels, tins, sleeves — dielines included.", Icon: GD_ICONS[0].Comp },
  { num: "02", title: "Flyer Design", desc: "Single-page promos engineered to be read in 3 seconds.", Icon: GD_ICONS[1].Comp },
  { num: "03", title: "Vector Art", desc: "Original illustration in crisp, scalable vector.", Icon: GD_ICONS[2].Comp },
  { num: "04", title: "Vector Tracing", desc: "Raster logos rebuilt as production-grade vectors.", Icon: GD_ICONS[3].Comp },
  { num: "05", title: "Poster Design", desc: "Typographic posters for events, films and brands.", Icon: GD_ICONS[4].Comp },
  { num: "06", title: "File Conversion", desc: "AI · PSD · PDF · SVG · EPS — clean handoffs.", Icon: GD_ICONS[5].Comp },
  { num: "07", title: "Embroidery Digitizing", desc: "DST · PES · EXP files for stitch-perfect output.", Icon: GD_ICONS[6].Comp },
  { num: "08", title: "Business Cards", desc: "Foil, letterpress, soft-touch — the full menu.", Icon: GD_ICONS[7].Comp },
  { num: "09", title: "Social Media Posts", desc: "Reels covers, carousels and grids that hold attention.", Icon: GD_ICONS[8].Comp },
  { num: "10", title: "Presentations", desc: "Investor decks, pitch books and sales documents.", Icon: GD_ICONS[9].Comp },
];

const GD_WORKS = [
  { id: "g1", title: "Sorrel & Stone", cat: "Packaging · Botanical Tea", year: "2025", thumb: "Packaging", pal: 0, span: 6 },
  { id: "g2", title: "Northwind Festival", cat: "Poster Series", year: "2025", thumb: "Poster", pal: 1, span: 3, num: "26" },
  { id: "g3", title: "Atlas Roastery", cat: "Brand Identity", year: "2024", thumb: "Brand", pal: 2, span: 3 },
  { id: "g4", title: "Marlow & Co.", cat: "Stationery System", year: "2024", thumb: "Brand", pal: 3, span: 4 },
  { id: "g5", title: "Hoshi Skincare", cat: "Social Media Suite", year: "2024", thumb: "Social", pal: 4, span: 4 },
  { id: "g6", title: "Ember Films", cat: "Title Sequence", year: "2024", thumb: "Poster", pal: 5, span: 4, num: "07" },
];

function GraphicPage({ visible, onBack, onOpenCase }) {
  return (
    <div className={"page page-graphic" + (visible ? " visible" : "")}>
      <div className="page-scroll">
        <div className="page-topbar">
          <button className="back-btn" onClick={onBack}><GdArrowLeft size={18} sw={2} />Back to hero</button>
          <div className="crumb">Index / Studio A — Graphic Design</div>
        </div>

        {/* HERO */}
        <div className="page-hero">
          <div>
            <div className="page-eyebrow"><span className="dot"></span>Studio A · Graphic Design</div>
            <h1 className="page-title">
              Brands, <em>built</em><br/>
              to be looked at.
            </h1>
          </div>
          <div>
            <p className="page-lede">
              Ten focused disciplines — from packaging dielines to a deck that closes the round —
              delivered with print-ready files and a process you can stand behind.
            </p>
            <div className="page-stats">
              <div>
                <div className="stat-num">120<span className="accent">+</span></div>
                <div className="stat-label">Projects delivered</div>
              </div>
              <div>
                <div className="stat-num">38</div>
                <div className="stat-label">Active clients</div>
              </div>
              <div>
                <div className="stat-num">06<span className="accent">y</span></div>
                <div className="stat-label">In practice</div>
              </div>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div className="section">
          <div className="section-head">
            <h2>Services <em style={{ fontFamily: "Fraunces, serif", fontWeight: 400, fontStyle: "italic", opacity: 0.5 }}>/ ten disciplines</em></h2>
            <div className="section-meta">Click a category to brief us</div>
          </div>
          <div className="service-grid">
            {GD_SERVICES.map(s => {
              const Ico = s.Icon;
              return (
                <div key={s.num} className="service-card">
                  <div>
                    <div className="svc-num">{s.num}</div>
                    <div className="svc-icon"><Ico size={36} sw={1.5} /></div>
                    <div className="svc-title-wrap">
                      <span className="svc-title-tag">{s.title}</span>
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.45, opacity: 0.62, marginTop: 12, fontFamily: "var(--font-body)" }}>{s.desc}</div>
                  </div>
                  <div className="svc-arrow"><GdArrowOut size={20} sw={1.8} /></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SELECTED WORK */}
        <div className="portfolio-section">
          <div className="section-head">
            <h2>Selected work</h2>
            <div className="section-meta" style={{ opacity: 0.55 }}>06 of 120 · Click for case</div>
          </div>
          <div className="portfolio-grid">
            {GD_WORKS.map(w => {
              const Thumb = GdThumbs[w.thumb];
              return (
                <div key={w.id} className="work-card" style={{ gridColumn: `span ${w.span}` }} onClick={() => onOpenCase({ ...w, side: "graphic" })}>
                  <div className="work-thumb">
                    <Thumb palette={GD_PAL[w.pal]} title={w.title} num={w.num || "01"} />
                  </div>
                  <div className="work-meta">
                    <div>
                      <h3 className="work-title">{w.title}</h3>
                      <div className="work-cat">{w.cat}</div>
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
          <h3>Got a brand <em>worth</em><br/>looking at?</h3>
          <div>
            <p>Brief us in 90 seconds. Most projects start within a week and ship the first proof inside 10 days.</p>
            <button className="cta-foot-btn">Start a graphic brief <GdArrowRight size={18} sw={2} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.PortfolioGraphic = GraphicPage;
